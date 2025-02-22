//OnePiece Craft PE made by 49SkyFox

ModPE.setItem (410,"record_11",0, "Wado Ichimonji",1);
ModPE.setItem (411,"record_13",0, "Kitetsu",1);
ModPE.setItem (412,"record_blocks",0, "Shusui",1);
ModPE.setItem (413,"record_far",0, "Yoru",1);
ModPE.setItem (414,"record_cat",0, "Clima-Tact",1);
ModPE.setItem (415,"record_chirp",0, "Kogatana",1);
ModPE.setItem (417,"record_stal",0, "Dark Steel Ingot");
ModPE.setItem (418,"record_mellohi",0, "Steel Ingot");
ModPE.setItem (419,"spider_eye",0, "Spawn Snail");

function useItem(x,y,z,itemId,blockId,side)
{
if(itemId==419)
{
        Snail = Level.spawnMob(x,y+1,z, 12, "mob/snail.png");
        Entity.setHealth(Snail, 15);
        Entity.setRenderType(Snail, SnailRenderType.renderType);
}
}

function attackHook(a,v)
{
if(Player.getCarriedItem()==410)
{
Entity.setHealth(v, Entity.getHealth(v) -6);
}
if(Player.getCarriedItem()==411)
{
Entity.setHealth(v, Entity.getHealth(v) -6.5);
}
if(Player.getCarriedItem()==412)
{
Entity.setHealth(v, Entity.getHealth(v) -7);
}
if(Player.getCarriedItem()==413)
{
Entity.setHealth(v, Entity.getHealth(v) -19);
}
if(Player.getCarriedItem()==415)
{
Entity.setHealth(v, Entity.getHealth(v) -11);
}
if(Player.getCarriedItem()==414)
{
preventDefault();
Entity.setVelY(v, 1.5);
setTile(Entity.getX(v),Entity.getY(v)+1,Entity.getZ(v),155,0);
Level.destroyBlock(Entity.getX(v),Entity.getY(v)+1,Entity.getZ(v),false);
}
}


function newLevel()
{
clientMessage(ChatColor.RED+"OnePiece"+ChatColor.GOLD+"Craft "+ChatColor.WHITE+"PE !");
clientMessage("Write "+ChatColor.GREEN+"/helpmod"+ChatColor.WHITE+" in the chat to see all the commands of the mod !");
clientMessage(ChatColor.GREEN+"By 49SkyFox");
}

Item.addFurnaceRecipe(265,418);
Item.addCraftRecipe(417, 1, 0, [263, 1, 0,263, 1, 0, 263, 1, 0, 263, 1, 0,418, 1, 0, 263, 1, 0, 263, 1, 0,263, 1, 0, 263, 1, 0]);//Dark Steel Ingot
Item.addCraftRecipe(410, 1, 0, [700, 1, 0,418, 1, 0, 700, 1, 0, 700, 1, 0,418, 1, 0, 700, 1, 0, 700, 1, 0,280, 1, 0, 700, 1, 0]);//Wado Ichimonji
Item.addCraftRecipe(411, 1, 0, [700, 1, 0,418, 1, 0, 700, 1, 0, 700, 1, 0,417, 1, 0, 700, 1, 0, 700, 1, 0,280, 1, 0, 700, 1, 0]);//Kitetsu
Item.addCraftRecipe(412, 1, 0, [700, 1, 0,417, 1, 0, 700, 1, 0, 700, 1, 0,417, 1, 0, 700, 1, 0, 700, 1, 0,280, 1, 0, 700, 1, 0]);//Shushui
Item.addCraftRecipe(413, 1, 0, [49, 1, 0,49, 1, 0, 49, 1, 0, 49, 1, 0,266, 1, 0, 49, 1, 0, 264, 1, 0,280, 1, 0, 264, 1, 0]);//Yoru
Item.addCraftRecipe(415, 1, 0, [418, 1, 0,49, 1, 0, 417, 1, 0, 266, 1, 0,49, 1, 0, 266, 1, 0, 700, 1, 0,280, 1, 0, 700, 1, 0]);//Kogatana
Item.addCraftRecipe(414, 1, 0, [700, 1, 0,351, 1, 4, 265, 1, 0, 351, 1, 4,265, 1, 0, 351, 1, 4, 265, 1, 0,351, 1, 4, 700, 1, 0]);//Clima-Tact

Player.addItemCreativeInv(410,1,0);
Player.addItemCreativeInv(411,1,0);
Player.addItemCreativeInv(412,1,0);
Player.addItemCreativeInv(413,1,0);
Player.addItemCreativeInv(414,1,0);
Player.addItemCreativeInv(415,1,0);
Player.addItemCreativeInv(417,1,0);
Player.addItemCreativeInv(418,1,0);
Player.addItemCreativeInv(419,1,0);

function addSnailRenderType(renderer)
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
body.setTextureOffset(0, 24);//body
body.addBox(-4, 23, -8, 8, 1, 7);

body.setTextureOffset(30, 0);//coque
body.addBox(-4, 15, -1, 8, 9, 9);

body.setTextureOffset(0, 0);
body.addBox(-3, 17, -7, 6, 6, 6);//head

body.setTextureOffset(25, 0);
body.addBox(1, 13, -6, 1, 4, 1);//A1

body.setTextureOffset(25, 6);
body.addBox(-2, 13, -6, 1, 4, 1);//A2

body.setTextureOffset(54, 27);
body.addBox(1, 12, -8, 3, 3, 2);//eye1

body.setTextureOffset(43, 27);
body.addBox(-4, 12, -8, 3, 3, 2);//eye2


rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();
}
var SnailRenderType = Renderer.createHumanoidRenderer();
addSnailRenderType(SnailRenderType);


function procCmd(cmd)
{
    var cmd = cmd.split(" ");
    if(cmd[0]=="damage")
    {
	red = ChatColor.RED
	     clientMessage("Wado Ichimonji : "+red+"7");
	     clientMessage("Kitetsu : "+red+"7,5");
	     clientMessage("Shusui : "+red+"8");
		 clientMessage("Kogatana : "+red+"12");
	     clientMessage("Yoru : "+red+"20");
    }
	if(cmd[0]=="giveitems")
    {
	    addItemInventory(410,1);
		addItemInventory(411,1);
		addItemInventory(412,1);
		addItemInventory(413,1);
		addItemInventory(414,1);
		addItemInventory(415,1);
		addItemInventory(417,64);
		addItemInventory(418,64);
		addItemInventory(419,1);
    }
	if(cmd[0]=="helpmod")
    {
	green = ChatColor.GREEN
		clientMessage(green+"/damage"+ChatColor.WHITE+" : See the damage of all swords !");
		clientMessage(green+"/giveitems"+ChatColor.WHITE+" : Give all items of OnePiece Craft PE !");
    }
	}
