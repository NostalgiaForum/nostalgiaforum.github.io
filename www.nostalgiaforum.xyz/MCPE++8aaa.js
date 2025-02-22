/*MCPE++*/

var soulsand = 52;
var adventureGamemode = false;
var show = false;
var lever = 176;
var red_off = 175;
var red_on = 177;
var repeater_off = 178;
var repeater_on = 179;
var lamp_off = 25;
var lamp_on = 28;

Block.defineBlock (52, "Soul Sand", "soul_sand");
Block.setDestroyTime (52, 1);

Block.defineBlock (23, "Pressure Plate", "planks");
Block.setShape (23, 0, 0, 0, 1, 1/5, 1);
Block.setDestroyTime (23, 0.1);

Block.defineBlock (25, "Redstone Lamp", "redstone_lamp_off");
Block.setDestroyTime (25, 0.1);

Block.defineBlock (28, "Redstone Lamp", "redstone_lamp_on");
Block.setDestroyTime (28, 0.1);
Block.setLightLevel (28, 15);

Block.defineBlock (176, "Lever", "lever", 50, !1, 1)
Block.setDestroyTime (176, 0)
Block.setRenderLayer (176, 1)

Block.defineBlock (174, "Redstone Torch", "redstone_torch_on", 50, !1, 19);
Block.setDestroyTime (174,0);
Block.setRenderLayer(174,1);

Block.defineBlock (175, "Redstone", "redstone_dust_cross", 50, !1, 13);
Block.setShape (175, 0, 0, 0, 1, 1/16, 1);
Block.setDestroyTime (175, 0);
Block.setRenderLayer (175, 1);
Block.setColor(175,[4456448]);

Block.defineBlock (177, "Redstone_on", "redstone_dust_cross", 50, !1, 13);
Block.setShape (177, 0, 0, 0, 1, 1/16, 1);
Block.setDestroyTime (177, 0);
Block.setRenderLayer (177, 1);
Block.setLightLevel (177, 10);
Block.setColor(177,[16580608])

Block.defineBlock (178, "Redstone Repeater", "repeater_off", 50, !1, 13);
Block.setShape (178, 0, 0, 0, 1, 1/4, 1);
Block.setDestroyTime (178, 0.1);

Block.defineBlock (179, "Redstone Repeater", "repeater_on", 50, !1, 13);
Block.setShape(179, 0, 0, 0, 1, 1/4, 1);
Block.setDestroyTime (179, 0.1);
Block.setLightLevel (179, 5);

function redCheck (x, y, z) {

if (getTile (x+1, y, z)==red_off) {
setTile (x+1, y, z, red_on);
redCheck(x+1, y, z);
}
if (getTile (x-1, y, z)==red_off) {
setTile (x-1, y, z, red_on);
redCheck(x-1, y, z);
}
if (getTile (x, y, z+1)==red_off) {
setTile (x, y, z+1, red_on);
redCheck(x, y, z+1);
}
if (getTile (x, y, z+1)==red_on) {
setTile (x, y, z+1, red_off);
redCheck(x, y, z+1);
}
if (getTile (x, y, z-1)==red_off) {
setTile (x, y, z-1, red_on);
redCheck(x, y, z-1);
}
if (getTile (x+1, y, z)==repeater_off) {
setTile (x+1, y, z, repeater_on);
redCheck(x+1, y, z);
}
if (getTile (x-1, y, z)==repeater_off) {
setTile (x-1, y, z, repeater_on);
redCheck(x-1, y, z);
}
if (getTile (x, y, z+1)==repeater_off) {
setTile (x, y, z+1, repeater_on);
redCheck(x, y, z+1);
}
if (getTile (x, y, z-1)==repeater_off) {
setTile (x, y, z-1, repeater_on);
redCheck(x, y, z-1);
}
if (getTile (x+1, y, z)==lamp_off) {
setTile (x+1, y, z, lamp_on);
redCheck(x+1, y, z);
}
if (getTile (x-1, y, z)==lamp_off) {
setTile (x-1, y, z, lamp_on);
redCheck(x-1, y, z);
}
if (getTile (x, y, z+1)==lamp_off) {
setTile (x, y, z+1, lamp_on);
redCheck(x, y, z+1);
}
if (getTile (x, y, z-1)==lamp_off) {
setTile (x, y, z-1, lamp_on);
redCheck(x, y, z-1);
}
}


ModPE.setItem (500, "name_tag", 0, "Name Tag");

Item.addCraftRecipe (500, 1, 0, [334, 1, 0, 339, 1, 0]);
Item.addCraftRecipe (175, 1, 0, [331, 1, 0]);
Item.addCraftRecipe (331, 1, 0, [175, 1, 0]);
Item.addCraftRecipe (25, 1, 0, [89, 1, 0, 331, 4, 0]);
Item.addCraftRecipe (23, 1, 0, [5, 2, 0]);
Item.addCraftRecipe (174, 1, 0, [280, 1, 0, 331, 1, 0]);
Item.addCraftRecipe (178, 1, 0, [4, 3, 0, 174, 2, 0]);
Item.addCraftRecipe (176, 1, 0, [4, 1, 0, 280, 1, 0]);

function nametaggui(victim)
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
try{

var dialog = new android.app.Dialog(ctx);
var scroll = new android.app.Dialog(ctx);
var tagLayout = new android.widget.LinearLayout(ctx);
var nametagname= new android.widget.EditText(ctx);
var applybtn = new android.widget.Button(ctx);
var exit2 = new android.widget.Button(ctx);

applybtn.setText("Apply");
exit2.setText("Exit");

dialog.setTitle("Name Tag");

tagLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
tagLayout.addView(nametagname);
tagLayout.addView(applybtn);
tagLayout.addView(exit2);


dialog.setContentView(tagLayout);

applybtn.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(view) {
dialog.dismiss();
Entity.setNameTag (victim, nametagname.getText());

}
}));
exit2.setOnClickListener(new android.view.View.OnClickListener( {

onClick: function(view) {

dialog.dismiss();

}
}));
dialog.show();

}
catch(e){
for(var i = 30; i > 1; i--)
{
print(""+error);
}
}
}
}));
}

function configMenu ()
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
try{

var dialog = new android.app.Dialog(ctx);
var scroll = new android.app.Dialog(ctx);
var tagLayout = new android.widget.LinearLayout(ctx);
var applybtn = new android.widget.Button(ctx);
var exit2 = new android.widget.Button(ctx);

applybtn.setText("OK");
exit2.setText("Exit");

dialog.setTitle("MCPE++");

tagLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
tagLayout.addView(applybtn);
tagLayout.addView(exit2);


dialog.setContentView(tagLayout);

applybtn.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(view) {
dialog.dismiss();

}
}));
exit2.setOnClickListener(new android.view.View.OnClickListener( {

onClick: function(view) {

dialog.dismiss();

}
}));
dialog.show();

}
catch(e){
for(var i = 30; i > 1; i--)
{
print(""+error);
}
}
}
}));
}

function destroyBlock (x, y, z, side)
{
	var axeIds = [258, 271, 275, 279, 286];
	var woodId = 17;
	var tile = getTile(x, y, z);
	var item = getCarriedItem();
	 if(item == axeIds[0] || item == axeIds[1] || item == axeIds[2] || item == axeIds[3] || item == axeIds[4])
	if(tile == woodId) { //check if original block touched was wood
		Level.destroyBlock(x, y, z, true); //destroys and drops original wood block
		for(var i = y+1;i < 128;i++) { //loop to look for wood blocks above original block (y+1 as original block has been destroyed at this point)
			if(getTile(x, i, z) == woodId) { //if the block is a wood block
				Level.destroyBlock(x, i, z, true); //destroys and drops wood block
			} else {
				break;
			}
		}
	}

if (tile==23)
{
preventDefault ();
Level.destroyBlock (x, y, z, true);
}

if (adventureGamemode==true) {
preventDefault ();
}

if (tile==red_on) {
preventDefault ();
Level.destroyBlock (x, y, z, false);
Level.dropItem (x, y, z, 0, red_off, 1);
}

if (tile==repeater_on) {
preventDefault ();
Level.destroyBlock (x, y, z, false);
Level.dropItem (x, y, z, 0, repeater_off, 1);
}

if (tile==lamp_on) {
preventDefault ();
Level.destroyBlock (x, y, z, false);
Level.dropItem (x, y, z, 0, lamp_off,  1);
}
}


function useItem(x, y, z, itemId, blockId, side)
{
if (blockId==lever) {
redCheck (x, y, z);
}

}

function attackHook(attacker, victim)
{
if (getCarriedItem()==500)
{
preventDefault ();
nametaggui (victim);
}

}

function modTick()
{
if (getTile (getPlayerX(), getPlayerY()-2, getPlayerZ())==soulsand)
{
Entity.setSneaking (getPlayerEnt(), true);
}
else if (getTile (getPlayerX(), getPlayerY()-1, getPlayerZ())!=soulsand)
{
Entity.setSneaking (getPlayerEnt(), false);
}

if (Level.getGameMode()==1&&adventureGamemode==true)
{
adventureGamemode = false;
ModPE.removeData ("adventureGamemode");
}

if (getTile (getPlayerX (), getPlayerY ()-1, getPlayerZ ())==23) {
redCheck ();
}

}

function procCmd(command)
{
var cmd = command.split(" ");
if (cmd[0] == "gamemode")
{
if (cmd[1] == "0")
{
Level.setGameMode(0);
adventureGamemode = false;
ModPE.removeData("adventureGamemode");
clientMessage ("Gamemode set to Survival");
}
if (cmd[1] == "1")
{
Level.setGameMode(1);
adventureGamemode = false;
ModPE.removeData("adventureGamemode");
clientMessage ("Gamemode set to Creative");
}
if (cmd[1] == "2")
{
adventureGamemode = true;
ModPE.saveData("adventureGamemode","true");
Level.setGameMode(0);
clientMessage ("Gamemode set to Adventure");
}
if (cmd[1] == "3")
{
clientMessage ("Spectator gamemode is not implemented yet!");
}
}

if (cmd[0] == "give")
{
addItemInventory (cmd[1], cmd[2]);
clientMessage ("Given " + cmd[2] + " items of ID " + cmd[1]);
}

}

function newLevel()
{
if (ModPE.readData("adventureGamemode")=="true")
{
adventureGamemode = true;
}

}

function leaveGame()
{

}

