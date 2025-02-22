/*
Too Many Items by
Sanya
*/

var btnWindow = null;
var mainMenu = null;
var btnMenu = null;
var btnMenuSub = null;
var subMenu = null;
var infoMenu = null;

var addToInventory = false;
var addId;
var addDmg;
var addCount;
var ride = false;
var riding = true;
var ridingAnimal;
var spawnOnTap = -1;

function dip2px(ctx, dips){
 return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel(){
        // run all the stuff at UI thread
        
        var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
        ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
                try{
                        var layout = new android.widget.RelativeLayout(ctx);
                        var button = new android.widget.Button(ctx);
                        button.setText("¤");
                        //button.setWidth(100);
                        //button.setHeight(100);
                        button.setOnClickListener(new android.view.View.OnClickListener({
                                onClick: function(viewarg) {
                                 spawnOnTap = -1;
                                        openMenu();
clientMessage((ChatColor.BLUE+"Sanya Ageev by toomanyitems 0.9.4"));
                                }
                        }));
                        layout.addView(button);
                        
                        
                        btnWindow = new android.widget.PopupWindow(layout, dip2px(ctx, 48), dip2px(ctx, 48));
                //        btnWindow.setContentView(layout);
                //        btnWindow.setWidth(dip2px(ctx, 48));
                //        btnWindow.setHeight(dip2px(ctx, 48));
                        btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                        var flags;
                        var bx = 0;
                        var by = 0;
                        var btnPosC = ModPE.readData("btnPos");
                        if(btnPosC == "0"){
                flags = android.view.Gravity.TOP | android.view.Gravity.LEFT;
                by = dip2px(ctx, 20);
                        }else if(btnPosC == "1"){
                flags = android.view.Gravity.TOP | android.view.Gravity.RIGHT;
                bx = dip2px(ctx, 38);
                
                btnWindow.setWidth(dip2px(ctx, 38));
                         btnWindow.setHeight(dip2px(ctx, 38));
                        }else if(btnPosC == "2"){
                flags = android.view.Gravity.LEFT | android.view.Gravity.BOTTOM;
                        }else if(btnPosC == "3" || btnPosC == ""){
                flags = android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM;
                        }
                        btnWindow.showAtLocation(ctx.getWindow().getDecorView(), flags, bx, by);
                }catch(err){
                        print("Ошибка.");
                }
        } }));
  
}

function compareMobs(mob1, mob2){
    if(mob1 == null || mob2 == null) return false;
    
    if(Entity.getX(mob1) == Entity.getX(mob2) &&
        Entity.getY(mob1) == Entity.getY(mob2) &&
        Entity.getZ(mob1) == Entity.getZ(mob2) &&
        Entity.getEntityTypeId(mob1) == Entity.getEntityTypeId(mob2))
        return true;
        
    return false;
}

function attackHook(attacker, entity){
    if(riding && compareMobs(entity, ridingAnimal)) { rideAnimal(attacker, entity); riding = true; preventDefault(); }
    else if(ride){ rideAnimal(attacker, entity); riding = true; ridingAnimal = entity; clientMessage("Для остановки тапните опять."); ride = false; preventDefault(); }
}

function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage){
    if(spawnOnTap != -1){
        Level.spawnMob(x-(side==4?1:0)+(side==5?1:0)+0.5,y-(side==0?1:0)+(side==1?1:0)+0.5,z-(side==2?1:0)+(side==3?1:0)+0.5,spawnOnTap,null);
        preventDefault();
    }
}

var CAT_STARTER_KIT = 0;
var CAT_STARTER_KIT_ITEMS = [
  {name: "Алмазный шлем", id: 310, data: 0},
  {name: "Алмазный нагрудник", id: 311, data: 0},
  {name: "Алмазные штаны", id: 312, data: 0},
  {name: "Алмазные ботинки", id: 313, data: 0},
  {name: "Алмазный меч", id: 276, data: 0},
  {name: "Алмазная лопата", id: 277, data: 0},
  {name: "Алмазная кирка", id: 278, data: 0},
  {name: "Алмазная мотыга", id: 293, data: 0},
  {name: "Алмазный топор", id: 279, data: 0},
  {name: "Верстак", id: 58, data: 0},
  {name: "Кровать", id: 355, data: 0},
  {name: "Факел", id: 50, data: 0},
  {name: "Дубовые доски", id: 5, data: 0}];
var CAT_BUILDING = 1;
var CAT_BUILDING_ITEMS = [
  {name: "Камень", id: 1, data: 0},
  {name: "Трава", id: 2, data: 0},
  {name: "Земля", id: 3, data: 0},
  {name: "Мицелий", id: 110, data: 0},
  {name: "Булыжник", id: 4, data: 0},
  {name: "Дубовые доски", id: 5, data: 0},
  {name: "Еловые доски", id: 5, data: 1},
  {name: "Берёзовые доски", id: 5, data: 2},
  {name: "Доски джунглевого дерева", id: 5, data: 3},
  {name: "Доски акации", id: 5, data: 4},
  {name: "Доски тёмного дуба", id: 5, data: 5},
  {name: "Бедрок", id: 7, data: 0},
  {name: "Песок", id: 12, data: 0},
  {name: "Гравий", id: 13, data: 0},
  {name: "Дерево дуб", id: 17, data: 0},
  {name: "Дерево ель", id: 17, data: 1},
  {name: "Дерево берёза", id: 17, data: 2},
  {name: "Джунглевое дерево", id: 17, data: 3},
  {name: "Дерево акации", id: 162, data: 0},
  {name: "Дерево тёмного дуба", id: 162, data: 1},
  {name: "Стекло", id: 20, data: 0},
  {name: "Лазуритовый блок", id: 22, data: 0},
  {name: "Песчаник", id: 24, data: 0},
  {name: "Резной песчаник", id: 24, data: 1},
  {name: "Гладкий песчаник", id: 24, data: 2},
  {name: "Белая шерсть", id: 35, data: 0},
  {name: "Оранжевая шерсть", id: 35, data: 1},
  {name: "Пурпурный вул", id: 35, data: 2},
  {name: "Голубая шерсть", id: 35, data: 3},
  {name: "Желтая шерсть", id: 35, data: 4},
  {name: "Лаймово-зеленая шерсть", id: 35, data: 5},
  {name: "Розовая шерсть", id: 35, data: 6},
  {name: "Серая шерсть", id: 35, data: 7},
  {name: "Светло-серая шерсть ", id: 35, data: 8},
  {name: "Бирюзовая шерсть", id: 35, data: 9},
  {name: "Фиолетовая шерсть", id: 35, data: 10},
  {name: "Синяя шерсть", id: 35, data: 11},
  {name: "Коричневая шерсть", id: 35, data: 12},
  {name: "Зелёная шерсть", id: 35, data: 13},
  {name: "Красная шерсть", id: 35, data: 14},
  {name: "Черная шерсть", id: 35, data: 15},
  {name: "Губка", id: 19, data: 0},
  {name: "Светильник Джека", id: 91, data: 0},
  {name: "Коврик", id: 171, data: 0},
  {name: "Алмазный блок", id: 57, data: 0},
  {name: "Изумрудный блок", id: 133, data: 0},
  {name: "Золотой блок", id: 41, data: 0},
  {name: "Железный блок", id: 42, data: 0},
  {name: "Угольный блок", id: 173, data: 0},
  {name: "Двойной блок(обоженный камень)", id: 43, data: 0},
  {name: "Двойной блок(песчаник)", id: 43, data: 1},
  {name: "Двойной полублок(деревянный)", id: 43, data: 2},
  {name: "Двойной полублок(камень)", id: 43, data: 3},
  {name: "Двойной полублок(кирпич)", id: 43, data: 4},
  {name: "Полублок(обоженный камень)", id: 44, data: 0},
  {name: "Полублок(песчаник)", id: 44, data: 1},
//Wooden Slab (44:2)
  {name: "Деревянная плита", id: 158, data: 0},
  {name: "Полублок(каменный)", id: 44, data: 3},
  {name: "Полублок(кирпич)", id: 44, data: 4},
  {name: "Плита из каменных кирпичей", id: 44, data: 5},
//Stone Slab (44:6)
  {name: "Кварцевая плита", id: 44, data: 7},
  {name: "Кирпичный блок", id: 45, data: 0},
  {name: "Блок адских кирпичей", id: 112, data: 0},
  {name: "Плесневелый камень", id: 48, data: 0},
  {name: "Обсидиан", id: 49, data: 0},
  {name: "Деревянная лестница", id: 53, data: 0},
  {name: "Каменная лестница", id: 67, data: 0},
  {name: "Кирпичная лестница", id: 108, data: 0},
  {name: "Каменные ступеньки", id: 109, data: 0},
  {name: "Адские ступеньки", id: 114, data: 0},
  {name: "Песчаные ступеньки", id: 128, data: 0},
  {name: "Кварцевые ступеньки", id: 156, data: 0},
  {name: "Глинянный блок", id: 82, data: 0},
  {name: "Светло-розовая обожанная глина", id: 159, data: 0},
  {name: "Оранжевая обожонная глина", id: 159, data: 1},
  {name: "Розовая обожонная глина", id: 159, data: 2},
  {name: "Голубая обожонная глина", id: 159, data: 3},
  {name: "Жёлтая обожонная глина", id: 159, data: 4},
  {name: "Зелёная обожонная глина", id: 159, data: 5},
  {name: "Малиновая обожонная глина", id: 159, data: 6},
  {name: "Тёмно-коричневая обожонная глина", id: 159, data: 7},
  {name: "Бело-оранжевая обожонная глина", id: 159, data: 8},
  {name: "Серая обожонная глина", id: 159, data: 9},
  {name: "Тёмно-розовая обожонная глина", id: 159, data: 10},
  {name: "Фиолетовая обожонная глина", id: 159, data: 11},
  {name: "Коричневая обожонная глина", id: 159, data: 12},
  {name: "Тёмно-зелёная обожонная глина", id: 159, data: 13},
  {name: "Красная обожонная глина", id: 159, data: 14},
  {name: "Чёрная обожонная глина", id: 159, data: 15},
  {name: "Забор", id: 85, data: 0},
  {name: "Ворота", id: 107, data: 0},
  {name: "Каменный забор", id: 139, data: 0},
  {name: "Замшелый каменный забор", id: 139, data: 1},
  {name: "Адский камень", id: 87, data: 0},
  {name: "Нивидемый бедрок", id: 95, data: 0},
  {name: "Каменные кирпичи", id: 98, data: 0},
  {name: "Замшелые каменные кирпичи(блок)", id: 98, data: 1},
  {name: "Резные каменные кирпичи", id: 98, data: 3},
  {name: "Потресканные каменные кирпичи(блок)", id: 98, data: 2},
  {name: "Стекляная панель", id: 102, data: 0}];
var CAT_DECORATION = 2;
var CAT_DECORATION_ITEMS = [
  {name: "Лиана", id: 106, data: 0},
  {name: "Ендер портал", id: 120, data: 0},
  {name: "Ендер блок", id: 121, data: 0},
  {name: "Желтый цветок", id: 37, data: 0},
  {name: "Голубой цветок", id: 38, data: 0},
  {name: "Растение бубенцы", id: 38,
data: 1},
 {name: "Фиолетовое растение ", id: 38, data: 2},
 {name: "Белое растение", id: 38,
data: 3},
 {name: "Красный тюльпан", id: 38, data: 4},
 {name: "Оранжевый тюльпан", id: 38, data: 5},
 {name: "Белый тюльпан", id: 38, data: 6},
 {name: "Фиолетовый тюльпан", id: 38, data: 7},
 {name: "Ромашка", id: 38, data: 8},
  {name: "трава", id: 31, data: 1},
  {name: "сухой саженец",  id: 32, data: 0},
  {name: "Маленькое растение", id: 31, data: 2},
  {name: "Кувшинка", id: 111, data: 0},
  {name: "Саженец дуба", id: 6, data: 0},
  {name: "Саженец ели", id: 6, data: 1},
  {name: "Саженец берёзы", id: 6, data: 2},
  {name: "Саженец джунглевого дерева", id: 6, data: 3},
  {name: "Саженец акации", id: 6, data: 4},
  {name: "Саженец тёмного дуба", id: 6, data: 5},
  {name: "Книжная полка", id: 47, data: 0},
  {name: "Снег", id: 78, data: 0},
  {name: "Лёд", id: 79, data: 0},
  {name: "Снежный блок", id: 80, data: 0},
  {name: "Кактус", id: 81, data: 0},
  {name: "Сноп сена", id: 170, data: 0},
  {name: "Тростник", id: 338, data: 0},
//Сахарный тростник (83)
  {name: "Светящийся камень", id: 89, data: 0},
// торт (92)
  {name: "Кварцовый блок", id: 155, data: 0},
  {name: "Резной блок кварца ", id: 155, data: 1},
  {name: "ультра блок(new)", id: 255, data: 0},
  {name: "Кварцевые колонны", id: 155, data: 2},
  {name: "Светящийся обсидиан", id: 246, data: 0},
// grass_carried (253)
// leaves_carried (254)
// info_reserved6 (255)
  {name: "Картина", id: 321, data: 0},
  {name: "Спавнер", id: 52, data: 0}];
var CAT_ARMOUR = 3;
var CAT_ARMOUR_ITEMS = [
  {name: "Алмазный шлем", id: 310, data: 0},
  {name: "Алмазная туника", id: 311, data: 0},
  {name: "Алмазные штаны", id: 312, data: 0},
  {name: "Алмазные ботинки", id: 313, data: 0},
  {name: "Золотой шлем", id: 314, data: 0},
  {name: "Золотая туника", id: 315, data: 0},
  {name: "Золотые штаны", id: 316, data: 0},
  {name: "Золотые ботинки", id: 317, data: 0},
  {name: "Железный шлем", id: 306, data: 0},
  {name: "Железная туника", id: 307, data: 0},
  {name: "Железные штаны", id: 308, data: 0},
  {name: "Железные ботинки", id: 309, data: 0},
  {name: "Кольчужный шлем", id: 302, data: 0},
  {name: "Кольчужная туника", id: 303, data: 0},
  {name: "Кольчужные штаны", id: 304, data: 0},
  {name: "Кольчужные ботинки", id: 305, data: 0},
  {name: "Кожаный шлем", id: 298, data: 0},
  {name: "Кожаная туника", id: 299, data: 0},
  {name: "Кожаные штаны", id: 300, data: 0},
  {name: "Кожаные ботинки", id: 301, data: 0}];
var CAT_TOOLS = 4;
var CAT_TOOLS_ITEMS = [
  {name: "Зажигалка", id: 259, data: 0},
  {name: "Лук", id: 261, data: 0},
  {name: "Стрела", id: 262, data: 0},
  {name: "Ножницы", id: 359, data: 0},
  {name: "Алмазный меч", id: 276, data: 0},
  {name: "Алмазная лопата", id: 277, data: 0},
  {name: "Алмазная кирка", id: 278, data: 0},
  {name: "Алмазная мотыга", id: 293, data: 0},
  {name: "Алмазный топор", id: 279, data: 0},
  {name: "Золотой меч", id: 283, data: 0},
  {name: "Золотая лопата", id: 284, data: 0},
  {name: "Золотая кирка", id: 285, data: 0},
  {name: "Золотая мотыга", id: 294, data: 0},
  {name: "Золотой топор", id: 286, data: 0},
  {name: "Железный меч", id: 267, data: 0},
  {name: "Железная лопата", id: 256, data: 0},
  {name: "Железная кирка", id: 257, data: 0},
  {name: "Железная мотыга", id: 292, data: 0},
  {name: "Железный топор", id: 258, data: 0},
  {name: "Каменный меч", id: 272, data: 0},
  {name: "Каменная лопата", id: 273, data: 0},
  {name: "Каменная кирка", id: 274, data: 0},
  {name: "Каменная мотыга", id: 291, data: 0},
  {name: "Каменный топор", id: 275, data: 0},
  {name: "Деревянный меч", id: 268, data: 0},
  {name: "Деревянная лопата", id: 269, data: 0},
  {name: "Деревянная кирка", id: 270, data: 0},
  {name: "Деревянная мотыга", id: 290, data: 0},
  {name: "Деревянный топор", id: 271, data: 0}];
var CAT_FOOD = 5;
var CAT_FOOD_ITEMS = [
  {name: "Яблоко", id: 260, data: 0},
  {name: "Арбуз", id: 360, data: 0},
  {name: "Печенье", id: 357, data: 0},
  {name: "Морковь", id: 391, data: 0},
  {name: "Свекла", id: 457, data: 0},
  {name: "Картофель", id: 392, data: 0},
  {name: "Печеный картофель", id: 393, data: 0},
  {name: "Коричневый гриб", id: 39, data: 0},
  {name: "Мухамор", id: 40, data: 0},
  {name: "Грибной суп", id: 282, data: 0},
  {name: "Свекольный суп", id: 459, data: 0},
  {name: "Тыквенный пирог", id: 400, data: 0},
  {name: "Свинина", id: 319, data: 0},
  {name: "Жареная свинина", id: 320, data: 0},
  {name: "Сырая говядина", id: 363, data: 0},
  {name: "Стейк", id: 364, data: 0},
  {name: "Курица", id: 365, data: 0},
  {name: "Жареная курица", id: 366, data: 0},
  {name: "Какао бобы", id: 127, data: 0},
  {name: "Торт", id: 354, data: 0}];
var CAT_DYES = 6;
var CAT_DYES_ITEMS = [
  {name: "Чернила", id: 351, data: 0},
  {name: "Красная краска", id: 351, data: 1},
  {name: "Зеленая краска", id: 351, data: 2},
  {name: "Какао бобы", id: 351, data: 3},
  {name: "Лазурит(краска)", id: 351, data: 4},
  {name: "Фиолетовая краска", id: 351, data: 5},
  {name: "Бирюзовая краска", id: 351, data: 6},
  {name: "Светло-серая краска ", id: 351, data: 7},
  {name: "Серая краска", id: 351, data: 8},
  {name: "Розовая краска", id: 351, data: 9},
  {name: "Лаймовая краска", id: 351, data: 10},
  {name: "Желтая краска", id: 351, data: 11},
  {name: "Голубая краска", id: 351, data: 12},
  {name: "Фиолетовая краска", id: 351, data: 13},
  {name: "Оранжевая краска", id: 351, data: 14},
  {name: "Костная мука", id: 351, data: 15}];
var CAT_ITEMS = 7;
var CAT_ITEMS_ITEMS = [
  {name: "Алмазная руда", id: 56, data: 0},
  {name: "Золотая руда", id: 14, data: 0},
  {name: "Железная руда", id: 15, data: 0},
  {name: "Угольная руда", id: 16, data: 0},
  {name: "Калитка", id: 101, data: 0},
  {name: "Лазуритная руда", id: 21, data: 0},
  {name: "Редстоун(руда)", id: 73, data: 0},
  {name: "Емеральдовая руда", id: 129, data: 0},
// Glowing Redstone Ore (74)
  {name: "Алмаз", id: 264, data: 0},
  {name: "Железный слиток", id: 265, data: 0},
  {name: "Золотой слиток", id: 266, data: 0},
  {name: "Емеральд", id: 397, data: 0},
  {name: "Палка", id: 280, data: 0},
  {name: "Кремень", id: 318, data: 0},
  {name: "Тарелка", id: 281, data: 0},
  {name: "Кость", id: 352, data: 0},
  {name: "Нить", id: 287, data: 0},
  {name: "Кожа", id: 334, data: 0},
  {name: "Перо", id: 288, data: 0},
  {name: "Сахар", id: 353, data: 0},
  {name: "Порох", id: 289, data: 0},
  {name: "Пшеница", id: 296, data: 0},
  {name: "Хлеб", id: 297, data: 0},
  {name: "Седло", id: 329, data: 0},
  {name: "Снежок", id: 332, data: 0},
  {name: "Шарик слизи", id: 341, data: 0},
  {name: "Яйцо", id: 344, data: 0},
  {name: "Глина", id: 337, data: 0},
  {name: "Кирпич", id: 336, data: 0},
  {name: "Адские кирпичи", id: 405, data: 0},
  {name: "Кварц", id: 406, data: 0},
  {name: "Бумага", id: 339, data: 0},
  {name: "Книга", id: 340, data: 0},
  {name: "Компас", id: 345, data: 0},
  {name: "Рельсы", id: 66, data: 0},
  {name: "Энергорельсы", id: 27, data: 0},
  {name: "Вагонетка", id: 328, data: 0},
  {name: "Часы", id: 347, data: 0},
  {name: "Красная пыль", id: 331, data: 0},
  {name: "Светопыль", id: 348, data: 0}];
var CAT_SPAWN = 8;
var CAT_SPAWN_ITEMS = [
  {name: "Яйцо спавна(курица)", id: 383, data: 10},
  {name: "Яйцо спавна(корова)", id: 383, data: 11},
  {name: "Яйцо спавна(свинья)", id: 383, data: 12},
  {name: "Яйцо спавна(овца)", id: 383, data: 13},
  {name: "Яйцо спавна (собака)", id: 383, data: 14},
  {name: "Яйцо спавна (житель)", id: 383, data: 15},
  {name: "Яйцо спавна (зомби)", id: 383, data: 32},
  {name: "Яйцо спавна (крипер)", id: 383, data: 33},
  {name: "Яйцо спавна (скелет)", id: 383, data: 34},
  {name: "Яйцо спавна (паук)", id: 383, data: 35},
  {name: "Яйцо спавна (свинозомби)", id: 383, data: 36},
  {name: "Яйцо спавна (слизнь)", id: 383, data: 37},
  {name: "Яйцо спавна (ендермен)", id: 383, data: 38},
  {name: "Яйцо спавна (чешуйница)", id: 383, data: 39},
  {name: "Яйцо спавна (грибная  корова)", id: 383, data: 16}];
var CAT_MISCELLANEOUS = 9;
var CAT_MISCELLANEOUS_ITEMS = [
  {name: "Верстак", id: 58, data: 0},
  {name: "Печь", id: 61, data: 0},
  {name: "Светящаяся печь(new)", id: 62, data: 0},
  {name: "Резак", id: 245, data: 0},
  {name: "Сундук", id: 54, data: 0},
  {name: "Факел", id: 50, data: 0},
  {name: "Лестница", id: 65, data: 0},
  {name: "Деревянная дверь", id: 324, data: 0},
  {name: "Железная дверь", id: 330, data: 0},
  {name: "Люк", id: 96, data: 0},
  {name: "Табличка", id: 323, data: 0},
  {name: "Кровать", id: 355, data: 0},
  {name: "Уголь", id: 263, data: 0},
  {name: "Древесный уголь", id: 263, data: 1},
  {name: "Саженец арбуза", id: 105, data: 0},
  {name: "Семена", id: 295, data: 0},
  {name: "Семена арбуза", id: 362, data: 0},
  {name: "Семена тыквы", id: 361, data: 0},
  {name: "Семена свеклы", id: 458, data: 0},
  {name: "Ведро", id: 325, data: 0},
  {name: "Ведро молока", id: 325, data: 1},
  {name: "Ведро воды", id: 325, data: 8},
// Water (8)
  {name: "Вода", id: 9, data: 0},
  {name: "Ведро лавы", id: 325, data: 10},
// Lava (10)
  {name: "Лава", id: 11, data: 0},
  {name: "Листья(яблоня)", id: 18, data: 0},
  {name: "Листья(ель)", id: 18, data: 1},
  {name: "Листья(береза)", id: 18, data: 2},
  {name: "Кровать(блок)", id: 26, data: 0},
  {name: "Паутина", id: 30, data: 0},
  {name: "Динамит(TNT)", id: 46, data: 0},
  {name: "Огонь(new)", id: 51, data: 0},
// Crops Block (59)
  {name: "Грядка(блок)", id: 60, data: 0},
// Sign Post (63)
// Wall Sign (68)
// Wooden Door Block (64)
// Iron Door Block (71)
  {name: "Ядро реактора", id: 247, data: 0},
  {name: "седло", id: 329, data: 0},
  {name: "Камера", id: 456, data: 0}];
var CAT_MODS = 10;
var CAT_MODS_ITEMS = [
  {name: "Золотое яблоко", id: 500, data: 0},
  {name: "Гнилая плоть", id: 502, data: 0},
  {name: "Паучий глаз", id: 503, data: 0},
  {name: "Стержнь ифрита", id: 504, data: 0},
  {name: "Лодка(неработает)", id: 505, data: 0},
  {name: "Стол зачаровывания", id: 205, data: 0},
  {name: "Кварцевая руда", id: 153, data: 0},
  {name: "Порошок ифрита", id: 506, data: 0},
  {name: "Comparator", id: 507, data: 0},
  {name: "Зачарованная книга", id: 508, data: 0},
  {name: "Удочка с морковью", id: 509, data: 0},
  {name: "Золотая морковь", id: 501, data: 0}];

function openInfoDialogMenu(ctx, id, damage){
        try{
                //var menu = new android.widget.PopupWindow();
                //menu.setFocusable(true);
                //infoMenu = menu;
                
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                
                var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);
                
                var textParams2 = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                textParams2.setMargins(dip2px(ctx, 5), dip2px(ctx, 10), 0, 0);
                var title = new android.widget.TextView(ctx);
                title.setTextSize(24);
                title.setText("Выбрать ID самому");
                title.setLayoutParams(textParams);
                layout.addView(title);
                var stitle = new android.widget.TextView(ctx);
                stitle.setTextSize(14);
                stitle.setText("Добавить…");
                stitle.setLayoutParams(textParams);
                layout.addView(stitle);
                
                var iidt = new android.widget.TextView(ctx);
                iidt.setTextSize(14);
                iidt.setText("ID предмета:");
                iidt.setLayoutParams(textParams2);
                layout.addView(iidt);
                
                var itemId = new android.widget.EditText(ctx);
                itemId.setText(id+"");
                itemId.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                layout.addView(itemId);
                
                var idmgt = new android.widget.TextView(ctx);
                idmgt.setTextSize(14);
                idmgt.setText("под-ID:");
                idmgt.setLayoutParams(textParams2);
                layout.addView(idmgt);
                
                var itemDmg = new android.widget.EditText(ctx);
                itemDmg.setText(damage+"");
                itemDmg.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                layout.addView(itemDmg);
                
                var ict = new android.widget.TextView(ctx);
                ict.setTextSize(14);
                ict.setText("Кол-во:");
                ict.setLayoutParams(textParams2);
                layout.addView(ict);
                
                var itemCount = new android.widget.EditText(ctx);
                itemCount.setText("1");
                itemCount.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
                layout.addView(itemCount);
                
                var fullstack = new android.widget.Button(ctx);
                fullstack.setText("Заполнить слот");
                fullstack.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(viewarg) {
                                itemCount.setText("64");
                        }
                }));
                layout.addView(fullstack);
                
                var addBtnParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                addBtnParams.setMargins(0, dip2px(ctx, 10), 0, 0);
                
                var add = new android.widget.Button(ctx);
                add.setText("Добавить");
                add.setLayoutParams(addBtnParams);
                add.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(viewarg) {
                                addToInventory = true;
                                addId = parseInt(itemId.getText());
                                addDmg = parseInt(itemDmg.getText());
                                addCount = parseInt(itemCount.getText());
                        }
                }));
                layout.addView(add);
                
                var menu = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
                var mlayout = makeMenu(ctx, menu, layout);
                menu.setContentView(mlayout);
                //menu = new android.widget.PopupWindow(mlayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
                menu.setFocusable(true);
                infoMenu = menu;
                //menu.setContentView(mlayout);
                //btnWindow.setWidth(100);
                //menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()/2);
                //menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
                menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(err){
                print("Failed to open menu, because: "+err+".");
        }
}

function addMenuItem(ctx, layout, text, id, data){
        var button = new android.widget.Button(ctx);
        button.setText(text);
        //button.setWidth(100);
        //button.setHeight(100);
        button.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                 if(Level.getGameMode() == 1){
                 Entity.setCarriedItem(getPlayerEnt(), id, 1, data);
                 }else{
                         openInfoDialogMenu(ctx, id, data);
                 }
                }
        }));
        layout.addView(button);
}

function openSubMenu(ctx, cname, cat){
        try{
                //var menu = new android.widget.PopupWindow();
                //menu.setFocusable(true);
                //subMenu = menu;
                
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                
                var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);
                var title = new android.widget.TextView(ctx);
                title.setTextSize(24);
                title.setText("Too Many Items");
                title.setLayoutParams(textParams);
                layout.addView(title);
                var stitle = new android.widget.TextView(ctx);
                stitle.setTextSize(14);
                stitle.setText(cname);
                stitle.setLayoutParams(textParams);
                layout.addView(stitle);
                for(var i=0;i<cat.length;i++)
                        addMenuItem(ctx, layout, cat[i].name, cat[i].id, cat[i].data);
                
                var menu = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
                var mlayout = makeMenu(ctx, menu, layout);
                menu.setContentView(mlayout);
                menu.setFocusable(true);
                subMenu = menu;
                //btnWindow.setWidth(100);
                //menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()/2);
                //menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
                menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(err){
                print("Failed to open menu, because: "+err+".");
        }
}

function addMenuCategory(ctx, layout, text, catid){
        var button = new android.widget.Button(ctx);
        button.setText(text);
        //button.setWidth(100);
        //button.setHeight(100);
        button.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                        if(catid == null){
                                openInfoDialogMenu(ctx, 1, 0);
                        }else{
                                openSubMenu(ctx, text, catid);
                        }
                }
        }));
        layout.addView(button);
}

function makeMenu(ctx, menu, layout, main){
        var mlayout = new android.widget.RelativeLayout(ctx); // main layout
        var xbutton = new android.widget.Button(ctx);
        xbutton.setText("×");
        var btnParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        btnParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
        btnParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
        xbutton.setLayoutParams(btnParams);
        xbutton.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                 if(menu != null){
                         menu.dismiss();
                         menu = null;
                 }
                        if(main && btnMenu != null){
                         btnMenu.dismiss();
                         btnMenu = null;
                        }
                }
        }));
        
        var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.FILL_PARENT);
        var scrollview = new android.widget.ScrollView(ctx);
        var pad = dip2px(ctx, 5);
        scrollview.setPadding(pad, pad, pad, pad);
        scrollview.setLayoutParams(svParams);
        
        scrollview.addView(layout);
        mlayout.addView(scrollview);
        mlayout.addView(xbutton);
        return mlayout;
}

function showButtons(ctx){
    function updateTime(){
        if(currSurvival){
            var ltime = Level.getTime()-Math.floor(Level.getTime()/19200)*19200;
            day = ltime < (19200/2);
            time.setText(day?"День":"Ночь");
        }else{
            time.setText("День");
            day = true;
        }
    }
    //var menu = new android.widget.PopupWindow();
        //btnMenu = menu;
        
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(0);
        
        var heal = new android.widget.Button(ctx);
        heal.setText("жизнь");
        heal.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                        Player.setHealth(20);
                }
        }));
        layout.addView(heal);
        
        var gamemode = new android.widget.Button(ctx);
        var currSurvival = Level.getGameMode()==0;
        gamemode.setText(currSurvival?"Выживание":"Творчество");
        gamemode.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                        currSurvival = !currSurvival;
                        Level.setGameMode(currSurvival?0:1);
                        updateTime();
                        gamemode.setText(currSurvival?"Выживание":"Креатив");
                }
        }));
        layout.addView(gamemode);
        
        var day = true;
        var time = new android.widget.Button(ctx);
        time.setText("Day");
        time.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function(viewarg) {
            try{
                day = !day;
                //var ti = Math.floor(Level.getTime()/19200)*19200;
                var newTime = day?0:8280;
                Level.setTime(newTime);
                updateTime();
            }catch(e){
                print("Here is the error: "+e);
            }
                }
        }));
        updateTime();
        layout.addView(time);
        
        var more = new android.widget.Button(ctx);
        more.setText("...");
        more.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                        openMore(ctx, more.getLeft(), more.getTop()+more.getHeight());
                }
        }));
        layout.addView(more);
        
        var menu = new android.widget.PopupWindow(layout, -2, -2);
        btnMenu = menu;
        //menu.setContentView(layout);
        //menu.setWidth(-2);
        //menu.setHeight(-2);
        menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
}

function addToArray(arr, sindex, entries){
    for(var i=0;i<entries.length;i++)
        arr[sindex+i] = entries[i];
}

function name2id(name){
    if(name == "Курица") return 10;
    if(name == "Корова") return 11;
    if(name == "Свинья") return 12;
    if(name == "Овца") return 13;
    
    if(name == "Зомби") return 32;
    if(name == "Крипер") return 33;
    if(name == "Скелет") return 34;
    if(name == "Паук") return 35;
    if(name == "Свино-зомби") return 36;
    
    if(name == "Дроп") return 64;
    if(name == "Зажжённый TNT") return 65;
    
    if(name == "Стрела") return 80;
    if(name == "Снежок") return 81;
    if(name == "Яйцо") return 82;
    if(name == "Картина") return 83;
    
    return -1;
}

function openMore(ctx, x, y){
    //var menu = new android.widget.PopupWindow();
    //menu.setFocusable(true);
        //btnMenuSub = menu;
        
        var scroll = new android.widget.ScrollView(ctx);
        var layout = new android.widget.LinearLayout(ctx);
        layout.setOrientation(1);
        
        var killBtn = new android.widget.Button(ctx);
        killBtn.setText("Умереть");
    killBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                 Player.setHealth(0);
                }
        }));
        layout.addView(killBtn);
        
        var spawnBtn = new android.widget.Button(ctx);
        spawnBtn.setText("Установить спаун");
        spawnBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                 Level.setSpawn(Player.getX(), Player.getY(), Player.getZ());
                 android.widget.Toast.makeText(ctx, "Спавн был установлен на ваше местоположение.", 0).show();
                }
        }));
        layout.addView(spawnBtn);
        
        var rideBtn = new android.widget.Button(ctx);
        rideBtn.setText("Оседлать моба");
        rideBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                 ride = true;
                 android.widget.Toast.makeText(ctx, "Тапните по мобу чтобы его оседлать.", 0).show();
                }
        }));
        layout.addView(rideBtn);
        
        var entBtn = new android.widget.Button(ctx);
        entBtn.setText("Мобы");
        entBtn.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function(viewarg) {
            try{
                var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 6);
                arr[0] = "Заспавнить";
                arr[1] = "Изменить возраст мобов";
                arr[2] = "Поджечь";
                arr[3] = "Удалить всех мобов";
                arr[4] = "Изменить(может не работать)";
                arr[5] = "Сделать мобов бессмертными";
                
                var builder = new android.app.AlertDialog.Builder(ctx);
                builder.setTitle("Функции мобов");
                builder.setItems(arr, new android.content.DialogInterface.OnClickListener({
                    onClick: function(dialog, which) {
                        atotal = 4;
                        if(which == 0){
                            atotal = 13;
                        }else if(which == 2){
                            atotal = 10;
                        }else if(which == 3){
                            atotal = 16;
                        }else if(which == 4 || which == 5){
                            atotal = 9;
                        }
                        var arre = java.lang.reflect.Array.newInstance(java.lang.CharSequence, atotal);
                        var currAdded = 4;
                        addToArray(arre, 0, ["Курица", "Корова", "Свинья", "Овца"]);
                        
                        if(which == 0 || which == 2 || which == 3 || which == 4 || which == 5) {
                            addToArray(arre, currAdded, ["Зомби", "Крипер", "Скелет", "Паук", "Свино-Зомби"]);
                            currAdded += 5;
                        }
                        
                        if(which == 2 || which == 3) {
                            addToArray(arre, currAdded, ["Дроп"]);
                            currAdded += 1;
                        }
                        
                        if(which == 0){
                            addToArray(arre, currAdded, ["Зажжённый ТНТ", "Стрела", "Снежок", "Яйцо"]);
                            currAdded += 4;
                        }
                        
                        if(which == 3) {
                            addToArray(arre, currAdded, ["Зажжённый ТНТ", "Фальшивый блок", "Стрела", "Снежок", "Яйцо", "Картина"]);
                            currAdded += 6;
                        }
                        
                        var builder2 = new android.app.AlertDialog.Builder(ctx);
                        builder2.setTitle("Выбирите моба...");
                        builder2.setItems(arre, new android.content.DialogInterface.OnClickListener({
                            onClick: function(dialog2, which2) {
                                var eId = name2id(arre[which2]);
                                if(which == 0){
                                    spawnOnTap = eId;
                                    clientMessage("Тапните по блоку чтобы заспавнить. Отменить - главная кнопка (Х).");
                                }else if(which == 1){
                                    var aarr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 2);
                                    aarr[0] = "Ребенок";
                                    aarr[1] = "Взрослый";
                                    
                                    var builder3 = new android.app.AlertDialog.Builder(ctx);
                                    builder3.setTitle("Возраст");
                                    builder3.setItems(aarr, new android.content.DialogInterface.OnClickListener({
                                        onClick: function(dialog3, which3) {
                                            ageAll(eId, which3==0?-24000:0);
                                        }
                                    }));
                                    builder3.show();
                                }else if(which == 2){
                                    fireAll(eId, 10);
                                }else if(which == 3){
                                    killAll(eId);
                                }else if(which == 4){
                                    healAll(eId, 1);
                                }else if(which == 5){
                                    healAll(eId, 50);
                                }
                            }
                        }));
                        builder2.show();
                    }
                }));
                builder.show();
                 }catch(err){
                 print("e/"+err);
                 }
                }
        }));
        layout.addView(entBtn);
        
        var placeBtn = new android.widget.Button(ctx);
        placeBtn.setText("Выбрать позицию гл. кнопки");
        placeBtn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                 try{
                        var arr = java.lang.reflect.Array.newInstance(java.lang.CharSequence, 4);
                        arr[0] = "Верхний левый угол";
                        arr[1] = "Верхний правый угол";
                        arr[2] = "Нижний левый угол";
                        arr[3] = "Нижний правый угол";
                        
                        var builder = new android.app.AlertDialog.Builder(ctx);
                        builder.setTitle("Позиция кнопки");
                        builder.setItems(arr, new android.content.DialogInterface.OnClickListener({
                onClick: function(dialog, which) {
                    ModPE.saveData("btnPos", which);
                    android.widget.Toast.makeText(ctx, "Перезапустите мир", 0).show();
                }
            }));
            builder.show();
                 }catch(err){
                 print("e/"+err);
                 }
                }
        }));
        layout.addView(placeBtn);
        scroll.addView(layout);
        
        var menu = new android.widget.PopupWindow(scroll, dip2px(ctx,150), dip2px(ctx,150));
    menu.setFocusable(true);
        btnMenuSub = menu;
        //menu.setContentView(layout);
        //menu.setWidth(dip2px(ctx,150));
        //menu.setHeight(dip2px(ctx,250));
        menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
        menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, x, y);
}

function openMenu(){
        var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
        try{
         showButtons(ctx);
                //var menu = new android.widget.PopupWindow();
                //menu.setFocusable(true);
                //mainMenu = menu;
                
                var layout = new android.widget.LinearLayout(ctx);
                layout.setOrientation(1);
                
                
                var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                textParams.setMargins(dip2px(ctx, 5), 0, 0, 0);
                var title = new android.widget.TextView(ctx);
                title.setTextSize(24);
                title.setText("TooManyItems 0.9.5");
                title.setLayoutParams(textParams);
                layout.addView(title);
                var stitle = new android.widget.TextView(ctx);
                stitle.setTextSize(14);
                stitle.setText("Сделал Жангир Лекеров");
                stitle.setLayoutParams(textParams);
                layout.addView(stitle);
                addMenuCategory(ctx, layout, "Стартовый набор", CAT_STARTER_KIT_ITEMS);
                addMenuCategory(ctx, layout, "Строительные блоки", CAT_BUILDING_ITEMS);
                addMenuCategory(ctx, layout, "Декоротивные блоки", CAT_DECORATION_ITEMS);
                addMenuCategory(ctx, layout, "Броня", CAT_ARMOUR_ITEMS);
                addMenuCategory(ctx, layout, "Инструменты", CAT_TOOLS_ITEMS);
                addMenuCategory(ctx, layout, "Еда", CAT_FOOD_ITEMS);
                addMenuCategory(ctx, layout, "Красители", CAT_DYES_ITEMS);
                addMenuCategory(ctx, layout, "Руды и предметы", CAT_ITEMS_ITEMS);
                addMenuCategory(ctx, layout, "Яйца призвания", CAT_SPAWN_ITEMS);
                addMenuCategory(ctx, layout, "Нужные блоки", CAT_MISCELLANEOUS_ITEMS);
                addMenuCategory(ctx,layout, "Для модов", CAT_MODS_ITEMS);
                addMenuCategory(ctx, layout, "Любой предмет", null);
                
                var menu = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
                var mlayout = makeMenu(ctx, menu, layout, true);
                menu.setContentView(mlayout);
                //menu.setFocusable(true); <-- I can't find better solution
                mainMenu = menu;
                //menu.setContentView(mlayout);
                //btnWindow.setWidth(100);
                //menu.setWidth(ctx.getWindowManager().getDefaultDisplay().getWidth()/2);
                //menu.setHeight(ctx.getWindowManager().getDefaultDisplay().getHeight());
                menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(err){
                print("Failed to open menu, because: "+err+".");
        }
}

function leaveGame(){
        var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
        ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
                if(btnWindow != null){
                        btnWindow.dismiss();
                        btnWindow = null;
                }
                if(mainMenu != null){
                        mainMenu.dismiss();
                        mainMenu = null;
                }
                if(btnMenu != null){
                        btnMenu.dismiss();
                        btnMenu = null;
                }
                if(subMenu != null){
                        subMenu.dismiss();
                        subMenu = null;
                }
                if(infoMenu != null){
                        infoMenu.dismiss();
                        infoMenu = null;
                }
        }}));
        riding = false;
}

function modTick(){
        if(addToInventory){
                addItemInventory(addId, addCount, addDmg);
                addToInventory = false;
        }
        
        if(riding){
        // thanks to 500ISE
        
        var playerYaw = getYaw();
        var playerPitch = getPitch();
        //setRot(ridingAnimal, playerYaw, 0);
        var velX = -1 * Math.sin(playerYaw / 180 * Math.PI) * 0.2;
                var velZ = Math.cos(playerYaw / 180 * Math.PI) * 0.2;
                var velY = 0;
                var jumpVel = 0.2;
                if(velX > 0){
                 if (getTile(Player.getX()+1, Math.floor(Entity.getY(ridingAnimal)), Player.getZ()) != 0)
                 velY = jumpVel;
                }else{
                 if(getTile(Player.getX()-1, Math.floor(Entity.getY(ridingAnimal)), Player.getZ()) != 0)
                 velY = jumpVel;
                }
                
                if(velZ > 0){
                 if(getTile(Player.getX(), Math.floor(Entity.getY(ridingAnimal)), Player.getZ()+1) != 0)
                 velY = jumpVel;
                }else{
                 if(getTile(Player.getX(), Math.floor(Entity.getY(ridingAnimal)), Player.getZ()-1) != 0)
                 velY = jumpVel;
                }
                
                if(velY == 0 && getTile(Player.getX(), Player.getY()-2, Player.getZ()) == 0) velY = -jumpVel;
                //clientMessage(velY);
                //var velY = Math.sin((playerPitch - 180) / 180 * Math.PI) * ANIMAL_VERTICAL_SPEED;
                setVelX(ridingAnimal, velX);
                setVelY(ridingAnimal, velY);
                setVelZ(ridingAnimal, velZ);
        }
}


// MOB MANAGER
var entities = [];
function entityAddedHook(ent){
    entities.push(ent);
}
function entityRemovedCallback(ent){
    entities.splice(entities.indexOf(ent));
}
function killAll(entType){
    for(var i=0;i<entities.length;i++){
        if(Entity.getEntityTypeId(entities[i]) == entType){
            Entity.remove(entities[i]);
        }
    }
}
function ageAll(entType, age){
    for(var i=0;i<entities.length;i++){
        if(Entity.getEntityTypeId(entities[i]) == entType){
            Entity.setAnimalAge(entities[i], age);
        }
    }
}
function fireAll(entType, time){
    for(var i=0;i<entities.length;i++){
        if(Entity.getEntityTypeId(entities[i]) == entType){
            Entity.setFireTicks(entities[i], time);
        }
    }
}
function healAll(entType, lives){
    for(var i=0;i<entities.length;i++){
        if(Entity.getEntityTypeId(entities[i]) == entType){
            Entity.setHealth(entities[i], lives);
        }
    }
}

ModPE.
setFoodItem(500, "apple_golden", 0, 20, "Apple golden");
ModPE.
setFoodItem(501, "carrot_golden", 0, 20, "Carrot golden");
ModPE.
setFoodItem(502, "rotten_flesh", 0, 1, "Rotten flesh");
ModPE.
setFoodItem(503, "spider_eye", 0, 1, "Spider eye");
ModPE.
setItem(504, "blaze_rod", 0, "Blaze rod");
ModPE.
setItem(505, "boat", 0, "Boat");
ModPE.
setItem(506, "blaze_powder", 0, "Blaze powder");
ModPE.
setItem(507, "comparator", 0, "Comparator");
ModPE.
setItem(508, "book_enchanted", 0, "Book enchanted");
ModPE.
setItem(509, "carrot_on_a_stick", 0, "Carrot on a stick");