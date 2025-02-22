//Mooncraft
//By Stufferus
var location = "world";
var fuel = 0;
var maxfuel = 5;
var rocket = false;
var mode = "ok";
var timerActive = false;
var countdown = 0; 
print("Mooncraft enabled!");
function useItem(x, y, z, itemId, blockId, side)
{
if(itemId == 281){
  if(rocket == false){
 setTile(x,y+1,z,43);  //
 setTile(x,y+2,z,20);  // Rocket 
 setTile(x,y+3,z,42);  // Building
 setTile(x,y+4,z,44);  //
 Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.bow", 100, 30);
 Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "fire.ignite", 100, 30);
 clientMessage("=============");
clientMessage("Rocket created!");
clientMessage("=============");
clientMessage("▶to remove it tap the glass with the axe");
clientMessage("▶to go in tap the iron with the axe     ");
addItemInventory(286,1);
rocket = true;
}
}
if(itemId == 286){
 if(blockId == 20){
  if(mode == "ok"){
 setTile(x,y-1,z,0);
 setTile(x,y,z,0);
 setTile(x,y+1,z,0);
 setTile(x,y+2,z,0);
 Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.glass", 100, 30);
 Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "fire.ignite", 100, 30);
 rocket = false; 
 clientMessage("==============");
 clientMessage("Rocket removed!");
 clientMessage("==============");
  }
 }
}
if(itemId == 286){
 if(blockId == 42){
  if(location == "world"){
 location = "rocket";
 clientMessage("==========================");
 clientMessage("You're now seeing inside!");
 clientMessage("==========================");
 clientMessage("▶to start the engines tap the gold");
 clientMessage("▶to leave the rocket tap the diamond");
 clientMessage("→with the axe !");
 mode = "no";
 Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.chestopen", 100, 30);
 setTile(x,y,z+1,57);
 setTile(x,y,z-1,41);
  }
 }
}
 if(itemId == 286){
  if(blockId == 57){
  setTile(x,y,z,0);
  setTile(x,y,z-2,0);
  mode = "ok";
  location = "world";
  timerActive = false; 
  
  clientMessage("============");
  clientMessage("Rocket leaved");
  clientMessage("============");
  location = "world";
  Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.chestclose", 100, 30);
 }
 }
 if(itemId == 286){
  if(blockId == 41){
   if(location == "rocket"){
   timerActive = true; 
   clientMessage("============");
   clientMessage("Engines active");
   clientMessage("============");
  }
 }
 }
}

function attackHook(attacker, victim)
{

}
function modTick()
{
if(timerActive == true){
   Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.explode", 100, 30);
   countdown ++;
}
 if(countdown == 100){
   clientMessage("3");
 }
 if(countdown == 200){
   clientMessage("2");
 }
 var x = getPlayerX();
 var y = getPlayerY();
 var z = getPlayerZ();
 if(countdown == 300){
   if(timerActive == true){
  clientMessage("1");
  Level.setSpawn(x,y,z);
  timerActive = false;
  var Player = getPlayerEnt();
  setVelY(Player,50);
  clientMessage("===============");
  clientMessage("Into the Galaxy!.")
  clientMessage("===============");
  clientMessage("★Select a Planet with /planetname");
  clientMessage("▶Overworld - /world  ");
  clientMessage("▶Moonworld - in Work!");
  location = "galaxy";
  timerActive = false;
  countdown = 0;
 }
 }
}
function procCmd(command)
{
var cmd = command.split(" ");
if(cmd[0] == "reset")
{
rocket = false;
clientMessage("================");
clientMessage("Mooncraft resetting")
clientMessage("================");
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "fire.ignite", 100, 30);

}
var Player = getPlayerEnt();
if(cmd[0] == "world"){
  if(location == "galaxy"){
  Entity.setHealth(Player,0);
  location = "rocket";
}
}
}
function newLevel()
{

}
function leaveGame()
{
timerActive = false; 
countdown = 0; 
}
function deathHook(murderer, victim)
{

}
function destroyBlock(x, y, z, side)
{

}