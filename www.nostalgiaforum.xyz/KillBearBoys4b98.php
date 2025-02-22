<?php

/*
 __PocketMine Plugin__
name=KillBearBoys
description=Kill all bearboys in your server.("BearBoys" means "Naughty boys")
version=2.0.2
author=ljy
class=KillBearBoys
apiversion=10,11,12
*/

/*
Logs
	13.8.18 1.0 Begin
	13.8.20 1.0.1
	13.8.24 1.0.2
	13.11.16 2.0
	-rewrite all things
	13.11.23 2.0.1
	-Fix bug
	14.3.1 2.0.2
	-Remove default timezone
*/

class KillBearBoys implements Plugin{
	private $api, $wands, $path;
	
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.block.break", array($this, "eventHandler")); 
		$this->api->addHandler("player.block.place", array($this, "eventHandler")); 
		$this->api->addHandler("player.block.touch", array($this, "eventHandler"));
		$this->api->addHandler("player.quit", array($this, "eventHandler"));
		$this->api->console->register("co", "Enable/Disable", array($this, "commandHandler"));
		$this->api->ban->cmdWhitelist("co");
		@mkdir(DATA_PATH."plugins/");
		@mkdir(DATA_PATH."plugins/KillBearBoys/");
		@mkdir(DATA_PATH."plugins/KillBearBoys/data/");
		$this->path = DATA_PATH."plugins/KillBearBoys/data";
		$this->wands = array();
	}
	
	public function __destruct(){
		
	}
	
	public function eventHandler($data, $event){
		if($event == "player.quit"){
			if(isset($this->wands[$data->username])){
				unset($this->wands[$data->username]);
			}
			return true;
		}
		switch($event){
			case "player.block.place":
				$target = $data["block"];
				$block = $data["item"];
				break;
			case "player.block.break":
			case "player.block.touch":
				$target = $data["target"];
				$block = $data["target"];
				break;
		}
		$level = $data["player"]->entity->level->getName();
		$x = $target->x;
		$y = $target->y;
		$z = $target->z;
		$logs = new logs($x, $y, $z, $level, $this->path);
		if(!isset($this->wands[$data["player"]->username])){
			$action = substr($event, 13);
			$log = array(
				"name" => $data["player"]->username,
				"action" => $action,
				"time" => date("Y/m/d-H:i:s", time()),
				"blockname" => $block->getName(),
				"blockId" => (string) $block->getID(),
				"meta" => (string) $block->getMetadata(),
			);
			$logs->addLog($log);
			unset($logs);
			return;
		}
		if($this->wands[$data["player"]->username] instanceof logs){
			if(logs::equals($this->wands[$data["player"]->username], $logs)){
				$data["player"]->sendChat($this->wands[$data["player"]->username]->getLog());
			}
			else{
				$data["player"]->sendChat($logs->getLog());
				$this->wands[$data["player"]->username] = $logs;
			}
		}
		else{
			$data["player"]->sendChat($logs->getLog());
			$this->wands[$data["player"]->username] = $logs;
		}
		unset($logs);
		return false;
	}
	
	public function commandHandler($cmd, $args, $issuer, $alias){
		$output = "";
		if ($issuer instanceof Player) {
			$player = $issuer;
			if(!isset($this->wands[$player->username])){
				$this->wands[$player->username] = true;
				$output = "[KillBearBoys]Enable.";
			}
			else{
				unset($this->wands[$player->username]);
				$output = "[KillBearBoys]Disable.";
			}
		}
		else{
			$output = "[KillBearBoys]Please run this command in-game.";
		}
		return $output;
	}
}

class logs{
	public $x, $y, $z, $level, $num, $now, $path;
	
	public function __construct($x, $y, $z, $level, $path){
		$this->x = $x;
		$this->y = $y;
		$this->z = $z;
		$this->level = $level;
		@mkdir("$path/$level/");
		@mkdir("$path/$level/$x/");
		@mkdir("$path/$level/$x/$y/");
		@mkdir("$path/$level/$x/$y/$z/");
		$this->path = "$path/$level/$x/$y/$z";
		if(!file_exists($this->path."/num.dat")){
			touch($this->path."/num.dat");
			file_put_contents($this->path."/num.dat", 0);
		}
		$this->getNum();
		$this->now = 0;
	}
	
	public function getNum(){
		$path = $this->path."/num.dat";
		$data = file_get_contents($path);
		$num = (int)$data;
		$this->num = $num;
		return $num;
	}
	
	public function getLog(){
		if($this->num < 1) return "[Logs]There are no logs here.";
		if($this->now < 1) $this->now = $this->num;
		$path = $this->path."/".$this->now.".dat";
		$data = file_get_contents($path);
		$log = json_decode($data, true);
		$text = "[Logs][".$this->now."/".$this->num."]\n";
		foreach($log as $key => $val){
			$text .= "[$key][$val]\n";
		}
		$this->now--;
		return $text;
	}
	
	public function move($position){
		if(($position < 1) or ($position > $this->num)) return false;
		$this->now = $position;
		return true;
	}
	
	public static function equals(logs $a, logs $b){
		if($a->level == $b->level
			and $a->x == $b->x
			and $a->y == $b->y
			and $a->z == $b->z
		){
			return true;
		}
		return false;
	}
	
	public function addLog($log){
		$data = json_encode($log);
		$this->num++;
		$path = $this->path."/".$this->num.".dat";
		file_put_contents($path, $data);
		$path = $this->path."/num.dat";
		file_put_contents($path, $this->num);
		return true;
	}
}