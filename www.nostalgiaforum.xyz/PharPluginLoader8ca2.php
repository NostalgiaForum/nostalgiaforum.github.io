<?php
/*
__PocketMine Plugin__
name=PharPLuginLoader
description=Loader for .phar plugins without NostalgiaCore
version=1.0
author=NCDev
class=PharLoader
apiversion=3,4,5,7,9,10,12,12.1
*/


class PharLoader implements Plugin{
	const INFO_LVL = 1;
	const WARN_LVL = 2;
	const ERR_LVL = 3;

	public function __construct(ServerAPI $api, $server = false){
		$path = $this->pluginsPath($api->plugin);
 		$dir = dir($path);
		$rc = new ReflectionClass('PluginAPI');
		$pluginProp = $rc->getProperty('plugins');
		$pluginProp->setAccessible(true);
 		while(false !== ($file = $dir->read())){
			if($file{0} === "."){
				continue;
			}
			$ext = strtolower(substr($file, -4));
			if($ext === "phar"){
				$pluginInfo = []; //TODO: A PluginInfo class?
				$filePath = $path.$file;
				$p = new Phar($path.$file, 0);
				foreach (new RecursiveIteratorIterator($p) as $file) {
					$name = $file->getFileName();
					$content = file_get_contents($file->getPathName());
					if($name === "plugin.cfg" || $name === "plugin.yml"){
						$pluginInfo = PharUtils::readMainConfig($content);
						break;
					}
				}
				$this->msg("Loading PHAR Plugin: {$file}", 1);
				$aver = CURRENT_API_VERSION;
				if($pluginInfo["api"] != $aver){
					$this->msg("API is not the same as Core, might cause bugs({$pluginInfo["api"]} != {$aver})", 2);
				}
				$phr = "phar://$filePath/";
				include($phr."/src/".$pluginInfo["classLoader"]);
				$class = $pluginInfo["CLClass"];
				$loader = new $class();
				$loader->loadAll($phr);
				
				$pluginName = PharUtils::getNameSpaceClass($pluginInfo["mainFile"]);
				include($phr."/src/".$pluginInfo["mainFile"]);
				$plugin = new $pluginName($api, false);
				if(!($plugin instanceof Plugin)){
					$this->msg("Plugin \"{$pluginInfo["name"]}\" doesn't use the Plugin Interface", 3);
					$plugin->__destruct();
					unset($plugin);
					continue;
				}
				$identifier = $this->getIdentifier($pluginInfo, $api->plugin);
				$plugins = $pluginProp->getValue($api->plugin); //get plugins everytime
				$plugins[$identifier] = [$plugin, $pluginInfo];
				$pluginProp->setValue($api->plugin, $plugins);
			} 
		}
	}
	
	public function getIdentifier($pluginInfo, $api){
		switch(CURRENT_API_VERSION){
			case 9:
			case 8:
			case 7:
			case 6:
			case 5:
			case 4:
			case 3:
			case 2:
			case 1:
			case 10:
				return "phared-".$pluginInfo["name"];
			default:
				return $api->getIdentifier($pluginInfo["name"], $pluginInfo["author"]);
		}
	}
	
	public function pluginsPath($api){
		switch(CURRENT_API_VERSION){
			case 9:
			case 8:
			case 7:
			case 6:
			case 5:
			case 4:
			case 3:
			case 2:
			case 1:
			case 10:
				return DATA_PATH."plugins/";
			default:
				return $api->pluginsPath();
		}
	}
	private function msg($s, $level = 1){
		switch($level){
			case PharLoader::INFO_LVL:
				console("[INFO] [PharLoader]: {$s}");
				break;
			case PharLoader::WARN_LVL:
				console("[WARNING] [PharLoader]: {$s}");
				break;
			case PharLoader::ERR_LVL:
				console("[ERROR] [PharLoader]: {$s}");
				break;
			default:
				console("[PharLoader]: {$s}");
		}
	}

	public function init(){}
	
	public function __destruct(){}
}

/*
Used in PHAR plugins to load all custom classes
*/
interface IClassLoader{
	public function loadAll($pharPath);
}

class PharUtils{
	public static function readMainConfig($content){
		$pluginData = [];
		$content = explode("\n", $content);
		foreach($content as $id => $line){
			if(!strpos($line, "=")){
				continue;
			}
			
			$line = explode("=", $line);
			$content[$line[0]] = $line[1];
		}
		
		$pluginData["name"] = $content["name"];
		$pluginData["description"] = $content["description"];
		$pluginData["version"] = $content["version"];
		$pluginData["author"] = $content["author"];
		$pluginData["mainFile"] = $content["mainFile"];
		$pluginData["api"] = $content["api"];
		$pluginData["classLoader"] = $content["classLoader"];
		$pluginData["CLClass"] = self::getNameSpaceClass($pluginData["classLoader"]);
		return $pluginData;
	}
	
	public static function getNameSpaceClass($content){
		return substr(str_replace("/", "\\", $content), 0, -4);
	}
}