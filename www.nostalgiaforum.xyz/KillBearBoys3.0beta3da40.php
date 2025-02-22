<?php

/*
 __PocketMine Plugin__
name=KillBearBoys
description=
version=3.0beta3
author=ljy
class=KillBearBoys
apiversion=10,11,12
*/

define('KBB', '[KillBearBoys] ');

class KillBearBoys implements Plugin{
	public $api;
	public $database;
	public $user;
	public $temp;
	public $num;
	public $position;
	
	public function __construct(ServerAPI $api, $server = false){ 
		$this->api = $api;
	}
	
	public function init(){
		$this->user = "";
		$this->temp = false;
		$this->position = array();
		//获取插件所在的路径，(加一个realpath来处理winXP下的路径(暂时不管了))
		$path = $this->api->plugin->configPath($this)."DateBase.db";
		$path = str_replace("\\", "/", $path);
		//$pat = realpath($path);
		//检查数据库是否存在，若否，则新建并初始化
		var_dump($path);
		//var_dump($pat);
		if(!file_exists($path)){
			//file_put_contents($path, NULL);
			$this->database = new SQLite3($path);
			$this->query("CREATE TABLE logs (
				id INTEGER PRIMARY KEY, 
				name TEXT, 
				action TEXT, 
				blockname TEXT, 
				blockId TEXT, 
				meta TEXT, 
				level TEXT, 
				x NUMERIC, 
				y NUMERIC, 
				z NUMERIC, 
				time NUMERIC);");
		}
		else{
			$this->database = new SQLite3($path);
		}
		//注册命令
		$this->api->console->register("q", "DataBase commands", array($this, "handleCommand")); 
		$this->api->console->register("co", "get logs", array($this, "handleCommand"));
		$this->api->console->register("test", "", array($this, "handleCommand"));
		//添加事件句柄
		$this->api->addHandler("player.block.break", array($this, "blockactionHandler")); 
		$this->api->addHandler("player.block.place", array($this, "blockactionHandler")); 
		//$this->api->addHandler("player.block.touch", array($this, "blockactionHandler"));
		$this->api->addHandler("console.command.stop", array($this, "save"));
	}
	
	public function blockactionHandler($data, $event){
		if($data["player"]->username == $this->user){
			$this->getLog($data, $event, false);
			return false;
		}
		else{
			$this->addLog($data, $event);
		}
	}
	
	public function getLog($data, $event, $output = true){
		switch($event){
			case 'player.block.place':
				$target = $data['block'];
				break;
			case 'player.block.break':
				$target = $data['target'];
				break;
		}
		$level = $data['player']->entity->level->getName();
		$x = $target->x;
		$y = $target->y;
		$z = $target->z;
		$position = array($level, $x, $y, $z);
		$query = "SELECT * FROM logs WHERE level='".$level."' AND x='".$x."' AND y='".$y."' AND z='".$z."' ORDER BY id DESC";
		
		if($output){
			$this->outputQuery($query);
			return;
		}
		
		$count = count($this->temp);
		// foreach($this->temp as $val){
			// console($this->arr2str($val));
		// }
		if($this->position == $position){
			if($this->num >= ($count - 1)){
				$this->num = 0;
			}
			else{
				$this->num++;
			}
		}
		else{
			$this->position = $position;
			$this->temp = array();
			$this->num = 0;
			$fetch = $this->query($query);
			if(!($fetch instanceof SQLite3Result)){
				$result = KBB.'No logs here or server is too busy.';
				$data['player']->sendChat($result);
				return;
			}
			while(($dat = $fetch->fetchArray(SQLITE3_ASSOC)) !== false){
				$this->temp[] = $dat;
			}
			$fetch->finalize();
			$count = count($this->temp);
		}
		
		if($count == 0){
			$result = KBB.'No logs here or server is too busy.';
		}
		else{
			$result = KBB.'['.($count - $this->num).'/'.$count.'] [x:'.$x.'][y:'.$y.'][z:'.$z."]\n";
			$result = $result.$this->arr2str($this->temp[$this->num]);
		}
		
		$data['player']->sendChat($result);
	}
	
	public function addLog($data, $event){
		if($event == "player.block.touch") return; //暂时不记录touch事件，下个版本再说
		switch($event){
			case "player.block.place":
				$target = $data["block"];
				$block = $data["item"];
				$action = "place";
				break;
			case "player.block.break":
				$target = $data["target"];
				$block = $data["target"];
				$action = "break";
				break;
			case "player.block.touch":
				if($data["type"] == "break") return;
				$target = $data["target"];
				$block = $data["target"];
				$action = "touch";
				break;
		}
		$name = $data["player"]->iusername;
		$blockname = $block->getName();
		$blockId = $block->getID();
		$meta = $block->getMetadata();
		$level = $data["player"]->entity->level->getName();
		$x = $target->x;
		$y = $target->y;
		$z = $target->z;
		$this->query("INSERT INTO logs VALUES (NULL, '".$name."', '".$action."', '".$blockname."', '".$blockId."', '".$meta."', '".$level."', '".$x."', '".$y."', '".$z."', ".time().")");
	}
	
	public function handleCommand($cmd, $arg, $issuer, $alias){ 
		switch($cmd){
			case "q":
				if(count($arg) == 0) console("error");
				$query = "";
				foreach($arg as $text){
					$query = $query.$text." ";
				}
				$this->outputQuery($query);
				break;
			case "co":
				if($this->user == $issuer->username){
					$this->user = "";
					$issuer->sendChat(KBB.'Disabled.');
				}
				else{
					$this->user = $issuer->username;
					$issuer->sendChat(KBB.'Enabled.');
				}
				break;
			case "test":
				$this->test();
				break;
		}
	}
	
	public function arr2str($arr){
		$str = KBB.'BlockID: #'.$arr['blockId'].' ('.$arr['blockname'].')'."\n";
		$str = $str.KBB.'The player who '.$arr['action'].' this block: '.$arr['name']."\n";
		$interval = round((time() - $arr['time']) / 3600, 2);
		$str = $str.KBB.'Time: '.$interval.' hour(s) ago';
		return $str;
	}
	
	public function pos2str(Position $pos){
		return "Position(level=".$pos->level->getName().",x=".ceil($pos->x).",y=".ceil($pos->y).",z=".ceil($pos->z).")";
	}
	
	public function outputQuery($query){
		$data = $this->query($query);
		while(($dat = $data->fetchArray(SQLITE3_ASSOC)) !== false){
			//var_dump($dat);
			console($this->arr2str($dat));
		}
		console(KBB.'NULL');
		//var_dump('NULL');
		$data->finalize();
	}
	
	public function test(){
		$this->query("INSERT INTO logs VALUES (NULL, 'ljy', 'place', 'Stone', '1', '0', 'world', 120, 120, 120, ".time().");");
	}
	
	public function query($sql, $fetch = false){
		$result = $this->database->query($sql) or console("[ERROR] [SQL Error] ".$this->database->lastErrorMsg().". Query: ".$sql, true, true, 0);
		if($fetch === true and ($result instanceof SQLite3Result)){
			$result = $result->fetchArray(SQLITE3_ASSOC);
		}
		return $result;
	}
	
	// private function addLog($player, $x, $y, $z, $action, $block){
		// $name = $player->username;
		// $blockname = $block->getName();
		// $blockId = $block->getID();
		// $meta = $block->getMetadata();
		// $level = $player->entity->level->getName();
	// }
	
	public function save(){
		$this->database->close();
	}
	
	public function __destruct(){
		
	}
}

class SQLite3Thread extends Thread{
	public $result;
	public $sql;
	public $database;

	public function __construct($sql, $KillBearBoys){
		$this->sql = $sql;
		$this->database = new SQLite3(":memory:");
	}
	
	public function run(){
		$this->result = $this->database->query($this->sql) or console("[ERROR] [SQL Error] ".$this->database->lastErrorMsg().". Query: ".$this->sql, true, true, 0);
	}
}