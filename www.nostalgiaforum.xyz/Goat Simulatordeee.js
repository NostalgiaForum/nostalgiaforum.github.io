var FACE_LEFT = 0;
var FACE_RIGHT = 1;
var FACE_BOTTOM = 2;
var FACE_TOP = 3;
var FACE_BACK = 4;
var FACE_FRONT = 5;
var sheep = false;
var splode = false;
var jump = false;
var speed = false;
var strength = false;
var b = 0;
var bdat = 0;
var data = [];
var f = 0;
var jumping = false;

var Xpos=0;
var Zpos=0;
var s=1; 
var Xdiff=0;
var Zdiff=0;

var MAIN;
var MENU;

function entityRemovedHook(e){

if(Entity.getEntityTypeId(e) == 81 && Entity.getRenderType(e) == 2){

var x = Math.floor(Entity.getX(e));
var y = Math.floor(Entity.getY(e));
var z = Math.floor(Entity.getZ(e));

Level.setTile(x, y + 1, z, b, bdat);

}

}

function newLevel(){

mainUi();
clientMessage(ChatColor.GREEN + "Goat Simulator\n" + ChatColor.WHITE + "Created by " + ChatColor.BLUE + "Arjay07");
sheep = false;

}

function leaveGame(){

dismissMainUi();
dismissGoatMenu();

}

function modTick(){

if(sheep){ 

if(!splode)destroy(0.35, 0.3, 0.65);

Player.setHealth(150);

if(splode)splodeIt();
if(speed){

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

}

if(strength){

destroy(3, 2, 1);

}

if(jump){

if(Entity.getVelY(getPlayerEnt())>0 && !jumping){

Entity.setVelY(getPlayerEnt(), 0.75);
jumping = true;

}else if(Level.getTile(Player.getX(), Player.getY()-2, Player.getZ())!=0 && jumping){

jumping = false;

}

}

}if(!sheep){

if(Entity.getMobSkin(Player.getEntity()) != "mob/char.png")Entity.setMobSkin(Player.getEntity(), "mob/char.png")

}

}

var playerPos = [0, 0, 0];
var playerDir = [0, 0, 0];
var rayTraceInfo = {};
var moddedrayTraceInfo = {};

var DEG_TO_RAD = Math.PI / 180;

function destroy(p, py, vy){

toDirectionalVector(playerDir, (getYaw() + 90) * DEG_TO_RAD, getPitch() * DEG_TO_RAD * -1);
playerPos[0] = getPlayerX();
playerPos[1] = getPlayerY();
playerPos[2] = getPlayerZ();
raytrace(playerPos, playerDir, rayTraceInfo, 2);

if (rayTraceInfo.hit) {

var block = Level.getTile(rayTraceInfo.x, Math.floor(Player.getY()) - 1, rayTraceInfo.z);

if(block != 0 && block != 8 && block != 9 && block != 10 && block != 7){

var x = rayTraceInfo.x;
var y = Math.floor(Player.getY()) - 1;
var z = rayTraceInfo.z;

b = block;
bdat = Level.getData(x, y, z);
f = rayTraceInfo.face;
var e = Level.spawnMob(x, y, z, 81);
Entity.setRenderType(e, 2);
Entity.setVelY(e, vy);
knockBack(e, p, py);
Level.destroyBlock(x, y, z, false);

}
	
}

}

function splodeIt(){

toDirectionalVector(playerDir, (getYaw() + 90) * DEG_TO_RAD, getPitch() * DEG_TO_RAD * -1);
playerPos[0] = getPlayerX();
playerPos[1] = getPlayerY();
playerPos[2] = getPlayerZ();
raytrace(playerPos, playerDir, rayTraceInfo, 2);

if (rayTraceInfo.hit) {

var block = Level.getTile(rayTraceInfo.x, Math.floor(Player.getY()) - 1, rayTraceInfo.z);

if(block != 0 && block != 8 && block != 9 && block != 10 && block != 7){

var x = rayTraceInfo.x;
var y = Math.floor(Player.getY()) - 1;
var z = rayTraceInfo.z;

Level.explode(x, y, z, 5);

}
	
}

}

function knockBack(victim, pxz, py){

var x = 0;
var y = 0;
var z = 0;

var XVel = 0;
var ZVel = 0;

if(getYaw() < 0)
{
		var hit = getYaw()+90;
		for(go=0; hit<0; go++)
		{
			hit+= 360;
		}
		x = Math.cos(hit*(Math.PI/180));
		z = Math.sin(hit*(Math.PI/180));
		setVelX(victim, x*pxz);
		setVelY(victim, py);
		setVelZ(victim, z*pxz);
	}
	else if( getYaw() > 0 && getYaw() < 360)
	{
		var hit = getYaw()+90;
		XVel = Math.cos(hit*(Math.PI/180));
		ZVel= Math.sin(hit*(Math.PI/180));
		setVelX(victim, XVel*pxz);
		setVelY(victim, py);
		setVelZ(victim, ZVel*pxz);
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
		setVelX(victim, XVel*pxz);
		setVelY(victim, py);
		setVelZ(victim, ZVel*pxz);
	}

}

function raytrace(pos, dir, info, radius) {
    // Finish early if there's no direction
    if (dir[0] == 0.0 && dir[1] == 0.0 && dir[2] == 0.0) {
        info.hit = false;
        return;
    }

    var start = pos.slice(0);

    var x = Math.floor(pos[0]);
    var y = Math.floor(pos[1]);
    var z = Math.floor(pos[2]);

    var x_dir = dir[0] >= 0.0 ? 1 : -1;
    var y_dir = dir[1] >= 0.0 ? 1 : -1;
    var z_dir = dir[2] >= 0.0 ? 1 : -1;

    var dx_off = x_dir > 0 ? 1.0 : 0.0;
    var dy_off = y_dir > 0 ? 1.0 : 0.0;
    var dz_off = z_dir > 0 ? 1.0 : 0.0;

    var x_face = x_dir > 0 ? FACE_LEFT : FACE_RIGHT;
    var y_face = y_dir > 0 ? FACE_BOTTOM : FACE_TOP;
    var z_face = z_dir > 0 ? FACE_BACK : FACE_FRONT;

    var face = FACE_TOP;
    var radius2 = radius * radius;
    
    // Assumption is made that the camera is never outside the world
    while (in_world(x, y, z)) {
        var dx = start[0] - pos[0];
        var dy = start[1] - pos[1];
        var dz = start[2] - pos[2];
        var dist2 = dx*dx + dy*dy + dz*dz;
        if (dist2 > radius2) {
            info.hit = false;
            return;
        }
        // Determine if block is solid
        if (getTile(x, y, z) != 0) {
            var dist = Math.sqrt(dist2);

            pos[0] -= x;
            pos[1] -= y;
            pos[2] -= z;

            // If hit info is requested, no color computation is done
            if (info != null) {

                info.hit = true;
                info.x = x;
                info.y = y;
                info.z = z;
                info.face = face;
                info.dist = dist;

                return;
            }
        }

        // Remaining distance inside this block given ray direction
        var dx = x - pos[0] + dx_off;
        var dy = y - pos[1] + dy_off;
        var dz = z - pos[2] + dz_off;
        
        // Calculate distance for each dimension
        var t1 = dx / dir[0];
        var t2 = dy / dir[1];
        var t3 = dz / dir[2];
        
        // Find closest hit
        if (t1 <= t2 && t1 <= t3) {
            pos[0] += dx;
            pos[1] += t1 * dir[1];
            pos[2] += t1 * dir[2];
            x += x_dir;
            face = x_face;
        }
        if (t2 <= t1 && t2 <= t3) {
            pos[0] += t2 * dir[0];
            pos[1] += dy;
            pos[2] += t2 * dir[2];
            y += y_dir;
            face = y_face;
        }
        if (t3 <= t1 && t3 <= t2) {
            pos[0] += t3 * dir[0];
            pos[1] += t3 * dir[1];
            pos[2] += dz;
            z += z_dir;
            face = z_face;
        }
    }
    info.hit = false;

}

function toDirectionalVector(vector, yaw, pitch) {
	//http://stackoverflow.com/questions/1568568/how-to-convert-euler-angles-to-directional-vector
	vector[0] = Math.cos(yaw) * Math.cos(pitch);
	vector[1] = Math.sin(pitch);
	vector[2] = Math.sin(yaw) * Math.cos(pitch);
}

function in_world(x, y, z) {
	return x >= 0 && x < 256 && y >= 0 && y < 128 && z >= 0 && z < 256;
}

function random(min, max){

return Math.floor((Math.random()*max + 1)+min + 1);

}

function mainUi(){

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread(new java.lang.Runnable(){

run: function(){

try{

var btn = new android.widget.Button(ctx);
btn.setText("GS");
btn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

openGoatMenu();

}

});

MAIN = new android.widget.PopupWindow(btn, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
MAIN.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM|android.view.Gravity.RIGHT, 0, 0);

}catch(e){

print(e);

}

}

});

}

function dismissMainUi(){

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread(new java.lang.Runnable(){

run: function(){

try{

if(MAIN!=null)MAIN.dismiss();

}catch(e){

print(e);

}

}

});

}

function openGoatMenu(){

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread(new java.lang.Runnable(){

run: function(){

try{

var mainLayout = new android.widget.LinearLayout(ctx);
mainLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

var layout = new android.widget.LinearLayout(ctx);
layout.setOrientation(android.widget.LinearLayout.VERTICAL);

var sc = new android.widget.ScrollView(ctx);
sc.addView(layout);
mainLayout.addView(sc);

var selectTv = new android.widget.TextView(ctx);
selectTv.setText("Select a Goat!");
selectTv.setTextSize(25);

var sheepBtn = new android.widget.Button(ctx);
sheepBtn.setText("Goat");

var pigBtn = new android.widget.Button(ctx);
pigBtn.setText("Bacon Goat");

var chickenBtn = new android.widget.Button(ctx);
chickenBtn.setText("Bird Goat");

var cowBtn = new android.widget.Button(ctx);
cowBtn.setText("Fat Goat");

var minecartBtn = new android.widget.Button(ctx);
minecartBtn.setText("8 Legged Goat");

var splodinBtn = new android.widget.Button(ctx);
splodinBtn.setText("Splodin' Goat");

var offBtn = new android.widget.Button(ctx);
offBtn.setText("No Goat");

var closeBtn = new android.widget.Button(ctx);
closeBtn.setText("Close");
closeBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

dismissGoatMenu();

}

});

sheepBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

setSimulator(9, "mob/sheep_" + Math.floor(random(0, 15)) + ".png");

}

});

pigBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

setSimulator(8, "mob/pig.png");

}

});

chickenBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

setSimulator(6, "mob/chicken.png");
jump = true;

}

});

cowBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

setSimulator(7, "mob/cow.png");
strength = true;

}

});

minecartBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

setSimulator(13, "mob/spider.png");
speed = true;

}

});

splodinBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

setSimulator(9, "mob/sheep_" + Math.floor(random(0, 15)) + ".png");
splode = true;

}

});

offBtn.setOnClickListener(new android.view.View.OnClickListener(){

onClick: function(v){

Entity.setRenderType(Player.getEntity(), 3);
Entity.setMobSkin(Player.getEntity(), "mob/char.png");
Player.setHealth(20);
if(sheep)sheep = false;

}

});

layout.addView(selectTv);
layout.addView(sheepBtn);
layout.addView(pigBtn);
layout.addView(chickenBtn);
layout.addView(cowBtn);
layout.addView(minecartBtn);
layout.addView(splodinBtn);
layout.addView(offBtn);
layout.addView(closeBtn);

MENU = new android.widget.PopupWindow(mainLayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
MENU.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
MENU.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP|android.view.Gravity.RIGHT, 0, 0);

}catch(e){

print(e);

}

}

});

}

function dismissGoatMenu(){

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ctx.runOnUiThread(new java.lang.Runnable(){

run: function(){

try{

if(MENU!=null)MENU.dismiss();

}catch(e){

print(e);

}

}

});

}

function setSimulator(rt, skin){

var p = Player.getEntity();
Entity.setRenderType(p, rt);
Entity.setMobSkin(p, skin);

if(!sheep)sheep = true;
if(splode)splode = false;
if(jump)jump = false;
if(speed)speed = false;
if(strength)strength = false;

}