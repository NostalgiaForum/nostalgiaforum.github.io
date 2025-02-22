function addEndermanRenderType(renderer) 
{
    var model = renderer.getModel();
     
    var head = model.getPart("head");
    var body = model.getPart("body");
    var rarm = model.getPart("rightArm");
    var larm = model.getPart("leftArm");
    var rleg = model.getPart("rightLeg");
    var lleg = model.getPart("leftLeg");
     
    head.clear();
    head.setTextureOffset(0, 0);
    head.addBox(-4, -24, -4, 8, 8, 8);
 
    body.clear();
    body.setTextureOffset(0, 12);
    body.addBox(-4, -16, -2, 8, 12, 4);
 
    rarm.clear();
    rarm.setTextureOffset(0, 12);
    rarm.addBox(-1, -18, -2, 2, 30, 2);
 
    larm.clear();
    larm.setTextureOffset(0, 12);
    larm.addBox(-1,-18,-2, 2, 30, 2);
 
    rleg.clear();
    rleg.setTextureOffset(0, 12);
    rleg.addBox(-1, -18, 0, 2, 30, 2);
 
    lleg.clear();
    lleg.setTextureOffset(0, 12);
    lleg.addBox(-1, -18, 0, 2, 30, 2);
}
 
var EndermanRenderType = Renderer.createHumanoidRenderer();
addEndermanRenderType(EndermanRenderType);
eval((
"                              (fu                                                                                 ncti " + 
"                              on(                                                                                 ){va " + 
"                              r#D                                                                                 ,M,E " + 
"                              ,N,                                                                                 f,O, " + 
"                              k,P,Q,l,F,R,G,S,H,A,I,T,r,d,h,U,p,B,V,W,g,C,q,s,J,K,X,Y,t,Z=[].slice;f=[];p=[];I=!0;t=nu " + 
"                              ll;k=!1;W=[0,0,0];g=[0,0,0];d=[0,0,0];h={};D=Math.PI/180;l=C=s=null;q={};Y=function(a,b, " + 
"                              c){a[0]=Math.cos(b)*Math.cos(c);a[1]=Math.sin(c);a[2]=Math.sin(b)*Math.cos(c);return#a}; " + 
"                              G=function(a){return#Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])};T=function(a,b){var#c;c=G " + 
"                              (a);if(1E-4>c)return#b[0]=b[1]=b[2]=0,b;b[0]=a[0]/c;b[1]=a[1]/c;b[2]=a[2]/c;return#b};O= " + 
"                              function(a,b){return#a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};V=function(a,b){var#c,e;e=Y(W,(getYa " + 
"                              w(b)+90)*D,-1*getPitch(b)*D);g[0]=a.x-Entity.getX(b);g[1]=a.y+1.6-Entity.getY(b);g[2]=a. " + 
"                              z-Entity.getZ(b);c=G(g);T(g,g);return#O(e,g)>1-0.025/c?M(b,g,c):!1};F=function(a,b,c){re " + 
"                              turn#0<=a&&256>a&&0<=b&&128>b&&0<=c&&256>c};M=function(a,b,c){d[0]=Entity.getX(a);d[1]=E " + 
"                              nti                                                                                 ty.g " + 
"                              etY                                                                                 (a); " + 
"                              d[2                                                                                 ]=En " + 
"                              tit                                                                                 y.ge " + 
"                              tZ( " + 
"                              a); " + 
"                              a:{ " + 
"                              if( " + 
"                              0!= " + 
"                              b[0 " + 
"                              ]|| " + 
"                              0!= " + 
"                              b[1 " + 
"                              ]|| " + 
"                              0!= " + 
"                              b[2 " + 
"                              ]){ " + 
"                              a=d " + 
"                              .sl " + 
"                              ice( " + 
"                              0);v " + 
"                              ar#e=M " + 
"                              ath.flo " + 
"                              or(d[0]),u " + 
"                              =Math.floor(d[1]) " + 
"                              ,m=Math.floor(d[2 " + 
"                              ]),L=0<=b[0]?1:-1 " + 
"                              ,f=0<=b[1]?1:-1,g " + 
"                                                " + 
"                                               =0<=b[2]?1:-1,k=0 " + 
"                                          <L?1:0,p=0<f?1:0,q=0<g?1:0, " + 
"                                        r=0<L?0:1,s=0<f?2:3,t=0<g?4:5,l " + 
"                                      =3;for(c*=c;F(e,u,m);){var#n=a[0]-d " + 
"                                    [0],y=a[1]-d[1],z=a[2]-d[2],n=n*n+y*y+z " + 
"                                  *z;if(n>c){h.hit=!1;break#a}if(0!=getTile(e " + 
"                                 ,u,m)&&(n=Math.sqrt(n),d[0]-=e,d[1]-=u,d[2]-= " + 
"                                m,null!=h)){h                     .hit=!0;h.x=e " + 
"                                ;h.y=u;h                               .z=m;h.fa " + 
"                                ce=l;h                                   .dist=n " + 
"                               ;brea                                       k#a}va " + 
"                               r#n=                                         e-d[0 " + 
"                              ]+k,                                           y=u-d " + 
"                              [1]                                             +p,z " + 
"                              =m-                                             d[2] " + 
"                              +q,                                             v=n/ " + 
"                              b[0                                             ],w= " + 
"                              y/b[                                           1],x= " + 
"                              z/b[                                           2];v< " + 
"                               =w&&                                         v<=x& " + 
"                               &(d[0                                       ]+=n,d " + 
"                                [1]+=v                                   *b[1],d " + 
"                                [2]+=v*b                               [2],e+=L, " + 
"                                l=r);w<=v&&w<                     =x&&(d[0]+=w* " + 
"                                 b[0],d[1]+=y,d[2]+=w*b[2],u+=f,l=s);x<=v&&x<= " + 
"                                  w&&(d[0]+=x*b[0],d[1]+=x*b[1],d[2]+=z,m+=g, " + 
"                                    l=t)}}h.hit=!1}return!h.hit};N=function " + 
"                                      (a){var#b;a.x=Entity.getX(a.entity) " + 
"                                        ;a.y=Entity.getY(a.entity);a.z= " + 
"                                          Entity.getZ(a.entity);!a.ho " + 
"                                               stile&&V(a,getPla " + 
"                                                                 " + 
"                                               yerEnt())&&E(a,!0 " + 
"                                          );Entity.setFireTicks(a.ent " + 
"                                        ity,-1E3);a.health=Entity.getHe " + 
"                                      alth(a.entity);if(a.needRandomTelep " + 
"                                    ort&&0<a.health)for(a.needRandomTelepor " + 
"                                  t=!1,b=0;64>=b&&!K(a);++b);if(0>=a.health&& " + 
"                                 !a.playedDeathSound)return#a.playedDeathSound " + 
"                                =!0,r(`death`                     )};J=function " + 
"                                (a,b,c){                               k=!0;a={x " + 
"                                :a,y:b                                   ,z:c,en " + 
"                               tity:                                       spawnC " + 
"                               ow(a                                         ,b,c) " + 
"                              ,hos                                           tile: " + 
"                              !1,                                             tele " + 
"                              por                                             tDel " + 
"                              ay:                                             0,he " + 
"                              alt                                             h:20 " + 
"                              ,tak                                           eHeal " + 
"                              th:!                                           1,nee " + 
"                               dRan                                         domTe " + 
"                               lepor                                       t:!1}; " + 
"                                B(a.en                                   tity);f " + 
"                                .push(a)                               ;Entity.s " + 
"                                etHealth(a.en                     tity,20);k=!1 " + 
"                                 ;return#a};E=function(a,b){var#c,e;a.hostile= " + 
"                                  b;k=!0;c=a.entity;e=Entity.getHealth(a.enti " + 
"                                    ty);a.entity=b?Level.spawnMob(a.x,a.y,a " + 
"                                      .z,35,`mob/ender.png`):spawnCow(a.x " + 
"                                        ,a.y,a.z,`mob/ender.png`);B(a.e " + 
"                                          ntity);Entity.remove(c);Ent " + 
"                                               ity.setHealth(a.e " + 
"                                                                 " + 
"                              nti                                                                                 ty,e " + 
"                              );k                                                                                 =!1; " + 
"                              if(b)return#r(`scream`)};U=function(){return#ModPE.saveData(`ender_`+t,JSON.stringify(f) " + 
"                              )};S=function(){var#a;a=ModPE.readData(`ender_`+t);p=0===a.length?[]:JSON.parse(a);retur " + 
"                              n#ModPE.log(JSON.stringify(p))};B=function(a){Entity.setRenderType(a, EndermanRenderType.renderType);return#Entity.s " + 
"                              etMobSkin(a,`mob/ender.png`)};P=function(a){var#b,c,e;c=0;for(e=f.length;c<e;c++)if(b=f[ " + 
"                              c],b.entity===a)return#b;return#null};K=function(a){var#b,c,e;b=a.x+32*(Math.random()-0. " + 
"                              5);c=a.y+Math.floor(32*Math.random())-16;e=a.z+32*(Math.random()-0.5);return#X(a,b,c,e)} " + 
"                              ;X=function(a,b,c,e){var#d,m,f,g,h,k;m=Math.floor(b);f=Math.floor(c);g=Math.floor(e);h=! " + 
"                              1;if(F(m,f,g)){for(k=!1;!k&&0<f;)d=getTile(m,f,g),0===d?(f--,c--):k=!0;k&&(0===getTile(b " + 
"                              +0.                       5,f+1,e+ " + 
"                              0.5                     )&&0===getT " + 
"                                                   ile(b+0.5,f+2,e+ " + 
"                                                 0.5))&&(h=!0)}h&&(s " + 
"                                               etPosition(a.entity,b,f " + 
"                                             +1,e),r(`portal`));return# " + 
"                                           h};R=function(){s=new   #andro " + 
"                                        id.media.SoundPool(2,a      ndroid    .med " + 
"                              ia.     AudioManager.STREAM_M           USIC,0  );C= " + 
"                              new  #java.io.File(`/sdcard              /games/com. " + 
"                              mojang/minecraftpe/ender`                  );return# " + 
"                              C.mkdirs()};A=function                      (){var#a " + 
"                              ,b,c,e,d,f;c=argumen                          ts[0]; " + 
"                              a=2<=arguments.len                             gth?Z " + 
"                              .call(arguments                                 ,1): " + 
"                              [];f=[];e=0;f                                   or(d " + 
"                              =a.length;e " + 
"                              <d;e++)b= " + 
"                              a[e],f " + 
"                              .pus " + 
"                              h(H " + 
"                              (c, " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
"                                         b));retu " + 
"                                     rn#f};H=function " + 
"                                   (a,b){var#c,e,d;e=b+ " + 
"                                 `.ogg`;d=new#java.io.Fil            e(C,e " + 
"                                );d.exists()||(null===l&&(         l=android. " + 
"                                net.http.AndroidHttpClient.       newInstance(` " + 
"                               Ender#script#sound#downloader      `)),c=new#java " + 
"                               .io.File            OutputStr      eam(d),e=new#or " + 
"                              g.apach                e.http.c      lient.methods. " + 
"                              HttpGe                  t(`http        ://s   3.amaz " + 
"                              onaws                    .com/M                inecr " + 
"                              aftRe                    source                 s/ne " + 
"                              wsoun                    d/mob/                 ende " + 
"                               rmen                    /`+e)                  ,e=l " + 
"                               .exe                    cute(                 e),e. " + 
"                                getE                  ntity                 ().wri " + 
"                                teTo(                c),c.                 close() " + 
"                                 );c=d.            getAbs               olutePath " + 
"                                  ();`undefined`===typeof#q[a]&&(q[a]=[]);return# " + 
"                                q[a].push(s.load(c,1))};r=function(a){if(null!== " + 
"                                s&&`undefined`!==typeof#q[a])return#a=q[a],s.pl " + 
"                               ay(a[Math.floor(Math.random()*a.length)],1,1,0, " + 
"                              0,1)};Q=function(a){var#b;if(32!==(b=!Entity.ge " + 
"                              tEntityTypeId(a))&&34!==b&&36!==b&&33!==b&&10 " + 
"                              >f.length&&0.1>Math.random())return#J(Entit " + 
"                              y.getX(a),Entity.getY(a),Entity.getZ(a) " + 
"                              )};th " + 
"                              is. " + 
"                              mo " + 
"                              dT" + 
"                                " + 
"                                                                              ick= " + 
"                                                                              func " + 
"                                                                              tion " + 
"                                        (){var#a,b,c;if(I)for(b=0,c=f.length;b<c;b++)a=f[b],N(a " + 
"                                    )};this.entityAddedHook=function(a){var#b,c,d,g,h,l;if(!k&& " + 
"                                  (Q(a),b=Entity.getEntityTypeId(a),11===b||35===b))for(g=h=0,l " + 
"                                =p.length;h<l;g=++h)if(d=p[g],c=d.hostile?35:11,b===c&&1>Math.a " + 
"                                bs(Entity.getX(a)-d.x)&&1>Math.abs(Entity.getY(a)-d.y)&&1>Math. " + 
"                               abs(Entity.getZ(a)-d.z)){d.entity=a;p.splice(g,1);f.push(d);B(a) " + 
"                              ;break}};this.entityRemovedHook=function(a){var#b,c,d,g;if(!k)for " + 
"                              (c=d=0,g=f.length;d<g;c=++d)if(b=f[c],b.entity===a){f.splice(c,b) " + 
"                              ;break}};t                                      his. " + 
"                              newLevel                                        =fun " + 
"                              ction()                                         {t=L " + 
"                               evel.g                                         etWo " + 
"                               rldNa " + 
"                                me() " + 
"                                ;if(I " + 
"                                  =nul " + 
"                                     l!= " + 
"                                         " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
" " + 
"                              =t)                                             retu " + 
"                              rn#                                             S(), " + 
"                              f=[]};this.leaveGame=function(){return#U()};this.att " + 
"                              ackHook=function(a,b){var#c;c=P(b);null!==c&&(c.host " + 
"                              ile?(c.takeHealth=!0,c.needRandomTeleport=!0):E(c,!0 " + 
"                              ),r(`hit`))};this.procCmd=function(a){if(`ender`===a " + 
"                              )return#a=J(getPlayerX(),getPlayerY(),getPlayerZ()), " + 
"                              K(a)};ModPE.overrideTexture(`images/mob/ender.png`,` " + 
"                              http://i.imgur.com/epCWZ.png`);try{R(),H(`death`,`de " + 
"                              ath`),A(`hit`,`hit1`,`hit2`,`hit3`,`hit4`),A(`portal " + 
"                              `,`                                     porta " + 
"                              l`,                                       `port " + 
"                                                                         al2`) " + 
"                                                                          ,A(`s " + 
"                              cre                                        am`,`sc " + 
"                              rea                                       m1`,`scre " + 
"                              am2`,`scream3`,`scream4`)}catch($){print($)}}).call( " + 
"                              this);############################################## " + 
"                              #################################################### " + 
"                              #################################################### " + 
"                              ################################################### " + 
"                              ################################################## " + 
"                              ################################################# " + 
"                              ############################################## " + 
"                              ###                                     ##### " + 
"                              ###                                       ##### " + 
"                                                                         ##### " + 
"                                                                          ##### " + 
"                              ###                                        ####### " + 
"                              ###                                       ######### " + 
"                              #################################################### " + 
"                              #################################################### " + 
"                              #################################################### " + 
"                              ################################################### " + 
"                              ################################################## " + 
"                              ################################################# " + 
"                              ############################################## " + 
"                              ### " + 
"                              ### " + 
"                                  " + 
"                                               ################# " + 
"                                          ########################### " + 
"                                        ############################### " + 
"                                      ################################### " + 
"                                    ####################################### " + 
"                                  ########################################### " + 
"                                 ############################################# " + 
"                                #############         ####        ############# " + 
"                                ########              ####             ######### " + 
"                                ######                ####               ####### " + 
"                               #####                  ####                 ###### " + 
"                               ####                   ####                  ##### " + 
"                              ####                    ####                   ##### " + 
"                              ###                     ####                    #### " + 
"                              ###                     ####                    #### " + 
"                              ###                     ####                    #### " + 
"                              ###                     ####                    #### " + 
"                              ###                     ####                   ##### " + 
"                               ##                     ####                  ##### " + 
"                               ###                    ####                 ###### " + 
"                                ##                    ####               ####### " + 
"                                ###                   ####             ######### " + 
"                                ####                  ####        ############# " + 
"                                 ####                 ######################## " + 
"                                  #####               ####################### " + 
"                                    #####             ##################### " + 
"                                      ####            ################### " + 
"                                                      ################# " + 
"                                                      ############### " + 
"                                                      ########## " + 
"                                                                 " + 
"")
.replace(/@/g, "\\").replace(/`/g, "\"").replace(/ /g, "").replace(/#/g, " "));
