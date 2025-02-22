/*Time Control Mod*/
/*Created by Arjay07*/

var TC_ID = 500;
var FC_ID = 501;
var SC_ID = 502;
var MC_ID = 503;

var fast = false;
var slow = false;
var matrix = false;

var init = false;
var jumping = false;

//Variables by Whytofu
var Xpos=0;
var Zpos=0;
var Ypos=0; //Added
var s=1; 
var Xdiff=0;
var Zdiff=0;
var Ydiff=0; //Added

function initMod(){

//Textures

ModPE.overrideTexture("images/items-opaque.png", "http://i.imgur.com/9YJFIGE.png");

//Items

ModPE.setItem(TC_ID, "ender_eye", 0, "Time Controller");
ModPE.setItem(FC_ID, "ender_pearl", 0, "Fast-Forward Controller");
ModPE.setItem(SC_ID, "experience_bottle", 0, "Slow-Motion Controller");
ModPE.setItem(MC_ID, "fireworks_charge", 0, "Matrix Controller");

//Craft Recipes

Item.addCraftRecipe(TC_ID, 1, 0, [347, 1, 0, 264, 4, 0]);
Item.addCraftRecipe(FC_ID, 1, 0, [TC_ID, 1, 0, 318, 4, 0]);
Item.addCraftRecipe(SC_ID, 1, 0, [TC_ID, 1, 0, 332, 4, 0]) ;
Item.addCraftRecipe(MC_ID, 1, 0, [TC_ID, 1, 0, 264, 4, 0]) ;

}

function newLevel(){

if(!init){

initMod();
init = true;

}

}

function useItem(x, y, z, item, block, side){

if(item == TC_ID){

var time = Level.getTime()-Math.floor(Level.getTime()/19200)*19200;

if(time < (19200/2)){

Level.setTime(19200);

}else{

Level.setTime(14400);

}

}

if(item == FC_ID && !fast){

ModPE.setGameSpeed(45);
fast = true;
slow = false;
matrix = false;

}else if(item == SC_ID && !slow){

ModPE.setGameSpeed(5);
slow = true;
fast = false;
matrix = false;

}else if(item == MC_ID && !matrix){

slow = false;
fast = false;
matrix = true;

}else{

ModPE.setGameSpeed(20);
fast = false;
slow = false;
matrix = false;

}

}

function modTick(){

if(matrix){

//From WhyTofu's Sprint Mod
if(s==1)
      {
			   Xpos=getPlayerX();
        Zpos=getPlayerZ();
        s = s + 1;
      }
      else if(s==3)
      {
        s=1;
        Xdiff=getPlayerX()-Xpos;
        Zdiff=getPlayerZ()-Zpos;
        setVelX(getPlayerEnt(),Xdiff);
        setVelZ(getPlayerEnt(),Zdiff);
        Xdiff=0;
        Zdiff=0;
      }
  if(s!=1)
  {
  s = s + 1;
  }

}else if(!matrix){

return null;

}

if(Entity.getVelY(Player.getEntity()) > 0 && !jumping){

Entity.setVelY(Player.getEntity(), 0.5);
jumping = true;

}

if(Level.getTile(Player.getX(), Player.getY() - 2, Player.getZ()) != 0 && jumping){

jumping = false;

}

}