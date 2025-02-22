var countdown = 500;
var steve = 0;

function useItem(x,y,z,itemId,blockId)
{
if(itemId==259)
if(blockId==87)
{
var stve = Level.spawnMob(x, y + 1, z, 11, "mob/Girl.png");
Entity.setRenderType(stve, 3);
Entity.setHealth(stve,100);
steve = 1;
clientMessage("Милый,я в игре!");
}
}

function modTick()
{
if(steve==1)
{
countdown--;
var fws = Math.floor ((Math.random() * 10) + 1);
{
if(countdown==0&&fws==1)
{
clientMessage("< Аня > Пойдём погуляем?");
countdown = 500;
}
else if(countdown==0&&fws==2)
{
clientMessage("< Аня > Моё сердце принадлежит тебе!");
countdown = 500;
}
else if(countdown==0&&fws==3)
{
clientMessage("< Аня > Мне скучно!");
countdown = 500;
}
else if(countdown==0&&fws==4)
{
clientMessage("< Аня >Я готовлю тебе обед!");
countdown = 500;
}
else if(countdown==0&&fws==5)
{
clientMessage("< Аня > У меня сердце болит!!");
countdown = 500;
}
else if(countdown==0&&fws==6)
{
clientMessage("< Аня > Я пошла готовить.");
countdown = 500;
}
else if(countdown==0&&fws==7)
{
clientMessage("< Аня > У меня нет маникюра!!");
countdown = 500;
}
else if(countdown==0&&fws==8)
{
clientMessage("< Аня > Ты такой крутой!!");
countdown = 500;
}
else if(countdown==0&&fws==9)
{
clientMessage("< Аня > Херобрин тупица,а Нотч няшка!!");
countdown = 500;
}
else if(countdown==0&&fws==10)
{
clientMessage("< Аня > Хихихихихи!");
countdown = 500;
}
}
}
}

function attackHook(attacker,victim)
{
if(Entity.getEntityTypeId(victim)==11&&steve==1)
{
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.hurt", 100, 30);
}
}

function deathHook(attacker, victim)
{
if(Entity.getEntityTypeId(victim)==11&&steve==1)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 268, 1, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 213, 1, 15);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 8, 19, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 265, 55, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 501, 1, 0);
steve = 0;
clientMessage("Прощай милый!");
}
}