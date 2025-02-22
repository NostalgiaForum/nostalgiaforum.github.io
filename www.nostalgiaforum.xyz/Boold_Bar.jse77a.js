//Blood Bar TBPM (R) 2014
var ctx=null
var simpleGUI=null
var text1,text2,bar
var name,full,time,E

var MOB=[
new Mob(10,"Chiken","4"),
new Mob(11,"Cow", "10"),
new Mob(12,"Pig","10"),
new Mob(13,"Sheep","8"),
new Mob(32,"Zombie","20"),
new Mob(33,"Creeper","20"),
new Mob(34,"Skeleton","20"),
new Mob(35,"Spider","20"),
new Mob(36,"Zombie Pig Man","20")
//(65,"TNT","-"),
//(83,"Pic","-"),
//(84,"Minecar","-")
]

function Mob(id,name,full)
{
    this.id=id
    this.name=name
    this.full=full
}

function findMob(type)
{
    name="", full=""
    for(i in MOB)
    {
        if(type==MOB[i].id)
        {
            name=MOB[i].name
            full=MOB[i].full
            break
        }
    }
}

function attackHook(a,e)
{
    findMob(Entity.getEntityTypeId(e))
    if(name!="")
    {
        time=201
        E=e
        check=true
    }
}

function modTick()
{
    if(time>0)
    {
        time--
        if(time%20==0)
        {
            if(check)
            {
                health=Entity.getHealth(E)
                if(health<=0)
                {
                    health=0
                    time=60
                    check=false
                }
            }
            ctx.runOnUiThread(new java.lang.Runnable({run:function(){try
            {
                bar.setVisibility(1)
                if(!isNaN(full)) bar.setMax(full)
                else bar.setMax(1)
                bar.setProgress(health)
                text1.setText(name)
                text2.setText(health+"/"+full)
            }
catch(err){printErr(err)
}}}))
        }
    }
    if(time==0)
    {
        time--
        ctx.runOnUiThread(new java.lang.Runnable({run: function() {try
        {
            bar.setVisibility(5)
            text1.setText("")
            text2.setText("")
        }
catch(err){printErr(err)
}}}))
    }
}

function newLevel()
{
    ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
    var dp=ctx.getResources().getDisplayMetrics().density
    showLogo(ctx,dp)
ctx.runOnUiThread(new java.lang.Runnable({run:function(){try
    {
        simpleGUI=new android.widget.PopupWindow(ctx)
        var layout=new android.widget.LinearLayout(ctx)
        var Layout=new android.widget.LinearLayout(ctx)

        text1=new android.widget.TextView(ctx);
        text2=new android.widget.TextView(ctx)
        text1.setTextSize(15)
        text2.setTextSize(15)
        text1.getPaint().setFakeBoldText(true)
        text2.getPaint().setFakeBoldText(true)
        text1.setTextColor(android.graphics.Color.CYAN)
        text2.setTextColor(android.graphics.Color.WHITE)
        text1.setShadowLayer(2,0,0,android.graphics.Color.BLACK)
        text2.setShadowLayer(2,0,0,android.graphics.Color.BLACK)

        bar=new android.widget.ProgressBar(ctx,null,android.R.attr.progressBarStyleHorizontal)
        bar.setLayoutParams(new android.widget.LinearLayout.LayoutParams(80*dp,-2))
        bar.setVisibility(5)

        var params=new android.widget.LinearLayout.LayoutParams(-2,-2)
        params.setMargins(20*dp,0,0,0)
        Layout.addView(text1)
        Layout.addView(text2,params)
        layout.setOrientation(1)
        layout.addView(bar)
        layout.addView(Layout)
           
        simpleGUI.setContentView(layout);
        simpleGUI.setWidth(130*dp);
        simpleGUI.setHeight(50*dp);
        simpleGUI.setBackgroundDrawable(null)
        simpleGUI.setTouchable(false)
        simpleGUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP,0,60*dp);
    }catch(err){printErr(err)}}}));
}

function leaveGame()
{
    ctx.runOnUiThread(new java.lang.Runnable({run:function()
    {
        if(simpleGUI != null) simpleGUI.dismiss();
    }
}));
}

function printErr(err)
{
    var Err="Err!TBPM"
    print(Err)
    print(err)
    clientMessage(Err)
    clientMessage(err)
}

function showLogo(m,dp)
{
var logot = " iVBORw0KGgoAAAANSUhEUgAAAH0AAAAxCAYAAAD3GqYyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAF0SURBVHhe7dxBTsJAGIbhvy4aQmJP4Za18Qiy4xKw1KN0C+EO7noF0zN4CxcuCAlO7a9orJaGOlje70km0Abo4s0AMyQkuzLbmaBc+K2AKDqQogMpOpCiAyk6kKIDKTpQ582ZxfWzrfx+n+Z5Zsub6t42XOMFdI3UinJkt370s60l4fXaFGXW+lqa6UCKDqToQIp+chubhu9JiY/Fo58O3s/Vo/3z/FCKDqToQIoO1Dn6MqwDw9r++8hTf8QvZuPm54ZRr227qNa39XOLmZ/qXYxrfLW633+O/xXNdCBFB1J0oAFH369vpw9+qncxrhGfZjqQogMBoqdHLAvPk2Y6ECD65mOz4/OPGWSa6SdX7fpdWj7xwyaTkT2VYz84nqIDDTh63L33Q8cQvixqpgMp+r+Q2N26+Z3jbaxTu/JH9kHRgQYc/Tz3xWPQTAdSdCBFB1J0IEUHUnQgRQfSnwcCaaYDKTqQogMpOpCiAyk6kKLjmL0CjmiT2hlx/ckAAAAASUVORK5CYII= ";
var logoalpha=1;
var malpha=0.02;
var is2_3=false;
m.runOnUiThread(new java.lang.Runnable(
{run:function(){try
{
var fill=new android.widget.LinearLayout.LayoutParams(-1,-1,1);
var logoll=new android.widget.LinearLayout(m);
logoll.setOrientation(1);
logotext=new android.widget.TextView(m);
logotext.setText("TBPM");
logotext.setTextColor(android.graphics.Color.YELLOW);
logotext.setShadowLayer(2,0,0,android.graphics.Color.BLACK);
logotext.setGravity(17);
logoimg = new android.widget.ImageView(m);
logoimg.setScaleType(android.widget.ImageView.ScaleType.CENTER_CROP);
logoimg.setLayoutParams(fill);
var img=android.util.Base64.decode(logot,0);
logoimg.setImageBitmap(android.graphics.BitmapFactory.decodeByteArray(img,0,img.length));
logoll.addView(logoimg);
logoll.addView(logotext);
var logo=new android.widget.PopupWindow(logoll,60*dp,60*dp);
logo.setTouchable(false);
logo.showAtLocation(m.getWindow().getDecorView(),android.view.Gravity.RIGHT | android.view.Gravity.TOP, 5, 5);

new android.os.Handler().postDelayed(new java.lang.Runnable({run:function()
{
logogo(logo,logoalpha,malpha,is2_3);
}
}),1500);
}
catch(err){print("Err.logo")}
}}));
}
function logogo(logo,logoalpha,malpha,is2_3)
{
new android.os.Handler().postDelayed(new java.lang.Runnable({run:function() 
{
if(logoalpha>=0)
{
logoimg.setAlpha(logoalpha);
try
{
logotext.setAlpha(logoalpha);
}
catch(err)
{
if(!is2_3)
{
is2_3=true;
logoalpha=255;
malpha=5;
logotext.setText("");
}
}
logoalpha-=malpha;
logogo(logo,logoalpha,malpha,is2_3);
}
else
{
logo.dismiss();
logo=null;
}
}
}),50);
}