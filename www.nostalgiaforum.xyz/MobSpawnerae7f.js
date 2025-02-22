//Minecraft PE Script Mod MobSpawner V1.1 by the_mav
//You are not allowed to reupload this!

var holzblock=5;
var schwein=0;
var kuh=0;
var schaf=0;
var chicken=0;
var creeper=0;
var zombie=0;
var spinne=0;
var zombieschwein=0;
var skelett=0;
var spawn=0;
var spawnblock=41;
var ticks = 20;



function modTick() {
if(spawn==1) {
{
ticks--;
if (ticks == 0)
{


if(schwein==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 12);
Entity.setHealth(pig, 10);
}
if(kuh==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 11);
Entity.setHealth(kuh, 10);
}
if(schaf==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 13);
Entity.setHealth(schaf, 8);
}
if(chicken==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 10);
Entity.setHealth(chicken, 4);
}
if(creeper==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 33);
Entity.setHealth(creeper, 20);
}
if(zombie==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 32);
Entity.setHealth(zombie, 20);
}
if(spinne==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 35);
Entity.setHealth(spinne, 16);
}
if(zombieschwein==3) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 36);
Entity.setHealth(zombieschwein, 20);
}
if(skelett==2) {
ticks = 220
pig = Level.spawnMob(X, Y-1, Z, 34);
Entity.setHealth(skelett, 20);
}
}}}
}



function useItem(x, y, z,itemId,blockId, side)
{
if(blockId==holzblock) {
if(skelett == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen skeleton.");
skelett = 3;
zombieschwein = 2;
}}
if(blockId==holzblock) {
if(zombieschwein == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen zombie pigman.");
zombieschwein = 3;
skelett = 1;
spinne = 2;
}}
if(blockId==holzblock) {
if(spinne == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen spider.");
spinne = 3;
zombieschwein = 1;
zombie = 2;
}}
if(blockId==holzblock) {
if(zombie == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen zombie.");
zombie = 3;
spinne = 1;
creeper = 2;
}}
if(blockId==holzblock) {
if(creeper == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen creeper.");
creeper = 3;
zombie = 1;
chicken = 2;
}}
if(blockId==holzblock) {
if(chicken == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen chicken.");
chicken = 3;
creeper = 1;
schaf = 2;
}}
if(blockId==holzblock) {
if(schaf == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen sheep.");
schaf = 3;
chicken = 1;
kuh = 2;
}}
if(blockId==holzblock) {
if(kuh == 1) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen cow.");
kuh = 3;
schaf = 1;
schwein = 2;
}}
if(blockId==holzblock) {
if(schwein==0) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("You have chosen pig.");
schwein = 3;
kuh = 1;
skelett = 0;
}}
if(blockId==holzblock) {
if(skelett == 3) {
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
schwein = 0;
skelett = 2;
}}


if(blockId==spawnblock) {
X = getPlayerX();
Y = getPlayerY();
Z = getPlayerZ();
spawn = 1;
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
clientMessage("The Spawner is now activated.");
}
}




function destroyBlock(x, y, z, side) {
if(getTile(x, y, z) == spawnblock) {
spawn = 0;

schwein=0;
kuh=0;
schaf=0;
chicken=0;
creeper=0;
zombie=0;
spinne=0;
zombieschwein=0;
skelett=0;
spawn=0;

clientMessage("The Spawner is now deactivated.");
}
}

























