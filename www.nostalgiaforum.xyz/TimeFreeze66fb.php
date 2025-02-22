<?php

/*
__PocketMine Plugin__
name=Time Freeze
description=Freeze the time!
version=1.1
author=Junyi00
class=TimeFreeze
apiversion=8
*/


class TimeFreeze implements Plugin{
    private $api, $path, $secondsLeft;
    public function __construct(ServerAPI $api, $server = false){
            $this->api = $api;
    }
        
    public function init(){
        $this->api->console->register("tfreeze", "Freeze the time!", array($this, "TimeFreeze"));
        $this->api->schedule(200, array($this, "TimeFreezing"), array(), true, "server.schedule");
        $this->path = $this->api->plugin->createConfig($this, array(
            "Seconds for time update" => array (
                "Seconds" => 15))); //15 seconds
        $this->checktick = 0;
           
    }
        
    public function __destruct(){
        
    }
    
    public function TimeFreezing($date, $event) {
    	
    	$cfg = $this->api->plugin->readYAML($this->path . "config.yml");
		$seconds = $cfg["Seconds for time update"]["Seconds"]; //get seconds
		
		$this->checktick = $this->checktick - 1;
		$updateTime = false;
		
    	$checkSeconds = $seconds / 10;
		
		$this->secondsLeft = $this->secondsLeft - 10;
		
		if (!is_int($checkSeconds)) {
			console("[Birthday] Seconds must be a multiple of 10!!!");
			console("[Birthday] Time would not be checked if u do not change the seconds in config!!");
		}
   		else {
    	
    		if ($this->secondsLeft <= 0) {
    			$this->secondsLeft = $seconds;
    			
    			$time = $cfg["Time"];
    			if ($time == "day") {
    				$this->api->time->day(); //set time to day
    			}
    			elseif ($time == "night") {
    				$this->api->time->night(); //set time to night
    			}
				elseif ($time == "sunrise") {
    				$this->api->time->sunrise(); //set time to sunrise
    			}
    			elseif ($time == "sunset") {
    				$this->api->time->sunset(); //set time to sunset
    			}
    			elseif (is_numeric($time)) {    			
    				$this->api->time->set($time); //set to time in config
    			}

    		}
				
   		}
 	
    }
        
    public function TimeFreeze($cmd, $arg){
        $cfg = $this->api->plugin->readYAML($this->path . "config.yml");

        switch($cmd){

            case "tfreeze":
                $option = $arg[0];
                
                switch(strtolower($option)) {
                
                    case "day":
                        $freeze = array(
                            "Time" => "day");
                        $this->overwriteConfig($freeze);
                        
                        $this->api->time->day(); //set time to day
                        console("[TimeFreeze] Time has been freezed at day time!");
                        break;
                        
                    case "sunrise":
                        $freeze = array(
                            "Time" => "sunrise");
                        $this->overwriteConfig($freeze);
                        
                        $this->api->time->sunrise(); //set time to sunrise
                        console("[TimeFreeze] Time has been freezed at sunrise!");
                        break;
                        
                    case "night":
                        $freeze = array(
                            "Time" => "night");
                        $this->overwriteConfig($freeze);
                        
                        $this->api->time->night(); //set time to night
                        console("[TimeFreeze] Time has been freezed at night time!");
                        break;
                        
                    case "sunset":
                        $freeze = array(
                            "Time" => "sunset");
                        $this->overwriteConfig($freeze);
                        
                        $this->api->time->sunset(); //set time to sunset
                        console("[TimeFreeze] Time has been freezed at sunset!");
                        break;
                        
                    case "current":
                    	$ctime = $this->api->time->get();
                    	$freeze = array(
                            "Time" => $time);
                        $this->overwriteConfig($freeze);
                        
                        $this->api->time->set($ctime); //set time to current time
                        console("[TimeFreeze] Time has been freezed at ".$time."!");
                        break;
                    
					case "normal":
					    $freeze = array(
                            "Time" => "normal");
                        $this->overwriteConfig($freeze);
                        //returned to normal, no more freezing
                        console("[TimeFreeze] Time has revert to normal!");
                        break;                    
                     
                    case "seconds":
                        $seconds = $arg[1];
                        if (!is_numeric($seconds)) {
                        	console("[TimeFreeze] Seconds must be numeric!");
                        	break;
                        }
                        $secondsReplace = array(
            				"Seconds for time update" => array (
                					"Seconds" => $seconds
                					));
                		
                		$this->overwriteConfig($secondsReplace);
                		console("[TimeFreeze] Update done!");
                		break;
 
                        
                    default:
                        console("[TimeFreeze] Usage: /tfreeze <day/night/sunrise/sunset/current/normal>");
                        break;
                        
                
                }    
                            
        }

    }

    private function overwriteConfig($dat){
        $cfg = array();
        $cfg = $this->api->plugin->readYAML($this->path . "config.yml");
        $result = array_merge($cfg, $dat);
        $this->api->plugin->writeYAML($this->path."config.yml", $result);
    }

}

?>
