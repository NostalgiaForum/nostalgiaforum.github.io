/*0.9.1 starter kit*/



function useItem(x, y, z, itemId, blockId, side)
{

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
if(cmd[0] == "start")
{
Player.addItemInventory(264, 15, 0); Player.addItemInventory(278, 1, 0); Player.addItemInventory(5, 85, 0); Player.addItemInventory(4, 85, 0); Player.addItemInventory(280, 64, 0);
} 

}

function newLevel()
{
clientMessage(ChatColor.DARK_BLUE+"Чтобы получить kit start, просто пропишите /start "); clientMessage(ChatColor.AQUA+"мод от shakhban4ik для 0x10c-zone.ru ");

}

function leaveGame()
{

}

