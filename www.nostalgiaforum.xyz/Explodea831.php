<?php

/*
__PocketMine Plugin__
name=Explode
description=Create an explosion
version=0.1
author=shoghicp
class=ExplodePlugin
apiversion=10
*/



class ExplodePlugin implements Plugin{
	private $api;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->console->register("explode", "[power]", array($this, "commandHandler"));
		
	}
	public function commandHandler($cmd, $params, $issuer, $alias){
		$output = "";
		switch($cmd){
			case "explode":
				if(!($issuer instanceof Player)){					
					$output .= "Please run this command in-game.\n";
					return $output;
				}
				$power = 4;
				if(isset($params[0])){
					$power = (float) $params[0];
				}
				$e = new Explosion(new Position($issuer->entity->x, $issuer->entity->y + 0.5, $issuer->entity->z, $issuer->level), $power);
				$e->explode();
				$output .= "Created an explosion with power $power\n";
				break;
		}
		return $output;
	}
	
	public function __destruct(){

	}

	
}