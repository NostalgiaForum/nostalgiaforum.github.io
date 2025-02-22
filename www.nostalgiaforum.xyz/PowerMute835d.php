<?php
/*
__PocketMine Plugin__
name=PowerMute
description=A new kind of muting!
version=0.1
author=Falk
class=PowerMute
apiversion=10
*/
/*
IMPORTANT
If you have a plugin that chnages the layout of chat messages (for example a prefix plugin) you will not be able to use this plugin as intended.
*/
class PowerMute implements Plugin{
private $api, $path;
public function __construct(ServerAPI $api, $server = false){
$this->api = $api;
}

public function init(){

$this->api->addHandler("player.chat", array($this,"eventHandle"),50);
$this->api->console->register("mute", "Mute/Unmute a uset", array($this, "command"));
$this->api->console->register("unmute", "Mute/Unmute a uset", array($this, "command"));


}

public function __destruct(){}
public function command($cmd, $params, $issuer, $alias, $args, $issuer){
$username = $params[0];
if ($cmd == "unmute") {
 unset($this->mutes[$username]);
 $issuer->sendChat($username . " is no longer muted");
 }
else {
	$this->mutes[$username] = strtotime("now");
	$issuer->sendChat($username . " has been power muted");
}

}
public function eventHandle($data, $event) {
$player = $data['player'];
$username = $player->username;
$message = $data['message'];
if (isset($this->mutes[$username])) {

	$player->sendChat("<" . $username . "> " . $message);
	return false;
}
else {
	return true;
}
	}
}