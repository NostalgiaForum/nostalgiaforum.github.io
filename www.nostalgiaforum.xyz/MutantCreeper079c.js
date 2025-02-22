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
Mutant Creeper V1.0 Mod Script By ElSirKael
*/

ModPE.overrideTexture("images/mob/minicreeper.png", "http://minecraft-pe.clan.su/minicreeper.png")

ModPE.overrideTexture("images/gui/mutantcreeper.png", "http://minecraft-pe.clan.su/mutantcreeper.png")

ModPE.overrideTexture("images/mob/spider_eyes.png", "http://minecraft-pe.clan.su/spider_eyes.png")

var minicreeper = 0;
timer4 = false; 
count4 = 0;
walking4 = false;
looptimer = false;
loopcount = 0; 

function useItem(x, y, z, itemId, blockId, side)
{
if (itemId==86){
  if (getTile ( x, y, z)==46){
  if (getTile (x, y-1, z)==46){
   xx = x;
    yy = y;
   zz = z;
    timer4 = true; 
   }
   }
}
}

function attackHook(attacker, victim)
{

}

function modTick()
{
if (timer4==true){
   count4 ++;
    if (count4==1){
     timer4 = false; 
     count4 = 0; 
      Level.destroyBlock (xx, yy, zz, false);
       Level.destroyBlock (xx, yy-1, zz, false);
       Level.destroyBlock (xx, yy+1, zz, false);
      mutantcreeper = Level.spawnMob(xx, yy, zz,35,"gui/mutantcreeper.png");
      Entity.setRenderType(mutantcreeper, 13);
	  Entity.setHealth(mutantcreeper, 700);
	  addItemInventory(276, -1)
    gx = Entity.getX (mutantcreeper);
     gy = Entity.getY (mutantcreeper);
    gz = Entity.getZ (mutantcreeper);
    walking4 = true;
     looptimer = true;
     }
}
if (walking4==true){
   setTile ( Entity.getX (mutantcreeper), Entity.getY(mutantcreeper), Entity.getZ(mutantcreeper),0);
} 
if (looptimer==true){
    loopcount ++;
    if (loopcount==100){
    loopcount = 0;
    var minicreeper = Level.spawnMob (Entity.getX (mutantcreeper), Entity.getY(mutantcreeper), Entity.getZ(mutantcreeper),33,"mob/minicreeper.png");
	Entity.setRenderType(minicreeper, 6);
     }
}
}

function deathHook(attacker, victim)
{
if(victim==mutantcreeper)
{
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 246, 1, 0);
Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, 289, 52, 0);
mutantcreeper = 0;
clientMessage("El Mutant Creeper acaba de caer");
}
}

function procCmd(command)
{
var cmd = command.split(" ");

}

function newLevel()
{
clientMessage("Mutant Creeoer V1.0 Mod Script");
clientMessage("By ElSirKael");
}

function leaveGame()
{

}

