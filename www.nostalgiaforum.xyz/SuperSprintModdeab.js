var round = 1;
var i = 1;
var sprintMode = false;
var gearGUI = null;
var breakGUI = null;
var gear = 1;
function newLevel(){
	// run all the stuff at UI thread
	
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		try{
			gearGUI = new android.widget.PopupWindow();
			breakGUI = new android.widget.PopupWindow();
			var gearlayout = new android.widget.RelativeLayout(ctx);
			var breaklayout = new android.widget.RelativeLayout(ctx);
			var gearbutton = new android.widget.Button(ctx);
			var breakbtn = new android.widget.Button(ctx);
			gearbutton.setText("Gear: " + gear);
			breakbtn.setText("\n Break \n");
			//button.setWidth(75);
			//button.setHeight(75);
			gearbutton.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					if(gear < 6) {
						gear++;
						gearbutton.setText("Gear: "+gear);
					}
					else if(gear == 6) {
						gear = 1;
						gearbutton.setText("Gear: "+gear);
					}
					if(gear > 1) {
						sprintMode = true;
					}
					else if(gear >= 1) {
						sprintMode = false;
					}
				}
			}));
			breakbtn.setOnClickListener(new android.view.View.OnClickListener({
				onClick: function(viewarg) {
					setVelX(getPlayerEnt(),0);
					setVelZ(getPlayerEnt(),0);
				}
			}));
			gearlayout.addView(gearbutton);
			breaklayout.addView(breakbtn);
			
			gearGUI.setContentView(gearlayout);
			gearGUI.setWidth(100);
			gearGUI.setHeight(75);
			gearGUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT ));
			gearGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.BOTTOM, 0, 90);
			
			breakGUI.setContentView(breaklayout);
			breakGUI.setWidth(100);
			breakGUI.setHeight(100);
			breakGUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT ));
			breakGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 200);
			
		}catch(err){
			print("Error: "+err);
		}
	} }));
  
}

function leaveGame(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
		if(gearGUI != null){
			gearGUI.dismiss();
		}
		if(breakGUI != null) {
			breakGUI.dismiss();
		}
	}}));
}


function modTick() {
	 		  if(sprintMode==true)
  			{
    		  if(i==1)
    		  {
     		  Xpos=getPlayerX();
   		     Zpos=getPlayerZ();
  			     i = i + 1;
    		  }
    		  else if(i==3)
  		    {
     	   i=1;
  		      Xdiff=getPlayerX()-Xpos;
     	   Zdiff=getPlayerZ()-Zpos;
     	   setVelX(getPlayerEnt(),Xdiff * (gear / 3));
     	   setVelZ(getPlayerEnt(),Zdiff * (gear / 3));
    		   Xdiff=0;
     	   Zdiff=0;
      }
 		 if(i!=1)
 		 {
  			i = i + 1;
  		 }
	 }
}
