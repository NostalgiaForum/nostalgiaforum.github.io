/*
Script Entity ProximityDetector by Romelo
vk.com/romelonazarov
*/
var owner;

function getOwnerName(){
   return Player.getName(owner);
    
} 

function procCmd(cmd) {
var command = cmd.split(" ");
	
if(command[0] == "name") {
owner = getPlayerEnt();
clientMessage("Name: " + getOwnerName());
}
}


function entityAddedHook(entity)
{
if(Entity.getEntityTypeId(entity)==11)
{
Entity.setNameTag(entity, "§2Cow");
}
if(Entity.getEntityTypeId(entity)==12)
{ Entity.setNameTag(entity, "§2Pig");
}
if(Entity.getEntityTypeId(entity)==13)
{Entity.setNameTag(entity, "§2Sheep");
}
if(Entity.getEntityTypeId(entity)==10)
{Entity.setNameTag(entity, "§2Chicken");
}
if(Entity.getEntityTypeId(entity)==32)
{Entity.setNameTag(entity, "§4Zombie");
}
if(Entity.getEntityTypeId(entity)==33)
{Entity.setNameTag(entity, "§4Creeper");
}
if(Entity.getEntityTypeId(entity)==34)
{Entity.setNameTag(entity, "§4Skeleton");
}
if(Entity.getEntityTypeId(entity)==35)
{Entity.setNameTag(entity, "§4Spider");
}
if(Entity.getEntityTypeId(entity)==36)
{Entity.setNameTag(entity, "§4Zombie Pig Man");
}}
function newLevel()
{
print("")
clientMessage("Entity ProximityDetector by Romelo!");
}
