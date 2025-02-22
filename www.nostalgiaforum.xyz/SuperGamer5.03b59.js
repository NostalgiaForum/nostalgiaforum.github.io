/**SuperGamer 5.0**/
/**Superior MCPE Gaming**/

var GUI, sgOptions, sgOBtn, rac;
var isRunning = false;
var Xpos=0;
var Zpos=0;
var s=1; 
var Xdiff=0;
var Zdiff=0;
var isGettingInfo = false;
var number = android.text.InputType.TYPE_CLASS_NUMBER;
var style = 0;
var zombieDrop, creeperDrop, pigzDrop, spiderDrop, skeletonDrop, pigDrop, cowDrop, sheepDrop, chickenDrop;
var zombieSkin, creeperSkin, pigzSkin, spiderSkin, skeletonSkin, pigSkin, cowSkin, sheepSkin, chickenSkin;
var version = "5.0";
var isCrouching = false;
var iDialog;
var portBtn = [];
var warps = [];
var port = [];

var sgDir;

ModPE.saveData("new version", "true");

function sgMessage(msg){

clientMessage(ChatColor.BLUE + "[SG]: " + ChatColor.WHITE + msg);

}

function createModPEDir(){

var sdcard = android.os.Environment.getExternalStorageDirectory();
var mcpeDir = new java.io.File(sdcard.getAbsolutePath(), "games/com.mojang/");
var modpe = new java.io.File(mcpeDir, "ModPE/");
sgDir = new java.io.File(modpe, "SuperGamer/");
sgDir.mkdirs();

}

var Option = {NAME: "name"};

function getOptionAttr(attr){

var sdcard = android.os.Environment.getExternalStorageDirectory();
var mcpeDir = new java.io.File(sdcard.getAbsolutePath(), "games/com.mojang/");
var optionsDir = new java.io.File(mcpeDir, "minecraftpe/");
var optionsFile = new java.io.File(optionsDir, "options.txt");
var br = new java.io.BufferedReader(new java.io.FileReader(optionsFile));
var str, prop;
var ln = new Array();

while((str = br.readLine()) != null){

ln.push(str);

}

i = ln.join().replace(",", ":");
prop = i.split(":");

return prop[prop.indexOf(attr) + 1];

}

createModPEDir();

Player.setSneaking = function(boolean){

Entity.setSneaking(Player.getEntity(), boolean);

}

Player.getHealth = function(){

Entity.getHealth(Player.getEntity());

}



function newLevel(){

clientMessage("Welcome, " + ChatColor.GREEN + getOptionAttr("mp_username") + ChatColor.WHITE + "!");

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread(new java.lang.Runnable(){

run: function(){

try{

//SuperGamer
var sgLayout = new android.widget.LinearLayout(ctx);
var tmi = new android.widget.Button(ctx);
var gm = new android.widget.Button(ctx);
var misc = new android.widget.Button(ctx);

//TooManyItems
var tmiLayout = new android.widget.LinearLayout(ctx);
var id = new android.widget.EditText(ctx);
var amount = new android.widget.EditText(ctx);
var data = new android.widget.EditText(ctx);
var add = new android.widget.Button(ctx);
var ref = new android.widget.Button(ctx);

//Gamemode Change
var gmLayout = new android.widget.LinearLayout(ctx);
var survivalBtn = new android.widget.Button(ctx);
var creativeBtn = new android.widget.Button(ctx);

//Misc Menu
var miscLayout1 = new android.widget.LinearLayout(ctx);
var miscScroll = new android.widget.ScrollView(ctx);
var miscLayout = new android.widget.LinearLayout(ctx);
var rHealth = new android.widget.Button(ctx);
var dHealth = new android.widget.Button(ctx);
var day = new android.widget.Button(ctx);
var night = new android.widget.Button(ctx);
var spawn = new android.widget.Button(ctx);
var teleport = new android.widget.Button(ctx);
var me = new android.widget.Button(ctx);
var switchWorld = new android.widget.Button(ctx);
var warpMenu = new android.widget.Button(ctx);
var info = new android.widget.Button(ctx);

//Teleport Menu
var tpLayout = new android.widget.LinearLayout(ctx);
var tvX = new android.widget.TextView(ctx);
var tvY = new android.widget.TextView(ctx);
var tvZ = new android.widget.TextView(ctx);
var etX = new android.widget.EditText(ctx);
var etY = new android.widget.EditText(ctx);
var etZ = new android.widget.EditText(ctx);
var tpBtn = new android.widget.Button(ctx);
var spBtn = new android.widget.Button(ctx);

//Run and Crouch
var racLayout = new android.widget.LinearLayout(ctx);
var run = new android.widget.Button(ctx);
var crouch = new android.widget.Button(ctx);

//SGOptions
var sgOptionsLayout = new android.widget.LinearLayout(ctx);
var sgDialogLayout = new android.widget.LinearLayout(ctx);
sgOBtn = new android.widget.Button(ctx);
var btnSize = new android.widget.EditText(ctx);
var setSize = new android.widget.Button(ctx);
var showGUI = new android.widget.Button(ctx);
var styleCycle = new android.widget.Button(ctx);
var btnPosition = new android.widget.Button(ctx);
var isShowing = true;
var size = btnSize.getText();

//Mob Editor
var meLayout = new android.widget.LinearLayout(ctx);
var meLayout1 = new android.widget.LinearLayout(ctx);
var meScroll = new android.widget.ScrollView(ctx);
var zombieTv = new android.widget.TextView(ctx);
zombieDrop = new android.widget.EditText(ctx);
zombieSkin = new android.widget.EditText(ctx);
var creeperTv = new android.widget.TextView(ctx);
creeperDrop = new android.widget.EditText(ctx);
creeperSkin = new android.widget.EditText(ctx);
var spiderTv = new android.widget.TextView(ctx);
spiderDrop = new android.widget.EditText(ctx);
spiderSkin = new android.widget.EditText(ctx);
var skeletonTv = new android.widget.TextView(ctx);
skeletonDrop = new android.widget.EditText(ctx);
skeletonSkin = new android.widget.EditText(ctx);
var pigzTv = new android.widget.TextView(ctx);
pigzDrop = new android.widget.EditText(ctx);
pigzSkin = new android.widget.EditText(ctx);
var pigTv = new android.widget.TextView(ctx);
pigDrop = new android.widget.EditText(ctx);
pigSkin = new android.widget.EditText(ctx);
var cowTv = new android.widget.TextView(ctx);
cowDrop = new android.widget.EditText(ctx);
cowSkin = new android.widget.EditText(ctx);
var sheepTv = new android.widget.TextView(ctx);
sheepDrop = new android.widget.EditText(ctx);
sheepSkin = new android.widget.EditText(ctx);
var chickenTv = new android.widget.TextView(ctx);
chickenDrop = new android.widget.EditText(ctx);
chickenSkin = new android.widget.EditText(ctx);
var apply = new android.widget.Button(ctx);
var spawnEnt = new android.widget.Button(ctx);

//Warps
var warpLayout = new android.widget.LinearLayout(ctx);
var warpName = new android.widget.EditText(ctx);
var setWarp = new android.widget.Button(ctx);

//Drawables and Bitmaps and Fonts

var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "games/com.mojang/ModPE/SuperGamer/");

var imgF = new java.io.File(dir, "button.png");
var wImgF = new java.io.File(dir, "window.png");
var fontF = new java.io.File(dir, "font.ttf");

if(imgF.exists() && wImgF.exists() && fontF.exists()){

var src = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModPE/SuperGamer/button.png");
var img = new android.graphics.drawable.BitmapDrawable(src);
var wSrc = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModPE/SuperGamer/window.png");
var wImg = new android.graphics.drawable.BitmapDrawable(wSrc);
var font = new android.graphics.Typeface.createFromFile(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/ModPE/SuperGamer/", "font.ttf"));

}

//SuperGamer Topic
var webLayout = new android.widget.LinearLayout(ctx);
var wv = new android.webkit.WebView(ctx);
var webSet = wv.getSettings();

webSet.setJavaScriptEnabled(true);
wv.setWebChromeClient(new android.webkit.WebChromeClient());
wv.setWebViewClient(new android.webkit.WebViewClient());

wv.loadUrl("http://www.minecraftforum.net/topic/2067228-supergamertoomanyitems-gamemode-change-moreupdated-version-43new-custom-creative-inventory-and-custom-spawn/");

webLayout.addView(wv);

//ID reference
var refWV = new android.webkit.WebView(ctx);
var refWVSettings = refWV.getSettings();
refWVSettings.setJavaScriptEnabled(true);
refWV.setWebChromeClient(new android.webkit.WebChromeClient());
refWV.setWebViewClient(new android.webkit.WebViewClient());
refWV.loadUrl("http://minecraft.gamepedia.com/Data_values_(Pocket_Edition)");

//World Switcher
var wsLayout = new android.widget.LinearLayout(ctx);
var wsDialog = new android.app.Dialog(ctx);
var wName = new android.widget.EditText(ctx);
var wSwitch = new android.widget.Button(ctx);

//Buttons
tmi.setText("TooManyItems");
gm.setText("Gamemode");
run.setText("Run");
misc.setText("Misc");

crouch.setText("Crouch");

add.setText("Add Item");
ref.setText("ID Reference");

survivalBtn.setText("Survival");
creativeBtn.setText("Creative");

rHealth.setText("Restore Health");
dHealth.setText("Suicide");
day.setText("Day");
night.setText("Night");
spawn.setText("Set Spawn");
teleport.setText("Teleport");
me.setText("Mob Editor");
info.setText("Information");

tpBtn.setText("Teleport!");
spBtn.setText("Home");

sgOBtn.setText("SG");

setSize.setText("Apply");
styleCycle.setText("Default Style");
btnPosition.setText("SG Button Position");
showGUI.setText("Show/Hide GUI");

apply.setText("Apply");
spawnEnt.setText("Spawn Entities");

switchWorld.setText("In-Game World Switcher");
wSwitch.setText("Go!");

warpMenu.setText("Warp System");
setWarp.setText("Set Warp");

var btn = [tmi, gm, run, misc, survivalBtn, creativeBtn, rHealth, dHealth, day, night, spawn, teleport, info, sgOBtn, setSize, showGUI, styleCycle, me, crouch, spawnEnt, btnPosition, wSwitch, switchWorld, warpMenu, setWarp];

function setButtonSize(s){

for(var x = 0; x < btn.length; x++){

btn[x].setTextSize(parseInt(s));

}

}

setButtonSize(15);

function setButtonStyle(i, f){

for(var x = 0; x < btn.length; x++){

if(f != null){

btn[x].setTypeface(f);

}
if(i != null){

btn[x].setBackgroundDrawable(i);

}
if(i == null){

btn[x].setBackgroundDrawable(add.getBackground());

}
if(f == null){

btn[x].setTypeface(add.getTypeface());

}
}
}

if(imgF.exists() && wImgF.exists() && fontF.exists()){

setButtonStyle(img, font);

}

//TextViews
tvX.setText("X:");
tvY.setText("Y:");
tvZ.setText("Z:");

zombieTv.setText("Zombie");
zombieTv.setTextSize(20);
creeperTv.setText("Creeper");
creeperTv.setTextSize(20);
skeletonTv.setText("Skeleton");
skeletonTv.setTextSize(20);
spiderTv.setText("Spider");
spiderTv.setTextSize(20);
pigzTv.setText("Zombie Pigman");
pigzTv.setTextSize(20);
pigTv.setText("Pig");
pigTv.setTextSize(20);
cowTv.setText("Cow");
cowTv.setTextSize(20);
sheepTv.setText("Sheep");
sheepTv.setTextSize(20);
chickenTv.setText("Chicken");
chickenTv.setTextSize(20)

//EditTexts
id.setHint("Item ID");
amount.setHint("Amount");
data.setHint("Data/Damage");
data.setText("0");
id.setInputType(number);
amount.setInputType(number);
data.setInputType(number);

wName.setHint("World Name");
warpName.setHint("Warp Name");

etX.setInputType(number);
etY.setInputType(number);
etZ.setInputType(number);
etX.setHint("X");
etY.setHint("Y");
etZ.setHint("Z");

btnSize.setHint("Size");
btnSize.setText("15");
btnSize.setInputType(number);

zombieDrop.setHint("Drop");
zombieSkin.setHint("Skin");
creeperDrop.setHint("Drop");
creeperSkin.setHint("Skin");
skeletonDrop.setHint("Drop");
skeletonSkin.setHint("Skin");
spiderDrop.setHint("Drop");
spiderSkin.setHint("Skin");
pigzDrop.setHint("Drop");
pigzSkin.setHint("Skin");
pigDrop.setHint("Drop");
pigSkin.setHint("Skin");
cowDrop.setHint("Drop");
cowSkin.setHint("Skin");
sheepDrop.setHint("Drop");
sheepSkin.setHint("Skin");
chickenDrop.setHint("Drop");
chickenSkin.setHint("Skin");

//Layouts
sgLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
sgLayout.setGravity(android.view.Gravity.RIGHT);
sgLayout.addView(tmi);
sgLayout.addView(gm);
sgLayout.addView(misc);

racLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
racLayout.addView(run);
racLayout.addView(crouch);

tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
tmiLayout.setBackgroundDrawable(null);
//tmiLayout.setPadding(25);
tmiLayout.addView(id);
tmiLayout.addView(amount);
tmiLayout.addView(data);
tmiLayout.addView(add);
tmiLayout.addView(ref);

gmLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
gmLayout.setBackgroundDrawable(null);
//gmLayout.setPadding(25);
gmLayout.addView(survivalBtn);
gmLayout.addView(creativeBtn);

miscLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
miscLayout1.setOrientation(android.widget.LinearLayout.VERTICAL);
miscScroll.addView(miscLayout);
miscLayout1.addView(miscScroll);
//miscLayout1.setPadding(25);
miscLayout.addView(rHealth);
miscLayout.addView(dHealth);
miscLayout.addView(day);
miscLayout.addView(night);
miscLayout.addView(spawn);
miscLayout.addView(teleport);
miscLayout.addView(me);
miscLayout.addView(switchWorld);
//miscLayout.addView(warpMenu);
miscLayout.addView(info);

tpLayout.setGravity(android.view.Gravity.CENTER);
tpLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
tpLayout.addView(etX);
tpLayout.addView(etY);
tpLayout.addView(etZ);
tpLayout.addView(tpBtn);

sgOptionsLayout.addView(sgOBtn);

sgDialogLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
sgDialogLayout.setBackgroundDrawable(null);
sgDialogLayout.addView(btnSize);
sgDialogLayout.addView(setSize);

if(imgF.exists() && wImgF.exists() && fontF.exists()){

sgDialogLayout.addView(styleCycle);

}

sgDialogLayout.addView(btnPosition);
sgDialogLayout.addView(showGUI);

meLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
meLayout1.setOrientation(android.widget.LinearLayout.VERTICAL);
meLayout.addView(zombieTv);
meLayout.addView(zombieDrop);
meLayout.addView(zombieSkin);
meLayout.addView(creeperTv);
meLayout.addView(creeperDrop);
meLayout.addView(creeperSkin);
meLayout.addView(skeletonTv);
meLayout.addView(skeletonDrop);
meLayout.addView(skeletonSkin);
meLayout.addView(spiderTv);
meLayout.addView(spiderDrop);
meLayout.addView(spiderSkin);
meLayout.addView(pigzTv);
meLayout.addView(pigzDrop);
meLayout.addView(pigzSkin);
meLayout.addView(pigTv);
meLayout.addView(pigDrop);
meLayout.addView(pigSkin);
meLayout.addView(cowTv);
meLayout.addView(cowDrop);
meLayout.addView(cowSkin);
meLayout.addView(sheepTv);
meLayout.addView(sheepDrop);
meLayout.addView(sheepSkin);
meLayout.addView(chickenTv);
meLayout.addView(chickenDrop);
meLayout.addView(chickenSkin);
meScroll.addView(meLayout);
meLayout1.addView(meScroll);
meLayout.addView(apply);

wsLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
wsLayout.addView(wName);
wsLayout.addView(wSwitch);

var warpScroll = new android.widget.ScrollView(ctx);
var warpLayout1 = new android.widget.LinearLayout(ctx);
warpLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
warpLayout1.setOrientation(android.widget.LinearLayout.VERTICAL);
warpLayout.addView(warpName);
warpLayout.addView(setWarp);
warpLayout.addView(warpScroll);
warpScroll.addView(warpLayout1);

//Dialogs
var tmiDialog = new android.app.Dialog(ctx);
tmiDialog.setContentView(tmiLayout);
tmiDialog.setTitle("TooManyItems");

var gmDialog = new android.app.Dialog(ctx);
gmDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
gmDialog.setContentView(gmLayout);
gmDialog.setTitle("Change Gamemode");

var miscDialog = new android.app.Dialog(ctx); 
miscDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
miscDialog.setContentView(miscLayout1);
miscDialog.setTitle("Miscelaneous Options");

var tpDialog = new android.app.Dialog(ctx);
tpDialog.setContentView(tpLayout);
tpDialog.setTitle("Teleport");

var options = new android.app.Dialog(ctx);
options.setContentView(sgDialogLayout);
options.setTitle("SuperGamer Options");

var meDialog = new android.app.Dialog(ctx);
meDialog.setContentView(meLayout1);
meDialog.setTitle("Mob Editor");

var update = new android.app.Dialog(ctx);
update.setContentView(webLayout);
update.setTitle("Check for Updates - Current Version: " + version);

wsDialog.setContentView(wsLayout);
wsDialog.setTitle("In-Game World Switcher");

var refDialog = new android.app.Dialog(ctx);
refDialog.setContentView(refWV);
refDialog.setTitle("ID Reference");

var warpDialog = new android.app.Dialog(ctx);
warpDialog.setContentView(warpLayout);
warpDialog.setTitle("Warp System");

var builder = new android.app.AlertDialog.Builder(ctx);
builder.setTitle("Information");
builder.setMessage("Created by Arjay07 \n©2013 Arjay07 \n\nCurrent Version: "+ version +"\n\nChangelog:\n Version 3.1- \n*Initial Release\n\nVersion 4.0- \nAdditions:\n*Added day/night switch \n*Added Suicide Button \n\nFixes:\n*Fixed GUI bug \n*Fixed inventory clear bug\n*Fixed Run button text\n\nVersion 4.3- \nAdditions: \n*Spawn button\n*Teleport system\n*TooManyItems adds custom creative items\n*Screenshot button\n\nFixes:\n*Number keyboard in TooManyItems\n*Miscelaneous Menu scroll\n\nVersion BETA1-\nAdditions:\n*New GUI Look!\n\nFixes:\n*None :)\n\nVersion 4.5- \nAdditions:\n*New GUI Look!\n*Mob Editor\n*Show/Hide Button\n*Button style cycle\n*Check for updates button\n\nFixes:\n*Fixed GUI not showing again after game is left\n\nVersion 5.0- \nAdditions:\n*Android 2.3.x Support(Thanks to MrARM)\n*Updated Mob Editor\n*H...I shouldn't say\n*Customizable SG button position\n*Run and Crouch\n*Welcome message\n*In-Game World Switcher\n*Block and Item ID reference\n*Titles back to dialog windows\n\nFixes-\n*Crash when mobs die\n*GUI Images no longer required\n*Removed Herobrine ;)");
builder.setNegativeButton("Ok", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

iDialog.dismiss();

}

});
builder.setNeutralButton("Check for Updates", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

update.show();

}

});

iDialog = builder.create();

if(ModPE.readData("new version") == "true"){

iDialog.show();
clientMessage("SuperGamer version " + ChatColor.AQUA + version + ChatColor.WHITE + "\nCreated by " + ChatColor.RED + "Arjay07");

ModPE.saveData("new version", "false");

}

//GUI
GUI = new android.widget.PopupWindow(sgLayout, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 60);

//SuperGamer Options
sgOptions = new android.widget.PopupWindow(sgOptionsLayout, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
sgOptions.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);

//Run and Crouch
rac = new android.widget.PopupWindow(racLayout, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
rac.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0, 150);

//Button actions

tmi.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(view){

tmiDialog.show();

}

});

switchWorld.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

wsDialog.show();

}

});

wSwitch.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

try{

if(wName.getText()!=""){

ModPE.selectLevel(wName.getText());

}else{

print("Please enter a world name");

}

}catch(e){

print("Error: " + e);

}

wsDialog.dismiss();

}

});

//Warp buttons

warpMenu.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

warpDialog.show();

}

});

setWarp.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

var warpFile = new java.io.File(sgDir, "Warps/" + warpName.getText() + ".warp");
warpFile.mkdirs();
warpFile.createNewFile();
try{
var fos = new java.io.FileOutputStream(warpFile);

fos.write(new java.lang.String(Player.getX() + "\n" + Player.getY() + "\n" + Player.getZ()));

}
catch(e){

print("Error: " + e);

}

var list = new File(sgDir, "Warps").listFiles();

for(var i = 0; i < list.length; i++){

var br = new java.io.BufferedReader(new java.io.FileReader(list[i]));
var str;
var data = new java.lang.StringBuilder();

while((str = br.readLine()) != null){

data.append(str);
data.append(":");

}

var collected = data.toString();
var coords = collected.split(":");
var warpX = parseInt(coords[0]);
var warpY = parseInt(coords[1]);
var warpZ = parseInt(coords[2]);

var btn = new android.widget.Button(ctx);
btn.setText(""+list[i].getName().replace(".warp", ""));
btn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

Entity.setPosition(Player.getEntity(), warpX, warpY, warpZ);

}

});

}

}

});

add.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

var itemId = parseInt(id.getText());
var iAmount = parseInt(amount.getText());
var iData = parseInt(data.getText());

if(itemId == null){

itemId = "0";

}

if(iData == null){

iData = "0";

}

Player.addItemInventory(itemId, iAmount, iData);

if(Level.getGameMode() == 1){

Entity.setCarriedItem(getPlayerEnt(), itemId, iAmount, iData);

}

tmiDialog.dismiss();

}

});

//Gamemode Change Buttons

gm.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

gmDialog.show();

}

});

survivalBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

if(Level.getGameMode() != parseInt("0")){

Level.setGameMode(parseInt("0"));
sgMessage("Gamemode set to Survival");

}

gmDialog.dismiss();

}

});

creativeBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

if(Level.getGameMode() != 1){

Level.setGameMode(1);
sgMessage("Gamemode set to Creative");

}

gmDialog.dismiss();

}

});

//Running and Walking
run.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

if(isRunning){

isRunning = false;
run.setText("Run");

}
else if(!isRunning){

isRunning = true;
run.setText("Walk");

}

}

});

crouch.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

if(!isCrouching){

Player.setSneaking(true);
crouch.setText("Stand");

isCrouching = true;

}
else if(isCrouching){

Player.setSneaking(false);
crouch.setText("Crouch");

isCrouching = false;

}

}

});

misc.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

miscDialog.show();

}

});

day.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

Level.setTime(0);
miscDialog.dismiss();

}

});

night.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

Level.setTime(14000);
miscDialog.dismiss();

}

});

rHealth.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

Player.setHealth(20);
miscDialog.dismiss();

}

});

dHealth.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

Player.setHealth(0);
miscDialog.dismiss();

}

});

info.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

iDialog.show();

}

});

spawn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

var builder = new android.app.AlertDialog.Builder(ctx);
builder.setMessage("Are you sure you want to set your spawn here?");
builder.setPositiveButton("Yes", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

Level.setSpawn(Player.getX(), Player.getY(), Player.getZ());

sgMessage("Spawn set!");

dialog.dismiss();
miscDialog.dismiss();

return true;

}

});

builder.setNegativeButton("No", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

dialog.dismiss();
miscDialog.dismiss();

return false;

}

});

var dialog = builder.create();
dialog.show();

}

});

teleport.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

tpDialog.show();

}

});

tpBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

var tx = parseInt(etX.getText());
var ty = parseInt(etY.getText());
var tz = parseInt(etZ.getText());

Entity.setPosition(getPlayerEnt(), tx, ty, tz);

tpDialog.dismiss();
miscDialog.dismiss();

}

});

sgOBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

options.show();

}

});

setSize.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

setButtonSize(btnSize.getText());
options.dismiss();

}

});

showGUI.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

if(isShowing){

GUI.dismiss();
rac.dismiss();
isShowing = false
options.dismiss();

}
else if(isShowing == false){

isShowing = true;
options.dismiss()

GUI.setContentView(sgLayout);
GUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 60);

rac = new android.widget.PopupWindow(racLayout, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
rac.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0, 150);

}

}

});

if(imgF.exists() && wImgF.exists() && fontF.exists()){

styleCycle.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

if(style == 0){

setButtonStyle(null, null);
styleCycle.setText("New Style");
style = 1;

}

else if(style == 1){

setButtonStyle(wImg, font);
styleCycle.setText("Minecraft Style");
style = 2;

}

else if(style == 2){

setButtonStyle(img, font);
styleCycle.setText("Default Style");
style = 0;

}

options.dismiss();

}

});

}

ref.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

refDialog.show();

}

});

me.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(){

meDialog.show();

}

});

apply.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

//var ent = [10, 11, 12, 13, 32, 33, 34, 35, 36];
//var skin = [chickenSkin, sheepSkin, cowSkin, pigSkin, zombieSkin, creeperSkin, skeletonSkin, spiderSkin, pigzSkin];

meDialog.dismiss();

if(chickenSkin.getText() != ""){

setAllEntSkin(10, chickenSkin.getText());

}

if(sheepSkin.getText() != ""){

setAllEntSkin(13, sheepSkin.getText());

}

if(cowSkin.getText() != ""){

setAllEntSkin(11, cowSkin.getText());

}

if(pigSkin.getText() != ""){

setAllEntSkin(12, pigSkin.getText());

}

if(zombieSkin.getText() != ""){

setAllEntSkin(32, zombieSkin.getText());

}

if(creeperSkin.getText() != ""){

setAllEntSkin(33, creeperSkin.getText());

}

if(skeletonSkin.getText() != ""){

setAllEntSkin(34, skeletonSkin.getText());

}

if(spiderSkin.getText() != ""){

setAllEntSkin(35, spiderSkin.getText());

}

if(pigzSkin.getText() != ""){

setAllEntSkin(36, pigzSkin.getText());

}

}

});

btnPosition.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(p1){

var builder = new android.app.AlertDialog.Builder(ctx);
builder.setTitle("SG Button Position");

builder.setPositiveButton("Top-Right", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

dialog.dismiss();

sgOptions.dismiss();
sgOptions.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP|android.view.Gravity.RIGHT, 55, 0);

}

});

builder.setNegativeButton("Top-Left", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

dialog.dismiss();

sgOptions.dismiss();
sgOptions.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP|android.view.Gravity.LEFT, 0, 0);

}

});

builder.setNeutralButton("Bottom-Right", new android.content.DialogInterface.OnClickListener(){

onClick: function(p1){

dialog.dismiss();

sgOptions.dismiss();
sgOptions.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM|android.view.Gravity.RIGHT, 0, 0);

}

});

var dialog = builder.create();
dialog.show();

}

});

}
catch(e){

print("Error: " + e);

}

}});

}

function leaveGame(){

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread(new java.lang.Runnable(){

run: function(){

if(GUI != null){

GUI.dismiss();

}
if(sgOptions != null){

sgOptions.dismiss();

}

if(rac != null){

rac.dismiss();

}

}

});

}

function modTick(){

if(isRunning){

//From WhyTofu's Sprint Mod
if(s==1)
      {
			   Xpos=getPlayerX();
        Zpos=getPlayerZ();
        s = s + 1;
      }
      else if(s==3)
      {
        s=1;
        Xdiff=getPlayerX()-Xpos;
        Zdiff=getPlayerZ()-Zpos;
        setVelX(getPlayerEnt(),Xdiff);
        setVelZ(getPlayerEnt(),Zdiff);
        Xdiff=0;
        Zdiff=0;
      }
  if(s!=1)
  {
  s = s + 1;
  }

}else if(isRunning==false){

return null;

}

}

function deathHook(murderer, victim){

if(Entity.getEntityTypeId(victim) == 32 && zombieDrop.getText() != "0"){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(zombieDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 33 && creeperDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(creeperDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 34 && skeletonDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(skeletonDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 35 && spiderDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(spiderDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 10 && chickenDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(chickenDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 11 && cowDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(cowDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 12 && pigDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(pigDrop.getText()), 1);

}

else if(Entity.getEntityTypeId(victim) == 13 && sheepDrop.getText() != "" ){

Level.dropItem(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 0, parseInt(sheepDrop.getText()), 1);

}

}

//Mob Editor

var entities = new Array();

function entityAddedHook(ent){

entities.push(ent);

}

function entityRemovedHook(ent){

entities.splice(entities.indexOf(ent));

}

function setAllEntSkin(entType, skin){

for(var i = 0; i < entities.length; i++){

if(Entity.getEntityTypeId(entities[i]) == entType){

Entity.setMobSkin(entities[i], skin);

}

}

}

function replaceEntity(mob1, mob2){

for(var i = 0; i < entities.length; i++){

if(Entity.getEntityTypeId(entities[i]) == mob1){

Entity.remove(entities[i]);
Level.spawnMob(Entity.getX(entities[i]), Entity.getY(entities[i]), Entity.getZ(entities[i]), mob2);

}

}

}

function blockAddedHook(x, y, z, block){

if(block == 55){



}

}

function useItem(x, y, z, itemId, blockId, side){

if(itemId <= 255){

blockAddedHook(x, y, z, itemId);

}

}

function warpTo(x, y, z, world){

if(world != null){

ModPE.selectLevel(world);
setPosition(Player.getEntity(), x, y, z);

}else{

setPosition(Player.getEntity(), x, y, z);

}

}