<?php

/*
__PocketMine Plugin__
name=PMFdecoder
description=Decode PMF plugins
version=2.0
author=wies
class=PMFdecoder
apiversion=9,10,11
*/
                
class PMFdecoder implements Plugin{
        private $api;
        public function __construct(ServerAPI $api, $server = false){
                $this->api = $api;
        }
        
        public function init(){
                $this->api->console->register('pmfdecode', 'Decode a pmf plugin', array($this, 'command'));
        }
        
        public function command($cmd, $args, $issuer){
                if($issuer !== 'console'){
                        return 'Must be run on the console';
                }
                if(!isset($args[0])){
                        return 'Usage: /pmfdecode <classname> [variableRenaming]';
                }
                $renameVariables = false;
                if(isset($args[1]) and $args[1] == true or $args[1] == 1) $renameVariables = true;
                $classname = strtolower(trim($args[0]));
                return $this->decompile($classname, $renameVariables);
        }
        
        private function decompile($classname, $variableRenaming){
                $info = $this->api->plugin->getInfo($classname);
                if($info === false){
                        $output = 'The plugin class '.$classname." does not exist\n";
                        $output .= "Here is a list of the classes of the plugins:\n";
                        $list = $this->api->plugin->getList();
                        foreach($list as $key => $val){
                                $output .= 'Plugin '.$val['name'].' has class: '.$val['class']."\n"; 
                        }
                        return $output;
                }
                $info = $info[0];
                $data = $info['code'];
                $src = token_get_all('<?php '.$data);
                $code = '';
                $variables = array();
                $count = 1;
                foreach($src as $index => $tag){
                        if(!is_array($tag)){
                                $code .= $tag;
                        }else{
                                switch($tag[0]){
                                        case T_VARIABLE:
                                                if($variableRenaming === true){
                                                        if(isset($variables[$tag[1]])){
                                                                $code .= $variables[$tag[1]];
                                                                break;
                                                        }
                                                        $v = '$variable'.$count;
                                                        $code .= $v;
                                                        $count++;
                                                        $variables[$tag[1]] = $v;
                                                }else{
                                                        $code .= $tag[1];
                                                }
                                                break;
                                                
                                        case T_CONSTANT_ENCAPSED_STRING:
                                                $data = $tag[1];
                                                while($pos = strpos($data, '\x')){
                                                        $str = substr($data, $pos, 4);
                                                        $value = chr(hexdec(substr($str, 2, 3)));
                                                        $data = str_replace($str, $value, $data);
                                                }
                                                $code .= $data;
                                                break;
                                                
                                        case T_LOGICAL_AND:
                                                $code .= 'and';
                                                break;
                                                
                                        case T_LOGICAL_OR:
                                                $code .= 'or';
                                                break;
                                                
                                        default:
                                                $code .= $tag[1];
                                                break;  
                                }
                        }
                }
                $code = str_replace(";", ";\r\n", $code);
                $code = str_replace("{", "{\r\n", $code);
                $code = str_replace("}", "}\r\n", $code);
                $code = "<?php

/*
__PocketMine Plugin__
name=".$info['name']."
description=
version=".$info['version']."
author=".$info['author']."
class=".$info['class']."
apiversion=".$info['apiversion']."
*/

".substr($code, 5);
                file_put_contents($this->api->plugin->configPath($this).$info['name'].'.php', $code);
                return 'The plugin '.$classname.' is decompiled';
        }
        
        public function __destruct(){}

}
?>