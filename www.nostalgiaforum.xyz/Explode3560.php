<?php

/*
__PocketMine Plugin__
name=Explode
description=Create an explosion
version=0.2
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
		$this->api->console->register("explode", "<power> [player]", array($this, "commandHandler"));
		
	}
	public function commandHandler($cmd, $params, $issuer, $alias){
		$output = "";
		switch($cmd){
			case "explode":
				if(!isset($params[1]) and !($issuer instanceof Player)){					
					$output .= "Please run this command in-game.\n";
					return $output;
				}
				$power = 4;
				if(isset($params[0])){
					$power = (float) $params[0];
				}
				
				if(isset($params[1])){
					$issuer = $this->api->player->get($params[1]);
					if(!($issuer instanceof Player)){					
						$output .= "The player doesn't exists.\n";
						return $output;
					}
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