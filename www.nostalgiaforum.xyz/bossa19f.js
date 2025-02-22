//v.2.1
//by Fred (Илья Ш.)

var steve = 0;
var fast = 0;
var itemId;
var blockId;

ModPE.setItem(507,"blaze_rod",0,"Zog Spawner");
ModPE.setItem(508,"ruby",0,"Kristal");
ModPE.setItem(509,"melon_speckled",0,"Destroyer");
ModPE.setFoodItem(510,"rotten_flesh", 2, 2, "Rotten flesh");
ModPE.setItem (511,"slimeball",0,"moss");

function useItem(x,y,z,i,b,s)
{
if(i==280 && b==41)
{
Level.destroyBlock (x,y,z);
Level.dropItem (x, y + 13, z, 1, 507, 1, 0);
explode(x,y,z,5.0)
Entity.setCarriedItem(getPlayerEnt(),0);
clientMessage("Получи ключ");
}    
if(i==507){
 if(b==49 && getTile(x,y-1,z)==48 && getTile(x,y-2,z)==155 &&
getTile(x-1,y-2,z)==48 && getTile(x+1,y-2,z)==48 && 
getTile(x,y-2,z+1)==48 &&
getTile(x,y-2,z-1)==48 &&
getTile(x-1,y-2,z-1)==41 &&
getTile(x-1,y-2,z+1)==41 &&
getTile(x+1,y-2,z-1)==41 &&
getTile(x+1,y-2,z+1)==41){
var stve = Level.spawnMob(x, y - 2, z, 34, "mob/Zog.png");
Entity.setRenderType(stve, 3);
Entity.setHealth(stve,2000);
explode(x,y,z,1,0)
steve = 1;
clientMessage("<Zog> Я появился ! Ха, ты мне больше не нужен, Бугагагаааааааа !!!");
Level.destroyBlock (x,y,z);
Level.destroyBlock (x,y-1,z);
Level.destroyBlock (x,y-2,z);
Level.destroyBlock (x-1,y-2,z);
Level.destroyBlock (x+1,y-2,z);
Level.destroyBlock (x,y-2,z+1);
Level.destroyBlock (x,y-2,z-1);
Level.destroyBlock (x-1,y-2,z-1);
Level.destroyBlock (x-1,y-2,z+1);
Level.destroyBlock (x+1,y-2,z-1);
Level.destroyBlock (x+1,y-2,z+1);
Entity.setCarriedItem(getPlayerEnt(),0);
}
}
if (i == 511 && b == 4)
{
Level.destroyBlock (x,y,z);
Level.dropItem (x, y, z, 1, 48, 1, 0);
Entity.setCarriedItem(getPlayerEnt(),0);
}
}

function destroyBlock(x, y, z, side)
{ 
itemId=Player.getCarriedItem();
  blockId=getTile (x, y, z);
{
  if(itemId == 359)
{
if(blockId == 2)
{
Level.destroyBlock (x,y,z,fast);
Level.dropItem (x, y, z, 1, 511, 1, 0);
}
}
}
}

function attackHook(attacker,victim)
{
if(Entity.getEntityTypeId(victim)==34&&steve==1)
{
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.hurt", 100, 30);
}
if(Player.getCarriedItem()==509)
{
damage = Entity.getHealth(victim) -20;
Entity.setHealth(victim,damage);
}
}

function deathHook(attacker,victim)
{
if(Entity.getEntityTypeId(victim)==34&&steve==1)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 264, 71, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 508, 2, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 17, 34, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 14, 16, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 41, 2, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 46, 11, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 51, 7, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 246, 19, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 286, 1, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 303, 1, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 330, 2, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 347, 1, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 352, 31, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 510, 27, 0);
steve = 0;
}
}