/*
If anyone share you need to put forum link and my channel of Youtube <http://www.youtube.com/elsirkael>
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
Mutant Creeper V1.3 Mod Script By ElSirKael
*/

var minioncreeper = 0;
var mutantenderman;
var mutantcreeper;
var mutantzombie;
var mutantskeleton;
looptimer = false;
loopcount = 0; 
looptimer2 = false;
loopcount2 = 0; 
var startGame=0;

//Texturas
ModPE.overrideTexture("images/mob/mutant_enderman.png","http://i.imgur.com/7jZbmsf.png");
ModPE.overrideTexture("images/mob/mutant_creeper.png","http://i.imgur.com/F1sAbvP.png");
ModPE.overrideTexture("images/mob/mutant_skeleton.png","http://i.imgur.com/SnD8BnI.png");
ModPE.overrideTexture("images/mob/mutant_zombie.png","http://i.imgur.com/SnD8BnI.png");
ModPE.overrideTexture("images/mob/mutant_ghast.png","http://i.imgur.com/89TmLwr.png");
ModPE.overrideTexture("images/mob/mutant_snowgolem.png","http://i.imgur.com/eu0BZ5v.png");
ModPE.overrideTexture("images/mob/minioncreeper.png","http://i.imgur.com/kOXg0Uq.png");

//Item Spawners
ModPE.setItem(450,"spawn_egg",0,"Mutant Creeper Spawner");
ModPE.setItem(451,"spawn_egg",0,"Mutant Enderman Spawner");
ModPE.setItem(452,"spawn_egg",0,"Mutant Zombie Spawner");
ModPE.setItem(453,"spawn_egg",0,"Mutant Skeleton Spawner");

//Spawners en Creativo
Player.addItemCreativeInv(450,1,2);
Player.addItemCreativeInv(451,1,2);
Player.addItemCreativeInv(452,1,2);
Player.addItemCreativeInv(453,1,2);


//Mutant Enderman Modelo
function addMutantendermanToRenderer(renderer)
{

var var2 = 0;
var var3 = 1;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

head.clear();
head.setTextureOffset(32, 0, true);
head.addBox(-4, -41, -4, 8, 6, 8, var2); //Cabeza
head.setTextureOffset(0, 18, true);
head.addBox(-5, -35, -5, 10, 4, 10, var2); //Recubre Cabeza

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-4, -32, -2, 8, 10, 6, var3); //Cuerpo Superior
body.setTextureOffset(0, 0, true);
body.addBox(-4, -23, -0.5, 8, 10, 6, var3); //Cuerpo Central
body.setTextureOffset(0, 0, true);
body.addBox(-3, -14, -1, 6, 10, 6, var3); //Cuerpo Inferior
//body.addBox(0, 0, 0, 0, 0, 0, var2);

rArm.clear();
rArm.setTextureOffset(0, 0, true); //Brazo Superior
rArm.addBox(-2, -30, 0, 3, 3, 3, var2);
rArm.addBox(-4, -29, 0, 3, 3, 3, var2);
rArm.addBox(-6, -28, 1, 3, 3, 3, var2);
rArm.addBox(-8, -27, 2, 3, 3, 3, var2);
rArm.addBox(-10, -26, 3, 3, 3, 3, var2);
rArm.addBox(-12, -25, 2, 3, 3, 3, var2);
rArm.addBox(-14, -24, 1, 3, 4, 3, var2);
rArm.addBox(-16, -22, 0, 3, 3, 3, var2);
rArm.addBox(-17, -19, -1, 3, 3, 3, var2);
rArm.addBox(-18, -17, -2, 3, 5, 3, var2);

rArm.setTextureOffset(0, 0, true); //Brazo Inferior
rArm.addBox(-2, -20, 1, 3, 3, 3, var2);
rArm.addBox(-4, -19, 1, 3, 3, 3, var2);
rArm.addBox(-5, -17, 2, 3, 3, 3, var2);
rArm.addBox(-6, -15, 3, 3, 3, 3, var2);
rArm.addBox(-7, -14, 2, 3, 3, 3, var2);
rArm.addBox(-8, -12, 1, 3, 3, 3, var2);
rArm.addBox(-9, -10, 0, 3, 3, 3, var2);
rArm.addBox(-10, -8, -1, 3, 3, 3, var2);
rArm.addBox(-11, -6, -2, 3, 3, 3, var2);
rArm.addBox(-12, -4, -3, 3, 5, 3, var2);

lArm.clear();
lArm.setTextureOffset(0, 0, true); //Brazo Superior
lArm.addBox(-1, -30, 0, 3, 3, 3, var2);
lArm.addBox(1, -29, 0, 3, 3, 3, var2);
lArm.addBox(3, -28, 1, 3, 3, 3, var2);
lArm.addBox(5, -27, 2, 3, 3, 3, var2);
lArm.addBox(7, -26, 3, 3, 3, 3, var2);
lArm.addBox(9, -25, 2, 3, 3, 3, var2);
lArm.addBox(11, -24, 1, 3, 4, 3, var2);
lArm.addBox(13, -22, 0, 3, 3, 3, var2);
lArm.addBox(14, -19, -1, 3, 3, 3, var2);
lArm.addBox(15, -17, -2, 3, 5, 3, var2);

lArm.setTextureOffset(0, 0, true); //Brazo Inferior
lArm.addBox(-1, -20, 1, 3, 3, 3, var2);
lArm.addBox(1, -19, 1, 3, 3, 3, var2);
lArm.addBox(2, -17, 2, 3, 3, 3, var2);
lArm.addBox(3, -15, 3, 3, 3, 3, var2);
lArm.addBox(4, -14, 2, 3, 3, 3, var2);
lArm.addBox(5, -12, 1, 3, 3, 3, var2);
lArm.addBox(6, -10, 0, 3, 3, 3, var2);
lArm.addBox(7, -8, -1, 3, 3, 3, var2);
lArm.addBox(8, -6, -2, 3, 3, 3, var2);
lArm.addBox(9, -4, -3, 3, 5, 3, var2);

rLeg.clear();
rLeg.setTextureOffset(0, 0, true);
rLeg.addBox(-3.5, -17, -1.5, 3, 5, 3, var2);
rLeg.addBox(-4, -13, -2, 3, 5, 3, var2);
rLeg.addBox(-4.5, -11, -2.5, 3, 5, 3, var2);
rLeg.addBox(-5, -8, -3, 3, 5, 3, var2);
rLeg.addBox(-5.5, -6, -4, 3, 5, 3, var2);
rLeg.addBox(-6, -2, -3, 3, 14, 3, var2);

lLeg.clear();
lLeg.setTextureOffset(0, 0, true);
lLeg.addBox(0.5, -17, -1.5, 3, 5, 3, var2);
lLeg.addBox(1, -13, -2, 3, 5, 3, var2);
lLeg.addBox(1.5, -11, -2.5, 3, 5, 3, var2);
lLeg.addBox(2, -8, -3, 3, 5, 3, var2);
lLeg.addBox(2.5, -6, -3.5, 3, 5, 3, var2);
lLeg.addBox(3, -2, -3, 3, 14, 3, var2);

}
 
var mutantendermanRenderer = Renderer.createHumanoidRenderer();
addMutantendermanToRenderer(mutantendermanRenderer);


//Mutant Creeper Modelo
function addMutantcreeperToRenderer(renderer)
{
 
var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

head.clear();
head.setTextureOffset(0, 10, true);
head.addBox(-5, -16, -21, 10, 10, 12, var2); //Cabeza
head.setTextureOffset(0, 0, true);
head.addBox(-4, -14, -9, 8, 8, 10, var2); //Cuello
head.addBox(-4, -13, -4, 8, 8, 10, var2); //Cuello
head.addBox(-4, -11, -6, 8, 8, 10, var2); //Cuello
head.addBox(-4, -9, -4, 8, 8, 10, var2); //Cuello
head.addBox(-4, -7, -3, 8, 8, 10, var2); //Cuello

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-4, -4, -1, 8, 10, 10, var2); //Cuerpo
body.addBox(-4, 0, 0, 8, 10, 10, var2);
body.addBox(-4, 9, -2, 8, 6, 11, var2);
body.addBox(-4, 10, -5, 8, 6, 11, var2);
body.addBox(-4, 12, -7, 8, 6, 11, var2);
//body.addBox(0, 0, 0, 0, 0, 0, var2);

rArm.clear();
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-3, 9, -8, 6, 6, 8, var2); //Base Pierna Delantera
rArm.addBox(-5, 7, -12, 6, 6, 8, var2);
rArm.addBox(-8, 5, -14, 6, 6, 8, var2);
rArm.addBox(-10, 7, -17, 6, 6, 8, var2);
rArm.addBox(-12, 10, -19, 6, 6, 6, var2);
rArm.setTextureOffset(40, 0, true);
rArm.addBox(-13, 15, -20, 6, 9, 6, var2); //Pierna Baja

lArm.clear();
lArm.setTextureOffset(0, 0, true);
lArm.addBox(-3, 9, -8, 6, 6, 8, var2); //Base Pierna Delantera
lArm.addBox(0, 7, -12, 6, 6, 8, var2);
lArm.addBox(2, 5, -14, 6, 6, 8, var2);
lArm.addBox(4, 7, -17, 6, 6, 8, var2);
lArm.addBox(6, 10, -19, 6, 6, 6, var2);
lArm.setTextureOffset(40, 0, true);
lArm.addBox(7, 15, -20, 6, 9, 6, var2); //Pierna Baja

rLeg.clear();
rLeg.setTextureOffset(0, 0, true);
rLeg.addBox(-3, -2, 6, 6, 6, 6, var2); //Base Pierna Trasera
rLeg.addBox(-3, -4, 10, 6, 6, 6, var2);
rLeg.addBox(-8, -1, 13, 6, 7, 6, var2);
rLeg.setTextureOffset(40, 0, true);
rLeg.addBox(-11, 4, 15, 6, 9, 6, var2); //Pierna Baja

lLeg.clear();
lLeg.setTextureOffset(0, 0, true);
lLeg.addBox(-3, -2, 6, 6, 6, 6, var2); //Base Pierna Trasera
lLeg.addBox(-1, -4, 10, 6, 6, 6, var2);
lLeg.addBox(2, -1, 13, 6, 7, 6, var2);
lLeg.setTextureOffset(40, 0, true);
lLeg.addBox(5, 4, 15, 6, 9, 6, var2); //Pierna Baja
 
}

var mutantcreeperRenderer = Renderer.createHumanoidRenderer();
addMutantcreeperToRenderer(mutantcreeperRenderer);

//Mutant Zombie Modelo
function addMutantzombieToRenderer(renderer)
{

var var4 = 2;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-2, -20, -16, 4, 4, 4, var4); //Cabeza
body.setTextureOffset(24, 0, true);
body.addBox(-6, -14, -8, 12, 6, 8, 5); //Cuerpo Parte Superior
body.setTextureOffset(38, 14, true);
body.addBox(-3, -3, -6, 7, 8, 6, var4); //Cuerpo Parte Inferior
//body.addBox(0, 0, 0, 0, 0, 0, var4);

rArm.clear();
rArm.setTextureOffset(12, 14, true);
rArm.addBox(16, -17, -4, 3, 8, 3, var4);
rArm.setTextureOffset(24, 14, true);
rArm.addBox(16, -6, -3, 3, 8, 3, var4);

lArm.clear();
lArm.setTextureOffset(12, 14, true);
lArm.addBox(-20, -17, -4, 3, 8, 3, var4);
lArm.setTextureOffset(24, 14, true);
lArm.addBox(-20, -6, -3, 3, 8, 3, var4);

rLeg.clear();
rLeg.setTextureOffset(0, 15, true);
rLeg.addBox(5, -4, -4, 3, 5.5, 3, var4);
rLeg.setTextureOffset(0, 8, true);
rLeg.addBox(5, 4, -3, 3, 4, 3, var4);

lLeg.clear();
lLeg.setTextureOffset(0, 15, true);
lLeg.addBox(-7, -4, -4, 3, 5.5, 3, var4);
lLeg.setTextureOffset(0, 8, true);
lLeg.addBox(-7, 4, -3, 3, 4, 3, var4);

}
 
var mutantzombieRenderer = Renderer.createHumanoidRenderer();
addMutantzombieToRenderer(mutantzombieRenderer);


//Mutant Skeleton Modelo
function addMutantskeletonToRenderer(renderer)
{

var var2 = 0;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0, true);
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");

head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -24, -4, 8, 8, 8, var2); //Cabeza
head.setTextureOffset(0, 17, true);
head.addBox(-4, -18, -5, 8, 3, 8, var2); //Sombrero
head.setTextureOffset(32, 0, true);
head.addBox(-1.5, -16, -1, 3, 5, 3, var2); //Cuello

body.clear();
body.setTextureOffset(32, 0, true);
body.addBox(-2.5, -12, -2, 5, 11, 5, var2); //Columna
body.addBox(-3, -9, -1, 6, 12, 5, var2); //Columna
body.setTextureOffset(32, 4, true);
body.addBox(-5, 1, -2, 10, 5, 7, var2); //Columna
//body.setTextureOffset(0, 0, true);
//body.addBox(-4, 10, -5, 8, 6, 11, var2); 
//body.addBox(-4, 12, -7, 8, 6, 11, var2); 
body.setTextureOffset(32, 0, true);
body.addBox(1, -10, 2, 6, 2, 4, var2); //Costillas
body.addBox(5, -10, 0, 6, 2, 4, var2);
body.addBox(9, -10, -3, 3, 2, 5, var2);
body.addBox(6, -10, -5, 5, 2, 3, var2);
body.addBox(1, -10, -6, 6, 2, 2, var2);
body.addBox(-7, -10, 2, 6, 2, 4, var2);
body.addBox(-11, -10, 0, 6, 2, 4, var2);
body.addBox(-12, -10, -3, 3, 2, 5, var2);
body.addBox(-11, -10, -5, 5, 2, 3, var2);
body.addBox(-7, -10, -6, 6, 2, 2, var2);
body.addBox(1, -7, 2, 6, 2, 4, var2);
body.addBox(5, -7, 0, 6, 2, 4, var2);
body.addBox(9, -7, -3, 3, 2, 5, var2);
body.addBox(6, -7, -5, 5, 2, 3, var2);
body.addBox(2, -7, -6, 5, 2, 2, var2);
body.addBox(-7, -7, 2, 6, 2, 4, var2);
body.addBox(-11, -7, 0, 6, 2, 4, var2);
body.addBox(-12, -7, -3, 3, 2, 5, var2);
body.addBox(-11, -7, -5, 5, 2, 3, var2);
body.addBox(-7, -7, -6, 5, 2, 2, var2);
body.addBox(1, -4, 1, 6, 2, 4, var2);
body.addBox(0, -4, 0, 6, 2, 4, var2);
body.addBox(8, -4, -3, 3, 2, 5, var2);
body.addBox(5, -4, -5, 5, 2, 3, var2);
body.addBox(2, -4, -6, 5, 2, 2, var2);
body.addBox(-7, -4, 1, 6, 2, 4, var2);
body.addBox(-10, -4, -1, 6, 2, 4, var2);
body.addBox(-11, -4, -3, 3, 2, 5, var2);
body.addBox(-10, -4, -5, 5, 2, 3, var2);
body.addBox(-7, -4, -6, 5, 2, 2, var2);
body.setTextureOffset(0, 16, true);
body.addBox(2, -14, -3, 10, 3, 6, var2);
body.addBox(-12, -14, -3, 10, 3, 6, var2);
//body.addBox(0, 0, 0, 0, 0, 0, var2);


rArm.clear();
rArm.setTextureOffset(32, 0, true);
rArm.addBox(12, -11, -2, 4, 5, 4, var2); //Brazo
rArm.addBox(13, -7, -2, 4, 7, 4, var2);
rArm.addBox(14, -2, -3, 4, 7, 4, var2);
rArm.addBox(14, 3, -4, 4, 6, 4, var2);

lArm.clear();
lArm.setTextureOffset(32, 0, true);
lArm.addBox(-16, -11, -2, 4, 5, 4, var2); //Brazo
lArm.addBox(-17, -7, -2, 4, 7, 4, var2);
lArm.addBox(-18, -2, -3, 4, 7, 4, var2);
lArm.addBox(-18, 3, -4, 4, 7, 4, var2);
lArm.setTextureOffset(48, 22, true);
lArm.addBox(-17, 0, -13, 2, 3, 2, var2); //Arco
lArm.addBox(-17, 2, -12, 2, 2, 3, var2);
lArm.addBox(-17, 3, -10, 2, 2, 3, var2);
lArm.addBox(-17, 4, -8, 2, 2, 3, var2);
lArm.setTextureOffset(32, 22, true);
lArm.addBox(-17, 5, -6, 2, 2, 6, var2);
lArm.setTextureOffset(48, 22, true);
lArm.addBox(-17, 4, 0, 2, 2, 3, var2);
lArm.addBox(-17, 3, 2, 2, 2, 3, var2);
lArm.addBox(-17, 2, 4, 2, 2, 3, var2);
lArm.addBox(-17, 0, 6, 2, 3, 2, var2);
lArm.setTextureOffset(32, 22, true);
lArm.addBox(-16.5, 0, -11, 1, 1, 17, var2);

rLeg.clear();
rLeg.setTextureOffset(32, 0, true);
rLeg.addBox(4, -10, -3, 4, 4, 4, var2); //Pierna
rLeg.addBox(4, -7, -4, 4, 4, 4, var2);
rLeg.addBox(4, -4, -5, 4, 4, 4, var2);
rLeg.addBox(4, -2, -4, 4, 12, 5, var2);

lLeg.clear();
lLeg.setTextureOffset(32, 0, true);
lLeg.addBox(-8, -10, -3, 4, 4, 4, var2); //Pierna
lLeg.addBox(-8, -7, -4, 4, 4, 4, var2);
lLeg.addBox(-8, -4, -5, 4, 4, 4, var2);
lLeg.addBox(-8, -2, -4, 4, 12, 5, var2);

}
 
var mutantskeletonRenderer = Renderer.createHumanoidRenderer();
addMutantskeletonToRenderer(mutantskeletonRenderer);


//Minion Creeper Modelo
function addCreepToRenderer(renderer)
{

var var2 = 0;
var var3 = 0.5;
var model = renderer.getModel();

var head = model.getPart("head").clear().setTextureOffset(56, 0);
var body = model.getPart("body").clear().setTextureOffset(56, 0);
var rArm = model.getPart("rightArm").clear().setTextureOffset(56, 0);
var lArm = model.getPart("leftArm").clear().setTextureOffset(56, 0);
var rLeg = model.getPart("rightLeg").clear().setTextureOffset(56, 0);
var lLeg = model.getPart("leftLeg").clear().setTextureOffset(56, 0);

head.clear();

body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(-2, 11, -3, 4, 4, 4, var2); //Cabeza
body.setTextureOffset(8, 8, true);
body.addBox(-2, 15, -2, 4, 6, 2, var2); //Cuerpo
body.setTextureOffset(0, 8, true);
body.addBox(0, 21, 0, 2, 3, 2, var2); //Base Pierna Delantera
body.setTextureOffset(0, 8, true);
body.addBox(-2, 21, -4, 2, 3, 2, var2); //Base Pierna Delantera
body.setTextureOffset(0, 8, true);
body.addBox(-2, 21, 0, 2, 3, 2, var2); //Base Pierna Trasera
body.setTextureOffset(0, 8, true);
body.addBox(0, 21, -4, 2, 3, 2, var2); //Base Pierna Trasera

rArm.clear();

lArm.clear();

rLeg.clear();

lLeg.clear();

}
 
var creepRenderer = Renderer.createHumanoidRenderer();
addCreepToRenderer(creepRenderer);


//Modtik para que Spawneen solos y dropeen entidades
function modTick() 
{ 
if(startGame==0){ 
startGame = 1; 
} 
if(startGame==1){ 
var SpawnMob = Math.floor((Math.random()*7500)+1);

switch(SpawnMob){
case 1:
mutantcreeper = Level.spawnMob( Entity.getX(mutantcreeper), Entity.getY(mutantcreeper), Entity.getZ(mutantcreeper), 35,"mob/mutant_creeper.png" );
Entity.setHealth(mutantcreeper, 200);
Entity.setRenderType(mutantcreeper, mutantcreeperRenderer.renderType);
break;
   
case 2:
mutantenderman = Level.spawnMob( Entity.getX(mutantenderman), Entity.getY(mutantenderman), Entity.getZ(mutantenderman), 38,"mob/mutant_enderman.png" );
Entity.setHealth(mutantenderman, 200);
Entity.setRenderType(mutantenderman, mutantendermanRenderer.renderType);
break;

case 3:
mutantzombie = Level.spawnMob( Entity.getX(mutantzombie), Entity.getY(mutantzombie), Entity.getZ(mutantzombie), 32,"mob/mutant_zombie.png" );
Entity.setHealth(mutantzombie, 200);
Entity.setRenderType(mutantzombie, mutantzombieRenderer.renderType);
break;

case 4:
mutantskeleton = Level.spawnMob( Entity.getX(mutantskeleton), Entity.getY(mutantskeleton), Entity.getZ(mutantskeleton), 34,"mob/mutant_skeleton.png" );
Entity.setHealth(mutantskeleton, 200);
Entity.setRenderType(mutantskeleton, mutantskeletonRenderer.renderType);
break;

}
}
if(Entity.getEntityTypeId(mutantcreeper)==35){
var x = Entity.getX(mutantcreeper);
var y = Entity.getY(mutantcreeper);
var z = Entity.getZ(mutantcreeper);
var looptimer = true;
}
if (looptimer==true){
loopcount ++;
if (loopcount==100){
loopcount = 0;
var minioncreeper = Level.spawnMob (Entity.getX (mutantcreeper), Entity.getY(mutantcreeper), Entity.getZ(mutantcreeper),33,"mob/minioncreeper.png");
Entity.setRenderType(minioncreeper, creepRenderer.renderType);
}
}
if( Entity.getEntityTypeId(mutantenderman)==38){
var x = Entity.getX(mutantenderman);
var y = Entity.getY(mutantenderman);
var z = Entity.getZ(mutantenderman);
var looptimer2 = true;
}
if (looptimer2==true){
loopcount2 ++;
if (loopcount2==200){
loopcount2 = 0;
Level.spawnMob (Entity.getX (mutantenderman), Entity.getY(mutantenderman), Entity.getZ(mutantenderman),38);
}
}
}

function attackHook(a, v){
if (v== mutantcreeper){
Level.playSoundEnt(v, "fire.ignite", 100, 30);
Level.addParticle(ParticleType.smoke, Entity.getX(v) , Entity.getY(v), Entity.getZ(v), 0, 0, 0, 0);
}
if (v== mutantzombie){
Level.playSoundEnt(v, "mob.zombiepig.zpigangry", 100, 30);
Level.addParticle(ParticleType.redstone, Entity.getX(v) , Entity.getY(v), Entity.getZ(v), 0, 0, 0, 0);
}
if (v== mutantenderman){
setPositionRelative(Player.getEntity(),3,3,7);
Level.addParticle(ParticleType.cloud, Entity.getX(v) , Entity.getY(v), Entity.getZ(v), 0, 0, 0, 0);
}
if (v== mutantskeleton){
Level.playSoundEnt(v,"random.bowhit", 100, 30);
Level.addParticle(ParticleType.blockcrack, Entity.getX(v) , Entity.getY(v), Entity.getZ(v), 0, 0, 0, 0);
}
}


function deathHook(murderer, victim){
if (victim== mutantcreeper){
explode(Player.getX(),Player.getY(),Player.getZ(),18);
}
if (victim== mutantzombie){
Level.spawnMob(Player.getX(),Player.getY(),Player.getZ(),32);
Level.spawnMob(Player.getX(),Player.getY(),Player.getZ(),32);
Level.spawnMob(Player.getX(),Player.getY(),Player.getZ(),32);
}
if (victim== mutantskeleton){
Level.spawnMob(Player.getX(),Player.getY(),Player.getZ(),34);
Level.spawnMob(Player.getX(),Player.getY(),Player.getZ(),34);
Level.spawnMob(Player.getX(),Player.getY(),Player.getZ(),34);
}
}


//Usar Item para Spawneo
function useItem(x,y,z,itemId,block,side)
{
if(itemId==450)
{
mutantcreeper= Level.spawnMob(x,y+1,z,35,"mob/mutant_creeper.png" );
Entity.setHealth(mutantcreeper, 200);
Entity.setRenderType(mutantcreeper, mutantcreeperRenderer.renderType);
}
if(itemId==451)
{
mutantenderman= Level.spawnMob(x,y+1,z,38,"mob/mutant_enderman.png" );
Entity.setHealth(mutantenderman, 200);
Entity.setRenderType(mutantenderman, mutantendermanRenderer.renderType);
}
if(itemId==452)
{
mutantzombie= Level.spawnMob(x,y+1,z,32,"mob/mutant_zombie.png" );
Entity.setHealth(mutantzombie, 200);
Entity.setRenderType(mutantzombie, mutantzombieRenderer.renderType);
}
if(itemId==453)
{
mutantskeleton= Level.spawnMob(x,y+1,z,34,"mob/mutant_skeleton.png" );
Entity.setHealth(mutantskeleton, 200);
Entity.setRenderType(mutantskeleton, mutantskeletonRenderer.renderType);
}
}

