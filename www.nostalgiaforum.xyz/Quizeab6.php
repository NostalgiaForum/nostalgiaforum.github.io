<?php

/*
__PocketMine Plugin__
name=Quiz
description=Enjoy quiz!
version=1.0.1
author=smk020(곱등연가)
class=quiz
apiversion=10
*/

class quiz implements Plugin {
private $api, $config, $path;
public function __construct(ServerAPI $api, $server =false) {
$this->api =$api;
 $this->server =ServerAPI::request();
 }
public function init() {
 $this->api->addHandler("player.spawn", array($this, "eventHandler"), 6);
 $this->api->console->register("quiz", "퀴즈 설정", array($this, "commandHandler"));
 $this->api->console->register("an", "정답!", array($this, "commandHandler"));
$this->api->console->register("san", "정답 설정", array($this, "commandHandler"));
 $this->api->console->register("point", "포인트보기", array($this, "commandHandler"));
 $this->api->console->register("spoint", "얻는 포인트 설정", array($this, "commandHandler"));
 $this->path =$this->api->plugin->createConfig($this, array());
 $this->conf =$this->api->plugin->readYAML($this->path ."config.yml");
}
public function eventHandler($data, $event) {
switch($event) {
case "player.spawn": $player =$this->api->player->getByEID($data->eid);
 $user =$player->iusername;
 $config =$this->api->plugin->readYAML($this->path ."config.yml");
if(!array_key_exists($user, $config)) {
 $this->conf[$player->iusername]["quiz"] ="퀴즈없음";
 $this->conf[$player->iusername]["getpoint"] =100;
$this->conf[$player->iusername]["answers"] ="정답";
$this->conf[$player->iusername]["point"] =0;

$this->write($this->conf);
}
else{
 $this->api->chat->broadcast("[Quiz] $user 님이 퀴즈에 참여하셨습니다.");
}
break;
}
}
public function commandHandler($cmd, $args, $issuer, $alias) {
$output ="";
 $cmd =strtolower($cmd);
 switch ($cmd) {
case "quiz":
$quiz = $args[0];
$chat = $args[1];
$chat2 = $args[2];
$chat3 = $args[3];
$chat4 = $args[4];
$chat5 = $args[5];
$chat6 = $args[6];
$chat7 = $args[7];
$chat8 = $args[8];
$chat9 = $args[9];
$chat10 = $args[10];
$chat11 = $args[11];
$chat12 = $args[12];
$chat13 = $args[13];
$chat14 = $args[14];
$chat15 = $args[15];
$chat16 = $args[16];
$chat17 = $args[17];
$quizs = $quiz.$chat.$chat2.$chat3.$chat4.$chat5.$chat6.$chat7.$chat8.$chat9.$chat10.$chat11.$chat12.$chat13.$chat14.$chat15.$chat16.$chat17;
$this->conf[$issuer->username]["quiz"] = $quizs;
$this->write($this->conf);
$this->api->chat->broadcast("[Quiz] $issuer->username 's Quiz! \n $quiz $chat $chat2 $chat3 $chat4 $chat5 $chat6 $chat7 $chat8 $chat9 $chat10 $chat11 $chat12 $chat13 $chat14 $chat15 $chat16 $chat17");
break;
case "spoint":
$sp = $args[0];
$this->conf[$issuer->username]["getpoint"] = $sp;
$this->write($this->conf);
$this->api->chat->broadcast("[Quiz] $issuer->username 's quiz if it passes \n get point $sp !!!");
break;
case "an":
$us = $args[0];
$an = $args[1];
$gp = $this->conf[$us]["getpoint"];
if($this->conf[$us]["answers"] == $an)
{
$this->api->chat->broadcast("[Quiz] $issuer->username is $us 's quiz passing! \n Get point $gp
!!!");
$this->conf[$issuer->username]["point"] = $this->conf[$issuer->username]["point"] + $gp;
$this->write($this->conf);
break;
}
case "san":
$man = $args[0];
$this->conf[$issuer->username]["answers"] = $man;
$this->write($this->conf);
break;
case "point":
$po = $this->conf[$issuer->username]["point"];
$this->api->chat->sendTo(false, "Your point: $po", $issuer->username);
break;
 }
 return $output;
 }
 
private function write($dat){
 $this->api->plugin->readYAML($this->path."config.yml");
 $this->api->plugin->writeYAML($this->path."config.yml", $dat);
 }
public function __destruct(){
}
 }

?>