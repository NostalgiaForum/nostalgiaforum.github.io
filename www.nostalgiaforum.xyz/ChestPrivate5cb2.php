<?php

/*
 __PocketMine Plugin__
name=ChestPrivate
description=ChestPrivate
version=0.8.1_ghb_naq_php8fix
author=rewrite by tema1d/gameherobrine
class=ChestPrivate
apiversion=11,12,12.1
*/
class Vec3Utils{
	public static function convertToVec3($s){
		$s = explode("-",$s);
		return new Vec3($s[0], $s[1], $s[2]);
	}
	public static function convertVec3ToString($v){
		return Vec3Utils::makeIdFromXYZ($v->x, $v->y, $v->z);
	}
	public static function makeIdFromXYZ($x, $y, $z){
		return $x."-".$y."-".$z;
	}
}

class ChestPrivate implements Plugin
{
	private $api, $db, $queue = array();

	const NOT_LOCKED = -1;
	const NORMAL_LOCK = 0;

	public function __construct(ServerAPI $api, $server = false)
	{
		$this->api = $api;
	}

	public function init()
	{
		$this->loadDB();
		$this->api->addHandler("player.block.touch", array($this, "eventHandler"));
		$this->api->console->register("chest", "Приват сундуков.", array($this, "commandHandler"));
		$this->api->ban->cmdWhitelist("chest");
		new Config($this->api->plugin->configPath($this)."members.yml", CONFIG_YAML, array());
		$this->cfg = $this->api->plugin->readYAML($this->api->plugin->configPath($this). "members.yml");
	}

	public function eventHandler($data, $event)
	{		
		$username = strtolower($data['player']->username);
		$player = $data['player'];
		if ($data['type'] === "place" and $data['item']->getID() === CHEST) {
			$c = $this->getSideChest($data['block']->x, $data['block']->y, $data['block']->z, $data['block']->level);


 			if ($c !== false) {
				$cInfo = $this->getChestInfo($c->x, $c->y, $c->z);
				$isLocked = $cInfo === self::NOT_LOCKED ? false : true;
				if ($isLocked) {
					$this->api->chat->sendTo(false, "[ChestPrivate] Невозможно поставить сундук рядом с запертым сундуком.", $username);
					return false;
				}
			} 
		}
		$target = $data['target'];
		if ($target->getID() === CHEST) {
			$x = $target->x;
			$y = $target->y;
			$z = $target->z;
			$chestInfo = $this->getChestInfo($data['target']->x, $data['target']->y, $data['target']->z);
			$owner = $chestInfo === self::NOT_LOCKED ? $chestInfo : strtolower($chestInfo['owner']);
			$attribute = $chestInfo === self::NOT_LOCKED ? $chestInfo : $chestInfo['attribute'];
			$pairChest = $this->api->tile->get(new Position($data['target']->x, $data['target']->y, $data['target']->z, $data['target']->level));
			if ($pairChest instanceof Tile) {
				$pairChest = $pairChest->isPaired() ? $pairChest->getPair() : false;
			} else {
				$pairChest = false;
			}			
			if (isset($this->queue[$username])) {
				$task = $this->queue[$username];
				switch ($task[0]) {
					case "add":
						if($owner === $username || $this->api->ban->isOp($username)){
							$u = $task[1];
							$r = $this->addmember($x, $y, $z, strtolower($task[1]));
							if($r === false){
								$player->sendChat("[ChestPrivate] У этого игрока уже есть доступ к сундуку!");
							}else{
								if ($pairChest !== false) $r = $this->addmember($pairChest->x, $pairChest->y, $pairChest->z, $task[1]);
								$player->sendChat("[ChestPrivate] Вы успешно добавили $u в сундук"); //You have successfully made your chest griefable =D
							}
						}
						else $player->sendChat("[ChestPrivate] Вы не владелец этого сундука!");
						break;
					case "remove":
						if($owner === $username  || $this->api->ban->isOp($username)){
							$r = $this->removemember($x, $y, $z, strtolower($task[1]));
							if($r === false){
								$player->sendChat("[ChestPrivate] У этого игрока нет доступа к сундуку!");
								break;
							}else{
								if ($pairChest !== false) $r = $this->removemember($pairChest->x, $pairChest->y, $pairChest->z, $task[1]);
								$u = $task[1];
								$player->sendChat("[ChestPrivate] Вы успешно убрали доступ для $u в сундук");
							}
						}
						else $player->sendChat("[ChestPrivate] Вы не владелец этого сундука!");
						break;
					case "lock":
						if ($attribute === self::NOT_LOCKED) {
							$this->lock($username, $data['target']->x, $data['target']->y, $data['target']->z, self::NORMAL_LOCK);
							if ($pairChest !== false) $this->lock($username, $pairChest->x, $pairChest->y, $pairChest->z, self::NORMAL_LOCK);
						} else {
							$this->api->chat->sendTo(false, "[ChestPrivate] Сундук уже запривачен." , $username);
						}
						break;
					case "unlock":
						if (($this->api->ban->isOp($username) or $owner === $username) and $attribute === self::NORMAL_LOCK) {
							$this->unlock($data['target']->x, $data['target']->y, $data['target']->z, $username);
							if ($pairChest !== false) $this->unlock($pairChest->x, $pairChest->y, $pairChest->z, $username);
						} elseif ($attribute === self::NOT_LOCKED) {
							$this->api->chat->sendTo(false, "[ChestPrivate] Сундук не запривачен.", $username);
						} else {
							$this->api->chat->sendTo(false, "[ChestPrivate] Нельзя разприватить чужой сундук.", $username);
						}
						break;
					case "info":
						if ($attribute !== self::NOT_LOCKED) {
							$this->info($data['target']->x, $data['target']->y, $data['target']->z, $username);
						} else {
							$this->api->chat->sendTo(false, "[ChestPrivate] На данном сундуке нет привата.", $username);
						}
						break;
				unset($this->queue[$username]);
				return false;
			} 
			if($this->api->ban->isOp($username)){
				return true;
			}
            elseif ($owner !== $username and $attribute !== self::NOT_LOCKED) {
				if(isset($this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)]) && in_array(strtolower($username), $this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)])){
					return true;
				}
				$this->api->chat->sendTo(false, "Сундук находится под защитой.", $username);
				$this->api->chat->sendTo(false, "Для более детальной информации используйте :\n/chest info", $username);
                return false;
			} else {
				if ($owner === $username and $data['type'] === 'break' and $attribute !== self::NOT_LOCKED) {
					$this->unlock($data['target']->x, $data['target']->y, $data['target']->z, $username);
					if ($pairChest !== false) $this->unlock($pairChest->x, $pairChest->y, $pairChest->z, $username);
				} elseif ($owner !== $username and $data['type'] === 'break') {
					$this->api->chat->sendTo(false, "Только создатель защиты имеет доступ.", $username);
					return false;
				}
			}
		}
	}
}
	public function CommandHandler($cmd, $args, $issuer, $alias)
	{
		if(!isset($args[0])){
			return "[ChestPrivate] Use /chest to get help";
		}
		$subCmd = $args[0];
		$output = "";
		if ($issuer === 'console') {
			$output .= "[ChestPrivate] Must be run on the world.";
		} elseif(isset($this->queue[$issuer->iusername])) {
			$output .= "[ChestPrivate] You still have the task to do!";
		} else {
			switch ($subCmd) {
				case "lock":
				case "unlock":
				case "p":
				case "info":
					$this->queue[$issuer->iusername] = array($subCmd);
					break;
				case "add":
				case "remove":
					$member = strtolower($args[1]);
					$this->queue[$issuer->iusername] = array($subCmd, $member);
					break;
				default:
					$output .= "ChestPrivate - приват сундуков\n/chest lock - Заблокировать сундук. \n/chest unlock - Разблокировать сундук.\n/chest info - Посмотреть информацию о сундуке\n/chest add - Добавить игрока в сундук\n/chest remove - Убрать игрока из сундука\nОтдельная благодарность игрокам ArkQuark, GameHerobine <3";
					return $output;
			}
			$output .= "[ChestPrivate] Коснитесь нужного сундука.";
		}
		return $output;
	}

	private function loadDB()
	{
		$this->db = new SQLite3($this->api->plugin->configPath($this) . "PocketGuard.sqlite3");
		$stmt = $this->db->prepare(
				"CREATE TABLE IF NOT EXISTS chests(
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				owner TEXT NOT NULL,
				x INTEGER NOT NULL,
				y INTEGER NOT NULL,
				z INTEGER NOT NULL,
				attribute INTEGER NOT NULL
		)"
		);
		$stmt->execute();
		$stmt->close();
	}
	
	private function addmember($x, $y, $z, $member){
		if(isset($this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)])){
			if(in_array($member, $this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)])){
				return false;
			}
			$this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)][] = $member;
		}else{
			$this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)] = array($member);
		}
		$this->api->plugin->writeYAML($this->api->plugin->configPath($this)."members.yml", $this->cfg);
	}
	
	private function removemember($x, $y, $z, $member){
		if(isset($this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)])){
			if(!in_array($member, $this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)])){
				return false;
			}
			$id = array_search($member, $this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)]);
			unset($this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)][$id]);
			
		}
		$this->api->plugin->writeYAML($this->api->plugin->configPath($this)."members.yml", $this->cfg);
	}
	
	
	private function getSideChest($x, $y, $z, $level)
    {
        $item = $level->getBlock(new Vector3($x + 1, $y, $z));
        if ($item->getID() === CHEST) return $item;
        $item = $level->getBlock(new Vector3($x - 1, $y, $z));
        if ($item->getID() === CHEST) return $item;
        $item = $level->getBlock(new Vector3($x, $y, $z + 1));
        if ($item->getID() === CHEST) return $item;
        $item = $level->getBlock(new Vector3($x, $y, $z - 1));
        if ($item->getID() === CHEST) return $item;
        return false;
    }


	private function getChestInfo($x, $y, $z)
	{
		$stmt = $this->db->prepare("SELECT * FROM chests WHERE x = :x AND y = :y AND z = :z");
		$stmt->bindValue(":x", $x);
		$stmt->bindValue(":y", $y);
		$stmt->bindValue(":z", $z);
		$result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
		$stmt->close();
		if ($result === false) {
			return self::NOT_LOCKED;
		} else {
			return $result;
		}
	}

	private function getAttribute($x, $y, $z)
	{
		$stmt = $this->db->prepare("SELECT attribute FROM chests WHERE x = :x AND y = :y AND z = :z");
		$stmt->bindValue(":x", $x);
		$stmt->bindValue(":y", $y);
		$stmt->bindValue(":z", $z);
		$result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
		$stmt->close();
		if ($result === false) {
			$ret = self::NOT_LOCKED;
		} else {
			$ret = $result['attribute'];
		}
		return $ret;
	}

	private function getOwner($x, $y, $z)
	{
		$stmt = $this->db->prepare("SELECT owner FROM chests WHERE x = :x AND y = :y AND z = :z");
		$stmt->bindValue(":x", $x);
		$stmt->bindValue(":y", $y);
		$stmt->bindValue(":z", $z);
		$result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
		$stmt->close();
		if ($result === false) {
			$ret = self::NOT_LOCKED;
		} else {
			$ret = $result['owner'];
		}
		return $ret;
	}

	private function lock($owner, $x, $y, $z, $attribute)
	{
		$stmt = $this->db->prepare("INSERT INTO chests (owner, x, y, z, attribute) VALUES (:owner, :x, :y, :z, :attribute)");
		$stmt->bindValue(":owner", $owner);
		$stmt->bindValue(":x", $x);
		$stmt->bindValue(":y", $y);
		$stmt->bindValue(":z", $z);
		$stmt->bindValue(":attribute", $attribute);
		$stmt->execute();
		$stmt->close();
		
		$this->api->chat->sendTo(false, "Вы поставили защиту на данный сундук.", $owner);
	}

	private function unlock($x, $y, $z, $username)
	{
		$stmt = $this->db->prepare("DELETE FROM chests WHERE x = :x AND y = :y AND z = :z");
		$stmt->bindValue(":x", $x);
		$stmt->bindValue(":y", $y);
		$stmt->bindValue(":z", $z);
		$stmt->execute();
		$this->api->chat->sendTo(false, "Вы убрали защиту с данного сундука.", $username);
		$stmt->close();
	}

	private function info($x, $y, $z, $username)
	{
		$stmt = $this->db->prepare("SELECT owner, attribute FROM chests WHERE x = :x AND y = :y AND z = :z");
		$stmt->bindValue(":x", $x);
		$stmt->bindValue(":y", $y);
		$stmt->bindValue(":z", $z);
		$result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
		$stmt->close();
		$owner = $result['owner'];
		$attribute = $result['attribute'];
		switch ($attribute) {
			case self::NORMAL_LOCK:
				$lockType = "Стандартный";
				break;
		}
		$otherplayers = "нету";
		if(isset($this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)])){
			$otherplayers = implode(", ", $this->cfg[Vec3Utils::makeIdFromXYZ($x, $y, $z)]);
		}
		if($otherplayers === ""){
			$otherplayers = "нету";
		}
		$this->api->chat->sendTo(false, "[ChestPrivate] Информация о сундуке:\nВладелец сундука: $owner.\nДругие игроки в привате сундука: $otherplayers.", $username);
	}

	public function __destruct()
	{
		$this->db->close();
	}
}
