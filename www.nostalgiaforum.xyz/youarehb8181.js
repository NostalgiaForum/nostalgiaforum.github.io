//You Are Herobrine!
//0.0.1 snapshot 01
//Made by anonymous... We are anonymous... a team of pro hackers and coders around all continents and sharing our mod as it is yours will have great consequences your small mind and little IQ wouldn't even imagine it

var Runnable = java.lang.Runnable;
var PopupWindow = android.widget.PopupWindow;
var Button = android.widget.Button; 
var Widget = android.widget;
var LinearLayout = Widget.LinearLayout;
var RelativeLayout = Widget.RelativeLayout;
var ViewGroup = android.view.ViewGroup;
var Gravity = android.view.Gravity;
var View = android.view.View;
var AlertDialog = android.app.AlertDialog;
var DialogInterface = android.content.DialogInterface;
var IO = java.io;
var File = IO.File;
var FileOutputStream = IO.FileOutputStream;
var String = java.lang.String;
var Environment = android.os.Environment;
var BufferedReader = IO.BufferedReader;
var FileReader = IO.FileReader;
var StringBuilder = java.lang.StringBuilder;
var Dialog = android.app.Dialog; 
var ScrollView = android.widget.ScrollView;
var EditText = Widget.EditText;
var ImageView = android.widget.ImageView;
var Color = android.graphics.Color;
var ColorDrawable = android.graphics.drawable.ColorDrawable;
var number = android.text.InputType.TYPE_CLASS_NUMBER;

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var slowTimeId = 500;
var slowTimeValue = 8;
var speedTimeId = 501;
var speedTimeValue = 55;
var normalGameSpeedId = 502;
var normalGameTicks = 20;
var homeOrbId = 503;
var herobrine = 0;
var invisible = 0;
var hr = 0;
var guishow = 0;
var player = getPlayerEnt();
var night = false;
var sprintMode = false;
var Xpos = 0;
var Zpos = 0;
var sprintTick = 1;
var Xdiff = 0;
var Zdiff = 0;
var steve;
var stevem = 1;
var stevef = 0;
var snowballX;
var snowballY;
var snowballZ;
var snowball;
var entities = [];
var pearlActive = 0;
var GUI;
var layout;
var disguisedi;
var diguisela;
var disguisebtn;
var countdown = 500;
var cow;

var GUI = new Widget.PopupWindow();

ModPE.setItem(377,"blaze_powder",0,"Blaze Powder");
Item.addFurnaceRecipe(331,377,377);
ModPE.setItem(369,"blaze_rod",0,"Herobrine's Wand");
Item.addCraftRecipe(369,1,0, [280,1,0, 371,9,0, 377,1,0]);
ModPE.setItem(504,"skull_steve",0,"Spawn Slave");
ModPE.setItem(slowTimeId,"nether_star",0,"Time Slowness Merit");
ModPE.setItem(speedTimeId,"nether_star",0,"Time Speed Merit");
ModPE.setItem(normalGameSpeedId,"nether_star",0,"Time Restoration Merit");
ModPE.setItem(homeOrbId,"ender_eye",0,"Warp Orb");

function viewbtns(){

ctx.runOnUiThread(new Runnable({

run:function(){

try{

var layout = new LinearLayout(ctx);
var disguisebtn = new Button(ctx);

disguisebtn.setText("Disguise");

//layout.addView(disguisebtn);
layout.setOrientation(LinearLayout.VERTICAL);

GUI.setContentView(layout);
GUI.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | Gravity.RIGHT, 130, 0);

disguisebtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

opendisguises();

}

}));

}catch(e){

print("Error: " + e);

}

}

}));

}

function useItem(x,y,z,itemId,blockId,side) {
  if(itemId == slowTimeId) {
   clientMessage("Time Has Slown Down");
   ModPE.setGameSpeed(slowTimeValue);
   }

  if(itemId == speedTimeId) {
   clientMessage("Time Has Sped Up");
   ModPE.setGameSpeed(speedTimeValue);
   }

  if(itemId == normalGameSpeedId) {
   clientMessage("Time is now stable");
  ModPE.setGameSpeed(normalGameTicks);
   }

   if(blockId == 247)
   {
   preventDefault()
   getTile(x, y, z)
   getTile(x, y+1, z)
   getTile(x, y+2, z)
   getTile(x, y-1, z)
   getTile(x+1, y-1, z)
   getTile(x-1, y-1, z)
   getTile(x, y-1, z+1)
   getTile(x, y-1, z-1)
   getTile(x, y+3, z)
   getTile(x+1, y-1, z-1)
   getTile(x-1, y-1, z+1)
   getTile(x+1, y-1, z+1)
   getTile(x-1, y-1, z-1)
   getTile(x+1, y-2, z-1)
   getTile(x-1, y-2, z+1)
   getTile(x+1, y-2, z+1)
   getTile(x-1, y-2, z-1)
   if(getTile(x, y, z) == 247 && getTile(x, y+1, z) == 4 && getTile(x, y+2, z) == 87 && getTile(x, y-1, z) == 49 && getTile(x+1, y-1, z) == 41 && getTile(x-1, y-1, z) == 41 && getTile(x, y-1, z+1) == 41 && getTile(x, y-1, z-1) == 41 && getTile(x, y+3, z) == 51 && getTile(x+1, y-1, z-1) == 51 && getTile(x-1, y-1, z+1) == 51 && getTile(x+1, y-1, z+1) == 51 && getTile(x-1, y-1, z-1) == 51 && getTile(x+1, y-2, z-1) == 87 && getTile(x-1, y-2, z+1) == 87 && getTile(x+1, y-2, z+1) == 87 && getTile(x-1, y-2, z-1) == 87)
   {
   herobrine = 1
   hr = 1
   sprintTick = 3
   pearlActive = 1;
   sprintMode = true;
   clientMessage(ChatColor.RED + "Herobrine Has Possesed Your Player...");
   if(guishow == 0){
    viewbtns();
    addItemInventory(369,1,0);
    addItemInventory(332,16,0);
    addItemInventory(504,1,0);
    guishow = 1;
   } else if(guishow == 1){
    
   }
   }  
   }

if(itemId==504)
{
stevef = 1;
stevem = 1;
steve = Level.spawnMob(x, y + 1, z, 11, "mob/char.png");
clientMessage("<Steve>Im under your command Master");
Entity.setRenderType(steve, 3);
Entity.setHealth(steve, 20);
Player.clearInventorySlot(Player.getSelectedSlotId());
}

if(itemId == 369 && invisible == 0 && herobrine == 1){
invisible = 1;
hr = 0;
clientMessage(ChatColor.RED + "Invisibility On");
}else if(invisible == 1 && itemId == 369){
invisible = 0;
hr = 1;
clientMessage(ChatColor.RED + "Invisibility Off");
}

}

function deathHook(murderer,victim) {
  if(victim == 33) {
    Level.dropItem(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),slowTimeId,1,0);
    Level.dropItem(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),speedTimeId,1,0);
    Level.dropItem(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim),normalTimeId,1,0);
    }
}
    
	
function modTick()
{

if(hr == 1)
{
Entity.setRenderType(getPlayerEnt(),3);
Entity.setMobSkin(getPlayerEnt(),"mob/herobrine.png");
}

if(invisible == 1)
{
Entity.setRenderType(Player.getEntity(), 5);
}

if(sprintMode == true) {
		if(sprintTick == 1) {
			Xpos = Player.getX();
			Zpos = Player.getZ();
			sprintTick++;
		} if(sprintTick == 3) {
			sprintTick = 1;
			Xdiff = Player.getX() - Xpos;
			Zdiff = Player.getZ() - Zpos;
			Entity.setVelX(Player.getEntity(),Xdiff);
			Entity.setVelZ(Player.getEntity(),Zdiff);
			Xdiff = 0;
			Zdiff = 0;
		} if(sprintTick != 1) {
			sprintTick++;
		}
	}

if (stevef == 1)
{
var ex =Entity.getX(steve);
var ey =Entity.getY(steve);
var ez =Entity.getZ(steve);
if (Math.sqrt(Math.pow(Player.getX() - Entity.getX(steve), 2) +  Math.pow(Player.getZ() - Entity.getZ(steve), 2)) < 5) return;
var angle = Math.atan2((Player.getZ() - Entity.getZ(steve)), (Player.getX() - Entity.getX(steve)));
Entity.setVelX(steve,(Math.cos(angle) * 0.2));
Entity.setVelZ(steve,(Math.sin(angle) * 0.2));
Entity.setRot(steve, (((angle * 180) / Math.PI) - 90), Entity.getPitch(steve));
} 
if(stevef == 1 && getTile(ex,ey,ez+1) || getTile(ex,ey,ez-1) || getTile(ex+1,ey,ez+1) || getTile(ex-1,ey,ez) )
{
setVelY(steve,0.55)
}

/*if(herobrine == 1){

countdown--;

var moans = Math.floor ((Math.random() * 7) + 1);
{
if(countdown==0&&moans==1)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.burp", 100, 30);
countdown = 500;
}
else if(countdown==0&&moans==2)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.burp", 100, 30);
countdown = 500;
}
else if(countdown==0&&moans==3)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.pop", 100, 30);
countdown = 500;
}
else if(countdown==0&&moans==4)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.burp", 100, 30);
countdown = 500;
}
else if(countdown==0&&moans==5)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "sound/aac/ghast/moan5.ogg", 100, 30);
countdown = 500;
}
else if(countdown==0&&moans==6)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "sound/aac/ghast/moan6.ogg", 100, 30);
countdown = 500;
}
else if(countdown==0&&moans==7)
{
Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "sound/aac/ghast/moan7.ogg", 100, 30);
countdown = 500;
}

}

}*/

}
    
    
    
function procCmd(cmd) 
{
var mc = cmd.split(" ");
var cm = mc[0]
switch(cm.toLowerCase())
{

case 'test':
{
night = true
setNightMode(night)
clientMessage(ChatColor.RED + "Test Mode On"); 
addItemInventory(247, 1,0);
addItemInventory(4,1,0);
addItemInventory(87,5,0);
addItemInventory(41,4,0);
addItemInventory(259,1,0);
addItemInventory(49,1,0);
addItemInventory(504,1,0);
addItemInventory(369,1,0);
addItemInventory(332,16,0);
break;
}

case 'inv':
{
if(herobrine == 1)
{
hr = 0
invisible = 1
clientMessage(ChatColor.RED + "Invisibility On");
}
break;
}

case 'invoff':
{
if(herobrine == 1)
{
hr = 1
invisible = 0
clientMessage(ChatColor.RED + "Invisibility Off");
break;
}
}
}

}

function attackHook(attacker, victim){
if(getCarriedItem()==369){
Entity.setFireTicks(victim, 1200);
}

if(victim==steve&&getCarriedItem()!=266&&getCarriedItem()!=38)
{
Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.hurt", 100, 30);
}

if(victim==steve&&getCarriedItem()==369&&stevef==1)
{
stevef = 0;
clientMessage("<Steve>Thank you for setting me free");
preventDefault();
}

if(victim==player && herobrine==1){

Level.playSound(Player.getX(), Player.getY(), Player.getZ(), "random.break", 100, 30);

}

}

/*function viewbtns(){

ctx.runOnUiThread(new Runnable({
run:function(){
try{
var layout = new LinearLayout(ctx);
var GUI = new Widget.PopupWindow();
var invbtn = new Button(ctx);

if(invisible == 1){
invbtn.setText("Invisible");
}else if(invisible == 0){
invbtn.setText("Visible");
}

layout.setOrientation(LinearLayout.VERTICAL);
layout.addView(invbtn);

GUI.setContentView(layout);
GUI.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | Gravity.LEFT, 0, 0); 

invbtn.setOnClickListener(new View.OnClickListener({
onClick:function(){

if(invisible == 0){
hr = 0;
invisible = 1;
clientMessage(ChatColor.RED + "Invisibility On");
}else if(invisible == 1){
hr = 1;
invisible = 0;
clientMessage(ChatColor.RED + "Invisibility Off");
}
}
}));

}catch(e){
print(" Error: " + e);
}
}
}));

}*/

function entityRemovedHook(entity) {

  snowball = entity;

  snowballX = Math.floor(Entity.getX(snowball));
		 snowballY = Math.floor(Entity.getY(snowball));
			snowballZ = Math.floor(Entity.getZ(snowball));
	entities.splice(entities.indexOf(entity));
	if(Entity.getEntityTypeId(entity) == 81 && pearlActive == 1) {
		snowball = entity;
		snowballThrown = 0;
		if(snowballX >= 0 && snowballX <= 255 && snowballZ >= 0 && snowballZ <= 255) {
			Entity.setPosition(Player.getEntity(),snowballX+0.5,snowballY+2,snowballZ+0.5);
		}
	}
}

function leaveGame(){

guishow = 0;
pearlActive = 0;
herobrine = 0;
sprintMode = false;
sprintTick = 1;
ModPE.setGameSpeed(normalGameTicks);

ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
if(GUI != null){
GUI.dismiss();
}
}
});

}

function opendisguises(){

ctx.runOnUiThread(new Runnable({

run:function(){

try{

var disguisela = new LinearLayout(ctx);
var disguisedi = new Dialog(ctx);
var scroll = new ScrollView(ctx);

var pigbtn = new Button(ctx);
var cowbtn = new Button(ctx);
var chickenbtn = new Button(ctx);
var sheepbtn = new Button(ctx);
var zombiebtn = new Button(ctx);
var skeletonbtn = new Button(ctx);
var spiderbtn = new Button(ctx);
var creeperbtn = new Button(ctx);
var zombiepigbtn = new Button(ctx);
var irongolembtn = new Button(ctx);
var endermanbtn = new Button(ctx);
var witherbtn = new Button(ctx);
var undesbtn = new Button(ctx);
var playerbtn = new Button(ctx);

disguisela.setOrientation(LinearLayout.VERTICAL);

pigbtn.setText("Pig");
cowbtn.setText("Cow");
chickenbtn.setText("Chicken");
sheepbtn.setText("Sheep");
zombiebtn.setText("Zombie");
skeletonbtn.setText("Skeleton");
spiderbtn.setText("Spider");
creeperbtn.setText("Creeper");
zombiepigbtn.setText("Zombie Pigman");
irongolembtn.setText("Iron Golem");
endermanbtn.setText("Enderman");
witherbtn.setText("Wither");
undesbtn.setText("Undisguise");
playerbtn.setText("Player");

pigbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
pigbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
cowbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
cowbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
chickenbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
chickenbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
sheepbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
sheepbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
zombiebtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
zombiebtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
skeletonbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
skeletonbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
spiderbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
spiderbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
creeperbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
creeperbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
zombiepigbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
zombiepigbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
irongolembtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
irongolembtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
endermanbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
endermanbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
witherbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
witherbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
undesbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
undesbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);
playerbtn.setHeight(LinearLayout.LayoutParams.WRAP_CONTENT);
playerbtn.setWidth(LinearLayout.LayoutParams.WRAP_CONTENT);

disguisela.addView(pigbtn);
disguisela.addView(cowbtn);
disguisela.addView(chickenbtn);
disguisela.addView(sheepbtn);
disguisela.addView(zombiebtn);
disguisela.addView(skeletonbtn);
disguisela.addView(spiderbtn);
disguisela.addView(creeperbtn);
disguisela.addView(zombiepigbtn);
//disguisela.addView(irongolembtn);
disguisela.addView(endermanbtn);
disguisela.addView(witherbtn);
disguisela.addView(playerbtn);
disguisela.addView(undesbtn);

scroll.addView(disguisela);

disguisedi.setContentView(scroll);
disguisedi.setTitle("Disguises");

disguisedi.show()

pigbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 8);
Entity.setMobSkin(getPlayerEnt(), "mob/pig.png");
clientMessage("You are a pig.");
disguisedi.dismiss();
hr = 0;

}

}));

cowbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 7);
Entity.setMobSkin(getPlayerEnt(), "mob/cow.png");
clientMessage("You are a cow.");
disguisedi.dismiss();
hr = 0;

}

}));

chickenbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 6);
Entity.setMobSkin(getPlayerEnt(), "mob/chicken.png");
clientMessage("You are a chicken.");
disguisedi.dismiss();
hr = 0;

}

}));

sheepbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 9);
Entity.setMobSkin(getPlayerEnt(), "mob/sheep_0.png");
clientMessage("You are a sheep.");
disguisedi.dismiss();
hr = 0;

}

}));

zombiebtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 11);
Entity.setMobSkin(getPlayerEnt(), "mob/zombie.png");
clientMessage("You are a zombie.");
disguisedi.dismiss();
hr = 0;

}

}));

skeletonbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 12);
Entity.setMobSkin(getPlayerEnt(), "mob/skeleton.png");
addItemInventory(261,1);
addItemInventory(262,64);
clientMessage("You are a skeleton.");
disguisedi.dismiss();
hr = 0;

}

}));

spiderbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 13);
Entity.setMobSkin(getPlayerEnt(), "mob/spider.png");
clientMessage("You are a spider.");
disguisedi.dismiss();
hr = 0;

}

}));

creeperbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 14);
Entity.setMobSkin(getPlayerEnt(), "mob/creeper.png");
clientMessage("You are a creeper.");
disguisedi.dismiss();
hr = 0;

}

}));

zombiepigbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 3);
Entity.setMobSkin(getPlayerEnt(), "mob/pigzombie.png");
addItemInventory(283, 1);
clientMessage("You are a zombiepigman.");
disguisedi.dismiss();
hr = 0;

}

}));

irongolembtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 13);
clientMessage("You are an iron golem.");
disguisedi.dismiss();
hr = 0;
Entity.setRenderType(getPlayerEnt(), golemRenderer.renderType);
Entity.setMobSkin(getPlayerEnt(), "mob/golem.png");

}

}));

endermanbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

var cow = Entity.setRenderType(getPlayerEnt(), 7);
clientMessage("You are an enderman.");
disguisedi.dismiss();
hr = 0;
entitysetenderman();

}

}));

witherbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), witherRenderer.renderType);
Entity.setMobSkin(getPlayerEnt(), "mob/wither.png");
clientMessage("You are a wither.");
disguisedi.dismiss();
hr = 0;

}

}));

undesbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 3);
Entity.setMobSkin(getPlayerEnt(), "mob/herobrine.png");
clientMessage("You are undisguised.");
disguisedi.dismiss();
hr = 0;

}

}));

playerbtn.setOnClickListener(new View.OnClickListener({

onClick:function(){

Entity.setRenderType(getPlayerEnt(), 3);
Entity.setMobSkin(getPlayerEnt(), "mob/char.png");
clientMessage("You are a player.");
disguisedi.dismiss();
hr = 0;

}

}));


}catch(e){

print("Error: " + e);

}

}

}));

}

function entitysetenderman(){

Entity.setRenderType(cow, endermanRenderer.renderType);
Entity.setMobSkin(cow, "mob/enderman.png");

}

//wither render thanks to hexdro and Lu_Lu54

var witherRenderer = Renderer.createHumanoidRenderer();
addWitherToRenderer(witherRenderer);
var ballRenderer = Renderer.createHumanoidRenderer();
addBallToRenderer(ballRenderer);

function addWitherToRenderer(renderer)
{
var model = renderer.getModel();
var body = model.getPart("body").clear().setTextureOffset(32, 16);
body.addBox(-10, 0.5, 1, 19, 2, 4, 0);
body.addBox(-13, -6.5, -1, 7, 6, 6, 0);
body.addBox(6, -6.5, -1, 7, 6, 6, 0);
body.addBox(-2, 0, 2.5, 4, 14, 4, 0);
body.addBox(-6, 4, 2.7, 11, 2.5, 2, 0);
body.addBox(-6, 7, 2.7, 11, 2.5, 2, 0);
body.addBox(-6, 10, 2.7, 11, 2.5, 2, 0);
body.addBox(-2, 10, 4, 3, 6, 3, 0);
body.addBox(-2, 12, 6, 3, 4, 3, 0);
model.getPart("rightArm").clear()
model.getPart("leftArm").clear()
model.getPart("leftLeg").clear()
model.getPart("rightLeg").clear()
}

function addBallToRenderer(renderer)
{
var model2 = renderer.getModel();
model2.getPart("body").clear();
model2.getPart("rightArm").clear()
model2.getPart("leftArm").clear()
model2.getPart("leftLeg").clear()
model2.getPart("rightLeg").clear()
}

//iron golem thanks to tengus

var golemRenderer = Renderer.createHumanoidRenderer();

addGolemToRenderer(golemRenderer);

var block1 = 86;
var block2 = 42;

function addGolemToRenderer(renderer)
 {
	var var2 = 0;
	
	var model = renderer.getModel();
	
	var bipedBody = model.getPart("body").clear().setTextureOffset(56, 0);
	
	bipedBody.addBox(-6.0, -16.0, -2.0, 20, 15, 10, var2);
	
	 bipedBody.addBox(-2.0, -1.0, -2.0, 12, 5, 10, var2);
	
	
	var bipedHead =
model.getPart("head").clear().setTextureOffset(56, 0);

	 bipedBody.addBox(-1.0, -27.0, -3.0, 10, 12, 10, var2);
	 
	 bipedBody.addBox(2.6, -18.8, -4.5, 3, 5.5, 3, var2);
	 
	 
	 var bipedRightArm = model.getPart("rightArm").clear().setTextureOffset(56, 0);
	
	bipedRightArm.addBox(-7.0, -16.0, -1.0, 6, 37, 8, var2);
	
 var bipedLeftArm = model.getPart("leftArm").clear().setTextureOffset(56, 0);
 
	bipedLeftArm.addBox(9.0, -16.0, -1.0, 6, 37, 8, var2);
	
	var bipedRightLeg = model.getPart("rightLeg").clear().setTextureOffset(56, 0);
	
	bipedRightLeg.addBox(8.0, -8.0, -1.0, 6.5, 20, 9, var2);
	
	var bipedLeftLeg = model.getPart("leftLeg").clear().setTextureOffset(56, 0);
	
	bipedLeftLeg.addBox(-6, -8.0, -1.0, 6.5, 20, 9, var2);
	
}

//thanks to zhuowei

var endermanRenderer = Renderer.createHumanoidRenderer();


addEndermanToRenderer(endermanRenderer);

function addEndermanToRenderer(renderer) {

	var var2 = 0;

	var model = renderer.getModel();

	var bipedBody = model.getPart("body").clear().setTextureOffset(32, 16);

	bipedBody.addBox(-4.0, 0.0, -2.0, 8, 12, 4, var2);

	var bipedRightArm = model.getPart("rightArm").clear().setTextureOffset(56, 0);

	bipedRightArm.addBox(-1.0, -2.0, -1.0, 2, 30, 2, var2);

	var bipedLeftArm = model.getPart("leftArm").clear().setTextureOffset(56, 0);

	bipedLeftArm.addBox(-1.0, -2.0, -1.0, 2, 30, 2, var2);

	var bipedRightLeg = model.getPart("rightLeg").clear().setTextureOffset(56, 0);

	bipedRightLeg.addBox(-1.0, 0.0, -1.0, 2, 30, 2, var2);

	var bipedLeftLeg = model.getPart("leftLeg").clear().setTextureOffset(56, 0);

	bipedLeftLeg.addBox(-1.0, 0.0, -1.0, 2, 30, 2, var2);

}

