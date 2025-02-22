<?php

/*
  _PocketMine Plugin_
  name=NoLongNicknames
  version=0.8.1
  author=zanz
  class=NoLN
  apiversion=12.1
*/

/*
  NoLN
  NoLN
*/

class NoLN implements Plugin {
  private $api;
  
  public function __construct(ServerAPI $api, $server = false) {
    $this->api = $api;
  }
  
  public function init() {
    $this->cfg = new Config($this->api->plugin->configPath($this)."config.yml", CONFIG_YAML);
    
    $this->api->event("player.join", array($this, "eventHandler"));
    
    $this->cfgSet();
  }
  
  public function cfgSet() {
    if(!$this->cfg->exists("MaxNameLen")) {
      console("[NoLN] В конфиге отсутствует настройка «MaxNameLen», создаём её...");
      $this->cfg->set("MaxNameLen", 32);
      $this->cfg->save();
    }
    if(!$this->cfg->exists("MinNameLen")) {
      console("[NoLN] В конфиге отсутствует настройка «MinNameLen», создаём её...");
      $this->cfg->set("MinNameLen", 3);
      $this->cfg->save();
    }
  }
  
  public function eventHandler($data, $event) {
    $cfg = $this->api->plugin->readYAML($this->api->plugin->configPath($this)."config.yml");
    $usrname = $data->iusername;
    switch($event) {
      case "player.join":
        if(strlen($usrname) >= $cfg["MaxNameLen"]) {
          $this->api->ban->kick($data->iusername, "Слишком длинный никнейм!");
          break;
        }
        if(strlen($usrname) <= $cfg["MinNameLen"]) {
          $this->api->ban->kick($data->iusername, "Слишком короткий никнейм!");
          break;
        }
        break;
    }
  }
  
  public function __destruct() {}
  
}