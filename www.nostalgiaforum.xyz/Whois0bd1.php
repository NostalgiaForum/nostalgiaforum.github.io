<?php

/*
__PocketMine Plugin__
name=Whois
description=Whois.
version=0.8.1/test1
author=DarkN3ss/tema1d.
class=tWhois
apiversion=10, 11, 12, 12.1
*/

class tWhois implements Plugin{
   private $api;

   public function __construct(ServerAPI $api, $server = false){
     $this->api = $api;
   }

   public function init(){
		$this->api->console->register("whois", "<player>", array($this, "cmdHandler"));
   }
   
   public function cmdHandler($cmd, $params, $issuer, $alias)
	{
		$user["issuer"] = strtolower($issuer instanceof Player ? $issuer->username : $issuer);
		$user["target"] = strtolower(isset($params[0]) ? $params[0] : "");
		switch($cmd) {
			case "whois":
				if(!$this->api->player->get($user['target']) instanceof Player)
				{ 
					return "Usage: /whois <nickname>"; 
				}
				else
				{
					$player = $this->api->player->get($user["target"]);
					$playerIP = $player->ip;
					if( ! filter_var($playerIP, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE) )
					{
						$result = $this->asyncOperation("http://ip-api.com/json/");
					}
					else
					{
						$result = $this->asyncOperation("http://ip-api.com/json/" . $playerIP);
					}
					$namee = $player->username;
					$country = json_decode($result, 1)['country'];
					$region = json_decode($result, 1)['regionName'];
					$city = json_decode($result, 1)['city'];
					return ("Nickname: " . $namee . "\nIP: " . $playerIP . "\nCountry, region, city: " . ucwords(strtolower($country)) . ", " . ucwords(strtolower($region)) . ", " . ucwords(strtolower($city)));
				}
				break;
		}
		return;
	}
	
	public function asyncOperation($url){
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HEADER, false);
		$data = curl_exec($curl);
		curl_close($curl);
		return $data;
	}
   
	public function __destruct(){
	}
}
?>
