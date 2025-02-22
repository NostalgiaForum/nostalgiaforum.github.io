var boat;
var isOnBoat = false;
var playerDir = [0, 0, 0];
var DEG_TO_RAD = Math.PI / 180;
var boatSpeed = 1;

function useItem(x,y,z,i,b) {
var block = getTile(x,y+1,z);
if(i == 328) {
if(block == 8||block == 9) {
clientMessage(ChatColor.BLUE+"Entered boat.");
boat = Level.spawnMob(x,y+2,z,84);
Entity.rideAnimal(getPlayerEnt(),boat);
isOnBoat = true;
}
}
}

function modTick() {
if(isOnBoat) {
boatTick();
var boatblock = getTile(Entity.getX(boat),Entity.getY(boat)-1,Entity.getZ(boat));
var boatblockup = getTile(Entity.getX(boat),Entity.getY(boat),Entity.getZ(boat));
if(boatblock == 8||boatblock == 9) {
setVelY(boat,0.05);
}
if(boatblockup == 0) {
setVelY(boat,-0.05);
}
}

}

function boatTick() {
toDirectionalVector(playerDir, (getYaw() + 90) * DEG_TO_RAD, getPitch() * DEG_TO_RAD * -1);
setVelX(boat, boatSpeed * playerDir[0]);
//setVelY(boat, boatSpeed * playerDir[1]);
setVelZ(boat, boatSpeed * playerDir[2]);
}

function toDirectionalVector(vector, yaw, pitch) {	
vector[0] = Math.cos(yaw) * Math.cos(pitch);
vector[1] = Math.sin(pitch);
vector[2] = Math.sin(yaw) * Math.cos(pitch);
}