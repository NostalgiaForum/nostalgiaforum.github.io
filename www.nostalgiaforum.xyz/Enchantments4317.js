Block.defineBlock(205,"Enchantment Table",[["obsidian",0],["enchanting_table_top",0],["enchanting_table_side",0],["enchanting_table_side",0],["enchanting_table_side",0],["enchanting_table_side",0]],17,true,0);
Block.setDestroyTime(205,60);
Block.setShape(205,0,0,0,1,0.75,1);
Item.addCraftRecipe(205,1,0,[49,1,0, 340,1,0]);

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Gui;
var fireenchant = 0;
var silktouchs = 0;
var efficiencys = 0;
var efficiencyp = 0;

function attackHook(a,v){

var ourItem = getCarriedItem();
  if(fireenchant == 1 && ourItem==276)
    {
       Entity.setFireTicks(v, 3);
         
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
if(itemId == 268. &&   blockId == 205)
{
enchantmenusword()
}

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

dialog.show()

} catch (e){
print ("Error: "+e)
}
}});
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
silktouchs = 0;
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

function destroyBlock(x, y, z, side) {
	var blockId = getTile(x,y,z);
       var itemid = getCarriedItem();

      if (blockId == 2  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 20  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (blockId == 102  &&  itemid == 277  &&  silktouchs == 1) {
      Level.destroyBlock(x, y, z, true);

      } else if (efficiencys == 1  &&  itemid == 277) {
      Block.setDestroyTime(2, 0.20);
      Block.setDestroyTime(3, 0.20);
      Block.setDestroyTime(12, 0.20);
      Block.setDestroyTime(13, 0.20);

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

}

function modTick(){
      if (efficiencys == 1  &&  itemid == 277) {
      Block.setDestroyTime(2, 0.20);
      Block.setDestroyTime(3, 0.20);
      Block.setDestroyTime(12, 0.20);
      Block.setDestroyTime(13, 0.20);

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

}}}