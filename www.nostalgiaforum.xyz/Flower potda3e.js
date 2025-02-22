Block.defineBlock(36,"Flower pot",[["flower_pot",1]],!8,!98,7);
Block.setShape(36,0.32,0.0,0.32,0.68,0.37,0.68);
Block.defineBlock(70,"Flower pot",[["endframe_eye",1]],!8,!98,7);
Block.setShape(70,0.25,0.0,0.25,0.75,0.1,0.75);
Block.defineBlock(69,"Planting cactus",[["cactus",1],["cactus",0]],!8,!98,7);
Block.setShape(69,0.4,-1,0.4,0.6,0,0.6);
Block.setRenderLayer(69,1);
Block.defineBlock(75,"Flower pot",[["flower_pot",1]],!8,!98,7);
Block.setShape(75,0.32,0.0,0.32,0.68,0.37,0.68);
Block.setRenderLayer(75,1);
Block.defineBlock(77,"Flower pot",[["mushroom_block_skin_brown",1]],!8,!98,7);
Block.setShape(77,0.321,-1.0,0.321,0.679,-0.699,0.679);
Block.defineBlock(84,"Flower pot",[["mushroom_block_skin_red",1]],!8,!98,7);
Block.setShape(84,0.321,-1,0.321,0.679,-0.699,0.679);
Block.defineBlock(99,"Flower pot",[["mushroom_block_inside",1]],!8,!98,7);
Block.setShape(99,0.321,-1,0.321,0.679,-0.699,0.679);
Block.defineBlock(106,"Flower pot",[["still_water",1]],!8,!98,7);
Block.setShape(106,0.321,-1,0.321,0.679,-0.689,0.679);
Block.setRenderLayer(106,1);
ModPE.setItem(100,"flower_pot",0,"Flower pot");
ModPE.setItem(500,"ender_eye",0,"Ender eye");
ModPE.setFoodItem(501,"flower_pot",0,5,"Porrige");

function useItem(x,y,z,itemId,blockId,side)
{
if(itemId == 100)
{
setTile(x,y+1,z,36)
addItemInventory(100,-1,0)
}
if(itemId == 500)
{
setTile(x,y+1,z,70)
addItemInventory(500,-1,0)
}
if(itemId == 81&&blockId == 36)
{
setTile(x,y+1,z,69)
addItemInventory(81,-1,0)
}
if(itemId == 282)
{
setTile(x,y+1,z,75)
setTile(x,y+2,z,77)
addItemInventory(282,-1,0)
}
if(itemId == 459)
{
setTile(x,y+1,z,75)
setTile(x,y+2,z,84)
addItemInventory(459,-1,0)
}
if(itemId == 325&&blockId == 75)
{
setTile(x,y+1,z,106)
addItemInventory(325,-1,8)
}
if(itemId == 281)
{
setTile(x,y+1,z,75)
addItemInventory(281,-1,0)
}
if(itemId == 501)
{
setTile(x,y+1,z,75)
setTile(x,y+2,z,99)
addItemInventory(501,-1,0)
}
}
function destroyBlock(x, y, z, side)
{
var block = Level.getTile(x, y, z);

if(block == 69)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.dropItem(x, y, z, 0, 81, 1);
}
if(block == 70)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.dropItem(x, y, z, 0, 500, 1);
}
if(block == 36)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.dropItem(x, y, z, 0, 100, 1);
}
var block2 = Level.getTile(x,y+1,z);

if(block == 75&&block2 == 77)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.destroyBlock(x, y+1, z, false);
Level.dropItem(x, y, z, 0, 282, 1);
}
if(block == 75&&block2 == 84)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.destroyBlock(x, y+1, z, false);
Level.dropItem(x, y, z, 0, 459, 1);
}
if(block == 75&&block2 == 99)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.destroyBlock(x, y+1, z, false);
Level.dropItem(x, y, z, 0, 501, 1);
}
if(block == 75&&block2 == 106)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.destroyBlock(x, y+1, z, false);
Level.dropItem(x, y, z, 0, 502, 1);
Level.dropItem(x, y, z, 0, 325, 1);
}
if(block == 75)
{
preventDefault();
Level.destroyBlock(x, y, z, false);
Level.destroyBlock(x, y+1, z, false);
Level.dropItem(x, y, z, 0, 281, 1);
}
}

Item.addCraftRecipe(100,3,0,[336,3,0]);
Item.addCraftRecipe(500,3,0,[351,3,5,20,3,0]);
Item.addCraftRecipe(501,3,0,[392,3,0]);