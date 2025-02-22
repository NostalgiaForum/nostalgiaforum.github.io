/*CarbonPE - Droid Edition
	Made By BeATz-UnKNoWN and Thecactigod   */
var TNTText="Normal";
var FireTNT = false;
var WaterTNT = false;
var IceTNT = false;
var XTNT = false;
var LavaTNT=false;
var WebTNT = false;
var lightTNT = false;
var ignite = false;
var PX;
var PY;
var PZ;
var infiniteItem = false;
var infiniteItemText = "Off";
var hover=false;
var flyOn=false;
var flyUp=false;
var hoverUI=null;
var flyDown=false;
var flyText="Off"
var flyUpUI=null;
var flyDownUI=null;
var Xpos=0;
var Zpos=0;
var hitText="Off";
var knockBack=false;
var shouldRun=1;
var Xdiff=0;
var Zdiff=0;
var starterUI = null;
var closeUI = null;
var carbonPE = null;
var gunUI = null;
var itemDrop = false;
var itemDropText = "Off";
var unlimitedArrow = false;
var arrowText = "Off";
var farmReady = false;
var farmText = "Off";
var spawnType = 10;
var spawnName = "Chicken";
var spawnCount = 160;
var farmActive = false;
var godMode = false;
var modeText = "Off";
var instaKill = false;
var killText = "Off";
var saddleUp = false;
var saddleText = "Off";
var gunReady = false;
var gunText = "Off";
var gunEngaged = false;
var entityType = "10";
var entityName = "Chicken";
var jumpHeight = "1";
var jump=0;
var jumpVel=0;
var speed=1;
var movement="normal";
var arrow;
var ground=0;
var explosive=0;
var fire=0;
var onFire=0;
var teleport=0;
var canTP=0;
var water=0;
var ice=0;
var light=0;
var lava=0;
var web=0;
var block=0;
var getBlock;
var getBlockData;
var typeOfArrow="Normal";

function dip2px(ctx, dips){
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel(){
TNTText="Normal";
LavaTNT=false;
FireTNT = false;
WaterTNT = false;
IceTNT = false;
XTNT = false;
WebTNT = false;
lightTNT = false;
ignite = false;
flyDown=false;
flyDownUI=null;
hoverUI=null;
flyUp=false;
hover=false;
flyOn=false;
flyText="Off"
flyUpUI=null;
infiniteItem = false;
infiniteItemText = "Off";
hitText="Off";
knockBack=false;
jumpHeight = "1"; 
jump=0; 
jumpVel=0; 
speed=1;
movement="normal";
	starter();
	itemDrop = false;
	itemDropText = "Off";
	unlimitedArrow = false;
	arrowText = "Off";
	farmReady = false;
	farmText = "Off";
	spawnType = 10;
	spawnName = "Chicken";
	spawnCount = 160;
	farmActive = false;
	godMode = false;
	modeText = "Off";
	instaKill = false;
	killText = "Off";
	saddleUp = false;
	saddleText = "Off";
	gunReady = false;
	gunText = "Off";
	gunEngaged = false;
	entityType = "10";
	entityName = "Chicken";

}

function starter(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var layout = new android.widget.LinearLayout(ctx);
			layout.setOrientation(0);
			
			var menuBtn = new android.widget.Button(ctx);
			menuBtn.setText("T");
			menuBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					mainMenu();
					
					close();
				}
			}));
			layout.addView(menuBtn);
			
			starterUI = new android.widget.PopupWindow(layout, dip2px(ctx,38), dip2px(ctx,38));
			
			starterUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 220, 0);
		}catch(err){
			print("The T-Button could not be displayed, because: " + err);
		}
	}}));
}

function close(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var clayout = new android.widget.LinearLayout(ctx);
			clayout.setOrientation(0);
			
			var closeBtn = new android.widget.Button(ctx);
			closeBtn.setText("X");
			closeBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					carbonPE.dismiss();
					
					closeUI.dismiss();
				}
			}));
			clayout.addView(closeBtn);
			
			closeUI = new android.widget.PopupWindow(clayout, dip2px(ctx,45), dip2px(ctx,45));
			
			closeUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
		}catch(err){
			print("The X-Button could not be displayed, because: " + err);
		}
	}}));
}

function mainMenu(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var menuLayout = new android.widget.LinearLayout(ctx);
			var menuScroll = new android.widget.ScrollView(ctx);
			var menuLayout1 = new android.widget.LinearLayout(ctx);
			menuLayout.setOrientation(1);
			menuLayout1.setOrientation(1);
			
			menuScroll.addView(menuLayout);
			menuLayout1.addView(menuScroll);
			
			var layoutParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			layoutParams.setMargins(dip2px(ctx, 20), 0, 0, 0);
			
			var info = new android.widget.TextView(ctx);
			info.setTextSize(22);
			info.setText("CarbonPE");
			info.setGravity(android.view.Gravity.CENTER);
			menuLayout.addView(info);
			
			var heading = new android.widget.TextView(ctx);
			heading.setTextSize(22);
			heading.setText("Main Menu");
			heading.setLayoutParams(layoutParams);
			menuLayout.addView(heading);
			
			var itemDropBtn = new android.widget.TextView(ctx);
			itemDropBtn.setTextSize(20);
			itemDropBtn.setText("64 Item Drop " + itemDropText);
			itemDropBtn.setLayoutParams(layoutParams);
			itemDropBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(itemDrop==false){
						itemDrop = true;
						itemDropText = "On";
					}else{
						itemDrop = false;
						itemDropText = "Off";
					}
					itemDropBtn.setText("64 Item Drop " + itemDropText);
				}
			}));
			menuLayout.addView(itemDropBtn);
			
			var UnarrowBtn = new android.widget.TextView(ctx);
			UnarrowBtn.setTextSize(20);
			UnarrowBtn.setText("Unlimited Arrows " + arrowText);
			UnarrowBtn.setLayoutParams(layoutParams);
			UnarrowBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(unlimitedArrow==false){
						unlimitedArrow = true;
						arrowText = "On";
					}else{
						unlimitedArrow = false;
						arrowText = "Off";
					}
					UnarrowBtn.setText("Unlimited Arrows " + arrowText);
				}
			}));
			menuLayout.addView(UnarrowBtn);
var itemBtn = new android.widget.TextView(ctx);
                        itemBtn.setTextSize(18);
                        itemBtn.setText("Infinite Items " + infiniteItemText);
                        itemBtn.setLayoutParams(layoutParams);
                        itemBtn.setOnClickListener(new android.view.View.OnClickListener({
                                onClick: function(viewarg){
                                        if(infiniteItem==false){
                                                infiniteItem = true;
                                                infiniteItemText = "On";
                                        }else{
                                                infiniteItem = false;
                                                infiniteItemText = "Off";
                                        }
                                        itemBtn.setText("Infinite Items " + infiniteItemText);
                                }
                        }));
                        menuLayout.addView(itemBtn);

			
			var farmBtn = new android.widget.TextView(ctx);
			farmBtn.setTextSize(20);
			farmBtn.setText("Animal Farm " + farmText);
			farmBtn.setLayoutParams(layoutParams);
			farmBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(farmReady==false){
						farmReady = true;
						farmText = "On";
					}else{
						farmReady = false;
						farmText = "Off";
					}
					farmBtn.setText("Animal Farm " + farmText);
				}
			}));
			menuLayout.addView(farmBtn);
			
			var animalBtn = new android.widget.TextView(ctx);
			animalBtn.setTextSize(20);
			animalBtn.setText("Farm Animal: " + spawnName);
			animalBtn.setLayoutParams(layoutParams);
			animalBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(spawnType==10 && spawnName=="Chicken"){
						spawnType = 11;
						spawnName = "Cow";
					}
					else if(spawnType==11 && spawnName=="Cow"){
						spawnType = 12;
						spawnName = "Pig";
					}
					else if(spawnType==12 && spawnName=="Pig"){
						spawnType = 13;
						spawnName = "Sheep";
					}
					else if(spawnType==13 && spawnName=="Sheep"){
						spawnType = 32;
						spawnName = "Zombie";
					}
					else if(spawnType==32 && spawnName=="Zombie"){
						spawnType = 33;
						spawnName = "Creeper";
					}
					else if(spawnType==33 && spawnName=="Creeper"){
						spawnType = 34;
						spawnName = "Skeleton";
					}
					else if(spawnType==34 && spawnName=="Skeleton"){
						spawnType = 35;
						spawnName = "Spider";
					}
					else if(spawnType==35 && spawnName=="Spider"){
						spawnType = 36;
						spawnName = "Zombie Pigman";
					}
					else if(spawnType==36 && spawnName=="Zombie Pigman"){
						spawnType = 10;
						spawnName = "Chicken";
					}
					animalBtn.setText("Farm Animal: " + spawnName);
				}
			}));
			menuLayout.addView(animalBtn);
			
			var modeBtn = new android.widget.TextView(ctx);
			modeBtn.setTextSize(20);
			modeBtn.setText("God Mode " + modeText);
			modeBtn.setLayoutParams(layoutParams);
			modeBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(godMode==false){
						godMode = true;
						modeText = "On";
					}else{
						godMode = false;
						modeText = "Off";
						Player.setHealth(20);
					}
					modeBtn.setText("God Mode " + modeText);
				}
			}));
			menuLayout.addView(modeBtn);
			
			var instaKillBtn = new android.widget.TextView(ctx);
			instaKillBtn.setTextSize(20);
			instaKillBtn.setText("Insta Kill " + killText);
			instaKillBtn.setLayoutParams(layoutParams);
			instaKillBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(instaKill==false){
						instaKill = true;
						killText = "On";
					}else{
						instaKill = false;
						killText = "Off";
					}
					instaKillBtn.setText("Insta Kill " + killText);
				}
			}));
			menuLayout.addView(instaKillBtn);
			
			var saddleBtn = new android.widget.TextView(ctx);
			saddleBtn.setTextSize(20);
			saddleBtn.setText("Saddle Up! " + saddleText);
			saddleBtn.setLayoutParams(layoutParams);
			saddleBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(saddleUp==false){
						saddleUp = true;
						saddleText = "On";
					}else{
						saddleUp = false;
						saddleText = "Off";
					}
					saddleBtn.setText("Saddle Up! " + saddleText);
				}
			}));
			menuLayout.addView(saddleBtn);
			
			var entityGunBtn = new android.widget.TextView(ctx);
			entityGunBtn.setTextSize(20);
			entityGunBtn.setText("Entity Launcher " + gunText);
			entityGunBtn.setLayoutParams(layoutParams);
			entityGunBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(gunReady==false){
						gunReady = true;
						gunText = "On";
						gunButton();
					}else{
						gunReady = false;
						gunText = "Off";
						gunUI.dismiss();
					}
					entityGunBtn.setText("Entity Launcher " + gunText);
				}
			}));
			menuLayout.addView(entityGunBtn);
			
			var entityBtn = new android.widget.TextView(ctx);
			entityBtn.setTextSize(20);
			entityBtn.setText("Equipped Entity: " + entityName);
			entityBtn.setLayoutParams(layoutParams);
			entityBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(entityType==10 && entityName=="Chicken"){
						entityType = 11;
						entityName = "Cow";
					}
					else if(entityType==11 && entityName=="Cow"){
						entityType = 12;
						entityName = "Pig";
					}
					else if(entityType==12 && entityName=="Pig"){
						entityType = 13;
						entityName = "Sheep";
					}
					else if(entityType==13 && entityName=="Sheep"){
						entityType = 32;
						entityName = "Zombie";
					}
					else if(entityType==32 && entityName=="Zombie"){
						entityType = 33;
						entityName = "Creeper";
					}
					else if(entityType==33 && entityName=="Creeper"){
						entityType = 34;
						entityName = "Skeleton";
					}
					else if(entityType==34 && entityName=="Skeleton"){
						entityType = 35;
						entityName = "Spider";
					}
					else if(entityType==35 && entityName=="Spider"){
						entityType = 36;
						entityName = "Zombie Pigman";
					}
					else if(entityType==36 && entityName=="Zombie Pigman"){
						entityType = 65;
						entityName = "Primed TNT";
					}
					else if(entityType==65 && entityName=="Primed TNT"){
						entityType = 80;
						entityName = "Arrow";
					}
					else if(entityType==80 && entityName=="Arrow"){
						entityType = 81;
						entityName = "Snowball";
					}
					else if(entityType==81 && entityName=="Snowball"){
						entityType = 82;
						entityName = "Egg";
					}
					else if(entityType==82 && entityName=="Egg"){
						entityType = 10;
						entityName = "Chicken";
					}
					entityBtn.setText("Equipped Entity: " + entityName);
				}
			}));
			menuLayout.addView(entityBtn);

var arrowBtn = new android.widget.TextView(ctx);
			arrowBtn.setTextSize(20);
			arrowBtn.setText("Elemental Arrow: " + typeOfArrow);
			arrowBtn.setLayoutParams(layoutParams);
			arrowBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(typeOfArrow=="Normal"){
						typeOfArrow="Explosive"
						explosive = 1;
					}
					else if(typeOfArrow=="Explosive"){
						web = 1;
explosive=0;
						typeOfArrow = "Web";
					}
					else if(typeOfArrow=="Web"){
						fire = 1;
web=0;
						typeOfArrow = "Fire";
					}
					else if(typeOfArrow=="Fire"){
						teleport= 1;
fire=0;
						typeOfArrow = "Teleporting";
					}
					else if(typeOfArrow=="Teleporting"){
						lava=1;
teleport=0;
						typeOfArrow = "Lava";
					}
					else if(typeOfArrow=="Lava"){
						water = 1;
lava=0;
						typeOfArrow = "Water";
					}
					else if(typeOfArrow=="Water"){
						ice = 1;
water=0;
						typeOfArrow = "Ice";
					}
					else if(typeOfArrow=="Ice"){
						light=1;
ice=0;
						typeOfArrow ="Light";
					}
					else if(typeOfArrow=="Light"){
						block = 1;
light=0;
						typeOfArrow= "Block";
					}
					else if(typeOfArrow=="Block"){
						block = 0;
						typeOfArrow = "Normal";
					}
					
					arrowBtn.setText("Elemental Arrow: " + typeOfArrow);
				}
			}));
			menuLayout.addView(arrowBtn);


var TNTBtn = new android.widget.TextView(ctx);
			TNTBtn.setTextSize(20);
			TNTBtn.setText("TNT Type: " + TNTText);
			TNTBtn.setLayoutParams(layoutParams);
			TNTBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(TNTText=="Normal"){
						TNTText="Nuke"
						XTNT = true;
					}
					else if(TNTText=="Nuke"){
						WebTNT = true;
XTNT=false;
						TNTText = "Web";
					}
					else if(TNTText=="Web"){
						WaterTNT=true;
WebTNT=false;
						TNTText = "Water";
					}
					else if(TNTText=="Water"){
						LavaTNT=true;
WaterTNT=false;
						TNTText = "Lava";
					}
					else if(TNTText=="Lava"){
					       lightTNT = true;
LavaTNT=false;
						TNTText = "Light";
					}
					else if(TNTText=="Light"){
						IceTNT = true;
lightTNT=false;
						TNTText= "Ice";
					}
					else if(TNTText=="Ice"){
						IceTNT=false;
						TNTText ="Normal";
FireTNT = false;
WaterTNT = false;
IceTNT = false;
XTNT = false;
WebTNT = false;
lightTNT = false;
					}
					
					
					TNTBtn.setText("TNT Type: " + TNTText);
				}
			}));
			menuLayout.addView(TNTBtn);

var flyBtn = new android.widget.TextView(ctx);
			flyBtn.setTextSize(20);
			flyBtn.setText("Flying " + flyText);
			flyBtn.setLayoutParams(layoutParams);
			flyBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(flyOn==false){
						flyOn = true;
						flyText = "On";
						flyUpButton();
flyDownButton();
hoverButton();
					}else{
						flyOn = false;
						flyText = "Off";
						flyUpUI.dismiss();
flyDownUI.dismiss();
hoverUI.dismiss();
					}
					flyBtn.setText("Flying " + flyText);
				}
			}));
			menuLayout.addView(flyBtn);

			
			var jumpBtn= new android.widget.TextView(ctx);
			jumpBtn.setTextSize(20);
			jumpBtn.setText("Jump Height = " + jumpHeight+" blocks");
			jumpBtn.setLayoutParams(layoutParams);
			jumpBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(jumpHeight=="1"){
						jumpHeight="2";
                        jumpVel=0.6;
					}
					else if(jumpHeight=="2"){
						jumpHeight = "3";
						jumpVel = 0.7;
					}
					else if(jumpHeight=="3"){
						jumpHeight = "4";
						jumpVel = 0.8;
					}
					else if(jumpHeight=="4"){
						jumpVel = 0.9;
						jumpHeight = "5";
					}
					else if(jumpHeight=="5"){
						jumpVel = 1;
						jumpHeight = "6";
					}
					else if(jumpHeight=="6"){
					
						jumpHeight = "1";
					}
					
					jumpBtn.setText("Jump Height = " + jumpHeight+ " blocks");
				}
			}));
			menuLayout.addView(jumpBtn);

var speedBtn= new android.widget.TextView(ctx);
			speedBtn.setTextSize(20);
			speedBtn.setText("Speed: " +movement);
			speedBtn.setLayoutParams(layoutParams);
			speedBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(speed==1){
						movement="fast";
                                                                       speed=2;
					}
					else if(speed==2){
                                                             Entity.setSneaking(getPlayerEnt(), true);
						movement = "slow";
						speed= 0;
					}
					else if(speed==0){
                                 Entity.setSneaking(getPlayerEnt(), false);
						movement = "normal";
						speed = 1;
					}
					
					
					speedBtn.setText("Speed: " +movement);
				}
			}));
			menuLayout.addView(speedBtn);
var knockBackBtn = new android.widget.TextView(ctx);
			knockBackBtn.setTextSize(20);
			knockBackBtn.setText("KnockBack " + hitText);
			knockBackBtn.setLayoutParams(layoutParams);
			knockBackBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(knockBack==false){
						knockBack = true;
						hitText = "On";
					
					}else{
						knockBack = false;
						hitText = "Off";
				
					}
					knockBackBtn.setText("KnockBack " + hitText);
				}
			}));
			menuLayout.addView(knockBackBtn);
			
			var maker = new android.widget.TextView(ctx);
			maker.setTextSize(16);
			maker.setText("Made By BeATz-UnKNoWN and Thecactigod");
			maker.setGravity(android.view.Gravity.CENTER);
			menuLayout.addView(maker);
			
			carbonPE = new android.widget.PopupWindow(menuLayout1, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
			carbonPE.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			carbonPE.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
		}catch(error){
			print("The menu could not be displayed, because: " + error);
		}
	}}));
}

function gunButton(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var gLayout = new android.widget.LinearLayout(ctx);
			gLayout.setOrientation(0);
			
			var gunBtn = new android.widget.Button(ctx);
			gunBtn.setText("x");
			gunBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(gunEngaged==false){
						gunEngaged = true;
					}else{
						gunEngaged = false;
					}
				}
			}));
			gLayout.addView(gunBtn);

			gunUI = new android.widget.PopupWindow(gLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		
			gunUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 200, 380);
		}catch(err){
			print("The entity launcher button could not be displayed, because: " + err);
		}
	}}));
}

function flyUpButton(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var gLayout = new android.widget.LinearLayout(ctx);
			gLayout.setOrientation(0);
			
			var flyUpBtn = new android.widget.Button(ctx);
			flyUpBtn.setText("↑");
			flyUpBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(flyUp==false){
flyDown=false;
hover=false;
						flyUp = true;
					}
					
				}
			}));
			gLayout.addView(flyUpBtn);

			flyUpUI = new android.widget.PopupWindow(gLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		
			flyUpUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 230);
		}catch(err){
			print("The fly up button could not be displayed, because: " + err);
		}
	}}));
}

function flyDownButton(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var gLayout = new android.widget.LinearLayout(ctx);
			gLayout.setOrientation(0);
			
			var flyDownBtn = new android.widget.Button(ctx);
			flyDownBtn.setText("↓");
			flyDownBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(flyDown==false){
						flyDown = true;
flyUp=false;
hover=false;
					}
					
				}
			}));
			gLayout.addView(flyDownBtn);

			flyDownUI = new android.widget.PopupWindow(gLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		
			flyDownUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 530);
		}catch(err){
			print("The fly down button could not be displayed, because: " + err);
		}
	}}));
}

function hoverButton(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		try{
			var gLayout = new android.widget.LinearLayout(ctx);
			gLayout.setOrientation(0);
			
			var hoverBtn = new android.widget.Button(ctx);
			hoverBtn.setText("◎");
			hoverBtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg){
					if(hover==false){
						hover= true;
flyUp=false;
flyDown=false;
}
else{
flyUp=false;
flyDown=false;
hover=false;



					}
					
				}
			}));
			gLayout.addView(hoverBtn);

			hoverUI = new android.widget.PopupWindow(gLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		
			hoverUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 380);
		}catch(err){
			print("The hover button could not be displayed, because: " + err);
		}
	}}));
}
function leaveGame(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		if(starterUI != null){
			starterUI.dismiss();
		}
		if(closeUI != null){
			closeUI.dismiss();
		}
		if(carbonPE != null){
			carbonPE.dismiss();
		}
		if(gunUI != null){
			gunUI.dismiss();
		}
                       if(flyUpUI != null){
                       flyUpUI.dismiss();
                        }
                        if(flyDownUI != null){
                        flyDownUI.dismiss();
                         }
 if(hoverUI != null){
                        hoverUI.dismiss();
                         }
	}}));
}

function destroyBlock(x,y,z,side){
	var data = Level.getData(x,y,z);
	var tile = Level.getTile(x,y,z);
	if(itemDrop==true){
		if(tile==1 && getCarriedItem()==270 || tile==1 && getCarriedItem()==257 || tile==1 && getCarriedItem()==274 || tile==1 && getCarriedItem()==278 || tile==1 && getCarriedItem()==285 || tile==4 && getCarriedItem()==270 || tile==4 && getCarriedItem()==257 || tile==4 && getCarriedItem()==274 || tile==4 && getCarriedItem()==278 || tile==4 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,4,63);
		}
		else if(tile==1 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285 || tile==4 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,4,64);
		}
		if(tile==2 || tile==3){
			Level.dropItem(x,y,z,0.5,3,63);
		}
		if(tile==5 || tile==6 || tile==12 || tile==13){
			Level.dropItem(x,y,z,0.5,tile,63,data);
		}
		if(tile==14 && getCarriedItem()==257 || tile==14 && getCarriedItem()==278 || tile==14 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,14,63);
		}
		else if(tile==14 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,14,64);
		}
		if(tile==15 && getCarriedItem()==257 || tile==15 && getCarriedItem()==274 || tile==15 && getCarriedItem()==278 || tile==15 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,15,63);
		}
		else if(tile==15 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,15,64);
		}
		if(tile==16 && getCarriedItem()==270 || tile==16 && getCarriedItem()==257 || tile==16 && getCarriedItem()==274 || tile==16 && getCarriedItem()==278 || tile==16 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,263,63);
		}
		else if(tile==16 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,263,64);
		}
		if(tile==17){
			Level.dropItem(x,y,z,0.5,17,63,data);
		}
		if(tile==18 && getCarriedItem()==359){
			Level.dropItem(x,y,z,0.5,18,63);
		}
		else if(tile==18 && getCarriedItem()!=359){
			Level.dropItem(x,y,z,0.5,18,64);
		}
		if(tile==19 || tile==20){
			Level.dropItem(x,y,z,0.5,tile,63,data);
		}
		if(tile==21 && getCarriedItem()==257 || tile==21 && getCarriedItem()==274 || tile==21 && getCarriedItem()==278 || tile==21 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,21,63);
		}
		else if(tile==21 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,21,64);
		}
		if(tile==22 && getCarriedItem()==257 || tile==22 && getCarriedItem()==274 || tile==22 && getCarriedItem()==278 || tile==22 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,22,63);
		}
		else if(tile==22 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,22,64);
		}
		if(tile==24 && getCarriedItem()==270 || tile==24 && getCarriedItem()==257 || tile==24 && getCarriedItem()==274 || tile==24 && getCarriedItem()==278 || tile==24 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,24,63);
		}
		else if(tile==24 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,24,64);
		}
		if(tile==26){
			Level.dropItem(x,y,z,0.5,26,63,data);
		}
		if(tile==27 && getCarriedItem()==270 || tile==27 && getCarriedItem()==257 || tile==27 && getCarriedItem()==274 || tile==27 && getCarriedItem()==278 || tile==27 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,27,63);
		}
		else if(tile==27 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,27,64);
		}
		if(tile==30 && getCarriedItem()==359){
			Level.dropItem(x,y,z,0.5,287,63);
		}
		else if(tile==30 && getCarriedItem()!=359){
			Level.dropItem(x,y,z,0.5,287,64);
		}
		if(tile==31 && getCarriedItem()==359 || tile==32 & getCarriedItem()==359){
			Level.dropItem(x,y,z,0.5,tile,63,data);
		}
		else if(tile==31 && getCarriedItem()!=359 || tile==32 && getCarriedItem()!=359){
			Level.dropItem(x,y,z,0.5,tile,64,data);
		}
		if(tile==37 || tile==38 || tile==39 || tile==40){
			Level.dropItem(x,y,z,0.5,tile,63);
		}
		if(tile==41 && getCarriedItem()==257 || tile==41 && getCarriedItem()==278 || tile==41 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,41,63);
		}
		else if(tile==41 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,41,64);
		}
		if(tile==42 && getCarriedItem()==257 || tile==42 && getCarriedItem()==274 || tile==42 && getCarriedItem()==278 || tile==42 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,42,63);
		}
		else if(tile==42 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,42,64);
		}
		if(tile==44 && getCarriedItem()==257 || tile==44 && getCarriedItem()==270 || tile==44 && getCarriedItem()==274 || tile==44 && getCarriedItem()==278 || tile==44 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,44,63);
		}
		else if(tile==44 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,44,64);
		}
		if(tile==45 && getCarriedItem()==270 || tile==45 && getCarriedItem()==257 || tile==45 && getCarriedItem()==274 || tile==45 && getCarriedItem()==278 || tile==45 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,45,63);
		}
		else if(tile==45 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,45,64);
		}
		if(tile==47){
			Level.dropItem(x,y,z,0.5,340,61);
		}
		if(tile==48 && getCarriedItem()==270 || tile==48 && getCarriedItem()==257 || tile==48 && getCarriedItem()==274 || tile==48 && getCarriedItem()==278 || tile==48 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,48,63);
		}
		else if(tile==48 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,48,64);
		}
		if(tile==49 && getCarriedItem()==278 || tile==246 && getCarriedItem()==278){
			Level.dropItem(x,y,z,0.5,49,63);
		}
		else if(tile==49 && getCarriedItem()!=278 || tile==246 && getCarriedItem()!=278){
			Level.dropItem(x,y,z,0.5,49,64);
		}
		if(tile==50 || tile==53 || tile==54){
			Level.dropItem(x,y,z,0.5,tile,63);
		}
		if(tile==56 && getCarriedItem()==257 || tile==57 && getCarriedItem()==257 || tile==56 && getCarriedItem()==278 || tile==57 && getCarriedItem()==278 || tile==56 && getCarriedItem()==285 || tile==57 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,tile,63);
		}
		else if(tile==56 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285 || tile==57 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,tile,64);
		}
		if(tile==61 && getCarriedItem()==270 || tile==61 && getCarriedItem()==257 || tile==61 && getCarriedItem()==274 || tile==61 && getCarriedItem()==278 || tile==61 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,61,63);
		}
		else if(tile==61 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,61,64);
		}
		if(tile==63 || tile==64 || tile==65 || tile==66){
			Level.dropItem(x,y,z,0.5,tile,63);
		}
		if(tile==67 && getCarriedItem()==270 || tile==67 && getCarriedItem()==257 || tile==67 && getCarriedItem()==274 || tile==67 && getCarriedItem()==278 || tile==67 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,67,63);
		}
		else if(tile==67 && getCarriedItem()!=270 && getCarriedItem()!=257 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,67,64);
		}
		if(tile==73 && getCarriedItem()==257 || tile==73 && getCarriedItem()==278 || tile==73 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,331,63);
		}
		else if(tile==73 && getCarriedItem()!=257 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,331,64);
		}
		if(tile==78 && getCarriedItem()==256 || tile==78 && getCarriedItem()==269 || tile==78 && getCarriedItem()==273 || tile==78 && getCarriedItem()==277 || tile==78 && getCarriedItem()==284){
			Level.dropItem(x,y,z,0.5,332,63);
		}
		else if(tile==78 && getCarriedItem()!=256 && getCarriedItem()!=269 && getCarriedItem()!=273 && getCarriedItem()!=277 && getCarriedItem()!=284){
			Level.dropItem(x,y,z,0.5,332,64);
		}
		if(tile==80 && getCarriedItem()==256 || tile==80 && getCarriedItem()==269 || tile==80 && getCarriedItem()==273 || tile==80 && getCarriedItem()==277 || tile==80 && getCarriedItem()==284){
			Level.dropItem(x,y,z,0.5,332,60);
		}
		else if(tile==80 && getCarriedItem()!=256 && getCarriedItem()!=269 && getCarriedItem()!=273 && getCarriedItem()!=277 && getCarriedItem()!=284){
			Level.dropItem(x,y,z,0.5,332,64);
		}
		if(tile==81 || tile==82 || tile==83 || tile==85 || tile==86 || tile==89 || tile==91 || tile==96 || tile==102 || tile==107){
			Level.dropItem(x,y,z,0.5,tile,63);
		}
		if(tile==87 && getCarriedItem()==257 || tile==87 && getCarriedItem()==270 || tile==87 && getCarriedItem()==274 || tile==87 && getCarriedItem()==278 || tile==87 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,87,63);
		}
		else if(tile==87 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,87,64);
		}
		if(tile==98 && getCarriedItem()==257 || tile==98 && getCarriedItem()==270 || tile==98 && getCarriedItem()==274 || tile==98 && getCarriedItem()==278 || tile==98 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,98,63);
		}
		else if(tile==98 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,98,64);
		}
		if(tile==101 && getCarriedItem()==257 || tile==101 && getCarriedItem()==270 || tile==101 && getCarriedItem()==274 || tile==101 && getCarriedItem()==278 || tile==101 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,101,63);
		}
		else if(tile==101 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,101,64);
		}
		if(tile==103){
			Level.dropItem(x,y,z,0.5,360,57);
		}
		if(tile==108 && getCarriedItem()==257 || tile==108 && getCarriedItem()==270 || tile==108 && getCarriedItem()==274 || tile==108 && getCarriedItem()==278 || tile==108 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,108,63);
		}
		else if(tile==108 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,108,64);
		}
		if(tile==109 && getCarriedItem()==257 || tile==109 && getCarriedItem()==270 || tile==109 && getCarriedItem()==274 || tile==109 && getCarriedItem()==278 || tile==109 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,109,63);
		}
		else if(tile==109 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,109,64);
		}
		if(tile==112 && getCarriedItem()==257 || tile==112 && getCarriedItem()==270 || tile==112 && getCarriedItem()==274 || tile==112 && getCarriedItem()==278 || tile==112 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,112,63);
		}
		else if(tile==112 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,112,64);
		}
		if(tile==114 && getCarriedItem()==257 || tile==114 && getCarriedItem()==270 || tile==114 && getCarriedItem()==274 || tile==114 && getCarriedItem()==278 || tile==114 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,114,63);
		}
		else if(tile==114 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,114,64);
		}
		if(tile==128 && getCarriedItem()==257 || tile==128 && getCarriedItem()==270 || tile==128 && getCarriedItem()==274 || tile==128 && getCarriedItem()==278 || tile==128 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,128,63);
		}
		else if(tile==128 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,128,64);
		}
		if(tile==134 || tile==135 || tile==136 || tile==158 || tile==170 || tile==171 || tile==245 || tile==247){
			Level.dropItem(x,y,z,0.5,tile,63,data);
		}
		if(tile==139 && getCarriedItem()==257 || tile==139 && getCarriedItem()==270 || tile==139 && getCarriedItem()==274 || tile==139 && getCarriedItem()==278 || tile==139 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,139,63);
		}
		else if(tile==139 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,139,64);
		}
		if(tile==155 && getCarriedItem()==257 || tile==155 && getCarriedItem()==270 || tile==155 && getCarriedItem()==274 || tile==155 && getCarriedItem()==278 || tile==155 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,155,63);
		}
		else if(tile==155 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,155,64);
		}
		if(tile==156 && getCarriedItem()==257 || tile==156 && getCarriedItem()==270 || tile==156 && getCarriedItem()==274 || tile==156 && getCarriedItem()==278 || tile==156 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,156,63);
		}
		else if(tile==156 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,156,64);
		}
		if(tile==173 && getCarriedItem()==257 || tile==173 && getCarriedItem()==270 || tile==173 && getCarriedItem()==274 || tile==173 && getCarriedItem()==278 || tile==173 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,173,63);
		}
		else if(tile==173 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,173,64);
		}
		if(tile==244 && getCarriedItem()==257 || tile==244 && getCarriedItem()==270 || tile==244 && getCarriedItem()==274 || tile==244 && getCarriedItem()==278 || tile==244 && getCarriedItem()==285){
			Level.dropItem(x,y,z,0.5,457,63);
		}
		else if(tile==244 && getCarriedItem()!=257 && getCarriedItem()!=270 && getCarriedItem()!=274 && getCarriedItem()!=278 && getCarriedItem()!=285){
			Level.dropItem(x,y,z,0.5,457,64);
		}
	}
}

function entityAddedHook(entity){
if(Entity.getEntityTypeId(entity)==80 )
{
ground=1;
arrow=entity;
	if(unlimitedArrow==true){
		addItemInventory(262,-1);
		addItemInventory(262,1);
	}
}}

function useItem(x,y,z,itemId,blockId,side){
if(itemId == 259 && blockId == 46)
	{
		if(ignite == 19)
		{
			preventDefault();
			ignite = true;
		} else {
			ignite = true;
		}
		if(FireTNT == true)
		{
setTile(x, y, z, 51);
preventDefault();
			explode(x, y, z, 0.1);
			setTile(x+1, y+1, z, 51);
			setTile(x, y+1, z+1, 51);
			setTile(x-1, y+1, z, 51);
			setTile(x, y+1, z-1, 51);
			ignite = false;
			WaterTNT = false;
			IceTNT = false;
			XTNT = false;
			WebTNT = false;
			lightTNT = false;
		}
		if(WaterTNT == true)
		{
setTile(x, y, z, 0);
preventDefault();
			explode(x, y, z, 0.1);

			setTile(x, y+1, z, 8);
			setTile(x, y+2, z, 8);
			setTile(x, y, z+1, 8);
setTile(x, y, z, 8);
setTile(x, y, z-1, 8);
setTile(x-1, y, z, 8);
setTile(x+1, y, z, 8);
			ignite = false;
			FireTNT = false;
			IceTNT = false;
			XTNT = false;
			WebTNT = false;
			lightTNT = false;
		}
if(LavaTNT == true)
		{
setTile(x, y, z, 0);
preventDefault();
			explode(x, y, z, 0.1);

			setTile(x, y+1, z, 11);
			setTile(x, y+2, z,11);
			setTile(x, y, z+1, 11);
setTile(x, y, z, 11);
setTile(x, y, z-1, 11);
setTile(x-1, y, z,11);
setTile(x+1, y, z,11);
			ignite = false;
			FireTNT = false;
			IceTNT = false;
			XTNT = false;
			WebTNT = false;
			lightTNT = false;
		}
		if(IceTNT == true)
		{
setTile(x, y, z, 0);
preventDefault();
			explode(x, y, z, 0.1);

			setTile(x, y, z, 0);
			setTile(x+2, y, z, 79);
			setTile(x-2, y, z, 79);
			setTile(x, y, z+2, 79);
			setTile(x, y, z-2, 79);
setTile(x, y-1, z, 79);
                                    setTile(x, y+1, z, 79);
                                    setTile(x-1, y, z, 79);
                                    setTile(x+1, y, z, 79);
                                    setTile(x, y, z-1, 79);
                                    setTile(x, y, z+1, 79);
                                    setTile(x, y-2, z, 79);
                                    setTile(x, y+2, z, 79);
                                    setTile(x+1, y-2, z, 79);
                                    setTile(x, y-2, z+1, 79);
                                    setTile(x, y-2, z-1, 79);
                                    setTile(x-1, y-2, z, 79);
                                    setTile(x, y+2, z+1, 79);
                                    setTile(x, y+2, z-1, 79);
                                    setTile(x-1, y+2, z, 79);
                                    setTile(x+1, y+2, z, 79);
                                    setTile(x+2, y-1, z, 79);
                                    setTile(x+2, y+1, z, 79);
                                    setTile(x+2, y, z+1, 79);
                                    setTile(x+2, y, z-1, 79);
setTile(x-2, y-1, z, 79);
                                    setTile(x-2, y+1, z, 79);
                                    setTile(x-2, y, z+1, 79);
                                    setTile(x-2, y, z-1, 79);
                                    setTile(x, y-1, z+2, 79);
                                    setTile(x, y+1, z+2, 79);
setTile(x-1, y, z+2, 79);
setTile(x+1, y, z+2, 79);
setTile(x, y-1, z-2, 79);
                                    setTile(x, y+1, z-2, 79);
setTile(x-1, y, z-2, 79);
setTile(x+1, y, z-2, 79);
			ignite = false;
			WaterTNT = false;
			FireTNT = false;
			XTNT = false;
			WebTNT = false;
			lightTNT = false;
		}
		if (XTNT == true)
		{
setTile(x, y, z, 0);
preventDefault();
			explode(x, y, z, 30);
		
			ignite = false;
			WaterTNT = false;
			IceTNT = false;
			FireTNT = false;
			WebTNT = false;
			lightTNT = false;
		}
		if(WebTNT == true)
		{
			PX = getPlayerX();
			PY = getPlayerY();
			PZ = getPlayerZ();
			setTile(x, y, z, 0);
setTile(x, y-1, z, 30);
                                    setTile(x, y+1, z, 30);
                                    setTile(x-1, y, z, 30);
                                    setTile(x+1, y, z, 30);
                                    setTile(x, y, z-1, 30);
                                    setTile(x, y, z+1, 30);
                                    setTile(x, y-2, z, 30);
                                    setTile(x, y+2, z, 30);
                                    setTile(x+1, y-2, z, 30);
                                    setTile(x, y-2, z+1, 30);
                                    setTile(x, y-2, z-1, 30);
                                    setTile(x-1, y-2, z, 30);
                                    setTile(x, y+2, z+1, 30);
                                    setTile(x, y+2, z-1, 30);
                                    setTile(x-1, y+2, z, 30);
                                    setTile(x+1, y+2, z, 30);
                                    setTile(x+2, y-1, z, 30);
                                    setTile(x+2, y+1, z, 30);
                                    setTile(x+2, y, z+1, 30);
                                    setTile(x+2, y, z-1, 30);
setTile(x-2, y-1, z, 30);
                                    setTile(x-2, y+1, z, 30);
                                    setTile(x-2, y, z+1, 30);
                                    setTile(x-2, y, z-1, 30);
                                    setTile(x, y-1, z+2, 30);
                                    setTile(x, y+1, z+2, 30);
setTile(x-1, y, z+2, 30);
setTile(x+1, y, z+2, 30);
setTile(x, y-1, z-2, 30);
                                    setTile(x, y+1, z-2, 30);
setTile(x-1, y, z-2, 30);
setTile(x+1, y, z-2, 30);
			explode(x, y, z, 0.01);
			ignite = false;
			WaterTNT = false;
			IceTNT = false;
			XTNT = false;
			FireTNT = false;
			lightTNT = false;
		}
		if(lightTNT == true)
		{
preventDefault();
explode(x, y, z, 0.01);
			setTile(x, y-1, z, 89);
                                    setTile(x, y+1, z, 89);
                                    setTile(x-1, y, z, 89);
                                    setTile(x+1, y, z, 89);
                                    setTile(x, y, z-1, 89);
                                    setTile(x, y, z+1, 89);
                                    setTile(x, y-2, z, 89);
                                    setTile(x, y+2, z, 89);
                                    setTile(x+1, y-2, z, 89);
                                    setTile(x, y-2, z+1, 89);
                                    setTile(x, y-2, z-1, 89);
                                    setTile(x-1, y-2, z, 89);
                                    setTile(x, y+2, z+1, 89);
                                    setTile(x, y+2, z-1, 89);
                                    setTile(x-1, y+2, z, 89);
                                    setTile(x+1, y+2, z, 89);
                                    setTile(x+2, y-1, z, 89);
                                    setTile(x+2, y+1, z, 89);
                                    setTile(x+2, y, z+1, 89);
                                    setTile(x+2, y, z-1, 89);
setTile(x-2, y-1, z, 89);
                                    setTile(x-2, y+1, z, 89);
                                    setTile(x-2, y, z+1, 89);
                                    setTile(x-2, y, z-1, 89);
                                    setTile(x, y-1, z+2, 89);
                                    setTile(x, y+1, z+2, 89);
setTile(x-1, y, z+2, 89);
setTile(x+1, y, z+2, 89);
setTile(x, y-1, z-2, 89);
                                    setTile(x, y+1, z-2, 89);
setTile(x-1, y, z-2, 89);
setTile(x+1, y, z-2, 89);
			setTile(x, y, z, 0);
			ignite = false;
			WaterTNT = false;
			IceTNT = false;
			XTNT = false;
			WebTNT = false;
			FireTNT = false;
		}
	}
if(itemId==261&&block==1)
{
getBlock=blockId;
getBlockData=Level.getData(x, y, z);
clientMessage("set block arrow to "+getBlock+".");
}
if(itemId<=255&&itemId!=0 && infiniteItem==true){
                addItemInventory(itemId, 1);
        }
	if(blockId==247 && farmReady==true){
		preventDefault();
		setTile(x,y,z,246);
		farmActive = true;
		clientMessage("Animal Farm has started");
	}
	if(blockId==246 && farmActive==true){
		setTile(x,y,z,247);
		farmActive = false;
		clientMessage("Animal Farm has ended");
		spawnCount = 160;
		preventDefault();
	}
}

function modTick(){
if(flyUp==true)
{
setVelY(getPlayerEnt(), 0.5);
}
if(hover==true)
{
setVelY(getPlayerEnt(), 0);
}
if(flyDown==true)
{
setVelY(getPlayerEnt(),-0.5);
}
if(explosive==1&&ground==1||fire==1&&ground==1||water==1&&ground==1||ice==1&&ground==1||lava==1&&ground==1||web==1&&ground==1||block==1&&ground==1)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow)-1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow)+1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)+1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)-1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)+1)!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)-1)!=0)
{

Entity.remove(arrow);
}
}
if(teleport==1&&ground==1)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow)-1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow)+1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)+1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)-1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)+1)!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)-1)!=0)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow))!=95&&Entity.getY(arrow)>1)
{
Entity.remove(arrow);


}
}
}
if(light==1&&ground==1)
{
if(getTile(Entity.getX(arrow), Entity.getY(arrow)-1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow)+1,Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)+1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow)-1, Entity.getY(arrow),Entity.getZ(arrow))!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)+1)!=0||getTile(Entity.getX(arrow), Entity.getY(arrow),Entity.getZ(arrow)-1)!=0)
{


setTile(Entity.getX(arrow), Entity.getY(arrow), Entity.getZ(arrow),89);
Entity.remove(arrow);

}
}
if(speed==2)
{
if(shouldRun==1)
      {
        Xpos=getPlayerX();
        Zpos=getPlayerZ();
        shouldRun = shouldRun + 1;
      }
      else if(shouldRun==3)
      {
        shouldRun=1;
        Xdiff=getPlayerX()-Xpos;
        Zdiff=getPlayerZ()-Zpos;
        setVelX(getPlayerEnt(),Xdiff);
        setVelZ(getPlayerEnt(),Zdiff);
        Xdiff=0;
        Zdiff=0;
      }
  if(shouldRun!=1)
  {
  shouldRun = shouldRun+ 1;
  }
}

	if(farmActive==true){
		spawnCount--;
	}
	if(spawnCount==140){
		Level.spawnMob(getPlayerX()+4, getPlayerY(), getPlayerZ()+4, spawnType);
	}
	if(spawnCount==120){
		Level.spawnMob(getPlayerX()+4, getPlayerY(), getPlayerZ()-4, spawnType);
	}
	if(spawnCount==100){
		Level.spawnMob(getPlayerX()-4, getPlayerY(), getPlayerZ()+4, spawnType);
	}
	if(spawnCount==80){
		Level.spawnMob(getPlayerX()-4, getPlayerY(), getPlayerZ()-4, spawnType);
	}
	if(spawnCount==60){
		Level.spawnMob(getPlayerX()+4, getPlayerY(), getPlayerZ(), spawnType);
	}
	if(spawnCount==40){
		Level.spawnMob(getPlayerX(), getPlayerY(), getPlayerZ()+4, spawnType);
	}
	if(spawnCount==0){
		spawnCount = 160;
	}
	if(godMode==true){
		Player.setHealth(30000);
	}
		if(gunEngaged==true&&getPitch(getPlayerEnt())<40){
		var playerYaw = Entity.getYaw(Player.getEntity());
		var playerPitch = Entity.getPitch(Player.getEntity());
		velY = Math.sin((playerPitch - 180) / 180 * Math.PI);
		velX = Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
		velZ = -1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
		tnt = Level.spawnMob(Player.getX(),Player.getY()+1,Player.getZ(),entityType);
		setVelX(tnt,velX);
		setVelY(tnt,velY);
		setVelZ(tnt,velZ);	
	}
	else if(gunEngaged==true&&getPitch(getPlayerEnt())>40){
		var Yaw = Entity.getYaw(Player.getEntity());
		var Pitch = Entity.getPitch(Player.getEntity());
		velY = Math.sin((Pitch - 180) / 180 * Math.PI);
		velX = Math.sin(Yaw / 180 * Math.PI) * Math.cos((Pitch - 180) / 180 * Math.PI);
		velZ = -1 * Math.cos(Yaw / 180 * Math.PI) * Math.cos((Pitch - 180) / 180 * Math.PI);
		tnt = Level.spawnMob(Player.getX()+1,Player.getY(),Player.getZ(),entityType);
		setVelX(tnt,velX);
		setVelY(tnt,velY);
		setVelZ(tnt,velZ);
	}
if(jumpHeight!="1"&&Entity.getVelY(getPlayerEnt())>0&&jump==0)
{
setVelY(getPlayerEnt(), jumpVel);
jump=1;
}
else if(getTile(getPlayerX(), getPlayerY()-2, getPlayerZ())!=0&&jump==1)
{
jump=0;
}
}

function attackHook(attacker, victim){
if(knockBack==true)
{
if(getYaw() < 0)
{
		var hit = getYaw()+90;
		for(go=0; hit<0; go++)
		{
			hit+= 360;
		}
		x = Math.cos(hit*(Math.PI/180));
		z = Math.sin(hit*(Math.PI/180));
		setVelX(victim, x*3);
		setVelY(victim, 1);
		setVelZ(victim, z*3);
	}
	else if( getYaw() > 0 && getYaw() < 360)
	{
		var hit = getYaw()+90;
		XVel = Math.cos(hit*(Math.PI/180));
		ZVel= Math.sin(hit*(Math.PI/180));
		setVelX(victim, XVel*3);
		setVelY(victim, 1);
		setVelZ(victim, ZVel*3);
	}
	else if( getYaw() >= 360)
	{
		var hit= getYaw()+90;
		for(go=0; hit>=360; go++)
		{
			hit -= 360;
		}
		XVel = Math.cos(hit*(Math.PI/180));
		ZVel = Math.sin(hit*(Math.PI/180));
		setVelX(victim, XVel*3);
		setVelY(victim, 1);
		setVelZ(victim, ZVel*3);
	}
}
	if(instaKill==true){
		Entity.setHealth(victim,0);
	}
	if(saddleUp==true){
		rideAnimal(attacker, victim);
	}
}
function entityRemovedHook(entity)
{
var underArrow=getTile(Entity.getX(entity), Entity.getY(entity)-1, Entity.getZ(entity));
var arrowCoords =getTile(Entity.getX(entity),Entity.getY(entity),Entity.getZ(entity));
var arrowX=Entity.getX(entity);
var arrowY=Entity.getY(entity);
var arrowZ =Entity.getZ(entity);
if(Entity.getEntityTypeId(entity)==80)

{
if(explosive==1)
{
explode (Entity.getX(entity), Entity.getY(entity)-1,Entity.getZ(entity), 4);
}
if(fire==1)
{
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity), 51);
onFire==1;
}
if(teleport==1)
{
setPosition(getPlayerEnt(),Entity.getX(entity), Entity.getY(entity)+2,Entity.getZ(entity));
}
if(water==1)
{
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity)+1,Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity)+2,Entity.getZ(entity), 9);
setTile (Entity.getX(entity)+1, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)+2, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)-1, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)-2, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity)+3,Entity.getZ(entity), 9);
setTile (Entity.getX(entity)+3, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity)-3, Entity.getY(entity),Entity.getZ(entity), 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+1, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-1,9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+2, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-2, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+3, 9);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-3, 9);
}
if(ice==1)
{
 if(getTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity))==8||getTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity))==9)
{
setTile(arrowX, arrowY,arrowZ,79);
setTile(arrowX+1, arrowY, arrowZ, 79);
setTile(arrowX-1, arrowY, arrowZ, 79);
setTile(arrowX, arrowY, arrowZ+1, 79);
setTile(arrowX, arrowY, arrowZ-1, 79);
setTile(arrowX+1, arrowY, arrowZ+1, 79);
setTile(arrowX-1, arrowY, arrowZ-1, 79);
setTile(arrowX+1, arrowY, arrowZ-1, 79);
setTile(arrowX-1, arrowY, arrowZ+1, 79);
setTile(arrowX+2, arrowY, arrowZ, 79);
setTile(arrowX-2, arrowY, arrowZ, 79);
setTile(arrowX, arrowY, arrowZ+2, 79);
setTile(arrowX, arrowY, arrowZ-2, 79);
}
if(underArrow!=8&&underArrow!=9)
{
setTile(arrowX, arrowY, arrowZ,79);
}
else if(underArrow==8||underArrow==9)
{
if(getTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity))==0)
{
setTile(arrowX, arrowY-1,arrowZ,79);
setTile(arrowX+1, arrowY-1, arrowZ, 79);
setTile(arrowX-1, arrowY-1, arrowZ, 79);
setTile(arrowX, arrowY-1, arrowZ+1, 79);
setTile(arrowX, arrowY-1, arrowZ-1, 79);
setTile(arrowX+1, arrowY-1, arrowZ+1, 79);
setTile(arrowX-1, arrowY-1, arrowZ-1, 79);
setTile(arrowX+1, arrowY-1, arrowZ-1, 79);
setTile(arrowX-1, arrowY-1, arrowZ+1, 79);
setTile(arrowX+2, arrowY-1, arrowZ, 79);
setTile(arrowX-2, arrowY-1, arrowZ, 79);
setTile(arrowX, arrowY-1, arrowZ+2, 79);
setTile(arrowX, arrowY-1, arrowZ-2, 79);
}
}
}
if(lava==1)
{
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity)+1,Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity)+2,Entity.getZ(entity), 10);
setTile (Entity.getX(entity)+1, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)+2, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)-1, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)-2, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity)+3,Entity.getZ(entity), 10);
setTile (Entity.getX(entity)+3, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity)-3, Entity.getY(entity),Entity.getZ(entity), 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+1, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-1,10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+2, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-2, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)+3, 10);
setTile (Entity.getX(entity), Entity.getY(entity),Entity.getZ(entity)-3, 10);
}
if(web==1)
{
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity),30);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity),30);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity),30);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity), Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity), Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+1, Entity.getZ(entity),30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+1, Entity.getZ(entity),30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+1, Entity.getZ(entity),30);
setTile(Entity.getX(entity), Entity.getY(entity)+1, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+1, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+1, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+1, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+1, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+1, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+2, Entity.getZ(entity),30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+2, Entity.getZ(entity),30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+2, Entity.getZ(entity),30);
setTile(Entity.getX(entity), Entity.getY(entity)+2, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity), Entity.getY(entity)+2, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+2, Entity.getZ(entity)+1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+2, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)+1, Entity.getY(entity)+2, Entity.getZ(entity)-1,30);
setTile(Entity.getX(entity)-1, Entity.getY(entity)+2, Entity.getZ(entity)+1,30);
}
if(block==1)
{
setTile(Entity.getX(entity), Entity.getY(entity), Entity.getZ(entity),getBlock, getBlockData);
}
}
}