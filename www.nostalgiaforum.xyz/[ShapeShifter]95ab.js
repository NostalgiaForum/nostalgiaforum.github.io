// Shifter Mod //
// Do not edit this code only on our group Member //
// Made by 4thelulz //

var pig=false;
var cow=false;
var sheep=false;
var chicken=false;
var creeper=false;
var skeleton=false;
var spider=false;

function procCmd(command)
{
var cmd = command.split(" ");
if(cmd[0] == "pig")
{
Entity.setMobSkin(Player.getEntity(), "mob/pig.png");
clientMessage("[ShapeShifting] You turn to Pig");
Entity.setRenderType(Player.getEntity(), 8);
}
if(cmd[0] == "cow")
{
Entity.setMobSkin(Player.getEntity(), "mob/cow.png");
clientMessage("[ShapeShifting] You turn to Cow");
Entity.setRenderType(Player.getEntity(), 7);
}
if(cmd[0] == "chicken")
{
Entity.setMobSkin(Player.getEntity(), "mob/chicken.png");
clientMessage("[ShapeShifting] You turn to Chicken");
Entity.setRenderType(Player.getEntity(), 6);
}
if(cmd[0] == "sheep")
{
Entity.setMobSkin(Player.getEntity(), "mob/sheep_1.png");
clientMessage("[ShapeShifting] You turn to Sheep");
Entity.setRenderType(Player.getEntity(), 9);
}
if(cmd[0] == "spider")
{
Entity.setMobSkin(Player.getEntity(), "mob/spider.png");
clientMessage("[ShapeShifting] You turn to Spider");
Entity.setRenderType(Player.getEntity(), 13);
}
if(cmd[0] == "skeleton")
{
Entity.setMobSkin(Player.getEntity(), "mob/skeleton.png");
clientMessage("[ShapeShifting] You turn to Skeleton");
Entity.setRenderType(Player.getEntity(), 12);
addItemInventory(261,1);
addItemInventory(262,64);
}
if(cmd[0] == "creeper")
{
Entity.setMobSkin(Player.getEntity(), "mob/creeper.png");
clientMessage("[ShapeShifting] You turn to Creeper");
Entity.setRenderType(Player.getEntity(), 14);
}
if(cmd[0] == "help")
{
clientMessage(" <ShapeShifting> HELP ↓");
clientMessage(" /pig To be Pig");
clientMessage(" /cow To be Cow");
clientMessage(" /sheep To be Sheep");
clientMessage(" /chicken To be Chicken");
clientMessage(" /skeleton To be Skeleton");
clientMessage(" /creeper To be Creeper");
clientMessage(" /spider To be Spider");
clientMessage(" /steve To be Man");
clientMessage(" /zombie To be Zombie");
}
if(cmd[0] == "steve")
{
Entity.setMobSkin(Player.getEntity(), "mob/char.png");
clientMessage("[ShapeShifting] You turn to Man");
Entity.setRenderType(Player.getEntity(), 3);
}
if(cmd[0] == "zombie")
{
Entity.setMobSkin(Player.getEntity(), "mob/zombie.png");
clientMessage("[ShapeShifting] You turn to Zombie");
Entity.setRenderType(Player.getEntity(), 11);


}



}