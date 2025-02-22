<?php
/*
__PocketMine Plugin__
name=PharPLuginLoader
description=Loader for .phar plugins without NostalgiaCore
version=1.1
author=NCDev
class=PharLoader
apiversion=3,4,5,7,9,10,11,12,12.1
*/
/*

1.1
- PMMP 1.3.11 support
- PMMP 1.1.1, 1.0.8, 1.0.0 support
- DevToolsG support
1.0
- Initial release

*/

class PharLoader implements Plugin{
	const INFO_LVL = 1;
	const WARN_LVL = 2;
	const ERR_LVL = 3;

	public function __construct(ServerAPI $api, $server = false){
		$path = $this->pluginsPath($api->plugin);
		if(!is_dir("$path/NostalgiaPHAR_/")) mkdir("$path/NostalgiaPHAR_/", 0777, true);
		if(!is_file("$path/NostalgiaPHAR_/IClassLoader.php")){
			file_put_contents("$path/NostalgiaPHAR_/IClassLoader.php", '<?php interface IClassLoader{public function loadAll($pharPath);}');
		}
		if(!is_file("$path/NostalgiaPHAR_/PharUtils.php")){
			file_put_contents("$path/NostalgiaPHAR_/PharUtils.php", '<?php class PharUtils{public static function readMainConfig($content){$pluginData=[];$content=explode("\n",$content);foreach($content as $id=>$line){if(!strpos($line,"=")){continue;}$line=explode("=",$line);$content[$line[0]]=$line[1];}$pluginData["name"]=$content["name"];$pluginData["description"]=$content["description"];$pluginData["version"]=$content["version"];$pluginData["author"]=$content["author"];$pluginData["mainFile"]=$content["mainFile"];$pluginData["api"]=$content["api"];$pluginData["classLoader"]=$content["classLoader"];$pluginData["CLClass"]=self::getNameSpaceClass($pluginData["classLoader"]);return $pluginData;}public static function getNameSpaceClass($content){return substr(str_replace("/","\\\\",$content),0,-4);}}');
		}
		
		if(!class_exists("PharUtils")){
			include("$path/NostalgiaPHAR_/PharUtils.php");
		}
		if(!interface_exists("IClassLoader")){
			include("$path/NostalgiaPHAR_/IClassLoader.php");
		}
		
 		$dir = dir($path);
		$rc = new ReflectionClass('PluginAPI');
		$pluginProp = $rc->getProperty('plugins');
		$pluginProp->setAccessible(true);
 		while(false !== ($file = $dir->read())){
			if($file{0} === "."){
				continue;
			}
			$ext = strtolower(substr($file, -4));
			if($ext === "phar" && !is_dir($path.$file)){
				$pluginInfo = []; //TODO: A PluginInfo class?
				$filePath = $path.$file;
				$p = new Phar($filePath, 0);
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
				if(!in_array((string) CURRENT_API_VERSION, explode(",", $pluginInfo["api"]))){
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
		if(!defined("CURRENT_API_VERSION")){
			return "phared-".$pluginInfo["name"];
		}
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
		if(!defined("CURRENT_API_VERSION")){
			if(is_dir(FILE_PATH."/data/plugins/")) return FILE_PATH."/data/plugins/"; //1.0.0
			return FILE_PATH."plugins/";
		}
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