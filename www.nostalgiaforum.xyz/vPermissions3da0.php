<?php

/*
__PocketMine Plugin__
name=vPermissions
description=Custom permission plugin for vanishmc
version=1.0
author=realfreehij
class=vPermissions
apiversion=12.1
*/

class vPermissions implements Plugin{
    private $api, $groups, $database, $cmdList, $usageList, $aliasList;

    public function __construct(ServerAPI $api, $server = false){
        $api->event("server.start", [$this, "postInit"]); //cuz nc is gud
        $this->api = $api;
    }

    public function init(){
        $this->groups = new Config($this->api->plugin->configPath($this) . "groups.yml", CONFIG_YAML, [
            "default-group" => "Player",
            "Player" => [
                "help"
            ]
        ]);
        $this->database = new SQLite3(str_replace("\\", "/", $this->api->plugin->configPath($this) . "players.db"));
        $this->database->query("CREATE TABLE IF NOT EXISTS permissions (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            grup TEXT,
            prefix TEXT
            );");
        $this->database->query("PRAGMA journal_mode = OFF;");
        $this->database->query("PRAGMA synchronous = OFF;");
        $this->api->addHandler("player.join", [$this, "eventHandler"]);
        $this->api->addHandler("console.command", [$this, "eventHandler"]);
        $this->api->console->register("help", "[page]", [$this, "cmdHandler"]);
        $this->api->console->register("grant", "<player> <group>", [$this, "cmdHandler"]);
        $this->api->console->register("setprefix", "<player> <prefix>", [$this, "cmdHandler"]);
        $this->api->console->register("prefix", "<prefix>", [$this, "cmdHandler"]);
        $this->api->console->alias("?", "help");
    }

    public function postInit(){
        $reflect = new ReflectionClass("ConsoleAPI");
        $commands = $reflect->getProperty("cmds");
        $commands->setAccessible(true);
        $commands = $commands->getValue($this->api->console);
        $this->usageList = $reflect->getProperty("help");
        $this->usageList->setAccessible(true);
        $this->usageList = $this->usageList->getValue($this->api->console);
        $this->aliasList = $reflect->getProperty("alias");
        $this->aliasList->setAccessible(true);
        $this->aliasList = $this->aliasList->getValue($this->api->console);
        $i = 0;
        $this->cmdList = [];
        foreach($commands as $cmd => $callback){ //nc bypass, perms wont work without this
            $this->cmdList[$i] = $cmd;
			$this->api->ban->cmdWhitelist[$cmd] = true;
            ++$i;
		}
        sort($this->cmdList);
    }

    public function isFloat($string){
        return is_numeric($string) && strpos($string, ".") !== false;
    }

    public function getGroup($nickname){
        if($row = $this->database->query("SELECT * FROM permissions WHERE name='" . strtolower($nickname) . "';")->fetchArray()){
            return $row["grup"];
        }
        return False;
    }

    public function setGroup($nickname, $group){
        if(!isset($this->groups->getAll()[$group])){
            return False;
        }
        if($this->database->query("UPDATE permissions SET grup='" . $group . "', prefix='" . $group . "' WHERE name='" . strtolower($nickname) . "';")){
            return True;
        }
        return False;
    }

    public function setPrefix($nickname, $prefix){
        if($this->database->query("UPDATE permissions SET prefix='" . $prefix . "' WHERE name='" . strtolower($nickname) . "';")){
            return True;
        }
        return False;
    }

    public function eventHandler($data, $event){
        switch($event){
            case "player.join":
                if(!$this->getGroup($data->username)){
                    $this->database->query("INSERT INTO permissions (name, grup, prefix) VALUES ('" . $data->iusername . "', '" . $this->groups->getAll()["default-group"] . "', '" . $this->groups->getAll()["default-group"] . "');");
                }
                if(!isset($this->groups->getAll()[$this->getGroup($data->username)])){
                    $this->setGroup($data->username, $this->groups->getAll()["default-group"]);
                }
                return;
            case "console.command": //nothing crazy
                if($data["issuer"] instanceof Player){
                    if($this->api->ban->isOp($data["issuer"])){
                        return;
                    }
                    if(isset($this->aliasList[$data["cmd"]])){
                        $data["cmd"] = $this->aliasList[$data["cmd"]];
                    }
                    if(!in_array(strtolower($data["cmd"]), $this->groups->getAll()[$this->getGroup($data["issuer"])])){
                        return False;
                    }
                    return;
                }
                return;
        }
    }

    public function cmdHandler($cmd, $args, $issuer, $alias){
        switch($cmd){
            case "grant":
                if(!$args){
                    return "Usage: /grant <player> <group>";
                }
                if(!$this->getGroup($args[0])){
                    return "This player is not in database.";
                }
                if(!isset($this->groups->getAll()[$args[1]])){
                    return "Group does not exist.";
                }
                if(!$this->setGroup($args[0], $args[1])){
                    return "Cannot grant due to server error.";
                }
                return "Granted " . $args[1] . " to " . strtolower($args[0]);
            case "setprefix":
                if(!$args){
                    return "Usage: /setprefix <player> <prefix>";
                }
                if(!$this->getGroup($args[0])){
                    return "This player is not in database.";
                }
                if(!$this->setPrefix($args[0], $args[1])){
                    return "Cannot set prefix due to server error.";
                }
                return "Prefix of " . strtolower($args[0]) . " is now " . $args[1];
            case "help":
                if(!$args || !is_numeric($args[0]) || is_float($args[0]) || $args[0] - 1 < 0){
                    $page = 0;
                }else{
                    $page = $args[0] - 1;
                }
                $temp = 0;
                if($issuer == "console" || $this->api->ban->isOp($issuer)){
                    $cmds = $this->cmdList;
                }else{
                    $cmds = $this->groups->getAll()[$this->getGroup($issuer->username)];
                    sort($cmds);
                }
                $output = "List of commands you can use (Page " . $page + 1 . "/" . ceil(count($cmds) / 5) . "):\n";
                for($i = $page * 5; $i < $page * 5 + 5; ++$i){
                    if(!isset($cmds[$i])){
                        if($temp == 0){
                            return "Page doesn't exist.";
                        }
                        break;
                    }
                    $output .= "/" . $cmds[$i] . " " . $this->usageList[$cmds[$i]] . "\n";
                    ++$temp;
                }
                return $output;
            case "prefix":
                if($issuer == "console"){
                    return "Please use this command in-game.";
                }
                if(!$args){
                    return "Usage: /prefix <prefix>";
                }
                if(!preg_match('/[^A-Za-z0-9.#\\-$%^&*@!?]/', $args[0])){
                    return "Invalid prefix.";
                }
                if(!$this->setPrefix($issuer, $args[0])){
                    return "Cannot set prefix due to server error.";
                }
                return "Your prefix is now " . $args[0];
        }
    }
}