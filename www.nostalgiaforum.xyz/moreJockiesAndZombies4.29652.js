
function useItem(x, y, z, itemId, blockId, side) {
if(blockId==1||blockId==2||blockId==3||blockId==4||blockId==5||blockId==12||blockId==13||blockId==17||blockId==24) {
if(itemId==352) {
skelly=Level.spawnMob(x, y+1, z, 34); //bone makes spider jockey
spider=Level.spawnMob(x, y+1, z,35);
rideAnimal(skelly, spider);}
else if(itemId==289) //gunpowder makes creeper jockey
{creeper=Level.spawnMob(x, y+1, z, 33);
spider=Level.spawnMob(x, y+1, z,35);
rideAnimal(creeper, spider);}
else if(itemId==266) //goldIngot makes ZomPig jockey
{zPig=Level.spawnMob(x, y+1, z, 36);
spider=Level.spawnMob(x, y+1, z,35);
rideAnimal(zPig, spider);}
else if(itemId==288)  //feather makes skeleton dressed like zombie
{Entity.setRenderType(34,8);
Level.spawnMob(x, y, z, 34, "mob/zombie.png");
}
else if(itemId==318) //flint makes creeper dressed like zombie
{Level.spawnMob(x, y, z, 33, "mob/zombie.png");}}


//bucket spawns 5cow stack
else if(itemId==325) {
a1=Level.spawnCow(x, y+1, z);
a2=Level.spawnCow(x, y+1, z);
a3=Level.spawnCow(x, y+1, z);
a4=Level.spawnCow(x, y+1, z);
a5=Level.spawnCow(x, y+1, z);

rideAnimal(a1, a2);
rideAnimal(a2, a3);
rideAnimal(a3, a4);
rideAnimal(a4, a5);
}}


function attackHook(a,v) //bonemeal makes mobs skeleton shaped
{
if(getCarriedItem()==351)
{
Entity.setRenderType(v,12);}
}

function procCmd(cmd)
{
  if(cmd=="mob help"){  
clientMessage(".........Extra Mob Spawner Items........");
clientMessage("Flint = Spawn Creeper, Zombie Skin.");
clientMessage("Feather = Spawn Skeleton, Zombie Skin.");
clientMessage("Gold Ingot = Spawn ZombiePigman Jockey.");
clientMessage("Gunpowder = Spawn Creeper Jockey");
clientMessage("Bone = Spawn Skeleton Jockey.");
clientMessage("Bonemeal = Change Mob shape to Skeleton.");
clientMessage("Bucket = Spawn a stack of 5 Cows.");
}}
