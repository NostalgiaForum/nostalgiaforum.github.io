Block.defineBlock(223, "Solar Panel", "mob_spawner", 2, true, 0);
Block.setColor(223, [0x00FFFF]); //bright blue
Block.setShape(223, 0, 0, 0, 1, 1/8, 1);
Item.addCraftRecipe(223, 1, 0, [20, 4, 0, 22, 1, 0, 331, 3, 0, 266, 1, 0]); //4 glass, 1 lapisBlock, 3 redstoneDust, 1 goldIngot
var solarActive=0;
var solX=0;
var solY=0;
var solZ=0;
var count=0;

function modTick() {
var solarBright=Level.getBrightness(solX, solY, solZ);
count++;
if(solarBright==15&&solarActive==1&&count>80) { //4sec
Level.setFurnaceSlot(solX, solY-1, solZ, 1, 263, 0, 1);  
count=0;}

else if(solarBright==14&&solarActive==1&&count>180) { //9sec
Level.setFurnaceSlot(solX, solY-1, solZ, 1, 263, 0, 1); 
count=0;}

else if(solarBright<13&&solarActive==1) { 
Level.setFurnaceSlot(solX, solY-1, solZ, 1, 0, 0, 0); 
solarActive=0;}
}

function useItem(x, y, z, itemId, blockId, side) {
if(blockId==223&&solarActive==0&&Level.getBrightness(x, y, z)>13) {
solX=x;
solY=y;
solZ=z;
solarActive=1;
clientMessage("Solar On: " +Level.getBrightness(solX, solY,solZ)+"W");
}
else if(blockId==223&&solarActive==1) {
solarActive=0;
clientMessage("Solar Off");
Level.setFurnaceSlot(solX, solY-1, solZ, 1, 0, 0, 0); //1 air
}
}