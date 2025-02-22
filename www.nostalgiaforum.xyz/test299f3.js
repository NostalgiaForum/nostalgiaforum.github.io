ModPE.setFoodItem(460,"sugar",0,-5,"Cocaine");
function useitem(x,y,z,itemid,blockid,side)
{
    
}
preventDefault();
addItemInventory(460,1);

ModPE.setFoodItem(461,"book_enchanted",0,8,"Marihuana");
function useitem(x,y,z,itemid,blockid,side)
{
    
}
preventDefault();
addItemInventory(461,1);

ModPE.setFoodItem(462,"boat",0,-3,"Cigarettes");
function useitem(x,y,z,itemid,blockid,side)
{
    
}
preventDefault();
addItemInventory(462,1);

Item.addCraftRecipe(460,2,0, [338,1,0,]);
Item.addCraftRecipe(462,1,0, [263,2,0,339,2,0,5,3,0]);
Item.addCraftRecipe(461,1,0, [460,2,0,339,2,0]);








