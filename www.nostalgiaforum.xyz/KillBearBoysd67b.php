<?php

/*
 __PocketMine Plugin__
name=KillBearBoys
description=Kill all bearboys in your server.("BearBoys" means "Naughty boys")
version=1.0.2
author=ljy
class=KillBearBoys
apiversion=10
*/

/*
Logs
	13.8.18 1.0 Begin
	13.8.20 1.0.1
	13.8.24 1.0.2
*/

class KillBearBoys implements Plugin{
	private $api, $path, $logs, $user, $maxlogs, $num, $level, $x, $y, $z;
	
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->path = $this->api->plugin->createConfig($this, array());
		$this->logs = $this->api->plugin->readYAML($this->path . "config.yml");
		touch($this->path . "maxlogs.yml");
		if(filesize($this->path . "maxlogs.yml") === 0){
			$this->api->plugin->writeYAML($this->path . "maxlogs.yml", array("maxlogs" => 50));
		}
		$this->maxlogs = $this->api->plugin->readYAML($this->path . "maxlogs.yml");
		$this->maxlogs = $this->maxlogs["maxlogs"];
		$this->user = -1;
		$this->api->addHandler("player.block.break", array($this, "eventHandler"), 15); 
		$this->api->addHandler("player.block.place", array($this, "eventHandler"), 15); 
		$this->api->addHandler("player.block.touch", array($this, "eventHandler"), 15);
		$this->api->addHandler("player.quit", array($this, "eventHandler"), 15);
		$this->api->addHandler("player.join", array($this, "eventHandler"), 15);
		$this->api->addHandler("console.command.stop", array($this, "save"), 15); 
		$this->api->addHandler("console.command.save-all", array($this, "save"), 15); 
		$this->api->console->register("co", "Enabled or Disabled", array($this, "commandHandler"));
	}
	
	public function __destruct(){
		
	}
	
	public function eventHandler($data, $event){
		switch($event){
			case "player.quit":
			case "player.join":
				if($data->iusername == $this->user){
					$this->user = -1;
				}
				break;
			case "player.block.place":
				if($data["player"]->iusername == $this->user){
					$p = $data["player"];
					$b = $data["block"];
					$level = $p->entity->level->getName();
					$this->sendlog($p, $b, $level);
					return false;
				}
				$this->savecfg($data["item"], $data["block"], $data["player"], $data["player"]->entity->level->getName(), "place");
				break;
			case "player.block.break":
				if($data["player"]->iusername == $this->user){
					$p = $data["player"];
					$b = $data["target"];
					$level = $p->entity->level->getName();
					$this->sendlog($p, $b, $level);
					return false;
				}
				$this->savecfg($data["target"], $data["target"], $data["player"], $data["player"]->entity->level->getName(), "break");
				break;
			case "player.block.touch":
				if ($data["type"] !== "place") break;
				if ($this->user == -1 or $data["player"]->iusername !== $this->user){
					if($data["player"]->getGamemode() == "creative"){
						break;
					}
					if($data["target"]->getID() === CHEST){
						$this->savecfg($data["target"], $data["target"], $data["player"], $data["player"]->entity->level->getName(), "touch");
					}
					break;
				}
				$p = $data["player"];
				$b = $data["target"];
				$level = $p->entity->level->getName();
				$this->sendlog($p, $b, $level);
				//return false;
				break;
		}
	}
	
	public function commandHandler($cmd, $args, $issuer, $alias){
		$output = "";
		if ($issuer instanceof Player) {
			$player = $issuer;
			if($this->user == -1){
				$this->user = $player->iusername;
				$this->num = 0;
				$this->level = "";
				$this->x = 0;
				$this->y = 0;
				$this->z = 0;
				$output = "[KillBearBoys]Enabled.";
			}
			elseif($this->user == $player->iusername){
				$this->user = -1;
				$output = "[KillBearBoys]Disabled.";
			}
			else{
				$output = "[KillBearBoys]Someone is using this plugin.";
			}
		}
		else{
			$output = "[KillBearBoys]Please run this command in-game.";
		}
		return $output;
	}
	
	public function sendlog($p, $b, $level){
		if (!isset($this->logs[$level][$b->x][$b->y][$b->z])) {
			$output = "[KillBearBoys]x " . $b->x . " y " . $b->y . " z " . $b->z;
			$p->sendChat($output);
			$output = "[KillBearBoys]This block has not any information.";
		}
		else{
			$num = count($this->logs[$level][$b->x][$b->y][$b->z]);
			if($level == $this->level and $b->x == $this->x and $b->y == $this->y and $b->z == $this->z){
				$this->num--;
			}
			else{
				$this->num = $num;
				$this->level = $level;
				$this->x = $b->x;
				$this->y = $b->y;
				$this->z = $b->z;
			}
			if($this->num == 0){
				$this->num = $num;
			}
			if($this->num == $num){
				$output = "[KillBearBoys]x " . $b->x . " y " . $b->y . " z " . $b->z;
				$p->sendChat($output);
			}
			$output = "[KillBearBoys]" . $this->num . "/" . $num;
			$p->sendChat($output);
			$dat = $this->logs[$level][$b->x][$b->y][$b->z][$this->num - 1];
			$output = "[" . $dat['date'] . "][" . $dat['ip'] . "][" . $dat['user'] . "][" . $dat['type'] . "][" . $dat['id'] . "][" . $dat['meta'] . "][" . $dat['name'] . "]";
		}
		$p->sendChat($output);
	}
	
	public function savecfg($b, $t, $player, $level, $type){
		$info = array( "name" => $b->getName(), "id" => (string) $b->getID(), "meta" => (string) $b->getMetadata(), "user" => $player->username, "ip" => $player->ip, "date" => date("Y/m/d-H:i:s", time()), "type" => $type);
		if(isset($this->logs[$level][$t->x][$t->y][$t->z])){
			if(count($this->logs[$level][$t->x][$t->y][$t->z]) == $this->maxlogs){
				array_shift($this->logs[$level][$t->x][$t->y][$t->z]);
			}
		}
		$this->logs[$level][$t->x][$t->y][$t->z][] = $info;
	}
	
	public function save(){
		$this->api->plugin->writeYAML($this->path."config.yml", $this->logs); 
	}
}