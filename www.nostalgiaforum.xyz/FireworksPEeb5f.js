/*Fireworks Mod*/

//If you want to edit firework time, you can edit this value
var mainTime = 150 

//Fireworks in creative
Player.addItemCreativeInv(500, 2, 0)
Player.addItemCreativeInv(501, 2, 0)
Player.addItemCreativeInv(502, 2, 0)
Player.addItemCreativeInv(503, 2, 0)
Player.addItemCreativeInv(460, 2, 0)

//firework variables for starting when clicked
var isStarted10 = 0
var isStarted20 = 0
var isStarted30 = 0
var isStarted40 = 0

//Scripting variables
var fx, fy, fz;
var expl = 0;
var fPos = [0, 1, 2, 3, -1, -2, -3];
var time = mainTime

//Ingridients
ModPE.setItem(504, "fireworks_charge", 0, "fireworkStar")
ModPE.setItem(505, "dye_powder", 4, "explodingPackage")
ModPE.setItem(506, "fireball", 0, "fireworkBomb")

//Fireworks
ModPE.setItem(500, "fireworks", 0, "firework10")
ModPE.setItem(501, "fireworks", 0, "firework20")
ModPE.setItem(502, "fireworks", 0, "firework30")
ModPE.setItem(503, "fireworks", 0, "firework40")
ModPE.setItem(460, "fireworks", 0, "fireworkDefective")

//Crafting for ingridients
Item.addShapedRecipe(506, 1, 0, ["ooo", "ltl", "ooo"], ["l", 351, 4, "t", 46, 0])
Item.addShapedRecipe(505, 1, 0, ["ooo", "obo", "olo"], ["l", 351, 4, "b", 506, 0])
Item.addShapedRecipe(504, 1, 0, ["ppp", "gbg", "ggg"], ["p", 505, 0, "g", 289, 0, "b", 506, 0])

//Crafting for fireworks, remove if you using 0.8.*
Item.addShapedRecipe(500, 1, 0, ["oso", "opo", "ogo"], ["t", 504, 0, "p", 339, 0, "g", 289, 0])
Item.addShapedRecipe(501, 1, 0, ["oso", "opo", "ggg"], ["s", 504, 0, "p", 339, 0, "g", 289, 0])
Item.addShapedRecipe(502, 1, 0, ["oso", "gpg", "ggg"], ["s", 504, 0, "p", 339, 0, "g", 289, 0])
Item.addShapedRecipe(503, 1, 0, ["gsg", "gpg", "ggg"], ["s", 504, 0, "p", 339, 0, "g", 289, 0])
Item.addShapedRecipe(460, 1, 0, ["oto", "opo", "ogo"], ["t", 46, 0, "p", 339, 0, "g", 289, 0])

//Item names for ingridients
ModPE.langEdit("item.fireworkStar.name", "Star")
ModPE.langEdit("item.explodingPackage.name", "Explodable paint package")
ModPE.langEdit("item.fireworkBomb.name", "Firework Bomb")

//Item names for fireworks
ModPE.langEdit("item.firework10.name", "Firework x10")
ModPE.langEdit("item.firework20.name", "Firework x20")
ModPE.langEdit("item.firework30.name", "Firework x30")
ModPE.langEdit("item.firework40.name", "Firework x40")
ModPE.langEdit("item.fireworkDefective.name","Defective firework")

//Only for 0.8.*
/*
//Descriptions for ingridients
ModPE.langEdit("desc.fireworkStar", "Star for fireworks")
ModPE.langEdit("desc.explodingPackage", "Paint package, what explodes when firework launched")
ModPE.langEdit("desc.fireworkBomb", "Explodes when shooting firework")

//Descriptions for fireworks
ModPE.langEdit("desc.firework10", "Height: 10m")
ModPE.langEdit("desc.firework20", "Height: 20m")
ModPE.langEdit("desc.firework30", "Height: 30m")
ModPE.langEdit("desc.firework40", "Height: 40m")
*/


function useItem(x, y, z, itemId, blockId, side)
{
//firework x10
if(itemId==500)
{
//coords
fx = x
fy = y
fz = z
time = mainTime
//Start firework
isStarted10=1
}

if(itemId==501)
{
fx = x
fy = y
fz = z
time = mainTime
isStarted20=1
}

if(itemId==502)
{
fx = x
fy = y
fz = z
time = mainTime
isStarted30=1
}

if(itemId==503)
{
fx = x
fy = y
fz = z
time = mainTime
isStarted40=1
}

if(itemId==460)
{
clientMessage("["+ChatColor.RED+"Firework"+ChatColor.WHITE+"... Stop, WHAT??? 0_o] OMG! I can't fly. Heeeelp!!!")
//clientMessage("[You] WAT 0_o, it is necessary to stop drug.")
explode(getPlayerX(), getPlayerY(), getPlayerZ(), 10)
}


}





function random(min, max)
{

return Math.floor((Math.random()*max + 1)+min + 1);

}

function attackHook(attacker, victim)
{

}

function modTick()
{
//Firework x10
//-Check for start
if(isStarted10==1)
{
//-Coords
var x = fx + fPos[random(0, 6)];
var y = fy + fPos[random(0, 6)];
var z = fz + fPos[random(0, 6)];

//-Explode
Level.setTile(x, y + 10, z, 35, expl);
Level.destroyBlock(x, y + 10, z, false);
Level.addParticle(ParticleType.flame, x, y + 10, z, 0, 0, 0, 3);
Level.playSound(x, y + 10, z, "random.explode", 2, 1);
Level.addParticle(ParticleType.redstone, x, y + 10, z, 0, 0, 0, 1);

//-AutoStop
if(expl > 15) expl = 0;
else expl = expl + 1;

if(time > 0)
{
time--
}
else
{
expl = 0;
time = mainTime
isStarted10 = 0
}
}








//Firework x20
//-Check for start
if(isStarted20==1)
{
//-Coords
var x = fx + fPos[random(0, 6)];
var y = fy + fPos[random(0, 6)];
var z = fz + fPos[random(0, 6)];

//-Explode
Level.setTile(x, y + 20, z, 35, expl);
Level.destroyBlock(x, y + 20, z, false);
Level.addParticle(ParticleType.flame, x, y + 20, z, 0, 0, 0, 3);
Level.playSound(x, y + 20, z, "random.explode", 2, 1);
Level.addParticle(ParticleType.redstone, x, y + 20, z, 0, 0, 0, 1);

//-AutoStop
if(expl > 15) expl = 0;
else expl = expl + 1;

if(time > 0)
{
time--
}
else
{
expl = 0;
time = mainTime
isStarted20 = 0
}
}







//Firework x30
//-Check for start
if(isStarted30==1)
{
//-Coords
var x = fx + fPos[random(0, 6)];
var y = fy + fPos[random(0, 6)];
var z = fz + fPos[random(0, 6)];

//-Explode
Level.setTile(x, y + 30, z, 35, expl);
Level.destroyBlock(x, y + 30, z, false);
Level.addParticle(ParticleType.flame, x, y + 30, z, 0, 0, 0, 3);
Level.playSound(x, y + 20, z, "random.explode", 2, 1);
Level.addParticle(ParticleType.redstone, x, y + 30, z, 0, 0, 0, 2);

//-AutoStop
if(expl > 15) expl = 0;
else expl = expl + 1;

if(time > 0)
{
time--
}
else
{
expl = 0;
time = mainTime
isStarted30 = 0
}
}







//Firework x40
//-Check for start
if(isStarted40==1)
{
//-Coords
var x = fx + fPos[random(0, 6)];
var y = fy + fPos[random(0, 6)];
var z = fz + fPos[random(0, 6)];

//-Explode
Level.setTile(x, y + 40, z, 35, expl);
Level.destroyBlock(x, y + 40, z, false);
Level.addParticle(ParticleType.flame, x, y + 40, z, 0, 0, 0, 3);
Level.playSound(x, y + 20, z, "random.explode", 2, 1);
Level.addParticle(ParticleType.redstone, x, y + 40, z, 0, 0, 0, 1);

//-AutoStop
if(expl > 15) expl = 0;
else expl = expl + 1;

if(time > 0)
{
time--
}
else
{
expl = 0;
time = mainTime
isStarted40 = 0
}
}

}

function procCmd(command)
{
var cmd = command.split(" ");

}

function newLevel()
{

}

function leaveGame()
{

}

