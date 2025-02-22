<?php

/*
__PocketMine Plugin__
name=SimpleAuth
description=Prevents people to impersonate an account, requiring registration and login when connecting.
version=0.4.0_01
author=shoghicp/ArkQuark/GameHerobrine
class=SimpleAuth
apiversion=12,12.1
*/

/*

Changelog:
0.4.0_01
* authenticateByLastIP fix
* Incorrect password message

0.4.0
* Anti bad password
* Custom messages
* Now data stored in .db file

0.3.9 (GameHerobrine's update)
* PHP8 compability
* /login and /register can be also used instead of /l /reg
* using /login and /register will not show those commands in console

Nostalgia1.0/0.3.8Nostalgia (ArkQuark's update)
* Player logged message
* /login , /register -> /l , /reg

0.3.8
* Hopefully fixed undefined indexes errors

0.3.7
* Added single session kick reason

0.3.6
* Extended latest crash fix

0.3.5
* Fixed crash caused by a race condition

0.3.4
* Fixed bug when using authentication by IP

0.3.3
* Authentication by last IP (optional)
* Players won't be harmed during login/register

0.3.2
* Fixed a few bugs
* Added min. password length in the config

0.3.1
* Added folder per letter

0.3:
* Optimized performance
* Added admin commands

0.2:
* Refuse short passwords
* Added simpleauth.login, simpleauth.register, simpleauth.logout handler events

0.1:
* Initial release

*/

class SimpleAuth implements Plugin{
	private $api, $server, $config, $sessions, $database, $messages, $error, $badPasswordMessage, $shortPasswordMessage, $successRegisterMessage, $successUnregisterMessage, $successAuthMessage, $registerMessage, $loginMessage, $lastBroadcast = 0;
	private static $minPassLength;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
		$this->server = ServerAPI::request();
		$this->sessions = array();
		SimpleAuthAPI::set($this);
	}
	
	public function init(){
		$this->config = new Config($this->api->plugin->configPath($this)."config.yml", CONFIG_YAML, array(
			"allowChat" => false,
			"messageInterval" => 5,
			"timeout" => 120,
			"allowRegister" => true,
			"forceSingleSession" => true,
			"minPasswordLength" => 6,
			"authenticateByLastIP" => false,
			"checkPassword" => false,
			"badPasswords" => ["badpass1"]
		));
		$this->messages = new Config($this->api->plugin->configPath($this)."messages.yml", CONFIG_YAML, [
			"errorMessage" => "[SimpleAuth] Error during authentication.",
			"badPasswordMessage" => "[SimpleAuth] Bad password.",
			"shortPasswordMessage" => "[SimpleAuth] Password is too short.",
			"successRegisterMessage" => "[SimpleAuth] You've been sucesfully registered.",
			"successUnregisterMessage" => "[SimpleAuth] Unregistered correctly.",
			"successAuthMessage" => "[SimpleAuth] You've been authenticated.",
			"registerMessage" => "[SimpleAuth] You must register using /reg <password>",
			"loginMessage" => "[SimpleAuth] You must authenticate using /l <password>",
			"incorrectPassword" => "[SimpleAuth] Incorrect password"
		]);
		$this->error = $this->messages->get("errorMessage");
		$this->badPasswordMessage = $this->messages->get("badPasswordMessage");
		$this->shortPasswordMessage = $this->messages->get("shortPasswordMessage");
		$this->successRegisterMessage = $this->messages->get("successRegisterMessage");
		$this->successUnregisterMessage = $this->messages->get("successUnregisterMessage");
		$this->successAuthMessage = $this->messages->get("successAuthMessage");
		$this->registerMessage = $this->messages->get("registerMessage");
		$this->loginMessage = $this->messages->get("loginMessage");
		$this->incorrectPassword = $this->messages->get("incorrectPassword");
		self::$minPassLength = $this->config->get("minPasswordLength");
		$path = str_replace("\\", "/", $this->api->plugin->configPath($this) . "players.db");
        if(!file_exists($path)){
            $this->database = new SQLite3($path);
            $this->database->query("CREATE TABLE players (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE,
                registerdate TEXT,
				logindate TEXT,
				lastip TEXT,
				hash TEXT
                );");
        }else{
            $this->database = new SQLite3($path);
        }
		if(file_exists($this->api->plugin->configPath($this)."players/")){
			$files = scandir($this->api->plugin->configPath($this)."players/");
		}
		DataPacketReceiveEvent::register([$this, "receiveHandler"]);
		$this->api->addHandler("player.quit", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.connect", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.spawn", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.respawn", array($this, "eventHandler"), 50);
		$this->api->addHandler("player.chat", array($this, "eventHandler"), 50);
		$this->api->addHandler("op.check", array($this, "eventHandler"), 50);
		$this->api->addHandler("entity.health.change", array($this, "eventHandler"), 50);
		$this->api->schedule(20, array($this, "checkTimer"), array(), true);
		$this->api->console->register("unreg", "<password>", array($this, "commandHandler"));		
		$this->api->ban->cmdWhitelist("unreg");
		$this->api->console->register("simpleauth", "<command> [parameters...]", array($this, "commandHandler"));
		console("[INFO] SimpleAuth enabled!");
	}

	public function addData($username, $registerdate, $logindate, $lastip, $hash){
		$username = strtolower($username);
		if(!$this->getData($username)){
			$this->database->query("REPLACE INTO players (username, registerdate, logindate, lastip, hash) VALUES ('".$username."', '".$registerdate."', '".$logindate."', '".$lastip."', '".$hash."');");
		}else{
			$this->database->query("UPDATE players SET registerdate = '".$registerdate."', logindate = '".$logindate."', lastip = '".$lastip."', hash = '".$hash."' WHERE username = '".$username."';");
		}
	}

	public function removeData($username){
		$username = strtolower($username);
		$this->database->query("DELETE FROM players WHERE username = '".$username."';");
	}

	public function getData($username){
		$username = strtolower($username);
		$row = $this->database->query("SELECT * FROM players WHERE username = '".$username."';")->fetchArray();
		if(!$row) return false;
		return ["registerdate" => $row["registerdate"], "logindate" => $row["logindate"], "lastip" => $row["lastip"], "hash" => $row["hash"]];
	}

	public function startsWith($string, $query){
		return substr($string, 0, strlen($query)) === $query;
	}	

	public function receiveHandler(DataPacketReceiveEvent $event){
		$packet = $event->getPacket();
		$player = $event->getPlayer();
		if($packet->pid() === ProtocolInfo::MESSAGE_PACKET){
			if($this->startsWith($packet->message, "/login ") || $this->startsWith($packet->message, "/l ")){
				$cmd = explode(" ", $packet->message);
				unset($cmd[0]);
				if($this->checkLogin($player, implode(" ", $cmd))){
					$this->login($player);
				}else{
					$player->sendChat($this->incorrectPassword);
				}
				$event->setCancelled(true);
			}
			if($this->config->get("allowRegister") && ($this->startsWith($packet->message, "/register ") || $this->startsWith($packet->message, "/reg "))){
				$cmd = explode(" ", $packet->message);
				unset($cmd[0]);
				if($this->config->get("checkPassword") and in_array(implode(" ", $cmd), $this->config->get("badPasswords"))){
					$player->sendChat($this->badPasswordMessage);
				}elseif(strlen(implode(" ", $cmd)) < self::$minPassLength){
					$player->sendChat($this->shortPasswordMessage);
				}elseif($this->register($player, implode(" ", $cmd))){
					$player->sendChat($this->successRegisterMessage);
					$this->login($player);
				}
				$event->setCancelled(true);
			}
		}
	}

	public function commandHandler($cmd, $params, $issuer, $alias){
		$output = "";
		switch($cmd){
			case "simpleauth":
				if(!isset($params[0])){
					$output .= "Usage: /simpleauth <command> [parameters...]\n";
					$output .= "Available commands: help, unregister\n";
				}
				switch(strtolower(array_shift($params))){
					case "unreg":
						if(($player = $this->api->player->get($params[0])) instanceof Player){						
							$this->removeData($player);
							$this->logout($player);
						}else{
							$this->removeData($player);
						}
						break;
					case "help":
					default:
						$output .= "/simpleauth help: Shows this information.\n";
						$output .= "/simpleauth unreg <player>: Removes the player from the database.\n";
				}
				break;
			case "unreg":
				if(!($issuer instanceof Player)){
					$output .= "Please run this command inside the game.\n";
					break;
				}
				if($this->sessions[$issuer->CID] !== true){
					$output .= "Please login first.\n";
					break;
				}
				$d = $this->getData($issuer->iusername);
				if($d !== false and $d["hash"] === $this->hash($issuer->iusername, implode(" ", $params))){
					$this->removeData($issuer->iusername);
					$this->logout($issuer);
					$output .= $this->successUnregisterMessage;
				}else{
					$output .= $this->error;
				}
				break;
		}
		return $output;
	}
	
	public function checkTimer(){
		if($this->config->get("allowRegister") !== false and ($this->lastBroadcast + $this->config->get("messageInterval")) <= time()){
			$broadcast = true;
			$this->lastBroadcast = time();
		}else{
			$broadcast = false;
		}
		
		if(($timeout = $this->config->get("timeout")) <= 0){
			$timeout = false;
		}
		
		foreach($this->sessions as $CID => $timer){
			if($timer !== true and $timer !== false and isset($this->server->clients[$CID]) and ($this->server->clients[$CID] instanceof Player)){				
				if($broadcast === true){
					$d = $this->getData($this->server->clients[$CID]->iusername);
					if($d === false){					
						$this->server->clients[$CID]->sendChat($this->registerMessage);
					}else{
						$this->server->clients[$CID]->sendChat($this->loginMessage);
					}
				}
				if($timeout !== false and ($timer + $timeout) <= time()){
					$this->server->clients[$CID]->close("authentication timeout");
				}
			}
		}
		
	}
	
	private function hash($salt, $password){
		return bin2hex(hash("sha512", $password . $salt, true) ^ hash("whirlpool", $salt . $password, true));
	}
	
	public function checkLogin(Player $player, $password){
		$d = $this->getData($player->iusername);
		if($d !== false and $d["hash"] === $this->hash($player->iusername, $password)){
			return true;
		}
		return false;
	}
	
	public function login(Player $player){
		$d = $this->getData($player->iusername);
		$this->addData($player->iusername, $d["registerdate"], time(), $player->ip, $d["hash"]);
		$name = $player->iusername;
		$this->sessions[$player->CID] = true;
		$player->blocked = false;
		$player->entity->setHealth($player->entity->health, "generic");
		$player->sendChat($this->successAuthMessage);
		console("[SimpleAuth] ".$name." just logged");
		$this->server->handle("simpleauth.login", $player);
		return true;
	}
	
	public function logout(Player $player){
		$this->sessions[$player->CID] = time();
		$player->blocked = true;
		$this->server->handle("simpleauth.logout", $player);
	}
	
	public function register(Player $player, $password){	
		$d = $this->getData($player->iusername);
		if($d === false){
			$this->addData($player->iusername, time(), time(), $player->ip, $this->hash($player->iusername, $password));
			$this->server->handle("simpleauth.register", $player);
			return true;
		}
		return false;
	}
	
	public function eventHandler($data, $event){
		switch($event){
			case "player.quit":
				unset($this->sessions[$data->CID]);
				break;
			case "player.connect":
				$p = $this->api->player->get($data->iusername);
				$this->sessions[$data->CID] = false;
				if($this->config->get("forceSingleSession") === true){
					if(($p instanceof Player) and $p->iusername === $data->iusername){
						$p->close("player already connected", false);
						unset($this->sessions[$data->CID]);
						return false;
					}
				}
				break;
			case "player.spawn":
				if(!isset($this->sessions[$data->CID]) or $this->sessions[$data->CID] !== true){
					$this->sessions[$data->CID] = time();
					$data->blocked = true;
					$data->sendChat("[SimpleAuth] This server uses SimpleAuth to protect your account.");
					if($this->config->get("allowRegister") !== false){
						$d = $this->getData($data->iusername);
						if($this->config->get("authenticateByLastIP") === true and $d["lastip"] == $data->ip){
							$this->login($data);
							break;
						}
						if($d === false){					
							$data->sendChat($this->registerMessage);
						}else{
							$data->sendChat($this->loginMessage);
						}
					}
				}
				break;
			case "entity.health.change":
				if(($data["entity"]->player instanceof Player) and (!isset($this->sessions[$data["entity"]->player->CID]) or $this->sessions[$data["entity"]->player->CID] !== true)){
					return false;
				}
				break;
			case "player.chat":
				if($this->config->get("allowChat") !== true and $this->sessions[$data["player"]->CID] !== true){
					return false;
				}
				break;
			case "op.check":
				$p = $this->api->player->get($data);
				if(($p instanceof Player) and (!isset($this->sessions[$p->CID]) or $this->sessions[$p->CID] !== true)){
					return false;
				}
				break;
			case "player.respawn":
				if(!isset($this->sessions[$data->CID]) or $this->sessions[$data->CID] !== true){
					$data->blocked = true;
				}
				break;
		}
		return;
	}
	
	public function __destruct(){
		$this->config->save();
		$this->database->close();
	}

}

class SimpleAuthAPI{
	private static $object;
	public static function set(SimpleAuth $plugin){
		if(SimpleAuthAPI::$object instanceof SimpleAuth){
			return false;
		}
		SimpleAuthAPI::$object = $plugin;
	}
	
	public static function get(){
		return SimpleAuthAPI::$object;
	}
	
	public static function login(Player $player){
		return SimpleAuthAPI::$object->login($player);
	}
	
	public static function logout(Player $player){
		return SimpleAuthAPI::$object->logout($player);
	}
}
