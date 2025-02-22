//mutant_ender
//By 
//Created using ModPECreator by Arjay07

print("Тап алмазом")
function useItem(x, y, z, itemId, blockId, side)
{
if(itemId == 264)
{
verx = Level.spawnMob(x,y+1,z,32,"mob/верх.png")
niz = Level.spawnMob(x,y+1,z,32,"mob/низ.png")
rideAnimal(verx,niz);
Level.setTime(9600)
Entity.setHealth(verx,150)
Entity.setHealth(niz,150)
}

}
function attackHook(attacker, victim)
{

}
function modTick()
{

}
function procCmd(command)
{
var cmd = command.split(" ");

}