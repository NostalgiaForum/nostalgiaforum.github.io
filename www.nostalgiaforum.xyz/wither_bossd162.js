/*Wither mod by Sin0psysS
//!\\ Do not copy any of this code without my authorisation
Do not put this mod in a modpack without my authorisation

Enjoy & give me feedback!!
Type '/help' in game*/

var credits="§8Wither mod by §5Sin§d0§5psysS\nThanks for playing, be sure to give me feedback!"
var wither;
var countdown=-1;
var count=-1;
var fire=-1;
var ball=-1;
var x;
var y;
var z;
var a;
var b;
var c;
var recurrent=19;
var recurrent2=80;
var height=4;
var witherRenderer = Renderer.createHumanoidRenderer();
addWitherToRenderer(witherRenderer);
var ballRenderer = Renderer.createHumanoidRenderer();
addBallToRenderer(ballRenderer);
Block.defineBlock(129, "Soul Sand", [["soul_sand" , 0],
["soul_sand"  , 0],
["soul_sand"  , 0],
["soul_sand"  , 0],
["soul_sand"  , 0],
["soul_sand"  , 0]], 6, true, 0);
Block.setDestroyTime(129, 1.6);
ModPE.setItem(150,"nether_star",0,"Nether Star") ;
Item.addCraftRecipe(129,1,0,[3,9,0]);
print("Type '/help' in-game");
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
function spawnWither()
{
countdown=200;
wither = Level.spawnMob(a,b+1,c, 12, "mob/char.png");
Entity.setRenderType(wither, witherRenderer.renderType);
wX=Entity.getX(wither);
wY=Entity.getY(wither);
wZ=Entity.getZ(wither);
clientMessage("§5Withering....");
}
function modTick()
{
if(y-Entity.getY(ball)>=0)
{
setVelY(ball,0.3);
}
else if(y-Entity.getY(ball)<=0)
{
setVelY(ball,-0.25);
}
if(x-Entity.getX(ball)>=0)
{
setVelX(ball,0.32);
}
else if(x-Entity.getX(ball)<=0)
{
setVelX(ball,-0.32);
}
if(z-Entity.getZ(ball)>=0)
{
setVelZ(ball,0.32);
}
else if(z-Entity.getZ(ball)<=0)
{
setVelZ(ball,-0.32);
}
if(countdown==-1)
{
if(getPlayerY()-Entity.getY(wither)<=-10)
{
setVelY(wither,-0.4);
}
if(getPlayerX()-Entity.getX(wither)<=-10)
{
setVelX(wither,-0.4);
}
else if(getPlayerX()-Entity.getX(wither)>=10)
{
setVelX(wither, 0.4);
}
if(getPlayerZ()-Entity.getZ(wither)<=-10)
{
setVelZ(wither,-0.4)
}
else if(getPlayerZ()-Entity.getZ(wither)>=10)
{
setVelZ(wither,0.4)
}
if(getTile(Entity.getX(wither),Entity.getY(wither)-height,Entity.getZ(wither))==0)
{
if(recurrent2>=60)
{
setVelY(wither,-0.1)
}
else
{
setVelY(wither,0)
}
}
else
{
setVelY(wither, 0.4)
}
}
if(fire>=1)
{
fire=fire-1;
}
if(fire==0)
{
fire=70;
if(ball==-1)
{
ball=Level.spawnMob(Entity.getX(wither),Entity.getY(wither)+1,Entity.getZ(wither),12, "mob/char.png");
x=Player.getX();
y=Player.getY()-2;
z=Player.getZ();
count=42;
Entity.setHealth(ball,100);
Entity.setRenderType(ball, ballRenderer.renderType);
}
}
if(count>=1)
{
count=count-1;
}
if(count==0)
{
count=-1;
Level.explode(Entity.getX(ball),Entity.getY(ball),Entity.getZ(ball),3);
Entity.remove(ball);
ball=-1
}
if(countdown>=1)
{
countdown=countdown-1;
setVelX(wither,0);
setVelY(wither,0.01);
setVelZ(wither,0);
Entity.setHealth(wither,10);
}
if(countdown==0)
{
clientMessage("§0Withered.");
countdown=-1;
Entity.setHealth(wither,200);
Level.explode(Entity.getX(wither),Entity.getY(wither),Entity.getZ(wither),6);
Entity.remove(wither);
wither = Level.spawnMob(wX, wY, wZ, 12, "mob/char.png");
Entity.setRenderType(wither, witherRenderer.renderType);
Entity.setHealth(wither,140);
fire=70;
}
if(getTile(Entity.getX(ball),Entity.getY(ball)-1,Entity.getZ(ball))==0)
{
}
else
{
Level.explode(Entity.getX(ball),Entity.getY(ball),Entity.getZ(ball),3);
Entity.remove(ball);
ball=-1;
count=-1;
}
if(recurrent>=1)
{
recurrent=recurrent-1;
}
if(recurrent==0)
{
recurrent=5;
if(getTile(Player.getX(),Player.getY()-2,Player.getZ())==129)
{
setVelX(getPlayerEnt(),0);
setVelZ(getPlayerEnt(),0);
}
}
if(recurrent2>=1)
{
recurrent2=recurrent2-1;
}
if(recurrent2==0)
{
recurrent2=80;
height=Math.floor((Math.random()*3)+1);
height=height+1
}
}
function useItem(x, y, z, itemId, blockId)
{
a=x;
b=y;
c=z;
if(itemId==86&&getTile(x,y,z)==129&&getTile(x,y-1,z)==129&&getTile(x+1,y,z)==129&&getTile(x-1,y,z)==129)
{
addItemInventory(86,-1);
Level.destroyBlock(x,y,z);
Level.destroyBlock(x,y-1,z);
Level.destroyBlock(x+1,y,z);
Level.destroyBlock(x-1,y,z);
spawnWither()
}
if(itemId==86&&getTile(x,y,z)==129&&getTile(x,y-1,z)==129&&getTile(x,y,z+1)==129&&getTile(x,y,z-1)==129)
{
addItemInventory(86,-1);
Level.destroyBlock(x,y,z);
Level.destroyBlock(x,y-1,z);
Level.destroyBlock(x,y,z+1);
Level.destroyBlock(x,y,z-1);
spawnWither()
}
if(itemId==150)
{
Level.dropItem(Player.getX(), Player.getY(),Player.getZ(),1,264,1,0);
clientMessage(credits);
}
}
function procCmd(cmd)
{
var c = cmd.split(" ");
if(c[0] == "help")
{
clientMessage("> Craft soul sand with 9 dirt.\n> Create a basic golem pattern.\n> Hit the middle top block with a pumpkin.\n§4> Run.")
}
}
function entityRemovedHook(entity)
{
if(entity==wither)
{
Level.dropItem(Entity.getX(entity),Entity.getY(entity),Entity.getZ(entity),1,150,1,0);
fire=-1;
}
}