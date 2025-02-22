<?php

/*
 __PocketMine Plugin__
name=RespawnWithoutDrop
description=Respawn Without Droping Any Item(Back to target world)
version=1.0
author=RapDoodle
class=RespawnWithoutDrop
apiversion=12,12.1
*/

class RespawnWithoutDrop implements Plugin{ 
	private $api;
	
	public function __construct(ServerAPI $api, $server =false){ 
		$this->api = $api;
		$this->server = ServerAPI::request();
	}
	
	public function init(){ 
		$this->api->addHandler("entity.health.change", array($this, "event"), 50);
	}
	public function event($data, $event){
		if($event == "entity.health.change"){
			$player = $data["entity"]->player;
			if($player !== false){
				$hp = $data["health"];
				if($hp <= 0){
					$player->entity->setHealth(20, "respawn", true);
					$data = array("player" => $player, "cause" => $data["cause"]);
					$world = $player->level->getName();
					$player->teleport($this->api->level->get($world)->getSafeSpawn());
					
					$player->fire = 0;
					$player->air = 300;
					
					$cause = $data['cause'];
					$deathmsg = $this->getDeathCauseMessage($cause);
					$this->api->chat->broadcast("<server> ".$player->username.$deathmsg);
					return false;
				}
			}
		}

    }
    
    public function getDeathCauseMessage($cause){
        if(is_numeric($cause)){
            $e = $this->server->api->entity->get($cause);
            if($e instanceof Entity){
                switch($e->class){
                    case ENTITY_PLAYER:
                        $message = " was killed by ".$e->name;
                        break;
                    default:
                        $message = " was killed";
                        break;
                }
            }
        }else{
            switch($cause){
                case "cactus":
                    $message = " was pricked to death";
					break;
                case "lava":
                    $message = " tried to swim in lava";
					break;
                case "fire":
                    $message = " went up in flames";
					break;
                case "burning":
                    $message = " burned to death";
                case "suffocation":
                    $message = " suffocated in a wall";
					break;
                case "water":
                    $message = " drowned";
					break;
                case "void":
                    $message = " fell out of the world";
					break;
                case "fall":
                    $message = " hit the ground too hard";
					break;
                case "explosion":
                    $message = " blew up";
					break;
                default:
                    $message = " died";
					break;
            }
        }
        return $message;
    }
	
	public function __destruct(){}
	
}