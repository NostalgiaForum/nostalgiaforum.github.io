function newLevel(){
clientMessage(ChatColor.WHITE+"Life Mod v1.4 - Save Models");
}
ModPE.setItem(2700,"twitter",0,"My Twitter");
Player.addItemCreativeInv(2700,1);
function useItem(x,y,z,i,b,s){
if(i==2700){
visitTwitter();
}
}
var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
function visitTwitter(){
ctx.runOnUiThread(new java.lang.Runnable(){
run: function(){
try{
var intentBrowser = new android.content.Intent(ctx);
intentBrowser.setAction(android.content.Intent.ACTION_VIEW);
intentBrowser.setData(android.net.Uri.parse("https://twitter.com/all_gonza?s=09"));
ctx.startActivity(intentBrowser);
} catch(err){
android.widget.Toast.makeText(ctx, "Somthing whent wrong, please check your internet connection and try again.", 0).show();
}
}
});
}

Block.setHead = function(ID,nombre,daño) {
Block.defineBlock(ID,nombre,[["abajo",daño],["arriba",daño],["frontal",daño],["atras",daño],["izquierda",daño],["derecha",daño]],1,false,0);
Block.setDestroyTime(ID, 0.4);
Block.setShape(ID,0.26,0,0.26,0.74,0.49,0.74);
Block.setRenderLayer(ID,3);
Block.setLightOpacity(ID,0.0001);
};
Block.setHead2 = function(ID,nombre,daño) {
Block.defineBlock(ID,nombre,[["abajo",daño],["arriba",daño],["izquierda",daño],["atras",daño],["frontal",daño],["derecha",daño]],1,false,0);
Block.setDestroyTime(ID, 0.4);
Block.setShape(ID,0.26,0,0.26,0.74,0.49,0.74);
Block.setRenderLayer(ID,3);
Block.setLightOpacity(ID,0.0001);
};
Block.setHead3 = function(ID,nombre,daño) {
Block.defineBlock(ID,nombre,[["abajo",daño],["arriba",daño],["derecha",daño],["atras",daño],["izquierda",daño],["frontal",daño]],1,false,0);
Block.setDestroyTime(ID, 0.4);
Block.setShape(ID,0.26,0,0.26,0.74,0.49,0.74);
Block.setRenderLayer(ID,3);
Block.setLightOpacity(ID,0.0001);
};
Block.setHead4 = function(ID,nombre,daño) {
Block.defineBlock(ID,nombre,[["abajo",daño],["arriba",daño],["izquierda",daño],["frontal",daño],["atras",daño],["derecha",daño]],1,false,0);
Block.setDestroyTime(ID, 0.4);
Block.setShape(ID,0.26,0,0.26,0.74,0.49,0.74);
Block.setRenderLayer(ID,3);
Block.setLightOpacity(ID,0.0001);
};
Block.setHead5 = function(ID,nombre,daño) {
Block.defineBlock(ID,nombre,[["abajo",daño],["arriba",daño],["frontal",daño],["atras",daño],["izquierda",daño],["derecha",daño]],1,false,0);
Block.setDestroyTime(ID, 0.4);
Block.setShape(ID,0.26,0,0.26,0.74,0.49,0.74);
Block.setRenderLayer(ID,3);
Block.setLightOpacity(ID,0.0001);
};
Block.setHead(210,"Skeleton Skull",3);
Block.setHead2(211,"Skeleton Skull",3);
Block.setHead3(212,"Skeleton Skull",3);
Block.setHead4(213,"Skeleton Skull",3);
Block.setHead5(214,"Wither Skull",14);

function destroyBlock(x,y,z,side){
if(Level.getGameMode() ==0){
if(gt(x,y,z)==210||gt(x,y,z)==211||gt(x,y,z)==212||gt(x,y,z)==213){ 
st(x,y,z, 0);
Level.dropItem(x+0.5,y,z+0.5,0,397,1,0);
}
if(gt(x,y,z)==214){ 
st(x,y,z, 0);
Level.dropItem(x+0.5,y,z+0.5,0,397,1,1);
}
}
}

var mr=Math.random;
var mf=Math.floor;
var st=Level.setTile;
var gt=Level.getTile;
var cs=Level.setChestSlot;
var gb=Level.getBiomeName;
var ZuluGuruSpawn=true;
var ZuluChiefSpawn=true;
var SpawnZuluChurch=true;
var SumerSmithySpawn=true;
var SumerButcher1Spawn=true;
var SumerButcher2Spawn=true;

function addYetiRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(128,128);
body.setTextureSize(128,128);
lArm.setTextureSize(128,128);
rArm.setTextureSize(128,128);
lLeg.setTextureSize(128,128);
rLeg.setTextureSize(128,128);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -18, -6, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -11, -8, 2, 4, 2);
head.setTextureOffset(0, 54, true);
head.addBox(-4.5, -18.1, -6.5, 9, 11, 9);
head.setTextureOffset(32, 5, true);
head.addBox(-4.5, -10.5, -7.2, 9, 4, 9,-0.1);
body.clear();
body.setTextureOffset(0, 20, true);
body.addBox(-8, -8, -6, 16, 20, 12);
rArm.clear();
rArm.setTextureOffset(57, 24, true);
rArm.addBox(-9.5, -2, -3, 6, 23, 6);
rArm.setTextureOffset(57, 55, true);
rArm.addBox(-10, -2.1, -3.5, 7, 17, 7);
rArm.setRotationPoint(0,-4,0);
lArm.clear();
lArm.setTextureOffset(57, 24, true);
lArm.addBox(3.5, -2, -3, 6, 23, 6);
lArm.setTextureOffset(57, 55, true);
lArm.addBox(3, -2.1, -3.5, 7, 17, 7);
lArm.setRotationPoint(0,-4,0);
rLeg.clear();
rLeg.setTextureOffset(69, 3, true);
rLeg.addBox(-5, -2, -2, 6, 14, 6);
rLeg.setTextureOffset(83, 24, true);
rLeg.addBox(-5.5, -2.1, -2.5, 7, 10, 7);
lLeg.clear();
lLeg.setTextureOffset(69, 3, true);
lLeg.addBox(-1, -2, -2, 6, 14, 6);
lLeg.setTextureOffset(83, 24, true);
lLeg.addBox(-1.5, -2.1, -2.5, 7, 10, 7);
}
var YetiRenderType = Renderer.createHumanoidRenderer();
addYetiRenderType(YetiRenderType);
function addWorshipperVillagerRenderType(renderer){
var model = renderer.getModel();
var var2 = 0;
var var3 = 0.5;
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8, var2);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2, var2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8, var3);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6, var2);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, var3);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4, var2);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4, var2);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4, var2);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4, var2);
}
var WorshipperVillagerRenderType = Renderer.createHumanoidRenderer();
addWorshipperVillagerRenderType(WorshipperVillagerRenderType);
function addApacheModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -16, -4, 8, 10, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var ApacheModelRenderType = Renderer.createHumanoidRenderer();
addApacheModelRenderType(ApacheModelRenderType);
function addAztecModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(28, 46, true);
head.addBox(-4, -10, -4, 8, 10, 8, 0.5);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -18.5, -4, 8, 12, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 3, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var AztecModelRenderType=Renderer.createHumanoidRenderer();
addAztecModelRenderType(AztecModelRenderType);
function addAztec2ModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(28, 38, true);
head.addBox(-4, -24.5, -4, 8, 18, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 3, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var Aztec2ModelRenderType=Renderer.createHumanoidRenderer();
addAztec2ModelRenderType(Aztec2ModelRenderType);
function addSedentariesModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -10, -4, 8, 7, 8, 0.5);
head.setTextureOffset(32, 14, true);
head.addBox(-3, -2.5, -5, 6, 5, 1);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
rArm.setTextureOffset(32, 48, true);
rArm.addBox(-3, -2, -10, 4, 4, 12);
lArm.clear();
lArm.setTextureOffset(32, 48, true);
lArm.addBox(-1, -2, -10, 4, 4, 12);
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var SedentariesModelRenderType=Renderer.createHumanoidRenderer();
addSedentariesModelRenderType(SedentariesModelRenderType);
function addDwarfRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,128);
body.setTextureSize(64,128);
lArm.setTextureSize(64,128);
rArm.setTextureSize(64,128);
lLeg.setTextureSize(64,128);
rLeg.setTextureSize(64,128);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -3, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, 4, -6, 2, 4, 2);
head.setTextureOffset(2, 75, true);
head.addBox(-4.5, -3.5, -4.5, 9, 9, 9);
head.setTextureOffset(42, 77, true);
head.addBox(-5, 3.99, -4.8, 10, 7, 1);
head.setTextureOffset(28, 48, true);
head.addBox(-4.5, 3.99, -4.4, 9, 16, 9);
body.clear();
body.setTextureOffset(0, 38, true);
body.addBox(-4, 7, -3, 8, 9, 6);
body.setTextureOffset(32, 4, true);
body.addBox(-4.5, 14, -3.5, 9, 6, 7);
body.setTextureOffset(0, 98, true);
body.addBox(-8.5, 6, -2.5, 17, 14, 8);
rArm.clear();
rArm.setTextureOffset(22, 22, true);
rArm.addBox(-3, -1, -2, 4, 10, 4);
rArm.setRotationPoint(0,8,0);
lArm.clear();
lArm.setTextureOffset(22, 22, true);
lArm.addBox(-1, -1, -2, 4, 10, 4);
lArm.setRotationPoint(0,8,0);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 4, -1.8, 4, 8, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 4, -1.8, 4, 8, 4);
}
var DwarfRenderType = Renderer.createHumanoidRenderer();
addDwarfRenderType(DwarfRenderType);
function addEgyptianModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -10, -4, 8, 7, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
rArm.setTextureOffset(32, 48, true);
rArm.addBox(-3, -2, -10, 4, 4, 12);
lArm.clear();
lArm.setTextureOffset(32, 48, true);
lArm.addBox(-1, -2, -10, 4, 4, 12);
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var EgyptianModelRenderType = Renderer.createHumanoidRenderer();
addEgyptianModelRenderType(EgyptianModelRenderType);
function addGoblinRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,128);
body.setTextureSize(64,128);
lArm.setTextureSize(64,128);
rArm.setTextureSize(64,128);
lLeg.setTextureSize(64,128);
rLeg.setTextureSize(64,128);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -3, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, 3, -6, 2, 4, 2);
head.setTextureOffset(2, 75, true);
head.addBox(-4.5, -3.1, -4.5, 9, 9, 9);
body.clear();
body.setTextureOffset(0, 38, true);
body.addBox(-4, 7, -3, 8, 9, 6);
body.setTextureOffset(32, 4, true);
body.addBox(-4.5, 14, -3.5, 9, 6, 7);
body.setTextureOffset(0, 98, true);
body.addBox(-8.5, 6, -2.5, 17, 14, 8);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -1, -2, 4, 10, 4);
rArm.setRotationPoint(0,8,0);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -1, -2, 4, 10, 4);
lArm.setRotationPoint(0,8,0);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 4, -1.8, 4, 8, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 4, -1.8, 4, 8, 4);
}
var GoblinRenderType = Renderer.createHumanoidRenderer();
addGoblinRenderType(GoblinRenderType);
function addInuitModelRenderType(renderer){
var model=renderer.getModel();
var var2=0;
var var3=0.5;
var head=model.getPart("head");
var body=model.getPart("body");
var rArm=model.getPart("rightArm");
var lArm=model.getPart("leftArm");
var rLeg=model.getPart("rightLeg");
var lLeg=model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -8, -4, 8, 10, 8, var2);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -1, -6, 2, 4, 2, var2);
head.setTextureOffset(0, 18, true);
head.addBox(-5, -9, -5, 10, 12, 10, var2);
body.clear();
body.setTextureOffset(0, 40, true);
body.addBox(-4.5, 2, -3.5, 9, 17, 7, var2);
rArm.clear();
rArm.setTextureOffset(48, 0, true);
rArm.addBox(-3, -2, -2, 4, 12, 4, var2);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1, var2);
rArm.setTextureOffset(4, 3, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1, var2);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1, var2);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1, var2);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1, var2);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1, var2);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1, var2);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1, var2);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1, var2);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1, var2);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1, var2);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1, var2);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1, var2);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1, var2);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1, var2);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1, var2);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1, var2);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1, var2);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1, var2);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1, var2);
rArm.setRotationPoint(0,5,0);
lArm.clear();
lArm.setTextureOffset(48, 0, true);
lArm.addBox(-1, -2, -2, 4, 12, 4, var2);
lArm.setRotationPoint(0,5,0);
rLeg.clear();
rLeg.setTextureOffset(32, 0, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4, var2);
lLeg.clear();
lLeg.setTextureOffset(32, 0, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4, var2);
}
var InuitModelRenderType=Renderer.createHumanoidRenderer();
addInuitModelRenderType(InuitModelRenderType);
function addSumerModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -10, -4, 8, 7, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
rArm.setTextureOffset(32, 48, true);
rArm.addBox(-3, -2, -10, 4, 4, 12);
lArm.clear();
lArm.setTextureOffset(32, 48, true);
lArm.addBox(-1, -2, -10, 4, 4, 12);
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var SumerModelRenderType = Renderer.createHumanoidRenderer();
addSumerModelRenderType(SumerModelRenderType);
function addMonkModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 3, true);
head.addBox(-4, -13, -4, 8, 7, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -5.01, -13.01, 1, 1, 1);
rArm.addBox(-1.5, -4.01, -14.01, 1, 1, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -5.01, -14.01, 1, 1, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var MonkModelRenderType = Renderer.createHumanoidRenderer();
addMonkModelRenderType(MonkModelRenderType);
function addVikingModelRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -10, -4, 8, 7, 8, 0.5);
head.setTextureOffset(28, 38, true);
head.addBox(-4.5, -3, -4.5, 9, 17, 9, -0.01);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(44, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
lArm.clear();
lArm.setTextureOffset(44, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var VikingModelRenderType = Renderer.createHumanoidRenderer();
addVikingModelRenderType(VikingModelRenderType);
function addZuluWarriorRenderType(renderer){
var model = renderer.getModel();
var head = model.getPart("head");
var body = model.getPart("body");
var rArm = model.getPart("rightArm");
var lArm = model.getPart("leftArm");
var rLeg = model.getPart("rightLeg");
var lLeg = model.getPart("leftLeg");
head.setTextureSize(64,64);
body.setTextureSize(64,64);
lArm.setTextureSize(64,64);
rArm.setTextureSize(64,64);
lLeg.setTextureSize(64,64);
rLeg.setTextureSize(64,64);
head.clear();
head.setTextureOffset(0, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8);
head.setTextureOffset(24, 0, true);
head.addBox(-1, -3, -6, 2, 4, 2);
head.setTextureOffset(32, 0, true);
head.addBox(-4, -10, -4, 8, 10, 8, 0.5);
body.clear();
body.setTextureOffset(16, 20, true);
body.addBox(-4, 0, -3, 8, 12, 6);
body.setTextureOffset(0, 38, true);
body.addBox(-4, 0, -3, 8, 20, 6, 0.5);
rArm.clear();
rArm.setTextureOffset(18, 22, true);
rArm.addBox(-3, -2, -2, 4, 12, 4);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -7.01, -16.01, 1, 3, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -12.01, 1, 1, 1);
rArm.addBox(-1.5, -3.01, -15.01, 1, 1, 1);
rArm.setTextureOffset(4, 4, true);
rArm.addBox(-1.5, -6.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(0, 1, true);
rArm.addBox(-1.5, -4.01, -13.01, 1, 2, 1);
rArm.setTextureOffset(4, 0, true);
rArm.addBox(-1.5, -7.01, -14.01, 1, 4, 1);
rArm.addBox(-1.5, -7.01, -15.01, 1, 4, 1);
rArm.setTextureOffset(0, 4, true);
rArm.addBox(-1.5, -4.01, -12.01, 1, 3, 1);
rArm.addBox(-1.5, -2.01, -10.01, 1, 3, 1);
rArm.addBox(-1.5, -0.01, -8.01, 1, 3, 1);
rArm.addBox(-1.5, 1.99, -6.01, 1, 3, 1);
rArm.addBox(-1.5, 3.99, -4.01, 1, 3, 1);
rArm.addBox(-1.5, 7.99, -0.01, 1, 3, 1);
rArm.addBox(-1.5, 9.99, 1.99, 1, 3, 1);
rArm.addBox(-1.5, 11.99, 3.99, 1, 3, 1);
rArm.addBox(-1.5, 13.99, 5.99, 1, 3, 1);
rArm.addBox(-1.5, 14.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 15.99, 6.99, 1, 1, 1);
rArm.addBox(-1.5, 5.99, -2.01, 1, 3, 1);
rArm.setTextureOffset(0, 0, true);
rArm.addBox(-1.5, -3.01, -11.01, 1, 3, 1);
rArm.addBox(-1.5, -1.01, -9.01, 1, 3, 1);
rArm.addBox(-1.5, 0.99, -7.01, 1, 3, 1);
rArm.addBox(-1.5, 2.99, -5.01, 1, 3, 1);
rArm.addBox(-1.5, 4.99, -3.01, 1, 3, 1);
rArm.addBox(-1.5, 6.99, -1.01, 1, 3, 1);
rArm.addBox(-1.5, 8.99, 0.99, 1, 3, 1);
rArm.addBox(-1.5, 10.99, 2.99, 1, 3, 1);
rArm.addBox(-1.5, 12.99, 4.99, 1, 3, 1);
lArm.clear();
lArm.setTextureOffset(18, 22, true);
lArm.addBox(-1, -2, -2, 4, 12, 4);
rLeg.clear();
rLeg.setTextureOffset(0, 22, true);
rLeg.addBox(-2, 0, -1.8, 4, 12, 4);
lLeg.clear();
lLeg.setTextureOffset(0, 22, true);
lLeg.addBox(-2, 0, -1.8, 4, 12, 4);
}
var ZuluWarriorRenderType = Renderer.createHumanoidRenderer();
addZuluWarriorRenderType(ZuluWarriorRenderType);
function entityAddedHook(entity){
if(Entity.getMobSkin(entity)=="mob/monsters/yeti.png"){
Entity.setRenderType(entity, YetiRenderType.renderType);
Entity.setCollisionSize(entity,1.5,2.5);
}
if(Entity.getMobSkin(entity)=="mob/villager/apache/abreeder.png"||Entity.getMobSkin(entity)=="mob/villager/apache/ahunter.png"||Entity.getMobSkin(entity)=="mob/villager/apache/achief.png"||Entity.getMobSkin(entity)=="mob/villager/apache/ashaman.png"){
Entity.setRenderType(entity, ApacheModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/apache/awarrior.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, ApacheModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/sedentaries/chunter.png"||Entity.getMobSkin(entity)=="mob/villager/sedentaries/cbreeder.png"||Entity.getMobSkin(entity)=="mob/villager/sedentaries/cgatherer.png"||Entity.getMobSkin(entity)=="mob/villager/sedentaries/cchief.png"){
Entity.setRenderType(entity, SedentariesModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/sedentaries/cwarrior.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, SedentariesModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/dwarf/dsmith.png"||Entity.getMobSkin(entity)=="mob/villager/dwarf/dhealer.png"){
Entity.setRenderType(entity,DwarfRenderType.renderType);
Entity.setCarriedItem(entity,267,1,0);
Entity.setCollisionSize(entity,0.6,1.4);
}
if(Entity.getMobSkin(entity)=="mob/villager/dwarf/dking.png"){
Entity.setRenderType(entity,DwarfRenderType.renderType);
Entity.setCarriedItem(entity,283,1,0);
Entity.setCollisionSize(entity,0.6,1.4);
}
if(Entity.getMobSkin(entity)=="mob/villager/dwarf/dwarrior.png"||Entity.getMobSkin(entity)=="mob/villager/dwarf/dcooker.png"){
Entity.setRenderType(entity,DwarfRenderType.renderType);
Entity.setCarriedItem(entity,258,1,0);
Entity.setCollisionSize(entity,0.6,1.4);
}
if(Entity.getMobSkin(entity)=="mob/villager/dwarf/dminer.png"){
Entity.setRenderType(entity,DwarfRenderType.renderType);
Entity.setCarriedItem(entity,257,1,0);
Entity.setCollisionSize(entity,0.6,1.4);
}
if(Entity.getMobSkin(entity)=="mob/villager/egyptian/efarmer.png"||Entity.getMobSkin(entity)=="mob/villager/egyptian/escribe.png"||Entity.getMobSkin(entity)=="mob/villager/egyptian/esculptor.png"||Entity.getMobSkin(entity)=="mob/villager/egyptian/epriest.png"||Entity.getMobSkin(entity)=="mob/villager/egyptian/epharaoh.png"||Entity.getMobSkin(entity)=="mob/villager/egyptian/epainter.png"){
Entity.setRenderType(entity, EgyptianModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/egyptian/eguard.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, EgyptianModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/egyptian/ethief.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, EgyptianModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.5, 1.8);
}
if(Entity.getMobSkin(entity)=="mob/monsters/mummy.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, EgyptianModelRenderType.renderType);
Entity.setCarriedItem(entity,283,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/goblin/ghunter.png"){
Entity.setRenderType(entity,GoblinRenderType.renderType);
Entity.setCarriedItem(entity,275,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/goblin/garcher.png"){
Entity.setRenderType(entity,GoblinRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/goblin/gwarrior.png"){
Entity.setRenderType(entity,GoblinRenderType.renderType);
Entity.setCarriedItem(entity,272,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/goblin/gchief.png"){
Entity.setRenderType(entity,GoblinRenderType.renderType);
Entity.setCarriedItem(entity,267,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/zulu/zbreeder.png"||Entity.getMobSkin(entity)=="mob/villager/zulu/zfarmer.png"||Entity.getMobSkin(entity)=="mob/villager/zulu/zchief.png"||Entity.getMobSkin(entity)=="mob/villager/zulu/zguru.png"){
Entity.setRenderType(entity, ZuluWarriorRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/zulu/zwarrior.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, ZuluWarriorRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/viking/vking.png"){
Entity.setRenderType(entity,VikingModelRenderType.renderType);
Entity.setCarriedItem(entity,286,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/viking/vwarrior1.png"){
Entity.setRenderType(entity,VikingModelRenderType.renderType);
Entity.setCarriedItem(entity,267,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/viking/vwarrior3.png"){
Entity.setRenderType(entity,VikingModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/viking/vwarrior2.png"||Entity.getMobSkin(entity)=="mob/villager/viking/vwarrior4.png"){
Entity.setRenderType(entity,VikingModelRenderType.renderType);
Entity.setCarriedItem(entity,258,1,0);
}
if(Entity.getMobSkin(entity)=="mob/villager/tibetan/tmonk.png"||Entity.getMobSkin(entity)=="mob/villager/tibetan/tmaster.png"||Entity.getMobSkin(entity)=="mob/villager/tibetan/twise.png"){
Entity.setRenderType(entity, MonkModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/tibetan/tdeffender.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, MonkModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/sumer/sfarmer.png"||Entity.getMobSkin(entity)=="mob/villager/sumer/sbutcher.png"||Entity.getMobSkin(entity)=="mob/villager/sumer/schief.png"||Entity.getMobSkin(entity)=="mob/villager/sumer/sfisherman.png"||Entity.getMobSkin(entity)=="mob/villager/sumer/ssmith.png"){
Entity.setRenderType(entity, SumerModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/sumer/sguard.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, SumerModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/inuit/ifisherman.png"||Entity.getMobSkin(entity)=="mob/villager/inuit/ikennelmaster.png"||Entity.getMobSkin(entity)=="mob/villager/inuit/ichief.png"){
Entity.setRenderType(entity, InuitModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/inuit/ihunter.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, InuitModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/aztec/azbreeder.png"||Entity.getMobSkin(entity)=="mob/villager/aztec/azfarmer.png"||Entity.getMobSkin(entity)=="mob/villager/aztec/azdyer.png"){
Entity.setRenderType(entity, AztecModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/aztec/azchief.png"||Entity.getMobSkin(entity)=="mob/villager/aztec/azhighpriest.png"){
Entity.setRenderType(entity, Aztec2ModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/villager/aztec/azhunter.png"){
Entity.setMaxHealth(entity,30);
Entity.setHealth(entity,30);
Entity.setRenderType(entity, AztecModelRenderType.renderType);
Entity.setCollisionSize(entity, 0.4, 1.0);
}
if(Entity.getMobSkin(entity)=="mob/villager/aztec/azworship.png"){
Entity.setMaxHealth(entity,100);
Entity.setHealth(entity,100);
Entity.setRenderType(entity, AztecModelRenderType.renderType);
}
if(Entity.getMobSkin(entity)=="mob/monsters/worshipper.png"){
Entity.setMaxHealth(entity,60);
Entity.setHealth(entity,60);
Entity.setRenderType(entity, WorshipperVillagerRenderType.renderType);
Entity.setCarriedItem(entity,283,1,0);
}
}
function attackHook(a,v){
if(Entity.getMobSkin(v)=="mob/villager/sumer/sguard.png"||Entity.getMobSkin(v)=="mob/villager/inuit/ihunter.png"||Entity.getMobSkin(v)=="mob/villager/egyptian/eguard.png"||Entity.getMobSkin(v)=="mob/villager/sedentaries/cwarrior.png"||Entity.getMobSkin(v)=="mob/villager/apache/ahunter.png"||Entity.getMobSkin(v)=="mob/villager/aztec/azhunter.png"||Entity.getMobSkin(v)=="mob/villager/zulu/zwarrior.png"||Entity.getMobSkin(v)=="mob/villager/tibetan/tdeffender.png"||Entity.getMobSkin(v)=="mob/monsters/worshipper.png"){
Level.playSound(Entity.getX(a),Entity.getY(a),Entity.getZ(a),"mob.villager.hit");
}
}
function deathHook(a,v){
if(Entity.getMobSkin(v)=="mob/monsters/worshipper.png"){
Level.playSound(Entity.getX(a),Entity.getY(a),Entity.getZ(a),"mob.villager.death");
Level.dropItem(Entity.getX(v),Entity.getY(v),Entity.getZ(v),0,397,1,0);
}
if(Entity.getMobSkin(v)=="mob/villager/sumer/sguard.png"||Entity.getMobSkin(v)=="mob/villager/inuit/ihunter.png"||Entity.getMobSkin(v)=="mob/villager/egyptian/eguard.png"||Entity.getMobSkin(v)=="mob/villager/sedentaries/cwarrior.png"||Entity.getMobSkin(v)=="mob/villager/apache/ahunter.png"||Entity.getMobSkin(v)=="mob/villager/aztec/azhunter.png"||Entity.getMobSkin(v)=="mob/villager/zulu/zwarrior.png"||Entity.getMobSkin(v)=="mob/villager/tibetan/tdeffender.png"||Entity.getMobSkin(v)=="mob/monsters/worshipper.png"){
Level.playSound(Entity.getX(a),Entity.getY(a),Entity.getZ(a),"mob.villager.death");
}
}