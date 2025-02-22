function procCmd(cmd) {
var command = cmd.split(" ");
	
if(command[0] == "tower") {
	
player = Player.getEntity();

x = Player.getX ();
y = Player.getY ();
z = Player.getZ ();

one = Level.spawnMob(x, y+1, z, parseInt (command[1]));
two = Level.spawnMob(x, y+1, z, parseInt (command[1]));
three = Level.spawnMob(x, y+1, z, parseInt (command[1]));
four = Level.spawnMob(x, y+1, z, parseInt (command[1]));
five = Level.spawnMob(x, y+1, z, parseInt (command[1]));
six = Level.spawnMob(x, y+1, z, parseInt (command[1]));
seven = Level.spawnMob(x, y+1, z, parseInt (command[1]));
eight = Level.spawnMob(x, y+1, z, parseInt (command[1]));
nine = Level.spawnMob(x, y+1, z, parseInt (command[1]));

rideAnimal(one, two );
rideAnimal(two, three);
rideAnimal(three, four);
rideAnimal(four, five);
rideAnimal(five, six);
rideAnimal(six, seven);
rideAnimal(seven, eight);
rideAnimal(eight, nine);
rideAnimal(player, one);

}
}