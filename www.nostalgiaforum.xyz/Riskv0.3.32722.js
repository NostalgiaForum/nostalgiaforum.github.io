//made by Darth377
//Risk© under no circumstances may you distribute, redistribute, publish, or post this ModPE script without permission
var riskOff = false;
var Xpos=0;
var Zpos=0;
var i=1;
var Xdiff=0;
var Zdiff=0;
var sprintMode = false;
var sneak = false;
var ten_seconds = 200;
var ten_second_heal = false;
var superHeal = Math.ceil((Math.random() + Math.random() + Math.random())*1000 + 400);
var healTickCount = 0;
var healTick = 150;
var simpleGUI = null;
var instabreak = false;
var Hspawn = false;
var Nspawn = false;
var Mspawn = false;
var XX = 0;
var YY = 0;
var ZZ = 0;
var x = getPlayerX();
var y = getPlayerY();
var z = getPlayerZ();
var Xs = 0;
var Ys = 0;
var Zs = 0;
var tick = 10000;
var tick2 = 0;
var tick3 = 0;
var dungeon = false;
var dungeonticks = 0;
var dungeonwave = 0;
var timeround = 1;
var superDurability = 200;
var fireDurability = 100;
ModPE.setFoodItem(322,"apple_golden",14,0, "Risk Apple");
ModPE.setFoodItem(357,"cookie",17,0,"Risk Cookie");
ModPE.setItem(369,"blaze_rod",0,"Risk Rod");
ModPE.setItem(497,"ruby",0,"Firey Gem");
function newLevel()
{
	print("Welcome to Risk");
	setTile(255,2,0,98);
	setTile(255,3,0,98);
	setTile(255,4,0,98);
	setTile(255,5,0,98);
	setTile(254,2,0,98);
	setTile(254,3,0,0);
	setTile(254,4,0,0);
	setTile(254,5,0,0);
	setTile(254,6,0,98);
	setTile(253,2,0,98);
	setTile(253,3,0,0);
	setTile(253,4,0,0);
	setTile(253,5,0,0);
	setTile(253,6,0,98);
	setTile(252,2,0,98);
	setTile(252,3,0,0);
	setTile(252,4,0,0);
	setTile(252,5,0,0);
     setTile(252,6,0,98);
     setTile(251,2,0,98);
     setTile(251,3,0,0);
     setTile(251,4,0,0);
     setTile(251,5,0,0);
     setTile(251,6,0,98);
     setTile(250,2,0,98);
     setTile(250,3,0,0);
     setTile(250,4,0,0);
     setTile(250,5,0,0);
     setTile(250,6,0,98);
     setTile(249,2,0,98);
     setTile(249,3,0,0);
     setTile(249,4,0,0);
     setTile(249,5,0,0);
     setTile(249,6,0,98);
     setTile(254,2,1,98);
	setTile(254,3,1,0);
	setTile(254,4,1,0);
	setTile(254,5,1,0);
	setTile(254,6,1,98);
	setTile(253,2,1,98);
	setTile(253,3,1,0);
	setTile(253,4,1,0);
	setTile(253,5,1,0);
	setTile(253,6,1,98);
	setTile(252,2,1,98);
	setTile(252,3,1,0);
	setTile(252,4,1,0);
	setTile(252,5,1,0);
     setTile(252,6,1,98);
     setTile(251,2,1,98);
     setTile(251,3,1,0);
     setTile(251,4,1,0);
     setTile(251,5,1,0);
     setTile(251,6,1,98);
     setTile(250,2,1,98);
     setTile(250,3,1,0);
     setTile(250,4,1,0);
     setTile(250,5,1,0);
     setTile(250,6,1,98);
     setTile(249,2,1,98);
     setTile(249,3,1,0);
     setTile(249,4,1,0);
     setTile(249,5,1,0);
     setTile(249,6,1,98);
     setTile(254,2,2,98);
	setTile(254,3,2,0);
	setTile(254,4,2,0);
	setTile(254,5,2,0);
	setTile(254,6,2,98);
	setTile(253,2,2,98);
	setTile(253,3,2,0);
	setTile(253,4,2,0);
	setTile(253,5,2,0);
	setTile(253,6,2,98);
	setTile(252,2,2,98);
	setTile(252,3,2,0);
	setTile(252,4,2,0);
	setTile(252,5,2,0);
     setTile(252,6,2,98);
     setTile(251,2,2,98);
     setTile(251,3,2,0);
     setTile(251,4,2,0);
     setTile(251,5,2,0);
     setTile(251,6,2,98);
     setTile(250,2,2,98);
     setTile(250,3,2,0);
     setTile(250,4,2,0);
     setTile(250,5,2,0);
     setTile(250,6,2,98);
     setTile(249,2,2,98);
     setTile(249,3,2,0);
     setTile(249,4,2,0);
     setTile(249,5,2,0);
     setTile(249,6,2,98);
     setTile(254,2,3,98);
	setTile(254,3,3,0);
	setTile(254,4,3,0);
	setTile(254,5,3,0);
	setTile(254,6,3,98);
	setTile(253,2,3,98);
	setTile(253,3,3,0);
	setTile(253,4,3,0);
	setTile(253,5,3,0);
	setTile(253,6,3,98);
	setTile(252,2,3,98);
	setTile(252,3,3,0);
	setTile(252,4,3,0);
	setTile(252,5,3,0);
     setTile(252,6,3,98);
     setTile(251,2,3,98);
     setTile(251,3,3,0);
     setTile(251,4,3,0);
     setTile(251,5,3,0);
     setTile(251,6,3,98);
     setTile(250,2,3,98);
     setTile(250,3,3,0);
     setTile(250,4,3,0);
     setTile(250,5,3,0);
     setTile(250,6,3,98);
     setTile(249,2,3,98);
     setTile(249,3,3,0);
     setTile(249,4,3,0);
     setTile(249,5,3,0);
     setTile(249,6,3,98);
	setTile(254,3,4,0);
	setTile(254,4,4,0);
	setTile(254,5,4,0);
	setTile(254,6,4,98);
	setTile(253,2,4,98);
	setTile(253,3,4,0);
	setTile(253,4,4,0);
	setTile(253,5,4,0);
	setTile(253,6,4,98);
	setTile(252,2,4,98);
	setTile(252,3,4,0);
	setTile(252,4,4,0);
	setTile(252,5,4,0);
     setTile(252,6,4,98);
     setTile(251,2,4,98);
     setTile(251,3,4,0);
     setTile(251,4,4,0);
     setTile(251,5,4,0);
     setTile(251,6,4,98);
     setTile(250,2,4,98);
     setTile(250,3,4,0);
     setTile(250,4,4,0);
     setTile(250,5,4,0);
     setTile(250,6,4,98);
     setTile(249,2,4,98);
     setTile(249,3,4,0);
     setTile(249,4,4,0);
     setTile(249,5,4,0);
     setTile(249,6,4,98);
     setTile(251,6,2,89);
	// run all the stuff at UI thread
	
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try{
			simpleGUI = new android.widget.PopupWindow();
			simpleGUItwo = new android.widget.PopupWindow();
			simpleGUI3 = new android.widget.PopupWindow();
			var layout = new android.widget.RelativeLayout(ctx);
			var layouttwo = new android.widget.RelativeLayout(ctx);
			var layout3 = new android.widget.RelativeLayout(ctx);
			var button = new android.widget.Button(ctx);
			var buttontwo = new android.widget.Button(ctx);
			var button3 = new android.widget.Button(ctx);
			button.setText("Heal");
			buttontwo.setText("Sneak");
			button3.setText("Sprint");
			//button.setWidth(75);
			//button.setHeight(75);
			button.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(instabreak == false)
					{
						instabreak = true;
						clientMessage("Heal mode on");
					}
					else if(instabreak == true)
					{
						instabreak = false;
						clientMessage("Heal mode off");
					}
				}
			}));
			buttontwo.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(sneak == false)
					{
						sneak = true;
						clientMessage("Sneak mode on");
						Entity.setSneaking(getPlayerEnt(), true);
					}
					else if(sneak == true)
					{
						sneak = false;
						clientMessage("Sneak mode off");
						Entity.setSneaking(getPlayerEnt(),false);
					}
				}
			}));
			button3.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(sprintMode == false)
					{
						sprintMode = true;
						clientMessage("Sprint mode on");
					}
					else if(sprintMode == true)
					{
						sprintMode = false;
						clientMessage("Sprint mode off");
					}
				}
			}));
			layout.addView(button);
			layouttwo.addView(buttontwo);
			layout3.addView(button3);
			simpleGUI.setContentView(layout);
			simpleGUI.setWidth(75);
			simpleGUI.setHeight(75);
			simpleGUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 10, 55);
			simpleGUItwo.setContentView(layouttwo);
			simpleGUItwo.setWidth(75);
			simpleGUItwo.setHeight(75);
			simpleGUItwo.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			simpleGUItwo.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 10, 55);
			simpleGUI3.setContentView(layout3);
			simpleGUI3.setWidth(75);
			simpleGUI3.setHeight(75);
			simpleGUI3.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			simpleGUI3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 10, 55);
		}catch(err){
			print("Error: "+err);
		}
	} }));
  
}
function modTick()
{
	var px = getPlayerX();
	var py = getPlayerY();
	var pz = getPlayerZ();
	var vrnpcx = getPlayerX() + Math.floor((Math.random() * 25) + 3);
	var vrnpcy = getPlayerY() + Math.floor((Math.random() * 5) + 4);
	var vrnpcz = getPlayerZ() + Math.floor((Math.random() * 25) + 3);
	tick = tick -1;
	tick2 = tick2 + 1;
	tick3++;
	if(tick3 >= 14000)
	{
		npc = Level.spawnMob(vrnpcx, vrnpcy, vrnpcz, 11,"char.png");
		Entity.setRenderType(npc,3);
		Entity.setHealth(npc,30);
		Entity.setCarriedItem(npc,257);
		tick3 = 0;
		Nspawn = true;
	}
	if(tick <= 0)
	{
		Player.setHealth(2);
		tick = 10000;
		clientMessage("Risk!!");
		var Random = Math.random();
		if(Random >= 0.7)
		{
			addItemInventory(322,1);
		}
		if(Random <= 0.49)
		{
			XX = getPlayerX();
			YY = getPlayerY();
			ZZ = getPlayerZ();
			x = 251;
			y = 5;
			z = 2;
			addItemInventory(311,1);
			setPosition(getPlayerEnt(),x,y,z);
			clientMessage("You were sent to the dungeons.");
			dungeon = true;
			Player.setHealth(5);
		}
		if(Random >= 0.5 && Random <=6.9)
		{
			addItemInventory(357,1);
			clientMessage("You got lucky!");
		}
		if(Random <= 0.20)
		{
			addItemInventory(369,1);
			clientMessage("You got lucky.");
		}
	}
	if(dungeon == true)
	{
		dungeonticks = dungeonticks + 1;
		dungeonwave = dungeonwave + 1;
		if(dungeonwave == 2)
		{
			Level.spawnMob(254,5,3,32);
			Level.spawnMob(254,5,0,32);
		}
		if(dungeonwave == 500)
		{
			Level.spawnMob(254,5,0,36);
			Level.spawnMob(254,5,0,35);
			Level.spawnMob(254,5,3,32);
		}
		if(dungeonwave == 1200)
		{
			Level.spawnMob(254,5,3,36);
			Level.spawnMob(254,5,0,35);
			Level.spawnMob(254,5,3,35);
		}
		if(dungeonwave == 2000 && timeround == 1)
		{
			dungeonwave = 0;
			timeround = timeround + 1;
		}
		if(dungeonwave == 1600 && timeround == 2)
		{
			dungeon = false;
			dungeonwave = 0;
			timeround = 1;
			dungeonticks = 0;
			setPosition(getPlayerEnt(),XX,YY,ZZ);
		}
	}
	if(tick2 >= 3500)
	{
		Xs = getPlayerX() + 3;
		Ys = getPlayerY() + 2;
		Zs = getPlayerZ() + 3;
		Herobrine = spawnPigZombie(Xs,Ys,Zs,278,"char.png");
		clientMessage("Herobrine Found You...");
		tick2 = 1000;
		Entity.setHealth(Herobrine,75);
		Entity.setRenderType(Herobrine,3);
		Hspawn = true;
		Entity.setCarriedItem(Herobrine,497);
	}
	if(instabreak == true)
	{
		superHeal--;
		healTick--;
		if(healTick == 0)
		{
			healTickCount++;
			healTick = 200;
			if(Entity.getHealth(getPlayerEnt()) < 20) {
				var healed = Entity.getHealth(getPlayerEnt()) + 1;
				Player.setHealth(healed);
			}
			if(healTickCount == 10)
			{
				Player.setHeath(20);
				healTickCount = 0;
			}
		}
		if(superHeal > -1 && superHeal < 1)
		{
			ten_second_heal = true;
			superHeal = Math.ceil((Math.random() + Math.random() + Math.random())*1000 + 400);
		}
		if(ten_second_heal == true)
		{
			ten_seconds --;
			if(ten_seconds > 0)
			{
				Player.setHealth(20);
			}
			else
			{
				ten_seconds = 200;
				ten_second_heal = false;
			}
		}
	}
  if(sprintMode==true)
  {
      if(i==1)
      {
        Xpos=getPlayerX();
        Zpos=getPlayerZ();
        i = i + 1;
      }
      else if(i==3)
      {
        i=1;
        Xdiff=getPlayerX()-Xpos;
        Zdiff=getPlayerZ()-Zpos;
        setVelX(getPlayerEnt(),Xdiff);
        setVelZ(getPlayerEnt(),Zdiff);
        Xdiff=0;
        Zdiff=0;
      }
  if(i!=1)
  {
  i = i + 1;
  }
}
if(riskOff)
{
	tick = 10000;
	tick2 = 0;
	tick3 = 0;
	superDurability = 200;
	fireDurability = 100;
}
function useItem(x,y,z,itemId,blockId)
{
	if(itemId == 359)
	{
		clientMessage("you have "+tick+" ticks left");
	}
	if(itemId == 260)
	{
		addItemInventory(322,1);
		addItemInventory(260,-1);
	}
	if(itemId == 322)
	{
		XX = getPlayerX();
		YY = getPlayerY();
		ZZ = getPlayerZ();
		x = 251;
		y = 5;
		z = 2;
		addItemInventory(322,-1);
		addItemInventory(311,1);
		setPosition(getPlayerEnt(),x,y,z);
		clientMessage("You were sent to the dungeons.");
		dungeon = true;
	} 
	if(itemId==369 && fireDurability >= 1)
	{
		setTile(x,y + 1,z,51);
		fireDurability = fireDurability - 1;
	}
}
function attackHook(attacker,victim)
{
	if(getCarriedItem()==369 && superDurability >= 1)
	{
		Entity.setFireTicks(victim,100);
		Entity.setHealth(victim,0);
		superDurability = superDurability - 1;
	}
	if(Nspawn == true)
	{ 
		if(victim == npc)
		{
			if(getCarriedItem() !== 268 && getCarriedItem() !== 267 && getCarriedItem() !== 272 && getCarriedItem() !== 276)
			{
				preventDefault();
			}
			else
			{
				mnpc = Level.spawnMob(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),32,"char.png");
				Entity.remove(npc);
				Entity.setHealth(mnpc,40);
				Entity.setRenderType(mnpc,3);
				Mspawn = true;
				Nspawn = false;
			}
		}
	}
	if(getCarriedItem() == 497)
	{
		Entity.setFireTicks(victim, 100);
		Entity.setVelY(victim,0.5);
	 	var neHealth = Entity.getHealth(victim) - 2;
		Entity.setHealth(victim, neHealth);
	}
	if(Hspawn == true)
	{
		if(attacker == Herobrine)
		{
			 Entity.setFireTicks(victim, 100);
			Entity.setVelY(victim,0.5);
		 	var newHealth = Entity.getHealth(victim) - 2;
			Entity.setHealth(victim, newHealth);
		}
	}
}
function deathHook(attacker, victim)
{
	if(Mspawn == true)
	{
		if(victim == mnpc)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),2,264,2,0);
			Mspawn = false;
		}
	}
	if(Hspawn == true)
	{
		if(victim == Herobrine)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),2,46,2,0);
			Hspawn = false;
			var randomdrop = Math.floor((Math.random() * 10) + 1);
			if(randomdrop == 1)
			{
				Level.dropItem(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),1,497,1);
			}
		}
	}
}
function procCmd(c)
{
	var cmd = c.split(" ");
	if(cmd[0] == "setVar" && cmd[1] == "riskTick")
	{
		tick = cmd[2];
	}
	if(cmd[0] == "setVar" && cmd[1] == "heroTick")
	{
		tick2  = cmd[2];
	}
	if(cmd[0] == "setVar" && cmd [1] == "npcTick")
	{
		tick3 = cmd[2];
	}
	if(cmd[0] == "repairST")
	{
		superDurability = 200;
		fireDurability = 100;
	}
	if(cmd[0] == "riskOff")
	{
		riskOff = true;
		clientMessage("All features of Risk besides the GUI \n have been turned off.");
	}
	if(cmd[0] == "riskOn")
	{
		riskOff = false;
		clientMessage("All features of Risk are now on.");
	}
}
function entityAddedHook(e) {
	if(Entity.getEntityTypeId() == 32){
		Entity.setHealth(e, 40);
	}
	if(Entity.getEntityTypeId() == 33)
	{
		var c = Level.spawnMob(Entity.getX(e),Entity.getY(e),Entity.getZ(e),33);
		Entity.rideAnimal(e,c);
	}
}
function leaveGame(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		if(simpleGUI != null){
			simpleGUI.dismiss();
		}
		if(simpleGUItwo != null){
			simpleGUItwo.dismiss();
		}
		if(simpleGUI3!= null){
			simpleGUI3.dismiss();
		}
	}}));
}
}