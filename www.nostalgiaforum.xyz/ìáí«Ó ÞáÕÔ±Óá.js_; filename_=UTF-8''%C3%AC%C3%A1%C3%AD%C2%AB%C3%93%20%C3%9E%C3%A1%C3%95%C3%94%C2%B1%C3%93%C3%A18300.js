var GUI;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
function newLevel(){

print("By EnderFor");

	ctx.runOnUiThread(new java.lang.Runnable(){
		run: function(){

			try{

				GUI = new android.widget.PopupWindow();
				var layout = new android.widget.LinearLayout(ctx);
				var btn = new android.widget.Button(ctx);
				btn.setText("TAP");
				layout.setOrientation(android.widget.LinearLayout.VERTICAL);
				layout.setGravity(android.view.Gravity.RIGHT);
				layout.addView(btn);
				GUI.setContentView(layout);
				GUI.setHeight(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				GUI.setWidth(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
				GUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);
				btn.setOnClickListener(new android.view.View.OnClickListener(){
       

					onClick: function(view){
					
				           addItemInventory(278,1);
addItemInventory(267,1);
addItemInventory(364,64);
addItemInventory(50,64);
addItemInventory(58,1);
addItemInventory(61,1);
addItemInventory(306,1);
addItemInventory(307,1);
addItemInventory(308,1);
addItemInventory(309,1);
clientMessage(ChatColor.BLUE + "Набор получен !");
					}
				});
			} catch (e){

				print ("By EnderFor"+ e)
			}
		}});
}

function leaveGame(){

	ctx.runOnUiThread(new java.lang.Runnable(){

		run: function(){

			if(GUI != null){

				GUI.dismiss();
print("By EnderFor");
			}
		}
	});
}