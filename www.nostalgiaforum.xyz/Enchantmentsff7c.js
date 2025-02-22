//Enchantment Mod By Metamorposis_2
//DO NOT MODIFY AND DO NOT GET PART OF CODE ON THIS MOD.

Block.defineBlock(207, "Emerald Block", ["emerald_block", 0], 1, false, 0);
Block.setDestroyTime(207, 5.3);
Block.defineBlock(206, "Emerald Ore", ["emerald_ore", 0], 1, false, 0);
Block.setDestroyTime(206, 5.3);
Block.defineBlock(205,"Enchantment Table",[["obsidian",0],["enchanting_table_top",0],["enchanting_table_side",0],["enchanting_table_side",0],["enchanting_table_side",0],["enchanting_table_side",0]],49,true,0);
Block.setDestroyTime(205,60);
Block.setShape(205,0,0,0,1,0.75,1);
Item.addCraftRecipe(205,1,0,[49,4,0, 340,1,0, 264,2,0]);
ModPE.setItem(210,"emerald",0,"Emerald");
ModPE.setItem(211,"pickaxe",0,"Smelters Pickaxe");
ModPE.setItem(212,"pickaxe",0,"Exploding Pickaxe");
Item.addCraftRecipe(207, 1, 0, [210, 9, 0]);

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var activity = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Gui;
var GUI;
var gUI;
var paths = android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
var level = 0;
var damage = 0;
var damagesword = 0;
var damageshovel = 0;
var damageaxe = 0;
var damagehoe = 0;
var sss;
var sf;
var jumped = 0;
var waterwalking = 0;
var jumphigher = 0;
var power = 0;
var fireenchant = 0;
var silktouchs = 0;
var silktouchp = 0;
var efficiencys = 0;
var efficiencyp = 0;
var efficiencya = 0;
var knockenchant = 0;
var walkfaster = 0;
var explodem = 0;
var treechopper = 0;
var sharpness = 0;
var regeneration = 0;
var unbreakingh = 0;
var unbreakingc = 0;
var unbreakingl = 0;
var unbreakingb = 0;
var featherfalling = 0;
var fireprotect = 0;
var looting = 0;
var instaw = 0;
var instac = 0;
var instam = 0;
var instap = 0;
var instapu = 0;
var instab = 0;
var fortune = 0;
var infinity = 0;
var fire = 0;
var diamond = 56;
var iron = 15;
var gold = 14;
var redstone = 73;
var coal = 16;
var lapis = 21;
var unbreaking = 0;
var up = 278;
var up1 = 285;
var up2 = 257;
var up3 = 274;
var up4 = 270;
var unbreakingsword = 0;
var us = 276;
var us1 = 283;
var us2 = 267;
var us3 = 272;
var us4 = 268;
var unbreakingshovel = 0;
var uss = 277;
var uss1 = 284;
var uss2 = 256;
var uss3 = 273;
var uss4 = 269;
var xx = Player.getX();
var yy = Player.getY();
var zz = Player.getZ();
var openedworld = 0;
var checkupdate = 0;
var enableupdate = 0;
var isRunning = false;
var s=1; 
var Xpos=0;
var Zpos=0;
var Xdiff=0;
var Zdiff=0;
var version = 15;
//Beatz_Unknown"s Variable
var blocktime = [null, 1.5, 0.6, 0.5, 2, 2, 0, -1, null, null, null, null, 0.5, 0.6, 3, 3, 3, 2, 0.2, 0.6, 0.3, 3, 3, null, 0.8, null, 0.2, 0.7, null, null, 4, 0, 0, null, null, 0.8, null, 0, 0, 0, 0, 3, 5, 2, 2, 2, 0, 1.5, 2, 50, 0, 0, null, 2, 2.5, null, 3, 5, 2.5, 0, 0.6, 3.5, 3.5, 1, 3, 0.4, 0.7, 2, 1, null, null, 5, null, 3, 3, null, null, null, 0.1, 0.5, 0.2, 0.4, 0.6, 0, null, 2, 1, 0.4, 0.3, null, 1, 0.5, null, null, -1, 3, null, 1.5, null, null, 5, 0.3, 1, 0, 0, null, 2, 2, 1.5, null, null, 2, null, 2, null, null, null, null, null, null, null, null, null, null, null, null, null, 0.8, null, null, null, null, null, 2, 2, 2, null, null, 2, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, 0.8, 0.8, 2, 2, null, null, null, null, null, null, null, null, null, null, null, 0.5, 0.1, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 3.5, 50, 5, 0.6, 0.6, 5, null, null, null, null, 0];
var versionCheck=CheckForUpdates();
//Daw's Variable Special Thanks to his variable and his Code
var versionChecked=false;
if(version<versionCheck && !versionChecked){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			versionChecked=true;
			var alert=new android.app.AlertDialog.Builder(activity);
			alert.setTitle("New Update Available for Enchantment");
			alert.setMessage("Currently available version: "+versionCheck+"\nYour version: "+version+"\nNew Things Added: \n*Fixed Tree Chopper and Reduced Lag\n*Added an Update Checker\n*Now Modtick works"); 
			alert.setPositiveButton("Update",new android.content.DialogInterface.OnClickListener(){
				onClick: function(dialog,whichButton){
					try{
						activity.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW,android.net.Uri.parse("https://www.dropbox.com/s/mnhqv7pusy0zi52/Enchantments.js")));
						}
					catch(err){
						print(err);
						}
					}
				});
			alert.setNegativeButton("Later",new android.content.DialogInterface.OnClickListener(){
				onClick: function(dialog,whichButton){}
				});
			alert.show();
			}
		}));
	}
function CheckForUpdates(){
	var out=new java.io.ByteArrayOutputStream();
	var response=android.net.http.AndroidHttpClient.newInstance("CheckForUpdates()").execute(new org.apache.http.client.methods.HttpGet("https://dl.dropboxusercontent.com/s/r8gcomqf0hmk2hj/Enchantment%20Update.txt")).getEntity().writeTo(out);
	out.close();
	return Number(String(out.toString()));
	}

function restoretime(){
//Beatz_Unknown"s Function
for(var D = 0; D<= 200; D++){
Block.setDestroyTime(D, blocktime[D]);
}
}

function procCmd(cmd){
if(cmd =="custom fortune"){
customFortune();
fortune = 0;

} else if(cmd =="enable auto check update"){
enableupdate = 1;
print("Enabled Auto Check for Update");

} else if(cmd =="disabled auto check update"){
enableupdate = 0;
print("Disabled Auto Check for Update");

} else if(cmd =="check update"){
CheckforUpdates();
}
}

function customFortune(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){ 
try{
gUI = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
var texts = new android.widget.EditText(ctx);
var doneboon = new android.widget.Button(ctx);
doneboon.setText("Set");
texts.setHint("Fortune Level"); 
layout.setOrientation(android.widget.LinearLayout.VERTICAL);
layout.addView(texts);
layout.addView(doneboon);
var dialog = new android.app.Dialog(ctx);
dialog.setContentView(layout);
dialog.setTitle("Custom Fortune");
gUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
gUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
gUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP, 0, 0);
dialog.show();
doneboon.setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(view){
var sf = texts.getText();
if(fortune == 0) {
level = texts.getText();
fortune = 2;
dialog.dismiss();

}
}
 
});
 
} catch (e){
print ("Error: "+e)
}

}});
}

function newLevel()
{  
opened = 1;
check();
clientMessage("<Enchantment>:By \n§5Metamorposis_2\nSpecial Thanks to This People \n§cNatekrell \n§1DAW \n§aBeatz_Unknown\n§4Whytofu");
}

function attackHook(a,v){

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==276)
    {
       Entity.setFireTicks(v, 3);
         
    }

var ourItem = getCarriedItem();
  if(knockenchant == 1 && ourItem==276)
    if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(v, x*2);
			setVelY(v, 1);
			setVelZ(v, z*2);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
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
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
         
    }

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==268)
    {
       Entity.setFireTicks(v, 3);
         
    }

var ourItem = getCarriedItem();
  if(knockenchant == 1 && ourItem==268)
    if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(v, x*2);
			setVelY(v, 1);
			setVelZ(v, z*2);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
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
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
         
    }

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==267)
    {
       Entity.setFireTicks(v, 3);
         
    }

var ourItem = getCarriedItem();

  if(knockenchant == 1 && ourItem==267)
    if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(v, x*2);
			setVelY(v, 1);
			setVelZ(v, z*2);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
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

			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
         
    }

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==272)
    {
       Entity.setFireTicks(v, 3);
         
    }

var ourItem = getCarriedItem();
  if(knockenchant == 1 && ourItem==272)
    if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(v, x*2);
			setVelY(v, 1);
			setVelZ(v, z*2);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
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
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
         
    }

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==283)
    {
       Entity.setFireTicks(v, 3);
         
    }

var ourItem = getCarriedItem();
  if(knockenchant == 1 && ourItem==283)
   if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(v, x*2);
			setVelY(v, 1);
			setVelZ(v, z*2);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
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
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
         
    }

var ourItem = getCarriedItem();
  if(explodem == 1 && ourItem==38)
    {
         Level.explode(Entity.getX(v), Entity.getY(v), Entity.getZ(v), 1)
         
    }

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==38)
    {
       Entity.setFireTicks(v, 3);
         
    }

var ourItem = getCarriedItem();
  if(knockenchant == 1 && ourItem==38)
    if(getYaw() < 0){
			var hit = getYaw()+90;
			for(go=0; hit<0; go++)
			{
				hit+= 360;
			}
			x = Math.cos(hit*(Math.PI/180));
			z = Math.sin(hit*(Math.PI/180));
			setVelX(v, x*2);
			setVelY(v, 1);
			setVelZ(v, z*2);
		}
		else if(getYaw() > 0 && getYaw() < 360)
		{
			var hit = getYaw()+90;
			XVel = Math.cos(hit*(Math.PI/180));
			ZVel= Math.sin(hit*(Math.PI/180));
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
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
			setVelX(v, XVel*2);
			setVelY(v, 1);
			setVelZ(v, ZVel*2);
         
    }

var ourItem = getCarriedItem();
  if(ourItem == 276  &&  unbreakingsword == 1  &&  Player.getCarriedItemData()+damage) 
   {
      Entity.setCarriedItem(getPlayerEnt(), us, Player.getCarriedItemCount(), Player.getCarriedItemData()+damagesword)
      damagesword = 0;
         
    }

var ourItem = getCarriedItem();
  if(ourItem == 283  &&  unbreakingsword == 1  &&  Player.getCarriedItemData()+damage) 
   {
      Entity.setCarriedItem(getPlayerEnt(), us, Player.getCarriedItemCount(), Player.getCarriedItemData()+damagesword)
      damagesword = 0;
         
    }

var ourItem = getCarriedItem();
  if(ourItem == 267  &&  unbreakingsword == 1  &&  Player.getCarriedItemData()+damage) 
   {
      Entity.setCarriedItem(getPlayerEnt(), us, Player.getCarriedItemCount(), Player.getCarriedItemData()+damagesword)
      damagesword = 0;
         
    }

var ourItem = getCarriedItem();
  if(ourItem == 272  &&  unbreakingsword == 1  &&  Player.getCarriedItemData()+damage) 
   {
      Entity.setCarriedItem(getPlayerEnt(), us, Player.getCarriedItemCount(), Player.getCarriedItemData()+damagesword)
      damagesword = 0;
         
    }

var ourItem = getCarriedItem();
  if(ourItem == 268  &&  unbreakingsword == 1  &&  Player.getCarriedItemData()+damage) 
   {
      Entity.setCarriedItem(getPlayerEnt(), us, Player.getCarriedItemCount(), Player.getCarriedItemData()+damagesword)
      damagesword = 0;
         
    }

  var ourItem = getCarriedItem();
  if(sharpness == 1 && ourItem==267)
    {
       Entity.setHealth(v, Entity.getHealth(v)-1.5);
         
    }

  var ourItem = getCarriedItem();
  if(sharpness == 1 && ourItem==268)
    {
       Entity.setHealth(v, Entity.getHealth(v)-1.5);
         
    }

  var ourItem = getCarriedItem();
  if(sharpness == 1 && ourItem==272)
    {
       Entity.setHealth(v, Entity.getHealth(v)-1.5);
         
    }

  var ourItem = getCarriedItem();
  if(sharpness == 1 && ourItem==276)
    {
       Entity.setHealth(v, Entity.getHealth(v)-2);
         
    }

  var ourItem = getCarriedItem();
  if(sharpness == 1 && ourItem==283)
    {
       Entity.setHealth(v, Entity.getHealth(v)-1.5);
         
    }

}

function useItem(x,y,z,itemId,blockId,side)
{
if(itemId == 276 &&  blockId == 205)
{
enchantmenusword()
}
if(itemId == 277  &&   blockId == 205)
{
enchantmenushovel()
}
if(itemId == 278  &&   blockId == 205)
{
enchantmenupickaxe()
}
if(itemId == 268  &&   blockId == 205)
{
enchantmenusword()
}
if(itemId == 272  &&   blockId == 205)
{
enchantmenusword()
}
if(itemId == 283  &&   blockId == 205)
{
enchantmenusword()
}
if(itemId == 267  &&   blockId == 205)
{
enchantmenusword()
}
if(itemId == 257  &&   blockId == 205)
{
enchantmenupickaxe()
}
if(itemId == 270  &&   blockId == 205)
{
enchantmenupickaxe()
}
if(itemId == 274  &&   blockId == 205)
{
enchantmenupickaxe()
}
if(itemId == 285  &&   blockId == 205)
{
enchantmenupickaxe()
}
if(itemId == 269  &&   blockId == 205)
{
enchantmenushovel()
}
if(itemId == 273  &&   blockId == 205)
{
enchantmenushovel()
}
if(itemId == 256  &&   blockId == 205)
{
enchantmenushovel()
}
if(itemId == 284  &&   blockId == 205)
{
enchantmenushovel()
}
if(itemId == 38  &&   blockId == 205)
{
enchantmenurose()
}
if(itemId == 279  &&   blockId == 205)
{
enchantmenuaxe()
}
if(itemId == 286  &&   blockId == 205)
{
enchantmenuaxe()
}
if(itemId == 275  &&   blockId == 205)
{
enchantmenuaxe()
}
if(itemId == 271  &&   blockId == 205)
{
enchantmenuaxe()
}
if(itemId == 258  &&   blockId == 205)
{
enchantmenuaxe()
}
if(itemId == 293  &&   blockId == 205)
{
enchantmenuhoe()
}
if(itemId == 294  &&   blockId == 205)
{
enchantmenuhoe()
}
if(itemId == 292  &&   blockId == 205)
{
enchantmenuhoe()
}
if(itemId == 291  &&   blockId == 205)
{
enchantmenuhoe()
}
if(itemId == 290  &&   blockId == 205)
{
enchantmenuhoe()
}
if(itemId == 293  &&   blockId == 3   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 293  &&   blockId == 2   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 290  &&   blockId == 3   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 290  &&   blockId == 2   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 291  &&   blockId == 3   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 291  &&   blockId == 2   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 292  &&   blockId == 3   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 292  &&   blockId == 2   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 294  &&   blockId == 3   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 294  &&   blockId == 2   &&   instaw == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 59)
}
if(itemId == 261   &&   blockId == 205)
{
enchantmenubow()
}
if(itemId == 293  &&   blockId == 3   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 293  &&   blockId == 2   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 290  &&   blockId == 3   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 290  &&   blockId == 2   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 291  &&   blockId == 3   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 291  &&   blockId == 2   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 292  &&   blockId == 3   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 292  &&   blockId == 2   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 294  &&   blockId == 3   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 294  &&   blockId == 2   &&   instac == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 141)
}
if(itemId == 293  &&   blockId == 3   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 293  &&   blockId == 2   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 290  &&   blockId == 3   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 290  &&   blockId == 2   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 291  &&   blockId == 3   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 291  &&   blockId == 2   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 292  &&   blockId == 3   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 292  &&   blockId == 2   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 294  &&   blockId == 3   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 294  &&   blockId == 2   &&   instap == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 142)
}
if(itemId == 293  &&   blockId == 3   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 293  &&   blockId == 2   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 290  &&   blockId == 3   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 290  &&   blockId == 2   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 291  &&   blockId == 3   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 291  &&   blockId == 2   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 292  &&   blockId == 3   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 292  &&   blockId == 2   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 294  &&   blockId == 3   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 294  &&   blockId == 2   &&   instam == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 105)
}
if(itemId == 293  &&   blockId == 3   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 293  &&   blockId == 2   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 290  &&   blockId == 3   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 290  &&   blockId == 2   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 291  &&   blockId == 3   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 291  &&   blockId == 2   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 292  &&   blockId == 3   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 292  &&   blockId == 2   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 294  &&   blockId == 3   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 294  &&   blockId == 2   &&   instapu == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 104)
}
if(itemId == 293  &&   blockId == 3   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 293  &&   blockId == 2   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 290  &&   blockId == 3   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 290  &&   blockId == 2   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 291  &&   blockId == 3   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 291  &&   blockId == 2   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 292  &&   blockId == 3   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 292  &&   blockId == 2   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 294  &&   blockId == 3   &&   instab == 1)
{
setTile(x,y,z, 60)
setTile(x,y+1,z, 244)
}
if(itemId == 211)
{
setTile(x,y+1,z, 51);
}
if(itemId == 310  &&  blockId == 205)
{
enchantmenuhelmet();
}
if(itemId == 311  &&  blockId == 205)
{
enchantmenuchestplate();
}
if(itemId == 312  &&  blockId == 205)
{
enchantmenulegging();
}
if(itemId == 313  &&  blockId == 205)
{
enchantmenuboots();
}

}

function attackbutton(){

ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){
 
try{
 
GUI = new android.widget.PopupWindow();

var layout = new android.widget.LinearLayout(ctx);
var p = new android.widget.Button(ctx);
 
layout.setOrientation(android.widget.LinearLayout.VERTICAL);
layout.setGravity(android.view.Gravity.RIGHT);
layout.addView(p);

p.setText("X");

GUI.setContentView(layout);
GUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);

p.setOnClickListener(new android.view.View.OnClickListener(){
 
onClick: function(){
if(fire == 1) {
var playerYaw = Entity.getYaw(Player.getEntity());
        var playerPitch = Entity.getPitch(Player.getEntity());
        velY = Math.sin((playerPitch - 180) / 180 * Math.PI);
        velX = Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        velZ = -1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        entity = Level.spawnMob(Player.getX() + velX * 2, Player.getY(), Player.getZ() + velZ * 2, 80);
        if(fire == 1){
            Entity.setFireTicks(entity, 60);
        }
        setVelX(entity, velX * 2);
        setVelY(entity, velY);
        setVelZ(entity, velZ * 2);  


}
}
 
});
 
} catch (e){
print ("Error: "+e)
}

}});
}

function hideattackbutton() {

ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){

if(GUI != null){

GUI.dismiss();

 
}

}
 
});
 
}

function leaveGame() {

ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){

if(GUI != null){

GUI.dismiss();

 
}

}
 
});
 
}

function enchantmenusword(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  fireaspect= new android.widget.Button(ctx); 
fireaspect .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details1()
 
}
})
fireaspect.setText(" Fire Aspect  ")
fireaspect.setTextSize(20)
menu.addView(fireaspect); 


var  kb= new android.widget.Button(ctx); 
kb .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details5()
 
}
})
kb.setText(" Knockback  ")
kb.setTextSize(20)
menu.addView(kb); 


var  usword= new android.widget.Button(ctx); 
usword .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details14()
 
}
})
usword.setText(" Unbreaking  ")
usword.setTextSize(20)
menu.addView(usword); 


var  l= new android.widget.Button(ctx); 
l .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details16()

 
}
})
l.setText(" Looting  ")
l.setTextSize(20)
menu.addView(l); 


var  sh= new android.widget.Button(ctx); 
sh .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details23()
 
}
})
sh.setText(" Sharpness  ")
sh.setTextSize(20)
menu.addView(sh); 

dialog.show()

} catch (e){

print ("Error: "+e)
}
}});
}

function enchantmenubow(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  fireaspect= new android.widget.Button(ctx); 
fireaspect .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details12()
 
}
})
fireaspect.setText(" Fire  ")
fireaspect.setTextSize(20)
menu.addView(fireaspect); 


var  kb= new android.widget.Button(ctx); 
kb .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details13()
 
}
})
kb.setText(" Infinity  ")
kb.setTextSize(20)
menu.addView(kb); 


var  p= new android.widget.Button(ctx); 
p .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details22()
 
}
})
p.setText(" Power  ")
p.setTextSize(20)
menu.addView(p); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenuhoe(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  wheatc= new android.widget.Button(ctx); 
wheatc .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details9()
 
}
})
wheatc.setText("  Instant Wheat Seed  ")
wheatc.setTextSize(20)
menu.addView(wheatc); 


var  c1= new android.widget.Button(ctx); 
c1 .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details17()
 
}
})
c1.setText("  Instant Carrot Seed  ")
c1.setTextSize(20)
menu.addView(c1); 


var  c2= new android.widget.Button(ctx); 
c2 .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details18()
 
}
})
c2.setText("  Instant Potato Seed  ")
c2.setTextSize(20)
menu.addView(c2); 


var  c3= new android.widget.Button(ctx); 
c3 .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details19()
 
}
})
c3.setText("  Instant Melon Seed  ")
c3.setTextSize(20)
menu.addView(c3); 


var  c4= new android.widget.Button(ctx); 
c4 .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details20()
 
}
})
c4.setText("  Instant Pumpkin Seed  ")
c4.setTextSize(20)
menu.addView(c4); 


var  c5= new android.widget.Button(ctx); 
c5 .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details21()
 
}
})
c5.setText("  Instant Beetroot Seed  ")
c5.setTextSize(20)
menu.addView(c5); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenuaxe(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  tc= new android.widget.Button(ctx); 
tc .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details8()
 
}
})
tc.setText(" Tree Chopper  ")
tc.setTextSize(20)
menu.addView(tc); 


var  ea= new android.widget.Button(ctx); 
ea .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details24()
 
}
})
ea.setText(" Efficiency  ")
ea.setTextSize(20)
menu.addView(ea); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenurose(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  fireaspectr= new android.widget.Button(ctx); 
fireaspectr .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details1()
 
}
})
fireaspectr.setText(" Fire Aspect  ")
fireaspectr.setTextSize(20)
menu.addView(fireaspectr); 


var  kb= new android.widget.Button(ctx); 
kb .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details5()
 
}
})
kb.setText(" Knockback  ")
kb.setTextSize(20)
menu.addView(kb); 


var  ee= new android.widget.Button(ctx); 
ee .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details7()
 
}
})
ee.setText(" Explode  ")
ee.setTextSize(20)
menu.addView(ee); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenushovel(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  silktouchs= new android.widget.Button(ctx); 
silktouchs .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details2()
 
}
})
silktouchs.setText(" Silk Touch  ")
silktouchs.setTextSize(20)
menu.addView(silktouchs); 


var  efficiencys= new android.widget.Button(ctx); 
efficiencys .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details3()
 
}
})
efficiencys.setText(" Efficiency  ")
efficiencys.setTextSize(20)
menu.addView(efficiencys); 


var  ubs= new android.widget.Button(ctx); 
ubs .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details15()
 
}
})
ubs.setText(" Unbreaking  ")
ubs.setTextSize(20)
menu.addView(ubs); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenuhelmet(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  r= new android.widget.Button(ctx); 
r .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details25()
 
}
})
r.setText(" Regeneration  ")
r.setTextSize(20)
menu.addView(r); 


var  uh= new android.widget.Button(ctx); 
uh .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details26()
 
}
})
uh.setText(" Unbreaking  ")
uh.setTextSize(20)
menu.addView(uh); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenuchestplate(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  uh= new android.widget.Button(ctx); 
uh .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details27()
 
}
})
uh.setText(" Unbreaking  ")
uh.setTextSize(20)
menu.addView(uh); 


var  fp= new android.widget.Button(ctx); 
fp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details28()
 
}
})
fp.setText(" Fire Protection  ")
fp.setTextSize(20)
menu.addView(fp); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenulegging(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  u= new android.widget.Button(ctx); 
u .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details29()
 
}
})
u.setText(" Unbreaking  ")
u.setTextSize(20)
menu.addView(u); 


var  ww= new android.widget.Button(ctx); 
ww .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details32()
 
}
})
ww.setText(" Water Walking  ")
ww.setTextSize(20)
menu.addView(ww); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenuboots(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  u= new android.widget.Button(ctx); 
u .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details30()
 
}
})
u.setText(" Unbreaking  ")
u.setTextSize(20)
menu.addView(u); 


var  ff= new android.widget.Button(ctx); 
ff .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details31()
 
}
})
ff.setText(" Feather Falling  ")
ff.setTextSize(20)
menu.addView(ff); 


var  wf= new android.widget.Button(ctx); 
wf .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details33()
 
}
})
wf.setText(" Walk Faster  ")
wf.setTextSize(20)
menu.addView(wf); 


var  jh= new android.widget.Button(ctx); 
jh .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details34()
 
}
})
jh.setText(" Jump Higher  ")
jh.setTextSize(20)
menu.addView(jh); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function enchantmenupickaxe(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Available Enchantment  ");



var  efficiencypp= new android.widget.Button(ctx); 
efficiencypp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details4()
 
}
})
efficiencypp.setText(" Efficiency  ")
efficiencypp.setTextSize(20)
menu.addView(efficiencypp); 


var  silktouchpp= new android.widget.Button(ctx); 
silktouchpp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details6()
 
}
})
silktouchpp.setText(" Silk Touch  ")
silktouchpp.setTextSize(20)
menu.addView(silktouchpp); 


var  fp= new android.widget.Button(ctx); 
fp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details10()
 
}
})
fp.setText(" Fortune  ")
fp.setTextSize(20)
menu.addView(fp); 


var  u= new android.widget.Button(ctx); 
u .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
details11()
 
}
})
u.setText(" Unbreaking  ")
u.setTextSize(20)
menu.addView(u); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function entityAddedHook(entity){
	if(Entity.getEntityTypeId(entity)==80 ){
		
	}
	if(Entity.getEntityTypeId(entity)==80 && infinity==1){
		addItemInventory(262,1);
       }
       if(Entity.getEntityTypeId(entity)==80 && fire==1){
		Entity.setFireTicks(entity, 2000);
       }
       if(Entity.getEntityTypeId(entity)==80 && power==1){
         var playerYaw = Entity.getYaw(Player.getEntity());
        var playerPitch = Entity.getPitch(Player.getEntity());
       velY = Math.sin((playerPitch - 180) / 180 * Math.PI);
        velX = Math.sin(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);
        velZ = -1 * Math.cos(playerYaw / 180 * Math.PI) * Math.cos((playerPitch - 180) / 180 * Math.PI);

        setVelX(entity, velX * 1.5);
        setVelY(entity, velY);
        setVelZ(entity, velZ * 1.5);  
	}
}

function details1(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var q = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(q)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Fire Aspect  ");
q.setText("Sets Your Victim To Fire for 2 seconds");
q.setTextSize(20)



var  eds= new android.widget.Button(ctx); 
eds .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fireenchant = 1;
print("Fire Aspect Has Been Enchanted To your Sword");
dialog.dismiss()
 
}
})
eds.setText(" Enchant ")
eds.setTextSize(20)
menu.addView(eds); 


var  ufa= new android.widget.Button(ctx); 
ufa .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fireenchant = 0;
print("Fire Aspect Has Been Removed To your Sword");
dialog.dismiss()
 
}
})
ufa.setText(" Unenchant ")
ufa.setTextSize(20)
menu.addView(ufa); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details2(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Silk Touch  ");
qq.setText("You Can Now Get Your Glass back when you place it in the wrong place");
qq.setTextSize(20)



var  es= new android.widget.Button(ctx); 
es .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
silktouchs = 1;
print("Silk Touch Has Been Enchanted To your Shovel");
dialog.dismiss()
 
}
})
es.setText(" Enchant ")
es.setTextSize(20)
menu.addView(es); 


var  ust= new android.widget.Button(ctx); 
ust .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
silktouchs = null;
print("Silk Touch Has Been Removed To your Shovel");
dialog.dismiss()
 
}
})
ust.setText(" Unenchant ")
ust.setTextSize(20)
menu.addView(ust); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details3(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Efficiency  ");
qqq.setText("Destroy Grass,Sand,Dirt,Gravel Much Easier");
qqq.setTextSize(20)



var  ee= new android.widget.Button(ctx); 
ee .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
efficiencys = 1;
print("Efficiency Has Been Enchanted To your Shovel");
dialog.dismiss()
 
}
})
ee.setText(" Enchant ")
ee.setTextSize(20)
menu.addView(ee); 


var  ues= new android.widget.Button(ctx); 
ues .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
efficiencys = 0;
print("Efficiency Has Been Removed To your Shovel");
dialog.dismiss()
 
}
})
ues.setText(" Unenchant ")
ues.setTextSize(20)
menu.addView(ues); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details4(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Efficiency  ");
qqqq.setText("Makes your Mining Life Much Easier");
qqqq.setTextSize(20)



var  ep= new android.widget.Button(ctx); 
ep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
efficiencyp = 1;
print("Efficiency Has Been Enchanted To your Pickaxe");
dialog.dismiss()
 
}
})
ep.setText(" Enchant ")
ep.setTextSize(20)
menu.addView(ep); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
efficiencyp = 0;
print("Efficiency Has Been Removed To your Pickaxe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details5(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Knockback  ");
qqqqq.setText("Knocks your Enemy Back");
qqqqq.setTextSize(20)



var  es= new android.widget.Button(ctx); 
es .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
knockenchant = 1;
print("Knockback Has Been Enchanted To your Sword");
dialog.dismiss()
 
}
})
es.setText(" Enchant ")
es.setTextSize(20)
menu.addView(es); 



var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
knockenchant = 0;
print("Knockback Has Been Removed To your Sword");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details6(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Silk Touch  ");
qqqqqq.setText(" You Can Now Get Your Glass back when you place it in the wrong place ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
silktouchp = 1;
print("Silk Touch Has Been Enchanted To your Pickaxe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
silktouchp = 0;
print("Silk Touch Has Been Removed To your Pickaxe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details7(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Explode  ");
qqqqq.setText("Makes your attacked mob with the cyan flower will explode");
qqqqq.setTextSize(20)



var  es= new android.widget.Button(ctx); 
es .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
explodem = 1;
print("Explode Has Been Enchanted To your Cyan Flower");
dialog.dismiss()
 
}
})
es.setText(" Enchant ")
es.setTextSize(20)
menu.addView(es); 



var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
explodem = 0;
print("Explode Has Been Removed To your Cyan Rose");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details8(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Tree Chopper  ");
qqqqqq.setText(" Instantly Destroy Tree (Destroy The Bottom Part Of The Tree) ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
treechopper = 1;
print("Tree Chopper Has Been Enchanted To your Axe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
treechopper = 0;
print("Tree Chopper Has Been Removed To your Axe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details9(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Instant Wheat Seed  ");
qqqqqq.setText(" Instantly makes an wheat crop for you ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instaw = 1;
print("Insta Wheat Has Been Enchanted To your Hoe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instaw = 0;
print("Insta Wheat Has Been Removed To your Hoe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details10(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Fortune  ");
qqqqqq.setText(" Random Chance to get more Items From Ore's and Automatically smelt Them ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fortune = 1;
print("Fortune Has Been Enchanted To your Pickaxe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fortune = 0;
print("Fortune Has Been Removed To your Pickaxe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
} 

function details11(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Unbreaking  ");
qqqqqq.setText(" Makes your Pickaxe much more usable than after 100+ blocks you destroy your pick will destroy but with the unbreaking you can use it much longer than normal ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreaking = 1;
print("Unbreaking Has Been Enchanted To your Pickaxe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreaking = 0;
print("Unbreaking Has Been Removed To your Pickaxe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details12(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Fire  ");
qqqqqq.setText(" Release fire Arrows at your Enemy ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fire = 1;
print("Fire Has Been Enchanted To your Bow");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fire = 0;
print("Fire Has Been Removed To your Bow");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details13(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Infinity  ");
qqqqqq.setText(" Get 1 Arrow Only this Enchant will make it Infinite ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
infinity = 1;
print("Infinity Has Been Enchanted To your Bow");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
infinity = 0;
print("Infinity Has Been Removed To your Bow");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details14(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Unbreaking  ");
qqqqqq.setText(" don't need to take damage when you enchant Unbreaking ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingsword = 1;
print("Unbreaking Has Been Enchanted To your Sword");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingsword = 0;
print("Unbreaking Has Been Removed To your Sword");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details15(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Unbreaking  ");
qqqqqq.setText(" don't need to take damage when you enchant Unbreaking ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingshovel = 1;
print("Unbreaking Has Been Enchanted To your Shovel");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingshovel = 0;
print("Unbreaking Has Been Removed To your Shovel");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details16(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Looting  ");
qqqqqq.setText(" Kill Mobs and they will have a random chance to drop more stuff's than normal ");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
looting = 1;
print("Looting Has Been Enchanted To your Sword");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
looting = 0;
print("Looting Has Been Removed To your Sword");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details17(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Insta Carrot Seed  ");
qqqqqq.setText(" Instantly makes an carrot crop for you");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instac = 1;
print("Insta Carrot Seed Has Been Enchanted To your Hoe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instac = 0;
print("Insta Carrot Seed Has Been Removed To your Hoe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details18(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Insta Potato Seed  ");
qqqqqq.setText(" Instantly makes an potato crop for you");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instap = 1;
print("Insta Potato Seed Has Been Enchanted To your Hoe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instap = 0;
print("Insta Potato Seed Has Been Removed To your Hoe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details19(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Insta Melon Seed  ");
qqqqqq.setText(" Instantly makes an melon crop for you");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instam = 1;
print("Insta Melon Seed Has Been Enchanted To your Hoe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instam = 0;
print("Insta Melon Seed Has Been Removed To your Hoe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details20(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Insta Pumpkin Seed  ");
qqqqqq.setText(" Instantly makes an pumpkin crop for you");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instapu = 1;
print("Insta Pumpkin Seed Has Been Enchanted To your Hoe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instapu = 0;
print("Insta Pumpkin Seed Has Been Removed To your Hoe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details21(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle("  Insta Beetroot Seed  ");
qqqqqq.setText(" Instantly makes an beetroot crop for you");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instab = 1;
print("Insta Beetroot Seed Has Been Enchanted To your Hoe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
instab = 0;
print("Insta Beetroot Seed Has Been Removed To your Hoe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details22(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Power ");
qqqqqq.setText(" Increase the Fire Speed of the arrow");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
power = 1;
print("Power Has Been Enchanted To your Bow");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
power = 0;
print("Power Has Been Removed To your Bow");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details23(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Sharpness ");
qqqqqq.setText(" Increase damage to victim by 1.5");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
sharpness = 1;
print("Sharpness Has Been Enchanted To your Sword");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
sharpness = 0;
print("Sharpness Has Been Removed To your Sword");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details24(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Efficiency ");
qqqqqq.setText(" Destroy woods so fast");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
efficiencya = 1;
print("Efficiency Has Been Enchanted To your Axe");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
efficiencya = 0;
print("Efficiency Has Been Removed To your Axe");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details25(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Regeneration ");
qqqqqq.setText(" Makes your health regenerate");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
regeneration = 1;
print("Regeneration Has Been Enchanted To your Diamond Helmet");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
regeneration = 0;
print("Regeneration Has Been Removed To your Diamond Helmet");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details26(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Unbreaking ");
qqqqqq.setText(" Makes your helmet unbreakable");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingh = 1;
print("Unbreaking Has Been Enchanted To your Diamond Helmet");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingh = 0;
print("Unbreaking Has Been Removed To your Diamond Helmet");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details27(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Unbreaking ");
qqqqqq.setText(" Makes your chestplate unbreakable");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingc = 1;
print("Unbreaking Has Been Enchanted To your Diamond Chestplate");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingc = 0;
print("Unbreaking Has Been Removed To your Diamond Chestplate");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details28(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Fire Protection ");
qqqqqq.setText(" Makes your chestplate fire protected");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fireprotect = 1;
print("Fire Protection Has Been Enchanted To your Diamond Chestplate");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
fireprotect = 0;
print("Fire Protection Has Been Removed To your Diamond Chestplate");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details29(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Unbreaking ");
qqqqqq.setText(" Makes your legging unbreakable");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingl = 1;
print("Unbreaking Has Been Enchanted To your Diamond Leggings");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingl = 0;
print("Unbreaking Has Been Removed To your Diamond Legging");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details30(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Unbreaking ");
qqqqqq.setText(" Makes your boots unbreakable");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingb = 1;
print("Unbreaking Has Been Enchanted To your Diamond Boots");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
unbreakingb = 0;
print("Unbreaking Has Been Removed To your Diamond Boots");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details31(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Feather Falling ");
qqqqqq.setText(" Makes you fall slowly in air");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
featherfalling = 1;
print("Feather Falling Has Been Enchanted To your Diamond Boots");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
featherfalling = 0;
print("Feather Falling Has Been Removed To your Diamond Boots");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details32(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Wather Walking ");
qqqqqq.setText(" Makes you walk in water");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
waterwalking = 1;
print("Water Walking Has Been Enchanted To your Diamond Legging");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
waterwalking = 0;
print("Water Walking Has Been Removed To your Diamond Legging");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details33(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Walk Faster ");
qqqqqq.setText(" Makes you walk faster than Normal");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
walkfaster = 1;
print("Walk Faster Has Been Enchanted To your Diamond Boots");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
walkfaster = 0;
print("Walk Faster Has Been Removed To your Diamond Boots");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function details34(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var menu = new android.widget.LinearLayout(ctx);
var scroll = new android.widget.ScrollView(ctx);
var qqqqqq = new android.widget.TextView(ctx);

menu.setOrientation(android.widget.LinearLayout.VERTICAL);

scroll.addView(menu);
menu.addView(qqqqqq)

var dialog = new android.app.Dialog(ctx); 
dialog.setContentView(scroll);

dialog.setTitle(" Jump Higher ");
qqqqqq.setText(" Makes you jump higher than Normal");
qqqqqq.setTextSize(20)



var  esp= new android.widget.Button(ctx); 
esp .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
jumphigher = 1;
print("Jump Higher Has Been Enchanted To your Diamond Boots");
dialog.dismiss()
 
}
})
esp.setText(" Enchant ")
esp.setTextSize(20)
menu.addView(esp); 


var  uep= new android.widget.Button(ctx); 
uep .setOnClickListener(new android.view.View.OnClickListener(){
onClick: function(){
dialog.dismiss()
jumphigher = 0;
print("Jump Higher Has Been Removed To your Diamond Boots");
dialog.dismiss()
 
}
})
uep.setText(" Unenchant ")
uep.setTextSize(20)
menu.addView(uep); 

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
}

function destroyBlock(x, y, z, side) {
	var blockId = getTile(x,y,z);
	var t3 = getTile(x,y+3,z);
	var t4 = getTile(x,y+4,z);
	var t5 = getTile(x,y+5,z);
       var t6 = getTile(x,y+6,z);
       var t7 = getTile(x,y+7,z);
	var t8 = getTile(x,y+8,z);
	var t9 = getTile(x,y+9,z);
       var t10 = getTile(x,y+10,z);
   var itemid = getCarriedItem();
   var blockid = getTile(x,y,z);

      if (blockId == 2  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 20  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

     
      } else if (blockId == 102  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 79  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 2  &&  itemid == 278  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 278  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
     
      } else if (blockId == 102  &&  itemid == 278  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 79  &&  itemid == 278  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 2  &&  itemid == 256  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 256  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 256  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
       
      } else if (blockId == 79  &&  itemid == 256  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
     
      } else if (blockId == 2  &&  itemid == 269  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 269  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 269  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      

      } else if (blockId == 79  &&  itemid == 269  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      
      } else if (blockId == 2  &&  itemid == 273  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      
      } else if (blockId == 20  &&  itemid == 273  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 273  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 79  &&  itemid == 273  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      
      } else if (blockId == 2  &&  itemid == 284  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 284  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 284  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 79  &&  itemid == 284  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 2  &&  itemid == 270  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 270  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 270  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
     } else if (blockId == 79  &&  itemid == 270  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 52  &&  itemid == 270  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

       
      } else if (blockId == 2  &&  itemid == 257  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 257  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 257  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 79  &&  itemid == 257  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 52  &&  itemid == 257  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
       
     } else if (blockId == 2  &&  itemid == 274  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 20  &&  itemid == 274  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 274  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
       
      } else if (blockId == 79  &&  itemid == 274  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 52  &&  itemid == 274  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

      
      } else if (blockId == 2  &&  itemid == 285  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
       
      } else if (blockId == 20  &&  itemid == 285  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);
      
      } else if (blockId == 102  &&  itemid == 285  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 52  &&  itemid == 285  &&  silktouchp == 1) {
      Level.destroyBlock(x, y, z, true);

      
      } else if (itemid == 278  &&  unbreaking == 1  && Player.getCarriedItemData()+damage) {
      Entity.setCarriedItem(getPlayerEnt(), up, Player.getCarriedItemCount(), Player.getCarriedItemData()+damage)
      damage = 0;
      
      } else if (itemid == 285  &&  unbreaking == 1  && Player.getCarriedItemData()+damage) {
      Entity.setCarriedItem(getPlayerEnt(), up1, Player.getCarriedItemCount(), Player.getCarriedItemData()+damage)
      damage = 0;
       
      } else if (itemid == 257  &&  unbreaking == 1  && Player.getCarriedItemData()+damage) {
      Entity.setCarriedItem(getPlayerEnt(), up2, Player.getCarriedItemCount(), Player.getCarriedItemData()+damage)
      damage = 0;
      
      } else if (itemid == 274  &&  unbreaking == 1  && Player.getCarriedItemData()+damage) {
      Entity.setCarriedItem(getPlayerEnt(), up3, Player.getCarriedItemCount(), Player.getCarriedItemData()+damage)
      damage = 0;

       
      } else if (itemid == 270  &&  unbreaking == 1  && Player.getCarriedItemData()+damage) {
      Entity.setCarriedItem(getPlayerEnt(), up4, Player.getCarriedItemCount(), Player.getCarriedItemData()+damage)
      damage = 0;

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t3 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t4 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
      Level.destroyBlock(x, y+4, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t5 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
      Level.destroyBlock(x, y+4, z, true);
      
      Level.destroyBlock(x, y+5, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t6 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t7 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t8 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t9 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);

      } else if (blockId == 17  &&  itemid == 279  &&  treechopper == 1  &&  t10 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);
     Level.destroyBlock(x, y+10, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t3 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t4 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
      Level.destroyBlock(x, y+4, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t5 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
      Level.destroyBlock(x, y+4, z, true);
      
      Level.destroyBlock(x, y+5, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t6 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t7 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t8 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t9 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);

      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1  &&  t10 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);
     Level.destroyBlock(x, y+10, z, true);
      
      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t3 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t4 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
      Level.destroyBlock(x, y+4, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t5 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
      Level.destroyBlock(x, y+4, z, true);
      
      Level.destroyBlock(x, y+5, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t6 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t7 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t8 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t9 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);

      } else if (blockId == 17  &&  itemid == 286  &&  treechopper == 1  &&  t10 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);
     Level.destroyBlock(x, y+10, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t3 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t4 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
      Level.destroyBlock(x, y+4, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t5 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
      Level.destroyBlock(x, y+4, z, true);
      
      Level.destroyBlock(x, y+5, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t6 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t7 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t8 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t9 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);

      } else if (blockId == 17  &&  itemid == 275  &&  treechopper == 1  &&  t10 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);
     Level.destroyBlock(x, y+10, z, true);

      
      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t3 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t4 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
      Level.destroyBlock(x, y+4, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t5 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
      Level.destroyBlock(x, y+4, z, true);
      
      Level.destroyBlock(x, y+5, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t6 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t7 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t8 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t9 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);

      } else if (blockId == 17  &&  itemid == 271  &&  treechopper == 1  &&  t10 == 17) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
   
     Level.destroyBlock(x, y+4, z, true);
     Level.destroyBlock(x, y+5, z, true);
     Level.destroyBlock(x, y+6, z, true);
     Level.destroyBlock(x, y+7, z, true);
     Level.destroyBlock(x, y+8, z, true);
     Level.destroyBlock(x, y+9, z, true);
     Level.destroyBlock(x, y+10, z, true);

      } else if (itemid == 277  &&  unbreakingshovel == 1  && Player.getCarriedItemData()+damageshovel) {
      Entity.setCarriedItem(getPlayerEnt(), uss, Player.getCarriedItemCount(), Player.getCarriedItemData()+damageshovel)
      damageshovel = 0;
      
      } else if (itemid == 284  &&  unbreakingshovel == 1  && Player.getCarriedItemData()+damageshovel) {
      Entity.setCarriedItem(getPlayerEnt(), uss1, Player.getCarriedItemCount(), Player.getCarriedItemData()+damageshovel)
      damageshovel = 0;

      
      } else if (itemid == 256  &&  unbreakingshovel == 1  && Player.getCarriedItemData()+damageshovel) {
      Entity.setCarriedItem(getPlayerEnt(), uss2, Player.getCarriedItemCount(), Player.getCarriedItemData()+damageshovel)
      damageshovel = 0;
      
      } else if (itemid == 273  &&  unbreakingshovel == 1  && Player.getCarriedItemData()+damageshovel) {
      Entity.setCarriedItem(getPlayerEnt(), uss3, Player.getCarriedItemCount(), Player.getCarriedItemData()+damageshovel)
      damageshovel = 0;
       
      } else if (itemid == 269  &&  unbreakingshovel == 1  && Player.getCarriedItemData()+damageshovel) {
      Entity.setCarriedItem(getPlayerEnt(), uss4, Player.getCarriedItemCount(), Player.getCarriedItemData()+damageshovel)
      damageshovel = 0;

      
      } else if (blockId == 206  &&   Level.getGameMode() == 0) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,1,0);
       
      } else if (blockId == 206   &&   itemid == 257   &&   fortune == 1) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,Math.floor(Math.random()*(3)+1),0);

      
      } else if (blockId == diamond   &&   itemid == 257   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(3)+1),0);
      
      } else if (blockId == iron   &&   itemid == 257   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
      } else if (blockId == gold   &&   itemid == 257   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);

      
      } else if (blockId == redstone   &&   itemid == 257   &&   fortune == 1) {

      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(4)+1),0); 
      
      } else if (blockId == coal   &&   itemid == 257   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(4)+1),0);

      
      } else if (blockId == lapis   &&   itemid == 257   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,351,2,Math.floor(Math.random()*(2)+1),0);
      
      } else if (blockId == 206   &&   itemid == 270   &&   fortune == 1) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,Math.floor(Math.random()*(3)+1),0);

      
      } else if (blockId == diamond   &&   itemid == 270   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(3)+1),0);
      
      } else if (blockId == iron   &&   itemid == 270   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);

      
     } else if (blockId == gold   &&   itemid == 270   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
     } else if (blockId == redstone   &&   itemid == 270   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(4)+1),0); 
      
     } else if (blockId == coal   &&   itemid == 270   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(4)+1),0);
      
     } else if (blockId == lapis   &&   itemid == 270   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,351,2,Math.floor(Math.random()*(2)+1),0);
      
      } else if (blockId == 206   &&   itemid == 274   &&   fortune == 1) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,Math.floor(Math.random()*(3)+1),0);
      
      } else if (blockId == diamond   &&   itemid == 274   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(3)+1),0);
      
      } else if (blockId == iron   &&   itemid == 274   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
      } else if (blockId == gold   &&   itemid == 274   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
      } else if (blockId == redstone   &&   itemid == 274   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(4)+1),0); 
      
      } else if (blockId == coal   &&   itemid == 274   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(4)+1),0);
      
      } else if (blockId == lapis   &&   itemid == 274   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,351,2,Math.floor(Math.random()*(2)+1),0);
      
      } else if (blockId == 206   &&   itemid == 278   &&   fortune == 1) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,Math.floor(Math.random()*(3)+1),0);
      
      } else if (blockId == diamond   &&   itemid == 278   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(3)+1),0);

       
      } else if (blockId == iron   &&   itemid == 278   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
      } else if (blockId == gold   &&   itemid == 278   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
     } else if (blockId == redstone   &&   itemid == 278   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(4)+1),0); 
      
      } else if (blockId == coal   &&   itemid == 278   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(4)+1),0);
      
     } else if (blockId == lapis   &&   itemid == 278   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,351,2,Math.floor(Math.random()*(2)+1),0);
      
      } else if (blockId == 206   &&   itemid == 285   &&   fortune == 1) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,Math.floor(Math.random()*(3)+1),0);

      
      } else if (blockId == diamond   &&   itemid == 285   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,264,Math.floor(Math.random()*(3)+1),0);

     
     } else if (blockId == iron   &&   itemid == 285   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,265,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
       
     } else if (blockId == gold   &&   itemid == 285   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,266,Math.floor(Math.random()*(4)+1),0);
      Level.destroyBlock(x, y, z, false);
      
     } else if (blockId == redstone   &&   itemid == 285   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,331,Math.floor(Math.random()*(4)+1),0); 
      
     } else if (blockId == coal   &&   itemid == 285   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,263,Math.floor(Math.random()*(4)+1),0);

      
     } else if (blockId == lapis   &&   itemid == 285   &&   fortune == 1) {
      Level.dropItem(x,y,z,0,351,2,Math.floor(Math.random()*(2)+1),0);

      
      } else if (blockId == 206   &&   fortune == 2) {
      Level.destroyBlock(x, y, z, false);
      Level.dropItem(x,y,z,0,210,level,0);

      
      } else if (blockId == diamond   &&  fortune == 2) {
      Level.dropItem(x,y,z,0,264,level,0);
      
     } else if (blockId == iron   &&   fortune == 2) {
      Level.dropItem(x,y,z,0,265,level,0);
      Level.destroyBlock(x, y, z, false);
     
     } else if (blockId == gold   &&   fortune == 2) {
      Level.dropItem(x,y,z,0,266,level,0);
      Level.destroyBlock(x, y, z, false);
      
     } else if (blockId == redstone   &&   fortune == 2) {
      Level.dropItem(x,y,z,0,331,level,0); 

     
     } else if (blockId == coal   &&   fortune == 2) {
      Level.dropItem(x,y,z,0,263,level,0);
     
     } else if (blockId == lapis   &&   fortune == 2) {
      Level.dropItem(x,y,z,0,351,2,level,0);
      
      } else if (blockId == 17  &&  itemid == 258  &&  treechopper == 1) {
      Level.destroyBlock(x, y, z, true);
      Level.destroyBlock(x, y+1, z, true);
      Level.destroyBlock(x, y+2, z, true);
      Level.destroyBlock(x, y+3, z, true);
      
      } else if (efficiencyp == 1  &&  itemid == 278) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);
      
      } else if (efficiencyp == 1  &&  itemid == 285) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);
      
      } else if (efficiencyp == 1  &&  itemid == 257) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);
      
      } else if (efficiencyp == 1  &&  itemid == 274) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);
      
      } else if (efficiencyp == 1  &&  itemid == 270) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);
      
      } else if (efficiencys == 1  &&  itemid == 277) {
      Block.setDestroyTime(2, 0);
      Block.setDestroyTime(3, 0);
      Block.setDestroyTime(12, 0);
      Block.setDestroyTime(13, 0);
      
      } else if (efficiencys == 1  &&  itemid == 269) {
      Block.setDestroyTime(2, 0);
      Block.setDestroyTime(3, 0);
      Block.setDestroyTime(12, 0);
      Block.setDestroyTime(13, 0);
      
      } else if (efficiencys == 1  &&  itemid == 273) {
      Block.setDestroyTime(2, 0);
      Block.setDestroyTime(3, 0);
      Block.setDestroyTime(12, 0);
      Block.setDestroyTime(13, 0); 
      
      } else if (efficiencys == 1  &&  itemid == 284) {
      Block.setDestroyTime(2, 0);
      Block.setDestroyTime(3, 0);
      Block.setDestroyTime(12, 0);
      Block.setDestroyTime(13, 0);
      
      } else if (efficiencys == 1  &&  itemid == 256) {
      Block.setDestroyTime(2, 0);
      Block.setDestroyTime(3, 0);
      Block.setDestroyTime(12, 0);
      Block.setDestroyTime(13, 0);

      } else if (itemid == 211  &&  blockid == 2) {
      Level.dropItem(x,y,z, 0, 1, 1);

      } else if (itemid == 211  &&  blockid == 14) {
      Level.destroyBlock(x,y,z);
      Level.dropItem(x,y,z, 0, 266, 1);

      } else if (itemid == 211  &&  blockid == 15) {
      Level.destroyBlock(x,y,z);
      Level.dropItem(x,y,z, 0, 265, 1);

      } else if (itemid == 212) {
      Level.explode(x,y,z, 2.5);
}
}
/*
function deathHook(m, v)
{
var x = Entity.getX(v);
var y = Entity.getY(v);
var z = Entity.getZ(v);

if(Entity.getEntityTypeld(v) == 10  &&  looting == 1){
Level.dropItem(x,y,z,0,288,Math.floor(Math.random()*(1)+2),0);

} else if(Entity.getEntityTypeld(v) == 11  &&  looting == 1){
Level.dropItem(x,y,z,0,363,Math.floor(Math.random()*(2)+1),0);

} else if(Entity.getEntityTypeld(v) == 12  &&  looting == 1){
Level.dropItem(x,y,z,0,319,Math.floor(Math.random()*(3)+1),0);

} else if(Entity.getEntityTypeld(v) == 13  &&  looting == 1){
Level.dropItem(x,y,z,0,35,Math.floor(Math.random()*(1)+2),0);

} else if(Entity.getEntityTypeld(v) == 32  &&  looting == 1){
Level.dropItem(x,y,z,0,392,Math.floor(Math.random()*(1)+1),0);

} else if(Entity.getEntityTypeld(v) == 33  &&  looting == 1){
Level.dropItem(x,y,z,0,289,Math.floor(Math.random()*(2)+1),0);

} else if(Entity.getEntityTypeld(v) == 34  &&  looting == 1){
Level.dropItem(x,y,z,0,352,Math.floor(Math.random()*(1)+2),0);

} else if(Entity.getEntityTypeld(v) == 35  &&  looting == 1){
Level.dropItem(x,y,z,0,287,Math.floor(Math.random()*(3)+1),0);

}
}
*/
function modTick(){
var itemid = Player.getCarriedItem();

      if(openedworld == 1) {
      sss++;

      }
      if (sss == 1  &&   unbreakingsword == 1) {
      damagesword = 0;
      sss = 0;

      }
      if (sss == 1  &&   unbreaking == 1) {
      damage = 0;
      sss = 0;

      }
      if (efficiencys == 1  &&  itemid == 277) {
      Block.setDestroyTime(2, 0);
      Block.setDestroyTime(3, 0);
      Block.setDestroyTime(12, 0);
      Block.setDestroyTime(13, 0);
    
      }
      if(efficiencys == 0) {
      restoretime();

      }
      if(efficiencyp == 0) {
      restoretime();

      }
      if(efficiencya == 0) {
      restoretime();

      }
      if (efficiencys == 1  &&  itemid == 269) {
      Block.setDestroyTime(2, 0.20);
      Block.setDestroyTime(3, 0.20);
      Block.setDestroyTime(12, 0.20);
      Block.setDestroyTime(13, 0.20);

      }
      if (efficiencys == 1  &&  itemid == 273) {
      Block.setDestroyTime(2, 0.20);
      Block.setDestroyTime(3, 0.20);
      Block.setDestroyTime(12, 0.20);
      Block.setDestroyTime(13, 0.20);
   
      }
      if (efficiencys == 1  &&  itemid == 284) {
      Block.setDestroyTime(2, 0.20);
      Block.setDestroyTime(3, 0.20);
      Block.setDestroyTime(12, 0.20);
      Block.setDestroyTime(13, 0.20);

      }
      if (efficiencys == 1  &&  itemid == 256) {
      Block.setDestroyTime(2, 0.20);
      Block.setDestroyTime(3, 0.20);
      Block.setDestroyTime(12, 0.20);
      Block.setDestroyTime(13, 0.20);

      }
      if (efficiencyp == 1  &&  itemid == 278) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);

      }
      if (efficiencyp == 1  &&  itemid == 257) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);

      }
      if (efficiencyp == 1  &&  itemid == 270) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);

      }
      if (efficiencyp == 1  &&  itemid == 274) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);

      }
      if (efficiencyp == 1  &&  itemid == 285) {
      Block.setDestroyTime(1, 0.05);
      Block.setDestroyTime(4, 0.30);
      Block.setDestroyTime(14, 0.70);
      Block.setDestroyTime(15, 0.70);
      Block.setDestroyTime(16, 0.70);
      Block.setDestroyTime(21, 0.70);
      Block.setDestroyTime(22, 0.90);
      Block.setDestroyTime(41, 0.90);
      Block.setDestroyTime(42, 0.90);
      Block.setDestroyTime(48, 0.10);
      Block.setDestroyTime(49, 1);
      Block.setDestroyTime(56, 0.70);
      Block.setDestroyTime(57, 0.90);
      Block.setDestroyTime(61, 0.50);
      Block.setDestroyTime(62, 0.50);
      Block.setDestroyTime(73, 0.70);
      Block.setDestroyTime(74, 0.70);

      }
      if(efficiencya == 1  &&  itemid == 258){
      Block.setDestroyTime(17, 0);

      }
      if(efficiencya == 1  &&  itemid == 271){
      Block.setDestroyTime(17, 0);

      }
      if(efficiencya == 1  &&  itemid == 275){
      Block.setDestroyTime(17, 0);

      }
      if(efficiencya == 1  &&  itemid == 279){
      Block.setDestroyTime(17, 0);

      }
      if(efficiencya == 1  &&  itemid == 286){
      Block.setDestroyTime(17, 0);

      }
      if(efficiencya == 1  &&  itemid !== 258){
      restoretime();

      }
      if(efficiencya == 1  &&  itemid !== 271){
      restoretime();

      }
      if(efficiencya == 1  &&  itemid !== 275){
      restoretime();

      }
      if(efficiencya == 1  &&  itemid !== 279){
      restoretime();

      }
      if(efficiencya == 1  &&  itemid !== 286){
      restoretime();

      }
      if(Player.getArmorSlot(0) == 310  &&  regeneration == 1){
      Player.setHealth(20);

      }
      if(Player.getArmorSlot(0) == 310  &&  unbreakingh == 1){
      Player.setArmorSlot(0, 310, 0);

      } 
      if(Player.getArmorSlot(1) == 311  &&  unbreakingc == 1){
      Player.setArmorSlot(1, 311, 0);

      }
      if(Player.getArmorSlot(1) == 311  &&  fireprotect == 1){
      Entity.setFireTicks(Player.getEntity(),0);

      }
      if(Player.getArmorSlot(2) == 312  &&  unbreakingl == 1){
      Player.setArmorSlot(2, 312, 0);

      }
      if(Player.getArmorSlot(3) == 313  &&  unbreakingb == 1){
      Player.setArmorSlot(3, 313, 0);

      }
      if(Player.getArmorSlot(3) == 313  &&  featherfalling == 1  &&  getTile(getPlayerX(),getPlayerY()-3,getPlayerZ()) == 0){
      Entity.setVelY(getPlayerEnt(), -0.10);

      }
      if(Player.getArmorSlot(2) == 312  &&  waterwalking == 1  &&  getTile(getPlayerX(),getPlayerY()-2,getPlayerZ()) == 9){
      Entity.setVelY(getPlayerEnt(), 0);

      }
      if(Player.getArmorSlot(3) == 313  &&  walkfaster == 1){
      isRunning = true;

      }
      if(Player.getArmorSlot(3) == 313  &&  walkfaster == 0){
      isRunning = false;

      }
      if(isRunning == true  &&  Player.getArmorSlot(3) == 313  &&  walkfaster == 1  &&  s == 1){
       Xpos=getPlayerX();
       Zpos=getPlayerZ();
       s = s + 1;

      }
      if(s==3){
        s=1;
        Xdiff=getPlayerX()-Xpos;
        Zdiff=getPlayerZ()-Zpos;
        setVelX(getPlayerEnt(),Xdiff);
        setVelZ(getPlayerEnt(),Zdiff);
        Xdiff=0;
        Zdiff=0;

      }
      if(s!=1){
      s = s + 1;

      }
      if(isRunning==false){
      return null;

      }
      if(Player.getArmorSlot(3) == 313  &&  jumphigher == 1  && getTile(getPlayerX(),getPlayerY()-2,getPlayerZ()) == 0 && jumped == 0){
      Entity.setVelY(getPlayerEnt(), 1);
      jump = 1;

      }
      if(Player.getArmorSlot(3) == 313  &&  jumphigher == 1  &&  getTile(getPlayerX(),getPlayerY()-2,getPlayerZ()) !== 0  && jumped == 1){
      jump = 0;
}
}

function leaveGame(){
savedata();
savedata1();
savedata2();
savedata3();
savedata4();
savedata5();
savedata6();
savedata7();
savedata8();
savedata9();
savedata10();
savedata11();
savedata12();
savedata13();
savedata14();
savedata15();
savedata16();
savedata17();
savedata18();
savedata19();
savedata20();
savedata21();
savedata22();
savedata23();
savedata24();
savedata25();
savedata26();
savedata27();
savedata28();
savedata29();
savedata30();
savedata31();
savedata32();
savedata33();
}

function savedata(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(fireenchant.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
fireenchant = parseInt(str.toString());
fos.close();
}
}

function savedata1(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase1.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(knockenchant.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata1(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase1.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
knockenchant = parseInt(str.toString());
fos.close();
}
}

function savedata2(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase2.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(looting.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata2(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase2.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase2.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
looting = parseInt(str.toString());
fos.close();
}
}

function savedata3(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase3.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreakingsword.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata3(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";


if(java.io.File(path+"EnchantmentDataBase3.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase3.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
unbreakingsword = parseInt(str.toString());
fos.close();
}
}

function savedata4(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase4.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(sharpness.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata4(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase4.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase4.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
sharpness = parseInt(str.toString());
fos.close();
}
}

function savedata5(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase5.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(fire.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata5(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase5.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase5.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
fire = parseInt(str.toString());
fos.close();
}
}

function savedata6(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase6.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(infinity.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata6(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase6.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase6.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
infinity = parseInt(str.toString());
fos.close();
}
}

function savedata7(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase7.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(power.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata7(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase7.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase7.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
power = parseInt(str.toString());
fos.close();
}
}

function savedata8(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase8.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(silktouchs.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata8(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase8.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase8.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
silktouchs = parseInt(str.toString());
fos.close();
}
}

function savedata9(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase9.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(silktouchp.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata9(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase9.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase9.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
silktouchp = parseInt(str.toString());
fos.close();
}
}

function savedata10(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase10.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(efficiencyp.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata10(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase10.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase10.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
efficiencyp = parseInt(str.toString());
fos.close();
}
}

function savedata11(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase11.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(efficiencys.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata11(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase11.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase11.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
efficiencys = parseInt(str.toString());
fos.close();
}
}

function savedata12(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase12.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(efficiencya.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata12(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase12.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase12.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
efficiencya = parseInt(str.toString());
fos.close();
}
}

function savedata13(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase13.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(explodem.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata13(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase13.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase13.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
explodem = parseInt(str.toString());
fos.close();
}
}

function savedata14(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase14.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(treechopper.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata14(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase14.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase14.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
treechopper = parseInt(str.toString());
fos.close();
}
}

function savedata15(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase15.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(regeneration.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata15(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase15.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase15.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
regeneration = parseInt(str.toString());
fos.close();
}
}

function savedata16(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase16.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreakingh.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata16(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase16.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase16.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
unbreakingh = parseInt(str.toString());
fos.close();
}
}

function savedata17(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase17.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreakingc.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata17(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase17.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase17.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
unbreakingc = parseInt(str.toString());
fos.close();
}
}

function savedata18(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase18.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreakingl.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata18(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase18.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase18.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
unbreakingb = parseInt(str.toString());
fos.close();
}
}

function savedata19(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase19.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreakingc.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata19(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase19.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase19.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
unbreakingb = parseInt(str.toString());
fos.close();
}
}

function savedata20(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase20.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(featherfalling.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata20(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase20.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase20.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
featherfalling = parseInt(str.toString());
fos.close();
}
}

function savedata21(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase21.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(fireprotect.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata21(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase20.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase20.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
fireprotect = parseInt(str.toString());
fos.close();
}
}

function savedata22(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase22.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreaking.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata22(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase22.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase22.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
unbreaking = parseInt(str.toString());
fos.close();
}
}

function savedata23(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase23.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(unbreakingshovel.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata23(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase23.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase23.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());

unbreakingshovel = parseInt(str.toString());
fos.close();
}
}

function savedata24(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase24.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(instaw.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata24(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase24.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase24.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
instaw = parseInt(str.toString());
fos.close();
}
}

function savedata25(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase25.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(instac.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata25(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase25.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase25.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
instac = parseInt(str.toString());
fos.close();
}
}

function savedata26(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase26.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(instap.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata26(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase26.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase26.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
instap = parseInt(str.toString());
fos.close();
}
}

function savedata27(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase27.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(instam.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata27(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase27.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase27.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
instam = parseInt(str.toString());
fos.close();
}
}

function savedata28(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase28.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(instapu.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata28(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase28.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase28.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
instapu = parseInt(str.toString());
fos.close();
}
}

function savedata29(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase29.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(instab.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata29(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase29.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase29.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
instab = parseInt(str.toString());
fos.close();
}
}

function savedata30(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase30.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(fortune.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata30(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase30.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase30.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
fortune = parseInt(str.toString());
fos.close();
}
}

function savedata31(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase31.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(waterwalking.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata31(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase31.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase31.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
waterwalking = parseInt(str.toString());
fos.close();
}
}

function savedata32(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase32.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(walkfaster.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata32(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase32.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase32.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
walkfaster = parseInt(str.toString());
fos.close();
}
}

function savedata33(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
java.io.File(path).mkdirs();
var newFile=new java.io.File(path,"EnchantmentDataBase33.txt");
newFile.createNewFile();
var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
outWrite.append(jumphigher.toString());
outWrite.close();
}
catch(err){
clientMessage(err);
}
}

function loaddata33(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
if(java.io.File(path+"EnchantmentDataBase33.txt").exists()){
var file=new java.io.File(path+"EnchantmentDataBase33.txt");
var fos=new java.io.FileInputStream(file);
var str=new java.lang.StringBuilder();
var ch;
while((ch=fos.read())!=-1)
str.append(java.lang.Character(ch));
savefile=String(str.toString());
jumphigher = parseInt(str.toString());
fos.close();
}
}

function check(){
var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
print("Checking DataBase's");
if(java.io.File(!path+"EnchantmentDataBase.txt").exists()){
savedata();
print("Error Database not Found..Creating DataBase");

}
if(java.io.File(path+"EnchantmentDataBase.txt").exists()){
loaddata();

}
if(!java.io.File(path+"EnchantmentDataBase1.txt").exists()){
savedata1();
print("Error Database # 1 not Found..Creating DataBase # 1");

}
if(java.io.File(path+"EnchantmentDataBase1.txt").exists()){
loaddata1();

}
if(!java.io.File(path+"EnchantmentDataBase2.txt").exists()){
savedata2();
print("Error Database # 2 not Found..Creating DataBase # 2");

}
if(java.io.File(path+"EnchantmentDataBase2.txt").exists()){
loaddata2();

}
if(!java.io.File(path+"EnchantmentDataBase3.txt").exists()){
savedata3();
print("Error Database # 3 not Found..Creating DataBase # 3");

}
if(java.io.File(path+"EnchantmentDataBase3.txt").exists()){
loaddata3();

}
if(!java.io.File(path+"EnchantmentDataBase4.txt").exists()){
savedata4();
print("Error Database # 4 not Found..Creating DataBase # 4");

}
if(java.io.File(path+"EnchantmentDataBase4.txt").exists()){
loaddata4();

}
if(!java.io.File(path+"EnchantmentDataBase5.txt").exists()){
savedata5();
print("Error Database # 5 not Found..Creating DataBase # 5");

}
if(java.io.File(path+"EnchantmentDataBase5.txt").exists()){
loaddata5();

}
if(!java.io.File(path+"EnchantmentDataBase6.txt").exists()){
savedata6();
print("Error Database # 6 not Found..Creating DataBase # 6");

}
if(java.io.File(path+"EnchantmentDataBase6.txt").exists()){
loaddata6();

}
if(!java.io.File(path+"EnchantmentDataBase7.txt").exists()){
savedata7();
print("Error Database # 7 not Found..Creating DataBase # 7");

}
if(java.io.File(path+"EnchantmentDataBase7.txt").exists()){
loaddata7();

}
if(!java.io.File(path+"EnchantmentDataBase8.txt").exists()){
savedata8();
print("Error Database # 8 not Found..Creating DataBase # 8");

}
if(java.io.File(path+"EnchantmentDataBase8.txt").exists()){
loaddata8();

}
if(!java.io.File(path+"EnchantmentDataBase9.txt").exists()){
savedata9();
print("Error Database # 9 not Found..Creating DataBase # 9");

}
if(java.io.File(path+"EnchantmentDataBase9.txt").exists()){
loaddata9();

}
if(!java.io.File(path+"EnchantmentDataBase10.txt").exists()){
savedata10();
print("Error Database # 10 not Found..Creating DataBase # 10");

}
if(java.io.File(path+"EnchantmentDataBase10.txt").exists()){
loaddata10();

}
if(!java.io.File(path+"EnchantmentDataBase11.txt").exists()){
savedata11();
print("Error Database # 11 not Found..Creating DataBase # 11");

}
if(java.io.File(path+"EnchantmentDataBase11.txt").exists()){
loaddata11();

}
if(!java.io.File(path+"EnchantmentDataBase12.txt").exists()){
savedata12();
print("Error Database # 12 not Found..Creating DataBase # 12");

}
if(java.io.File(path+"EnchantmentDataBase12.txt").exists()){
loaddata12();

}
if(!java.io.File(path+"EnchantmentDataBase13.txt").exists()){
savedata13();
print("Error Database # 13 not Found..Creating DataBase # 13");

}
if(java.io.File(path+"EnchantmentDataBase13.txt").exists()){
loaddata13();

}
if(!java.io.File(path+"EnchantmentDataBase14.txt").exists()){
savedata14();
print("Error Database # 14 not Found..Creating DataBase # 14");

}
if(java.io.File(path+"EnchantmentDataBase14.txt").exists()){
loaddata14();

}
if(!java.io.File(path+"EnchantmentDataBase15.txt").exists()){
savedata15();
print("Error Database # 15 not Found..Creating DataBase # 15");

}
if(java.io.File(path+"EnchantmentDataBase15.txt").exists()){
loaddata15();

}
if(!java.io.File(path+"EnchantmentDataBase16.txt").exists()){
savedata16();
print("Error Database # 16 not Found..Creating DataBase # 16");

}
if(java.io.File(path+"EnchantmentDataBase16.txt").exists()){
loaddata16();

}
if(!java.io.File(path+"EnchantmentDataBase17.txt").exists()){
savedata17();
print("Error Database # 17 not Found..Creating DataBase # 17");

}
if(java.io.File(path+"EnchantmentDataBase17.txt").exists()){
loaddata17();

}
if(!java.io.File(path+"EnchantmentDataBase18.txt").exists()){
savedata18();
print("Error Database # 18 not Found..Creating DataBase # 18");

}
if(java.io.File(path+"EnchantmentDataBase18.txt").exists()){
loaddata18();

}
if(!java.io.File(path+"EnchantmentDataBase19.txt").exists()){
savedata19();
print("Error Database # 19 not Found..Creating DataBase # 19");

}
if(java.io.File(path+"EnchantmentDataBase19.txt").exists()){
loaddata19();

}
if(!java.io.File(path+"EnchantmentDataBase20.txt").exists()){
savedata20();
print("Error Database # 20 not Found..Creating DataBase # 20");

}
if(java.io.File(path+"EnchantmentDataBase20.txt").exists()){
loaddata20();

}
if(!java.io.File(path+"EnchantmentDataBase21.txt").exists()){
savedata21();
print("Error Database # 21 not Found..Creating DataBase # 21");

}
if(java.io.File(path+"EnchantmentDataBase21.txt").exists()){
loaddata21();

}
if(!java.io.File(path+"EnchantmentDataBase22.txt").exists()){
savedata22();
print("Error Database # 20 not Found..Creating DataBase # 22");

}
if(java.io.File(path+"EnchantmentDataBase22.txt").exists()){
loaddata22();

}
if(!java.io.File(path+"EnchantmentDataBase23.txt").exists()){
savedata23();
print("Error Database # 23 not Found..Creating DataBase # 23");

}
if(java.io.File(path+"EnchantmentDataBase23.txt").exists()){
loaddata23();

}
if(!java.io.File(path+"EnchantmentDataBase24.txt").exists()){
savedata24();
print("Error Database # 24 not Found..Creating DataBase # 24");

}
if(java.io.File(path+"EnchantmentDataBase20.txt").exists()){
loaddata24();

}
if(!java.io.File(path+"EnchantmentDataBase25.txt").exists()){
savedata25();
print("Error Database # 25 not Found..Creating DataBase # 25");

}
if(java.io.File(path+"EnchantmentDataBase25.txt").exists()){
loaddata25();

}
if(!java.io.File(path+"EnchantmentDataBase26.txt").exists()){
savedata26();
print("Error Database # 26 not Found..Creating DataBase # 26");

}
if(java.io.File(path+"EnchantmentDataBase26.txt").exists()){
loaddata26();

}
if(!java.io.File(path+"EnchantmentDataBase27.txt").exists()){
savedata27();
print("Error Database # 27 not Found..Creating DataBase # 27");

}
if(java.io.File(path+"EnchantmentDataBase27.txt").exists()){
loaddata27();

}
if(!java.io.File(path+"EnchantmentDataBase28.txt").exists()){
savedata28();
print("Error Database # 28 not Found..Creating DataBase # 28");

}
if(java.io.File(path+"EnchantmentDataBase28.txt").exists()){
loaddata28();

}
if(!java.io.File(path+"EnchantmentDataBase29.txt").exists()){
savedata29();
print("Error Database # 29 not Found..Creating DataBase # 29");

}
if(java.io.File(path+"EnchantmentDataBase29.txt").exists()){
loaddata29();

}
if(!java.io.File(path+"EnchantmentDataBase30.txt").exists()){
savedata30();
print("Error Database # 30 not Found..Creating DataBase # 30");

}
if(java.io.File(path+"EnchantmentDataBase30.txt").exists()){
loaddata30();

}
if(!java.io.File(path+"EnchantmentDataBase31.txt").exists()){
savedata31();
print("Error Database # 31 not Found..Creating DataBase # 31");

}
if(java.io.File(path+"EnchantmentDataBase31.txt").exists()){
loaddata31();

}
if(!java.io.File(path+"EnchantmentDataBase32.txt").exists()){
savedata32();
print("Error Database # 32 not Found..Creating DataBase # 32");

}
if(java.io.File(path+"EnchantmentDataBase32.txt").exists()){
loaddata32();

}
if(!java.io.File(path+"EnchantmentDataBase33.txt").exists()){
savedata33();
print("Error Database # 33 not Found..Creating DataBase # 33");

}
if(java.io.File(path+"EnchantmentDataBase33.txt").exists()){
loaddata33();
}
}
