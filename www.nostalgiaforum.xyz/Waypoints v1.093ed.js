//Mod made by DAW330073

var X,Z=null;
var gps=false;
var display=new android.util.DisplayMetrics();
com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getWindowManager().getDefaultDisplay().getMetrics(display);
var gpsWindow,exitWindow=null;
var activity=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var arrow;
var arrowImg=new android.widget.ImageView(activity);
var set=false;
var lastDeath={x:null,z:null};
var waypoints={};

var waypointsWindow=null;
function ShowWaypointsGUI(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			try{
				waypointsWindow=new android.widget.PopupWindow();
				var layout=new android.widget.LinearLayout(activity);
				layout.setOrientation(android.widget.LinearLayout.VERTICAL);
				var layout2=new android.widget.LinearLayout(activity);
				layout2.setOrientation(android.widget.LinearLayout.VERTICAL);
				var closeBtn=new android.widget.Button(activity);
				closeBtn.setText("Close");
				var addBtn=new android.widget.Button(activity);
				addBtn.setText("Create waypoint");
				var ldBtn=new android.widget.Button(activity);
				ldBtn.setText("Latest Death");
				closeBtn.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg){
						HideWaypointsGUI();
						}
					}));
				layout2.addView(closeBtn);
				addBtn.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg){
						AddNewWaypoint(parseInt(Player.getX()),parseInt(Player.getZ()));
						HideWaypointsGUI();
						}
					}));
				layout2.addView(addBtn);
				ldBtn.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg){
						if(lastDeath.x && X==lastDeath.x && Z==lastDeath.z){
							X=null;
							Z=null;
							HideGPSGUI();
							HideWaypointsGUI();
							ShowWaypointsGUI();
							}
						else{
							X=lastDeath.x;
							Z=lastDeath.z;
							HideWaypointsGUI();
							ShowGPSGUI();
							}
						}
					}));
				if(X==lastDeath.x && Z==lastDeath.z)
					ldBtn.getBackground().setColorFilter(android.graphics.Color.BLUE,android.graphics.PorterDuff.Mode.MULTIPLY);
				if(lastDeath.x && lastDeath.z)
					layout.addView(ldBtn);
				for(var i=0;i<objectLength(waypoints);i++){
					if(!waypoints[i].removed){
						if(CreateButton(i).getParent()!=null)
							CreateButton(i).getParent().removeView(CreateButton(i));
						layout.addView(CreateButton(i));
						}
					}
				var scrollView=new android.widget.ScrollView(activity);
				scrollView.addView(layout);
				layout2.addView(scrollView);
				waypointsWindow.setContentView(layout2);
				waypointsWindow.setWidth(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				waypointsWindow.setHeight(display.heightPixels);
				waypointsWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.DKGRAY));
				waypointsWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.LEFT,0,0);
				}
			catch(err){
				clientMessage(err);
				}
			}
		}));
	}
function HideWaypointsGUI(){
	activity.runOnUiThread(new java.lang.Runnable({ 
		run: function(){
			if(waypointsWindow!=null){ 
				waypointsWindow.dismiss();
				waypointsWindow=null;
				}
			}
		}));
	}

function AddNewWaypoint(cx,cz){
	var alert=new android.app.AlertDialog.Builder(activity);
	alert.setTitle("Create new waypoint");
	userInput=new android.widget.EditText(activity);
	userInput.setText(cx+","+cz);
	alert.setView(userInput);
	alert.setPositiveButton("Ok",new android.content.DialogInterface.OnClickListener(){
		onClick: function(dialog,whichButton){
			waypoints[objectLength(waypoints)]={name:userInput.getText(),x:cx,z:cz,removed:false};
			Save();
			}
		});

	alert.setNegativeButton("Cancel",new android.content.DialogInterface.OnClickListener(){
		onClick: function(dialog,whichButton){}
		});
	alert.show();
	}

function CreateButton(i){
	try{
		var slayout=new android.widget.LinearLayout(activity);
		slayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
		var btn=new android.widget.Button(activity);
		btn.setText(waypoints[i].name);
		if(X==waypoints[i].x && Z==waypoints[i].z)
			btn.getBackground().setColorFilter(android.graphics.Color.BLUE,android.graphics.PorterDuff.Mode.MULTIPLY);
		btn.setOnClickListener(new android.view.View.OnClickListener({
			onClick: function(viewarg){
				if(X==waypoints[i].x && Z==waypoints[i].z){
					X=null;
					Z=null;
					HideGPSGUI();
					HideWaypointsGUI();
					ShowWaypointsGUI();
					}
				else{
					X=waypoints[i].x;
					Z=waypoints[i].z;
					HideWaypointsGUI();
					ShowGPSGUI();
					}
				}
			}));
		var btn2=new android.widget.Button(activity);
		btn2.setText("x");
		btn2.getBackground().setColorFilter(android.graphics.Color.RED,android.graphics.PorterDuff.Mode.MULTIPLY);
		btn2.setOnClickListener(new android.view.View.OnClickListener({
			onClick: function(viewarg){
				RemoveWaypoint(i);
				HideWaypointsGUI();
				}
			}));
		if(btn.getParent()!=null)
			btn.getParent().removeView(btn);
		slayout.addView(btn);
		if(btn2.getParent()!=null)
			btn2.getParent().removeView(btn2);
		slayout.addView(btn2);
		}
	catch(err){
		clientMessage(err);
		}
	return slayout;
	}

function RemoveWaypoint(i){
	waypoints[i].removed=true;
	if(X==waypoints[i].x && Z==waypoints[i].z){
		X=null;
		Z=null;
		HideGPSGUI();
		}
	Save();
	}

function Save(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
		java.io.File(path).mkdirs();
		var newFile=new java.io.File(path,"waypoints.txt");
		newFile.createNewFile();
		var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
		var k=0;
		if(!lastDeath.x && !lastDeath.z){
			for(var j=0;j<objectLength(waypoints);j++){
				if(!waypoints[j].removed){
					outWrite.append(waypoints[j].name+"@"+waypoints[j].x+"@"+waypoints[j].z);
					k=j+1;
					break;
					}
				}
			}
		else
			outWrite.append("lastDeath@"+lastDeath.x+"@"+lastDeath.z);
		for(var j=k;j<objectLength(waypoints);j++){
			if(!waypoints[j].removed)
				outWrite.append("\n"+waypoints[j].name+"@"+waypoints[j].x+"@"+waypoints[j].z);
			}
		outWrite.close();
		}
	catch(err){
		clientMessage(err);
		}
	}

function Load(){
	var savefile="";
	var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
	if(java.io.File(path+"waypoints.txt").exists()){
		var file=new java.io.File(path+"waypoints.txt");
		var fos=new java.io.FileInputStream(file);
		var str=new java.lang.StringBuilder();
		var ch;
		while((ch=fos.read())!=-1)
			str.append(java.lang.Character(ch));
		savefile=String(str.toString());
		if(savefile.length>4){
			for(var i=0;i<savefile.split("\n").length;i++){
				if(i==0 && savefile.split("\n")[i].split("@")[0]=="lastDeath")
					lastDeath={x:parseInt(savefile.split("\n")[i].split("@")[1]),z:parseInt(savefile.split("\n")[i].split("@")[2])};
				else
					waypoints[objectLength(waypoints)]={name:savefile.split("\n")[i].split("@")[0],x:parseInt(savefile.split("\n")[i].split("@")[1]),z:parseInt(savefile.split("\n")[i].split("@")[2]),removed:false};
				}
			}
		fos.close();
		}
	}

function objectLength(obj){
	var x=0;
	for(var i in obj)
		x++;
	return x;
	}

function modTick(){
	if(Entity.getHealth(Player.getEntity())<=0 && !set){
		lastDeath.x=Player.getX();
		lastDeath.z=Player.getZ();
		set=true;
		}
	if(set && Entity.getHealth(Player.getEntity())>0)
		set=false;
	if(gps){
		activity.runOnUiThread(new java.lang.Runnable({
			run: function(){
				if(Math.sqrt(Math.pow(X-Player.getX(),2)+Math.pow(Z-Player.getZ(),2))<3)
					arrowImg.setRotation(arrowImg.getRotation()+40);
				else
					arrowImg.setRotation(-getYaw()-Math.atan2(X-(Player.getX()+0.5),Z-(Player.getZ()+0.5))*(180/Math.PI));
				}
			}));
		}
	}
ModPE.downloadFile=function(filename,url){
	var file=new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/minecraftResource/ExtendedCraft/gps/"+filename);
	file.createNewFile();
	var fos=new java.io.FileOutputStream(file);
	var response=android.net.http.AndroidHttpClient.newInstance("ModPE.downloadFile()").execute(new org.apache.http.client.methods.HttpGet(url)).getEntity().writeTo(fos);
	fos.close();
	};
var path=android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/minecraftResource/ExtendedCraft/gps/";
if(!java.io.File(path+"arrow.png").exists()){
	try{
		java.io.File(path).mkdirs();
		print("Please wait...downloading GUI...")
		ModPE.downloadFile("arrow.png","http://i.imgur.com/jJVSAFv.png");
		arrow=new android.graphics.drawable.BitmapDrawable(path+"arrow.png");
		print("Done!");
		}
	catch(err){
		print(err);
		}
	}
else{
	try{
		arrow=new android.graphics.drawable.BitmapDrawable(path+"arrow.png");
		}
	catch(err){
		print(err);
		}
	}
function ShowGPSGUI(){
	gps=true;
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			try{
				if(gpsWindow!=null){ 
					gpsWindow.dismiss();
					gpsWindow=null;
					}
				gpsWindow=new android.widget.PopupWindow();
				gpsWindow.setFocusable(false);
				gpsWindow.setTouchable(false);
				var layout=new android.widget.LinearLayout(activity);
				layout.setOrientation(android.widget.LinearLayout.VERTICAL);
				if(arrowImg.getParent()!=null)
					arrowImg.getParent().removeView(arrowImg);
				arrowImg.setBackgroundDrawable(arrow);
				layout.addView(arrowImg);
				gpsWindow.setContentView(layout);
				gpsWindow.setWidth(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				gpsWindow.setHeight(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				gpsWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				gpsWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP,0,display.heightPixels/10);
				}
			catch(err){
				clientMessage(err);
				}
			}
		}));
	}
function HideGPSGUI(){
	gps=false;
	X=null;
	Z=null;
	activity.runOnUiThread(new java.lang.Runnable({ 
		run: function(){
			if(gpsWindow!=null){ 
				gpsWindow.dismiss();
				gpsWindow=null;
				}
			}
		}));
	}

function newLevel(){
	Load();
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			try{
				exitWindow=new android.widget.PopupWindow();
				var exitLayout=new android.widget.LinearLayout(activity);
				exitLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
				var exitButton=new android.widget.Button(activity);
				exitButton.setText("W");
				exitButton.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg){
						ShowWaypointsGUI();
						}
					}));
				exitLayout.addView(exitButton);
				exitWindow.setContentView(exitLayout);
				exitWindow.setWidth(Math.ceil(48*activity.getResources().getDisplayMetrics().density));
				exitWindow.setHeight(Math.ceil(48*activity.getResources().getDisplayMetrics().density));
				exitWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				exitWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.LEFT,0,display.heightPixels/10);
				}
			catch(err){
				clientMessage(err);
				}
			}
		}));
	}

function leaveGame(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			if(exitWindow!=null){ 
				exitWindow.dismiss();
				exitWindow=null;
				}
			}
		}));
	lastDeath={x:null,z:null};
	waypoints={};
	HideGPSGUI();
	X=null;
	Z=null;
	set=false;
	}