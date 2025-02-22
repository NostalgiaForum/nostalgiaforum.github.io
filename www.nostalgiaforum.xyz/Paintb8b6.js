var colour=0;
var bucket=true;
ModPE.setItem(399,"bucket", 2, "Bucket of Paint", 1);
ModPE.setItem(398,"stick", 0, "Paint Brush", 1);
ModPE.setItem(397,"quartz", 0, "Brush Part", 64);
ModPE.langEdit("desc.Paint Brush", "A tool used to paint.");
Item.addCraftRecipe(398, 1, 0, [280, 1, 0, 397, 1, 0]);
var color="";
var paintball;
var i=44;
var gui=true;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var GUI;

function useItem(x, y, z, i, b, s){
if(i==398&&bucket==true){
setTile(x, y, z, 35, colour);
}
if(i==399&&b==35&&Level.getData(x, y, z)==0 || i==325&&b==35&&Level.getData(x, y, z)==0){
clientMessage("§fPicked white colour.");
colour=0;
color="white";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==1 || i==325&&b==35&&Level.getData(x, y, z)==1){
clientMessage("§6Picked orange colour.");
colour=1;
color="orange";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==2 || i==325&&b==35&&Level.getData(x, y, z)==2){
clientMessage("§5Picked magenta colour.");
colour=2;
color="magenta";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==3 || i==323&&b==35&&Level.getData(x, y, z)==3){
clientMessage("§9Picked light blue colour.");
colour=3;
color="light blue";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==4 || i==325&&b==35&&Level.getData(x, y, z)==4){
clientMessage("§aPicked yellow colour.");
colour=4;
color="yellow";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==5 || i==325&&b==35&&Level.getData(x, y, z)==5){
clientMessage("§ePicked lime colour.");
colour=5;
color="lime colour";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==6 || i==325&&b==35&&Level.getData(x, y, z)==6){
clientMessage("§dPicked pink colour.");
colour=6;
color="pink";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==7 || i==325&&b==35&&Level.getData(x, y, z)==7){
clientMessage("§7Picked gray colour.");
colour=7;
color="gray";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==8 || i==325&&b==35&&Level.getData(x, y, z)==8){
clientMessage("§7Picked light gray colour.");
colour=8;
color="light gray";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==9 || i==325&&b==35&&Level.getData(x, y, z)==9){
clientMessage("§3Picked cyan colour.");
colour=9;
color="cyan";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==10 || i==325&&b==35&&Level.getData(x, y, z)==10){
clientMessage("§dPicked purple colour.");
colour=10;
color="purple";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
} 
if(i==399&b==35&&Level.getData(x, y, z)==11 || i==325&&b==35&&Level.getData(x, y, z)==11){
clientMessage("§1Picked blue colour.");
colour=11;
color="blue";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==12 || i==325&&b==35&&Level.getData(x, y, z)==12){
clientMessage("§8Picked brown colour.");
colour=12;
color="brown";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==13 || i==325&&b==35&&Level.getData(x, y, z)==13){
clientMessage("§aPicked green colour.");
colour=13;
color="green";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==14 || i==325&&b==35&&Level.getData(x, y, z)==14){
clientMessage("§cPicked red colour.");
colour=14;
color="red";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
if(i==399&b==35&&Level.getData(x, y, z)==15 || i==325&&b==35&&Level.getData(x, y, z)==15){
clientMessage("§0Picked black colour.");
colour=15;
color="black";
changename();
Entity.setCarriedItem(Player.getEntity(), 399, 1);
}
}

function changename(){
ModPE.langEdit("item.bucket of paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of orange paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of magenta paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of light blue paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of yellow paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of lime paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of pink paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of gray paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of light gray paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of cyan paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of purple paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of blue paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of brown paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of green paint.name","bucket of "+color+" paint");
ModPE.langEdit("item.bucket of red paint.name","bucket of "+color+" paint");
}

function modTick(){ 
if(getCarriedItem()==398&&gui==true){
ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){
 
try{

GUI = new android.widget.PopupWindow();
var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(android.widget.LinearLayout.VERTICAL);
GUI.setContentView(layout);
var btn = new android.widget.Button(ctx);
layout.addView(btn);
GUI.setWidth(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
GUI.setHeight(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLUE));
btn.setOnClickListener(new android.view.View.OnClickListener({ 
onClick: function(viewarg){ 
var p=((Entity.getPitch(getPlayerEnt())+90)*Math.PI)/180; 
var y=((Entity.getYaw(getPlayerEnt())+90)*Math.PI)/180; 
var xx=Math.sin(p)*Math.cos(y); 
var yy=Math.sin(p)*Math.sin(y); 
var zz=Math.cos(p);
paintball = Level.spawnMob(Player.getX()+xx,Player.getY()+zz,Player.getZ()+yy ,81);
setVelX(paintball,1.5*xx);
setVelY(paintball,1.5*zz);
setVelZ(paintball,1.5*yy); 
}
}));
GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 200);
} catch (e){
print ("Error: "+e)
}
}}); 
gui=false;
}
if(getCarriedItem()!=398&&gui==false){
ctx.runOnUiThread(new java.lang.Runnable({ 
run: function(){ 
if(GUI != null){ 
GUI.dismiss();
GUI = null;
} 
}})); 
gui=true;
}
}

function leaveGame(){
ctx.runOnUiThread(new java.lang.Runnable({ 
run: function(){ 
if(GUI != null){ 
GUI.dismiss();
GUI = null;
} 
}})); 
}

function entityRemovedHook(e){
if(Entity.getEntityTypeId(e)==35&&Math.floor((Math.random()*10)+1)==5){
Level.dropItem(Entity.getX(e),Entity.getY(e),Entity.getZ(e),1,397,1);
}
if(Entity.getEntityTypeId(e)==81&&getCarriedItem()==398){
setTile(Entity.getX(e),Entity.getY(e),Entity.getZ(e),35,colour);
}
}
