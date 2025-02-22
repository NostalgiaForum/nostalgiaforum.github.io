//Mod made by DAW330073

ModPE.setItems("http://i.imgur.com/pyiOQeb.png");

var version=1.1;

var activity=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var display=new android.util.DisplayMetrics();
com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getWindowManager().getDefaultDisplay().getMetrics(display);

var bntWindow=null;
var backpackWindow=null;
var inventoryWindow=null;
var titleWindow1=null;
var titleWindow2=null;

var backpack=[];
var backpack1=[];
var backpack2=[];
var backpack3=[];
var bcp=null;

ModPE.setItem(460,"record_11",0,"backpack",1);
ModPE.setItem(461,"record_13",0,"backpack",1);
ModPE.setItem(462,"record_blocks",0,"backpack",1);
ModPE.setItem(463,"record_cat",0,"backpack",1);
ModPE.langEdit("item.backpack.name","Backpack");
Item.addShapedRecipe(460,1,0,["lll","l l","lcl"],["l",334,0,"c",54,0]);
Item.addCraftRecipe(461,1,0,[460,1,0,351,1,1]);
Item.addCraftRecipe(462,1,0,[460,1,0,351,1,2]);
Item.addCraftRecipe(463,1,0,[460,1,0,351,1,4]);

var versionCheck=CheckForUpdates();
var versionChecked=false;
if(version<versionCheck && !versionChecked){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			versionChecked=true;
			var alert=new android.app.AlertDialog.Builder(activity);
			alert.setTitle("New Version");
			alert.setMessage("Currently available version: "+versionCheck+"\nYour version: "+version); 
			alert.setPositiveButton("Update",new android.content.DialogInterface.OnClickListener(){
				onClick: function(dialog,whichButton){
					try{
						activity.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW,android.net.Uri.parse("http://adf.ly/qERTr")));
						}
					catch(err){
						print(err);
						}
					}
				});
			alert.setNegativeButton("Later",new android.content.DialogInterface.OnClickListener(){
				onClick: function(dialog,whichButton){}
				});
			alert.show();
			}
		}));
	}
function CheckForUpdates(){
	var out=new java.io.ByteArrayOutputStream();
	var response=android.net.http.AndroidHttpClient.newInstance("CheckForUpdates()").execute(new org.apache.http.client.methods.HttpGet("https://dl.dropboxusercontent.com/u/82808924/MCPE/Backpack%20update.txt")).getEntity().writeTo(out);
	out.close();
	return Number(String(out.toString()));
	}

function Load(){
	var savefile="";
	var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
	if(java.io.File(path+"backpack.txt").exists()){
		var file=new java.io.File(path+"backpack.txt");
		var fos=new java.io.FileInputStream(file);
		var str=new java.lang.StringBuilder();
		var ch;
		while((ch=fos.read())!=-1)
			str.append(java.lang.Character(ch));
		savefile=String(str.toString());
		var bb={0:backpack,1:backpack1,2:backpack2,3:backpack3};
		for(var b=0;b<savefile.split("\n").length;b++){
			for(var i=0;i<savefile.split("\n")[b].split("<>").length;i++)
				bb[b].push(savefile.split("\n")[b].split("<>")[i]);
			}
		fos.close();
		}
	}
function Save(){
	try{
		var path=android.os.Environment.getExternalStorageDirectory().getPath()+"/games/com.mojang/minecraftworlds/"+Level.getWorldName()+"/";
		java.io.File(path).mkdirs();
		var newFile=new java.io.File(path,"backpack.txt");
		newFile.createNewFile();
		var outWrite=new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
		var bb={0:backpack,1:backpack1,2:backpack2,3:backpack3};
		for(var b=0;b<4;b++){
			if(bb[b][0])
				outWrite.append(bb[b][0]);
			for(var i=1;i<bb[b].length;i++)
				outWrite.append("<>"+bb[b][i]);
			if(b!=3)
				outWrite.append("\n");
			}
		outWrite.close();
		}
	catch(err){
		clientMessage(err);
		}
	}

ModPE.downloadFile=function(filename,url){
	var file=new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/minecraftResource/ExtendedCraft/backpack/"+filename);
	file.createNewFile();
	var fos=new java.io.FileOutputStream(file);
	var response=android.net.http.AndroidHttpClient.newInstance("ModPE.downloadFile()").execute(new org.apache.http.client.methods.HttpGet(url)).getEntity().writeTo(fos);
	fos.close();
	};

var path=android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/minecraftResource/ExtendedCraft/backpack/";
if(!java.io.File(path+"background2.png").exists()){
	try{
		java.io.File(path).mkdirs();
		print("Please wait...downloading GUI...")
		ModPE.downloadFile("blocks.png","http://i.imgur.com/ID7YHQ5.png");
		ModPE.downloadFile("items.png","http://i.imgur.com/Io1Zy1z.png");
		ModPE.downloadFile("background1.png","http://i.imgur.com/hajlp6C.png");
		ModPE.downloadFile("background2.png","http://i.imgur.com/LKAZchp.png");
		}
	catch(err){
		print(err);
		}
	}
else
	print("Please wait...");
if(java.io.File(path+"background2.png").exists()){
	try{
		blocks=new android.graphics.drawable.BitmapDrawable(path+"blocks.png");
		items=new android.graphics.drawable.BitmapDrawable(path+"items.png");
		background1=new android.graphics.drawable.BitmapDrawable(path+"background1.png");
		background1.setTileModeXY(android.graphics.Shader.TileMode.REPEAT,android.graphics.Shader.TileMode.REPEAT);
		background2=new android.graphics.drawable.BitmapDrawable(path+"background2.png");
		background2.setTileModeXY(android.graphics.Shader.TileMode.REPEAT,android.graphics.Shader.TileMode.REPEAT);
		//blocks
		i1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,3*32,31,32));
		i2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,1*32,31,32));
		i3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,2*32,31,32));
		i4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,0*32,31,32));
		i5d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,0*32,31,32));
		i5d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,4*32,31,32));
		i5d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,4*32,31,32));
		i5d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,5*32,31,32));
		i5d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,6*32,31,32));
		i5d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,7*32,31,32));
		i6d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,7*32,31,32));
		i6d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,8*32,31,32));
		i6d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,9*32,31,32));
		i6d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,9*32,31,32));
		i6d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,10*32,31,32));
		i6d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,10*32,31,32));
		i7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,10*32,31,32));
		i8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,10*32,31,32));
		i9=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,10*32,31,32));
		i10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,10*32,31,32));
		i11=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,10*32,31,32));
		i12d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,10*32,31,32));
		i12d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,10*32,31,32));
		i13=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,10*32,31,32));
		i14=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,10*32,31,32));
		i15=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,10*32,31,32));
		i16=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,10*32,31,32));
		i17d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,10*32,31,32));
		i17d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,10*32,31,32));
		i17d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,11*32,31,32));
		i17d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,11*32,31,32));
		i18d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,11*32,31,32));
		i18d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,11*32,31,32));
		i18d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,11*32,31,32));
		i18d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,11*32,31,32));
		i19=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,11*32,31,32));
		i20=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,11*32,31,32));
		i21=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,11*32,31,32));
		i22=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,11*32,31,32));
		i24d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,11*32,31,32));
		i24d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,11*32,31,32));
		i24d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,11*32,31,32));
		i27=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,11*32,31,32));
		i30=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,11*32,31,32));
		i31d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,12*32,31,32));
		i31d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,12*32,31,32));
		i31d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,12*32,31,32));
		i31d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,12*32,31,32));
		i32=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,12*32,31,32));
		i35d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,12*32,31,32));
		i35d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,12*32,31,32));
		i35d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,12*32,31,32));
		i35d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,12*32,31,32));
		i35d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,12*32,31,32));
		i35d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,12*32,31,32));
		i35d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,12*32,31,32));
		i35d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,12*32,31,32));
		i35d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,12*32,31,32));
		i35d9=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,12*32,31,32));
		i35d10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,12*32,31,32));
		i35d11=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,13*32,31,32));
		i35d12=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,13*32,31,32));
		i35d13=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,13*32,31,32));
		i35d14=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,13*32,31,32));
		i35d15=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,13*32,31,32));
		i37=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,13*32,31,32));
		i38d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,13*32,31,32));
		i38d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,13*32,31,32));
		i38d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,13*32,31,32));
		i38d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,13*32,31,32));
		i38d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,13*32,31,32));
		i38d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,13*32,31,32));
		i38d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,13*32,31,32));
		i38d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,13*32,31,32));
		i38d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,13*32,31,32));
		i39=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,14*32,31,32));
		i40=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,14*32,31,32));
		i41=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,14*32,31,32));
		i42=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,14*32,31,32));
		i43d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,14*32,31,32));
		i43d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,0*32,31,32));
		i43d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,0*32,31,32));
		i43d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,0*32,31,32));
		i43d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,0*32,31,32));
		i43d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,0*32,31,32));
		i43d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,0*32,31,32));
		i43d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,0*32,31,32));
		i43d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,0*32,31,32));
		i43d9=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,0*32,31,32));
		i44d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,0*32,31,32));
		i44d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,0*32,31,32));
		i44d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,0*32,31,32));
		i44d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,0*32,31,32));
		i44d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,0*32,31,32));
		i44d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,0*32,31,32));
		i44d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,1*32,31,32));
		i44d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,1*32,31,32));
		i45=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,0*32,31,32));
		i46=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,1*32,31,32));
		i47=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,1*32,31,32));
		i48=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,1*32,31,32));
		i49=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,1*32,31,32));
		i50=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,1*32,31,32));
		i51=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,1*32,31,32));
		i52=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,1*32,31,32));
		i53=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,1*32,31,32));
		i54=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,1*32,31,32));
		i56=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,1*32,31,32));
		i57=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,1*32,31,32));
		i58=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,2*32,31,32));
		i60=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,2*32,31,32));
		i61=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,2*32,31,32));
		i62=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,2*32,31,32));
		i65=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,2*32,31,32));
		i66=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,2*32,31,32));
		i67=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,2*32,31,32));
		i73=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,2*32,31,32));
		i78=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,2*32,31,32));
		i79=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,2*32,31,32));
		i80=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,2*32,31,32));
		i81=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,2*32,31,32));
		i82=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,2*32,31,32));
		i85=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,2*32,31,32));
		i86=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,3*32,31,32));
		i87=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,3*32,31,32));
		i89=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,3*32,31,32));
		i91=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,3*32,31,32));
		i96=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,3*32,31,32));
		i97d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,3*32,31,32));
		i97d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,3*32,31,32));
		i97d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,3*32,31,32));
		i98d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,3*32,31,32));
		i98d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,3*32,31,32));
		i98d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,3*32,31,32));
		i98d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,3*32,31,32));
		i99=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,3*32,31,32));
		i100=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,3*32,31,32));
		i101=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,3*32,31,32));
		i102=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,4*32,31,32));
		i103=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,4*32,31,32));
		i106=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,4*32,31,32));
		i107=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,4*32,31,32));
		i108=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,4*32,31,32));
		i109=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,4*32,31,32));
		i110=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,4*32,31,32));
		i111=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,4*32,31,32));
		i112=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,0*32,31,32));
		i114=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,4*32,31,32));
		i120=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,4*32,31,32));
		i121=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,4*32,31,32));
		i127=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,4*32,31,32));
		i128=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,4*32,31,32));
		i129=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,5*32,31,32));
		i133=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,5*32,31,32));
		i134=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,5*32,31,32));
		i135=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,5*32,31,32));
		i136=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,5*32,31,32));
		i139d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,5*32,31,32));
		i139d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,5*32,31,32));
		i141=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,5*32,31,32));
		i142=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,5*32,31,32));
		i155d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,5*32,31,32));
		i155d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,5*32,31,32));
		i155d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,5*32,31,32));
		i155d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,5*32,31,32));
		i155d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,5*32,31,32));
		i156=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,5*32,31,32));
		i158d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,0*32,31,32));
		i158d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,6*32,31,32));
		i158d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,6*32,31,32));
		i158d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,6*32,31,32));
		i159d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,6*32,31,32));
		i159d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,6*32,31,32));
		i159d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,6*32,31,32));
		i159d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,6*32,31,32));
		i159d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,6*32,31,32));
		i159d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,6*32,31,32));
		i159d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,6*32,31,32));
		i159d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,6*32,31,32));
		i159d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,6*32,31,32));
		i159d9=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,6*32,31,32));
		i159d10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,6*32,31,32));
		i159d11=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,7*32,31,32));
		i159d12=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,7*32,31,32));
		i159d13=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,7*32,31,32));
		i159d14=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,7*32,31,32));
		i159d15=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,7*32,31,32));
		i161d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,7*32,31,32));
		i161d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,7*32,31,32));
		i162d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,7*32,31,32));
		i162d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,7*32,31,32));
		i170=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,7*32,31,32));
		i171d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,7*32,31,32));
		i171d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,7*32,31,32));
		i171d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,7*32,31,32));
		i171d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,7*32,31,32));
		i171d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,8*32,31,32));
		i171d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,8*32,31,32));
		i171d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,8*32,31,32));
		i171d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,8*32,31,32));
		i171d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,8*32,31,32));
		i171d9=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,8*32,31,32));
		i171d10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,8*32,31,32));
		i171d11=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),8*31,8*32,31,32));
		i171d12=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,8*32,31,32));
		i171d13=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,8*32,31,32));
		i171d14=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,8*32,31,32));
		i171d15=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,8*32,31,32));
		i172=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,8*32,31,32));
		i173=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,8*32,31,32));
		i175d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,9*32,31,32));
		i175d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),2*31,9*32,31,32));
		i175d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),3*31,9*32,31,32));
		i175d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),4*31,9*32,31,32));
		i175d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),5*31,9*32,31,32));
		i175d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),6*31,9*32,31,32));
		i243=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,9*32,31,32));
		i244=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),7*31,5*32,31,32));
		i245=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),9*31,9*32,31,32));
		i246=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),10*31,9*32,31,32));
		i247d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),11*31,9*32,31,32));
		i247d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),12*31,9*32,31,32));
		i247d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),13*31,9*32,31,32));
		i248=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),14*31,9*32,31,32));
		i249=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),0*31,10*32,31,32));
		i255=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(blocks.getBitmap(),1*31,10*32,31,32));
		//items
		i256=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,1*32,31,32));
		i257=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,2*32,31,32));
		i258=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,3*32,31,32));
		i259=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,4*32,31,32));
		i260=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,4*32,31,32));
		i261=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,5*32,31,32));
		i262=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,5*32,31,32));
		i263d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,5*32,31,32));
		i263d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,5*32,31,32));
		i264=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,6*32,31,32));
		i265=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,6*32,31,32));
		i266=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,6*32,31,32));
		i267=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,6*32,31,32));
		i268=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,6*32,31,32));
		i269=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,6*32,31,32));
		i270=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,6*32,31,32));
		i271=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,6*32,31,32));
		i272=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,6*32,31,32));
		i273=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,6*32,31,32));
		i274=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,6*32,31,32));
		i275=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,6*32,31,32));
		i276=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,7*32,31,32));
		i277=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,7*32,31,32));
		i278=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,7*32,31,32));
		i279=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,7*32,31,32));
		i280=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,7*32,31,32));
		i281=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,7*32,31,32));
		i282=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,7*32,31,32));
		i283=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,7*32,31,32));
		i284=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,7*32,31,32));
		i285=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,7*32,31,32));
		i286=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,7*32,31,32));
		i287=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,7*32,31,32));
		i288=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,8*32,31,32));
		i289=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,8*32,31,32));
		i290=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,8*32,31,32));
		i291=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,8*32,31,32));
		i292=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,8*32,31,32));
		i293=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,8*32,31,32));
		i294=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,8*32,31,32));
		i295=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,8*32,31,32));
		i296=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,8*32,31,32));
		i297=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,8*32,31,32));
		i298=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,8*32,31,32));
		i299=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,8*32,31,32));
		i300=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,9*32,31,32));
		i301=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,9*32,31,32));
		i302=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,9*32,31,32));
		i303=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,9*32,31,32));
		i304=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,9*32,31,32));
		i305=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,9*32,31,32));
		i306=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,9*32,31,32));
		i307=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,9*32,31,32));
		i308=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,9*32,31,32));
		i309=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,9*32,31,32));
		i310=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,9*32,31,32));
		i311=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,9*32,31,32));
		i312=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,10*32,31,32));
		i313=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,10*32,31,32));
		i314=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,10*32,31,32));
		i315=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,10*32,31,32));
		i316=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,10*32,31,32));
		i317=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,10*32,31,32));
		i318=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,10*32,31,32));
		i319=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,10*32,31,32));
		i320=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,10*32,31,32));
		i321=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,10*32,31,32));
		i323=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,10*32,31,32));
		i324=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,10*32,31,32));
		i325d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,11*32,31,32));
		i325d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,11*32,31,32));
		i325d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,11*32,31,32));
		i325d10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,11*32,31,32));
		i328=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,11*32,31,32));
		i329=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,11*32,31,32));
		i330=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,11*32,31,32));
		i331=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,11*32,31,32));
		i332=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,11*32,31,32));
		i334=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,11*32,31,32));
		i336=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,11*32,31,32));
		i337=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,0*32,31,32));
		i338=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,0*32,31,32));
		i339=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,0*32,31,32));
		i340=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,0*32,31,32));
		i341=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,0*32,31,32));
		i344=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,0*32,31,32));
		i345=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,0*32,31,32));
		i347=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,0*32,31,32));
		i348=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,0*32,31,32));
		i351d0=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,0*32,31,32));
		i351d1=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,0*32,31,32));
		i351d2=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,0*32,31,32));
		i351d3=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,1*32,31,32));
		i351d4=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,1*32,31,32));
		i351d5=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,1*32,31,32));
		i351d6=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,1*32,31,32));
		i351d7=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,1*32,31,32));
		i351d8=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,1*32,31,32));
		i351d9=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,1*32,31,32));
		i351d10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,1*32,31,32));
		i351d11=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,1*32,31,32));
		i351d12=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,1*32,31,32));
		i351d13=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,1*32,31,32));
		i351d14=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,0*32,31,32));
		i351d15=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,2*32,31,32));
		i352=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,2*32,31,32));
		i353=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,2*32,31,32));
		i354=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,2*32,31,32));
		i355=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,2*32,31,32));
		i357=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,2*32,31,32));
		i359=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,2*32,31,32));
		i360=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,2*32,31,32));
		i361=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,2*32,31,32));
		i362=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,2*32,31,32));
		i363=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,3*32,31,32));
		i364=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,3*32,31,32));
		i365=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,3*32,31,32));
		i366=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,3*32,31,32));
		i367=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,3*32,31,32));
		i383d10=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,3*32,31,32));
		i383d11=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,3*32,31,32));
		i383d12=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,3*32,31,32));
		i383d13=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,3*32,31,32));
		i383d14=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),10*31,3*32,31,32));
		i383d15=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,3*32,31,32));
		i383d16=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,4*32,31,32));
		i383d32=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,4*32,31,32));
		i383d33=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,4*32,31,32));
		i383d34=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,4*32,31,32));
		i383d35=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,4*32,31,32));
		i383d36=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,4*32,31,32));
		i383d37=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,4*32,31,32));
		i383d38=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),8*31,4*32,31,32));
		i383d39=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),9*31,4*32,31,32));
		i388=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),11*31,4*32,31,32));
		i391=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,5*32,31,32));
		i392=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,5*32,31,32));
		i393=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,5*32,31,32));
		i405=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,5*32,31,32));
		i406=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),4*31,5*32,31,32));
		i407=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),5*31,5*32,31,32));
		i408=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),6*31,5*32,31,32));
		i409=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),7*31,5*32,31,32));
		i460=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),0*31,12*32,31,32));
		i461=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),1*31,12*32,31,32));
		i462=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),2*31,12*32,31,32));
		i463=android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createBitmap(items.getBitmap(),3*31,12*32,31,32));
		print("Done!");
		}
	catch(err){
		print(err);
		}
	}
var lastItem=null;
function modTick(){
	if(Player.getCarriedItem()==460 && bcp!=0){
		HideBackpackButton();
		BackpackButton();
		bcp=0;
		}
	else if(Player.getCarriedItem()==461 && bcp!=1){
		HideBackpackButton();
		BackpackButton();
		bcp=1;
		}
	else if(Player.getCarriedItem()==462 && bcp!=2){
		HideBackpackButton();
		BackpackButton();
		bcp=2;
		}
	else if(Player.getCarriedItem()==463 && bcp!=3){
		HideBackpackButton();
		BackpackButton();
		bcp=3;
		}
	else if(Player.getCarriedItem()!=460 && Player.getCarriedItem()!=461 && Player.getCarriedItem()!=462 && Player.getCarriedItem()!=463)
		HideBackpackButton();
	}
function CreateButton(id,g){
	try{
		var img={
			"1:0":i1,"2:0":i2,"3:0":i3,"4:0":i4,"5:0":i5d0,"5:1":i5d1,"5:2":i5d2,"5:3":i5d3,"5:4":i5d4,"5:5":i5d5,"6:0":i6d0,
			"6:1":i6d1,"6:2":i6d2,"6:3":i6d3,"6:4":i6d4,"6:5":i6d5,"7:0":i7,"8:0":i8,"9:0":i9,"10:0":i10,"11:0":i11,"12:0":i12d0,
			"12:1":i12d1,"13:0":i13,"14:0":i14,"15:0":i15,"16:0":i16,"17:0":i17d0,"17:1":i17d1,"17:2":i17d2,"17:3":i17d3,"18:0":i18d0,
			"18:1":i18d1,"18:2":i18d2,"18:3":i18d3,"19:0":i19,"20:0":i20,"21:0":i21,"22:0":i22,"24:0":i24d0,"24:1":i24d1,"24:2":i24d2,
			"27:0":i27,"30:0":i30,"31:0":i31d0,"31:1":i31d1,"31:2":i31d2,"31:3":i31d3,"32:0":i32,"35:0":i35d0,"35:1":i35d1,"35:2":i35d2,
			"35:3":i35d3,"35:4":i35d4,"35:5":i35d5,"35:6":i35d6,"35:7":i35d7,"35:8":i35d8,"35:9":i35d9,"35:10":i35d10,"35:11":i35d11,
			"35:12":i35d12,"35:13":i35d13,"35:14":i35d14,"35:15":i35d15,"37:0":i37,"38:0":i38d0,"38:1":i38d1,"38:2":i38d2,"38:3":i38d3,
			"38:4":i38d4,"38:5":i38d5,"38:6":i38d6,"38:7":i38d7,"38:8":i38d8,"39:0":i39,"40:0":i40,"41:0":i41,"42:0":i42,"43:0":i43d0,
			"43:1":i43d1,"43:2":i43d2,"43:3":i43d3,"43:4":i43d4,"43:5":i43d5,"43:6":i43d6,"43:7":i43d7,"43:8":i43d8,"43:9":i43d9,"44:0":i44d0,
			"44:1":i44d1,"44:2":i44d2,"44:3":i44d3,"44:4":i44d4,"44:5":i44d5,"44:6":i44d6,"44:7":i44d7,"45:0":i45,"46:0":i46,"47:0":i47,
			"48:0":i48,"49:0":i49,"50:0":i50,"51:0":i51,"52:0":i52,"53:0":i53,"54:0":i54,"56:0":i56,"57:0":i57,"58:0":i58,"60:0":i60,
			"61:0":i61,"62:0":i62,"65:0":i65,"66:0":i66,"67:0":i67,"73:0":i73,"78:0":i78,"79:0":i79,"80:0":i80,"81:0":i81,"82:0":i82,
			"85:0":i85,"86:0":i86,"87:0":i87,"89:0":i89,"91:0":i91,"96:0":i96,"97:0":i97d0,"97:1":i97d1,"97:2":i97d2,"98:0":i98d0,"98:1":i98d1,
			"98:2":i98d2,"98:3":i98d3,"99:0":i99,"100:0":i100,"101:0":i101,"102:0":i102,"103:0":i103,"106:0":i106,"107:0":i107,"108:0":i108,
			"109:0":i109,"110:0":i110,"111:0":i111,"112:0":i112,"114:0":i114,"120:0":i120,"121:0":i121,"127:0":i127,"128:0":i128,"129:0":i129,
			"133:0":i133,"134:0":i134,"135:0":i135,"136:0":i136,"139:0":i139d0,"139:1":i139d1,"141:0":i141,"142:0":i142,"155:0":i155d0,
			"155:1":i155d1,"155:2":i155d2,"155:3":i155d3,"155:4":i155d4,"156:0":i156,"158:0":i158d0,"158:1":i158d1,"158:2":i158d2,"158:3":i158d3,
			"159:0":i159d0,"159:1":i159d1,"159:2":i159d2,"159:3":i159d3,"159:4":i159d4,"159:5":i159d5,"159:6":i159d6,"159:7":i159d7,"159:8":i159d8,
			"159:9":i159d9,"159:10":i159d10,"159:11":i159d11,"159:12":i159d12,"159:13":i159d13,"159:14":i159d14,"159:15":i159d15,"161:0":i161d0,
			"161:1":i161d1,"162:0":i162d0,"162:1":i162d1,"170:0":i170,"171:0":i171d0,"171:1":i171d1,"171:2":i171d2,"171:3":i171d3,"171:4":i171d4,
			"171:5":i171d5,"171:6":i171d6,"171:7":i171d7,"171:8":i171d8,"171:9":i171d9,"171:10":i171d10,"171:11":i171d11,"171:12":i171d12,
			"171:13":i171d13,"171:14":i171d14,"171:15":i171d15,"172:0":i172,"173:0":i173,"175:0":i175d0,"175:1":i175d1,"175:2":i175d2,
			"175:3":i175d3,"175:4":i175d4,"175:5":i175d5,"243:0":i243,"244:0":i244,"245:0":i245,"246:0":i246,"247:0":i247d0,"247:1":i247d1,
			"247:2":i247d2,"248:0":i248,"249:0":i249,"255:0":i255,"256:0":i256,"257:0":i257,"258:0":i258,"259:0":i259,"260:0":i260,"261:0":i261,
			"262:0":i262,"263:0":i263d0,"263:1":i263d1,"264:0":i264,"265:0":i265,"266:0":i266,"267:0":i267,"268:0":i268,"269:0":i269,"270:0":i270,
			"271:0":i271,"272:0":i272,"273:0":i273,"274:0":i274,"275:0":i275,"276:0":i276,"277:0":i277,"278:0":i278,"279:0":i279,"280:0":i280,
			"281:0":i281,"282:0":i282,"283:0":i283,"284:0":i284,"285:0":i285,"286:0":i286,"287:0":i287,"288:0":i288,"289:0":i289,"290:0":i290,
			"291:0":i291,"292:0":i292,"293:0":i293,"294:0":i294,"295:0":i295,"296:0":i296,"297:0":i297,"298:0":i298,"299:0":i299,"300:0":i300,
			"301:0":i301,"302:0":i302,"303:0":i303,"304:0":i304,"305:0":i305,"306:0":i306,"307:0":i307,"308:0":i308,"309:0":i309,"310:0":i310,
			"311:0":i311,"312:0":i312,"313:0":i313,"314:0":i314,"315:0":i315,"316:0":i316,"317:0":i317,"318:0":i318,"319:0":i319,"320:0":i320,
			"321:0":i321,"323:0":i323,"324:0":i324,"325:0":i325d0,"325:1":i325d1,"325:8":i325d8,"325:10":i325d10,"328:0":i328,"329:0":i329,
			"330:0":i330,"331:0":i331,"332:0":i332,"334:0":i334,"336:0":i336,"337:0":i337,"338:0":i338,"339:0":i339,"340:0":i340,"341:0":i341,
			"344:0":i344,"345:0":i345,"347:0":i347,"348:0":i348,"351:0":i351d0,"351:1":i351d1,"351:2":i351d2,"351:3":i351d3,"351:4":i351d4,
			"351:5":i351d5,"351:6":i351d6,"351:7":i351d7,"351:8":i351d8,"351:9":i351d9,"351:10":i351d10,"351:11":i351d11,"351:12":i351d12,
			"351:13":i351d13,"351:14":i351d14,"351:15":i351d15,"352:0":i352,"353:0":i353,"354:0":i354,"355:0":i355,"357:0":i357,"359:0":i359,
			"360:0":i360,"361:0":i361,"362:0":i362,"363:0":i363,"364:0":i364,"365:0":i365,"366:0":i366,"367:0":i367,"383:10":i383d10,
			"383:11":i383d11,"383:12":i383d12,"383:13":i383d13,"383:14":i383d14,"383:15":i383d15,"383:16":i383d16,"383:32":i383d32,
			"383:33":i383d33,"383:34":i383d34,"383:35":i383d35,"383:36":i383d36,"383:37":i383d37,"383:38":i383d38,"383:39":i383d39,"388:0":i388,
			"391:0":i391,"392:0":i392,"393:0":i393,"405:0":i405,"406:0":i406,"407:0":i407,"408:0":i408,"409:0":i409,
			"460:0":i460,"461:0":i461,"462:0":i462,"463:0":i463
			};
		var btn=new android.widget.Button(activity);
		if(id.split(",")[1]!="1")
			btn.setText(id.split(",")[1]);
		else
			btn.setText("");
		btn.setTextSize(display.heightPixels/25);
		if(img[id.split(",")[0]])
			btn.setBackgroundDrawable(img[id.split(",")[0]]);
		else{
			if(img[id.split(",")[0].split(":")[0]+":0"])
				btn.setBackgroundDrawable(img[id.split(",")[0].split(":")[0]+":0"]);
			else
				btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			}
		btn.setScaleX(0.6);
		btn.setScaleY(0.7);
		btn.setOnClickListener(new android.view.View.OnClickListener({
			onClick: function(viewarg){
				if(g==0){ //Inventory to backpack
					if(!BackpackFull(id)){
						for(var i=9;i<45;i++){
							if(Player.getInventorySlot(i)==parseInt(id.split(",")[0].split(":")[0]) && Player.getInventorySlotData(i)==parseInt(id.split(",")[0].split(":")[1])){
								if(Player.getInventorySlotCount(i)>1)
									net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetInventorySlot(i,Player.getInventorySlot(i),Player.getInventorySlotCount(i)-1,Player.getInventorySlotData(i));
								else
									Player.clearInventorySlot(i);
								AddToBackpack(id.split(",")[0]+",1");
								if(backpackWindow!=null){ 
									backpackWindow.dismiss();
									backpackWindow=null;
									}
								if(titleWindow1!=null){ 
									titleWindow1.dismiss();
									titleWindow1=null;
									}
								ShowBackpackGUI();
								break;
								}
							}
						if(parseInt(btn.getText())<=1 || btn.getText()==""){
							if(backpackWindow!=null){ 
								backpackWindow.dismiss();
								backpackWindow=null;
								}
							if(inventoryWindow!=null){ 
								inventoryWindow.dismiss();
								inventoryWindow=null;
								}
							if(titleWindow1!=null){ 
								titleWindow1.dismiss();
								titleWindow1=null;
								}
							if(titleWindow2!=null){ 
								titleWindow2.dismiss();
								titleWindow2=null;
								}
							ShowBackpackGUI();
							ShowInventoryGUI();
							}
						else
							btn.setText(String(parseInt(btn.getText())-1));
						}
					else
						print("Backpack is full");
					}
				if(g==1){ //Backpack to inventory
					if(!InventoryFull(id)){
						Player.addItemInventory(parseInt(id.split(",")[0].split(":")[0]),1,parseInt(id.split(",")[0].split(":")[1]));
						if(parseInt(btn.getText())<=1 || btn.getText()==""){
							RemoveFromBackpack(id);
							if(backpackWindow!=null){ 
								backpackWindow.dismiss();
								backpackWindow=null;
								}
							if(inventoryWindow!=null){ 
								inventoryWindow.dismiss();
								inventoryWindow=null;
								}
							if(titleWindow1!=null){ 
								titleWindow1.dismiss();
								titleWindow1=null;
								}
							if(titleWindow2!=null){ 
								titleWindow2.dismiss();
								titleWindow2=null;
								}
							ShowBackpackGUI();
							ShowInventoryGUI();
							}
						else{
							btn.setText(String(parseInt(btn.getText())-1));
							RemoveFromBackpack(id);
							if(inventoryWindow!=null){ 
								inventoryWindow.dismiss();
								inventoryWindow=null;
								}
							if(titleWindow2!=null){ 
								titleWindow2.dismiss();
								titleWindow2=null;
								}
							ShowInventoryGUI();
							}
						}
					else
						print("Inventory is full");
					}
				}
			}));
		return btn;
		}
	catch(err){
		clientMessage(err);
		}
	}
function BackpackFull(id){
	if(bcp==0){
		if(backpack.length<27)
			return false;
		for(var i=0;i<27;i++){
			if(backpack[i].split(",")[0]==id.split(",")[0] && parseInt(backpack[i].split(",")[1])<64)
				return false;
			}
		return true;
		}
	if(bcp==1){
		if(backpack1.length<27)
			return false;
		for(var i=0;i<27;i++){
			if(backpack1[i].split(",")[0]==id.split(",")[0] && parseInt(backpack1[i].split(",")[1])<64)
				return false;
			}
		return true;
		}
	if(bcp==2){
		if(backpack2.length<27)
			return false;
		for(var i=0;i<27;i++){
			if(backpack2[i].split(",")[0]==id.split(",")[0] && parseInt(backpack2[i].split(",")[1])<64)
				return false;
			}
		return true;
		}
	if(bcp==3){
		if(backpack3.length<27)
			return false;
		for(var i=0;i<27;i++){
			if(backpack3[i].split(",")[0]==id.split(",")[0] && parseInt(backpack3[i].split(",")[1])<64)
				return false;
			}
		return true;
		}
	}
function InventoryFull(id){
	for(var i=9;i<45;i++){
		if((Player.getInventorySlot(i)==parseInt(id.split(",")[0].split(":")[0]) && Player.getInventorySlotData(i)==parseInt(id.split(",")[0].split(":")[1]) && Player.getInventorySlotCount(i)<64) || Player.getInventorySlot(i)==0)
			return false;
		}
	return true;
	}
function AddToBackpack(id){
	if(bcp==0){
		for(var i=0;i<backpack.length;i++){
			if(backpack[i].split(",")[0]==id.split(",")[0] && parseInt(backpack[i].split(",")[1])<64){
				backpack[i]=backpack[i].split(",")[0]+","+String(parseInt(backpack[i].split(",")[1])+parseInt(id.split(",")[1]));
				return;
				}
			}
		backpack.push(id);
		}
	if(bcp==1){
		for(var i=0;i<backpack1.length;i++){
			if(backpack1[i].split(",")[0]==id.split(",")[0] && parseInt(backpack1[i].split(",")[1])<64){
				backpack1[i]=backpack1[i].split(",")[0]+","+String(parseInt(backpack1[i].split(",")[1])+parseInt(id.split(",")[1]));
				return;
				}
			}
		backpack1.push(id);
		}
	if(bcp==2){
		for(var i=0;i<backpack2.length;i++){
			if(backpack2[i].split(",")[0]==id.split(",")[0] && parseInt(backpack2[i].split(",")[1])<64){
				backpack2[i]=backpack2[i].split(",")[0]+","+String(parseInt(backpack2[i].split(",")[1])+parseInt(id.split(",")[1]));
				return;
				}
			}
		backpack2.push(id);
		}
	if(bcp==3){
		for(var i=0;i<backpack3.length;i++){
			if(backpack3[i].split(",")[0]==id.split(",")[0] && parseInt(backpack3[i].split(",")[1])<64){
				backpack3[i]=backpack3[i].split(",")[0]+","+String(parseInt(backpack3[i].split(",")[1])+parseInt(id.split(",")[1]));
				return;
				}
			}
		backpack3.push(id);
		}
	}
function RemoveFromBackpack(id){
	if(bcp==0){
		for(var i=0;i<backpack.length;i++){
			if(backpack[i].split(",")[0]==id.split(",")[0]){
				if(parseInt(backpack[i].split(",")[1])>1)
					backpack[i]=backpack[i].split(",")[0]+","+String(parseInt(backpack[i].split(",")[1])-1);
				else
					backpack.splice(i,1);
				return;
				}
			}
		}
	if(bcp==1){
		for(var i=0;i<backpack1.length;i++){
			if(backpack1[i].split(",")[0]==id.split(",")[0]){
				if(parseInt(backpack1[i].split(",")[1])>1)
					backpack1[i]=backpack1[i].split(",")[0]+","+String(parseInt(backpack1[i].split(",")[1])-1);
				else
					backpack1.splice(i,1);
				return;
				}
			}
		}
	if(bcp==2){
		for(var i=0;i<backpack2.length;i++){
			if(backpack2[i].split(",")[0]==id.split(",")[0]){
				if(parseInt(backpack2[i].split(",")[1])>1)
					backpack2[i]=backpack2[i].split(",")[0]+","+String(parseInt(backpack2[i].split(",")[1])-1);
				else
					backpack2.splice(i,1);
				return;
				}
			}
		}
	if(bcp==3){
		for(var i=0;i<backpack3.length;i++){
			if(backpack3[i].split(",")[0]==id.split(",")[0]){
				if(parseInt(backpack3[i].split(",")[1])>1)
					backpack3[i]=backpack3[i].split(",")[0]+","+String(parseInt(backpack3[i].split(",")[1])-1);
				else
					backpack3.splice(i,1);
				return;
				}
			}
		}
	}
function newLevel(){
	backpack=[];
	backpack1=[];
	backpack2=[];
	backpack3=[];
	Load();
	}
function ShowBackpackGUI(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			try{
				backpackWindow=new android.widget.PopupWindow();
				var backpackLayout=new android.widget.GridLayout(activity);
				titleWindow1=new android.widget.PopupWindow();
				var txt=new android.widget.TextView(activity);
				txt.setText("   Backpack");
				txt.setTextSize(Math.ceil(22*activity.getResources().getDisplayMetrics().density));
				txt.setTextColor(android.graphics.Color.rgb(255,255,255));
				backpackLayout.setColumnCount(parseInt((display.widthPixels/2.5)/Math.ceil(31*activity.getResources().getDisplayMetrics().density))/2);
				var scrollLayout=new android.widget.ScrollView(activity);
				if(bcp==0){
					for(var i=0;i<backpack.length;i++){
						if(backpack[i]!="")
							backpackLayout.addView(CreateButton(backpack[i],1));
						}
					}
				if(bcp==1){
					for(var i=0;i<backpack1.length;i++){
						if(backpack1[i]!="")
							backpackLayout.addView(CreateButton(backpack1[i],1));
						}
					}
				if(bcp==2){
					for(var i=0;i<backpack2.length;i++){
						if(backpack2[i]!="")
							backpackLayout.addView(CreateButton(backpack2[i],1));
						}
					}
				if(bcp==3){
					for(var i=0;i<backpack3.length;i++){
						if(backpack3[i]!="")
							backpackLayout.addView(CreateButton(backpack3[i],1));
						}
					}
				scrollLayout.addView(backpackLayout);
				titleWindow1.setContentView(txt);
				backpackWindow.setContentView(scrollLayout);
				backpackWindow.setWidth(display.widthPixels/2.5);
				backpackWindow.setHeight(display.heightPixels-3*display.heightPixels/10);
				backpackWindow.setBackgroundDrawable(background1);
				backpackWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.LEFT,display.widthPixels/10,2*display.heightPixels/10);
				titleWindow1.setWidth(display.widthPixels/2.5);
				titleWindow1.setHeight(display.heightPixels/10);
				titleWindow1.setBackgroundDrawable(background2);
				titleWindow1.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.LEFT,display.widthPixels/10,display.heightPixels/10);
				}
			catch(err){
				clientMessage(err);
				}
			}
		}));
	}
function ShowInventoryGUI(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			try{
				inventoryWindow=new android.widget.PopupWindow();
				titleWindow2=new android.widget.PopupWindow();
				var txt=new android.widget.TextView(activity);
				txt.setText("   Inventory");
				txt.setTextSize(Math.ceil(22*activity.getResources().getDisplayMetrics().density));
				txt.setTextColor(android.graphics.Color.rgb(255,255,255));
				var inventoryLayout=new android.widget.GridLayout(activity);
				inventoryLayout.setColumnCount(parseInt((display.widthPixels/2.5)/Math.ceil(31*activity.getResources().getDisplayMetrics().density))/2);
				var scrollLayout=new android.widget.ScrollView(activity);
				for(var i=9;i<45;i++){
					if(Player.getInventorySlot(i)!=0)
						inventoryLayout.addView(CreateButton(Player.getInventorySlot(i)+":"+Player.getInventorySlotData(i)+","+Player.getInventorySlotCount(i),0));
					}
				scrollLayout.addView(inventoryLayout);
				titleWindow2.setContentView(txt);
				inventoryWindow.setContentView(scrollLayout);
				inventoryWindow.setWidth(display.widthPixels/2.5);
				inventoryWindow.setHeight(display.heightPixels-3*display.heightPixels/10);
				inventoryWindow.setBackgroundDrawable(background1);
				inventoryWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.RIGHT,display.widthPixels/10,2*display.heightPixels/10);
				titleWindow2.setWidth(display.widthPixels/2.5);
				titleWindow2.setHeight(display.heightPixels/10);
				titleWindow2.setBackgroundDrawable(background2);
				titleWindow2.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.RIGHT,display.widthPixels/10,display.heightPixels/10);
				}
			catch(err){
				clientMessage(err);
				}
			}
		}));
	}
function BackpackButton(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			try{
				if(bntWindow!=null){ 
					bntWindow.dismiss();
					bntWindow=null;
					}
				if(backpackWindow!=null){ 
					backpackWindow.dismiss();
					backpackWindow=null;
					}
				if(inventoryWindow!=null){ 
					inventoryWindow.dismiss();
					inventoryWindow=null;
					}
				if(titleWindow1!=null){ 
					titleWindow1.dismiss();
					titleWindow1=null;
					}
				if(titleWindow2!=null){ 
					titleWindow2.dismiss();
					titleWindow2=null;
					}
				bntWindow=new android.widget.PopupWindow();
				var btnLayout=new android.widget.LinearLayout(activity);
				btnLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
				var btn=new android.widget.Button(activity);
				btn.setText("B");
				btn.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(viewarg){
						Save();
						if(titleWindow1!=null){ 
							titleWindow1.dismiss();
							titleWindow1=null;
							}
						if(titleWindow2!=null){ 
							titleWindow2.dismiss();
							titleWindow2=null;
							}
						if(backpackWindow!=null){ 
							backpackWindow.dismiss();
							backpackWindow=null;
							}
						else
							ShowBackpackGUI();
						if(inventoryWindow!=null){ 
							inventoryWindow.dismiss();
							inventoryWindow=null;
							}
						else
							ShowInventoryGUI();
						}
					}));
				btnLayout.addView(btn);
				bntWindow.setContentView(btnLayout);
				bntWindow.setWidth(Math.ceil(48*activity.getResources().getDisplayMetrics().density));
				bntWindow.setHeight(Math.ceil(48*activity.getResources().getDisplayMetrics().density));
				bntWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				bntWindow.showAtLocation(activity.getWindow().getDecorView(),android.view.Gravity.TOP | android.view.Gravity.LEFT,0,display.heightPixels/10+Math.ceil(48*activity.getResources().getDisplayMetrics().density));
				}
			catch(err){
				clientMessage(err);
				}
			}
		}));
	}
function HideBackpackButton(){
	activity.runOnUiThread(new java.lang.Runnable({
		run: function(){
			if(bntWindow!=null){ 
				bntWindow.dismiss();
				bntWindow=null;
				}
			if(backpackWindow!=null){ 
				backpackWindow.dismiss();
				backpackWindow=null;
				}
			if(inventoryWindow!=null){ 
				inventoryWindow.dismiss();
				inventoryWindow=null;
				}
			if(titleWindow1!=null){ 
				titleWindow1.dismiss();
				titleWindow1=null;
				}
			if(titleWindow2!=null){ 
				titleWindow2.dismiss();
				titleWindow2=null;
				}
			}
		}));
	}
function leaveGame(){
	Save();
	HideBackpackButton();
	}