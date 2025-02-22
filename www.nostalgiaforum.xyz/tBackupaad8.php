<?php

/*
 * __PocketMine Plugin__
 * name=tBackup
 * description=Бекап миров/плагинов/данных игроков.
 * version=0.8.1/t1
 * author=Tema1d/GameHerobrine
 * class=tBackup
 * apiversion=12,12.1
 */
class tBackup implements Plugin
{

	private $api, $path;

	public function __construct(ServerAPI $api, $server = false)
	{
		$this->api = $api;
	}

	public function init()
	{
		$this->api->console->register("backup", "Create a new backup", array(
			$this,
			"backup"
		));
		if (file_exists(FILE_PATH . "backups")) {
			$this->config = new Config(FILE_PATH . "backups/data.yml", CONFIG_YAML, array(
				0,
				0
			));
		} else {
			if ((mkdir(FILE_PATH . "backups", 0700) == true)) {
				$this->config = new Config(FILE_PATH . "backups/data.yml", CONFIG_YAML, array(
					0,
					0
				));
			} else {}
		}
	}

	public function __destruct()
	{}

	public function recurse_copy($src, $dst, $past, $time)
	{
		$dir = opendir($src);
		if(!file_exists($dst)) @mkdir($dst, 0700, true);
		while (false !== ($file = readdir($dir))) {
			if (($file != '.') && ($file != '..')) {
				if (is_dir($src . '/' . $file)) {
					$this->recurse_copy($src . '/' . $file, $dst . '/' . $file, $past . '/' . $file, $time);
				} else {
					if (filemtime($src . '/' . $file) > $time || ! is_file($past . '/' . $file)) {

						if (copy($src . '/' . $file, $dst . '/' . $file) == false) {
							console($file);
						}
					} else {
						link($past . '/' . $file, $dst . '/' . $file);
					}
				}
			}
		}
		closedir($dir);
	}

	public function backup($cmd, $params, $issuer, $alias)
	{
		$data = $this->api->plugin->readYAML(FILE_PATH . "backups/data.yml");
		$id = $data[0] + 1;
		if (! is_dir(FILE_PATH . "backups/" . $data[0]) && $data[0] != 0) {
			console("[tBackup] Предыдущий бекап не найден, поиск нового бекапа.");
			for ($i = $data[0]; $i >= 0; $i --) {
				if ($i == 0) {
					console("[tBackup] Бекап не может быть прочитан, создай новый.");
					$id = 1;
					$data[0] = 0;
					$data[1] = 0;
				} else {
					if (! is_dir(FILE_PATH . "backups/" . $i)) {
						console("[tBackup] Найден новый бекап по пути: " . $i);
						$id = $i + 1;
						$data[0] = $i;
						$data[1] = filemtime(FILE_PATH . "backups/" . $i . "/.");
					}
				}
			}
		}
		console("[tBackup] Бекап сохраняется. ID бекапа:" . $id);
		console("[tBackup] Создание бекап директории...");
		mkdir(FILE_PATH . "backups/" . $id);
		// -> backup plugins
		// mkdir(FILE_PATH . "backups/" . $id . "/plugins");
		mkdir(FILE_PATH . "backups/" . $id . "/players");
		mkdir(FILE_PATH . "backups/" . $id . "/worlds");
		
		// Ты можешь добавить или удалить папки сервера для бекапа в строках (98) ниже.
		console("backup players...");
		$this->recurse_copy(FILE_PATH . "players", FILE_PATH . "backups/" . $id . "/players", FILE_PATH . "backups/" . $data[0] . "/players", $data[1]);
		console("backup worlds...");
		$this->recurse_copy(FILE_PATH . "worlds", FILE_PATH . "backups/" . $id . "/worlds/", FILE_PATH . "backups/" . $data[0] . "/worlds", $data[1]);
		// console("backup plugins...")
		// $this->recurse_copy(FILE_PATH . "plugins", FILE_PATH . "backups/" . $id . "/plugins/", FILE_PATH . "backups/" . $data[0] . "/plugins", $data[1]);
		$data[0] = $data[0] + 1;
		$data[1] = strtotime("now");
		$this->api->plugin->writeYAML(FILE_PATH . "backups/data.yml", $data);
		console("[tBackup] Бекап сделан!");
		return "[tBackup] Бекап сделан!";
	}
}
?>
