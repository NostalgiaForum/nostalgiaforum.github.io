/* 
----------------------
--##  Timber Mod  ##--
----------------------
--## By Michal16  ##--
----------------------
*/

var X, Y, Z, Xl, Yl, Zl, S = J = 0;
function destroyBlock(x,y,z,side) {
	Xl = x;
	Yl = y;
	Zl = z;
	X = x;
	Y = y;
	Z = z;
	Xl-=2;
	Zl-=2;
	if(Player.getCarriedItem()==271||Player.getCarriedItem()==275||Player.getCarriedItem()==279||Player.getCarriedItem()==286||Player.getCarriedItem()==258) {
		if(Level.getTile(X, Y, Z)==17) {
			for(var q=0; q<10; q++) {
				if(Level.getTile(X,Y+q,Z)==17) {
					switch(Level.getData(X,Y+q,Z)) {
						case 0:
							Level.setTile(X,Y+q,Z,0);
							Level.dropItem(X,Y+q,Z,1,17, 1);
							for(var b=0; b<6; b++) {
								for(var m=0; m<6; m++) {
									if(Level.getTile(Xl+b,Yl+q+1,Zl+m)==18) {
										Level.setTile(Xl+b,Yl+q+1,Zl+m, 0);
										S++;
										J++;
									} if(S==28) {
										Level.dropItem(Xl+b,Yl+q,Zl+m,1,6,1);
										S=0;
									} if(J==100) {
										Level.dropItem(Xl+b,Yl+q,Zl+m,1,260,1);
										J=0;
									}
								}
							} 
						break;
						case 1:
							Level.setTile(X,Y+q,Z,0);
							Level.dropItem(X,Y+q,Z,1,17,1,1);
							for(var b=0; b<8; b++) {
								for(var m=0; m<8; m++) {
									if(Level.getTile(Xl+b-1,Yl+q+1,Zl+m-1)==18&&Level.getData(Xl+b-1,Yl+q+1,Zl+m-1)==5) {
										Level.setTile(Xl+b-1,Yl+q+1,Zl+m-1, 0);
										S++;
										J++;
									} if(S==28) {
										Level.dropItem(Xl+b,Yl+q,Zl+m,1,6,1,1);
										S=0;
									} if(J==100) {
										Level.dropItem(Xl+b,Yl+q,Zl+m,1,260,1);
										J=0;
									}
								}
							} 
						break;
						case 2:
							Level.setTile(X,Y+q,Z,0);
							Level.dropItem(X,Y+q,Z,1,17,1,2);
							for(var b=0; b<6; b++) {
								for(var m=0; m<6; m++) {
									if(Level.getTile(Xl+b,Yl+q+1,Zl+m)==18&&Level.getData(Xl+b,Yl+q+1,Zl+m)==6) {
										Level.setTile(Xl+b,Yl+q+1,Zl+m, 0);
										S++;
										J++;
									} if(S==28) {
										Level.dropItem(Xl+b,Yl+q,Zl+m,1,6,1,2);
										S=0;
									} if(J==100) {
										Level.dropItem(Xl+b,Yl+q,Zl+m,1,260,1);
										J=0;
									}
								}
							} 
						break;
					}
				}
			}
		}
	}
}