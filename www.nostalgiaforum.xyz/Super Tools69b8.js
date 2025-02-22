ModPE.setItem(501,"blaze_rod",0,"Super Sword");
ModPE.setItem(502,"blaze_rod",0,"Super Pickaxe");
ModPE.setItem(503,"gold_nugget",0,"Golden Touch");
ModPE.setItem(504,"blaze_rod",0,"Super Bow");

Item.addCraftRecipe(501,1,0,[266, 3, 0, 264, 2, 0, 331, 1, 0, 42, 1, 0]);
Item.addCraftRecipe(502,1,0,[41, 2, 0, 264, 1, 0, 42, 2, 0]);
Item.addCraftRecipe(503,1,0,[41, 4, 0]);
Item.addCraftRecipe(504,1,0,[264, 3, 0, 287, 3, 0]);

function attackHook(attacker,victim) {


if(Player.getCarriedItem() == 501){

var dmg = 3;
Entity.setHealth(victim, Entity.getHealth(victim) - dmg);

Entity.setFireTicks(victim,50)

explode(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 1)
}
}



function procCmd(command)
{
var cmd = command.split(" ");
if(cmd[0] == "Super")
   {
   Player.addItemInventory(501,1,0);
   Player.addItemInventory(502,1,0);
   Player.addItemInventory(504,1,0);
   Player.addItemInventory(503,1,0);
   print("You got all Super items");
   }
}



function useItem(x,y,z,itemId,blockId,side)
{
 var playerYaw = Entity.getYaw(Player.getEntity()); 
var playerPitch = Entity.getPitch(Player.getEntity()); 
 if(getCarriedItem()==504)
{
velY = Math.sin((playerPitch - 180) / 180 * Math.PI); 
            velX = 3.5 * (Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI)); 
            velZ = 3.5 * (-1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI)); 
           var knife = Level.spawnMob(Player.getX() + Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI) ,Player.getY()+0.3,Player.getZ() + -1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI) ,80);
           setVelX(knife,velX); 
            setVelY(knife,velY); 
            setVelZ(knife,velZ); 

}
if(Player.getCarriedItem() == 503){

Level.dropItem(x,y,z,1,getTile(x,y,z),1)

Level.destroyBlock(x,y,z)
Level.setTile(x, y, z, 41, 0); 

}
if(Player.getCarriedItem() == 502){

Level.dropItem(x,y,z,1,getTile(x,y,z),1)

Level.destroyBlock(x,y,z)
}

}



function newLevel() {
clientMessage("Super Tools Mod v1");
}
