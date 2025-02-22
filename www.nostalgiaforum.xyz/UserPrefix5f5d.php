<?php

/*
__PocketMine Plugin__
name=UserPrefix
description=UserPrefix
version=2.4
author=1ron_pon3
class=UserPrefix
apiversion=10
*/


class UserPrefix implements Plugin{
	private $api, $lang, $prefix0, $prefix, $path, $config, $user;
	
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->addHandler("player.join", array($this, "handler"), 5);
		$this->api->addHandler("player.chat", array($this, "handler"), 5);
		$this->readConfig();
		$this->api->console->register("setprefix", "Changes Users Prefix", array($this, "Pref"));
		$this->api->console->register("defprefix", "Sets default Prefix", array($this, "Pref"));
		$this->api->console->register("setnick", "Sets default Prefix", array($this, "Pref"));
	    $this->api->console->register("delnick", "Sets default Prefix", array($this, "Pref"));
		
	}
	
	public function __destruct(){
	}
	
	public function readConfig(){
		$this->path = $this->api->plugin->createConfig($this, array(
			"chat-format" => "{WORLDNAME}:[{prefix}]<{DISPLAYNAME}> {MESSAGE}",
			"default" => "Player",
		));
		$this->config = $this->api->plugin->readYAML($this->path."config.yml");
	}

	
	public function Pref($cmd, $args){
	switch($cmd){
	    case "setprefix":
	      $player = $args[0];
		    $pref = $args[1];
         $this->config['player'][$player]['pref'] =$pref;
         $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
         $output .= "[UPrefix] Gived ".$pref." to ".$player.".\n";
		 console(FORMAT_GREEN."[UPrefix] Gived ".$pref." to ".$player.".");
         $this->api->chat->sendTo(false, "[UPrefix] Your prefix is now ".$pref." !", $player);
       break;
	     case "defprefix":
	       $def = $args[0];
	       $this->config['default']=$def;
	       $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
	       $output .= "[UPrefix] Default prefix is now ".$def.".\n";
		    console(FORMAT_GREEN."[UPrefix] Default prefix is set to ".$def);
	     break;
	  default:		$output .= '[UPrefix] UserPrefix by 1ron_pon3';
	  break;
	   case "setnick":
	      $player = $args[0];
		    $nick = $args[1];
         $this->config['player'][$player]['nick'] = "~".$nick;
         $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
         $output .= "[UPrefix] Gived ".$nick." to ".$player.".\n";
		 console(FORMAT_GREEN."[UPrefix] Gived ".$nick." to ".$player.".");
         $this->api->chat->sendTo(false, "[UPrefix] Your nick is now ".$nick." !", $player);
       break;
	   	   case "delnick":
	      $player = $args[0];
         $this->config['player'][$player]['nick'] =$player;
         $this->api->plugin->writeYAML($this->path."config.yml", $this->config);
         $output .= "[UPrefix] ".$player."'s name is now real.\n";
		 console(FORMAT_GREEN."[UPrefix] ".$player."'s name is now real.\n");
         $this->api->chat->sendTo(false, "[UPrefix] Your name is now ".$nick." !", $player);
       break;
	  }
	  return $output;
	  }
	  
	public function handler(&$data, $event){
		switch($event){
				case "player.join":
				$user = $data->username;
				if (!isset($this->config['player'][$user])) {
           $this->config = $this->api->plugin->readYAML($this->path."config.yml");
					$this->config['player'][$user]['pref'] = $this->config['default'];
					$this->config['player'][$user]['nick'] = $user;
					$this->api->plugin->writeYAML($this->path."config.yml", $this->config);
				}
			break;
			case "player.chat":
			    $prefix = $data["player"]->username;
                $this->config = $this->api->plugin->readYAML($this->path."config.yml");
				$data = array("player" => $data["player"], "message" => str_replace(array("{DISPLAYNAME}", "{MESSAGE}", "{WORLDNAME}", "{prefix}"), array($this->config["player"][$prefix]['nick'], $data["message"], $data["player"]->level->getName(), $this->config["player"][$prefix]['pref']), $this->config["chat-format"]));
				if($this->api->handle("UserPrefix.".$event, $data) !== false){
					$this->api->chat->broadcast($data["message"]);
				}
				return false;
				break;
		}
	}	
}