/*
Mod created by Rai_Pro

This is my third mod I do
I hope you will support me to continue making more mods :)
*/

var Boar= null;
var Bull= null;
var Panda= null;
var Duck= null;
var Horse= null;
var Villager= null;
var Miner= null;
var Enderman= null;
var Ghost= null;
var Mooshroom= null;
var Werewolf= null;
var ZombieHorse= null;
var Vampire= null;

var startGame = 0;

function newLevel()
{
clientMessage(ChatColor.WHITE + "PocketMobs V0.9 BETA");
clientMessage(ChatColor.WHITE + "Mod created by Rai_Pro");
} 
function attackHook(attacker, victim)
{
if(victim==Enderman)
{
var enderTeleport = Math.floor((Math.random()*4)+1);
	switch(enderTeleport)
	{
		case 1:
		setPosition(victim, getPlayerX(),getPlayerY()+2, getPlayerZ()+5);
		break;
		
		case 2:
		setPosition(victim, getPlayerX(),getPlayerY()+2, getPlayerZ()-5);
		break;
		
		case 3:
		setPosition(victim, getPlayerX()+5,getPlayerY()+2, getPlayerZ());
		break;
		
		case 4:
		setPosition(victim, getPlayerX()-5,getPlayerY()+2, getPlayerZ());
		break;
	}
}

if(getCarriedItem()==329)
if(victim==Horse)
{       
       rideAnimal(attacker,victim);
}

}

function modTick()
{
if(startGame==0)
{
startGame = 1;
ModPE.setFoodItem(500,"apple_golden",0,100,"Golden Apple");
ModPE.setFoodItem(501,"cookie",0,2,"Cookie");
ModPE.setFoodItem(502,"carrot_golden",0,8,"Golden Carrot");
ModPE.setItem(503,"gold_nugget",0,"Golden Nugget");
ModPE.setItem(504, "emerald", 0, "Emerald");
ModPE.setItem(505, "ender_pearl", 0, "Ender Pearl");
ModPE.setFoodItem(506, "record_11", 0,3, "Raw Duck");
ModPE.setFoodItem(507, "record_13", 0,6, "Cooked Duck");
ModPE.setFoodItem(508, "record_blocks", 0,4, "Horse Meat");
ModPE.setFoodItem(509, "record_cat", 0,10, "Cooked Horse Meat");
ModPE.setFoodItem(510, "rotten_flesh", 0,1, "Rotten Flesh");
ModPE.setItem(511,"ghast_tear",0,"vampire tooth", 1);
ModPE.addCraftRecipe(502, 1, 0, [391, 0, 503, 0, 503, 0, 503, 0, 503, 0, 503, 0, 503,0, 503,0, 503, 0]); 
ModPE.setItemCategory(502,4,0);
ModPE.addCraftRecipe(503,9,0,[266,0]);
ModPE.setItemCategory(503,4,0);
ModPE.addCraftRecipe(500, 1, 0, [260, 0, 266, 0,266, 0, 266, 0, 266, 0, 266, 0,266,0,266,0,266,0]); 
ModPE.setItemCategory(500,4,0);
ModPE.addCraftRecipe(501, 16, 0, [296, 0,351,3,296, 0]); 
ModPE.setItemCategory(501,4,0);
ModPE.addCraftRecipe(266, 1, 0, [503, 0, 503, 0, 503, 0, 503, 0, 503, 0, 503, 0, 503, 0, 503, 0, 503, 0]); 
ModPE.addFurnaceRecipe(506, 507, 0);
ModPE.addFurnaceRecipe(508, 509, 0);
ModPE.addCraftRecipe(329, 1, 0, [334, 0, 334, 0, 334, 0, 287, 0, 265, 0]);
}

if(startGame==1)
{
 var spawnMob = Math.floor((Math.random()*7010)+1);
        switch(spawnMob)
		{
			case 1:
				Boar = Level.spawnMob(getPlayerX(),getPlayerY()+1, getPlayerZ()+16,35,"mob/boar.png");
				Entity.setRenderType(Boar, 8);
                Entity.setHealth(Boar, 18);
			break;
			
			case 2:
				Bull = Level.spawnMob(getPlayerX(),getPlayerY()+1, getPlayerZ()+17,35,"mob/bull.png");
				Entity.setRenderType(Bull, 7);
                Entity.setHealth(Bull, 25);
			break;
			
			case 3:
				Panda = Level.spawnMob(getPlayerX(),getPlayerY()+1, getPlayerZ()+16,11,"mob/panda.png");
				Entity.setRenderType(Panda, 8);
                Entity.setHealth(Panda, 20);
			
			case 4:
				Duck = Level.spawnMob(getPlayerX(),getPlayerY()+1, getPlayerZ()+16,10,"mob/duck.png"); 
            break;
			
			case 5:
			    Horse = Level.spawnMob(getPlayerX(),getPlayerY()+1, getPlayerZ()+16,11,"mob/horse.png");
                Entity.setHealth(Horse, 25);
			break;

            case 6:
                Villager = Level.spawnMob(getPlayerX()+20,getPlayerY()+1, getPlayerZ(),11,"mob/villager.png");
				Entity.setRenderType(Villager, 3);
                Entity.setHealth(Villager, 25);	
            break;

            case 7:
                Miner = Level.spawnMob(getPlayerX()+25,getPlayerY()+1, getPlayerZ(),35,"mob/miner.png");
				Entity.setRenderType(Miner, 3);
                Entity.setHealth(Miner, 65);	
				Entity.setCarriedItem(Miner, 257, 1, 0);
            break;						
            
            case 8:
				Mooshroom = Level.spawnMob(getPlayerX(),getPlayerY()+1, getPlayerZ()+15,11,"mob/mooshroom.png"); 
            break;				
	
			case 9:
				Enderman = Level.spawnMob(getPlayerX()+18,getPlayerY()+1, getPlayerZ(),32,"mob/enderman.png");
				Entity.setRenderType(Enderman, 3);
				Entity.setHealth(Enderman, 50);
			break;
			
			case 10:
				Ghost = Level.spawnMob(getPlayerX()+16,getPlayerY()+1, getPlayerZ(),32,"mob/ghost.png"); 
				Entity.setHealth(Ghost, 25);
			break;
			
			case 11:
				Werewolf = Level.spawnMob(getPlayerX()+19,getPlayerY()+1, getPlayerZ(),32,"mob/werewolf.png"); 
				Entity.setHealth(Werewolf, 350);
                Entity.setRenderType(Werewolf, 3);
			break;	

 	        case 12:
				ZombieHorse = Level.spawnMob(getPlayerX()+16,getPlayerY()+1, getPlayerZ(),32,"mob/zombiehorse.png"); 
				Entity.setHealth(ZombieHorse, 40);
                Entity.setRenderType(ZombieHorse, 7);
			break;	
            
            case 13:
				Vampire = Level.spawnMob(getPlayerX()+17,getPlayerY()+1, getPlayerZ(),32,"mob/vampire.png"); 
				Entity.setHealth(Vampire, 200);
                Entity.setRenderType(Vampire, 3);
			break;
            
            case 14:
				ZombieHorse = Level.spawnMob(getPlayerX()+16,getPlayerY()+1, getPlayerZ(),32,"mob/zombiehorse.png"); 
				Skeleton = Level.spawnMob(getPlayerX()+16,getPlayerY()+1, getPlayerZ(),34,"mob/skeleton.png"); 
                rideAnimal(Skeleton, ZombieHorse);
				Entity.setHealth(ZombieHorse, 40);
                Entity.setRenderType(ZombieHorse, 7);
			break;
			
			case 15:
				ZombieHorse = Level.spawnMob(getPlayerX()+16,getPlayerY()+1, getPlayerZ(),32,"mob/zombiehorse.png"); 
				Zombie = Level.spawnMob(getPlayerX()+16,getPlayerY()+1, getPlayerZ(),32,"mob/zombie.png"); 
                rideAnimal(Zombie, ZombieHorse);
				Entity.setHealth(ZombieHorse, 40);
                Entity.setRenderType(ZombieHorse, 7);
			break;		
		}
	}
}

function deathHook (attacker, victim) 
{ 
if (victim==Boar) 
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,319,1,0);
}
if (victim==Boar)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,319,1,0);
}
if(victim==Duck)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,506,1,0);
}
if(victim==Duck)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,288,1,0); 
}
if(victim==Duck)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,288,1,0); 
}
if(victim==Duck)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,288,1,0); 
} 
if (victim==Mooshroom)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,40,3,0);
}
if (victim==Enderman)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,505,1,0);
}
if (victim==Ghost)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,1,1,0); 
}
if (victim==Werewolf)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,500,1,0);
}
if (victim==Werewolf)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,267,1,0);
}
if (victim==Werewolf)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,256,1,0);
}
if (victim==Werewolf)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,257,1,0) 
}
if (victim==Villager)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,504,2,0) 
}
if (victim==Miner)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,257,1,100) 
}
if (victim==Miner)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,4,64,0)
}
if (victim==Miner)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,15,3,0)
}
if (victim==Miner)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,263,2,0)
}
if (victim==Miner)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,351,4,4) 
}
if (victim==Vampire)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,331,20,0)
}
if (victim==Vampire)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,511,1,0) 
}
if (victim==Horse)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,508,1,0) 
}
if (victim==Horse)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,508,1,0) 
}
if (victim==Horse)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0)
}
if (victim==Horse)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0) 
}
if (victim==Horse)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0) 
}
if (victim==ZombieHorse)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,510,2,0)
}
if (victim==Bull)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,363,2,0)
} 
if (victim==Bull)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0)
} 
if (victim==Panda)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0)
} 
if (victim==Panda)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0)
} 
if (victim==Panda)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0)
} 
if (victim==Panda)
{
Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1,334,1,0)
}
}
function leaveGame()
{
startGame = 0;
}
