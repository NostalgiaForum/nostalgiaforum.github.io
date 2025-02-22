var zoom = false

function newLevel()
{
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(); 
ctx.runOnUiThread(new java.lang.Runnable(){
 
run: function(){
 
try{
GUIButton = new android.widget.PopupWindow();
var layoutButton = new android.widget.LinearLayout(ctx);
layoutButton.setOrientation(android.widget.LinearLayout.VERTICAL);
GUIButton.setContentView(layoutButton);
GUIButton.setWidth(100);
GUIButton.setHeight(100);
var btnButton = new android.widget.Button(ctx);
layoutButton.addView(btnButton);
btnButton.setText("Z");
btnButton.setOnClickListener(new android.view.View.OnClickListener({ 
onClick: function(viewarg)
{
if(zoom==false)
{
ModPE.setFov(20);
zoom = true;
}
else if(zoom==true)
{
ModPE.setFov(70);
zoom = false;
}
}
}));
GUIButton.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 10, 10);
}
catch(e)
{
print("Failed on Zooming!");
}
}
})
}