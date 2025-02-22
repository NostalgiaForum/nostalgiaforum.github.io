var go=false;
var active=false;
var ent;

function entityAddedHook(entity)
{
	var x=Math.floor(Entity.getX(entity));
	var y=Math.floor(Entity.getY(entity));
	var z=Math.floor(Entity.getZ(entity));
  e=Entity.getEntityTypeId(entity);
  ent=entity;
  if(e==80)
  {
	go=true;
  }
}
function modTick()
{
  var x=Math.floor(Entity.getX(ent));
  var y=Math.floor(Entity.getY(ent));
  var z=Math.floor(Entity.getZ(ent));
  
  if(go&&active)
  {
    setTile(x-1,y-1,z-1,17);
	setTile(x-2,y-1,z-2,17);
	setTile(x-1,y-1,z-2,17);
	setTile(x-2,y-1,z-1,17);
	setTile(x-3,y-1,z-1,17);
	setTile(x-1,y-1,z-3,17);
	setTile(x-3,y-1,z-3,17);
	setTile(x-2,y-1,z-3,17);
	setTile(x-3,y-1,z-2,17);
	setTile(x-1,y-1,z-3,17);
  }
}

function procCmd(cmd)
{
  var cmd = cmd.split(" ");
  
  if(cmd[0]=="bridge"&&cmd[1]=="on")
  {
	active=true;
    clientMessage("Insta-Bridge active");
  }
  if(cmd[0]=="bridge"&&cmd[1]=="off")
  {
	active=false;
    clientMessage("Insta-Bridge de-activated");
  }
}