<?php

/*
__PocketMine Plugin__
name=RandomItem
description=Gives a random item on command and at set intervals.
version=1.1.5
author=LDX
class=RandomItem
apiversion=10,11
*/

class RandomItem implements Plugin {
private $api;
public function __construct(ServerAPI $api, $server = false) {
$this->api = $api;
}

public function init() {
$this->api->console->register("gift","Gives a random item to everyone online.",array($this, "giveRI"));

$this->time = new Config($this->api->plugin->configPath($this) . "interval.yml",CONFIG_YAML,array("seconds" => 600));
$timeInterval = $this->time->get("seconds") * 20;
$this->api->schedule($timeInterval,array($this,"giveRI"),array($timeInterval),true,"server.schedule");
$this->items = new Config($this->api->plugin->configPath($this) . "items.yml",CONFIG_YAML,array("0" => "360","1" => "267","2" => "265","3" => "354","4" => "6"));
console("[INFO] RandomItem Enabled!");
}

public function giveRI($args) {

$RIA = array($this->items->get("0"),$this->items->get("1"),$this->items->get("2"),$this->items->get("3"),$this->items->get("4"));
$RIN = rand(0,4);
$randItem = $RIA[$RIN];
if($randItem == "0") {
$this->api->console->run("gift");
} else {
$this->api->console->run("give @all " . $randItem . " 1");
$this->api->chat->broadcast("[ПоДаРуНок (ID: " . $randItem . ")");
}
}

public function __destruct(){}

}
?>
