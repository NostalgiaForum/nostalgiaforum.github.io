/*Creeper+ mod by minecrave79
adds more creepers to minecraft pe have fun!
please dont use code without permission
*/

var randomspawn=false;
var firecreep;
var chargecreep;
var watercreep;
var trollcreep;
var armorcreep;
var ticks=20;
var charge=true;
var ticks2=40;
var fire=true;
var water=true;
var troll=true;
ModPE.setItem(440,"skull_creeper", 0, "charged creeper spawner");
ModPE.setItem(441,"skull_creeper", 0, "fire creeper spawner");
ModPE.setItem(442,"skull_creeper", 0, "water creeper spawner");
ModPE.setItem(443,"skull_creeper", 0, "troll creeper spawner");
ModPE.setItem(444,"skull_creeper", 0, "armor creeper spawner");

function newLevel()
{
clientMessage("§2Creeper+ §1mod by minecrave79");
ModPE.overrideTexture("images/font/glyph_42.png", "http://i.imgur.com/i4axAPH.png"); 
ModPE.overrideTexture("images/font/glyph_41.png", "http://i.imgur.com/0Ju3HfT.png");
ModPE.overrideTexture("images/font/glyph_43.png", "http://i.imgur.com/3KUnTBz.png");
ModPE.overrideTexture("images/font/glyph_44.png", "http://i.imgur.com/2BtbjEZ.png");
ModPE.overrideTexture("images/font/glyph_45.png", "http://i.imgur.com/9E5lUcK.png");
}

function useItem(x,y,z,itemId,block,side)
{
if(itemId==441)
{
firecreep= Level.spawnMob(x,y+1,z,33,"font/glyph_42.png"); 	
Entity.setNameTag(firecreep,"Fire Creeper");
}
if(itemId==440)
{
chargecreep= Level.spawnMob(x,y+1,z,33,"font/glyph_43.png"); 	
Entity.setNameTag(chargecreep,"Charged Creeper");
}
if(itemId==442)
{
watercreep= Level.spawnMob(x,y+1,z,33,"font/glyph_44.png"); 	
Entity.setNameTag(watercreep,"Water Creeper");
}
if(itemId==443)
{
trollcreep= Level.spawnMob(x,y+1,z,33,"font/glyph_41.png"); 	
Entity.setNameTag(trollcreep,"Troll Creeper");
}
if(itemId==444)
{
armorcreep= Level.spawnMob(x,y+1,z,33,"font/glyph_45.png"); 	
Entity.setNameTag(armorcreep,"Armor Creeper");
Entity.setHealth(armorcreep, 60);
}
}


function deathHook(m, v)
{
if(v==chargecreep)
{
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,289,10);
charge=false;
}
if(v==firecreep)
{
fire=false;
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,51,3);
}
if(v==watercreep)
{
water=false;
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,9,3);
}
if(v==trollcreep)
{
troll=false;
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,265,3);
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,266,2);
}
if(v==armorcreep)
{
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,310,1);
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),1,311,1);
}
}

function entityRemovedHook(e)
{
var xx= Entity.getX(e);
var yy= Entity.getY(e);
var zz= Entity.getZ(e);
if(e==firecreep&&fire==true)
{
setTile(xx,yy-1,zz, 51);
setTile(xx+1,yy-1,zz, 51);
setTile(xx,yy,zz+1, 51);
setTile(xx-1,yy-1,zz, 51);
setTile(xx+1,yy-1,zz+1, 51);
setTile(xx-1,yy-1,zz-1, 51);
setTile(xx,yy-1,zz-1, 51);
setTile(xx+1,yy-1,zz+1, 51);
setTile(xx-1,yy-1,zz+1, 51);
setTile(xx+2,yy,zz, 51);
setTile(xx-2,yy,zz, 51);
setTile(xx,yy,zz+2, 51);
setTile(xx,yy,zz-2, 51);
setTile(xx+2,yy,zz+2, 51);
setTile(xx-2,yy,zz-2, 51);
setTile(xx-2,yy,zz-2, 51);
setTile(xx+2,yy,zz-2, 51);
setTile(xx+2,yy,zz+2, 51);
setTile(xx-2,yy,zz-2, 51);
setTile(xx-2,yy,zz+2, 51);
setTile(xx-2,yy,zz+1, 51);
setTile(xx-2,yy,zz-1, 51);
setTile(xx-1,yy,zz-2, 51);
setTile(xx+1,yy,zz-2, 51);
setTile(xx+2,yy,zz-1, 51);
} 
if(e==chargecreep&&charge==true)
{
explode(xx, yy, zz, 7);
}
if(e==watercreep&&water==true)
{
setTile(xx, yy+4, zz, 9);
setTile(xx, yy+2, zz+1, 9);
setTile(xx+1, yy+2, zz, 9);
setTile(xx, yy+2, zz-1, 9);
setTile(xx-1, yy+2, zz, 9);
setTile(xx, yy+3, zz, 51);
}
if(e==trollcreep&&troll==true)
{
Entity.setVelY(Player.getEntity(), 3, 3, 3);
}
if(e==armorcreep)
{
Level.dropItem(Entity.getX(e),Entity.getY(e),Entity.getZ(e),1,310,1);
Level.dropItem(Entity.getX(e),Entity.getY(e),Entity.getZ(e),1,311,1);
}
}

function modTick()
{
ticks--;
if(charge==false || fire==false || water==false || troll==false)
{
ticks2--;
}
if(ticks2==0)
{
ticks2=40;
charge=true;
fire=true;
water=true;
troll=true;
}
if(Math.floor(Math.random()*100)==10&&randomspawn==true)
{
if(ticks==0)
{
var yyy= Math.floor((Math.random()*100)+50);
var xxx= Math.floor(Math.random()*256);
var zzz= Math.floor(Math.random()*256);
firecreep= Level.spawnMob(xxx,yyy,zzz,33,"font/glyph_42.png"); 	
Entity.setNameTag(firecreep,"Fire Creeper");
Entity.setHealth(firecreep, 60);
chargecreep= Level.spawnMob(xxx,yyy,zzz,33,"font/glyph_43.png"); 	
Entity.setNameTag(chargecreep,"Charged Creeper");
Entity.setHealth(chargecreep, 60);
watercreep= Level.spawnMob(xxx,yyy,zzz,33,"font/glyph_44.png"); 	
Entity.setNameTag(watercreep,"Water Creeper");
Entity.setHealth(watercreep, 60);
trollcreep= Level.spawnMob(xxx,yyy,zzz,33,"font/glyph_41.png"); 	
Entity.setNameTag(trollcreep,"Troll Creeper");
Entity.setHealth(trollcreep, 60);
armorcreep= Level.spawnMob(xxx,yyy,zzz,33,"font/glyph_45.png"); 	
Entity.setNameTag(armorcreep,"Armor Creeper");
Entity.setHealth(armorcreep, 80);
ticks=20;
print("spawned!");
}
}
if(ticks==0)
{
ticks=20;
}
}

function attackHook(a, v)
{
if(v==trollcreep&&a==Player.getEntity())
{
Entity.setCarriedItem(Player.getEntity(),0);
}
if(getCarriedItem()==445)
{
gem=gem - 1;
}
}

function procCmd(c)
{
var cmd = c.split(" ");
if(cmd[0]=="creeper" && cmd[1]=="spawners")
{
Player.addItemInventory(440,1);
Player.addItemInventory(441,1);
Player.addItemInventory(442,1);
Player.addItemInventory(443,1);
Player.addItemInventory(444,1);
clientMessage("You were given all creeper spawners!");
}
if(cmd[0]=="randomspawn" && cmd[1]=="on")
{
randomspawn=true;
clientMessage("Creeper+ random spawn on");
}
if(cmd[0]=="randomspawn" && cmd[1]=="off")
{
randomspawn=false;
clientMessage("Creeper+ random spawn off");
}
}
