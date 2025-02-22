var snow = 0;
var Px;
var Py;
var Pz;

function modTick()
{
if(snow == 0)
{
Px = getPlayerX();
Py = getPlayerY();
Pz = getPlayerZ();
if(getTile(getPlayerX(), getPlayerY()-1.6, getPlayerZ()) == 78)
{

ModPE.showTipMessage("Snow Bioms");
setTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ(), 80);
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()+1, 80);
setTile(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1, 80);
setTile(getPlayerX(), getPlayerY()+2, getPlayerZ()-1, 80);
setTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ(), 80);
setTile(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1, 80);

Level.destroyBlock(getPlayerX()+1, getPlayerY()+2, getPlayerZ());
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()+1);
Level.destroyBlock(getPlayerX()+1, getPlayerY()+2, getPlayerZ()+1);
Level.destroyBlock(getPlayerX(), getPlayerY()+2, getPlayerZ()-1);
Level.destroyBlock(getPlayerX()-1, getPlayerY()+2, getPlayerZ());
Level.destroyBlock(getPlayerX()-1, getPlayerY()+2, getPlayerZ()-1);
}
}
}
