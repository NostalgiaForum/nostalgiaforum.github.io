/*
If anyone share you need to put forum link or the link of my channel of Youtube <http://www.youtube.com/elsirkael>
ElSirKael Script (C) GNC copyright
Copyright (C) <2014>  <ElSirKael>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
*/

/*
ElSirKael all beta no sell or post
Blokkit ModScript V2.0 Mod Script By ElSirKael
*/

var randomspawn=true;
var blokkitdiamond;
var blokkitglowstone;
var blokkitgold;
var blokkitgrass;
var blokkitiron;
var blokkitstone;
var blokkitwood;
var blokkitquartz;
var blokkitlava;
var blokkitgravel;
var blokkitredstone;
var blokkitglass;
var blokkittnt;
var blokkitsand
var bigblokkitdiamond;
var bigblokkitglowstone;
var bigblokkitgold;
var bigblokkitgrass;
var bigblokkitiron;
var bigblokkitstone;
var bigblokkitwood;
var PositionX;
var PositionY;
var PositionZ;
var Px;
var Py;
var Pz;
var domado = 0;
var mob = null;
var Temp;
var ticks=20;
var sp=true;
var ticks2=40;
var Xpos=0;
var Zpos=0;
var s=1; 
var s1=1;
var Xdiff=0;
var Zdiff=0;
var sd=1

var startGame = 0;

newlevel=false;
ModPE.setItem(440,"skull_zombie", 0, "Blokkit Diamond Spawner");
ModPE.setItem(441,"ruby", 0, "Blokkit Glowstone Spawner");
ModPE.setItem(442,"saddle", 0, "Blokkit Gold Spawner");
ModPE.setItem(443,"skull_creeper", 0, "Blokkit Grass Spawner");
ModPE.setItem(444,"skull_skeleton", 0, "Blokkit Iron Spawner");
ModPE.setItem(445,"skull_steve", 0, "Blokkit Stone Spawner");
ModPE.setItem(446,"skull_wither", 0, "Blokkit Wood Spawner");
ModPE.setItem(447,"empty_armor_slot_boots", 0, "Blokkit Quartz Spawner");
ModPE.setItem(448,"empty_armor_slot_chestplate", 0, "Blokkit Lava Spawner");
ModPE.setItem(449,"empty_armor_slot_helmet", 0, "Blokkit Gravel Spawner");
ModPE.setItem(450,"empty_armor_slot_leggings", 0, "Blokkit Redstone Spawner");
ModPE.setItem(451,"iron_horse_armor", 0, "Blokkit Glass Spawner");
ModPE.setItem(452,"gold_horse_armor", 0, "Blokkit Sand Spawner");
ModPE.setItem(453,"diamond_horse_armor", 0, "Blokkit TNT Spawner");
ModPE.setItem(454,"apple_golden", 0, "Golden Apple");
ModPE.setItem(456,"gold_nugget", 0, "Golden Nugget");

ModPE.overrideTexture("images/mob/blokkit_diamond.png","http://i.imgur.com/5RwE0sw.png");
ModPE.overrideTexture("images/mob/blokkit_glass.png","http://i.imgur.com/9uf5iCu.png");
ModPE.overrideTexture("images/mob/blokkit_glowstone.png","http://i.imgur.com/sJoLbDQ.png");
ModPE.overrideTexture("images/mob/blokkit_gold.png","http://i.imgur.com/gRM56fF.png");
ModPE.overrideTexture("images/mob/blokkit_grass.png","http://i.imgur.com/3kjhGDK.png");
ModPE.overrideTexture("images/mob/blokkit_gravel.png","http://i.imgur.com/siuYlGX.png");
ModPE.overrideTexture("images/mob/blokkit_iron.png","http://i.imgur.com/vt9XJ66.png");
ModPE.overrideTexture("images/mob/blokkit_lava.png","http://i.imgur.com/bpntBEX.png");
ModPE.overrideTexture("images/mob/blokkit_quartz.png","http://i.imgur.com/I1PQeau.png");
ModPE.overrideTexture("images/mob/blokkit_redstone.png","http://i.imgur.com/ZRThAWX.png");
ModPE.overrideTexture("images/mob/blokkit_sand.png","http://i.imgur.com/Zqymiiq.png");
ModPE.overrideTexture("images/mob/blokkit_stone.png","http://i.imgur.com/fqwaw4n.png");
ModPE.overrideTexture("images/mob/blokkit_tnt.png","http://i.imgur.com/BBqbI21.png");
ModPE.overrideTexture("images/mob/blokkit_wood.png","http://i.imgur.com/8ksKVvY.png");
ModPE.overrideTexture("images/mob/bigblokkit_diamond.png","http://i.imgur.com/7vx6zbU.png");
ModPE.overrideTexture("images/mob/bigblokkit_gold.png","http://i.imgur.com/ZWPoPdb.png");
ModPE.overrideTexture("images/mob/bigblokkit_grass.png","http://i.imgur.com/L70jp0T.png");
ModPE.overrideTexture("images/mob/bigblokkit_iron.png","http://i.imgur.com/py8gcfb.png");
ModPE.overrideTexture("images/mob/bigblokkit_stone.png","http://i.imgur.com/OlN5ott.png");
ModPE.overrideTexture("images/mob/bigblokkit_wood.png","http://i.imgur.com/pTNOggy.png");

Item.addCraftRecipe(440, 1, 0, [264, 9, 0]); 
Item.addCraftRecipe(441, 1, 0, [348, 9, 0]); 
Item.addCraftRecipe(442, 1, 0, [266, 9, 0]); 
Item.addCraftRecipe(443, 1, 0, [3, 9, 0]); 
Item.addCraftRecipe(444, 1, 0, [265, 9, 0]); 
Item.addCraftRecipe(445, 1, 0, [1, 9, 0]); 
Item.addCraftRecipe(446, 1, 0, [17, 9, 0]); 
Item.addCraftRecipe(447, 1, 0, [406, 9, 0]); 
Item.addCraftRecipe(448, 1, 0, [10, 2, 0]); 
Item.addCraftRecipe(449, 1, 0, [318, 5, 0]); 
Item.addCraftRecipe(450, 1, 0, [331, 9, 0]); 
Item.addCraftRecipe(451, 1, 0, [102, 9, 0]); 
Item.addCraftRecipe(452, 1, 0, [12, 9, 0]); 
Item.addCraftRecipe(453, 1, 0, [289, 9, 0]); 
Item.addCraftRecipe(454, 1, 0, [260, 1, 0,], [456, 8, 0,]); 
Item.addCraftRecipe(456, 9, 0, [266, 1, 0,]); 
 
function newLevel()
{
clientMessage(ChatColor.GRAY+"Blokkit Mod V2" +ChatColor.RED+"By ElSirKael");
newlevel=true;
}

//Blokkit

function addBlokkitRenderType(renderer){

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(63, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-6, 11, -1, 10, 10, 10, var2);
body.addBox(0, 15, -1.5, 1, 2, 0.5, var2); //Ojo Izquierdo
body.addBox(-3, 15, -1.5, 1, 2, 0.5, var2); //Ojo Derecho

rArm.clear();
rArm.setTextureOffset(0, 20, true);
rArm.addBox(9, 12, 3, 3, 7, 3, var2);

lArm.clear();
lArm.setTextureOffset(12, 20, true);
lArm.addBox(-14, 12, 3, 3, 7, 3, var2);

rLeg.clear();
rLeg.setTextureOffset(24, 20, true);
rLeg.addBox(2, 8, 3, 3, 5, 3, var2);

lLeg.clear();
lLeg.setTextureOffset(24, 20, true);
lLeg.addBox(-7, 8, 3, 3, 5, 3, var2);
 
}

var blokkitRenderType = Renderer.createHumanoidRenderer();
addBlokkitRenderType(blokkitRenderType);

//Big Blokkit

function addBigblokkitRenderType(renderer){

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0);
body.addBox(-6, 6.5, -4, 12, 12, 12, var2);
body.addBox(2, 12, -4.5, 2, 2, 0.5, var2); //Ojo Izquierdo
body.addBox(-4, 12, -4.5, 2, 2, 0.5, var2); //Ojo Derecho

rArm.clear();
rArm.setTextureOffset(48, 0);
rArm.addBox(10, 8, 0, 4, 8, 4, var2);

lArm.clear();
lArm.setTextureOffset(48, 0);
lArm.addBox(-14, 8, 0, 4, 8, 4, var2);

rLeg.clear();
rLeg.setTextureOffset(48, 12);
rLeg.addBox(2, 6, 0, 4, 6, 4, var2);

lLeg.clear();
lLeg.setTextureOffset(48, 12);
lLeg.addBox(-7, 6, 0, 4, 6, 4, var2);

}

var bigblokkitRenderType = Renderer.createHumanoidRenderer();
addBigblokkitRenderType(bigblokkitRenderType);

//Big Blokkit Diamond

function addBigblokkitdiamondRenderType(renderer){

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-6, 6.5, -4, 12, 12, 12, var2);
body.addBox(2, 12, -4.5, 2, 2, 0.5, var2); //Ojo Izquierdo
body.addBox(-4, 12, -4.5, 2, 2, 0.5, var2); //Ojo Derecho
body.setTextureOffset(0, 21, true);
body.addBox(-6.5, 4.5, -2, 0.5, 4, 7, var2);
body.addBox(6.5, 4.5, -2, 0.5, 4, 7, var2);
body.setTextureOffset(23, 26, true);
body.addBox(1.5, 4, 0, 3, 3, 3, var2);
body.addBox(-4, 4, 0, 3, 3, 3, var2);

rArm.clear();
rArm.setTextureOffset(48, 0, true);
rArm.addBox(10, 8, 0, 4, 8, 4, var2);

lArm.clear();
lArm.setTextureOffset(48, 0, true);
lArm.addBox(-14, 8, 0, 4, 8, 4, var2);

rLeg.clear();
rLeg.setTextureOffset(48, 12, true);
rLeg.addBox(2, 6, 0, 4, 6, 4, var2);

lLeg.clear();
lLeg.setTextureOffset(48, 12, true);
lLeg.addBox(-7, 6, 0, 4, 6, 4, var2);

}

var bigblokkitdiamondRenderType = Renderer.createHumanoidRenderer();
addBigblokkitdiamondRenderType(bigblokkitdiamondRenderType);


//Big Blokkit Gold

function addBigblokkitgoldRenderType(renderer) 
{

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-6, 6.5, -4, 12, 12, 12, var2);
body.addBox(2, 12, -4.5, 2, 2, 0.5, var2); //Ojo Izquierdo
body.addBox(-4, 12, -4.5, 2, 2, 0.5, var2); //Ojo Derecho
body.setTextureOffset(36, 0, true); //Corona
body.addBox(-3, 2, -1, 6, 4, 6, var2);

rArm.clear();
rArm.setTextureOffset(48, 10, true);
rArm.addBox(10, 8, 0, 4, 8, 4, var2);

lArm.clear();
lArm.setTextureOffset(48, 10, true);
lArm.addBox(-14, 8, 0, 4, 8, 4, var2);

rLeg.clear();
rLeg.setTextureOffset(48, 22, true);
rLeg.addBox(2, 6, 0, 4, 6, 4, var2);

lLeg.clear();
lLeg.setTextureOffset(48, 22, true);
lLeg.addBox(-7, 6, 0, 4, 6, 4, var2);
 
}
 
var bigblokkitgoldRenderType = Renderer.createHumanoidRenderer();
addBigblokkitgoldRenderType(bigblokkitgoldRenderType);

//Big Blokkit Iron

function addBigblokkitironRenderType(renderer) 
{

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0);
body.addBox(-6, 6.5, -4, 12, 12, 12, var2);
body.addBox(2, 12, -4.5, 2, 2, 0.5, var2); //Ojo Izquierdo
body.addBox(-4, 12, -4.5, 2, 2, 0.5, var2); //Ojo Derecho

rArm.clear();
rArm.setTextureOffset(48, 10);
rArm.addBox(10, 8, 0, 4, 8, 4, var2);
rArm.setTextureOffset(36, 0);
rArm.addBox(9, 10, -1, 6, 4, 6, var2);

lArm.clear();
lArm.setTextureOffset(48, 10);
lArm.addBox(-14, 8, 0, 4, 8, 4, var2);
lArm.setTextureOffset(36, 0);
lArm.addBox(-15, 10, -1, 6, 4, 6, var2);

rLeg.clear();
rLeg.setTextureOffset(48, 22);
rLeg.addBox(2, 6, 0, 4, 6, 4, var2);

lLeg.clear();
lLeg.setTextureOffset(48, 22);
lLeg.addBox(-7, 6, 0, 4, 6, 4, var2);
 
}
 
var bigblokkitironRenderType = Renderer.createHumanoidRenderer();
addBigblokkitironRenderType(bigblokkitironRenderType);


//Big Blokkit Grass

function addBigblokkitgrassRenderType(renderer) 
{

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-6, 6.5, -4, 12, 12, 12, var2);
body.addBox(2, 12, -4.5, 2, 2, 0.5, var2); //Ojo Izquierdo
body.addBox(-4, 12, -4.5, 2, 2, 0.5, var2); //Ojo Derecho
body.setTextureOffset(2, 24, true); //Flores Amarillas
body.addBox(0, 2.5, 1, 4, 4, 4, var2);
body.setTextureOffset(26, 24, true); //Flores Rojas
body.addBox(-4, 2.5, -3, 4, 4, 4, var2);

rArm.clear();
rArm.setTextureOffset(48, 0, true);
rArm.addBox(10, 8, 0, 4, 8, 4, var2);

lArm.clear();
lArm.setTextureOffset(48, 0, true);
lArm.addBox(-14, 8, 0, 4, 8, 4, var2);

rLeg.clear();
rLeg.setTextureOffset(48, 12, true);
rLeg.addBox(2, 6, 0, 4, 6, 4, var2);

lLeg.clear();
lLeg.setTextureOffset(48, 12, true);
lLeg.addBox(-7, 6, 0, 4, 6, 4, var2);
 
}
 
var bigblokkitgrassRenderType = Renderer.createHumanoidRenderer();
addBigblokkitgrassRenderType(bigblokkitgrassRenderType);


function useItem(x,y,z,itemId,block,side)
{
if(itemId==440)
{
blokkitdiamond= Level.spawnMob(x,y+1,z,10,"mob/blokkit_diamond.png");   
Entity.setRenderType(blokkitdiamond,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitdiamond,"Blokkit Diamond");
Entity.setHealth(blokkitdiamond, 10);
}
if(itemId==441)
{
blokkitglowstone= Level.spawnMob(x,y+1,z,10,"mob/blokkit_glowstone.png");
Entity.setRenderType(blokkitglowstone,blokkitRenderType.renderType);   
Entity.setNameTag(blokkitglowstone,"Blokkit Glowstone");
Entity.setHealth(blokkitglowstone, 10);
}
if(itemId==442)
{
blokkitgold= Level.spawnMob(x,y+1,z,10,"mob/blokkit_gold.png");  
Entity.setRenderType(blokkitgold,blokkitRenderType.renderType);  
Entity.setNameTag(blokkitgold,"Blokkit Gold");
Entity.setHealth(blokkitgold, 10);
}
if(itemId==443)
{
blokkitgrass= Level.spawnMob(x,y+1,z,10,"mob/blokkit_grass.png");  
Entity.setRenderType(blokkitgrass,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitgrass,"Blokkit Grass");
Entity.setHealth(blokkitgrass, 10);
}
if(itemId==444)
{
blokkitiron= Level.spawnMob(x,y+1,z,10,"mob/blokkit_iron.png");   
Entity.setRenderType(blokkitiron,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitiron,"Blokkit Iron");
Entity.setHealth(blokkitiron, 10);
}
if(itemId==445)
{
blokkitstone= Level.spawnMob(x,y+1,z,10,"mob/blokkit_stone.png"); 
Entity.setRenderType(blokkitstone,blokkitRenderType.renderType);   
Entity.setNameTag(blokkitstone,"Blokkit Stone");
Entity.setHealth(blokkitstone, 10);
}
if(itemId==446)
{
blokkitwood= Level.spawnMob(x,y+1,z,10,"mob/blokkit_wood.png");   
Entity.setRenderType(blokkitwood,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitwood,"Blokkit Wood");
Entity.setHealth(blokkitwood, 10);
}
if(itemId==447)
{
blokkitquartz= Level.spawnMob(x,y+1,z,10,"mob/blokkit_quartz.png");   
Entity.setRenderType(blokkitquartz,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitquartz,"Blokkit Quartz");
Entity.setHealth(blokkitquartz, 10);
}
if(itemId==448)
{
blokkitlava= Level.spawnMob(x,y+1,z,10,"mob/blokkit_lava.png");   
Entity.setRenderType(blokkitlava,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitlava,"Blokkit Lava");
Entity.setHealth(blokkitlava, 10);
}
if(itemId==449)
{
blokkitgravel= Level.spawnMob(x,y+1,z,10,"mob/blokkit_gravel.png");   
Entity.setRenderType(blokkitgravel,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitgravel,"Blokkit Gravel");
Entity.setHealth(blokkitgravel, 10);
}
if(itemId==450)
{
blokkitredstone= Level.spawnMob(x,y+1,z,10,"mob/blokkit_redstone.png");   
Entity.setRenderType(blokkitredstone,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitredstone,"Blokkit RedStone");
Entity.setHealth(blokkitredstone, 10);
}
if(itemId==451)
{
blokkitglass= Level.spawnMob(x,y+1,z,10,"mob/blokkit_glass.png");   
Entity.setRenderType(blokkitglass,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitglass,"Blokkit Glass");
Entity.setHealth(blokkitglass, 10);
}
if(itemId==452)
{
blokkitsand= Level.spawnMob(x,y+1,z,10,"mob/blokkit_sand.png");   
Entity.setRenderType(blokkitsand,blokkitRenderType.renderType); 
Entity.setNameTag(blokkitsand,"Blokkit Sand");
Entity.setHealth(blokkitsand, 10);
}
if(itemId==453)
{
blokkittnt= Level.spawnMob(x,y+1,z,10,"mob/blokkit_tnt.png");   
Entity.setRenderType(blokkittnt,blokkitRenderType.renderType); 
Entity.setNameTag(blokkittnt,"Blokkit TNT");
Entity.setHealth(blokkittnt, 10);
}
}
 
function deathHook(murderer, victim)
{
if(victim==blokkitdiamond){
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 264, 3, 0);
}
else if(victim==blokkitglowstone)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 348, 3, 0);
}
else if(victim==blokkitgold)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 266, 3, 0);
}
else if(victim==blokkitgrass)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 2, 3, 0);
}
else if(victim==blokkitiron)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 265, 3, 0);
}
else if(victim==blokkitstone)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 1, 3, 0);
}
else if(victim==blokkitwood)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 17, 3, 0);
}
}

function attackHook(attacker, victim)
{
if(getCarriedItem()==260)
{
if(domado==0)
{
PositionX = getPlayerX();
PositionY = getPlayerY();
PositionZ = getPlayerZ();
print("Mob Domado")
mob = victim;
domado = 1
}
else
if(domado==1)
{
  domado = 2
}
else
if(domado==2)
{
domado = 1
}
preventDefault();
}
if(getCarriedItem() == 454 && victim == blokkitdiamond)
{
var entX = Entity.getX(victim);
var entY = Entity.getY(victim);
var entZ = Entity.getZ(victim);
Entity.remove(victim);
var bigblokkitdiamond = Level.spawnMob(entX,entY,entZ,11,"mob/bigblokkit_diamond.png");
Entity.setRenderType(bigblokkitdiamond,bigblokkitdiamondRenderType.renderType);
Entity.setNameTag(bigblokkitdiamond,"Big Blokkit Diamond");
Entity.setHealth(bigblokkitdiamond, 20);
clientMessage("Blokkit Diamond evoluciono a Big Blokkit Diamond");
}
//if(getCarriedItem() == 454 && victim == blokkitglowstone)
//{
//var entX = Entity.getX(victim);
//var entY = Entity.getY(victim);
//var entZ = Entity.getZ(victim);
//Entity.remove(victim);
//var bigblokkitglowstone = Level.spawnMob(entX,entY,entZ,11,"mob/bigblokkit_glowstone.png"); 
//Entity.setRenderType(bigblokkitglowstone,bigblokkitRenderType.renderType);
//clientMessage("Blokkit Glowstone evoluciono a Big Blokkit Glowstone!");
//}
if(getCarriedItem() == 454 && victim === blokkitgold)
{
var entX = Entity.getX(victim);
var entY = Entity.getY(victim);
var entZ = Entity.getZ(victim);
Entity.remove(victim);
var bigblokkitgold = Level.spawnMob(entX,entY,entZ,12,"mob/bigblokkit_gold.png");
Entity.setRenderType(bigblokkitgold,bigblokkitgoldRenderType.renderType);
Entity.setNameTag(bigblokkitgold,"Big Blokkit Gold");
Entity.setHealth(bigblokkitgold, 20);
clientMessage("Blokkit Gold evoluciono a Big Blokkit Gold");
}
if(getCarriedItem() == 454 && victim === blokkitgrass)
{
var entX = Entity.getX(victim);
var entY = Entity.getY(victim);
var entZ = Entity.getZ(victim);
Entity.remove(victim);
var bigblokkitgrass = Level.spawnMob(entX,entY,entZ,12,"mob/bigblokkit_grass.png");
Entity.setRenderType(bigblokkitgrass,bigblokkitgrassRenderType.renderType);
Entity.setNameTag(bigblokkitgrass,"Big Blokkit Grass");
Entity.setHealth(bigblokkitgrass, 20);
clientMessage("Blokkit Grass evoluciono a Big Blokkit Grass");
}
if(getCarriedItem() == 454 && victim === blokkitiron)
{
var entX = Entity.getX(victim);
var entY = Entity.getY(victim);
var entZ = Entity.getZ(victim);
Entity.remove(victim);
var bigblokkitiron = Level.spawnMob(entX,entY,entZ,12,"mob/bigblokkit_iron.png");
Entity.setRenderType(bigblokkitiron,bigblokkitironRenderType.renderType);
Entity.setNameTag(bigblokkitiron,"Big Blokkit Iron");
Entity.setHealth(bigblokkitiron, 20);
clientMessage("Blokkit Iron evoluciono a Big Blokkit Iron");
}
if(getCarriedItem() == 454 && victim === blokkitstone)
{
var entX = Entity.getX(victim);
var entY = Entity.getY(victim);
var entZ = Entity.getZ(victim);
Entity.remove(victim);
var bigblokkitstone = Level.spawnMob(entX,entY,entZ,12,"mob/bigblokkit_stone.png");
Entity.setRenderType(bigblokkitstone,bigblokkitRenderType.renderType);
Entity.setNameTag(bigblokkitstone,"Big Blokkit Stone");
Entity.setHealth(bigblokkitstone, 20);
clientMessage("Blokkit Stone evoluciono a Big Blokkit Stone");
}
if(getCarriedItem() == 454 && victim === blokkitwood)
{
var entX = Entity.getX(victim);
var entY = Entity.getY(victim);
var entZ = Entity.getZ(victim);
Entity.remove(victim);
var bigblokkitwood = Level.spawnMob(entX,entY,entZ,12,"mob/bigblokkit_wood.png");
Entity.setRenderType(bigblokkitwood,bigblokkitRenderType.renderType);
Entity.setNameTag(bigblokkitwood,"Big Blokkit Wood");
Entity.setHealth(bigblokkitwood, 20);
clientMessage("Blokkit Wood evoluciono a Big Blokkit Wood");
}
}

function Tpmob(x,y,z)
{
	setPosition(mob,x,y-1,z);
	PositionX = x;
	PositionY = y;
	PositionZ = z;
}
 
function modTick()
{
if(domado==1)
{
  Temp = getPlayerX() - PositionX;
  if(Temp < 0) {Temp = -Temp;}
  if(Temp > 10) {Tpmob(getPlayerX(), getPlayerY(), getPlayerZ());}
  else
  {
  Temp = getPlayerY() - PositionY;
  if(Temp < 0) {Temp = -Temp;}
  if(Temp > 10) {Tpmob(getPlayerX(), getPlayerY(), getPlayerZ());}
  else
  {
  Temp = getPlayerZ() - PositionZ;
  if(Temp < 0) {Temp = -Temp;}
  if(Temp > 10) {Tpmob(getPlayerX(), getPlayerY(), getPlayerZ());}
  }
  }
}
else
if(domado==2)
{
  Px = getPlayerX();
  Py = getPlayerY();
  Pz = getPlayerZ();
  
  setPosition(mob,Px,Py+0.5,Pz)
}

{
Level.addParticle(ParticleType.lava, Entity.getX(blokkitlava) , Entity.getY(blokkitlava)+0.8, Entity.getZ(blokkitlava), 0, 0, 0, 2);
}
{
Level.addParticle(ParticleType.redstone, Entity.getX(blokkitredstone) , Entity.getY(blokkitredstone)+0.8, Entity.getZ(blokkitredstone), 0, 0, 0, 2);
}
}


function procCmd(c)
{
var cmd = c.split(" ");
if(cmd[0] == "blokkit")
{
Player.addItemInventory(440,1);
Player.addItemInventory(441,1);
Player.addItemInventory(442,1);
Player.addItemInventory(443,1);
Player.addItemInventory(444,1);
Player.addItemInventory(445,1);
Player.addItemInventory(446,1);
Player.addItemInventory(447,1);
Player.addItemInventory(448,1);
Player.addItemInventory(449,1);
Player.addItemInventory(450,1);
Player.addItemInventory(451,1);
Player.addItemInventory(452,1);
Player.addItemInventory(453,1);
clientMessage("Tienes todos los spawners");
}
}
 
function leaveGame()
{
newlevel=false;
ModPE.resetImages();
}
{
startGame = 0;
}

