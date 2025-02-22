ModPE.setItem(346,"fishing_rod_uncast",0,"Fishing rod");
ModPE.setFoodItem(350,"fish_cooked",0,5,"cooked fish");
ModPE.setFoodItem(349,"fish_raw",0,2,"Raw fish");
Item.addFurnaceRecipe(349,350);

function newLevel(){

clientMessage("Welcome, " + ChatColor.GREEN + "hello every one this is Mouhaned's mod follow me on twitter to get other awesome mods @DerbalMouhaned so check the crafting table for fishing rod ;)");

}


function useItem (x, y, z, itemId, blockId, side)
{
if (itemId == 346 && getTile (x, y + 1, z) == 8 && side == 1 && blockId < 255|| itemId == 346 && getTile (x, y +1, z) == 9 && side == 1 && blockId < 255)
{
var random = Math.floor ((Math.random() * 35) + 1);
if (random <= 23)
{
addItemInventory (31, 1);
clientMessage(ChatColor.WHITE + "No fish!");
}
else if (random == 24)
{
addItemInventory (349, 2);
clientMessage(ChatColor.WHITE + "No fish ! try again!");
}
else if (random == 26)
{
addItemInventory (349, 1);
clientMessage(ChatColor.WHITE + "you got a fish !");
}
else if (random == 27)
{
addItemInventory (349, 2);
clientMessage(ChatColor.GREEN + "Two fishs once !!");
}
else if (random == 28)
{
addItemInventory (346, -1);
clientMessage(ChatColor.WHITE + "you lost the fishing rod! make a new one !!");
}
else if (random >= 29)
{
preventDefault();
}
}
}


Item.addCraftRecipe(346, 1, 0, [280,2,0,287,3,0]);


