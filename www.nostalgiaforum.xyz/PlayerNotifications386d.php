<?php

/*
__PocketMine Plugin__
name=PlayerNotifications
description=
version=0.1
author=DemonKingz
class=PlayerNotifications
*/


class PlayerNotifications implements Plugin{
	private $api;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.block.place", array($this, "handle"), 15); //Priority higher that API
		$this->api->addHandler("player.block.break", array($this, "handle"), 15);
		$this->api->addHandler("player.equipment.change", array($this, "handle"), 15);
	}
	
	public function __destruct(){
	
	}
	
	public function handle(&$data, $event){
		switch($event){
			case "player.block.place":
			$username = $this->api->player->getByEID($data['eid'])->username;
			$block = $this->api->level->getBlock($data['x'], $data['y'], $data['z']);
			$this->equipment[0] = $data["block"];
			$this->equipment[1] = $data["meta"];
				if($data["block"]){
					$this->api->chat->broadcast("".$username." placed ".$data["block"].":".$data["meta"]." at X ".$data["x"].", Y ".$data["y"].", Z ".$data["z"]."");
				}
				break;
			case "player.block.break":
			$username = $this->api->player->getByEID($data['eid'])->username;
			$block = $this->api->level->getBlock($data['x'], $data['y'], $data['z']);
			$this->equipment[0] = $data["block"];
			$this->equipment[1] = $data["meta"];
				if($data["eid"]){
					$this->api->chat->broadcast("".$username." broke ".$block[0].":".$block[1]." at X ".$data["x"]." Y ".$data["y"]." Z ".$data["z"]."");
				}
				break;
			case "player.equipment.change":
			$username = $this->api->player->getByEID($data['eid'])->username;
				if($data["block"]){
					$this->api->chat->broadcast("".$username." has now ".$data["block"].":".$data["meta"]." in their hands!");
				}
				break;
		}
	}

}