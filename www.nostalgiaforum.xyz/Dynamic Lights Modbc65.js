var X, Y, Z, I, C, D = 0;
function modTick() {
		if(I==1) {
			I=0;
			ModPE.saveData("I", I);
			if(Level.getTile(X, Y-1, Z)==50) {
				setTile(X, Y-1, Z, 0);
			}
		}
		if(Player.getCarriedItem()==50||Player.getArmorSlot()==314) {
			X = getPlayerX();
			Y = getPlayerY();
			Z = getPlayerZ();
			C = Level.getTile(X, Y-2, Z);
			if(C!=0&&C!=8&&C!=9&&C!=10&&C!=11&&C!=18&&C!=20&&C!=30&&C!=31&&C!=32&&C!=37&&C!=38&&C!=39&&C!=40&&C!=50&&C!=51&&C!=53&&C!=59&&C!=68&&C!=63&&C!=64&&C!=65&&C!=67&&C!=71&&C!=78&&C!=79&&C!=83&&C!=92&&C!=102&&C!=105&&C!=106&&C!=107&&C!=108&&C!=109&&C!=114&&C!=128&&C!=156&&Level.getTile(X, Y-1, Z)==0) {
				Level.setTile(X, Y-1, Z, 50);
				I=1;
				ModPE.saveData("I", I);
			}
		} 
} 
function newLevel() {
	I=ModPE.readData("I");
}