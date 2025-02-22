/* This Mod was created by GameCoder1337.
This is an early beta of my Mod
If you want to use my Mod in Youtube Videos or something else you must link to my Mod page!

*/
function newLevel(){
clientMessage(ChatColor.RED + "Created by GameCoder1337");
clientMessage(ChatColor.GREEN + "Version 1.1");
}

function procCmd(cmd) {
var cmd = cmd.split(" ");

if(cmd[0] == "survival") {
Level.setGameMode(0);
clientMessage("your game mod has changed");
}

if(cmd[0] == "creative") {
Level.setGameMode(1);
clientMessage("your game mod has changed");
}

if (cmd[0] == "time"){

if (cmd[1] == "set"){

if (cmd[2] == "day"){
Level.setTime(0);
clientMessage("good morning!");
}
}
}
if (cmd[0] == "time"){

if (cmd[1] == "set"){

if (cmd[2] == "night"){
Level.setTime(8280);
clientMessage("It's getting dark!");
}
}
}
}

function useItem(x,y,z,itemId,blockId,side)
{
}
functio attackHook(attacker, victim)
{

    var ourItem = getCarriedItem();
    if(ourItem==329)
    {
          preventDefault();
          rideAnimal(attacker,victim);
    }
    }
    