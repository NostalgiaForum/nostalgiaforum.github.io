<?php
  /*
__PocketMine Plugin__
name=SexPlugin
description=Sex with another player
version=0.1.0
author=ZenithOwO
class=SexPlugin
apiversion=69
*/

class SexPlugin implements Plugin{

	public function __construct(ServerAPI $api, $server = false){
      $this->api = $api;
	}
	
	public function init(){
		$this->api->console->register("sex", "", [$this, "command"]);
        $this->api->ban->cmdWhitelist("sex");
	}

	public function command($cmd, $args, $issuer, $alias){
		$output = "";
		if(!isset($args[0]) or $args[0] == "") return;
		switch($args[0]){ 
			case "sexhelp": 
				$output .= "/sex `Ник игрока` - смачно выеби игрока!
Сделано ZenithOwO с помощью ArkQuark. 
Сделано дебилом для дебилом <3 owo, nya~";
				break;
			default:
				$output .= "Ты переебался с $args[0]!";
				break;
		}
		return $output;
	}
	
	
	public function __destruct(){
    }
}