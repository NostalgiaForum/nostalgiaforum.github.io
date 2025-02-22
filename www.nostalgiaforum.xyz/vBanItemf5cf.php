<?php

/*
__PocketMine Plugin__
name=vBanItem
description=Special VanishMC plugin which is not special anymore(and should be called npeBanItem xD)
version=1.1
author=GamHerobrine
class=vBanItem
apiversion=12.1
*/

class vBanItem implements Plugin{
	public $api, $bannedItems, $config;
	
	private $prop_RemBannedItems = false;
	
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}
	
	public function init(){
		$this->api->console->register("item", "<ban/unban>", array($this, "handleItemBanCommand"));
		$this->bannedItems = new Config($this->api->plugin->configPath($this) . "/items.yml", CONFIG_YAML);
		$this->config = new Config($this->api->plugin->configPath($this) . "/vBanItem.properties", CONFIG_PROPERTIES, [
			"remove-banned-items" => false
		]);
		$this->prop_RemBannedItems = $this->config->get("remove-banned-items");
		$this->api->addHandler("player.equipment.change", array($this, 'onEquipmentChange'), 15);
	}
	
	public function onEquipmentChange($data, $event){
		$item = $data["item"];
		$player = $data["player"];
		if(!$this->api->ban->isOp($player) && $item != null){
			$bannedarr = $this->bannedItems->get($item->getID().":".$item->getMetadata());
			if($bannedarr === false){
				$bannedarr = $this->bannedItems->get($item->getID());
			}
			if($bannedarr){
				$player->sendChat("[BanItem] This item was banned!");
				if($this->prop_RemBannedItems){
					$player->removeItem($item->getID(), $item->getMetadata(), $item->count, true);
				}
				return false;
			}
		}
	}
	
	public function handleItemBanCommand($cmd, $args, $issuer, $alias){
		switch(nullsafe($args[0], "")){
			case "ban":
				if(!isset($args[1])) return "Please enter id and meta.";
				$this->bannedItems->set($args[1], true);
				$this->bannedItems->save();
				return "Item {$args[1]} was banned.";
			case "unban":
				if(!isset($args[1])) return "Please enter id and meta.";
				if(!$this->bannedItems->exists($args[1])) return "Item is not banned";
				$this->bannedItems->remove($args[1]);
				$this->bannedItems->save();
				return "Item {$args[1]} was unbanned.";
			default:
				return "Usage: /item <ban/unban> <id>[:meta]";
		}
	}
}
