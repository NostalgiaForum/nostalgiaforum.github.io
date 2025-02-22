<?php

/*
__PocketMine Plugin__
name=SpamFilter
description=Team DeathMatch
version=1.0.
author=TeamAntinty
class=SpamFilter
apiversion=9,10,11
*/
                
class SpamFilter implements Plugin{
			private $api;
			private $path;
			private $config;
			private $server;

	public function __construct(ServerAPI $api, $server = false){
			$this->api = $api;
			$this->server = ServerAPI::request();
	}

	public function __destruct() {  }

	public function init() {
		$this->config = new Config($this->api->plugin->configPath($this) . "config.txt", CONFIG_LIST);
		$this->api->console->register("spamfilter", "<add|remove> [username]", array($this,"commandHandler"));

		$this->api->addHandler('player.chat', array($this, 'handle'),1);
		$this->api->addHandler('player.quit', array($this, 'handle'),1);
		$this->api->addHandler('player.join', array($this, 'handle'),1);
		$this->playerArray = array();
	}

	public function handle($data, $event) {
		switch ($event) {
			case "player.chat":
				$message = $data["message"];
				$username = $data["player"]->username;
				if((time() - $this->playerArray[$username]["time"]) < 5) {
					$this->api->chat->sendTo(false,"[Spam Filter] Do not try to spam this server", $username);
					return false;
				}elseif($this->config->exists($username)) {
					return true;
				}
				$this->playerArray[$username] = array("time"=>time(),"message"=>$message);
				break;
			case "player.quit":
				$username = $data->username;
				unset($this->playerArray[$username]);
				break;
			case "player.join":
				$username = $data->username;
				$this->playerArray[$username] = array("time"=>time(), "message"=>"");
				break;
		}
	}

	public function commandHandler($cmd, $params, $issuer, $alias) {
		$p = strtolower(array_shift($params));
		switch ($p) {
			case "spamfilter":
				case "add":
					$user = ($params[0]);
					$this->config->set($user);
					$this->config->save($user);
					console($user." has been added to SpamFilter Whitelist");
					break;
				case "remove":
					$user = ($params[0]);
					$this->config->remove($user);
					$this->config->save();
					console($user." Has been removed from SpamFilter Whitelist");
					break;
		}
	}
}
?>

