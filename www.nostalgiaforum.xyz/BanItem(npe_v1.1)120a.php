<?php
 
/*
__PocketMine Plugin__
name=BanItem
description=Блокировка предметов на сервере.
version=npe/v1.1
apiversion=12,12.1
author=PocketMine/Tema1d/GameHerobrine
class=BanItem
*/

class BanItem implements Plugin{
    private $api, $config;
 
    public function __construct(ServerAPI $api, $server = false){
        $this->api = $api;
    }
    
    public function init()
    {
    	$this->api->addHandler("player.equipment.change", array($this, 'handler'), 15);
    	$this->api->console->register("item", "Управления предметами сервера.", array($this, 'commands'));
    	
        $this->config = new Config($this->api->plugin->configPath($this) . "config.yml", CONFIG_YAML, array(
    		"banned-item-list" 			=> array(),
    		"msg-on-equipment-change" 	=> "[BanItem] Этот предмет запрещен на сервере.",
    		"msg-on-ban-item"			=> "[BanItem] Предмет с ID: @itemid запрещен на сервере.",
    		"msg-on-unban-item"			=> "[BanItem] Предмет с ID: @itemid разрешен на сервере."
    	));
}
    public function handler(&$data, $event)
    {
    	if($event === "player.equipment.change")
    	{
			if($this->api->ban->isOp($data['player']->iusername) === true) return true;
            $list = $this->config->get('banned-item-list');

    		if(in_array($data['item']->getID().":".$data['item']->getMetadata(), $list))
    		{
    			$msg = str_replace('@itemid', $data['item']->getName(), $this->config->get('msg-on-equipment-change'));
    			$data['player']->sendChat($msg);
    			return false;
    		}
            elseif(in_array($data["item"]->getName(), $list))
            {
                $msg = str_replace('@itemid', $data['item']->getName(), $this->config->get('msg-on-equipment-change'));
                $data['player']->sendChat($msg);
                return false;
            }
    	}
    }

    public function commands($cmd, $params, $issuer, $alias)
    {
    	if($cmd == 'item')
    	{
            $c = $this->config->getAll();
            $list = $c["banned-item-list"];

    		switch (strtolower(array_shift($params))) 
            {
            
    			case 'ban':
    			    $player = strtolower((string)$params[0]);
    				$id = array_shift($params);
                    if(empty($id) || (is_int($id) && $id <= 0) || $id === NULL)
                    {
                        $output = "Usage: /item ban <id:meta>";
                        return $output;
                    }

    				if(!in_array($id, $list))
    				{
                        if(!is_array($list))
                            $list = array($id);
                        else
                            $list[] = $id;
    				}
                    else
                    {
                        $output = "[BanItem] Предмет уже запрещен на сервере.";
						return $output;
                    }

                    $c["banned-item-list"] = $list;
                    $this->config->setAll($c);
                    $this->config->save();
					
					$msg = str_replace('@itemid', $id, $this->config->get('msg-on-ban-item'));
						return $msg;
						
    			break;
    			
    			case 'unban':
    				$id = array_shift($params);
                    if(empty($id) || (is_int($id) && $id <= 0) || $id === NULL)
                    {
                        $output = "Usage: /item unban <id:meta>";
                        return $output;
                    }

    				if(in_array($id, $list))
    				{
				        $key = array_search($id, $list);
				        unset($list[$key]);

    				}
                    else
                    {
                        $output = "[BanItem] Предмет уже разрешен на сервере.";
						return $output;
                    }

                    $c["banned-item-list"] = $list;
                    $this->config->setAll($c);
                    $this->config->save();
					
					$msg = str_replace('@itemid', $id, $this->config->get('msg-on-unban-item'));
						return $msg;
						
    			break;
    			default:
    			    $output = "BanItem - Управления блокировкой предметов сервера.\n /item - эта информация.\n /item ban <id:meta> - блокировка предмета.\n /item unban <id:meta> - разблокировка предмета.\n\nrewrite by tema1d&GameHerobine";
            return $output;
    		}
    }
}
    public function __destruct(){
        $this->config->save();
    }
}
