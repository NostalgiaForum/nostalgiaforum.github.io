//Clever Weather Mod V1.0 by the_mav.
//You are not allowed to reupload this!

var tester=true;

function newLevel(){
regen=true;
clientMessage(ChatColor.GREEN +"Clever Weather Mod by the_mav");
clientMessage(ChatColor.GREEN +"If you want to dissable the rain type /rainoff");
clientMessage(ChatColor.GREEN +"If you want to turn it on again type /rainon");
clientMessage(ChatColor.GREEN +"More informations in the forum post.");
}
function procCmd(cmd){
var cmd1 = cmd.split(" ");
if(cmd1[0]=="rainoff"){
tester=false;
clientMessage(ChatColor.GREEN +"Rain is now off");
}
var cmd2 = cmd.split(" ");
if(cmd2[0]=="rainon"){
tester=true;
clientMessage(ChatColor.GREEN +"Rain is now on");
}
}

var ticks = 7;
var zeitlimit = 50; 
var zeitcounter=true;
var zeitcounterup=0;

function modTick() 
{ 
if (tester==true){
var sand=false; 
sand0 = Level.getTile(getPlayerX(), getPlayerY()-2, getPlayerZ()); 
if (sand0==12){
schnee=false;
regen=false;
sand=true;
}
sand1 = Level.getTile(getPlayerX(), getPlayerY()-3, getPlayerZ()); 
sand2 = Level.getTile(getPlayerX(), getPlayerY()-2, getPlayerZ());
if (sand1==12&&sand2==0){
schnee=false;
regen=false;
sand=true;
}
if (sand==false){
var schnee=false;
s0 = Level.getTile(getPlayerX(), getPlayerY()-1, getPlayerZ()); 
if (s0==78){
schnee=true;
regen=false;
}
schnee1 = Level.getTile(getPlayerX(), getPlayerY()-2, getPlayerZ()); 
schnee2 = Level.getTile(getPlayerX(), getPlayerY()-1, getPlayerZ());
if (schnee1==78&&schnee2==0){
schnee=true;
regen=false;
}
if (schnee==true) 
{
if (zeitcounter==true)
{
zeitlimit--;
}
if (zeitlimit == 0) 
{
zeitcounter=false;
zeitcounterup++;
ticks--;
if (ticks == 0)
{
ticks = 7;
m1 = Level.getTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()); 
if (m1==0){
setTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ(), 80); 
Level.destroyBlock(getPlayerX()+1, getPlayerY()+2, getPlayerZ());
}
m2 = Level.getTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ()); 
if (m2==0){
setTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ(), 80);
Level.destroyBlock(getPlayerX()+4, getPlayerY()+2, getPlayerZ());
}
m3 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+1); 
if (m3==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+1, 80); 
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()+1);
}
m4 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+4); 
if (m4==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+4, 80);
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()+4);
}
m5 = Level.getTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1); 
if (m5==0){
setTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1, 80); 
Level.destroyBlock(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1);
}
m6 = Level.getTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ()+4); 
if (m6==0){
setTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ()+4, 80);
Level.destroyBlock(getPlayerX()+4, getPlayerY()+2, getPlayerZ()+4);
}
m7 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-1); 
if (m7==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-1, 80); 
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()-1);
}
m8 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-4); 
if (m8==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-4, 80); 
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()-4);
}
m9 = Level.getTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()); 
if (m9==0){
setTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ(), 80); 
Level.destroyBlock(getPlayerX()-1, getPlayerY()+2, getPlayerZ());
}
m10 = Level.getTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ()); 
if (m10==0){
setTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ(), 80);
Level.destroyBlock(getPlayerX()-4, getPlayerY()+2, getPlayerZ());
}
m11 = Level.getTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1); 
if (m11==0){
setTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1, 80); 
Level.destroyBlock(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1);
}
m12 = Level.getTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ()-4); 
if (m12==0){
setTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ()-4, 80);
Level.destroyBlock(getPlayerX()-4, getPlayerY()+2, getPlayerZ()-4);
}
} 
}
}
if (zeitcounterup==3600){ 
zeitlimit=12000;
zeitcounterup=0;
zeitcounter=true;
}
m0 = Level.getTile(getPlayerX(), getPlayerY()-1, getPlayerZ()); 
if (m0==0){
regen=true;
schnee=false;
}
m00 = Level.getTile(getPlayerX(), getPlayerY()-2, getPlayerZ()); 
m000 = Level.getTile(getPlayerX(), getPlayerY()-1, getPlayerZ());
if (m00==78&&m000==0){
schnee=true;
regen=false;
}
if (regen==true) 
{
if (zeitcounter==true)
{
zeitlimit--;
}
if (zeitlimit == 0) 
{
zeitcounter=false;
zeitcounterup++;
ticks--;
if (ticks == 0)
{
ticks = 7;
m1 = Level.getTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()); 
if (m1==0){
setTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ(), 9); 
Level.destroyBlock(getPlayerX()+1, getPlayerY()+2, getPlayerZ());
}
m2 = Level.getTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ()); 
if (m2==0){
setTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ(), 9);
Level.destroyBlock(getPlayerX()+4, getPlayerY()+2, getPlayerZ());
}
m3 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+1); 
if (m3==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+1, 9); 
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()+1);
}
m4 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+4); 
if (m4==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+4, 9);
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()+4);
}
m5 = Level.getTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1); 
if (m5==0){
setTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1, 9); 
Level.destroyBlock(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1);
}
m6 = Level.getTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ()+4); 
if (m6==0){
setTile(getPlayerX()+4, getPlayerY()+2, getPlayerZ()+4, 9);
Level.destroyBlock(getPlayerX()+4, getPlayerY()+2, getPlayerZ()+4);
}
m7 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-1); 
if (m7==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-1, 9); 
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()-1);
}
m8 = Level.getTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-4); 
if (m8==0){
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-4, 9); 
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()-4);
}
m9 = Level.getTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()); 
if (m9==0){
setTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ(), 9); 
Level.destroyBlock(getPlayerX()-1, getPlayerY()+2, getPlayerZ());
}
m10 = Level.getTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ()); 
if (m10==0){
setTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ(), 9);
Level.destroyBlock(getPlayerX()-4, getPlayerY()+2, getPlayerZ());
}
m11 = Level.getTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1); 
if (m11==0){
setTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1, 9); 
Level.destroyBlock(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1);
}
m12 = Level.getTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ()-4); 
if (m12==0){
setTile(getPlayerX()-4, getPlayerY()+2, getPlayerZ()-4, 9);
Level.destroyBlock(getPlayerX()-4, getPlayerY()+2, getPlayerZ()-4);
}
} 
}
}
if (zeitcounterup==3600){ 
zeitlimit=12000;
zeitcounterup=0;
zeitcounter=true;
}
}
}
}