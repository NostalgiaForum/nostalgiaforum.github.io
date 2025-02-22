<?php

/*
__PocketMine Plugin__
name=vBanItem
description=Special VanishMC plugin which is not special anymore
version=1.0
author=GamHerobrine
class=vBanItem
apiversion=12.1
*/

class vBanItem implements Plugin{
	public $api, $config;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->console->register("item", "<ban/unban>", array($this, "handleItemBanCommand"));
		$this->config = new Config($this->api->plugin->configPath($this) . "/items.yml", CONFIG_YAML);
		 $this->api->addHandler("player.equipment.change", array($this, 'onEquipmentChange'), 15);
	}
	
	public function onEquipmentChange($data, $event){
		$item = $data["item"];
		$player = $data["player"];
		if(!$this->api->ban->isOp($player) && $item != null){
			$bannedarr = $this->config->get($item->getID().":".$item->getMetadata());
			if($bannedarr === false){
				$bannedarr = $this->config->get($item->getID());
			}
			if($bannedarr){
				$player->sendChat("[BanItem] This item was banned!");
				return false;
			}
		}
	}
	
	public function handleItemBanCommand($cmd, $args, $issuer, $alias){
		switch(nullsafe($args[0], "")){
			case "ban":
				if(!isset($args[1])) return "Please enter id and meta.";
				$this->config->set($args[1], true);
				$this->config->save();
				return "Item {$args[1]} was banned.";
			case "unban":
				if(!isset($args[1])) return "Please enter id and meta.";
				if(!$this->config->exists($args[1])) return "Item is not banned";
				$this->config->remove($args[1]);
				$this->config->save();
				return "Item {$args[1]} was unbanned.";
			default:
				return "Usage: /item <ban/unban> <id>[:meta]";
		}
	}
}
