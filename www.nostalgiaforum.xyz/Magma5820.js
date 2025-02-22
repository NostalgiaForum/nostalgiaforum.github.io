var countdown = 500;
var steve = 0;

function useItem(x,y,z,itemId,blockId)
{
if(itemId==259)
{
var stve = Level.spawnMob(x, y + 1, z, 32, "mob/magma.png");
Entity.setRenderType(stve, 11);
Entity.setHealth(stve, 777);
steve = 1;
clientMessage("Ну привет чувак");
}
}


function attackHook(attacker,victim)
{
if(Entity.getEntityTypeId(victim)==32&&steve==1)
{
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.hurt", 100, 30);
}
}

function deathHook(attacker, victim)
{
if(Entity.getEntityTypeId(victim)==32&&steve==1)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 341, 19, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 248, 1, 0);
steve = 0;
clientMessage("Я еще вернусь…") ;
}
}
