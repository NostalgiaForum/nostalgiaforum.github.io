<?php

/*
__PocketMine Plugin__
name=SignTextToChat
description=Print the text on the sign to chat on click
version=1.0
author=GameHerobrine
class=SignTextToChat
apiversion=12.1
*/

class SignTextToChat implements \Plugin{
	public $api;
	public function __construct(ServerAPI $api, $unused = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.block.touch", [$this, "onPlayerTouch"]);
	}
	
	
	public function onPlayerTouch($d, $e){
		$target = $d["target"];
		$player = $d["player"];
		if($target->getID() == SIGN_POST || $target->getID() == WALL_SIGN){
			$tileAt = $this->api->tile->get($target);
			
			if($tileAt instanceof Tile && $tileAt->class === TILE_SIGN){
				$player->sendChat("Text on sign at {$target->x} {$target->y} {$target->z}:");
				$player->sendChat($tileAt->data["Text1"]);
				$player->sendChat($tileAt->data["Text2"]);
				$player->sendChat($tileAt->data["Text3"]);
				$player->sendChat($tileAt->data["Text4"]);
			}
			
		}
	}
}