<?php
/*
__PocketMine Plugin__
 name=Crossplay010
 description=Crossplay between 0.9 and 0.10
 version=1.4
 author=NCDev
 class=Crossplay010
 apiversion=13.1
 */
class Crossplay010 implements Plugin{
	public $api;
	public $clients010 = [];

	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
	}

	public function init(){
		$this->api->addHandler("player.quit", [$this, "onPlayerQuit"]);
		DataPacketReceiveEvent::register([$this, "onPacketReceive"]);
		PacketReceiveEvent::register([$this, "onEarlyPacketReceive"]);
	}
	public function onPlayerQuit($d, $e){
		if(isset($this->clients010[$d->iusername])){
			ConsoleAPI::info("{$d->iusername} logged off!");
			unset($this->clients010[$d->iusername]);
		}
	}

	public function get($buf, $len, &$off){
		if($len <= 0){
			$off = strlen($buf) - 1;
			return "";
		}elseif($len === true){
			return substr($buf, $off);
		}
		$off += $len;
		return substr($buf, $off - $len, $len);
	}

	public function getInt($buf, &$off){
		return Utils::readInt($this->get($buf, 4, $off));
	}

	public function getByte($buf, &$off){
		return ord($this->get($buf, 1, $off));
	}

	public function getShort($buf, &$off){
		return Utils::readShort($this->get($buf, 2, $off));
	}

	public function getFloat($buf, &$off){
		return Utils::readFloat($this->get($buf, 4, $off));
	}

	public function onEarlyPacketReceive(PacketReceiveEvent $e){
		$packet = $e->getPacket();
		$CID = PocketMinecraftServer::clientID($packet->ip, $packet->port);
		$s = ServerAPI::request();
		$player = $s->clients[$CID] ?? false;
		if($player === false) return;
		if(!isset($this->clients010[$player->iusername])) return;

		switch($packet->pid()){
				case RakNetInfo::DATA_PACKET_0:
				case RakNetInfo::DATA_PACKET_1:
				case RakNetInfo::DATA_PACKET_2:
				case RakNetInfo::DATA_PACKET_3:
				case RakNetInfo::DATA_PACKET_4:
				case RakNetInfo::DATA_PACKET_5:
				case RakNetInfo::DATA_PACKET_6:
				case RakNetInfo::DATA_PACKET_7:
				case RakNetInfo::DATA_PACKET_8:
				case RakNetInfo::DATA_PACKET_9:
				case RakNetInfo::DATA_PACKET_A:
				case RakNetInfo::DATA_PACKET_B:
				case RakNetInfo::DATA_PACKET_C:
				case RakNetInfo::DATA_PACKET_D:
				case RakNetInfo::DATA_PACKET_E:
				case RakNetInfo::DATA_PACKET_F:
					foreach($packet->data as $pk){
						if($pk instanceof UseItemPacket){
							console("modifed useitem");
							console(get_class($pk));
							$off = 0;
							$buf = $pk->buffer;
							$x = $this->getInt($buf, $off);
							$y = $this->getInt($buf, $off);
							$z = $this->getInt($buf, $off);
							$face = $this->getByte($buf, $off);
							$item = $this->getShort($buf, $off);
							$meta = $this->getShort($buf, $off);
							$eid = $this->getInt($buf, $off);
							$fx = $this->getFloat($buf, $off);
							$fy = $this->getFloat($buf, $off);
							$fz = $this->getFloat($buf, $off);
							$posX = $this->getFloat($buf, $off);
							$posY = $this->getFloat($buf, $off);
							$posZ = $this->getFloat($buf, $off);

							$newbuf = "";
							$newbuf .= Utils::writeInt($x);
							$newbuf .= Utils::writeInt($y);
							$newbuf .= Utils::writeInt($z);
							$newbuf .= Utils::writeInt($face); //compat
							$newbuf .= Utils::writeShort($item);
							$newbuf .= Utils::writeShort($meta);
							$newbuf .= Utils::writeInt($eid);
							$newbuf .= Utils::writeFloat($fx);
							$newbuf .= Utils::writeFloat($fy);
							$newbuf .= Utils::writeFloat($fz);
							$newbuf .= Utils::writeFloat($posX);
							$newbuf .= Utils::writeFloat($posY);
							$newbuf .= Utils::writeFloat($posZ);
							$pk->setBuffer($newbuf);


						}
					}
					break;
		}
	}

	public function onPacketReceive(DataPacketReceiveEvent $e){
		$pk = $e->getPacket();
		$pl = $e->getPlayer();
		$pid = $pk->pid();
		if($pid == ProtocolInfo::LOGIN_PACKET){
			$prot = $pk->protocol1;
			if($prot == 20){
				ConsoleAPI::info("0.10 client detected!");
				$pk->protocol1 = ProtocolInfo::CURRENT_PROTOCOL;
				$this->clients010[strtolower($pk->username)] = true;
			}
			console($prot);
		}
	}

	public function __destruct(){

	}
}
