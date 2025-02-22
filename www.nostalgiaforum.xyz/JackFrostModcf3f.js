var countdown = 500;
var steve = 0;

function useItem(x,y,z,itemId,blockId)
{
if(itemId==266)
{
var stve = Level.spawnMob(x, y + 1, z, 11, "mob/downloadnew.png");
Entity.setRenderType(stve, 3);
Entity.setHealth(stve, 20);
steve = 1;
clientMessage(ChatColor.BLUE + "JackFrostMod Create for " + ChatColor.GREEN + "IzaelOsuna");
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "Hello You are My Friend");
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
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "Cops And Robers?");
countdown = 500;
}
else if(countdown==0&&fws==2)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "No, or yes play mcpe");
countdown = 500;
}
else if(countdown==0&&fws==3)
{
 clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "My Channel of Youtube");
countdown = 500;
}
else if(countdown==0&&fws==4)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "I have 19 Damonds and 12 Of Iron");
countdown = 500;
}
else if(countdown==0&&fws==5)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "www.Youtube.com/Jackfrostminer");
countdown = 500;
}
else if(countdown==0&&fws==6)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "I Acept you Ignoration");
countdown = 500;
}
else if(countdown==0&&fws==7)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "The JeromeASF is My Friend");
countdown = 500;
}
else if(countdown==0&&fws==8)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "I Want the ROALLERCOASTER");
countdown = 500;
}
else if(countdown==0&&fws==9)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "I Love MCPE :D ");
countdown = 500;
}
else if(countdown==0&&fws==10)
{
clientMessage(ChatColor.GOLD + "<JackFrostMiner> " + ChatColor.AQUA + "huhooo is a Skydoesminecraft? ");
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
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 456, 37, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 391, 1, 15);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 266, 19, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 261, 1, 31);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 314, 1, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 264, 80, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 313, 2, 31);
steve = 0;
clientMessage(ChatColor.AQUA + "Nooo More Videos :c Is Ugly ");
}
}


