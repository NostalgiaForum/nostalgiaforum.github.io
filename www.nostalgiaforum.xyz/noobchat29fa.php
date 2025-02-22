<?php

/*
__PocketMine Plugin__
name=NoobBlocker
version=0.1
author=Xfusionios
class=noobblocker
apiversion=10
*/
       
class noobblocker implements Plugin{   
    private $api;

    private $server;
       
    public function __construct(ServerAPI $api, $server = false){
        $this->api = $api;
        $server = ServerAPI::request();
    }
   
    public function init(){ 
            $this->api->addHandler("player.chat", array($this, "eventHandler"), 100);
			console("[INFO] NoobBlocker ENABLED!");
       
    }
    public function eventHandler($data, $event)
    {
        switch($event)
        {
            case "player.chat":
            $message = strtolower($data['message']);
                if(strpos($message,'can i be op') !== false) {
				$data['player']->sendChat("DONT ASK FOR OP!");
				return false;
				}
				 if(strpos($message,'can i have op') !== false) {
				$data['player']->sendChat("DONT ASK FOR OP!");
				return false;
				}
				if(strpos($message, 'op me') !== false) {
				$data['player']->sendchat("DONT ASK FOR OP!");
				return false;
				}
				if(strpos($message, 'admin me') !== false) {
				$data['player']->sendchat("DONT ASK FOR ADMIN!");
				return false;
				}
				if(strpos($message, 'can i have admin') !== false) {
				$data['player']->sendchat("DONT ASK FOR ADMIN!");
				return false;
				}
				if(strpos($message, 'give me op') !== false) {
				$data['player']->sendchat("DONT ASK FOR OP!");
				return false;
				}
				if(strpos($message, 'give me admin') !== false) {
				$data['player']->sendchat("DONT ASK FOR ADMIN!");
				return false;
				}
				if(strpos($message, 'i hate this server!') !== false) {
				$data['player']->sendchat("Leave if u dont like it!");
				return false;
				}
				if(strpos($message, 'i hate this server') !== false) {
				$data['player']->sendchat("Leave if u dont like it!");
				return false;
				}
				else {
				return true;
				}
				
   

   break;
	
	}
}
public function __destruct(){
        }
    
}

    