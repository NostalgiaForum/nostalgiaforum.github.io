// tocaunt
var i = 1;
var Xpos, Zpos, Xdiff, Zdiff;

var speed = 0;
var enable;

var ctx;
var windowA;
var windowB;
var windowC;
var currSpeed;

function newLevel()
{
clientMessage(ChatColor.RED+"SpeedHack by tocaunt");
ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable(
	{
	run:
	function()
	{
		try{
		    var LayoutA = new android.widget.RelativeLayout(ctx);
		    var LayoutB = new android.widget.RelativeLayout(ctx);
		    var buttonA = new android.widget.Button(ctx);
		    var buttonB = new android.widget.Button(ctx);
		    
		    buttonA.setText("+");
		    buttonB.setText("-");
		    
		    currSpeed = new android.widget.TextView(ctx);
		    currSpeed.setText("0");
		    currSpeed.setTextColor(android.graphics.Color.RED);
			currSpeed.getPaint().setFakeBoldText(true)
            currSpeed.setTextSize(30);
			
		    var LayoutC = new android.widget.RelativeLayout(ctx);
		    
		    LayoutA.addView(buttonA);
		    LayoutB.addView(buttonB);
		    LayoutC.addView(currSpeed);
		    
		    
		    
		    buttonA.setOnClickListener(new android.view.View.OnClickListener(
			{
				onClick:
				function(viewarg)
				{    
				     if(speed!=5)
				     {
				     speed += 1;
				     }
				}
			}));
			
			
			
			buttonB.setOnClickListener(new android.view.View.OnClickListener(
			{
				onClick:
				function(viewarg)
				{    
				     if(speed!=0)
				     {
				     speed -= 1;
				     }
				}
			}));
			
			
			
			var Ax = dip2px(ctx, 0);
		    var Ay = dip2px(ctx, 0);
		    var Aflags = android.view.Gravity.RIGHT | android.view.Gravity.TOP;
	        
		    windowA = new android.widget.PopupWindow(LayoutA, dip2px(ctx, 50), dip2px(ctx, 50));
			windowA.showAtLocation(ctx.getWindow().getDecorView(), Aflags, Ax, Ay);
			
			
			var Bx = dip2px(ctx, 0);
		    var By = dip2px(ctx, 0);
		    var Bflags = android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM;
	        
	        windowB = new android.widget.PopupWindow(LayoutB, dip2px(ctx, 50), dip2px(ctx, 50));
			windowB.showAtLocation(ctx.getWindow().getDecorView(), Bflags, Bx, By);
			
			
			var Cx = dip2px(ctx, 0);
		    var Cy = dip2px(ctx, 0);
		    var Cflags = android.view.Gravity.CENTER | android.view.Gravity.CENTER;
	        
	        windowC = new android.widget.PopupWindow(LayoutC, dip2px(ctx, 50), dip2px(ctx, 50));
			windowC.showAtLocation(ctx.getWindow().getDecorView(), Cflags, Cx, Cy);
			
		    }catch(err){print(err)}
    }
    }))
}

function modTick()
{
if(speed!=0){enable=true}else{enable=true}
if(enable==true)
{
if(i==1)
      {
        Xpos=getPlayerX();
        Zpos=getPlayerZ();
        i = i + 1;
      }
      else if(i==2&&speed==1)
      {
      Xdiff=getPlayerX()-Xpos;
      Zdiff=getPlayerZ()-Zpos;
        
      setVelX(getPlayerEnt(),Xdiff);
      setVelZ(getPlayerEnt(),Zdiff);
      Xdiff=0;
      Zdiff=0;
      i=1;
      }
      else if(i==2&&speed==2)
      {
      Xdiff=getPlayerX()-Xpos;
      Zdiff=getPlayerZ()-Zpos;
      
      setVelX(getPlayerEnt(),1.1*Xdiff);
      setVelZ(getPlayerEnt(),1.1*Zdiff);
      Xdiff=0;
      Zdiff=0;
      i=1;
      }
      else if(i==2&&speed==3)
      {
      Xdiff=getPlayerX()-Xpos;
      Zdiff=getPlayerZ()-Zpos;
      
      setVelX(getPlayerEnt(),1.2*Xdiff);
      setVelZ(getPlayerEnt(),1.2*Zdiff);
      Xdiff=0;
      Zdiff=0;
      i=1;
      }
      else if(i==2&&speed==4)
      {
      Xdiff=getPlayerX()-Xpos;
      Zdiff=getPlayerZ()-Zpos;
      
      setVelX(getPlayerEnt(),1.3*Xdiff);
      setVelZ(getPlayerEnt(),1.3*Zdiff);
      Xdiff=0;
      Zdiff=0;
      i=1;
      }
      else if(i==2&&speed==5)
      {
      Xdiff=getPlayerX()-Xpos;
      Zdiff=getPlayerZ()-Zpos;
      
      setVelX(getPlayerEnt(),1.35*Xdiff);
      setVelZ(getPlayerEnt(),1.35*Zdiff);
      Xdiff=0;
      Zdiff=0;
      i=1;
      }
}
ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable(
	{
	run:
	function()
	{
		try{
		    if(speed!=0)
		    {
		    currSpeed.setText(speed+"");
		    }else{
		    currSpeed.setText("0");//standart
		    //currSpeed.setTexr("Standart");
		    }
		    }catch(err){print(err)}
    }
    }))

}

function leaveGame()
{
ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable(
	{
	run:
	function()
	{
		try{
		    windowA.dismiss();
		    windowA = null;
		    
		    windowB.dismiss();
		    windowB = null;
		    
		    windowC.dismiss();
		    windowC = null;
		    }catch(err){print(err)}
	}
	}))
}

function dip2px(ctx, dips)
{
 return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}