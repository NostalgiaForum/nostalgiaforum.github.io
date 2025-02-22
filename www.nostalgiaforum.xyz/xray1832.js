var GUI;
var menu;
var exitUI;

function dip2px(dips){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel(){
    print("XRay v1.3");
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);

            var menuBtn = new android.widget.Button(ctx);
            menuBtn.setText("XRay Menu");
            menuBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    mainMenu();
                }
            }));
            layout.addView(menuBtn);

            GUI = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
            GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
        }catch(err){
            print(" " + err);
        }
    }}));
}

function mainMenu(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var menuLayout = new android.widget.LinearLayout(ctx);
            var menuScroll = new android.widget.ScrollView(ctx);
            var menuLayout1 = new android.widget.LinearLayout(ctx);
            menuLayout.setOrientation(1);
            menuLayout1.setOrientation(1);

            menuScroll.addView(menuLayout);
            menuLayout1.addView(menuScroll);
//XRay (all blocks)
            var checked = true;
var button = new android.widget.CheckBox(ctx);
button.setText("Enable XRay (show all blocks)");
button.setChecked(checked);
button.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked){
            checked = true;
            print("Reenter the world");
            print("Reenter the world");
                 Block.defineBlock(1, "Stone", ["fx",0],1,0,5);
      Block.defineBlock(2, "Grass", ["fx",0],2,0,5);
      Block.defineBlock(3, "Dirt", ["fx",0],3,0,5);
      Block.defineBlock(5, "Wood Plancs", ["fx",0],5,0,5);
           Block.defineBlock(12, "Sand", ["fx",0],12,0,5);
      Block.defineBlock(13, "Gravel", ["fx",0],13,0,5);
      Block.defineBlock(24, "Sand Stone", ["fx",0],24,0,5);
      Block.defineBlock(80, "Snow Block", ["fx",0],80,0,5);
      Block.setDestroyTime(1,0.1);
      Block.setDestroyTime(2,0.1);
      Block.setDestroyTime(3,0.1);
      Block.setDestroyTime(5,0.2);
      Block.setDestroyTime(12,0.1);
      Block.setDestroyTime(13,0.1);
      Block.setDestroyTime(24,0.2);
      Block.setDestroyTime(80,0.1);
      Block.defineBlock(15, "Iron ore", ["iron_ore",0],15,5);
      Block.defineBlock(16, "Coal ore", ["coal_ore",0],16,5);
      Block.defineBlock(21, "Lapis Lazuli", ["lapis_ore",0],21,5);
      Block.defineBlock(14, "Gold ore", ["gold_ore",0],14,5);
      Block.defineBlock(56, "Diamond ore", ["diamond_ore",0],56,5);
      Block.defineBlock(73, "Red Stone ore", ["redstone_ore",0],73,5);
        }else{
            checked = false;
            print("Canceled");
            Block.defineBlock(1, "Stone", ["stone",0],1,5);
            Block.defineBlock(2, "Grass", ["grass",3],2,5);
            Block.defineBlock(3, "Dirt", ["dirt",0],3,5);
            Block.defineBlock(5, "Wood Planks", ["planks",0],5,5);
            Block.defineBlock(7, "Bedrock", ["bedrock",0],7,5);
            Block.defineBlock(12, "Sand", ["sand",0],12,5);
            Block.defineBlock(13, "Gravel", ["gravel",0],13,5);
            Block.defineBlock(24, "Sand stone", ["sandstone",0],24,5);
            Block.defineBlock(80, "Snow Block", ["snow",0],80,5);
        }
    }
}));
menuLayout.addView(button);

            //Iron ore
            var checked2 = false;
var button2 = new android.widget.CheckBox(ctx);
button2.setText("Hide Iron Ore");
button2.setChecked(checked2);
button2.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked2){
            checked2 = true;
            print("Reenter the world");
            print("Reenter the world");
            Block.defineBlock(15, "Iron ore", ["fx",0],15,0,5);
      Block.setDestroyTime(15,0.1);
        }else{
            checked2 = false;
            print("Canceled");
            Block.defineBlock(15, "Iron ore", ["iron_ore",0],15,5);
        }
    }
}));
menuLayout.addView(button2);

//Coal

var checked3 = false;
var button3 = new android.widget.CheckBox(ctx);
button3.setText("Hide Coal");
button3.setChecked(checked3);
button3.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked3){
            checked3 = true;
            print(" Reenter the world ");
            print(" Reenter the world ");
            Block.defineBlock(16, "Coal", ["fx",0],16,0,5);
      Block.setDestroyTime(16,0.1);
        }else{
            checked3 = false;
            print("Canceled");
            Block.defineBlock(16, "Coal ore", ["coal_ore",0],16,5);
        }
    }
}));
menuLayout.addView(button3);

//Red Stone

var checked4 = false;
var button4 = new android.widget.CheckBox(ctx);
button4.setText("Hide Red Stone");
button4.setChecked(checked4);
button4.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked4){
            checked4 = true;
            print(" Reenter the world");
            print(" Reenter the world");
            Block.defineBlock(73, "Red Stone", ["fx",0],73,0,5);
      Block.setDestroyTime(73,0.1);
        }else{
            checked4 = false;
            print("Canceled");
            Block.defineBlock(73, "Red Stone ore", ["redstone_ore",0],73,5);
        }
    }
}));
menuLayout.addView(button4);

//Gold ore

var checked5 = false;
var button5 = new android.widget.CheckBox(ctx);
button5.setText("Hide Gold Ore");
button5.setChecked(checked5);
button5.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked5){
            checked5 = true;
            print("Reenter the world");
            print("Reenter the world");
            Block.defineBlock(14, "Gold ore", ["fx",0],14,0,5);
      Block.setDestroyTime(14,0.1);
        }else{
            checked5 = false;
            print("Canceled");
            Block.defineBlock(14, "Gold ore", ["gold_ore",0],14,5);
        }
    }
}));
menuLayout.addView(button5);

//Diamond ore

var checked6 = false;
var button6 = new android.widget.CheckBox(ctx);
button6.setText("Hide Diamond Ore");
button6.setChecked(checked6);
button6.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked6){
            checked6 = true;
            print("Reenter the world");
            print("Reenter the world");
            Block.defineBlock(56, "Diamond ore", ["fx",0],56,0,5);
      Block.setDestroyTime(56,0.1);
        }else{
            checked6 = false;
            print("Canceled");
            Block.defineBlock(56, "Diamond ore", ["diamond_ore",0],56,5);
        }
    }
}));
menuLayout.addView(button6);

//Lapis Lazuli

var checked7 = false;
var button7 = new android.widget.CheckBox(ctx);
button7.setText("Hide Lapis Lazuli");
button7.setChecked(checked7);
button7.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked7){
            checked7 = true;
            print("Reenter the world");
            print("Reenter the world");
            Block.defineBlock(21, "Lapis Lazuli", ["fx",0],21,0,5);
      Block.setDestroyTime(21,0.1);
        }else{
            checked7 = false;
            print("Canceled");
            Block.defineBlock(21, "Lapis Lazuli", ["lapis_ore",0],21,5);
        }
    }
}));
menuLayout.addView(button7);

//Bedrock

var checked8 = false;
var button8 = new android.widget.CheckBox(ctx);
button8.setText("Hide Bedrock");
button8.setChecked(checked8);
button8.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!checked8){
            checked8 = true;
            print("Reenter the world");
            print("Reenter the world");
                 Block.defineBlock(7, "Bedrock", ["fx",0],7,0,5);
        }else{
            checked8 = false;
            print("Canceled");
            Block.defineBlock(7, "Bedrock", ["bedrock",0],7,5);
        }
    }
}));
menuLayout.addView(button8);

//---------
var toggled = false;
var buttonTog1 = new android.widget.ToggleButton(ctx);
buttonTog1.setText("Enable/Remove XRay");
buttonTog1.setChecked(toggled);
buttonTog1.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg){
        if(!toggled){
            toggled = true;
            print("Reenter to world");
            print("Reenter to world");
            Block.defineBlock(15, "Iron ore", ["iron_ore",0],15,5);
      Block.defineBlock(16, "Coal ore", ["coal_ore",0],16,5);
      Block.defineBlock(21, "Lapis Lazuli", ["lapis_ore",0],21,5);
      Block.defineBlock(14, "Gold ore", ["gold_ore",0],14,5);
      Block.defineBlock(56, "Diamond ore", ["diamond_ore",0],56,5);
      Block.defineBlock(73, "Red Stone ore", ["redstone_ore",0],73,5);
      Block.defineBlock(1, "Stone", ["stone",0],1,5);
            Block.defineBlock(2, "Grass", ["grass",3],2,5);
            Block.defineBlock(3, "Dirt", ["dirt",0],3,5);
            Block.defineBlock(5, "Wood Planks", ["planks",0],5,5);
            Block.defineBlock(7, "Bedrock", ["bedrock",0],7,5);
            Block.defineBlock(12, "Sand", ["sand",0],12,5);
            Block.defineBlock(13, "Gravel", ["gravel",0],13,5);
            Block.defineBlock(24, "Sand stone", ["sandstone",0],24,5);
            Block.defineBlock(80, "Snow Block", ["snow",0],80,5);
        }else{
            toggled = false;
            print("Canceled");
            Block.defineBlock(1, "Stone", ["fx",0],1,0,5);
      Block.defineBlock(2, "Grass", ["fx",0],2,0,5);
      Block.defineBlock(3, "Dirt", ["fx",0],3,0,5);
      Block.defineBlock(5, "Wood Plancs", ["fx",0],5,0,5);
      Block.defineBlock(7, "Bedrock", ["fx",0],7,0,5);
      Block.defineBlock(12, "Sand", ["fx",0],12,0,5);
      Block.defineBlock(13, "Gravel", ["fx",0],13,0,5);
      Block.defineBlock(24, "Sand Stone", ["fx",0],24,0,5);
      Block.defineBlock(80, "Snow Block", ["fx",0],80,0,5);
      Block.setDestroyTime(1,0.1);
      Block.setDestroyTime(2,0.1);
      Block.setDestroyTime(3,0.1);
      Block.setDestroyTime(5,0.2);
      Block.setDestroyTime(12,0.1);
      Block.setDestroyTime(13,0.1);
      Block.setDestroyTime(24,0.2);
      Block.setDestroyTime(80,0.1);
      Block.defineBlock(15, "Iron ore", ["iron_ore",0],15,5);
      Block.defineBlock(16, "Coal ore", ["coal_ore",0],16,5);
      Block.defineBlock(21, "Lapis Lazuli", ["lapis_ore",0],21,5);
      Block.defineBlock(14, "Gold ore", ["gold_ore",0],14,5);
      Block.defineBlock(56, "Diamond ore", ["diamond_ore",0],56,5);
      Block.defineBlock(73, "Red Stone ore", ["redstone_ore",0],73,5);
        }
    }
}));
menuLayout.addView(buttonTog1);

            menu = new android.widget.PopupWindow(menuLayout1, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
            menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
            menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(error){
            print(" " + error);
        }
    }}));
}

function exit(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var xlayout = new android.widget.LinearLayout(ctx);

            var xbutton = new android.widget.Button(ctx);
            xbutton.setText("X");
            xbutton.setTextColor(android.graphics.Color.WHITE);
            xbutton.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){

                    exitUI.dismiss();

                    menu.dismiss();
                }
            }));
            menuLayout.addView(xbutton);

            exitUI = new android.widget.PopupWindow(xlayout, dip2px(40), dip2px(40));
            exitUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            exitUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(exception){
            print(exception);
        }
    }}));
}

function leaveGame(){
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        if(GUI != null){
            GUI.dismiss();
            GUI = null;
        }
        if(menu != null){
            menu.dismiss();
            menu = null;
        }
        if(exitUI != null){
            exitUI.dismiss();
            exitUI = null;
        }
    }}));
}