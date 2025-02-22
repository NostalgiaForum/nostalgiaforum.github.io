/*
Made by Ted Kayne
*/
function useItem(x,y,z,itemId,blockId,side){ 

//Diamond Pickaxe

//Use on Stone
if(itemId==278&&blockId==1){      
explode(x,y,z,4);

//Use on Sandstone  
}else if (itemId==278&&blockId==24){
explode (x,y,z,4);

//Use on Mossy Cobblestone
}else if (itemId==278&&blockId==48){
explode (x,y,z,4);

//Use on Obsidian
} else if (itemId==278&&blockId==49){
explode (x,y,z,4);

//Use on Netherrack
} else if (itemId==278&&blockId==87){
explode (x,y,z,4);






//Diamond Shovel

//Use on Grass (Block)
} else if(itemId==277&&blockId==2){      
explode(x,y,z,4);

//Use on Dirt
}else if (itemId==277&&blockId==3){
explode (x,y,z,4);

//Use on Mossy Sand
}else if (itemId==277&&blockId==12){
explode (x,y,z,4);

//Use on Gravel
} else if (itemId==277&&blockId==13){
explode (x,y,z,4);

//Use on Snow
} else if (itemId==277&&blockId==78){
explode (x,y,z,4);

//Use on Clay
}else if (itemId==277&&blockId==82){
explode (x,y,z,4);




//Diamond Axe

//Use on Oak Wood, Spruce Wood and Birch Wood
} else if (itemId==279&&blockId==17){
explode (x,y,z,4);


}

}