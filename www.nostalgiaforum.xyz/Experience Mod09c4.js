var Book;

var experienceBarWidth=800;
var experienceBarHeight=25;

var simpleGUIWidth=800;
var simpleGUIHeight=100;
var simpleGUIPositionX=0;
var simpleGUIPositionY=150;

var GUITextSize=13;

var GUIEnchantingWidth = 1056;
var GUIEnchantingHeight = 516;

var GUIItemSize = 84;
var GUIItemPositionX = -330;
var GUIItemPositionY = 69;

var GUIEnchanting123Width = 600;
var GUIEnchanting123Height = 90;

var GUIEnchanting123PositionX = 150;
var GUIEnchanting1PositionY = -118;
var GUIEnchanting2PositionY = -4;
var GUIEnchanting3PositionY = 110;

var GUILevel123Size = 60;

var GUILevel123PositionX = 445;
var GUILevel1PositionY = 20;
var GUILevel2PositionY = -94;
var GUILevel3PositionY = 134;

var GUILevelText123Size = 60;

var GUILevelText123PositionX = 455;
var GUILevelText1PositionY = 40;
var GUILevelText2PositionY = -74;
var GUILevelText3PositionY = 154

var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

function checkSize()
{
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){

			var layoutCheck = new android.widget.LinearLayout(ctx);
			layoutCheck.setOrientation(android.widget.LinearLayout.VERTICAL);
			var popupCheck = new android.app.AlertDialog.Builder(ctx);
			popupCheck.setView(layoutCheck);
			popupCheck.setTitle("Resolution");
			var TextCheck = new android.widget.TextView(ctx);
			TextCheck.setText("Before playing, please choose with what resolution you have to play!\nSmall: Small (Galaxy S3 and smaller)\nNormal (Mostly for Tablets)\nBig (Galaxy S4 and higher)");
			TextCheck.setTextColor(android.graphics.Color.WHITE);
			TextCheck.setTextSize(18);
			layoutCheck.addView(TextCheck);
			
			popupCheck.setNegativeButton("Small", new android.content.DialogInterface.OnClickListener(){
			onClick: function(viewarg)
			{
			experienceBarWidth=400;
			experienceBarHeight=12.5;

			simpleGUIWidth=400;
			simpleGUIHeight=50;
			simpleGUIPositionX=0;
			simpleGUIPositionY=75;

			GUITextSize=13;

			GUIEnchantingWidth = 523;
			GUIEnchantingHeight = 258;

			GUIItemSize = 42;
			GUIItemPositionX = -165;
			GUIItemPositionY = 34.5;

			GUIEnchanting123Width = 300;
			GUIEnchanting123Height = 45;

			GUIEnchanting123PositionX = 75;
			GUIEnchanting1PositionY = -59;
			GUIEnchanting2PositionY = -2;
			GUIEnchanting3PositionY = 55;

			GUILevel123Size = 30;

			GUILevel123PositionX = 222.5;
			GUILevel1PositionY = 10;
			GUILevel2PositionY = -47;
			GUILevel3PositionY = 67;

			GUILevelText123Size = 30;

			GUILevelText123PositionX = 227.5;
			GUILevelText1PositionY = 20;
			GUILevelText2PositionY = -37;
			GUILevelText3PositionY = 72;
			
			showUp();
			}});
			
			popupCheck.setNeutralButton("Normal", new android.content.DialogInterface.OnClickListener(){
			onClick: function(viewarg)
			{
			experienceBarWidth=600;
			experienceBarHeight=18.75;

			simpleGUIWidth=600;
			simpleGUIHeight=75;
			simpleGUIPositionX=0;
			simpleGUIPositionY=112.5;

			GUITextSize=13;

			GUIEnchantingWidth = 784.5;
			GUIEnchantingHeight = 387;

			GUIItemSize = 63;
			GUIItemPositionX = -247.5;
			GUIItemPositionY = 51.75;

			GUIEnchanting123Width = 450;
			GUIEnchanting123Height = 67.5;

			GUIEnchanting123PositionX = 112.5;
			GUIEnchanting1PositionY = -111;
			GUIEnchanting2PositionY = -3;
			GUIEnchanting3PositionY = 82.5;

			GUILevel123Size = 45;

			GUILevel123PositionX = 333.75;
			GUILevel1PositionY = 15;
			GUILevel2PositionY = -70.5;
			GUILevel3PositionY = 100;

			GUILevelText123Size = 45;

			GUILevelText123PositionX = 341.5;
			GUILevelText1PositionY = 10;
			GUILevelText2PositionY = -55.5;
			GUILevelText3PositionY = 108;
			
			showUp();
			}});
			
			popupCheck.setPositiveButton("Big", new android.content.DialogInterface.OnClickListener(){
			onClick: function(viewarg)
			{
			showUp();
			}});
			popupCheck.show();
			}
		}
)
}

var Level1=7;
var Level2=9;
var Level3=11;
var Level4=13;
var Level5=15;
var Level6=17;
var Level7=19;
var Level8=21;
var Level9=23;
var Level10=25;
var Level11=27;
var Level12=29;
var Level13=31;
var Level14=33;
var Level15=35;
var Level16=37;
var Level17=42;
var Level18=47;
var Level19=52;
var Level20=57;
var Level21=62;
var Level22=67;
var Level23=72;
var Level24=77;
var Level25=82;
var Level26=87;
var Level27=92;
var Level28=97;
var Level29=102;
var Level30=107;

ModPE.setItem(322, "fireworks_charge_overlay", 0, "Diamond Sword\nSharpness I", 1);
ModPE.setItem(326, "fireworks_charge_overlay", 0, "Diamond Sword\nSharpness II", 1);
ModPE.setItem(327, "fireworks_charge_overlay", 0, "Diamond Sword\nSharpness III", 1);
ModPE.setItem(335, "fireworks_charge_overlay", 0, "Diamond Sword\nSharpness IV", 1);
ModPE.setItem(342, "fireworks_charge_overlay", 0, "Diamond Sword\nFire Aspect I", 1);
ModPE.setItem(343, "fireworks_charge_overlay", 0, "Diamond Sword\nFire Aspect II", 1);
ModPE.setItem(346, "fireworks_charge_overlay", 0, "Diamond Sword\nKnockback I", 1);
ModPE.setItem(349, "fireworks_charge_overlay", 0, "Diamond Sword\nBane of Arthropods I", 1);
ModPE.setItem(350, "fireworks_charge_overlay", 0, "Diamond Sword\nBane of Arthropods II", 1);
ModPE.setItem(356, "fireworks_charge_overlay", 0, "Diamond Sword\nBane of Arthropods III", 1);
ModPE.setItem(358, "fireworks_charge_overlay", 0, "Diamond Sword\nSmite I", 1);
ModPE.setItem(367, "fireworks_charge_overlay", 0, "Diamond Sword\nSmite II", 1);
ModPE.setItem(368, "fireworks_charge_overlay", 0, "Diamond Sword\nSmite III", 1);
ModPE.setItem(369, "fireworks_charge_overlay", 0, "Diamond Sword\nLooting I", 1);

ModPE.setItem(370, "fishing_rod_cast", 0, "Iron Sword\nSharpness I", 1);
ModPE.setItem(371, "fishing_rod_cast", 0, "Iron Sword\nSharpness II", 1);
ModPE.setItem(372, "fishing_rod_cast", 0, "Iron Sword\nSharpness III", 1);
ModPE.setItem(373, "fishing_rod_cast", 0, "Iron Sword\nSharpness IV", 1);
ModPE.setItem(374, "fishing_rod_cast", 0, "Iron Sword\nFire Aspect I", 1);
ModPE.setItem(375, "fishing_rod_cast", 0, "Iron Sword\nFire Aspect II", 1);
ModPE.setItem(376, "fishing_rod_cast", 0, "Iron Sword\nKnockback I", 1);
ModPE.setItem(377, "fishing_rod_cast", 0, "Iron Sword\nBane of Arthropods I", 1);
ModPE.setItem(378, "fishing_rod_cast", 0, "Iron Sword\nBane of Arthropods II", 1);
ModPE.setItem(379, "fishing_rod_cast", 0, "Iron Sword\nBane of Arthropods III", 1);
ModPE.setItem(380, "fishing_rod_cast", 0, "Iron Sword\nSmite I", 1);
ModPE.setItem(381, "fishing_rod_cast", 0, "Iron Sword\nSmite II", 1);
ModPE.setItem(382, "fishing_rod_cast", 0, "Iron Sword\nSmite III", 1);
ModPE.setItem(384, "fishing_rod_cast", 0, "Iron Sword\nLooting I", 1);

ModPE.setItem(385, "fishing_rod_uncast", 0, "Stone Sword\nSharpness I", 1);
ModPE.setItem(386, "fishing_rod_uncast", 0, "Stone Sword\nSharpness II", 1);
ModPE.setItem(387, "fishing_rod_uncast", 0, "Stone Sword\nSharpness III", 1);
ModPE.setItem(389, "fishing_rod_uncast", 0, "Stone Sword\nSharpness IV", 1);
ModPE.setItem(390, "fishing_rod_uncast", 0, "Stone Sword\nFire Aspect I", 1);
ModPE.setItem(394, "fishing_rod_uncast", 0, "Stone Sword\nFire Aspect II", 1);
ModPE.setItem(395, "fishing_rod_uncast", 0, "Stone Sword\nKnockback I", 1);
ModPE.setItem(396, "fishing_rod_uncast", 0, "Stone Sword\nBane of Arthropods I", 1);
ModPE.setItem(397, "fishing_rod_uncast", 0, "Stone Sword\nBane of Arthropods II", 1);
ModPE.setItem(398, "fishing_rod_uncast", 0, "Stone Sword\nBane of Arthropods III", 1);
ModPE.setItem(399, "fishing_rod_uncast", 0, "Stone Sword\nSmite I", 1);
ModPE.setItem(400, "fishing_rod_uncast", 0, "Stone Sword\nSmite II", 1);
ModPE.setItem(401, "fishing_rod_uncast", 0, "Stone Sword\nSmite III", 1);
ModPE.setItem(402, "fishing_rod_uncast", 0, "Stone Sword\nLooting I", 1);

ModPE.setItem(403, "fish_cooked", 0, "Golden Sword\nSharpness I", 1);
ModPE.setItem(404, "fish_cooked", 0, "Golden Sword\nSharpness II", 1);
ModPE.setItem(407, "fish_cooked", 0, "Golden Sword\nSharpness III", 1);
ModPE.setItem(408, "fish_cooked", 0, "Golden Sword\nSharpness IV", 1);
ModPE.setItem(409, "fish_cooked", 0, "Golden Sword\nFire Aspect I", 1);
ModPE.setItem(410, "fish_cooked", 0, "Golden Sword\nFire Aspect II", 1);
ModPE.setItem(411, "fish_cooked", 0, "Golden Sword\nKnockback I", 1);
ModPE.setItem(412, "fish_cooked", 0, "Golden Sword\nBane of Arthropods I", 1);
ModPE.setItem(413, "fish_cooked", 0, "Golden Sword\nBane of Arthropods II", 1);
ModPE.setItem(414, "fish_cooked", 0, "Golden Sword\nBane of Arthropods III", 1);
ModPE.setItem(415, "fish_cooked", 0, "Golden Sword\nSmite I", 1);
ModPE.setItem(416, "fish_cooked", 0, "Golden Sword\nSmite II", 1);
ModPE.setItem(417, "fish_cooked", 0, "Golden Sword\nSmite III", 1);
ModPE.setItem(418, "fish_cooked", 0, "Golden Sword\nLooting I", 1);

ModPE.setItem(419, "fish_raw", 0, "Wooden Sword\nSharpness I", 1);
ModPE.setItem(420, "fish_raw", 0, "Wooden Sword\nSharpness II", 1);
ModPE.setItem(421, "fish_raw", 0, "Wooden Sword\nSharpness III", 1);
ModPE.setItem(422, "fish_raw", 0, "Wooden Sword\nSharpness IV", 1);
ModPE.setItem(423, "fish_raw", 0, "Wooden Sword\nFire Aspect I", 1);
ModPE.setItem(424, "fish_raw", 0, "Wooden Sword\nFire Aspect II", 1);
ModPE.setItem(425, "fish_raw", 0, "Wooden Sword\nKnockback I", 1);
ModPE.setItem(426, "fish_raw", 0, "Wooden Sword\nBane of Arthropods I", 1);
ModPE.setItem(427, "fish_raw", 0, "Wooden Sword\nBane of Arthropods II", 1);
ModPE.setItem(428, "fish_raw", 0, "Wooden Sword\nBane of Arthropods III", 1);
ModPE.setItem(429, "fish_raw", 0, "Wooden Sword\nSmite I", 1);
ModPE.setItem(430, "fish_raw", 0, "Wooden Sword\nSmite II", 1);
ModPE.setItem(431, "fish_raw", 0, "Wooden Sword\nSmite III", 1);
ModPE.setItem(432, "fish_raw", 0, "Wooden Sword\nLooting I", 1);

var itemToo=false;

var guiActive=false;
var diamondSword=276;
var diamondSwordActive=false;
var ironSword=267;
var ironSwordActive=false;
var stoneSword=272;
var stoneSwordActive=false;
var goldSword=283;
var goldSwordActive=false;
var woodSword=268;
var woodSwordActive=false;

var diamondSwordSharpnessI=322;
var diamondSwordSharpnessII=326;
var diamondSwordSharpnessIII=327;
var diamondSwordSharpnessIV=335;
var diamondSwordFireAspectI=342;
var diamondSwordFireAspectII=343;
var diamondSwordKnockbackI=346;
var diamondSwordBaneOfArthropodsI=349;
var diamondSwordBaneOfArthropodsII=350;
var diamondSwordBaneOfArthropodsIII=356;
var diamondSwordSmiteI=358;
var diamondSwordSmiteII=367;
var diamondSwordSmiteIII=368;
var diamondSwordLootingI=369;

var ironSwordSharpnessI=370;
var ironSwordSharpnessII=371;
var ironSwordSharpnessIII=372;
var ironSwordSharpnessIV=373;
var ironSwordFireAspectI=374;
var ironSwordFireAspectII=375;
var ironSwordKnockbackI=376;
var ironSwordBaneOfArthropodsI=377;
var ironSwordBaneOfArthropodsII=378;
var ironSwordBaneOfArthropodsIII=379;
var ironSwordSmiteI=380;
var ironSwordSmiteII=381;
var ironSwordSmiteIII=382;
var ironSwordLootingI=384;

var stoneSwordSharpnessI=385;
var stoneSwordSharpnessII=386;
var stoneSwordSharpnessIII=387;
var stoneSwordSharpnessIV=389;
var stoneSwordFireAspectI=390;
var stoneSwordFireAspectII=394;
var stoneSwordKnockbackI=395;
var stoneSwordBaneOfArthropodsI=396;
var stoneSwordBaneOfArthropodsII=397;
var stoneSwordBaneOfArthropodsIII=398;
var stoneSwordSmiteI=399;
var stoneSwordSmiteII=400;
var stoneSwordSmiteIII=401;
var stoneSwordLootingI=402;

var goldSwordSharpnessI=403;
var goldSwordSharpnessII=404;
var goldSwordSharpnessIII=407;
var goldSwordSharpnessIV=408;
var goldSwordFireAspectI=409;
var goldSwordFireAspectII=410;
var goldSwordKnockbackI=411;
var goldSwordBaneOfArthropodsI=412;
var goldSwordBaneOfArthropodsII=413;
var goldSwordBaneOfArthropodsIII=414;
var goldSwordSmiteI=415;
var goldSwordSmiteII=416;
var goldSwordSmiteIII=417;
var goldSwordLootingI=418;

var woodSwordSharpnessI=419;
var woodSwordSharpnessII=420;
var woodSwordSharpnessIII=421;
var woodSwordSharpnessIV=422;
var woodSwordFireAspectI=423;
var woodSwordFireAspectII=424;
var woodSwordKnockbackI=425;
var woodSwordBaneOfArthropodsI=426;
var woodSwordBaneOfArthropodsII=427;
var woodSwordBaneOfArthropodsIII=428;
var woodSwordSmiteI=429;
var woodSwordSmiteII=430;
var woodSwordSmiteIII=431;
var woodSwordLootingI=432;

var enchantLVL2 = 0;
var enchantLVL1 = 0;
var enchantLVL3 = 0;

var realEnchantLVL = 0;

var lvl1String = enchantLVL2.toString();
var lvl2String = enchantLVL1.toString();
var lvl3String = enchantLVL3.toString();

Block.defineBlock(116, "Enchantment Table", [["enchanting_table_bottom", 0],["enchanting_table_top", 0],["enchanting_table_side", 0],["enchanting_table_side", 0],["enchanting_table_side", 0],["enchanting_table_side", 0]]);
Block.setShape(116,0,0,0,1,3/4,1);
Block.setExplosionResistance(116,6000);
Block.setDestroyTime(116,5);

Item.addShapedRecipe(116,1,0,[
" b ",
"dod",
"ooo"],[
"b",340,0,
"d",264,0,
"o",49,0]);

var Orb;
var Orb2;
var Orb3;
ModPE.overrideTexture("images/mob/orb.png","http://i.imgur.com/iEcAicX.png");

//Experience bar related variables
var currentLevel=0;
var currentLevelText="";
var currentExperience=0;

//Experience you get for what you do
var experience=0;

var simpleGUI=null;
var experienceBar;
var text;

function addOrbRenderType(renderer)

{

var model = renderer.getModel();
 
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
 
head.clear();
 
body.clear();
body.setTextureOffset(0, 0, true);
body.addBox(1, 20, 0, 4, 4, 0);
 
rArm.clear();
 
lArm.clear();
 
rLeg.clear();
 
lLeg.clear();
 
}
	
var OrbRenderType = Renderer.createHumanoidRenderer();
addOrbRenderType(OrbRenderType);

function addBookRenderType(renderer)

{

var model = renderer.getModel();
 
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
 
head.clear();
 
body.clear();
body.setTextureOffset(0, 10);
body.addBox(2, 32, 0, 5, 8, 1);
body.setTextureOffset(6, 10);
body.addBox(7, 32, 0, 5, 8, 1);
body.setTextureOffset(0, 0);
body.addBox(1, 31.5, 1, 6, 9, 1);
body.setTextureOffset(14, 0);
body.addBox(7, 31.5, 1, 6, 9, 1);
 
rArm.clear();
 
lArm.clear();
 
rLeg.clear();
 
lLeg.clear();
 
}
	
var BookRenderType = Renderer.createHumanoidRenderer();
addBookRenderType(BookRenderType);

function modTick()
{
Entity.setVelY(Book, 0.01);
Entity.setVelY(Book, 0.00);

var angle = Math.atan2((Entity.getZ(getPlayerEnt()) - Entity.getZ(Orb)), (Entity.getX(getPlayerEnt()) - Entity.getX(Orb)));
Entity.setVelX(Orb,(Math.cos(angle) * 0.2));
Entity.setVelZ(Orb,(Math.sin(angle) * 0.2));

var angle2 = Math.atan2((Entity.getZ(getPlayerEnt()) - Entity.getZ(Orb3)), (Entity.getX(getPlayerEnt()) - Entity.getX(Orb3)));
Entity.setVelX(Orb3,(Math.cos(angle2) * 0.2));
Entity.setVelZ(Orb3,(Math.sin(angle2) * 0.2));

var angle3 = Math.atan2((Entity.getZ(getPlayerEnt()) - Entity.getZ(Orb2)), (Entity.getX(getPlayerEnt()) - Entity.getX(Orb2)));
Entity.setVelX(Orb2,(Math.cos(angle3) * 0.2));
Entity.setVelZ(Orb2,(Math.sin(angle3) * 0.2)); 

if(Entity.getX(Orb)-Player.getX()<=1.8&&Entity.getZ(Orb)-Player.getZ()<=1.8||Entity.getX(Orb)-Player.getX()<=-1.8&&Entity.getZ(Orb)-Player.getZ()<=1.8||Entity.getX(Orb)-Player.getX()<=1.8&&Entity.getZ(Orb)-Player.getZ()<=-1.8||Entity.getX(Orb)-Player.getX()<=-1.8&&Entity.getZ(Orb)-Player.getZ()<=-1.8)
{
	Entity.setVelY(Orb, 500);
	Entity.setHealth(Orb, 0); 
}
if(Entity.getX(Orb2)-Player.getX()<=1.8&&Entity.getZ(Orb2)-Player.getZ()<=1.8||Entity.getX(Orb2)-Player.getX()<=-1.8&&Entity.getZ(Orb2)-Player.getZ()<=1.8||Entity.getX(Orb2)-Player.getX()<=1.8&&Entity.getZ(Orb2)-Player.getZ()<=-1.8||Entity.getX(Orb2)-Player.getX()<=-1.8&&Entity.getZ(Orb2)-Player.getZ()<=-1.8)
{
	Entity.setVelY(Orb2, 500);
	Entity.setHealth(Orb2, 0);
}
if(Entity.getX(Orb3)-Player.getX()<=1.8&&Entity.getZ(Orb3)-Player.getZ()<=1.8||Entity.getX(Orb3)-Player.getX()<=-1.8&&Entity.getZ(Orb3)-Player.getZ()<=1.8||Entity.getX(Orb3)-Player.getX()<=1.8&&Entity.getZ(Orb3)-Player.getZ()<=-1.8||Entity.getX(Orb3)-Player.getX()<=-1.8&&Entity.getZ(Orb3)-Player.getZ()<=-1.8)
{
	Entity.setVelY(Orb3, 500);
	Entity.setHealth(Orb3, 0);
}
if(Level.getTile(Entity.getX(Orb),Entity.getY(Orb)-1, Entity.getZ(Orb))!=0)
{
	Entity.setVelY(Orb, 0.1);
}
if(Level.getTile(Entity.getX(Orb2),Entity.getY(Orb2)-1, Entity.getZ(Orb2))!=0)
{
	Entity.setVelY(Orb2, 0.05);
}
if(Level.getTile(Entity.getX(Orb3),Entity.getY(Orb3)-1, Entity.getZ(Orb3))!=0)
{
	Entity.setVelY(Orb3, 0.12);
}
}

ModPE.downloadFile=function(filename,url)
{
	var file=new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/ModScript/Experience/"+filename);
	file.createNewFile();
	var fos=new java.io.FileOutputStream(file);
	var response=android.net.http.AndroidHttpClient.newInstance("ModPE.downloadFile()").execute(new org.apache.http.client.methods.HttpGet(url)).getEntity().writeTo(fos);
	fos.close();
	};
var webWindow=null;
function ShowGUI(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			webWindow=new android.widget.PopupWindow();
			var webView=new android.webkit.WebView(activity);
			webView.getSettings().setJavaScriptEnabled(true);
			webView.getSettings().setUserAgentString("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0");
			webView.loadUrl("https://www.google.com");
			webWindow.setContentView(webView);
			webWindow.setWidth(0);
			webWindow.setHeight(0);
			webWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.LEFT,-100,-100);
			}
		}));
	}
function HideGUI()
{
	activity.runOnUiThread(new java.lang.Runnable(
  {
		run: function()
    {
			if(webWindow!=null)
      {
				webWindow.dismiss();
				webWindow=null;
			 }
		 }
  }));
}

var path=android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/ModScript/Experience";
if(!java.io.File(path+"fullGUI.png").exists())
{
	try
   {
		java.io.File(path).mkdirs();
		print("Checking and downloading images! Please wait while it's finished!");
		ModPE.downloadFile("emptyGUI.png","http://i.imgur.com/xv5lHMP.png");
		ModPE.downloadFile("enchanting.png","http://i.imgur.com/66Zn3kD.png");
		ModPE.downloadFile("enchantLevel.png","http://i.imgur.com/rrGdw8Y.png");
		ModPE.downloadFile("diamondSword.png","http://i.imgur.com/CLN5JYo.png");
		ModPE.downloadFile("ironSword.png","http://i.imgur.com/j1b7w82.png");
		ModPE.downloadFile("stoneSword.png","http://i.imgur.com/299LfbS.png");
		ModPE.downloadFile("goldSword.png","http://i.imgur.com/QUMGn3d.png");
		ModPE.downloadFile("woodSword.png","http://i.imgur.com/U0qo2cC.png");
		
		print("Finished! Have fun playing!");
		}
	catch(err)
	{
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		ctx.runOnUiThread(new java.lang.Runnable(){
		run: function(){
		android.widget.Toast.makeText(ctx, "Please make sure you have a stable Internet connection, else you want be able to play this Mod :(", 0).show();
		}
		}
		)
	}
}
var img1 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/emptyGUI.png");
var img2 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/enchanting.png");
var img3 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/enchantLevel.png");
var img4 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/diamondSword.png");
var img5 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/ironSword.png");
var img6 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/stoneSword.png");
var img7 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/goldSword.png");
var img8 = new android.graphics.BitmapFactory.decodeFile("mnt/sdcard/games/com.mojang/ModScript/Experience/woodSword.png");
var emptyGUI = new android.graphics.drawable.BitmapDrawable(img1);
var enchantingGUI = new android.graphics.drawable.BitmapDrawable(img2);
var enchantLevelGUI = new android.graphics.drawable.BitmapDrawable(img3);
var diamondSwordGUI = new android.graphics.drawable.BitmapDrawable(img4);
var ironSwordGUI = new android.graphics.drawable.BitmapDrawable(img5);
var stoneSwordGUI = new android.graphics.drawable.BitmapDrawable(img6);
var goldSwordGUI = new android.graphics.drawable.BitmapDrawable(img7);
var woodSwordGUI = new android.graphics.drawable.BitmapDrawable(img8);

function showUp()
{

	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run: function()
		{
			simpleGUI=new android.widget.PopupWindow(ctx);
			var layout=new android.widget.LinearLayout(ctx);
			experienceBar=new android.widget.ProgressBar(ctx,null,android.R.attr.progressBarStyleHorizontal);
			experienceBar.setLayoutParams(new android.widget.LinearLayout.LayoutParams(experienceBarWidth,experienceBarHeight));
			experienceBar.setVisibility(1);
			experienceBar.getProgressDrawable().setColorFilter(android.graphics.Color.parseColor("#11FF00"), android.graphics.PorterDuff.Mode.MULTIPLY);
			experienceBar.setBackgroundDrawable(emptyGUI);
			experienceBar.setIndeterminateDrawable(emptyGUI);
			
			text = new android.widget.TextView(ctx);
			text.setText(currentLevelText);
			text.setGravity(0x01);
			text.setTextSize(16);
			text.setTextColor(android.graphics.Color.GREEN);
			text.setShadowLayer(4, 0, 0, android.graphics.Color.BLACK);

			layout.setOrientation(1);
			layout.addView(text);
			layout.addView(experienceBar);
			simpleGUI.setContentView(layout);
			simpleGUI.setWidth(simpleGUIWidth);
			simpleGUI.setHeight(simpleGUIHeight);
			simpleGUI.setBackgroundDrawable(null);
			simpleGUI.setTouchable(false);
			simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.BOTTOM,simpleGUIPositionX,simpleGUIPositionY);
			
			experienceBar.setMax(Level1);
			experienceBar.setProgress(currentExperience);
		}
	})
}

function newLevel()
{
	checkSize();
}

function entityRemovedHook(victim)
{
	if(Entity.getEntityTypeId(victim)==10)
		{
			var chickenDrop = Math.floor((Math.random()*2)+1);
			switch(chickenDrop)
			{
			case 1:
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 365, 1);
			break;
			
			case 2:
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 288, 1);
			break;
			}
		}
		else if(Entity.getEntityTypeId(victim)==11)
		{
			var cowDrop = Math.floor((Math.random()*2)+1);
			switch(cowDrop)
			{
			case 1:
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 363, 1);
			break;
			
			case 2:
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 334, 1);
			break;
			}
		}
		else if(Entity.getEntityTypeId(victim)==12)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 365, 1);
		}
		else if(Entity.getEntityTypeId(victim)==13)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 35, 1);
		}
		else if(Entity.getEntityTypeId(victim)==16)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 363, 1);
		}
		else if(Entity.getEntityTypeId(victim)==32)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 288, 1);
		}
		else if(Entity.getEntityTypeId(victim)==33)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 289, 1);
		}
		else if(Entity.getEntityTypeId(victim)==34)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 352, 1);
		}
		else if(Entity.getEntityTypeId(victim)==35)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 287, 1);
		}
		else if(Entity.getEntityTypeId(victim)==36)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 266, 1);
		}

	if(Player.getCarriedItem()==diamondSwordLootingI||Player.getCarriedItem()==ironSwordLootingI||Player.getCarriedItem()==goldSwordLootingI||Player.getCarriedItem()==stoneSwordLootingI||Player.getCarriedItem()==woodSwordLootingI)
	{
		if(Entity.getEntityTypeId(victim)==10)
		{
			var chickenDrop = Math.floor((Math.random()*2)+1);
			switch(chickenDrop)
			{
			case 1:
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 365, 1);
			break;
			
			case 2:
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 288, 1);
			break;
			}
		}
		else if(Entity.getEntityTypeId(victim)==11)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 363, 1);
		}
		else if(Entity.getEntityTypeId(victim)==12)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 365, 1);
		}
		else if(Entity.getEntityTypeId(victim)==13)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 35, 1);
		}
		else if(Entity.getEntityTypeId(victim)==16)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 363, 1);
		}
		else if(Entity.getEntityTypeId(victim)==32)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 288, 1);
		}
		else if(Entity.getEntityTypeId(victim)==33)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 289, 1);
		}
		else if(Entity.getEntityTypeId(victim)==34)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 352, 1);
		}
		else if(Entity.getEntityTypeId(victim)==35)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 287, 1);
		}
		else if(Entity.getEntityTypeId(victim)==36)
		{
			Level.dropItem(Entity.getX(victim),Entity.getY(victim), Entity.getZ(victim),1, 266, 1);
		}
	}
}

function deathHook(me,victim)
{
	if(me==getPlayerEnt())
	{
	if(Entity.getEntityTypeId(victim)==10||Entity.getEntityTypeId(victim)==11||Entity.getEntityTypeId(victim)==12||Entity.getEntityTypeId(victim)==13||Entity.getEntityTypeId(victim)==14||Entity.getEntityTypeId(victim)==16)
	{
		experience = Math.random()*(3 - 1 + 1)+1;
		Orb = Level.spawnMob(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb, OrbRenderType.renderType);
		Orb2 = Level.spawnMob(Entity.getX(victim)-1,Entity.getY(victim)+1,Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb2, OrbRenderType.renderType);
		Orb3 = Level.spawnMob(Entity.getX(victim)+1,Entity.getY(victim)+1,Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb3, OrbRenderType.renderType);
	}
	else if(Entity.getEntityTypeId(victim)==37)
	{
		experience = Math.random()*(4 - 1 + 1)+1;
		Orb = Level.spawnMob(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb, OrbRenderType.renderType);
		Orb2 = Level.spawnMob(Entity.getX(victim)-1,Entity.getY(victim)+1,Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb2, OrbRenderType.renderType);
		Orb3 = Level.spawnMob(Entity.getX(victim)+1,Entity.getY(victim)+1,Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb3, OrbRenderType.renderType);
	}
	else if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==33||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==36||Entity.getEntityTypeId(victim)==37||Entity.getEntityTypeId(victim)==38||Entity.getEntityTypeId(victim)==39)
	{
		experience = Math.random()*(5 - 3 + 1)+3;
		Orb = Level.spawnMob(Entity.getX(victim),Entity.getY(victim),Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb, OrbRenderType.renderType);
		Orb2 = Level.spawnMob(Entity.getX(victim)-1,Entity.getY(victim)+1,Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb2, OrbRenderType.renderType);
		Orb3 = Level.spawnMob(Entity.getX(victim)+1,Entity.getY(victim)+1,Entity.getZ(victim), 11, "mob/orb.png");
		Entity.setRenderType(Orb3, OrbRenderType.renderType);
	}
	else
	{
		experience = 0;
	}
	
	xpcheck();
	}
}

function destroyBlock(x,y,z)
{
	if(Level.getTile(x,y,z)==16)
	{
		experience = Math.random()*(2 - 1 + 1)+1;
		xpcheck();
	}
	else if(Level.getTile(x,y,z)==56)
	{
		experience = Math.random()*(7 - 3 + 1)+3;
		xpcheck();
	}
	else if(Level.getTile(x,y,z)==129)
	{
		experience = Math.random()*(7 - 3 + 1)+3;
		xpcheck();
	}
	else if(Level.getTile(x,y,z)==21)
	{
		experience = Math.random()*(5 - 2 + 1)+2;
		xpcheck();
	}
	else if(Level.getTile(x,y,z)==73)
	{
		experience = Math.random()*(5 - 1 + 1)+1;
		xpcheck();
	}
	else if(Level.getTile(x,y,z)==52)
	{
		experience = Math.random()*(43 - 15 + 1)+15;
		xpcheck();
	}
	else
	{
		experience = 0;
	}
}

function xpcheck()
{
		currentExperience=currentExperience+experience;
		if(currentExperience>=Level1&&currentLevel==0)
		{
			currentExperience=currentExperience-Level1;
			experienceBar.setMax(Level2);
			currentLevel=1;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("1");
				}
			})
		}
		else if(currentExperience>=Level2&&currentLevel==1)
		{
			currentExperience=currentExperience-Level2;
			experienceBar.setMax(Level3);
			currentLevel=2;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("2");
				}
			})
		}
		else if(currentExperience>=Level3&&currentLevel==2)
		{
			currentExperience=currentExperience-Level3;
			experienceBar.setMax(Level4);
			currentLevel=3;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("3");
				}
			})
		}
		else if(currentExperience>=Level4&&currentLevel==3)
		{
			currentExperience=currentExperience-Level4;
			experienceBar.setMax(Level5);
			currentLevel=4;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("4");
				}
			})
		}
		else if(currentExperience>=Level5&&currentLevel==4)
		{
			currentExperience=currentExperience-Level5;
			experienceBar.setMax(Level6);
			currentLevel=5;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("5");
				}
			})
		}
		else if(currentExperience>=Level6&&currentLevel==5)
		{
			currentExperience=currentExperience-Level6;
			experienceBar.setMax(Level7);
			currentLevel=6;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("6");
				}
			})
		}
		else if(currentExperience>=Level7&&currentLevel==6)
		{
			currentExperience=currentExperience-Level7;
			experienceBar.setMax(Level8);
			currentLevel=7;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("7");
				}
			})
		}
		else if(currentExperience>=Level8&&currentLevel==7)
		{
			currentExperience=currentExperience-Level8;
			experienceBar.setMax(Level9);
			currentLevel=8;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("8");
				}
			})
		}
		else if(currentExperience>=Level9&&currentLevel==8)
		{
			currentExperience=currentExperience-Level9;
			experienceBar.setMax(Level10);
			currentLevel=9;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("9");
				}
			})
		}
		else if(currentExperience>=Level10&&currentLevel==9)
		{
			currentExperience=currentExperience-Level10;
			experienceBar.setMax(Level11);
			currentLevel=10;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("10");
				}
			})
		}
		else if(currentExperience>=Level11&&currentLevel==10)
		{
			currentExperience=currentExperience-Level11;
			experienceBar.setMax(Level12);
			currentLevel=11;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("11");
				}
			})
		}
		else if(currentExperience>=Level12&&currentLevel==11)
		{
			currentExperience=currentExperience-Level12;
			experienceBar.setMax(Level13);
			currentLevel=12;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("12");
				}
			})
		}
		else if(currentExperience>=Level13&&currentLevel==12)
		{
			currentExperience=currentExperience-Level13;
			experienceBar.setMax(Level14);
			currentLevel=13;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("13");
				}
			})
		}
		else if(currentExperience>=Level14&&currentLevel==13)
		{
			currentExperience=currentExperience-Level14;
			experienceBar.setMax(Level15);
			currentLevel=14;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("14");
				}
			})
		}
		else if(currentExperience>=Level15&&currentLevel==14)
		{
			currentExperience=currentExperience-Level15;
			experienceBar.setMax(Level16);
			currentLevel=15;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("15");
				}
			})
		}
		else if(currentExperience>=Level16&&currentLevel==15)
		{
			currentExperience=currentExperience-Level16;
			experienceBar.setMax(Level17);
			currentLevel=16;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("16");
				}
			})
		}
		else if(currentExperience>=Level17&&currentLevel==16)
		{
			currentExperience=currentExperience-Level17;
			experienceBar.setMax(Level18);
			currentLevel=17;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("17");
				}
			})
		}
		else if(currentExperience>=Level18&&currentLevel==17)
		{
			currentExperience=currentExperience-Level18;
			experienceBar.setMax(Level19);
			currentLevel=18;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("18");
				}
			})
		}
		else if(currentExperience>=Level19&&currentLevel==18)
		{
			currentExperience=currentExperience-Level19;
			experienceBar.setMax(Level20);
			currentLevel=19;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("19");
				}
			})
		}
		else if(currentExperience>=Level20&&currentLevel==19)
		{
			currentExperience=currentExperience-Level20;
			experienceBar.setMax(Level21);
			currentLevel=20;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("20");
				}
			})
		}
		else if(currentExperience>=Level21&&currentLevel==20)
		{
			currentExperience=currentExperience-Level21;
			experienceBar.setMax(Level22);
			currentLevel=21;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("21");
				}
			})
		}
		else if(currentExperience>=Level22&&currentLevel==21)
		{
			currentExperience=currentExperience-Level22;
			experienceBar.setMax(Level23);
			currentLevel=22;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("22");
				}
			})
		}
		else if(currentExperience>=Level23&&currentLevel==22)
		{
			currentExperience=currentExperience-Level23;
			experienceBar.setMax(Level24);
			currentLevel=23;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("23");
				}
			})
		}
		else if(currentExperience>=Level24&&currentLevel==23)
		{
			currentExperience=currentExperience-Level24;
			experienceBar.setMax(Level25);
			currentLevel=24;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("24");
				}
			})
		}
		else if(currentExperience>=Level25&&currentLevel==24)
		{
			currentExperience=currentExperience-Level25;
			experienceBar.setMax(Level26);
			currentLevel=25;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("25");
				}
			})
		}
		else if(currentExperience>=Level26&&currentLevel==25)
		{
			currentExperience=currentExperience-Level26;
			experienceBar.setMax(Level27);
			currentLevel=26;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("26");
				}
			})
		}
		else if(currentExperience>=Level27&&currentLevel==26)
		{
			currentExperience=currentExperience-Level27;
			experienceBar.setMax(Level28);
			currentLevel=27;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("27");
				}
			})
		}
		else if(currentExperience>=Level28&&currentLevel==27)
		{
			currentExperience=currentExperience-Level28;
			experienceBar.setMax(Level29);
			currentLevel=28;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("28");
				}
			})
		}
		else if(currentExperience>=Level29&&currentLevel==28)
		{
			currentExperience=currentExperience-Level29;
			experienceBar.setMax(Level30);
			currentLevel=29;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("29");
				}
			})
		}
		else if(currentExperience>=Level30&&currentLevel==29)
		{
			currentExperience=currentExperience-Level30;
			experienceBar.setMax(Level30);
			currentLevel=30;
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable()
			{
				run: function()
				{
					text.setText("30");
				}
			})
		}
		
		experienceBar.setProgress(currentExperience);
}

function leaveGame()
{
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run: function()
		{
			simpleGUI.dismiss();
			
			if(guiActive==true)
			{
				GUIEnchanting.dismiss();
				GUIEnchanting1.dismiss();
				GUIEnchanting2.dismiss();
				GUIEnchanting3.dismiss();
				GUILevel1.dismiss();
				GUILevel2.dismiss();
				GUILevel3.dismiss();
				GUILevelText1.dismiss();
				GUILevelText2.dismiss();
				GUILevelText3.dismiss();
				clearEnchanted();
				guiActive=false;
			}
		}
	}
	)
}

function useItem(x,y,z,i,b)
{

	if(b==116&&guiActive==false)
	{
	guiActive=true;
	enchantLVL1 = Math.floor(Math.random()*(2 - 1 + 1))+1;
	enchantLVL2 = Math.floor(Math.random()*(6 - 1 + 1))+1;
	enchantLVL3 = Math.floor(Math.random()*(8 - 1 + 1))+1;
	
	if(Level.getTile(x+2,y,z)==47&&Level.getTile(x-2,y,z)==47&&Level.getTile(x,y,z+2)==47&&Level.getTile(x,y,z-2)==47)
	{
		enchantLVL1 = Math.floor(Math.random()*(4 - 1 + 1))+1;
		enchantLVL2 = Math.floor(Math.random()*(10 - 3 + 1))+3;
		enchantLVL3 = Math.floor(Math.random()*(14 - 8 + 1))+8;
	}
	if(Level.getTile(x+2,y,z)==47&&Level.getTile(x-2,y,z)==47&&Level.getTile(x,y,z+2)==47&&Level.getTile(x,y,z-2)==47&&Level.getTile(x+2,y,z+2)==47&&Level.getTile(x-2,y,z+2)==47&&Level.getTile(x+2,y,z-2)==47&&Level.getTile(x-2,y,z-2)==47)
	{
		enchantLVL1 = Math.floor(Math.random()*(6 - 1 + 1))+1;
		enchantLVL2 = Math.floor(Math.random()*(14 - 4 + 1))+4;
		enchantLVL3 = Math.floor(Math.random()*(20 - 16 + 1))+16;
	}
	if(Level.getTile(x+2,y,z)==47&&Level.getTile(x-2,y,z)==47&&Level.getTile(x,y,z+2)==47&&Level.getTile(x,y,z-2)==47&&Level.getTile(x+2,y,z+2)==47&&Level.getTile(x-2,y,z+2)==47&&Level.getTile(x+2,y,z-2)==47&&Level.getTile(x-2,y,z-2)==47&&Level.getTile(x+1,y,z+2)==47&&Level.getTile(x-1,y,z+2)==47&&Level.getTile(x+1,y,z-2)==47&&Level.getTile(x-1,y,z-2)==47&&Level.getTile(x+2,y,z+1)==47&&Level.getTile(x-2,y,z+1)==47&&Level.getTile(x+2,y,z-1)==47&&Level.getTile(x-2,y,z-1)==47)
	{
		enchantLVL1 = Math.floor(Math.random()*(10 - 2 + 1))+2;
		enchantLVL2 = Math.floor(Math.random()*(21 - 6 + 1))+6;
		enchantLVL3 = Math.floor(Math.random()*(30 - 30 + 1))+30;
	}
	
	var lvl1String = enchantLVL2.toString();
	var lvl2String = enchantLVL1.toString();
	var lvl3String = enchantLVL3.toString();
	
	Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run: function()
		{
			try
			{
			GUIEnchanting = new android.widget.PopupWindow();
			var layout = new android.widget.LinearLayout(ctx);
			layout.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUIEnchanting.setContentView(layout);
			GUIEnchanting.setWidth(GUIEnchantingWidth);
			GUIEnchanting.setHeight(GUIEnchantingHeight);
			var btnNothing = new android.widget.Button(ctx);
			layout.addView(btnNothing);
			btnNothing.setBackgroundDrawable(enchantingGUI);
			btnNothing.setText("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
			btnNothing.setOnClickListener(new android.view.View.OnClickListener({
			onClick: function(viewarg)
			{
				GUIEnchanting.dismiss();
				GUIEnchanting1.dismiss();
				GUIEnchanting2.dismiss();
				GUIEnchanting3.dismiss();
				GUILevel1.dismiss();
				GUILevel2.dismiss();
				GUILevel3.dismiss();
				GUILevelText1.dismiss();
				GUILevelText2.dismiss();
				GUILevelText3.dismiss();
				clearEnchanted();
				guiActive=false;
			}}))
			GUIEnchanting.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
			
			
			
			
			
			
			if(Player.getCarriedItem()==diamondSword)
			{
			
			GUIItem=new android.widget.PopupWindow(ctx);
			var layout=new android.widget.LinearLayout(ctx);

			layout.setOrientation(1);
			GUIItem.setContentView(layout);
			GUIItem.setWidth(GUIItemSize);
			GUIItem.setHeight(GUIItemSize);
			GUIItem.setBackgroundDrawable(diamondSwordGUI);
			GUIItem.setTouchable(false);
			GUIItem.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIItemPositionX,GUIItemPositionY);
			diamondSwordActive=true;
			itemToo=true;
			}
			
			else if(Player.getCarriedItem()==ironSword)
			{
			
			GUIItem=new android.widget.PopupWindow(ctx);
			var layout=new android.widget.LinearLayout(ctx);

			layout.setOrientation(1);
			GUIItem.setContentView(layout);
			GUIItem.setWidth(GUIItemSize);
			GUIItem.setHeight(GUIItemSize);
			GUIItem.setBackgroundDrawable(ironSwordGUI);
			GUIItem.setTouchable(false);
			GUIItem.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIItemPositionX,GUIItemPositionY);
			ironSwordActive=true;
			itemToo=true;
			}
			
			else if(Player.getCarriedItem()==stoneSword)
			{
			
			GUIItem=new android.widget.PopupWindow(ctx);
			var layout=new android.widget.LinearLayout(ctx);

			layout.setOrientation(1);
			GUIItem.setContentView(layout);
			GUIItem.setWidth(GUIItemSize);
			GUIItem.setHeight(GUIItemSize);
			GUIItem.setBackgroundDrawable(stoneSwordGUI);
			GUIItem.setTouchable(false);
			GUIItem.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIItemPositionX,GUIItemPositionY);
			stoneSwordActive=true;
			itemToo=true;
			}
			
			else if(Player.getCarriedItem()==goldSword)
			{
			
			GUIItem=new android.widget.PopupWindow(ctx);
			var layout=new android.widget.LinearLayout(ctx);

			layout.setOrientation(1);
			GUIItem.setContentView(layout);
			GUIItem.setWidth(GUIItemSize);
			GUIItem.setHeight(GUIItemSize);
			GUIItem.setBackgroundDrawable(goldSwordGUI);
			GUIItem.setTouchable(false);
			GUIItem.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIItemPositionX,GUIItemPositionY);
			goldSwordActive=true;
			itemToo=true;
			}
			
			else if(Player.getCarriedItem()==woodSword)
			{
			
			GUIItem=new android.widget.PopupWindow(ctx);
			var layout=new android.widget.LinearLayout(ctx);

			layout.setOrientation(1);
			GUIItem.setContentView(layout);
			GUIItem.setWidth(GUIItemSize);
			GUIItem.setHeight(GUIItemSize);
			GUIItem.setBackgroundDrawable(woodSwordGUI);
			GUIItem.setTouchable(false);
			GUIItem.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIItemPositionX,GUIItemPositionY);
			woodSwordActive=true;
			itemToo=true;
			}
			
			GUIEnchanting1=new android.widget.PopupWindow(ctx);
			var layout1=new android.widget.LinearLayout(ctx);
			
			var textEnchanting1 = new android.widget.TextView(ctx);
			textEnchanting1.setText("│┤║╣╗╝¢┐└┴┬├─┼╚╔╩╦╠T∩L╝¢┐└┴┬├═╬¦ı∟⌂ΞT∩L⊂‡");
			textEnchanting1.setTextSize(GUITextSize);
			textEnchanting1.setOnClickListener(new android.view.View.OnClickListener({ 
			onClick: function(viewarg)
			{
				GUIEnchanting.dismiss();
				GUIEnchanting1.dismiss();
				GUIEnchanting2.dismiss();
				GUIEnchanting3.dismiss();
				GUILevel1.dismiss();
				GUILevel2.dismiss();
				GUILevel3.dismiss();
				GUILevelText1.dismiss();
				GUILevelText2.dismiss();
				GUILevelText3.dismiss();
				Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
				realEnchantLVL = enchantLVL1;
				enchant();
				updateLevel();
				clearEnchanted();
				guiActive=false;
			}
			}
			))
			textEnchanting1.setTextColor(android.graphics.Color.WHITE);

			layout1.setOrientation(1);
			layout1.addView(textEnchanting1);
			GUIEnchanting1.setContentView(layout1);
			GUIEnchanting1.setWidth(GUIEnchanting123Width);
			GUIEnchanting1.setHeight(GUIEnchanting123Height);
			GUIEnchanting1.setBackgroundDrawable(null);
			GUIEnchanting1.setTouchable(true);
			GUIEnchanting1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIEnchanting123PositionX,GUIEnchanting1PositionY);
			
			
			
			GUIEnchanting2=new android.widget.PopupWindow(ctx);
			var layout2=new android.widget.LinearLayout(ctx);
			
			var textEnchanting2 = new android.widget.TextView(ctx);
			textEnchanting2.setText("¢┐└┴│┤├═╬¦ı∟⌂ΞT║╣╗╝╠T╦┐└┴┬∩L╝¢┬├─┼╚╔╩∩L⊂‡");
			textEnchanting2.setTextSize(GUITextSize);
			textEnchanting2.setOnClickListener(new android.view.View.OnClickListener({ 
			onClick: function(viewarg)
			{
				GUIEnchanting.dismiss();
				GUIEnchanting1.dismiss();
				GUIEnchanting2.dismiss();
				GUIEnchanting3.dismiss();
				GUILevel1.dismiss();
				GUILevel2.dismiss();
				GUILevel3.dismiss();
				GUILevelText1.dismiss();
				GUILevelText2.dismiss();
				GUILevelText3.dismiss();
				Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
				realEnchantLVL = enchantLVL2;
				enchant();
				updateLevel();
				clearEnchanted();
				guiActive=false;
			}
			}
			))
			textEnchanting2.setTextColor(android.graphics.Color.WHITE);

			layout2.setOrientation(1);
			layout2.addView(textEnchanting2);
			GUIEnchanting2.setContentView(layout2);
			GUIEnchanting2.setWidth(GUIEnchanting123Width);
			GUIEnchanting2.setHeight(GUIEnchanting123Height);
			GUIEnchanting2.setBackgroundDrawable(null);
			GUIEnchanting2.setTouchable(true);
			GUIEnchanting2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIEnchanting123PositionX,GUIEnchanting2PositionY);
			
			
			
			GUIEnchanting3=new android.widget.PopupWindow(ctx);
			var layout3=new android.widget.LinearLayout(ctx);
			
			var textEnchanting3 = new android.widget.TextView(ctx);
			textEnchanting3.setText("┼╚╔╩L╝¢┐└│┤╝¢┐└┴├─┴╦╠T∩∩L⊂‡║┬├═╬¦ı∟⌂ΞT╣╗┬");
			textEnchanting3.setTextSize(GUITextSize);
			textEnchanting3.setOnClickListener(new android.view.View.OnClickListener({ 
			onClick: function(viewarg)
			{
				GUIEnchanting.dismiss();
				GUIEnchanting1.dismiss();
				GUIEnchanting2.dismiss();
				GUIEnchanting3.dismiss();
				GUILevel1.dismiss();
				GUILevel2.dismiss();
				GUILevel3.dismiss();
				GUILevelText1.dismiss();
				GUILevelText2.dismiss();
				GUILevelText3.dismiss();
				Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 100, 30);
				realEnchantLVL = enchantLVL3;
				enchant();
				updateLevel();
				clearEnchanted();
				guiActive=false;
			}
			}
			))
			textEnchanting3.setTextColor(android.graphics.Color.WHITE);

			layout3.setOrientation(1);
			layout3.addView(textEnchanting3);
			GUIEnchanting3.setContentView(layout3);
			GUIEnchanting3.setWidth(GUIEnchanting123Width);
			GUIEnchanting3.setHeight(GUIEnchanting123Height);
			GUIEnchanting3.setBackgroundDrawable(null);
			GUIEnchanting3.setTouchable(true);
			GUIEnchanting3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER,GUIEnchanting123PositionX,GUIEnchanting3PositionY);
			
			
			
			GUILevel1 = new android.widget.PopupWindow();
			var layout4 = new android.widget.LinearLayout(ctx);
			layout4.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUILevel1.setContentView(layout4);
			GUILevel1.setWidth(GUILevel123Size);
			GUILevel1.setHeight(GUILevel123Size);
			var btn1 = new android.widget.Button(ctx);
			layout4.addView(btn1);
			btn1.setBackgroundDrawable(enchantLevelGUI);
			GUILevel1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, GUILevel123PositionX, GUILevel1PositionY);
			
			
			
			GUILevel2 = new android.widget.PopupWindow();
			var layout5 = new android.widget.LinearLayout(ctx);
			layout5.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUILevel2.setContentView(layout5);
			GUILevel2.setWidth(GUILevel123Size);
			GUILevel2.setHeight(GUILevel123Size);
			var btn2 = new android.widget.Button(ctx);
			layout5.addView(btn2);
			btn2.setBackgroundDrawable(enchantLevelGUI);
			GUILevel2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, GUILevel123PositionX, GUILevel2PositionY);
			
			
			
			GUILevel3 = new android.widget.PopupWindow();
			var layout6 = new android.widget.LinearLayout(ctx);
			layout6.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUILevel3.setContentView(layout6);
			GUILevel3.setWidth(GUILevel123Size);
			GUILevel3.setHeight(GUILevel123Size);
			var btn3 = new android.widget.Button(ctx);
			layout6.addView(btn3);
			btn3.setBackgroundDrawable(enchantLevelGUI);
			GUILevel3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, GUILevel123PositionX, GUILevel3PositionY);
			
			
			
			GUILevelText1 = new android.widget.PopupWindow();
			var layout7 = new android.widget.LinearLayout(ctx);
			layout7.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUILevelText1.setContentView(layout7);
			GUILevelText1.setWidth(GUILevelText123Size);
			GUILevelText1.setHeight(GUILevelText123Size);
			var text1 = new android.widget.TextView(ctx);
			text1.setText(lvl1String);
			text1.setGravity(0x01);
			text1.setTypeface(null,1);
			text1.setTextColor(android.graphics.Color.YELLOW);
			text1.setShadowLayer(4, 0, 0, android.graphics.Color.BLACK);
			layout7.addView(text1);
			GUILevelText1.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, GUILevelText123PositionX, GUILevelText1PositionY);
			
			
			
			GUILevelText2 = new android.widget.PopupWindow();
			var layout8 = new android.widget.LinearLayout(ctx);
			layout8.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUILevelText2.setContentView(layout8);
			GUILevelText2.setWidth(GUILevelText123Size);
			GUILevelText2.setHeight(GUILevelText123Size);
			var text2 = new android.widget.TextView(ctx);
			text2.setText(lvl2String);
			text2.setGravity(0x01);
			text2.setTypeface(null,1);
			text2.setTextColor(android.graphics.Color.YELLOW);
			text2.setShadowLayer(4, 0, 0, android.graphics.Color.BLACK);
			layout8.addView(text2);
			GUILevelText2.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, GUILevelText123PositionX, GUILevelText2PositionY);
			
			
			
			GUILevelText3 = new android.widget.PopupWindow();
			var layout9 = new android.widget.LinearLayout(ctx);
			layout9.setOrientation(android.widget.LinearLayout.VERTICAL);
			GUILevelText3.setContentView(layout9);
			GUILevelText3.setWidth(GUILevelText123Size);
			GUILevelText3.setHeight(GUILevelText123Size);
			var text3 = new android.widget.TextView(ctx);
			text3.setText(lvl3String);
			text3.setGravity(0x01);
			text3.setTypeface(null,1);
			text3.setTextColor(android.graphics.Color.YELLOW);
			text3.setShadowLayer(4, 0, 0, android.graphics.Color.BLACK);
			layout9.addView(text3);
			GUILevelText3.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, GUILevelText123PositionX, GUILevelText3PositionY);
			}
			catch(err)
			{
				print(err);
			}
			}
		})
	}
}

function clearEnchanted()
{
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run: function()
		{
				if(itemToo==true)
				{
				GUIItem.dismiss();
				itemToo=false;
				}
		}
	})
}

function enchant()
{
	if(currentLevel>=realEnchantLVL)
	{
	
	if(diamondSwordActive==true&&Player.getCarriedItem()==diamondSword)
	{
		yourItem = Player.getCarriedItem();
		Entity.setCarriedItem(getPlayerEnt(), yourItem, -1);
		if(realEnchantLVL==1)
		{
			var randomDiamondSword = Math.floor((Math.random()*1)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==2||realEnchantLVL==3||realEnchantLVL==4||realEnchantLVL==5)
		{
			var randomDiamondSword = Math.floor((Math.random()*3)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordSmiteI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==6||realEnchantLVL==7)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==8)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==9)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==10)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordKnockbackI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==11)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==12||realEnchantLVL==13||realEnchantLVL==14)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==15)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==16)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==17||realEnchantLVL==18||realEnchantLVL==19||realEnchantLVL==20||realEnchantLVL==21)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==22||realEnchantLVL==23||realEnchantLVL==24||realEnchantLVL==25||realEnchantLVL==26)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==27||realEnchantLVL==28||realEnchantLVL==29||realEnchantLVL==30)
		{
			var randomDiamondSword = Math.floor((Math.random()*5)+1);
			switch(randomDiamondSword)
			{
				case 1:
					Player.addItemInventory(diamondSwordSharpnessIV, 1);	
				break;
				
				case 2:
					Player.addItemInventory(diamondSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(diamondSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(diamondSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(diamondSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
	}
	
	if(woodSwordActive==true&&Player.getCarriedItem()==woodSword)
	{
		yourItem = Player.getCarriedItem();
		Entity.setCarriedItem(getPlayerEnt(), yourItem, -1);
		if(realEnchantLVL==1)
		{
			var randomWoodSword = Math.floor((Math.random()*1)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==2||realEnchantLVL==3||realEnchantLVL==4||realEnchantLVL==5)
		{
			var randomWoodSword = Math.floor((Math.random()*3)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordSmiteI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==6||realEnchantLVL==7)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==8)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==9)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==10)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordKnockbackI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==11)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==12||realEnchantLVL==13||realEnchantLVL==14)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==15)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==16)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==17||realEnchantLVL==18||realEnchantLVL==19||realEnchantLVL==20||realEnchantLVL==21)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==22||realEnchantLVL==23||realEnchantLVL==24||realEnchantLVL==25||realEnchantLVL==26)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==27||realEnchantLVL==28||realEnchantLVL==29||realEnchantLVL==30)
		{
			var randomWoodSword = Math.floor((Math.random()*5)+1);
			switch(randomWoodSword)
			{
				case 1:
					Player.addItemInventory(woodSwordSharpnessIV, 1);	
				break;
				
				case 2:
					Player.addItemInventory(woodSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(woodSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(woodSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(woodSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
	}
	
	if(goldSwordActive==true&&Player.getCarriedItem()==goldSword)
	{
		yourItem = Player.getCarriedItem();
		Entity.setCarriedItem(getPlayerEnt(), yourItem, -1);
		if(realEnchantLVL==1)
		{
			var randomGoldSword = Math.floor((Math.random()*1)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==2||realEnchantLVL==3||realEnchantLVL==4||realEnchantLVL==5)
		{
			var randomGoldSword = Math.floor((Math.random()*3)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordSmiteI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==6||realEnchantLVL==7)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==8)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==9)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==10)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordKnockbackI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==11)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==12||realEnchantLVL==13||realEnchantLVL==14)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==15)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==16)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==17||realEnchantLVL==18||realEnchantLVL==19||realEnchantLVL==20||realEnchantLVL==21)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==22||realEnchantLVL==23||realEnchantLVL==24||realEnchantLVL==25||realEnchantLVL==26)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==27||realEnchantLVL==28||realEnchantLVL==29||realEnchantLVL==30)
		{
			var randomGoldSword = Math.floor((Math.random()*5)+1);
			switch(randomGoldSword)
			{
				case 1:
					Player.addItemInventory(goldSwordSharpnessIV, 1);	
				break;
				
				case 2:
					Player.addItemInventory(goldSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(goldSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(goldSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(goldSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
	}
	
	if(ironSwordActive==true&&Player.getCarriedItem()==ironSword)
	{
		yourItem = Player.getCarriedItem();
		Entity.setCarriedItem(getPlayerEnt(), yourItem, -1);
		if(realEnchantLVL==1)
		{
			var randomIronSword = Math.floor((Math.random()*1)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==2||realEnchantLVL==3||realEnchantLVL==4||realEnchantLVL==5)
		{
			var randomIronSword = Math.floor((Math.random()*3)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordSmiteI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==6||realEnchantLVL==7)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==8)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==9)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==10)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordKnockbackI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==11)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==12||realEnchantLVL==13||realEnchantLVL==14)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==15)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==16)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==17||realEnchantLVL==18||realEnchantLVL==19||realEnchantLVL==20||realEnchantLVL==21)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==22||realEnchantLVL==23||realEnchantLVL==24||realEnchantLVL==25||realEnchantLVL==26)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==27||realEnchantLVL==28||realEnchantLVL==29||realEnchantLVL==30)
		{
			var randomIronSword = Math.floor((Math.random()*5)+1);
			switch(randomIronSword)
			{
				case 1:
					Player.addItemInventory(ironSwordSharpnessIV, 1);	
				break;
				
				case 2:
					Player.addItemInventory(ironSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(ironSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(ironSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(ironSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
	}
	
	if(stoneSwordActive==true&&Player.getCarriedItem()==stoneSword)
	{
		yourItem = Player.getCarriedItem();
		Entity.setCarriedItem(getPlayerEnt(), yourItem, -1);
		if(realEnchantLVL==1)
		{
			var randomStoneSword = Math.floor((Math.random()*1)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==2||realEnchantLVL==3||realEnchantLVL==4||realEnchantLVL==5)
		{
			var randomStoneSword = Math.floor((Math.random()*3)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordSmiteI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==6||realEnchantLVL==7)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==8)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessI, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==9)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordKnockbackI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordSmiteI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==10)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordKnockbackI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==11)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteI, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==12||realEnchantLVL==13||realEnchantLVL==14)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==15)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==16)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==17||realEnchantLVL==18||realEnchantLVL==19||realEnchantLVL==20||realEnchantLVL==21)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectI, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==22||realEnchantLVL==23||realEnchantLVL==24||realEnchantLVL==25||realEnchantLVL==26)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessIII, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
		else if(realEnchantLVL==27||realEnchantLVL==28||realEnchantLVL==29||realEnchantLVL==30)
		{
			var randomStoneSword = Math.floor((Math.random()*5)+1);
			switch(randomStoneSword)
			{
				case 1:
					Player.addItemInventory(stoneSwordSharpnessIV, 1);	
				break;
				
				case 2:
					Player.addItemInventory(stoneSwordSmiteIII, 1);	
				break;
				
				case 3:
					Player.addItemInventory(stoneSwordFireAspectII, 1);	
				break;
				
				case 4:
					Player.addItemInventory(stoneSwordBaneOfArthropodsIII, 1);	
				break;
				
				case 5:
					Player.addItemInventory(stoneSwordLootingI, 1);	
				break;
			}
			currentLevel=currentLevel-realEnchantLVL;
		}
	}
	
	else
	{
		print("Take the correct item in the hand you cheater!");
	}
	}
	else
	{
		print("You have to reach the right Level!");
	}
}

function attackHook(attacker, victim)
{
	if(Player.getCarriedItem()==ironSwordSharpnessI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6.25);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordSharpnessIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-8.75);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordSharpnessIV)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-10);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordLootingI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordSharpnessII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordFireAspectI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		Entity.setFireTicks(victim, 3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordFireAspectII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		Entity.setFireTicks(victim, 6);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordKnockbackI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		setVelX(victim, 1.5 * Math.cos((getYaw()+90)*(Math.PI/180)));
		setVelY(victim, 1);
		setVelZ(victim, 1.5 * Math.sin((getYaw()+90)*(Math.PI/180)));
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordBaneOfArthropodsI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordBaneOfArthropodsII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordBaneOfArthropodsIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordSmiteI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordSmiteII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==ironSwordSmiteIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	
	
	if(Player.getCarriedItem()==goldSwordSharpnessI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4.25);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordSharpnessIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6.75);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordSharpnessIV)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-8);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordLootingI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordSharpnessII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5.5);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordFireAspectI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		Entity.setFireTicks(victim, 3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordFireAspectII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		Entity.setFireTicks(victim, 6);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordKnockbackI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		setVelX(victim, 1.5 * Math.cos((getYaw()+90)*(Math.PI/180)));
		setVelY(victim, 1);
		setVelZ(victim, 1.5 * Math.sin((getYaw()+90)*(Math.PI/180)));
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordBaneOfArthropodsI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordBaneOfArthropodsII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordBaneOfArthropodsIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordSmiteI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordSmiteII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==goldSwordSmiteIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	
	if(Player.getCarriedItem()==woodSwordSharpnessI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4.25);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordSharpnessIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6.75);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordSharpnessIV)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-8);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordLootingI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordSharpnessII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-5.5);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordFireAspectI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		Entity.setFireTicks(victim, 3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordFireAspectII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		Entity.setFireTicks(victim, 6);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordKnockbackI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		setVelX(victim, 1.5 * Math.cos((getYaw()+90)*(Math.PI/180)));
		setVelY(victim, 1);
		setVelZ(victim, 1.5 * Math.sin((getYaw()+90)*(Math.PI/180)));
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordBaneOfArthropodsI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordBaneOfArthropodsII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordBaneOfArthropodsIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordSmiteI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordSmiteII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==woodSwordSmiteIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-3);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==35)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	
	if(Player.getCarriedItem()==diamondSwordSharpnessI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-7.25);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordSharpnessIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-9.75);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordSharpnessIV)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-11);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordLootingI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordSharpnessII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-8.5);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordFireAspectI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		Entity.setFireTicks(victim, 3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordFireAspectII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		Entity.setFireTicks(victim, 6);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordKnockbackI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		setVelX(victim, 1.5 * Math.cos((getYaw()+90)*(Math.PI/180)));
		setVelY(victim, 1);
		setVelZ(victim, 1.5 * Math.sin((getYaw()+90)*(Math.PI/180)));
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordBaneOfArthropodsI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordBaneOfArthropodsII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordBaneOfArthropodsIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordSmiteI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==36)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordSmiteII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==36)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==diamondSwordSmiteIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==36)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSharpnessI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-7.25);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSharpnessIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-7.75);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSharpnessIV)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-9);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordLootingI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSharpnessII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-6.5);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordFireAspectI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		Entity.setFireTicks(victim, 3);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordFireAspectII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		Entity.setFireTicks(victim, 4);
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordKnockbackI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		setVelX(victim, 1.5 * Math.cos((getYaw()+90)*(Math.PI/180)));
		setVelY(victim, 1);
		setVelZ(victim, 1.5 * Math.sin((getYaw()+90)*(Math.PI/180)));
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordBaneOfArthropodsI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordBaneOfArthropodsII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordBaneOfArthropodsIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getEntityTypeId(victim)==35||Entity.getEntityTypeId(victim)==39)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSmiteI)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==34)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-2.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSmiteII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==34)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(Player.getCarriedItem()==stoneSwordSmiteIII)
	{
		Entity.setHealth(victim, Entity.getHealth(victim)-4);
		if(Entity.getEntityTypeId(victim)==32||Entity.getEntityTypeId(victim)==34||Entity.getEntityTypeId(victim)==34)
		{
			Entity.setHealth(victim, Entity.getHealth(victim)-7.5);
		}
		if(Entity.getHealth(victim)<0)
		{
			Entity.setHealth(victim, 0);
		}
	}
	if(victim==Book)
	{
		preventDefault();
	}
}

function updateLevel()
{
	currentExperience=0;

	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable()
	{
		run: function()
		{
			
			experienceBar.setProgress(currentExperience);
		}
	})

					if(currentLevel==0)
					{
						text.setText("");
						experienceBar.setMax(Level1);
					}
					else if(currentLevel==1)
					{
						text.setText("1");
						experienceBar.setMax(Level2);
					}
					else if(currentLevel==2)
					{
						text.setText("2");
						experienceBar.setMax(Level3);
					}
					else if(currentLevel==3)
					{
						text.setText("3");
						experienceBar.setMax(Level4);
					}
					else if(currentLevel==4)
					{
						text.setText("4");
						experienceBar.setMax(Level5);
					}
					else if(currentLevel==5)
					{
						text.setText("5");
						experienceBar.setMax(Level6);
					}
					else if(currentLevel==6)
					{
						text.setText("6");
						experienceBar.setMax(Level7);
					}
					else if(currentLevel==7)
					{
						text.setText("7");
						experienceBar.setMax(Level8);
					}
					else if(currentLevel==8)
					{
						text.setText("8");
						experienceBar.setMax(Level9);
					}
					else if(currentLevel==9)
					{
						text.setText("9");
						experienceBar.setMax(Level10);
					}
					else if(currentLevel==10)
					{
						text.setText("10");
						experienceBar.setMax(Level11);
					}
					else if(currentLevel==11)
					{
						text.setText("11");
						experienceBar.setMax(Level12);
					}
					else if(currentLevel==12)
					{
						text.setText("12");
						experienceBar.setMax(Level13);
					}
					else if(currentLevel==13)
					{
						text.setText("13");
						experienceBar.setMax(Level14);
					}
					else if(currentLevel==14)
					{
						text.setText("14");
						experienceBar.setMax(Level15);
					}
					else if(currentLevel==15)
					{
						text.setText("15");
						experienceBar.setMax(Level16);
					}
					else if(currentLevel==16)
					{
						text.setText("16");
						experienceBar.setMax(Level17);
					}
					else if(currentLevel==17)
					{
						text.setText("17");
						experienceBar.setMax(Level18);
					}
					else if(currentLevel==18)
					{
						text.setText("18");
						experienceBar.setMax(Level19);
					}
					else if(currentLevel==19)
					{
						text.setText("19");
						experienceBar.setMax(Level20);
					}
					else if(currentLevel==20)
					{
						text.setText("20");
						experienceBar.setMax(Level21);
					}
					else if(currentLevel==21)
					{
						text.setText("21");
						experienceBar.setMax(Level22);
					}
					else if(currentLevel==22)
					{
						text.setText("22");
						experienceBar.setMax(Level23);
					}
					else if(currentLevel==23)
					{
						text.setText("23");
						experienceBar.setMax(Level24);
					}
					else if(currentLevel==24)
					{
						text.setText("24");
						experienceBar.setMax(Level25);
					}
					else if(currentLevel==25)
					{
						text.setText("25");
						experienceBar.setMax(Level26);
					}
					else if(currentLevel==26)
					{
						text.setText("26");
						experienceBar.setMax(Level27);
					}
					else if(currentLevel==27)
					{
						text.setText("27");
						experienceBar.setMax(Level28);
					}
					else if(currentLevel==28)
					{
						text.setText("28");
						experienceBar.setMax(Level29);
					}
					else if(currentLevel==29)
					{
						text.setText("29");
						experienceBar.setMax(Level30);
					}
					else if(currentLevel==30)
					{
						text.setText("30");
						experienceBar.setMax(Level30);
					}
}