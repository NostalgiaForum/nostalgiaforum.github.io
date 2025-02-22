/*
Made by Ted Kayne

Version 1.0.1
*/
function useItem(x,y,z,itemId,blockId,side){ 

//Magic Tool = Gold Sword (id = 283)

//Use on Diamond Ore       
if(itemId==283&&blockId==56){
Level.destroyBlock(x, y, z, false); 
addItemInventory(264,1);
Level.playSound(x, y, z, "random.break", 1, 1);


//Use on Gold Ore
}else if(itemId==283&&blockId==14){
Level.destroyBlock(x, y, z, false); 
addItemInventory(266,1);
Level.playSound(x, y, z, "random.break", 1, 1);


//Use on Iron Ore
}else if(itemId==283&&blockId==15){
Level.destroyBlock(x, y, z, false); 
addItemInventory(265,1);
Level.playSound(x, y, z, "random.break", 1, 1);


//Use on Coal Ore
}else if(itemId==283&&blockId==16){
Level.destroyBlock(x, y, z, false); 
addItemInventory(263,1);
Level.playSound(x, y, z, "random.break", 1, 1);

//Use on Redstone Ore
}else if(itemId==283&&blockId==73){
Level.destroyBlock(x, y, z, false); 
addItemInventory(331,4);
Level.playSound(x, y, z, "random.break", 1, 1);


//Use on Glowing Redstone Ore
}else if(itemId==283&&blockId==74){
Level.destroyBlock(x, y, z, false); 
addItemInventory(331,4);
Level.playSound(x, y, z, "random.break", 1, 1);


//Use on Lapis Lazuli Ore
}else if(itemId==283&&blockId==21){
Level.destroyBlock(x, y, z, false); 
addItemInventory(0100,4); //351:4
Level.playSound(x, y, z, "random.break", 1, 1);
}


}