//Ruins Mod by DAW330073

var ready=false;
function newLevel(){
	ready=false;
	}
function leaveGame(){
	ready=false;
	}
function modTick(){
	var cx=Math.round(Player.getX()/16);
	var cz=Math.round(Player.getZ()/16);
	if(!ready && Level.getTile(parseInt(Player.getX()),parseInt(Player.getY())-2,parseInt(Player.getZ()))!=0)
		ready=true;
	if(ready){
		if(Math.floor(Math.random()*100)==10){
			var rnd=Math.floor(Math.random()*6)+1;
			var x,y=0;
			if(rnd<4)
				x=3;
			else
				x=-3
			rnd=Math.floor(Math.random()*6)+1;
			if(rnd<4)
				z=3;
			else
				z=-3
			if(Level.getTile((cx+x)*16,1,(cz+z)*16)!=4)
				Generate((cx+x)*16,(cz+z)*16);
			}
		for(var x=-3;x<3;x++){
			for(var z=-3;z<3;z++){
				if(Level.getTile((cx+x)*16,1,(cz+z)*16)!=4)
					Level.setTile((cx+x)*16,1,(cz+z)*16,4);
				}
			}
		}
	}
function Generate(x,z){
	var y=0;
	for(var i=100;i>40;i--){
		if(Level.getTile(x,i,z)!=0){
			y=i;
			break;
			}
		}
	if(y==0 || (Level.getTile(x,y,z)!=2 && Level.getTile(x,y,z)!=1 && Level.getTile(x,y,z)!=3 && Level.getTile(x,y,z)!=31 && Level.getTile(x,y,z)!=37 && Level.getTile(x,y,z)!=38))
		return;
	var ruin=[[x+(-1),y+(0),z+(2),4],[x+(-3),y+(0),z+(-1),4],[x+(3),y+(0),z+(1),4],[x+(2),y+(0),z+(0),4],[x+(-2),y+(3),z+(-2),48],[x+(2),y+(1),z+(-2),48],[x+(3),y+(0),z+(0),4],[x+(-2),y+(0),z+(1),4],[x+(-1),y+(0),z+(1),4],[x+(-2),y+(3),z+(2),48],[x+(-1),y+(0),z+(0),4],[x+(0),y+(0),z+(-3),4],[x+(1),y+(0),z+(-3),4],[x+(-1),y+(2),z+(3),48],[x+(1),y+(0),z+(-1),4],[x+(1),y+(0),z+(2),4],[x+(1),y+(2),z+(3),48],[x+(-1),y+(0),z+(-3),4],[x+(3),y+(2),z+(-1),48],[x+(0),y+(0),z+(2),4],[x+(-3),y+(0),z+(0),4],[x+(1),y+(1),z+(-3),4],[x+(2),y+(0),z+(1),4],[x+(-1),y+(0),z+(-1),4],[x+(1),y+(0),z+(-2),4],[x+(-2),y+(0),z+(2),4],[x+(0),y+(0),z+(-2),4],[x+(-1),y+(1),z+(3),4],[x+(-2),y+(1),z+(2),48],[x+(2),y+(1),z+(2),48],[x+(1),y+(1),z+(3),4],[x+(1),y+(2),z+(-3),48],[x+(2),y+(0),z+(-1),4],[x+(-3),y+(2),z+(-1),48],[x+(-3),y+(0),z+(1),4],[x+(-1),y+(0),z+(-2),4],[x+(1),y+(0),z+(3),4],[x+(-3),y+(1),z+(1),4],[x+(-2),y+(2),z+(-2),4],[x+(-2),y+(1),z+(-2),4],[x+(0),y+(0),z+(1),4],[x+(-2),y+(2),z+(2),4],[x+(-3),y+(1),z+(-1),4],[x+(3),y+(0),z+(-1),4],[x+(0),y+(0),z+(-1),4],[x+(2),y+(0),z+(2),4],[x+(2),y+(0),z+(-2),4],[x+(1),y+(0),z+(0),4],[x+(1),y+(0),z+(1),4],[x+(-2),y+(0),z+(0),4],[x+(1),y+(3),z+(-3),48],[x+(2),y+(2),z+(2),48],[x+(-1),y+(1),z+(-3),4],[x+(-1),y+(0),z+(3),4],[x+(3),y+(1),z+(1),4],[x+(-2),y+(0),z+(-1),4],[x+(0),y+(0),z+(3),4],[x+(1),y+(3),z+(3),48],[x+(-2),y+(0),z+(-2),4],[x+(0),y+(0),z+(0),4],[x+(3),y+(1),z+(-1),4]];
	for(var i=0;i<ruin.length;i++)
		Level.setTile(ruin[i][0],ruin[i][1],ruin[i][2],ruin[i][3]);
	//clientMessage("Spawned at: "+x+","+y+","+z);
	}

