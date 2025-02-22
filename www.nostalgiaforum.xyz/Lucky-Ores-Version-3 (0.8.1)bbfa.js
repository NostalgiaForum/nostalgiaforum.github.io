//Version 3
//This Is A Big Update
//Lucky Ore's 
//By Metamorposis 
//Do Not Redistribute or Modify This Mod Without my Authorization
//Random Number of Drops

var emeraldore = 203;
var mysticalore = 206;
var lucky = 200;
var ruby = 201;
var diamond = 56;
var iron = 15;
var gold = 14;
var redstone = 73;
var coal = 16;
var lapis = 21;

ModPE.setItem(202,"ruby",0,"Ruby");
ModPE.setItem(204,"emerald",0,"Emerald");
ModPE.setItem(205,"blaze_powder",0,"Saphire");
ModPE.setItem(207,"pickaxe",0,"Ruby Pickaxe");
ModPE.setItem(208,"sword",0,"Ruby Sword");
ModPE.setItem(209,"shovel",0,"Ruby Shovel ");
Block.defineBlock(lucky, "Lucky Ore", ["enchanting_table_top", 0], 1, false, 0);
Block.setDestroyTime(lucky, 5.3);
Block.defineBlock(ruby, "Ruby Ore", ["redstone_ore", 0], 1, false, 0);
Block.setDestroyTime(ruby, 5.3);
Block.setLightLevel(ruby, 15);
Block.defineBlock(emeraldore, "Emerald Ore", ["emerald_ore", 0], 1, false, 0);
Block.setDestroyTime(emeraldore, 5.3);
Block.defineBlock(mysticalore, "Mystical Ore", ["diamond_ore", 0], 1, false, 0);
Block.setDestroyTime(mysticalore, 5.3);
Item.addCraftRecipe(207,1,0,[280,2,0, 202,3,0]);
Item.addCraftRecipe(208,2,0,[280,1,0, 202,2,0]);
Item.addCraftRecipe(209,1,0,[280,2,0, 202,1,0]);

function newLevel()
{
clientMessage(ChatColor.RED + "Lucky Ore's: " + ChatColor.BLUE + "by Metamorposis");
}
function useItem(x, y, z, itemId, blockId, side)
{
if (itemId==207)
if (blockId==1)
Level.dropItem(x,y,z,0,4,1);
Level.destroyBlock (x, y, z, false)
{
if (itemId==209)
if (blockId==2)
Level.destroyBlock (x, y, z, true)
}
if (itemId==209)
if (blockId==3)
Level.destroyBlock (x, y, z, true)
{
if (itemId==209)
if (blockId==12)
Level.destroyBlock (x, y, z, true)
}
if (itemId==209)
if (blockId==13)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==4)
Level.destroyBlock (x, y, z, false)
}
if (itemId==207)
if (blockId==14)
Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
Level.destroyBlock (x, y, z, false)
{
if (itemId==207)
if (blockId==15)
Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
Level.destroyBlock (x, y, z, false)
}
if (itemId==207)
if (blockId==16)
Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(5)+1),0);
Level.destroyBlock (x, y, z, false)
{
if (itemId==207)
if (blockId==21)
Level.destroyBlock (x, y, z, false)
}
if (itemId==207)
if (blockId==22)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==24)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==41)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==42)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==48)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==49)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==61)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==62)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==67)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==73)
Level.destroyBlock (x, y, z, false)
}
if (itemId==207)
if (blockId==74)
Level.destroyBlock (x, y, z, false)
{
if (itemId==207)
if (blockId==79)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==82)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==87)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==89)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==98)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==108)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==109)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==112)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==114)
Level.destroyBlock (x, y, z, true)
}
if (itemId==207)
if (blockId==128)
Level.destroyBlock (x, y, z, true)
{
if (itemId==207)
if (blockId==246)
Level.destroyBlock (x, y, z, true)       
}
}

function destroyBlock(x, y, z, side) {
	var blockId = getTile(x,y,z);

      if (blockId == diamond) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(3)+1),0);

     } else if (blockId == iron) {
      Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);

     } else if (blockId == gold) {
      Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);

     } else if (blockId == redstone) {
      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(5)+1),0); 

     } else if (blockId == coal) {
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(5)+1),0);

     } else if (blockId == lapis) {
      Level.dropItem(x,y,z,0,351.4,Math.floor(Math.random()*(1)+1),0);

     } else if (blockId == lucky) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(9)+1),0);
      Level.dropItem(x,y,z,0,15,Math.floor(Math.random()*(9)+1),0);
      Level.dropItem(x,y,z,0,14,Math.floor(Math.random()*(9)+1),0);
      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(9)+1),0);
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(9)+1),0);
      Level.dropItem(x,y,z,0,16,Math.floor(Math.random()*(9)+1),0);
      Level.destroyBlock(x, y, z, false);

     } else if (blockId == ruby) { //Ruby Ore How To Define It is like the gold ore but it is shiny
      Level.dropItem(x,y,z,0,202,Math.floor(Math.random()*(2)+1),0);
      Level.destroyBlock(x, y, z, false);

    } else if (blockId == emeraldore) { //Emerald Ore
      Level.dropItem(x,y,z,0,204,Math.floor(Math.random()*(3)+1),0);
      Level.destroyBlock(x, y, z, false);

     } else if (blockId == mysticalore) { //Beware of The Diamond Ore Like
     Level.spawnMob(x+1,y,z,65);
     Level.spawnMob(x,y,z+1,65);
     Level.spawnMob(x+2,y,z,65);
     Level.spawnMob(x,y,z+2,65);
     Level.destroyBlock(x, y, z, false);
}
}

function attackHook(attacker, victim)
{
if (getCarriedItem()==208)
Entity.setFireTicks(victim,50)

}





