<?php

/*
__PocketMine Plugin__
name=SignChat
description=Chat With Signs!
version=0.2
author=DemonKingz
class=SignChat
apiversion=2
*/


class SignChat implements Plugin{
	private $api;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->event('tile.update', array($this, 'handle'), 15); //Priority higher that API
	}
	
	public function __destruct(){
	
	}
	
	public function handle(&$data, $event){
		switch($event){
			case "tile.update":
                if ($data->class == TILE_SIGN) {
				$username = $data->data['creator'];
                    $lines = $data->data['Text1'].$data->data['Text2'].$data->data['Text3'].$data->data['Text4'];
                    $this->api->chat->broadcast("<".$username."> ".$lines."");
                }
            break;
		}
	}

}