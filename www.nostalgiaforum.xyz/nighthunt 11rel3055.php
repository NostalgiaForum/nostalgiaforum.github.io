<?php
 
/*
__PocketMine Plugin__
name=night hunting
description=night hunting
version=1.1
author=amaax
class=nighthunting
apiversion=9
*/
class nighthunting implements Plugin{
	private $pvp,$api,$server;
	public function __construct(ServerAPI $api, $server = false)
    {
        $this->api = $api;
		$this->server = ServerAPI::request();
		$pvp = false;
		
    }
	public function init(){

	$this->server->schedule(50, array($this, "check"),array(),true);
	$this->api->addHandler("player.interact", array(
            $this,
            "eventH"
        ), 15);
	}
	public function check(){
		if($this->api->time->get() > 10900 && $this->api->time->get()% 19200 < 17800 && $this->pvp == false){
			$this->api->chat->broadcast("[PvP mode ON]");
			$this->pvp = true;
		}
		if(($this->api->time->get()% 19200 < 10900 || $this->api->time->get()% 19200 > 17800) && $this->pvp == true){
			$this->api->chat->broadcast("[PvP mode OFF]");
			$this->pvp=false;
		}
	}
	public function eventH($data,$event)
    {
		switch($event){
			case "player.interact" :
			$e = $data["entity"];
				if ($e->class == ENTITY_PLAYER  && $data["targetentity"]->class == ENTITY_PLAYER) {
					if($this->pvp == false){
						$this->api->chat->sendTo(false, "Only at night!", $e->name);
					return false;
				}
				break;
		}
    }
	}
	 public function __destruct()
    {
    }
}