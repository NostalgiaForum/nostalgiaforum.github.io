/////////////////
/*ElectricGamer*/
/////////////////

var xs = new Array(0,0,0,0,-1,1)
var ys = new Array(-1,1,0,0,0,0)
var zs = new Array(0,0,-1,1,0,0)

ModPE.setItem(460,"boat",0,"Apple Tree Sapling");
ModPE.setFoodItem(461,"brewing_stand",0,2,"Cheese");
ModPE.langEdit("desc.Cheese", "You can eat Cheese");
ModPE.setFoodItem(462,"book_enchanted",0,4,"Bread Slice");
ModPE.langEdit("desc.Bread Slice", "You can eat a Bread Slice");
ModPE.setFoodItem(463,"blaze_rod",0,6,"Cheese Sandwitch");
ModPE.langEdit("desc.Cheese Sandwitch", "You can eat a Cheese Sandwitch");
ModPE.setFoodItem(464,"cauldron",0,4,"Tomato");
ModPE.langEdit("desc.Tomato", "You can eat a Tomato");
ModPE.setItem(465,"blaze_powder",0,"Tomato Seeds");
ModPE.setItem(466,"book_written",0,"Orange Tree Sapling");
ModPE.setFoodItem(467,"book_writable",0,4,"Orange");
ModPE.setFoodItem(469,"carrot_golden",0,5,"Corn");
ModPE.setFoodItem(470,"comparator",0,5,"Blue Berry");
Block.defineBlock(200,"Apple Tree Sapling (Block)",["anvil_top_damaged_x",0],0,0,1);
Block.setDestroyTime(200,.05);
Block.setRenderLayer(200,1);
Block.defineBlock(201,"Apple Tree Leaves (Apples)",["anvil_top_damaged_x",1],0,0,0);
Block.setDestroyTime(201,.05);
Block.setRenderLayer(201,1);
Block.defineBlock(202,"Apple Tree Leaves",["leaves",4],0,0,0);
Block.setDestroyTime(202,.05);
Block.setRenderLayer(202,1);
Block.defineBlock(203,"Brick Wall",["brick",0],0,0,32);
Block.setDestroyTime(203,2);
Block.setRenderLayer(203,0);
Block.defineBlock(204,"Tomato Stage 1",["cauldron_bottom",0],0,0,6);
Block.setDestroyTime(204,.01);
Block.setRenderLayer(204,1);
Block.defineBlock(205,"Tomato Stage 2",["cauldron_inner",0],0,0,6);
Block.setDestroyTime(205,.01);
Block.setRenderLayer(205,1);
Block.defineBlock(206,"Tomato Stage 3",["cauldron_side",0],0,0,6);
Block.setDestroyTime(206,.01);
Block.setRenderLayer(206,1);
Block.defineBlock(207,"Tomato Stage 4",["cauldron_top",0],0,0,6);
Block.setDestroyTime(207,.01);
Block.setRenderLayer(207,1);
Block.defineBlock(208,"Orange Tree Sapling (Block)",["brewing_stand",0],0,0,1);
Block.setDestroyTime(208,.05);
Block.setRenderLayer(208,1);
Block.defineBlock(209,"Orange Tree Leaves (Oranges)",["brewing_stand_base",0],0,0,0);
Block.setDestroyTime(209,.05);
Block.setRenderLayer(209,1);
Block.defineBlock(210,"Orange Tree Leaves",["leaves",4],0,0,0);
Block.setDestroyTime(210,.05);
Block.setRenderLayer(210,1);
Block.defineBlock(211,"Corn Stage 1",["cocoa_stage_x",0],0,0,6);
Block.setDestroyTime(211,.01);
Block.setRenderLayer(211,1);
Block.defineBlock(212,"Corn Stage 2",["cocoa_stage_x",1],0,0,6);
Block.setDestroyTime(212,.01);
Block.setRenderLayer(212,1);
Block.defineBlock(213,"Corn Stage 3",["cocoa_stage_x",2],0,0,6);
Block.setDestroyTime(213,.01);
Block.setRenderLayer(213,1);
Block.defineBlock(214,"Corn Stage 4",["command_block",0],0,0,6);
Block.setDestroyTime(214,.01);
Block.setRenderLayer(214,1);
Block.defineBlock(215,"Corn Stage 5",["dragon_egg",0],0,0,6);
Block.setDestroyTime(215,.01);
Block.setRenderLayer(215,1);
Block.defineBlock(217,"Blue Berry Stage 1",["enchanting_table_bottom",0],0,0,6);
Block.setDestroyTime(217,.01);
Block.setRenderLayer(217,1);
Block.defineBlock(218,"Blue Berry Stage 2",["enchanting_table_side",0],0,0,6);
Block.setDestroyTime(218,.01);
Block.setRenderLayer(218,1);
Block.defineBlock(219,"Blue Berry Stage 1",["enchanting_table_top",0],0,0,6);
Block.setDestroyTime(219,.01);
Block.setRenderLayer(219,1);

Item.addCraftRecipe(460,1,0,[6,1,0,260,1,0]);
Item.setCategory(460,1);
Item.addCraftRecipe(461,1,0,[325,1,1]);
Item.setCategory(461,1);
Item.addCraftRecipe(203,6,0,[45,6,0]);
Item.setCategory(203,1);
Item.addCraftRecipe(337,4,0,[3,1,0,12,1,0,318,2,0]);
Item.setCategory(337,1);
Item.addCraftRecipe(462,8,0,[297,1,0]);
Item.setCategory(462,1);
Item.addCraftRecipe(463,1,0,[297,1,0,462,1,0,461,1,0]);
Item.setCategory(462,1);
Item.addCraftRecipe(466,1,0,[6,1,0,460,1,0]);
Item.setCategory(466,1);

function useItem(x,y,z,itemId,blockId,side)
{
if(Player.getCarriedItem() == 351 && blockId == 200)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,17);
setTile(x,y+1,z,17);
setTile(x,y+2,z,17);
setTile(x,y+3,z,17);
setTile(x,y+4,z,17);
setTile(x,y+5,z,17);
setTile(x,y+6,z,17);
setTile(x+1,y+4,z,202);
setTile(x+2,y+4,z,202);
setTile(x-1,y+4,z,201);
setTile(x-2,y+4,z,202);
setTile(x,y+4,z+1,202);
setTile(x,y+4,z+2,202);
setTile(x,y+4,z-1,202);
setTile(x,y+4,z-2,201);
setTile(x+1,y+4,z+1,202);
setTile(x+1,y+4,z+2,202);
setTile(x-1,y+4,z-1,202);
setTile(x-1,y+4,z-2,201);
setTile(x+2,y+4,z+1,202);
setTile(x+2,y+4,z+2,201);
setTile(x-2,y+4,z-1,202);
setTile(x-2,y+4,z-2,202);
setTile(x+1,y+4,z-1,202);
setTile(x+1,y+4,z-2,202);
setTile(x-1,y+4,z+1,202);
setTile(x-1,y+4,z+2,202);
setTile(x+2,y+4,z-1,201);
setTile(x+2,y+4,z-2,202);
setTile(x-2,y+4,z+1,202);
setTile(x-2,y+4,z+2,201);
setTile(x+1,y+5,z,201);
setTile(x+2,y+5,z,202);
setTile(x-1,y+5,z,202);
setTile(x-2,y+5,z,202);
setTile(x,y+5,z+1,202);
setTile(x,y+5,z+2,202);
setTile(x,y+5,z-1,202);
setTile(x,y+5,z-2,202);
setTile(x+1,y+5,z+1,202);
setTile(x+1,y+5,z+2,201);
setTile(x-1,y+5,z-1,202);
setTile(x-1,y+5,z-2,202);
setTile(x+2,y+5,z+1,202);
setTile(x-2,y+5,z-1,202);
setTile(x-2,y+5,z-1,202);
setTile(x-2,y+5,z-2,202);
setTile(x+1,y+5,z-1,202);
setTile(x+1,y+5,z-2,202);
setTile(x-1,y+5,z+1,202);
setTile(x-1,y+5,z+2,202);
setTile(x+2,y+5,z-1,202);
setTile(x-2,y+5,z+1,202);
setTile(x-1,y+6,z-1,202);
setTile(x+1,y+6,z-1,202);
setTile(x-1,y+6,z+1,202);
setTile(x+1,y+6,z-1,202);
setTile(x-1,y+6,z,202);
setTile(x+1,y+6,z,202);
setTile(x,y+6,z+1,202);
setTile(x,y+6,z-1,202);
setTile(x-1,y+7,z,202);
setTile(x+1,y+7,z,202);
setTile(x,y+7,z+1,202);
setTile(x,y+7,z-1,202);
setTile(x,y+7,z,202);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 208)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,17);
setTile(x,y+1,z,17);
setTile(x,y+2,z,17);
setTile(x,y+3,z,17);
setTile(x,y+4,z,17);
setTile(x,y+5,z,17);
setTile(x,y+6,z,17);
setTile(x+1,y+4,z,210);
setTile(x+2,y+4,z,210);
setTile(x-1,y+4,z,209);
setTile(x-2,y+4,z,210);
setTile(x,y+4,z+1,210);
setTile(x,y+4,z+2,210);
setTile(x,y+4,z-1,210);
setTile(x,y+4,z-2,209);
setTile(x+1,y+4,z+1,210);
setTile(x+1,y+4,z+2,210);
setTile(x-1,y+4,z-1,210);
setTile(x-1,y+4,z-2,209);
setTile(x+2,y+4,z+1,210);
setTile(x+2,y+4,z+2,209);
setTile(x-2,y+4,z-1,210);
setTile(x-2,y+4,z-2,210);
setTile(x+1,y+4,z-1,210);
setTile(x+1,y+4,z-2,210);
setTile(x-1,y+4,z+1,210);
setTile(x-1,y+4,z+2,210);
setTile(x+2,y+4,z-1,209);
setTile(x+2,y+4,z-2,210);
setTile(x-2,y+4,z+1,210);
setTile(x-2,y+4,z+2,209);
setTile(x+1,y+5,z,209);
setTile(x+2,y+5,z,210);
setTile(x-1,y+5,z,210);
setTile(x-2,y+5,z,210);
setTile(x,y+5,z+1,210);
setTile(x,y+5,z+2,210);
setTile(x,y+5,z-1,210);
setTile(x,y+5,z-2,210);
setTile(x+1,y+5,z+1,210);
setTile(x+1,y+5,z+2,209);
setTile(x-1,y+5,z-1,210);
setTile(x-1,y+5,z-2,210);
setTile(x+2,y+5,z+1,210);
setTile(x-2,y+5,z-1,210);
setTile(x-2,y+5,z-1,210);
setTile(x-2,y+5,z-2,210);
setTile(x+1,y+5,z-1,210);
setTile(x+1,y+5,z-2,210);
setTile(x-1,y+5,z+1,210);
setTile(x-1,y+5,z+2,210);
setTile(x+2,y+5,z-1,210);
setTile(x-2,y+5,z+1,210);
setTile(x-1,y+6,z-1,210);
setTile(x+1,y+6,z-1,210);
setTile(x-1,y+6,z+1,210);
setTile(x+1,y+6,z-1,210);
setTile(x-1,y+6,z,210);
setTile(x+1,y+6,z,210);
setTile(x,y+6,z+1,210);
setTile(x,y+6,z-1,210);
setTile(x-1,y+7,z,210);
setTile(x+1,y+7,z,210);
setTile(x,y+7,z+1,210);
setTile(x,y+7,z-1,210);
setTile(x,y+7,z,210);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if (itemId == 460 && blockId == 2)
{
preventDefault ();
setTile (x+xs[side],y+ys[side],z+zs[side],200,(side+8));
addItemInventory(Player.getCarriedItem(),-1);
}
if (itemId == 466 && blockId == 2)
{
preventDefault ();
setTile (x+xs[side],y+ys[side],z+zs[side],208,(side+8));
addItemInventory(Player.getCarriedItem(),-1);
}
if (itemId == 465 && blockId == 60)
{
preventDefault ();
setTile(x,y+1,z,204);
addItemInventory(Player.getCarriedItem(),-1);
}
if(Player.getCarriedItem() == 351 && blockId == 204)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,205);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 205)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,206);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 206)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,207);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 211)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,212);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 212)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,213);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 213)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,214);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 214)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y+1,z,215);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
else if (itemId == 469 && blockId == 60)
{
preventDefault ();
setTile(x,y+1,z,211);
addItemInventory(Player.getCarriedItem(),-1);
}
else if (itemId == 470 && blockId == 60)
{
preventDefault ();
setTile(x,y+1,z,217);
addItemInventory(Player.getCarriedItem(),-1);
}
if(Player.getCarriedItem() == 351 && blockId == 217)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,218);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(Player.getCarriedItem() == 351 && blockId == 218)
{
if(Player.getCarriedItemData() == 15)
{
setTile(x,y,z,219);
addItemInventory(Player.getCarriedItem() && Player.getCarriedItemData(),-1);
}
}
if(blockId == 2)
{
if(Player.getCarriedItem() == 290 || Player.getCarriedItem() == 291 || Player.getCarriedItem() == 292 || Player.getCarriedItem() == 293 || Player.getCarriedItem() == 294)
{
var random = Math.floor((Math.random()*15)+1);
if(random == 1)
{
preventDefault();
setTile(x,y,z,60);
Level.dropItem(x,y+1,z,0,465,1,0);
}
}
}
if(blockId == 2)
{
if(Player.getCarriedItem() == 290 || Player.getCarriedItem() == 291 || Player.getCarriedItem() == 292 || Player.getCarriedItem() == 293 || Player.getCarriedItem() == 294)
{
var random = Math.floor((Math.random()*15)+1);
if(random == 1)
{
preventDefault();
setTile(x,y,z,60);
Level.dropItem(x,y+1,z,0,470,1,0);
}
}
}
if(blockId == 2)
{
if(Player.getCarriedItem() == 290 || Player.getCarriedItem() == 291 || Player.getCarriedItem() == 292 || Player.getCarriedItem() == 293 || Player.getCarriedItem() == 294)
{
var random = Math.floor((Math.random()*15)+1);
if(random == 1)
{
preventDefault();
setTile(x,y,z,60);
Level.dropItem(x,y+1,z,0,469,1,0);
}
}
}
}
function destroyBlock(x,y,z,side)
{
var block = Level.getTile(x,y,z);
if(block == 202)
{
var random = Math.floor((Math.random()*15)+1);
if(random == 2)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,460,1,0);
}
}
if(block == 210)
{
var random = Math.floor((Math.random()*15)+1);
if(random == 2)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,466,1,0);
}
}
else if(block == 201)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,260,2,0);
}
else if(block == 209)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,467,2,0);
}
else if(block == 200)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,460,1,0);
}
else if(block == 208)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,466,1,0);
}
else if(block == 204)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,465,1,0);
}
else if(block == 205)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,465,1,0);
}
else if(block == 206)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,465,1,0);
}
else if(block == 207)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,465,2,0);
Level.dropItem(x,y,z,0,464,3,0);
}
else if(block == 210)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 211)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 212)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 213)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 214)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 215 && getTile(x,y-1,z) == 214)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.destroyBlock(x,y-1,z);
Level.dropItem(x,y,z,0,469,3,0);
}
else if(block == 215)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 214 && getTile(x,y+1,z) == 215)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.destroyBlock(x,y+1,z);
Level.dropItem(x,y,z,0,469,3,0);
}
else if(block == 217)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,470,1,0);
}
else if(block == 218)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,469,1,0);
}
else if(block == 219)
{
preventDefault();
Level.destroyBlock(x,y,z);
Level.dropItem(x,y,z,0,470,4,0);
}
}
function newLevel()
{
clientMessage("§1The evolution mod is only in its beta stages");
}
function leaveGame()
{
}