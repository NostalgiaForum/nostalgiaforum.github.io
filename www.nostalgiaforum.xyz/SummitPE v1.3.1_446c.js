/*
 * © 2016 - brought to you by Godsoft029 and peacestorm. Thanks!
 * © 2020-2022 - brought to you by WDH (fork DragOP)
 */
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var LinearLayout = android.widget.LinearLayout;
var GUI;
var dialog;
var aboard;
var searchQ = ""; //Current search query (in Navigator menu)
var tick1 = 0;
var search;
var Launcher = {
    isBlockLauncher: function() {
        return (ctx.getPackageName() == "net.zhuoweizhang.mcpelauncher" || ctx.getPackageName() == "net.zhuoweizhang.mcpelauncher.pro");
    },
    isToolbox: function() {
        return ctx.getPackageName() == "io.mrarm.mctoolbox";
    },
    isModPeLoader: function() {
        return ctx.getPackageName() == "io.ednms.modpeloader";
    }
};

var SummitPE = {
    mods: new Array(),
    commands: new Array(),
    isDev: true,
    chatDebug: true,
    inGame: false,
    lightMode: false,
    ghostMode: false,
    enableOpenGL: true,
    enableFastEat: true,
    enableTimings: true
};

SummitPE.cmsg = function(text) {
    clientMessage(ChatColor.GREEN + "[" + ChatColor.BLUE + "S" + ChatColor.GOLD + "P" + ChatColor.GREEN + "]" + ChatColor.GRAY + ": " + ChatColor.YELLOW + text);
}

SummitPE.ctoast = function(text, showPrefix, iconName, critical) {
    try {
        /* var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() { */
        if (!SummitPE.inGame || !SummitPE.chatDebug || critical != null) {
            SummitPE.nctoast(text, showPrefix);
            return true;
            var thetoast = android.widget.Toast.makeText(com.mojang.minecraftpe.MainActivity.currentMainActivity.get(), "" + text, android.widget.Toast.LENGTH_LONG);
            var layout = new android.widget.LinearLayout(ctx);
            var icon = new android.widget.ImageView(ctx);
            var msg = new android.widget.TextView(ctx);
            if (showPrefix || showPrefix != null) text = "SummitPE: " + text;
            try {
                if (iconName != null) {
                    icon.setImageResource(iconName);
                    layout.addView(icon);
                }
            } catch (e) {

            }
            msg.setText(text);
            msg.setGravity(android.view.Gravity.CENTER);
            msg.setTextSize(16);
            msg.setPadding(10, 10, 10, 10);
            msg.setTextColor(android.graphics.Color.WHITE);
            var bg = new android.graphics.drawable.GradientDrawable();
			//bg.setAlpha(150);
            bg.setColor(getColorAHEXFromARGB(150, 50, 50, 50));
            bg.setStroke(dip2px(3), getColorAHEXFromARGB(200, 5, 5, 5));
            bg.setCornerRadius(dip2px(20));
            layout.addView(msg);
            layout.setBackground(bg);
            layout.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    thetoast.cancel();
                }
            }));
            thetoast.setView(layout);
            thetoast.show();
        } else {
            //if (showPrefix || showPrefix != null) text = "SummitPE: " + text;
            clientMessage(ChatColor.GREEN + "[" + ChatColor.BLUE + "S" + ChatColor.GOLD + "P" + ChatColor.YELLOW + " Debug" + ChatColor.GREEN + "]" + ChatColor.GRAY + ": " + ChatColor.GOLD + text);
        }
        /* }
        })); */
    } catch (e) {
        print(e);
    }
}

var toasts = [];

SummitPE.nctoast = function(text, showPrefix, delayed) {
    try {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                var tdelay;
                if (delayed == undefined) {
                    tdelay = 40;
                } else {
                    tdelay = delayed;
                }

                var scale = dip2px(1);

                toasts.push({
                    tick: tdelay,
                    gui: null,
                    index: toasts.length,
                    pos: {
                        x: 0,
                        y: ((toasts.length + 1) * (dip2px(36) * scale)) //+1, так как в момент добавления элемента там меньше элементов //допустим уже есть 2 элемента, но мы добавляем новый и нам нужно посчитать те два и новый
                    }
                });
                var currentIndex = toasts.length - 1;



                var layout = new LinearLayout(ctx);
                layout.setOrientation(1);

                var msg = new android.widget.TextView(ctx);
                if (showPrefix || showPrefix != null) text = "SummitPE: " + text;
                msg.setText(android.text.Html.fromHtml(text));
                msg.setTextColor(android.graphics.Color.WHITE);
                msg.setTextSize(18);
                msg.setGravity(android.view.Gravity.CENTER);
                msg.setPadding(10, 10, 10, 10);
                msg.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                msg.setShadowLayer(1, 1, 1, android.graphics.Color.BLACK);

                var bg = new android.graphics.drawable.GradientDrawable();
                bg.setColor(getColorAHEXFromARGB(10, 150, 120, 100));
                bg.setStroke(dip2px(3), getColorAHEXFromARGB(200, 5, 5, 5));
                bg.setCornerRadius(dip2px(20));

                layout.addView(msg);
                layout.setBackground(bg);
                layout.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        toasts.forEach(function(item, index, array) {
                            if (item.index == currentIndex) {
                                toasts[index].gui.dismiss();
                                toasts[index].gui = null;
                                toasts.splice(index, 1);
                            }
                        });
                    }
                }));

                toasts[currentIndex].gui = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                //toasts[currentIndex].gui.setTouchable(false);
                toasts[currentIndex].gui.setAnimationStyle(android.R.style.Animation_Translucent) //android.R.style.Animation_Toas
                toasts[currentIndex].gui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.BOTTOM, toasts[currentIndex].pos.x, toasts[currentIndex].pos.y);
            }
        }));
    } catch (e) {
        print(e);
    }
};

(function() {
    new java.lang.Thread(new java.lang.Runnable({
       run: function() {
            while (true) {
                ctx.runOnUiThread(new java.lang.Runnable({
                    run: function() {
                        if (toasts.length != 0) {
                            toasts.forEach(function(item, index, array) {
                                item.tick--;
                                if (item.tick <= 0) {
                                    if (item.gui != null) {
                                        item.gui.dismiss();
                                        item.gui = null;
                                        //SummitPE.nctoast("il: " + array.length + " and index: " + index);
                                    }
                                    toasts.splice(index, 1);
                                }
                            });
                        } //end
                    }
                }));
                java.lang.Thread.sleep(150);
            }
        }
    })).start();
})();

var mDismiss = function() {
    menu.dismiss();

    if (epicMenuViewMenu) {
        epicMenuViewMenu.forEach(function(entry, index, array) {
            entry.dismiss();
        });
    }
};

var lang = {
    en_US: "en_US",
    ru_RU: "ru_RU",
    de_DE: "de_DE"
};

var sharedPref = ctx.getPreferences(ctx.MODE_PRIVATE);
var editor = sharedPref.edit();

SummitPE.metersScrolled = 0;

SummitPE.finishedScroll = false;
SummitPE.finishedBreak = false;

(SummitPE.initEggs = function() {
    SummitPE.metersScrolled = sharedPref.getInt("SummitPE.egg.metersScrolled", 0);
    SummitPE.finishedScroll = sharedPref.getBoolean("SummitPE.egg.finishedScroll", false);
    SummitPE.finishedBreak = sharedPref.getBoolean("SummitPE.egg.finishedBreak", false);
})();

function dip2px(dips) {
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    return Math.ceil(dips * ctx.getResources()
        .getDisplayMetrics()
        .density);
}
var enabledGradient = new android.graphics.drawable.GradientDrawable();
enabledGradient.setColor(getColorAHEXFromARGB(150, 0, 200, 0));
enabledGradient.setStroke(dip2px(2), android.graphics.Color.BLACK);
enabledGradient.setCornerRadius(1);
var disabledGradient = new android.graphics.drawable.GradientDrawable();
disabledGradient.setColor(getColorAHEXFromARGB(130, 200, 0, 0));
disabledGradient.setStroke(dip2px(2), android.graphics.Color.BLACK);
disabledGradient.setCornerRadius(1);
var Settings = {
    settings: new org.json.JSONObject(),
    resetConfig: function() {
        this.settings = new org.json.JSONObject();
        this.setString("language", lang.en_US);
        this.setString("menu", "Navigator"); //Navigator, Basic, Cater, Epic

        this.setBoolean("enable_commands", true);
        this.setString("command_prefix", ".");
        this.saveToFile();
    },
    loadFromFile: function() {
        try {
            var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/", "config.dat");
            var readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
            var data = new java.lang.StringBuilder();
            var string;
            while ((string = readed.readLine()) != null) {
                data.append(string);
            }
            try {
                this.settings = new org.json.JSONObject(data.toString());
            } catch (e) {
                SummitPE.ctoast("Config data corrupt. Resetting your config(" + e);
                this.resetConfig();
            }
        } catch (e) {
            //Seems like theres no file

            this.resetConfig();
        }
    },
    saveToFile: function() {
        var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE");
        if (!dir.exists()) dir.mkdir();
        var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/", "config.dat");
        if (!file.exists()) file.createNewFile();
        var stream = new java.io.FileOutputStream(file);
        try {
            stream.write(this.settings.toString().getBytes());
        } finally {
            stream.close();
        }
    },
    init: function() {
        this.loadFromFile();
    },
    getBoolean: function(key, _default) {
        return this.settings.optBoolean(key, _default == null ? false : _default);
    },
    setBoolean: function(key, value) {
        this.settings.put(key, value.toString());
        this.saveToFile();
    },
    getString: function(key, _default) {
        return this.settings.optString(key, _default == null ? "" : _default);
    },
    setString: function(key, value) {
        this.settings.put(key, value.toString());
        this.saveToFile();
    }
};
Settings.init();

//In game chat debug
if (Settings.getString("chatDebug", "not") == "yes" || (SummitPE.isDev && Settings.getString("chatDebug", "not") != "no")) SummitPE.chatDebug = true;
else SummitPE.chatDebug = false;

var defaultLang = {
    special_bypass: "Bypass",
    special_target: "Target",
    special_friend_manager: "Friend-Manager",
    special_panic: "Panic",
    special_more: "MORE",
    hacks_gamemode: "Gamemode",
    hacks_speed: "Speed",
    hacks_jumpspeed: "JumpSpeed",
    hacks_aimaura: "AimAura",
    hacks_autojump: "AutoJump",
    hacks_tpaura: "TP-Aura",
    hacks_bowaimbot: "BowAimBot",
    hacks_clicktp: "TapTeleport",
    hacks_longjump: "BunnyHop",
    hacks_flight: "Flight",
    hacks_step: "Step",
    hacks_jesus: "Jesus",
    hacks_nodownglide: "NoDownGlide",
    hacks_glide: "Glide",
    hacks_chestTracer: "ChestTracers",
    hacks_criticals: "Criticals",
    hacks_coords: "Coords",
    hacks_playerEsp: "PlayerESP",
    hacks_nuker: "Nuker",
    gm_survival: "Survival",
    gm_creative: "Creative",
    moduvarype_mod: "Mod",
    moduvarype_special: "Special",
    moduvarype_command: "Command",
    moddialog_description: "Description",
    moddialog_type: "Type",
    state_on: "On",
    state_off: "Off",
    screen_settings: "Settings",
    screen_updatemgr: "Update Manager",
    screen_about: "About"
};

var Languages = {
    language: new org.json.JSONObject(),
    resetLang: function(resetLangDefault) {
        if (resetLangDefault) {
            this.loadLang(true, "");
        } else {
            //this.language = new org.json.JSONObject(),
            this.language = new org.json.JSONObject(defaultLang.toString());
            //this.setString("param", "value");
            this.saveLang();
        }
    },
    loadLang: function(resetLangDefault, langLoad) {
        try {
            if (resetLangDefault) langLoad = "en_US";
            var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/language/", langLoad + ".json");
            var readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
            var data = new java.lang.StringBuilder();
            var string;
            while ((string = readed.readLine()) != null) {
                data.append(string);
            }
            try {
                this.language = new org.json.JSONObject(data.toString());
            } catch (e) {
                SummitPE.ctoast("Language data corrupt. Resetting language! (" + e + ")");
                //this.resetLang(false);
            }
        } catch (e) {
            //Seems like theres no file

            SummitPE.ctoast(e);
            //this.resetLang(!resetLangDefault);
        }
    },
    saveLang: function() {
        var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE");
        if (!dir.exists()) dir.mkdir();
        dir = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/language");
        if (!dir.exists()) dir.mkdir();
        var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/language", Settings.getString("language", lang.en_US) + ".json");
        if (!file.exists()) file.createNewFile();
        var stream = new java.io.FileOutputStream(file);
        try {
            stream.write(this.language.toString().getBytes());
        } finally {
            stream.close();
        }
    },
    init: function() {
        this.loadLang(false, Settings.getString("language", lang.en_US));
    },
    getBoolean: function(key, _default) {
        return this.language.optBoolean(key, _default == null ? false : _default);
    },
    setBoolean: function(key, value) {
        this.language.put(key, value.toString());
        this.saveLang();
    },
    getString: function(key, _default) {
        var tmp_value = this.language.optString(key, _default == null ? "" : _default);
        if (tmp_value == null || tmp_value == "") tmp_value = key;

        return tmp_value;
    },
    setString: function(key, value) {
        this.language.put(key, value.toString());
        this.saveLang();
    }
};
Languages.init();

var defaultMS = {
    //modulesEnabled: {},
    //modulesSettings: {} //no, no TODO
    //positionMainButton: [],
    //positionsEpicMenu: []
};

var modSettings = {
    localSettings: new org.json.JSONObject(),
    jObj: this.localSettings,
    reset: function(jsonObj, e) { // = new org.json.JSONObject(defaultMS.toString())
        try {
            if (jsonObj == null || jsonObj == undefined || !jsonObj) var jsonObj = new org.json.JSONObject(); //defaultMS.toString());
            this.localSettings = jsonObj;
            this.localSettings.put("correct", "1");

            var lcheck = this.localSettings.optString("correct", "no");
            if (lcheck != "no") {
                if (e == null) e = "Not";
                SummitPE.ctoast("ModSettings is reset, justification: " + e);
                this.saveSettings();
            } else SummitPE.ctoast("Reset settings error: Settings are corrupt! Response: " + lcheck + ". Track: " + e);
        } catch (e2) {
            SummitPE.ctoast("Reset settings error: " + e2 + ". Track: " + e);
        }
    },
    loadSettings: function() {
        try {
            var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/modSettings.json");
            var readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
            var data = new java.lang.StringBuilder();
            var string;
            while ((string = readed.readLine()) != null) {
                data.append(string);
            }
            try {
                this.localSettings = new org.json.JSONObject(data.toString());
            } catch (e) {
                this.reset(null, "Data corrupt, (" + e + ")");
            }
        } catch (e) {
            this.reset(null, "File error (" + e + ")"); //default settings
        }
    },
    saveSettings: function() {
        var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE");
        if (!dir.exists()) dir.mkdir();
        var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/modSettings.json");
        if (!file.exists()) file.createNewFile();
        var stream = new java.io.FileOutputStream(file);
        try {
            stream.write(this.localSettings.toString().getBytes());
        } finally {
            stream.close();
        }
    },
    reSave: function(jObj) {

    },
    init: function() {
        this.loadSettings();
    }
}
modSettings.init();

function clone(object) {
    var newObject = {}

    for (var prop in object) {
        newObject[prop] = (typeof object[prop] !== 'object') ? object[prop] : clone(object[prop])
    }

    return newObject
}

//example
//jo = new org.json.JSONObject();
//jo.put("name", "some");
//jo = jsonWorker.construct(jo).operation();
//or
//jo = jsonWorker.construct(jo, true).operation("setString", ["name", "some2"])("setBoolean", ["isCool", true])("end");

/*
заметка (note): 
Краш загрузчика модов вызывают ошибки в коде java или вызов методов modpe не в нужных средах (не в игре) (например получение
позиции игрока в главном меню). Я разберу примеры краша из-за ошибок в java:
Внутри вызова java объекта...
1) Неопределенные переменные в аргументах
 Например: textLayout.addView(sjsjdjjsjw); //с неопределенной переменной

2) Внутри java потоков (или отлаженной даты)
 Например: внутри потока вызвать неопределенную js функцию (хз, может обработчик
 событий может исправить краш, не проверял)
*/

/*
#################
   JsonWorker
#################
**Документация**
Это инструмент для работы с библиотекой json при помощи объектов Android (org.json.JSONObject).

#### Начало: ####

1) Создание и инициализация.
 Для создание "рабочей сессии, экрана, состояния" используйте обращение к методу construct()
 #1 var res = jsonWorker.construct(ВАШ_ОБЪЕКТ[или_null], НЕСКОЛЬКО_ОПЕРАЦИЙ?, ВОЗМОЖНОСТЬ_ПЕРЕЗАПИСИ_ОБЪЕКТА?);
 
 а1: Вам не объязательно нужно заранее иметь json объект.
 а2: Возможность выполнять несколько операций, или же только одна операция, которая возвращает json
 - объект и заканчивает сеанс.
 а3: Возможность перезаписать json объект (вызвав конструктор)

2) Операции с json объектом
 Для работы с объектом json используйте только метод operation() (запросы)
 #2 res.operation(ИМЯ_МЕТОДА_В_ЗАПРОСЕ, ПАРАМЕТРЫ_К_МЕТОДУ, СОХРАНЯТЬ_ЛИ_РЕЗУЛЬТАТ?);
 
 а1: Текстовое имя метода (см. список возможных методов в запросах)
 а2: Параметры для метода в виде объекта или массива (см. возможные параметры у конкретного метода-запроса)
 a3: Нужно ли для следуюдего запроса сохранять результат этого? Требуется для добавления данных в
 - json массив или объект (пример: получить/создать массив->добавить данные туда) или других вещей
 - Только для мульти-запросов.
 
 &Факты: у не мультоперационн. варианта после завершения одной операции вызывается метод end(), который завершает сеанс
 - и возвращает json объект, в случае мультиоперационн. метод end() нужно вызвать самому (методом в запросе
 - или методом к jsonWorker, не важно)

3) Список возможных методов в запросах (операций с json объектом)
------------------------------------------------------------

 & getData(key, type[, _default]) - Получить данные
 
 а 0 - ключ
 а 1 - тип (number, string, boolean), от него зависит значение, которое будет
 - возвращено, если значения по ключу не существует
 а 2 - (значение по-умолчанию, которое будет возвращено, если
 - значения по ключу не существует, и аргумент 1 не будет учитываться)
 
------------------------------------------------------------

 & setData({key1:value1, ...})
 
 Метод принимает объект, ключи и значения которого будут добавлены
 a 0 - {ключ:значение}

------------------------------------------------------------

 & getArray(key)
 
 а 0 - ключ в объекте

------------------------------------------------------------

 & setArrayData([value1, ...])
 
 Метод принимает массив, значения которого будут добавлены
 a 0 - [значение]

------------------------------------------------------------

 & createArray
 
 Создает массив и возвращает его, самое время использовть saveResult

------------------------------------------------------------

 & getObject(key), getObjectInArray(numberKey)
 
 Получает объект по ключу, в объекте или массиве. Обе функции одинаковые

------------------------------------------------------------

 & createObject
 
 Создает объект и возвращает его. Вы еще не думаете использовать saveResult?

------------------------------------------------------------

 & updateData(key, target, mode, data)
 
 а 0 - ключ, возможно null, если а 1 == "str"
 а 1 - цель обновления: объект, массив или строка. Строка работает также, как и setData, но
 - можно удалять ключи. Значения: "obj", "arr", "str"
 а 2 - режим: "add", "remove". (Добавить значения а 3 или удалить ключи, указанные в а 3)
 а 3 - data {key1: value1[or null], ...} (объект)

------------------------------------------------------------

 &

------------------------------------------------------------

 &

------------------------------------------------------------

Добавлять данные (несколько сразу), получать данные, получать массив (и работать с ним доугими запросами),
добавлять массив (с данными) (TODO), получать объект


*/

//null: org.json.JSONObject.NULL

var jsonWorker = {
    jsonObj: new org.json.JSONObject(),
    oldJsonObj: null,
    saved: false,
    multi: false,
    multiInitted: false,
    initted: false,

    construct: function(jsonObj, multiOps, multiInitted) {
        if (!this.initted || this.multiInitted) {
            if (jsonObj != null) this.jsonObj = jsonOnj;
            if (multiOps != null && multiOps != false) this.multi = true;

            this.initted = true;
            return this;
        } else {
            return this.prepairError("Можно инициализировать только не инициализированные сеансы. Чтобы завершить сеанс, используйте метод end()");
        }
    },

    operation: function(name, params, saveResult) { //saveResult only with multi support
        if (!this.initted) return this.prepairError("Для работы требуется json объект");
        if (name == "construct" || name == "operation") return this.prepairError("Нельзя использовать магию вне Хогвартца");
        //end можно

        if (this.saved && !saveResult) {
            this.jsonObj = this.cloneJson(this.oldJsonObj);
            this.oldJsonObj = null;

            this.saved = false;
        }

        try {
            if (name != "end") {
                if (this.multi) {
                    if (saveResult) {
                        this.oldJsonObj = this.cloneJson(this.jsonObj);
                        this.jsonObj = this[name](params);

                        this.saved = true;
                    } else this[name](params);

                    return this.operation;
                } else {
                    this[name](params);
                    return this.end();
                }
            } else {
                return this.end();
            }
        } catch (e) {
            this.prepairError("Error JW Operation (#" + e.lineNumber + "): " + e);
        }
    },

    prepairError: function(error, description) {
        //[error, description];
        //TODO - notify
        description = (description == null) ? ("") : (" " + description);
        var texte = error + description;
        SummitPE.ctoast("JsonWorker: " + texte); //print error
        return this.end();
    },

    end: function() {
        this.multi = false;
        this.multiInitted = false;
        this.initted = false;

        this.saved = false;

        var result = this.jsonObj;
        this.jsonObj = new org.json.JSONObject();
        return result;
    },

    cloneJson: function(jsonObjn) {
        jsonObjn = jsonObjn.toString();

        return new org.json.JSONObject(jsonObjn);
    },

    getType: function(type) {
        var type_str = false;
        if (type == "int" || type == "number" || typeof(type) == "number") type_str = 0;
        else if (type == "string" || type == "str" || (typeof(type) == "string" && type != "boolean" && type != "true" && type != "false" && type != "1" && type != "0")) type_str = "";
        else type_str = false;

        return type_str;
    },

    //--------------------
    //--------DATA--------
    //--------------------

    getData: function(param) {
        //key, type, _default
        //key, type, (default value)
        var key = param[0],
            type = this.getType(param[1]),
            _default = (param[2] == null) ? type : param[2];

        //type = this.getType(type),
        //_default = (_default == null) ? type : _default;

        return this.jsonObj.optString(key, _default);
    },

    setData: function(param) {
        //data {key1:value1, ...}
        var data = param[0];

        for (var key in data) {
            this.jsonObj.put(key, data[key].toString());
        }
    },

    //--------------------
    //-------ARRAY--------
    //--------------------


    getArray: function(param) {
        //key
        var key = param[0];

        return jsonObj.getJSONArray(key);
    },

    setArrayData: function(param) { //setArray != setData
        //data
        //data [value1, ...]
        var data = param[0];

        data[0].forEach(function(item, index, arrayj) {
            this.jsonObj.put(index, data[index].toString());
        });
    },

    //notes:
    //worked -> arrayj.put("QWERTY");
    //use setData for it ^
    //and jo.put(arrayj);

    createArray: function(param) {
        var arrayj = new org.json.JSONArray();

        return arrayj;
    },

    //--------------------
    //-------OBJECT-------
    //--------------------

    getObject: function(param) {
        //key
        var key = param[0];

        return this.jsonObj.getJSONObject(key);
    },

    getObjectInArray: function(param) { //getObjectInArray == getObject
        //key
        var key = param[0];

        return this.jsonObj.getJSONObject(Number(key));
    },

    /* setObjectData: function(param) {//not recommented
        //key, data
        //key, data {key1: value1, ...}
        var key = param[0];
        var data = param[1];
        
        var tempObj = {};
        tempObj[key] = data;
        //{[key]: data}
        
        return this.setData(tempObj);
    }, */ //Возможно поведение вызовет ошибку

    createObject: function(param) {
        var objectj = new org.json.JSONObject();

        return objectj;
    },

    updateData: function(param) {
        //key, target, mode, data
        //key, target (obj, arr, str), mode (add, remove), data {key1: value1[or null], ...}
        var key = param[0];
        var target = param[1];
        var mode = param[2];
        var data = param[3];

        var newData;
        if (target == "obj") newData = this.getObject(key);
        else if (target == "arr") newData = this.getObject(key);
        else newData = this.jsonObj;

        for (var key2 in data) {
            if (mode == "add" || mode == "put") newData.put(key2, data[key2].toString());
            else newData.remove(key2);
        }

        if (target != "str") {
            this.jsonObj.remove(key);
            this.jsonObj.put(key, newData);
        } else this.jsonObj = newData; //это не объязательно, ссылка на объект уже имеется
    },

    //--------------------
    //-------OTHER-------- (old code)
    //--------------------

    /* setArrayObjectsInObject: function(key, valueObj) {
        var ja = new org.json.JSONArray();
        for(var index in valueObj) {
            var jo = new org.json.JSONObject();
            if(typeof(valueObj[index]) == "Object") {
                for(var index2 in index) {
                    jo.put(index2, valueObj[index][index2]);
                }
            } else {
                jo.put(index, valueObj[index]);
            }
            
            ja.put(jo);
        }
        
        mainObj = new org.json.JSONObject();
        this.localSettings.put(key, ja);
        //this.saveLang();
        SummitPE.ctoast(this.localSettings.toString());
    },
    getInObject: function(key, index, type) {
        var type_str = false;
        if (type == "int") type_str = 0;
        else if (type == "string") type_str = null;
        else type_str = false;
        
        var objJson = this.localSettings.getJSONObject(key);
        return objJson.optString(index, _default == null ? type_str : _default);
    },//{}-[]-[{}]
    removeInArray: function(arrayKey, value) {
        var temparr = new org.json.JSONArray();
        var arr = this.localSettings.getJSONArray(arrayKey);
        for (var i = 0; i < arr.length(); i++) {
            if (arr.getString(i).toLowerCase() != value.toString().toLowerCase()) temparr.put(arr.getString(i));
        }
        this.localSettings.put(arrayKey, temparr);
        this.saveToFile();
    },
    addInArray: function(key, value) {
        var temparr = new org.json.JSONArray();
        for (var i = 0; i < this.all.length(); i++) {
            if (this.all.getString(i).toLowerCase() != name.toString().toLowerCase()) tempall.put(this.all.getString(i));
        }
        this.all = tempall;
        this.saveToFile();
    } */
};

//it works! cool
/* var eer = new org.json.JSONObject();
eer.put("key", "new 1");

//var eer2 = eer;
var eer2 = jsonWorker.cloneJson(eer);

eer.remove("key");
eer.put("key", "new 2");

SummitPE.ctoast("eer == eer2 " + eer.optString("key", "no") + " == " + eer2.optString("key", "noO"));
//print("eer: " + eer2.optString("key", "omgg"));
//print(eer2);
//eer2 == js object, eer == eer2
*/


/*
Проверка
var dataPos = jsonWorker.construct(jo, true).operation("setString", ["name", "some2"])("setBoolean", ["isCool", true])("end");

*/

//convert colors
//to Hex

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function argbToAHex(a, r, g, b) {
    return "#" + componentToHex(a) + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//to ARBG
function componentToInt(c) {
    var numberI = c.toString(10);
    return numberI;
}

function hexToARGB(hex) {
	//разделить строку по 2 символа
	var currstr = "", array = [];
	for (var i = 0; i < hex.length; ++i) {
		currstr += hex[i];
		if (currstr.length == 2) {
			array.push(currstr);
			// обнуляем строку
			currstr = "";
		}
	}
	
    return [componentToInt(array[0]), componentToInt(array[1]), componentToInt(array[2]), componentToInt(array[3])];
}

//get colors
function getColorAHEXFromARGB(a, r, g, b) {
	return android.graphics.Color.parseColor(argbToAHex(a, r, g, b));
}

function getColorARGBFromAHEX(hex) {
	var array = hexToARGB(hex);
	
	return android.graphics.Color.argb(array[0], array[1], array[2], array[3]);//до Android 8 исключительно
}

//code by Peacestorm (Amb)
function copyText(text) { //not used
    runOnUiThread(function(ctx) {
        var clipboard = ctx.getSystemService(ctx.CLIPBOARD_SERVICE);
        var clip = android.content.ClipData.newPlainText("label", text);
        clipboard.setPrimaryClip(clip);
    });
}

function sendKeyEvent(key) {
    var k = new java.lang.Thread(new java.lang.Runnable({
       run: function() {
            try {
                var inst = new android.app.Instrumentation();
                if (key == "f5") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_F5);
                else if (key == "-") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_NUMPAD_SUBTRACT); //up slight
                else if (key == "+") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_NUMPAD_ADD); //down slight
                else if (key == "<") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_DPAD_LEFT); //left smooth
                else if (key == ">") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_DPAD_RIGHT); //right smooth
                else if (key == "R") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_R);
                else if (key == "Z") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Z);
                else if (key == "enter") inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ENTER);
                else inst.sendKeyDownUpSync(android.view.KeyEvent[key]);
            } catch (e) {
                SummitPE.ctoast("Error sendKeyEvent(#" + e.lineNumber + "): " + e);
            }
        }
    }));
    k.start();
}

function sendServerMessage(text) {
    var sendThread = new java.lang.Thread(new java.lang.Runnable({
       run: function() {
            try {
                var inst = new android.app.Instrumentation;
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_T);
                java.lang.Thread.sleep(100);
                inst.sendStringSync(text);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ENTER);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_BACK);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_BACK);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);
                inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_ESCAPE);

            } catch (e) {
                SummitPE.ctoast("Error sendServerMessage(#" + e.lineNumber + "): " + e);
            }

        }
    }))
    sendThread.start();

}

function confirmScreenSafe() {
    var currentScreen = Utils.currentScreen.toString();
    if (currentScreen == "hud_screen" || currentScreen == "chat_screen" || currentScreen == "death_screen" || currentScreen == "inventory_screen_pocket" || currentScreen == "inventory_screen" || currentScreen == "sign_screen" || currentScreen == "enchanting_screen" || currentScreen == "furnace_screen" || currentScreen == "in_bed_Screen" || currentScreen == "small_chest_screen" || currentScreen == "large_chest_screen" || currentScreen == "shulker_box_screen" || currentScreen == "anvil_screen") {
        return true
    } else {
        //SummitPE.inGame = false;
        return false
    }
}

var uiThread = function(t) { //not used
    ctx.runOnUiThread({
        run: function() {
            try {
                t();
            } catch (e) {
                errorMessage(e);
            };
        }
    });
}

function sleep(millis) { //not used
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}


ModPE.JSON = {
    parse: function(str) {
        return Function("return " + str)();
    }
};

/*
    CODE_TODO

    ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(100);
    let Intent = android.content.Intent;
    let intentURL = new Intent(ctx);
    intentURL.setAction(android.content.Intent.ACTION_VIEW);
    intentURL.setData(android.net.Uri.parse("https://url.com"));
    ctx.startActivity(intentURL);
*/


//Killaura worker (1.0+)
new function() {
    try {
        var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + '/games/com.mojang/minecraftpe/', 'options.txt');
        if (!file.exists()) file.createNewFile();

        var bReader = new java.io.BufferedReader(new java.io.FileReader(file));
        var newFile = new java.lang.StringBuilder();
        var newLine;

        while ((newLine = bReader.readLine()) != null) newFile.append(newLine + "\n");
        newFile = newFile.toString();

        if (newFile.includes('key_key.attack:-99') || !newFile.includes('key_key.attack:81')) {
            newFile = newFile.replace('key_key.attack:-99', 'key_key.attack:81');
            newFile = newFile.replace('key_key.drop:81', 'key_key.drop:-99');

            var stream = new java.io.FileOutputStream(file, false);
            try {
                stream.write(newFile.getBytes());
            } finally {
                stream.close();

                /* if (Launcher.isBlockLauncher()) {
                    SummitPE.ctoast("Settings replaced. Restarting your MCPE...");
                    net.zhuoweizhang.mcpelauncher.ui.NerdyStuffActivity.forceRestart(ctx);
                } else {
                    SummitPE.ctoast("Need restart your MCPE! (KillAura done)");
                } */

                SummitPE.ctoast("Need restart your MCPE! (KillAura done)");
            }
        }
    } catch (error) {
        SummitPE.ctoast(error);
    }
}();

var Timings = {
    processing: new org.json.JSONObject(),
    timingData: new org.json.JSONObject(),
    startTiming: function(funcName) {
        this.processing.put(funcName, java.lang.System.currentTimeMillis());
    },
    stopTiming: function(funcName) {
        this.timingData.put(funcName, java.lang.System.currentTimeMillis() - this.processing.optLong(funcName, -1));
    },
    getTimingData: function() {
        return this.timingData;
    },
    resetTiming: function(funcName) {
        this.timingData.put(funcName, 0);
    }
};

var CommandManager = {
    cmdModules: new Array(),
    cmdNames: new Array(),
    cmdBlacklist: ["login", "log", "legit", "register", "reg"],
    onCommand: function(cmd) {
        cmd = cmd.split(" ");
        var command = cmd.shift().toLowerCase();
        var args = cmd;
        var module = null;
        var found = false;
        this.cmdNames.forEach(function(entry, index) {
            if (found == false) {
                entry.forEach(function(entry2) {
                    if (entry2.toLowerCase() == command) {
                        found = true;
                        module = CommandManager.cmdModules[index];

                        if (!args[0]) args[0] = "";
                    }
                });
            }
        });
        if (module != null)
            module.onCall(args);
        else
            SummitPE.cmsg("Command \"" + command + "\" not found");
    },
    isBlacklisted: function(cmd) {
        cmd = cmd.split(" ").shift().toLowerCase();
        this.cmdBlacklist.forEach(function(entry) {
            if (entry.equals(cmd))
                return true;
        });
        return false;
    },
    registerCommand: function(module) {
        this.cmdModules.push(module);
        this.cmdNames.push(module.alias);
    }
};

var FriendManager = {
    all: new org.json.JSONArray(),
    isFriend: function(name) {
        var is = false;
        if (name == null) return false;
        var cname = Utils.Text.clean(name.toString().toLowerCase());

        for (var i = 0; i < this.all.length(); i++) {
            if (cname.toString().toLowerCase() == this.all.getString(i).toLowerCase()) is = true;
        }
        return is;
    },
    loadFromFile: function() {
        try {
            var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/", "friends.dat");
            var readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
            var data = new java.lang.StringBuilder();
            var string;
            while ((string = readed.readLine()) != null) {
                data.append(string);

            }
            try {
                this.all = new org.json.JSONArray(data.toString());
            } catch (e) {
                SummitPE.ctoast("Friend data corrupt. Devaring your friend list(" + e);
            }
        } catch (e) {
            //Seems like theres no file
        }
    },
    saveToFile: function() {
        var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE");
        if (!dir.exists()) dir.mkdir();
        var file = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/SummitPE/", "friends.dat");
        if (!file.exists()) file.createNewFile();
        var stream = new java.io.FileOutputStream(file);
        try {
            stream.write(this.all.toString().getBytes());
        } finally {
            stream.close();
        }
    },
    addFriend: function(name) {
        this.all.put(name);
        this.saveToFile();
    },
    removeFriend: function(name) {
        var tempall = new org.json.JSONArray();
        for (var i = 0; i < this.all.length(); i++) {
            if (this.all.getString(i).toLowerCase() != name.toString().toLowerCase()) tempall.put(this.all.getString(i));
        }
        this.all = tempall;
        this.saveToFile();
    }
};
FriendManager.loadFromFile();

var ModuleType = {
    mod: 1,
    special: 2,
    command: 3,
    cmd: 3,
    toName: function(type) {
        switch (type) {
            case ModuleType.mod:
                return Languages.getString("moduvarype_mod");
                break;
            case ModuleType.special:
                return Languages.getString("moduvarype_special");
                break;
            case ModuleType.command:
                return Languages.getString("moduvarype_command");
                break;
            default:
                return "unknown";
        }
    }
};

var ModCategory = {
    MOVEMENT: 1,
    COMBAT: 2,
    RENDER: 3,
    MISC: 4,
    PLAYER: 5,
    SPECIAL: 6,
    GROUP: 7,
    EXPLOITS: 8,
    toName: function(c) {
        switch (c) {
            case 1:
                return "Movement";
            case 2:
                return "Combat";
            case 3:
                return "Render";
            case 4:
                return "Misc";
            case 5:
                return "Player";
            case 6:
                return "Special";
            case 7:
                return "Group";
            case 8:
                return "Exploits";
            default:
                return "UNKNOWN(" + c + ")";
        }
    }
};

var BypassMode = {
    VANILLA: 0,
    DEFAULT: 0,
    LBSG: 1,
    FACILITY: 2
};
var SpeedMode = {
    DEFAULT: 0,
    LONGJUMP: 1
};
var getStyledBtnBackground = function(state, toggleable) {
    var bg = android.graphics.drawable.GradientDrawable();
    bg.setCornerRadius(1);
    bg.setColor(getColorAHEXFromARGB(80, 0, 0, 0));
    if (state) bg.setColor(getColorAHEXFromARGB(210, 0, 200, 0));
    if (toggleable == false) bg.setColor(getColorAHEXFromARGB(210, 230, 150, 30));
    bg.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
    bg.setStroke(dip2px(2), getColorAHEXFromARGB(230, 0, 0, 0));
};
var Themes = {
    DEFAULT: {
        font: android.os.Build.VERSION.SDK_INT >= 17 ? android.graphics.Typeface.create("sans-serif-light", android.graphics.Typeface.NORMAL) : android.graphics.Typeface.DEFAULT,
        ModButton: {
            Neutral: {
                textColor: android.graphics.Color.WHITE,
                background: getStyledBtnBackground(false, false)
            },
            Activated: {
                textColor: android.graphics.Color.WHITE,
                background: getStyledBtnBackground(true, true)
            },
            Deactivated: {
                textColor: android.graphics.Color.WHITE,
                background: getStyledBtnBackground(false, true)
            }
        }

    }
};

var Utils = {
    bypassMode: BypassMode.DEFAULT,
    speedMode: SpeedMode.DEFAULT,
    online: false,
    flyTick: 0,
    modsCount: 0,
    currentSearchCount: 0,
    font: android.os.Build.VERSION.SDK_INT >= 17 ? android.graphics.Typeface.create("sans-serif-light", android.graphics.Typeface.NORMAL) : android.graphics.Typeface.DEFAULT,
    Render: {
        getFloatBuffer: function(fArray) {
            var bBuffer = java.nio.ByteBuffer.allocateDirect(fArray.length * 4);
            bBuffer.order(java.nio.ByteOrder.nativeOrder());

            var fBuffer = bBuffer.asFloatBuffer();
            fBuffer.put(fArray);
            fBuffer.position(0);
            return fBuffer;
        },
        getShortBuffer: function(sArray) {
            var bBuffer = java.nio.ByteBuffer.allocateDirect(sArray.length * 2);
            bBuffer.order(java.nio.ByteOrder.nativeOrder());

            var sBuffer = bBuffer.asShortBuffer();
            sBuffer.put(sArray);
            sBuffer.position(0);
            return sBuffer;
        },
        renderer: null,
        glSurface: null,
        fov: 90,
        initted: false,
        init: function() {
            if (!SummitPE.enableOpenGL)
                return;
            var options = Utils.File.getTextFromFile(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/", "options.txt"));

            options = options.split("\n");
            options.forEach(function(entry) {
                var suboption = entry.split(":");
                if (suboption[0] == "gfx_field_of_view") {
                    Utils.Render.fov = suboption[1];

                }
            });
            this.renderer = new android.opengl.GLSurfaceView.Renderer({
                onSurfaceCreated: function(gl, config) {
                    var GL10 = javax.microedition.khronos.opengles.GL10;
                    gl.glClearColor(0, 0, 0, 0);
                    gl.glShadeModel(GL10.GL_SMOOTH);
                    gl.glClearDepthf(1.0);
                    gl.glDisable(GL10.GL_DITHER);
                    gl.glEnable(GL10.GL_DEPTH_TEST);
                    gl.glDepthFunc(GL10.GL_LEQUAL);
                    gl.glHint(GL10.GL_PERSPECTIVE_CORRECTION_HINT, GL10.GL_NICEST);
                },
                onSurfaceChanged: function(gl, width, height) {
                    var GL10 = javax.microedition.khronos.opengles.GL10;
                    gl.glMatrixMode(GL10.GL_PROJECTION);
                    gl.glLoadIdentity();
                    android.opengl.GLU.gluPerspective(gl, Utils.Render.fov, width / height, 0.1, 100);
                    gl.glMatrixMode(GL10.GL_MODELVIEW);
                    gl.glLoadIdentity();
                },
                onDrawFrame: function(gl) {
                    Timings.startTiming("gl_clear");
                    var GL10 = javax.microedition.khronos.opengles.GL10;
                    gl.glClear(GL10.GL_COLOR_BUFFER_BIT | GL10.GL_DEPTH_BUFFER_BIT);
                    gl.glLoadIdentity();
                    Timings.stopTiming("gl_clear");
                    //if (playerEsp.state || chesttracers.state || tracers.state || teleport.state)
                    if (confirmScreenSafe() || SummitPE.inGame) {
                        try {
                            Timings.startTiming("gl_lookAt");
                            gl.glDisable(GL10.GL_LIGHTING);
                            var yaw = getYaw() % 360;
                            var pitch = getPitch() % 360;
                            var eyeX = getPlayerX();
                            var eyeY = getPlayerY() + 1;
                            var eyeZ = getPlayerZ();

                            var dCenterX = Math.sin(yaw / 180 * Math.PI);
                            var dCenterZ = Math.cos(yaw / 180 * Math.PI);
                            var dCenterY = Math.sqrt(dCenterX * dCenterX + dCenterZ * dCenterZ) * Math.tan((pitch - 180) / 180 * Math.PI);

                            var centerX = eyeX - dCenterX;
                            var centerZ = eyeZ + dCenterZ;
                            var centerY = eyeY - dCenterY;

                            android.opengl.GLU.gluLookAt(gl, eyeX, eyeY, eyeZ, centerX, centerY, centerZ, 0, 1.0, 0);

                            Timings.stopTiming("gl_lookAt");
                            Timings.startTiming("gl_onRender");
                            SummitPE.mods.forEach(function(entry, index, array) {
                                try {
                                    if ((!entry.isStateMode() || entry.state) && entry.hasOwnProperty("onRender"))
                                        entry.onRender(gl);
                                } catch (e) {}
                            });
                            Timings.stopTiming("gl_onRender");
                        } catch (e) {
                            SummitPE.ctoast("RenderProblem: " + e);
                        }

                    } else {
                        Timings.resetTiming("gl_lookAt");
                        Timings.resetTiming("gl_onRender");
                    }
                }
            });
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    Utils.Render.glSurface = new android.opengl.GLSurfaceView(ctx);
                    Utils.Render.glSurface.setZOrderOnTop(true);

                    Utils.Render.glSurface.setEGLConfigChooser(8, 8, 8, 8, 16, 0);
                    Utils.Render.glSurface.getHolder().setFormat(android.graphics.PixelFormat.TRANSLUCENT);
                    Utils.Render.glSurface.setRenderer(Utils.Render.renderer);
                    Utils.Render.glSurface.setRenderMode(0);

                    ctx.getWindow().getDecorView().addView(Utils.Render.glSurface);

                    Utils.Render.initted = true;
                }
            }));

        },
        drawBox: function(gl, x, y, z, xsize, ysize, zsize) {
            if (!SummitPE.enableOpenGL)
                return;
            var GL10 = javax.microedition.khronos.opengles.GL10;
            var size = new Array(xsize, ysize, zsize);
            var vertices = [
                0, 0, 0,
                size[0], 0, 0,
                0, 0, size[2],
                size[0], 0, size[2],

                0, size[1], 0,
                size[0], size[1], 0,
                0, size[1], size[2],
                size[0], size[1], size[2]
            ];
            var vertexBuffer = Utils.Render.getFloatBuffer(vertices);
            var lineIndices = [
                0, 1,
                0, 2,
                0, 4,

                3, 1,
                3, 2,
                3, 7,

                5, 4,
                5, 7,
                5, 1,

                6, 4,
                6, 7,
                6, 2
            ];
            var polyIndices = [
                0, 1, 4,
                1, 4, 5,

                2, 3, 6,
                7, 6, 3,

                1, 3, 7,
                7, 1, 5,

                0, 2, 6,
                6, 0, 4,

                0, 1, 2,
                3, 1, 2,

                4, 5, 6,
                7, 5, 6
            ];
            var lineBuffer = Utils.Render.getShortBuffer(lineIndices);
            var polyBuffer = Utils.Render.getShortBuffer(polyIndices);
            gl.glTranslatef(x, y, z);
            gl.glFrontFace(GL10.GL_CCW);
            gl.glEnable(GL10.GL_BLEND);
            //gl.glEnable(GL10.GL_LINE_SMOOTH);
            gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
            gl.glLineWidth(4);
            gl.glColor4f(0.0, 1.0, 0.0, 0.7);
            gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
            gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
            gl.glDrawElements(GL10.GL_LINES, lineIndices.length, GL10.GL_UNSIGNED_SHORT, lineBuffer);
            gl.glColor4f(0.0, 1.0, 0.0, 0.3);
            gl.glDrawElements(GL10.GL_TRIANGLES, polyIndices.length, GL10.GL_UNSIGNED_SHORT, polyBuffer);
            gl.glDisable(GL10.GL_LINE_SMOOTH);
            gl.glTranslatef(-x, -y, -z);
        },
        drawLine: function(gl, x, y, z, x2, y2, z2) {
            if (!SummitPE.enableOpenGL)
                return;
            var GL10 = javax.microedition.khronos.opengles.GL10;
            var size = new Array(x2, y2, z2);
            var vertices = [
                0, 0, 0,
                x2 - x, y2 - y, z2 - z
            ];
            var vertexBuffer = Utils.Render.getFloatBuffer(vertices);
            var indices = [
                0, 1
            ];
            var indexBuffer = Utils.Render.getShortBuffer(indices);
            gl.glTranslatef(x, y, z);
            gl.glEnable(GL10.GL_BLEND);
            gl.glDepthMask(false);
            //gl.glEnable(GL10.GL_LINE_SMOOTH);
            gl.glBlendFunc(GL10.GL_SRC_ALPHA, GL10.GL_ONE_MINUS_SRC_ALPHA);
            gl.glLineWidth(4);
            gl.glColor4f(0.0, 1.0, 0.0, 0.4);
            gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
            gl.glVertexPointer(3, GL10.GL_FLOAT, 0, vertexBuffer);
            gl.glDrawElements(GL10.GL_LINES, indices.length, GL10.GL_UNSIGNED_SHORT, indexBuffer);
            gl.glTranslatef(-x, -y, -z);
            gl.glDepthMask(true);
            gl.glDisable(GL10.GL_LINE_SMOOTH);
        }
    },
    Theme: {
        current: Themes.DEFAULT
    },
    Screen: {
        currentScreen: "",
        INGAME: "hud_screen"
    },
    Url: {
        getUrlContents: function(url, result) {
            var t = new java.lang.Thread(new java.lang.Runnable({
                run: function() {
                    try {
                        var u = new java.net.URL(url);
                        var allCont = new java.lang.StringBuilder();
                        var con = u.openConnection();
                        con.setIfModifiedSince(0);
                        con.setRequestProperty("User-Agent", "Mozilla/5.0");
                        con.setRequestProperty("Accept-Encoding", "UTF-8");
                        var reader = new java.io.BufferedReader(new java.io.InputStreamReader(con.getInputStream(), "UTF-8"));
                        var line = "";
                        while ((line = reader.readLine()) != null)
                            allCont.append(line + "\n");
                        reader.close();
                        result(allCont.toString(), null);
                    } catch (e) {
                        SummitPE.ctoast(e);
                        result(null, e);
                    }
                }
            }));
            t.start();
        }
    },
    File: {
        SummitPEDir: android.os.Environment.getExternalStorageDirectory() + "/SummitPE/",
        getTextFromFile: function(file) {

            var readed = (new java.io.BufferedReader(new java.io.FileReader(file)));
            var data = new java.lang.StringBuilder();
            var string;
            while ((string = readed.readLine()) != null)
                data.append(string + "\n");
            return data.toString();
        },
        saveTextToFile: function(file, text) {
            if (!file.exists()) file.createNewFile();
            var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, text.length());
            for (var i = 0; i < text.length(); i++) bytes[i] = text.charCodeAt(i);
            var stream = new java.io.FileOutputStream(file);
            try {
                stream.write(bytes);
            } finally {
                stream.close();
            }
        }
    },
    Base64: {
        encode: function(text) {

            var bytes = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, text.length());
            for (var i = 0; i < text.length(); i++) bytes[i] = new java.lang.Byte(new String(text).charCodeAt(i));
            return android.util.Base64.encodeToString(bytes, 0);
        },
        decode: function(text) {
            return android.util.Base64.decode(text, 0);
        }
    },
    Text: {
        clean: function(text) {
            var allColor = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "k", "l", "m", "n", "o", "r"];

            if (text != null) {

                allColor.forEach(function(entry) {
                    text = text.replace(new RegExp("\u00A7" + entry, 'g'), "");
                });
                return text;
            } else
                return "";
        }
    },
    vector: {
        toDirectionalVector: function(vector, yaw, pitch) {
            vector[0] = Math.cos(yaw) * Math.cos(pitch);
            vector[1] = Math.sin(pitch);
            vector[2] = Math.sin(yaw) * Math.cos(pitch);

            return vector;
        }
    },
    ModSettings: {
        getSlider: function() {
            return new android.widget.SeekBar(ctx);
        },
    },
    Block: {
        isLiquid: function(id) {
            if (id >= 8 && id <= 11) return true;
            return false;
        },
        rayTrace: function(dir, pos, radius) {
            /*
            Taken from  https://raw.githubusercontent.com/zhuowei/ModPEScripts/master/500ise_paintbrush.js
            Originally Taken from https://raw.github.com/Overv/MineAssemble/master/reference/src/mineassemble.c .
            An implementation of http://www.cse[1]orku.ca/~amana/research/grid.pdf
            (modified with guidance from http://gamedev.stackexchange.com/questions/47362/cast-ray-to-select-block-in-voxel-game)
            Thus, this below method is:
            Copyright (C) 2013 Alexander Overvoorde
            Permission is hereby granted, free of charge, to any person obtaining a copy of
            this software and associated documentation files (the "Software"), to deal in
            the Software without restriction, including without limitation the rights to
            use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
            the Software, and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
            FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
            COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
            IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
             */
            var result = {};
            if (dir[0] == 0.0 && dir[1] == 0.0 && dir[2] == 0.0) {
                result.hit = false;
                return result;
            }
            var start = pos.slice(0);

            var x = Math.floor(pos[0]);
            var y = Math.floor(pos[1]);
            var z = Math.floor(pos[2]);

            var x_dir = dir[0] >= 0.0 ? 1 : -1;
            var y_dir = dir[1] >= 0.0 ? 1 : -1;
            var z_dir = dir[2] >= 0.0 ? 1 : -1;

            var dx_off = x_dir > 0 ? 1.0 : 0.0;
            var dy_off = y_dir > 0 ? 1.0 : 0.0;
            var dz_off = z_dir > 0 ? 1.0 : 0.0;




            var radius2 = radius * radius;

            while (true) {
                var dx = start[0] - pos[0];
                var dy = start[1] - pos[1];
                var dz = start[2] - pos[2];
                var dist2 = dx * dx + dy * dy + dz * dz;
                if (dist2 > radius2) {
                    result.hit = false;


                    return result;
                }

                if (getTile(x, y, z) != 0) {
                    var dist = Math.sqrt(dist2);

                    pos[0] -= x;
                    pos[1] -= y;
                    pos[2] -= z;

                    result.hit = true;
                    result.x = x;
                    result.y = y;
                    result.z = z;
                    result.dist = dist;

                    return result;

                }

                dx = x - pos[0] + dx_off;
                dy = y - pos[1] + dy_off;
                dz = z - pos[2] + dz_off;

                var t1 = dx / dir[0];
                var t2 = dy / dir[1];
                var t3 = dz / dir[2];

                if (t1 <= t2 && t1 <= t3) {
                    pos[0] += dx;
                    pos[1] += t1 * dir[1];
                    pos[2] += t1 * dir[2];
                    x += x_dir;
                }
                if (t2 <= t1 && t2 <= t3) {
                    pos[0] += t2 * dir[0];
                    pos[1] += dy;
                    pos[2] += t2 * dir[2];
                    y += y_dir;
                }
                if (t3 <= t1 && t3 <= t2) {
                    pos[0] += t3 * dir[0];
                    pos[1] += t3 * dir[1];
                    pos[2] += dz;
                    z += z_dir;
                }
            }
        },
        getNearestBlock: function(blocks, maxrange) {
            var small = maxrange;
            var block = null;
            var much = 0;

            blocks.forEach(function(entry) {
                var x = entry[0] - getPlayerX();
                var y = entry[1] - getPlayerY();
                var z = entry[2] - getPlayerZ();

                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                if (dist >= small || dist <= 0.001) return;

                small = dist;
                block = entry;


            });

            return block;
        },
        crosshairAimAtBlock: function(block, pos, yDeny) {
            if (block != null) {
                var x = block[0] - getPlayerX();
                var y = block[1] - getPlayerY();
                var z = block[2] - getPlayerZ();
                if (pos != null && pos instanceof Array) {

                    x = block[0] - pos[0];
                    y = block[1] - pos[1];
                    z = block[2] - pos[2];
                }
                y += 0.5;

                //равнозначно Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
                var len = Math.sqrt(x * x + y * y + z * z);
                var deg_rad = 180 / Math.PI;
                if (!yDeny) {
                    y = y / len;
                    var pitch = Math.asin(y);
                    pitch = pitch * deg_rad;
                    pitch = -pitch;
                } else {
                    var pitch = getPitch(Player.getEntity());
                }
                var yaw = -Math.atan2(x, z) * deg_rad;
                if (pitch < 89 && pitch > -89) {
                    Entity.setRot(Player.getEntity(), yaw, pitch);
                }
            }
        }
    },
    Player: {
        isInWater: function() {
            if (Utils.Block.isLiquid(getTile(getPlayerX() + 0.5, getPlayerY() - 1.5, getPlayerZ() + 0.5))) return true;
            return false;
        },
        isOnLadder: function() {
            if (getTile(getPlayerX() + 0.5, getPlayerY() - 1.5, getPlayerZ() + 0.5) == 65 || getTile(getPlayerX() + 0.5, getPlayerY() - 1.5, getPlayerZ() + 0.5) == 106) return true;
            return false;
        },
        isAtEdge: function() {

        },
        isFall: function() {
            var velocityFall = -0.07840000092983246;
            if (!Utils.Player.onGround() && Entity.getVelY(Player.getEntity()) < velocityFall) return true;
            return false;
        },
        overGround: function() {
            var y = getPlayerY();
            while (y > 2) y -= 2;

            if ((Math.round(y * 100) >= 61 && Math.round(y * 100) <= 63) && getTile(getPlayerX(), getPlayerY() - 2.15, getPlayerZ()) != 0 && !Utils.Block.isLiquid(getTile(getPlayerX(), getPlayerY() - 2.15, getPlayerZ()))) return true;
            if ((Math.round(y * 100) >= 11 && Math.round(y * 100) <= 13) && getTile(getPlayerX(), getPlayerY() - 2.15, getPlayerZ()) != 0 && !Utils.Block.isLiquid(getTile(getPlayerX(), getPlayerY() - 2.15, getPlayerZ()))) return true;
            return false;
        },
        onGround: function() {
            var y = getPlayerY();
            while (y > 1) y -= 1;

            if ((Math.round(y * 100) >= 61 && Math.round(y * 100) <= 63) && getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()) != 0 && !Utils.Block.isLiquid(getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()))) return true;
            if ((Math.round(y * 100) >= 11 && Math.round(y * 100) <= 13) && getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()) != 0 && !Utils.Block.isLiquid(getTile(getPlayerX(), getPlayerY() - 1.65, getPlayerZ()))) return true;
            return false;
        },
        isCollidedHorizontally: function() {
            var x = getPlayerX();
            var z = getPlayerZ();
            var blockX = Math.round(x - 0.5);
            var blockZ = Math.round(z - 0.5);
            while (x < 1) x += 1;
            while (z < 1) z += 1;
            while (x > 1) x -= 1;
            while (z > 1) z -= 1;

            if (Math.round(x * 100) == 31) x -= 0.01;
            if (Math.round(z * 100) == 31) z -= 0.01;
            if (Math.round(x * 100) == 69) x += 0.01;
            if (Math.round(z * 100) == 69) z += 0.01;
            if (Math.round(x * 100) == 30) blockX--;
            if (Math.round(z * 100) == 30) blockZ--;
            if (Math.round(x * 100) == 70) blockX++;
            if (Math.round(z * 100) == 70) blockZ++;
            if (getTile(blockX, getPlayerY(), blockZ) == 0 && getTile(blockX, getPlayerY() - 1, blockZ) == 0 && getTile(blockX, getPlayerY() - 0.5, blockZ) == 0 && getTile(blockX, getPlayerY() + 0.2, blockZ) == 0 && getTile(blockX, getPlayerY() - 1.6, blockZ) == 0) return false;

            if (Block.getDestroyTime(getTile(blockX, getPlayerY() - 1, blockZ)) <= 0.1 && Block.getDestroyTime(getTile(blockX, getPlayerY(), blockZ)) <= 0.1) return false;

            if (Math.round(x * 100) == 30 || Math.round(x * 100) == 70) return true;
            if (Math.round(z * 100) == 30 || Math.round(z * 100) == 70) return true;
            return false;
        },
        rotatePlayer: function(yaw, pitch) {
            var curY = Entity.getYaw(getPlayerEnt());

            var diff = Math.abs((yaw) - (curY));
            var eq = (yaw) - (curY);
            var i;
            if (curY > yaw) {
                for (i = 0; i < diff; i++) {
                    curY = Entity.getYaw(getPlayerEnt());
                    if (curY < yaw) {
                        i = diff
                    }
                    //var inst = new android.app.Instrumentation();
                    //inst.sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_DPAD_LEFT);
                    sendKeyEvent("KEYCODE_DPAD_LEFT");
                }
            } else {
                for (i = 0; i < diff; i++) {
                    curY = Entity.getYaw(getPlayerEnt());
                    if (curY > yaw) {
                        i = diff
                    }
                    sendKeyEvent("KEYCODE_DPAD_RIGHT");
                }
            }
        }
    },
    Vel: {
        lastX: 0,
        lastY: 0,
        lastZ: 0,
        calang_lateSpeed: function() {
            return Math.sqrt(Math.pow(Entity.getVelX(getPlayerEnt()), 2) + Math.pow(Entity.getVelZ(getPlayerEnt()), 2));
        }
    },
    Item: {
        getDamage: function(id) {
            switch (id) {
                //Swords
                case 268:
                case 283:
                    return 5;
                    break;
                case 272:
                    return 6;
                    break;
                case 267:
                    return 7;
                    break;
                case 276:
                    return 8;
                    break;
                    //Axe
                case 271:
                case 286:
                    return 4;
                    break;
                case 275:
                    return 5;
                    break;
                case 258:
                    return 6;
                    break;
                case 279:
                    return 7;
                    break;
            }
        }
    },
    Pos: {
        lastX: 0,
        lastY: 0,
        lastZ: 0
    },
    Entity: {
        getAll: function() {
            if (Launcher.isToolbox()) {
                return Entity.getAll();
            } else {
                return Utils.Entity.allEntitys;
            }
        },
        targettedMobs: [true, true],
        /*first mobs second players*/
        allEntitys: new Array(),
        charEnts: new Array(),
        crosshairAimAt: function(ent, pos) {
            if (ent != null) {
                var x = Entity.getX(ent) - getPlayerX();
                var y = Entity.getY(ent) - getPlayerY();
                var z = Entity.getZ(ent) - getPlayerZ();
                if (pos != null && pos instanceof Array) {

                    x = Entity.getX(ent) - pos[0];
                    y = Entity.getY(ent) - pos[1];
                    z = Entity.getZ(ent) - pos[2];
                }
                if (Entity.getEntityTypeId(ent) != 63)
                    y += 0.5;

                var len = Math.sqrt(x * x + y * y + z * z);
                y = y / len;
                var pitch = Math.asin(y);
                var deg_rad = 180 / Math.PI;
                pitch = pitch * deg_rad;
                pitch = -pitch;
                var yaw = -Math.atan2(x, z) * deg_rad;
                if (pitch < 89 && pitch > -89) {
                    Entity.setRot(Player.getEntity(), yaw, pitch);
                }
            }
        },
		crosshairAimAtTwo: function(ent, pos, keyMode) { //почти crosshairAimAt, но чуть другое, также возможность использовать клавиши
            if (ent != null) {
                var x = Entity.getX(ent) - getPlayerX();
                var y = Entity.getY(ent) - getPlayerY();
                var z = Entity.getZ(ent) - getPlayerZ();
				
                if (pos != null && pos instanceof Array) {
                    x = Entity.getX(ent) - pos[0];
                    y = Entity.getY(ent) - pos[1];
                    z = Entity.getZ(ent) - pos[2];
                }
				
                if (Entity.getEntityTypeId(ent) != 63) y += 0.5;
                var a = 0.5 + Entity.getX(ent);
                var b = Entity.getY(ent);
                var c = 0.5 + Entity.getZ(ent);
                var len = Math.sqrt(x * x + y * y + z * z);
                var y = y / len;
                var pitch = Math.asin(y);
                pitch = pitch * 180.0 / Math.PI;
                pitch = -pitch;
                var yaw = -Math.atan2(a - (Player.getX() + 0.5), c - (Player.getZ() + 0.5)) * (180 / Math.PI);
                y_ = yaw;
                p_ = pitch;
                if (pitch < 89 && pitch > -89) {
                    if (keyMode) {
                        Utils.Player.rotatePlayer(y_, p_ - 2);
                    } else {
                        Entity.setRot(Player.getEntity(), yaw, pitch - 2);
                    }
                }
            }
        },
		bowAimAt: function(ent) {
            var deg_rad = 180 / Math.PI;
            var posX = Entity.getX(ent) - Player.getX();
            var posY = Entity.getEntityTypeId(ent) == EntityType.PLAYER ? Entity.getY(ent) - Player.getY() : Entity.getY(ent) + 1 - Player.getY();
            var posZ = Entity.getZ(ent) - Player.getZ();
            var yaw = (Math.atan2(posZ, posX) * deg_rad) - 90;
            var len = Math.sqrt(posX * posX + posZ * posZ);
            var g = 0.007;
            var tmp = (1 - g * (g * (Math.pow(len, 2)) + 2 * posY));
            var pitch = deg_rad * -(Math.atan((1 - Math.sqrt(tmp)) / (g * len)));
            if (pitch < 89 && pitch > -89) {
                Entity.setRot(Player.getEntity(), yaw, pitch);
            }

        },
        getNearestEntity: function(maxrange, bypass) {
            var mobs = Utils.Entity.getAll();
            var players = Server.getAllPlayers();

            var small = maxrange;
            var ent = null;
            var much = 0;

            mobs.forEach(function(entry) {
                var x = Entity.getX(entry) - getPlayerX();
                var y = Entity.getY(entry) - getPlayerY();
                var z = Entity.getZ(entry) - getPlayerZ();

                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                if (dist >= small || dist <= 0.001) return;

                if (bypass && y > 0.8) {
                    var xVel = Entity.getVelX(entry);
                    var yVel = Entity.getVelY(entry);
                    var zVel = Entity.getVelZ(entry);
                    if (xVel == 0 && yVel == 0 && zVel == 0)
                        return;
                }


                if (Entity.getEntityTypeId(entry) == 63 && Entity.getNameTag(entry) == "")
                    return;



                if (!(Utils.Entity.targettedMobs[1] == true && Entity.getEntityTypeId(entry) == 63) &&
                    !(Utils.Entity.targettedMobs[0] == true && Entity.getEntityTypeId(entry) < 63)) return;


                if (Entity.getHealth(entry) > 0 && Entity.getNameTag(entry) == "" || FriendManager.isFriend(Entity.getNameTag(entry)) == false) {
                    small = dist;
                    ent = entry;
                }


            });

            players.forEach(function(entry) {
                var x = Entity.getX(entry) - getPlayerX();
                var y = Entity.getY(entry) - getPlayerY();
                var z = Entity.getZ(entry) - getPlayerZ();

                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                if (dist >= small || dist <= 0.001) return;

                if (bypass && y > 0.8) {
                    var xVel = Entity.getVelX(entry);
                    var yVel = Entity.getVelY(entry);
                    var zVel = Entity.getVelZ(entry);
                    if (xVel == 0 && yVel == 0 && zVel == 0)
                        return;
                }


                if (Entity.getEntityTypeId(entry) == 63 && Entity.getNameTag(entry) == "")
                    return;



                if (!(Utils.Entity.targettedMobs[1] == true && Entity.getEntityTypeId(entry) == 63) &&
                    !(Utils.Entity.targettedMobs[0] == true && Entity.getEntityTypeId(entry) < 63)) return;


                if (Entity.getHealth(entry) > 0 && Entity.getNameTag(entry) == "" || FriendManager.isFriend(Entity.getNameTag(entry)) == false) {
                    small = dist;
                    ent = entry;
                }

            });

            return ent;
        }
    }
};

var UpdateManager = {
    version: "1.2.1",
    stableVer: "Loading",
    stableInfo: null,
    devInfo: null,
    scriptLoader: null,
    autoUpdate: false,
    init: function() {
        if (Launcher.isBlockLauncher()) {
            this.scriptLoader = net.zhuoweizhang.mcpelauncher.ScriptManager;
        } else if (Launcher.isToolbox()) {
            //this.scriptLoader = eval (ctx.getPackageName() + ".MinecraftActivity");
            //this.scriptLoader = io.mrarm.mcpelauncher.modpe.ModPEScriptLoader;
        } else {
            //SummitPE.ctoast("You are using an unsupported Launcher. The auto updater wont work");
            return;
        }
        this.downloadStableInfo();
    },
    downloadStableInfo: function() {
        Utils.Url.getUrlContents("https://api.github.com/repos/SummitPE-Menu/SummitPE-Menu/releases/latest", function(cont, err) {
            if (err == null && cont != "") {
                UpdateManager.stableInfo = new org.json.JSONObject(cont);
            } else {
                SummitPE.ctoast("StableDownloadError: " + err);

            }
            UpdateManager.downloadDevInfo();
        });
    },
    downloadDevInfo: function() {
        Utils.Url.getUrlContents("https://api.github.com/repos/SummitPE-Menu/SummitPE-Menu/commits", function(cont, err) {
            if (cont != null && cont != "") {
                var arr = new org.json.JSONArray(cont);
                UpdateManager.devInfo = arr.getJSONObject(0);
            } else {
                SummitPE.ctoast("DevDownloadError: " + err);
            }
            UpdateManager.checkForUpdate();
        });
    },
    checkForUpdate: function() {
        if (this.stableInfo == null)
            return;
        if (this.stableInfo.getString("tag_name") != UpdateManager.version && this.stableInfo.getString("tag_name").replace("v", "") != UpdateManager.version) {
            SummitPE.ctoast("New stable version available: " + this.stableInfo.getString("tag_name") + "\nCurrent version: " + UpdateManager.version);
        }

        if (this.autoUpdate) this.downloadUpdate();
    },
    downloadUpdate: function() {
        var download_r = new android.app.DownloadManager.Request(new android.net.Uri.parse("https://www.idkdjsjjsjs.com/update.js"));
        download_r.setTitle("SummitPE_new47738483.js");
        download_r.setDestinationInExternalPublicDir("/Download", "SummitPE_new47738483.js");
        download_r.setDescription("Downloading SummitPE Update");
        download_r.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
        ctx.getSystemService(ctx.DOWNLOAD_SERVICE).enqueue(download_r);
        SummitPE.ctoast("Downloading File");
    }
};
//UpdateManager.init(); //Эта утилита не имеет гитхаба

SummitPE.loadModsAnim = function(progress) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            new android.os.Handler()
                .postDelayed(new java.lang.Runnable({
                    run: function() {
                        ModPE.langEdit("menu.copyright", "© Mojang AB | mod SummitPE: " + progress + " Modules loaded");
                        if (progress < Utils.modsCount) SummitPE.loadModsAnim(progress + 1);
                    }
                }), 100);
        }
    }));
}

/*
Обновление: (TODO list)
 
Заменено android.graphics.Color.argb(90, 255, 255, 255)
На       android.graphics.Color.parseColor("#ffffff")
 
.setAlpha(255);
//0-255, 0 - полностью прозрачный, 255 - полностью непрозрачный
 
Для корректного отображения цвета на Android 8+

Сделано, была написана функция getColorAHEXFromARGB
*/

SummitPE.getStyledBackground = function() {
    var bg = new android.graphics.drawable.GradientDrawable();
    bg.setCornerRadius(1);
    bg.setColor(getColorAHEXFromARGB(90, 255, 255, 255));
    bg.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
    bg.setStroke(dip2px(2), getColorAHEXFromARGB(210, 0, 0, 0));
    return bg;
}

SummitPE.getStyledBtnBackground = function(state, toggleable) {
    var bg = android.graphics.drawable.GradientDrawable();
    bg.setCornerRadius(1);
    bg.setColor(getColorAHEXFromARGB(80, 0, 0, 0));
    if (state) bg.setColor(getColorAHEXFromARGB(210, 0, 200, 0));
    if (toggleable == false) bg.setColor(getColorAHEXFromARGB(210, 230, 150, 30));
    bg.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
    bg.setStroke(dip2px(2), getColorAHEXFromARGB(230, 0, 0, 0));
    return bg;
}

SummitPE.xScrolled = 0;
SummitPE.yScrolled = 0;

SummitPE.pxToMeter = function(px) {
    return (px / android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_MM, 1, ctx.getResources().getDisplayMetrics())) / 1000;
}

SummitPE.getMetersScrolled = function() {
    var justScrolled = SummitPE.pxToMeter(SummitPE.xScrolled + SummitPE.yScrolled);
    justScrolled += SummitPE.metersScrolled;
    editor.putInt("SummitPE.egg.metersScrolled", justScrolled);
    editor.commit();

    return justScrolled;
}

SummitPE.scrollView = function(context) {
    var scrollView = new android.widget.ScrollView(context);

    try {
        if (android.os.Build.VERSION.SDK_INT > 22)
            scrollView.setOnScrollChangeListener(new android.view.View.OnScrollChangeListener({
                onScrollChange: function(view, scrollX, scrollY, oldScrollX, oldScrollY) {
                    SummitPE.xScrolled += Math.abs(scrollX - oldScrollX);
                    SummitPE.yScrolled += Math.abs(scrollY - oldScrollY);
                }
            }));
    } catch (e) {}
    return scrollView;
}

SummitPE.showModDialog = function(mod) {
    if (mod.isNewDialog) {
        mod.showDialog();
    } else {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var display = new android.util.DisplayMetrics();
                    com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                        .getWindowManager()
                        .getDefaultDisplay()
                        .getMetrics(display);
                    var content = new android.widget.RelativeLayout(ctx);
                    content.setId(9472729);
                    var contentScroll = new SummitPE.scrollView(ctx);
                    contentScroll.setId(492628);
                    //default content
                    var modTitle = new android.widget.TextView(ctx);
                    //modTitle.setText(android.text.Html.fromHtml("<u>" + mod.name + "</u>"));
                    mod.onRefresh(modTitle);
                    modTitle.setTextSize(dip2px(20));
                    modTitle.setGravity(android.view.Gravity.CENTER);
                    modTitle.setTextColor(android.graphics.Color.BLACK);
                    modTitle.setTypeface(Utils.font);
                    modTitle.setId(94771);
                    var modTypeText = new android.widget.TextView(ctx);
                    modTypeText.setText(Languages.getString("moddialog_type") + ": " + ModuleType.toName(mod.type));
                    modTypeText.setGravity(android.view.Gravity.CENTER);
                    modTypeText.setTextColor(android.graphics.Color.BLACK);
                    modTypeText.setTextSize(dip2px(10));
                    modTypeText.setTypeface(Utils.font);
                    modTypeText.setId(93922);
                    var modDescTitle = new android.widget.TextView(ctx);
                    modDescTitle.setText(Languages.getString("moddialog_description") + ":");
                    modDescTitle.setGravity(android.view.Gravity.CENTER);
                    modDescTitle.setTextColor(android.graphics.Color.BLACK);
                    modDescTitle.setTextSize(dip2px(11));
                    modDescTitle.setTypeface(Utils.font);
                    modDescTitle.setId(29582);
                    var modDescText = new android.widget.TextView(ctx);
                    modDescText.setText(mod.desc);
                    modDescText.setGravity(android.view.Gravity.CENTER);
                    modDescText.setTextSize(dip2px(10));
                    modDescText.setTypeface(Utils.font);
                    modDescText.setTextColor(android.graphics.Color.BLACK);
                    modDescText.setId(29285);
                    //settings
                    var modSettings = new android.widget.LinearLayout(ctx);
                    modSettings.setOrientation(1);
                    if (mod.getSettingsLayout) {
                        var params = new android.widget.LinearLayout.LayoutParams(mwidth, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        var line = new android.widget.TextView(ctx);
                        line.setText("");
                        var gradientLine = new android.graphics.drawable.GradientDrawable();
                        gradientLine.setShape(android.graphics.drawable.GradientDrawable.LINE);
                        gradientLine.setColor(android.graphics.Color.TRANSPARENT);
                        gradientLine.setStroke(dip2px(1), getColorAHEXFromARGB(50, 0, 0, 0));
                        line.setBackground(gradientLine);
                        line.setGravity(android.view.Gravity.CENTER);
                        modSettings.addView(line, params);
                        var settingText = new android.widget.TextView(ctx);
                        settingText.setText("Settings");
                        settingText.setGravity(android.view.Gravity.CENTER);
                        settingText.setTextColor(android.graphics.Color.BLACK);
                        settingText.setTextSize(dip2px(11));
                        settingText.setTypeface(Utils.font);
                        modSettings.addView(settingText, params);
                        var extraParams = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                        modSettings.addView(mod.getSettingsLayout(extraParams));
                        //Im thinking about a line (html <hr> tag) and the layout underneath
                    }
                    //footer
                    var closeButton = new styledBtn();
                    closeButton.setText("Close");
                    closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                    closeButton.setId(10472);
                    closeButton.setTypeface(Utils.font);
                    closeButton.setTextColor(android.graphics.Color.BLACK);
                    closeButton.setTypeface(Utils.font);
                    //layout alignement....
                    var dialogLayout = new android.widget.RelativeLayout(ctx);
                    dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                    var params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                    dialogLayout.addView(modTitle, params);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                    content.addView(modTypeText, params);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, modTypeText.getId());
                    content.addView(modDescTitle, params);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, modDescTitle.getId());
                    content.addView(modDescText, params);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, modDescText.getId());
                    content.addView(modSettings, params);
                    contentScroll.addView(content);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, modTitle.getId());
                    params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                    contentScroll.setFillViewport(true);
                    dialogLayout.addView(contentScroll, params);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                    dialogLayout.addView(closeButton, params);
                    //Dialog Stuff
                    dialog = new android.app.Dialog(ctx);
                    dialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                    dialog.getWindow()
                        .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    dialog.setContentView(dialogLayout);
                    dialog.setTitle(mod.name);
                    dialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                        onDismiss: function() {
                            showMenu();
                        }
                    }));
                    dialog.show();
                    var window = dialog.getWindow();
                    window.setLayout(mwidth, display.heightPixels);
                    closeButton.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(view) {
                            dialog.dismiss();
                        }
                    }));
                } catch (e) {
                    SummitPE.ctoast("Error(#" + e.lineNumber + "): " + e);
                }
            }
        }));
    }
}

SummitPE.registerModule = function(module) {
    Utils.modsCount += 1;
    if (module.type == ModuleType.command) {
        CommandManager.registerCommand(module);
    } else {
        SummitPE.mods.push(module);
    }
}

var friendMgr = {
    name: Languages.getString("special_friend_manager"),
    desc: "Friends wont be aimed by AimAura or BowAimBot",
    type: ModuleType.special,
    category: ModCategory.SPECIAL,
    openFriendManager: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var display = new android.util.DisplayMetrics();
                    com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                        .getWindowManager()
                        .getDefaultDisplay()
                        .getMetrics(display);
                    var refresh = function() {
                        list.removeAllViews();
                        for (var i = 0; i < FriendManager.all.length(); i++) {
                            var layout = new android.widget.RelativeLayout(ctx);
                            var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);

                            var Fname = new android.widget.TextView(ctx);
                            Fname.setText(FriendManager.all.get(i));
                            Fname.setTypeface(Utils.font);
                            Fname.setTextColor(android.graphics.Color.BLACK);
                            Fname.setTextSize(dip2px(13));
                            Fname.setPadding(10, 0, 10, 0);
                            Fname.setId(395957372);

                            var del = new android.widget.Button(ctx);
                            del.setText("X");
                            del.setTypeface(Utils.font);
                            del.setId(38473727);
                            del.setTextColor(android.graphics.Color.RED);
                            del.setOnClickListener(new android.view.View.OnClickListener({
                                onClick: function(v) {
                                    SummitPE.ctoast("Friend removed!");
                                    FriendManager.removeFriend(v.getParent().getChildAt(0).getText().toString());
                                    refresh();
                                }
                            }));
                            params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                            params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                            params.addRule(android.widget.RelativeLayout.LEFT_OF, del.getId());
                            params.addRule(android.widget.RelativeLayout.ALIGN_BOTTOM, del.getId());
                            layout.addView(Fname, params);
                            params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                            params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);

                            params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                            layout.addView(del, params);
                            list.addView(layout);
                        }
                    };
                    var content = new android.widget.LinearLayout(ctx);
                    content.setId(9472729);
                    content.setOrientation(1);
                    var contentScroll = new SummitPE.scrollView(ctx);
                    contentScroll.setId(492628);

                    FriendManager.loadFromFile();
                    //default content
                    var title = new android.widget.TextView(ctx);
                    title.setText(Languages.getString("special_friend_manager"));
                    title.setTextSize(dip2px(20));
                    title.setGravity(android.view.Gravity.CENTER);
                    title.setTextColor(android.graphics.Color.BLACK);
                    title.setTypeface(Utils.font);
                    title.setId(94771);
                    //content
                    var adder = new android.widget.RelativeLayout(ctx);
                    var name = new android.widget.EditText(ctx);
                    name.setId(29382829);
                    name.setHint("Name of your Friend");
                    name.setTypeface(Utils.font);
                    name.setTextColor(android.graphics.Color.BLACK);
                    var addBtn = new android.widget.Button(ctx);
                    addBtn.setId(9452111);
                    addBtn.setTypeface(Utils.font);
                    addBtn.setText("Add");

                    addBtn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            FriendManager.addFriend(name.getText() + "");
                            name.setText("");
                            FriendManager.saveToFile();
                            FriendManager.loadFromFile();
                            refresh();
                        }
                    }));


                    var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.LEFT_OF, addBtn.getId());
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_BOTTOM, addBtn.getId());
                    adder.addView(name, params);
                    params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                    adder.addView(addBtn, params);
                    content.addView(adder);
                    //dynamic friend layout
                    var list = new android.widget.LinearLayout(ctx);
                    list.setOrientation(1);

                    for (var i = 0; i < FriendManager.all.length(); i++) {
                        var layout = new android.widget.RelativeLayout(ctx);
                        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);

                        var Fname = new android.widget.TextView(ctx);
                        Fname.setText(FriendManager.all.get(i));
                        Fname.setTypeface(Utils.font);
                        Fname.setTextColor(android.graphics.Color.BLACK);
                        Fname.setTextSize(dip2px(13));
                        Fname.setPadding(10, 0, 10, 0);
                        Fname.setId(395957372);

                        var del = new android.widget.Button(ctx);
                        del.setText("X");
                        del.setTypeface(Utils.font);
                        del.setId(38473727);
                        del.setTextColor(android.graphics.Color.RED);

                        del.setOnClickListener(new android.view.View.OnClickListener({
                            onClick: function(v) {
                                SummitPE.ctoast("Friend removed!");
                                FriendManager.removeFriend(v.getParent().getChildAt(0).getText().toString());


                                refresh();
                            }
                        }));
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                        params.addRule(android.widget.RelativeLayout.LEFT_OF, del.getId());
                        params.addRule(android.widget.RelativeLayout.ALIGN_BOTTOM, del.getId());
                        layout.addView(Fname, params);
                        params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);

                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                        layout.addView(del, params);
                        list.addView(layout);
                    }

                    content.addView(list);
                    //footer
                    var closeButton = new styledBtn();
                    closeButton.setText("Close");
                    closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                    closeButton.setId(10472);
                    closeButton.setTypeface(Utils.font);
                    //layout alignement....
                    var dialogLayout = new android.widget.RelativeLayout(ctx);
                    dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                    var params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                    dialogLayout.addView(title, params);

                    contentScroll.addView(content);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                    params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                    contentScroll.setFillViewport(true);
                    dialogLayout.addView(contentScroll, params);
                    params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                    dialogLayout.addView(closeButton, params);
                    //Dialog Stuff
                    dialog = new android.app.Dialog(ctx);
                    dialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                    dialog.getWindow()
                        .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    dialog.setContentView(dialogLayout);
                    dialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                        onDismiss: function() {
                            showMenu();

                        }
                    }));
                    dialog.show();
                    var window = dialog.getWindow();
                    window.setLayout(mwidth, display.heightPixels);
                    closeButton.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(view) {
                            dialog.dismiss();
                        }
                    }));
                } catch (e) {
                    SummitPE.ctoast("Error: " + e);
                }
            }
        }));
    },

    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        mDismiss();
        this.openFriendManager();
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("special_friend_manager"));
    }
};
SummitPE.registerModule(friendMgr);

var target = {
    name: Languages.getString("special_target"),
    desc: "Let you choose the type of entitys that are targetted by Modules like AimAura and BowAimBot.",
    type: ModuleType.special,
    category: ModCategory.SPECIAL,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var players = new android.widget.CheckBox(ctx);
        players.setText("Players");
        players.setTypeface(Utils.font);
        players.setTextColor(android.graphics.Color.BLACK);
        players.setChecked(Utils.Entity.targettedMobs[1]);
        players.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                Utils.Entity.targettedMobs = [Utils.Entity.targettedMobs[0], v.isChecked()];
            }
        }));
        var mobs = new android.widget.CheckBox(ctx);
        mobs.setText("Mobs");
        mobs.setTextColor(android.graphics.Color.BLACK);
        mobs.setTypeface(Utils.font);
        mobs.setChecked(Utils.Entity.targettedMobs[0]);
        mobs.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                Utils.Entity.targettedMobs = [v.isChecked(), Utils.Entity.targettedMobs[1]];
            }
        }));
        settings.addView(players, params);
        settings.addView(mobs, params);
        return settings;
    },
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        mDismiss();
        SummitPE.showModDialog(this);
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("special_target"));
    }
};

SummitPE.registerModule(target);

var bypass = {
    name: Languages.getString("special_bypass"),
    desc: "Mods will bypass AntiCheats or disable them if they can't.",
    type: ModuleType.special,
    category: ModCategory.SPECIAL,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var lbsg = new android.widget.Button(ctx);
        lbsg.setText("LBSG Anti-Cheat");
        lbsg.setTypeface(Utils.font);

        var updateOptions = function() {
            //facility.setBackground(Utils.bypassMode == BypassMode.FACILITY ? enabledGradient : disabledGradient);
            lbsg.setBackground(Utils.bypassMode == BypassMode.LBSG ? enabledGradient : disabledGradient);
            vanilla.setBackground(Utils.bypassMode == BypassMode.DEFAULT ? enabledGradient : disabledGradient);
        };

        lbsg.setBackground(Utils.bypassMode == BypassMode.LBSG ? enabledGradient : disabledGradient);
        lbsg.setTextColor(android.graphics.Color.BLACK);
        lbsg.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                Utils.bypassMode = BypassMode.LBSG;
                updateOptions();
            }
        }));
        var vanilla = new android.widget.Button(ctx);
        vanilla.setText("Vanilla");
        vanilla.setBackground(Utils.bypassMode == BypassMode.DEFAULT ? enabledGradient : disabledGradient);
        vanilla.setTextColor(android.graphics.Color.BLACK);
        vanilla.setTypeface(Utils.font);

        vanilla.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                Utils.bypassMode = BypassMode.DEFAULT;
                updateOptions();
            }
        }));
        /*var facility = new android.widget.Button(ctx);
        facility.setText("facilityPE Anti-Cheat");
        facility.setTypeface(Utils.font);

        facility.setBackground(Utils.bypassMode == BypassMode.FACILITY ? enabledGradient : disabledGradient);
        facility.setTextColor(android.graphics.Color.BLACK);
        facility.setOnClickListener(new android.view.View.OnClickListener({
        	onClick: function (v) {
        		Utils.bypassMode = BypassMode.FACILITY;
        		updateOptions();
        	}
        }));*/
        settings.addView(vanilla, params);
        settings.addView(lbsg, params);
        //settings.addView(facility, params);
        return settings;
    },
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        mDismiss();
        SummitPE.showModDialog(this);
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("special_bypass"));
    }
};
SummitPE.registerModule(bypass);

var panic = {
    name: Languages.getString("special_panic"),
    desc: "Disables all mods at once!",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        SummitPE.mods.forEach(function(entry, index, array) {
            if (entry.isStateMode() && entry.state) entry.onClick(null);
        });

        mDismiss();

        //if (btn != null) mDismiss();
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("special_panic"));
    }
};
SummitPE.registerModule(panic);

var gmhack = {
    name: "Gamemode",
    desc: "Changes your gamemode! Experimental",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    extra: Level.getGameMode(),
    onTick: function() {
        /*some tick*/
    },
    onClick: function(btn) {
        if (!freecam.state) {
            this.extra = -(Level.getGameMode() - 1);
            Level.setGameMode(this.extra);
        } else {
            SummitPE.ctoast("Freecam is active! Disable it");
        }
    },
    onRefresh: function(btn) {
        if (btn != null) {
            if (!freecam.state) btn.setText(Languages.getString("hacks_gamemode") + ": " + (this.extra == 0 ? Languages.getString("gm_survival") : Languages.getString("gm_creative")));
            else btn.setText(Languages.getString("hacks_gamemode") + ": Gamemode 3");
        }
    }
};
SummitPE.registerModule(gmhack);

var freecam = {
    name: "Freecam (gamemode 3)",
    desc: "Free flying in gamemode 3!",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    extra: Level.getGameMode(),
    onTick: function() {
        /*some tick*/
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            this.extra = Level.getGameMode();
            Level.setGameMode(3);
        } else {
            Level.setGameMode(this.extra);
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("Freecam (gamemode 3)");
    }
};
SummitPE.registerModule(freecam);

var autocliker = {
    name: "AutoClicker",
    desc: "Automatically clicks for the screen! Woooow [From the Halcyon utility]",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    cps: 6,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var cpsText = new android.widget.TextView(ctx);
        cpsText.setText("Cps: " + this.cps);
        cpsText.setTextColor(android.graphics.Color.BLACK);
        cpsText.setTextSize(dip2px(9));
        cpsText.setGravity(android.view.Gravity.CENTER);
        cpsText.setTypeface(Utils.font);
        var cpsSlider = Utils.ModSettings.getSlider();
        cpsSlider.setMax(19);
        //cpsSlider.setMin(1);
        cpsSlider.setProgress(this.cps);
        cpsSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                /* Сделать минимальное значение с помощью хитростей */
                var progress_new = (progress) + 1; // 1 - минимальное значение

                //progress_new = Math.round(progress_new);
                progress_new = progress_new.toString();
                /* конец */
                cpsText.setText("Cps: " + progress_new);

            },
            onStopTrackingTouch: function(seekbar) {

                /* Сохранить минимальное значение с помощью хитростей */
                var seekbar_new = (seekbar.getProgress()) + 1; // 1 - минимальное значение
                //seekbar_new = Math.round(seekbar_new);
                /* конец */
                autocliker.cps = seekbar_new;
            }
        }));
        settings.addView(cpsSlider, params);
        settings.addView(cpsText, params);


        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (this.curEnt != null) {
            Utils.Entity.crosshairAimAt(this.curEnt);
        }
    },
    onModTick: function() {
        if (this.state) {
            this.requestAim = true;

        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            var r = new java.lang.Runnable({
                run: function() {
                    try {
                        while (autocliker.state) {
                            Timings.startTiming("autocliker-thread");

                            //new android.app.Instrumentation().sendCharacterSync(android.view.KeyEvent.KEYCODE_Q);
                            new android.app.Instrumentation().sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                            //new io.appium.java_client.android.nativekey.PressesKey.longPressKey(new android.view.KeyEvent.KEYCODE_Q);
                            //java.lang.Thread.sleep(1000 / autocliker.cps);//1000 - секунда

                            Timings.stopTiming("autocliker-thread");
                        }
                    } catch (e) {
                        SummitPE.ctoast(e);
                        autocliker.state = false;
                    }
                    Timings.resetTiming("autocliker-thread");
                }
            });
            var t = new java.lang.Thread(r);
            t.start();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("AutoClicker");
    }
};
SummitPE.registerModule(autocliker);

//попытки сделать ломание блоков (долгое удерживание)
var blockBreakerT = {
    name: "BlockBreakerTest",
    desc: "Automatically clicks for the screen! Woooow [From the Halcyon utility]",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    cps: 20,
    currCps: 0,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var cpsText = new android.widget.TextView(ctx);
        cpsText.setText("Cps: " + this.cps);
        cpsText.setTextColor(android.graphics.Color.BLACK);
        cpsText.setTextSize(dip2px(9));
        cpsText.setGravity(android.view.Gravity.CENTER);
        cpsText.setTypeface(Utils.font);
        var cpsSlider = Utils.ModSettings.getSlider();
        cpsSlider.setMax(99);
        //cpsSlider.setMin(1);
        cpsSlider.setProgress(this.cps);
        cpsSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {
                /* Сделать минимальное значение с помощью хитростей */
                var progress_new = (progress) + 1; // 1 - минимальное значение
                //progress_new = Math.round(progress_new);
                progress_new = progress_new.toString();
                /* конец */
                cpsText.setText("Cps: " + progress_new);
            },
            onStopTrackingTouch: function(seekbar) {
                /* Сохранить минимальное значение с помощью хитростей */
                var seekbar_new = (seekbar.getProgress()) + 1; // 1 - минимальное значение
                //seekbar_new = Math.round(seekbar_new);
                /* конец */
                blockBreakerT.cps = seekbar_new;
            }
        }));
        settings.addView(cpsSlider, params);
        settings.addView(cpsText, params);
        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            this.currCps = 0;
            var rMain = new java.lang.Runnable({
                run: function() {
                    while (blockBreakerT.state) {
                        /*var k = function newFunc(l) {
                            var r = new java.lang.Runnable({
                                run: function() {*/
                        try {
                            //ITnew android.app.Instrumentation().sendCharacterSync(android.view.KeyEvent.KEYCODE_Q);
                            new android.app.Instrumentation().sendStringSync("qqqqqqqqqqqqqqqq");
                            //new android.app.Instrumentation().sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                            //new io.appium.java_client.android.nativekey.PressesKey.longPressKey(new android.view.KeyEvent.KEYCODE_Q);
                            java.lang.Thread.sleep(1000 / blockBreakerT.cps); //1000 - секунда
                        } catch (e) {
                            SummitPE.ctoast(e);
                            blockBreakerT.state = false;
                        }
                        /*}
                            });
                            var t = new java.lang.Thread(r);
                            t.start();
                            if (l > 1) newFunc(l - 1);*/
                        /*}
                        k(12);*/
                        blockBreakerT.currCps++;
                        if (blockBreakerT.currCps == 250) break;
                        //java.lang.Thread.sleep(1);
                    }
                }
            });
            var tMain = new java.lang.Thread(rMain);
            tMain.start();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("BlockBreakerTest");
    }
};
SummitPE.registerModule(blockBreakerT);

/*function sleep2(milliseconds) {
    const date = Date.now();
    var currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}*/

var autokill = {
    name: "KillAura",
    desc: "Automatic strikes on the enemy! Woooow [1.0+ ONLY] [From the Halcyon utility]",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    requireGame: true,
    delayed: false,
    firstTapDelay: 150,
    cps: 6,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var cpsText = new android.widget.TextView(ctx);
        cpsText.setText("Cps: " + this.cps);
        cpsText.setTextColor(android.graphics.Color.BLACK);
        cpsText.setTextSize(dip2px(9));
        cpsText.setGravity(android.view.Gravity.CENTER);
        cpsText.setTypeface(Utils.font);
        var cpsSlider = Utils.ModSettings.getSlider();
        cpsSlider.setMax(20);
        //cpsSlider.setMin(1);
        cpsSlider.setProgress(this.cps);
        cpsSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                /* Сделать минимальное значение с помощью хитростей */
                var progress_new = (progress) + 1; // 1 - минимальное значение

                //progress_new = Math.round(progress_new);
                progress_new = progress_new.toString();
                /* конец */
                cpsText.setText("Cps: " + progress_new);

            },
            onStopTrackingTouch: function(seekbar) {

                /* Сохранить минимальное значение с помощью хитростей */
                var seekbar_new = (seekbar.getProgress()) + 1; // 1 - минимальное значение
                //seekbar_new = Math.round(seekbar_new);
                /* конец */
                autokill.cps = seekbar_new;
            }
        }));

        var ftdText = new android.widget.TextView(ctx);
        ftdText.setText("First tap delay: " + this.firstTapDelay);
        ftdText.setTextColor(android.graphics.Color.BLACK);
        ftdText.setTextSize(dip2px(9));
        ftdText.setGravity(android.view.Gravity.CENTER);
        ftdText.setTypeface(Utils.font);
        var ftdSlider = Utils.ModSettings.getSlider();
        ftdSlider.setMax(149);
        //ftdSlider.setMin(1);
        ftdSlider.setProgress(this.firstTapDelay);
        ftdSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                /* Сделать минимальное значение с помощью хитростей */
                var progress_new = (progress) + 1; // 1 - минимальное значение

                //progress_new = Math.round(progress_new);
                progress_new = progress_new.toString();
                /* конец */
                ftdText.setText("First tap delay: " + progress_new);

            },
            onStopTrackingTouch: function(seekbar) {

                /* Сохранить минимальное значение с помощью хитростей */
                var seekbar_new = (seekbar.getProgress()) + 1; // 1 - минимальное значение
                //seekbar_new = Math.round(seekbar_new);
                /* конец */
                autokill.firstTapDelay = seekbar_new;
            }
        }));
        settings.addView(cpsSlider, params);
        settings.addView(cpsText, params);
        settings.addView(ftdSlider, params);
        settings.addView(ftdText, params);


        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (this.curEnt != null) {
            Utils.Entity.crosshairAimAt(this.curEnt);
        }
    },
    onModTick: function() {
        if (this.state) {
            this.requestAim = true;
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            var r = new java.lang.Runnable({
                run: function() {
                    try {
                        //Timings.startTiming("autokill-thread");

                        while (autokill.state && SummitPE.inGame) {
                            if (Utils.Entity.targettedMobs[1] && Player.getPointedEntity() != -1) {
                                if (!FriendManager.isFriend(Entity.getNameTag(Player.getPointedEntity()))) {
                                    if (!autokill.delayed) {
                                        autokill.delayed = true;
                                        java.lang.Thread.sleep(autokill.firstTapDelay);
                                    }

                                    new android.app.Instrumentation().sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q);
                                }
                                /* } else if(Utils.Entity.targettedMobs[0] && !Player.getPointedEntity() != -1) {
                                    if(!autokill.delayed) {
                                        autokill.delayed = true;
                                        java.lang.Thread.sleep(autokill.firstTapDelay);
                                    }

                                    new android.app.Instrumentation().sendKeyDownUpSync(android.view.KeyEvent.KEYCODE_Q); */
                            } else {
                                autokill.delayed = false;
                            }

                            java.lang.Thread.sleep(1000 / autokill.cps); //1000 - секунда
                        }

                        if (autokill.state && !SummitPE.inGame) {
                            autokill.state = false;
                            SummitPE.ctoast(autokill.name + " is disabled, please join the game");
                        }

                        //Timings.stopTiming("autokill-thread");
                    } catch (e) {
                        SummitPE.ctoast(e);
                        autokill.state = false;
                    }

                    //Timings.resetTiming("autokill-thread");
                }
            });
            var t = new java.lang.Thread(r);
            t.start();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("KillAura");
    }
};
SummitPE.registerModule(autokill);

var aimaura = {
    name: Languages.getString("hacks_aimaura"),
    desc: "Automatically aims at near mobs! [Works in 0.11 - 0.16, 1.2 - 1.12]",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    range: 7,
    requestAim: false,
    curEnt: null,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var rangeText = new android.widget.TextView(ctx);
        rangeText.setText("Range: " + this.range);
        rangeText.setTextColor(android.graphics.Color.BLACK);
        rangeText.setTextSize(dip2px(9));
        rangeText.setGravity(android.view.Gravity.CENTER);
        rangeText.setTypeface(Utils.font);
        var rangeSlider = Utils.ModSettings.getSlider();
        rangeSlider.setMax(20);
        //rangeSlider.setMin(1);
        rangeSlider.setProgress(this.range);
        rangeSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                rangeText.setText("Range: " + progress);

            },
            onStopTrackingTouch: function(seekbar) {
                aimaura.range = seekbar.getProgress();
            }
        }));
        settings.addView(rangeSlider, params);
        settings.addView(rangeText, params);


        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (this.curEnt != null) {
            Utils.Entity.crosshairAimAt(this.curEnt);
        }
    },
    onModTick: function() {
        if (this.state) {
            this.requestAim = true;

        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            var r = new java.lang.Runnable({
                run: function() {
                    while (aimaura.state) {
                        if (aimaura.requestAim) {
                            aimaura.requestAim = false;
                            try {
                                Timings.startTiming("aimaura-thread");

                                aimaura.curEnt = Utils.Entity.getNearestEntity(aimaura.range, true);


                                Timings.stopTiming("aimaura-thread");
                            } catch (e) {
                                SummitPE.ctoast(e);
                                aimaura.state = false;
                            }

                        } else
                            java.lang.Thread.sleep(10);
                    }
                    Timings.resetTiming("aimaura-thread");
                }
            });
            var t = new java.lang.Thread(r);
            t.start();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_aimaura"));
    }
};
SummitPE.registerModule(aimaura);

var bowaimbot = {
    name: Languages.getString("hacks_bowaimbot"),
    desc: "Automatically aims with a bow at near mobs! [Works in 0.11 - 0.16, 1.2 - 1.12]",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    range: 100,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var rangeText = new android.widget.TextView(ctx);
        rangeText.setText("Range: " + this.range);
        rangeText.setTextColor(android.graphics.Color.BLACK);
        rangeText.setTextSize(dip2px(9));
        rangeText.setGravity(android.view.Gravity.CENTER);
        rangeText.setTypeface(Utils.font);
        var rangeSlider = Utils.ModSettings.getSlider();
        rangeSlider.setMax(100);
        //rangeSlider.setMin(1);
        rangeSlider.setProgress(this.range);
        rangeSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                rangeText.setText("Range: " + progress);

            },
            onStopTrackingTouch: function(seekbar) {
                bowaimbot.range = seekbar.getProgress();
            }
        }));
        settings.addView(rangeSlider, params);
        settings.addView(rangeText, params);


        return settings;
    },
    onTick: function() {
        if (this.state && getCarriedItem() == 261 /*No Dynamic :( */ ) {

            var ent = Utils.Entity.getNearestEntity(this.range);

            if (ent != null) Utils.Entity.bowAimAt(ent);

        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_bowaimbot"));
    }
};
SummitPE.registerModule(bowaimbot);

var hitaim = {
    name: "Hit Aim",
    desc: "Aims near mobs/players!",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    range: 20,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var rangeText = new android.widget.TextView(ctx);
        rangeText.setText("Range: " + this.range);
        rangeText.setTextColor(android.graphics.Color.BLACK);
        rangeText.setTextSize(dip2px(9));
        rangeText.setGravity(android.view.Gravity.CENTER);
        rangeText.setTypeface(Utils.font);
        var rangeSlider = Utils.ModSettings.getSlider();
        rangeSlider.setMax(100);
        //rangeSlider.setMin(1);
        rangeSlider.setProgress(this.range);
        rangeSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                rangeText.setText("Range: " + progress);

            },
            onStopTrackingTouch: function(seekbar) {
                hitaim.range = seekbar.getProgress();
            }
        }));
        settings.addView(rangeSlider, params);
        settings.addView(rangeText, params);


        return settings;
    },
    onAttack: function(att, vic) {
        if (!this.state)
            return false;

        if (vic != 0) Utils.Entity.crosshairAimAt(vic);
    },
    onUseItem: function(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        if (!this.state)
            return false;

        var ent = Utils.Entity.getNearestEntity(this.range, true);
        if (ent != null) {
            Utils.Entity.crosshairAimAt(ent);
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(this.name);
    }
};
SummitPE.registerModule(hitaim);

var tpaura = {
    name: Languages.getString("hacks_tpaura"),
    desc: "Automatically teleports you around people so that they can\'t hit you.",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {

    },
    findPos: function(ent) {
        var Ppos = new Array(getPlayerX(), getPlayerY() + (criticals.state && criticals.velTick > 0 ? 0 : 0.5), getPlayerZ());
        var entPos = new Array(Entity.getX(ent), Entity.getY(ent), Entity.getZ(ent));
        var diff = new Array(entPos[0] - Ppos[0], null, entPos[2] - Ppos[2]);
        Ppos[0] += diff[0] * 1.8;
        Ppos[2] += diff[2] * 1.8;
        return Ppos;
        //just inverting pos at the moment
    },
    findVel: function(ent) {
        var Ppos = new Array(getPlayerX(), getPlayerY() + criticals.state && criticals.velTick > 0 ? 0 : 0.5, getPlayerZ());
        var entPos = new Array(Entity.getX(ent), Entity.getY(ent), Entity.getZ(ent));
        var diff = new Array(entPos[0] - Ppos[0], (Utils.Player.onGround() ? 0.25 : 0), entPos[2] - Ppos[2]);
        while (diff[0] > 1.5 || diff[0] < -1.5 || diff[2] > 1.5 || diff[2] < -1.5) {
            diff[0] = diff[0] / 1.2;
            diff[2] = diff[2] / 1.2;
        }

        return diff;
    },
    onAttack: function(att, vic) {
        if (att == Player.getEntity() && this.state && Entity.getHealth(vic) > 0) {

            var pos = this.findPos(vic);
            var vel = this.findVel(vic);

            if (getTile(pos[0], pos[1], pos[2]) == 0 && getTile(pos[0], pos[1] - 1, pos[2]) == 0 && getTile(pos[0], pos[1] - 2, pos[2]) == 0) {
                if (Utils.bypassMode == BypassMode.LBSG) {
                    setVelX(getPlayerEnt(), vel[0]);
                    setVelY(getPlayerEnt(), vel[1]);
                    setVelZ(getPlayerEnt(), vel[2]);
                } else {
                    Entity.setPosition(Player.getEntity(), pos[0], pos[1], pos[2]);
                    Utils.Entity.crosshairAimAt(vic, pos);
                }
            }


        }
    },
    onEnable: function(btn) {
        /*Not used*/
    },
    onDisable: function(btn) {
        /*Not used*/
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_tpaura"));
    }
};
SummitPE.registerModule(tpaura);

var clicktp = {
    name: Languages.getString("hacks_clicktp"),
    desc: "Teleports you to the place where you clicked",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onUseItem: function(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        if (getTile(x, y + 1, z) == 0 && getTile(x, y + 2, z) == 0 && this.state) {
            Entity.setPosition(Player.getEntity(), x + 0.5, y + 2.63 /*1.62 = eye height of steve*/ , z + 0.5);
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_clicktp"));
    }
};
SummitPE.registerModule(clicktp);

var speed = {
    name: Languages.getString("hacks_speed"),
    desc: "Standard: Standard speed without any modifications\n" + Languages.getString("hacks_longjump") + ": Jumps up to 6 blocks long while walking!",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    extraTick: 0,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var defaultspeed = new android.widget.Button(ctx);
        defaultspeed.setText("Standard");
        defaultspeed.setTypeface(Utils.font);
        defaultspeed.setBackground(Utils.speedMode == SpeedMode.DEFAULT ? enabledGradient : disabledGradient);
        defaultspeed.setTextColor(android.graphics.Color.BLACK);
        defaultspeed.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                Utils.speedMode = SpeedMode.DEFAULT;
                defaultspeed.setBackground(Utils.speedMode == SpeedMode.DEFAULT ? enabledGradient : disabledGradient);
                //friction.setBackground(Utils.speedMode == SpeedMode.FRICTION ? enabledGradient : disabledGradient);
                bunny.setBackground(Utils.speedMode == SpeedMode.LONGJUMP ? enabledGradient : disabledGradient);
            }
        }));
        /*var friction = new android.widget.Button(ctx);
        friction.setText("Friction Speed");
        friction.setBackground(Utils.speedMode == SpeedMode.FRICTION ? enabledGradient : disabledGradient);
        friction.setTextColor(android.graphics.Color.BLACK);
        friction.setTypeface(Utils.font);

        friction.setOnClickListener(new android.view.View.OnClickListener({
        	onClick: function (v) {
        		Utils.speedMode = SpeedMode.FRICTION;
        		defaultspeed.setBackground(Utils.speedMode == SpeedMode.DEFAULT ? enabledGradient : disabledGradient);
        		friction.setBackground(Utils.speedMode == SpeedMode.FRICTION ? enabledGradient : disabledGradient);
        		bunny.setBackground(Utils.speedMode == SpeedMode.LONGJUMP ? enabledGradient : disabledGradient);
        	}
        }));*/
        var bunny = new android.widget.Button(ctx);
        bunny.setText(Languages.getString("hacks_longjump"));
        bunny.setBackground(Utils.speedMode == SpeedMode.LONGJUMP ? enabledGradient : disabledGradient);
        bunny.setTextColor(android.graphics.Color.BLACK);
        bunny.setTypeface(Utils.font);

        bunny.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                Utils.speedMode = SpeedMode.LONGJUMP;
                defaultspeed.setBackground(Utils.speedMode == SpeedMode.DEFAULT ? enabledGradient : disabledGradient);
                //friction.setBackground(Utils.speedMode == SpeedMode.FRICTION ? enabledGradient : disabledGradient);
                bunny.setBackground(Utils.speedMode == SpeedMode.LONGJUMP ? enabledGradient : disabledGradient);
            }
        }));
        settings.addView(defaultspeed, params);
        settings.addView(bunny, params);
        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (this.state && Utils.Player.onGround()) {
            switch (Utils.speedMode) {
                case SpeedMode.DEFAULT:
                    var max = Utils.bypassMode == BypassMode.LBSG ? 0.55 : 0.8;
                    var lastSpeed = Math.sqrt(Math.pow(Utils.Vel.lastX, 2) + Math.pow(Utils.Vel.lastZ, 2));
                    var speed = Math.sqrt(Math.pow(Entity.getVelX(getPlayerEnt()), 2) + Math.pow(Entity.getVelZ(getPlayerEnt()), 2));
                    if (speed < 0.04) {
                        setVelX(getPlayerEnt(), 0);
                        setVelZ(getPlayerEnt(), 0);
                    } else if (speed >= lastSpeed - 0.001 && speed < max) {
                        setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt()) * (1 + max / 2));
                        setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt()) * (1 + max / 2));
                    } else if (speed < lastSpeed - 0.0001) {
                        setVelX(getPlayerEnt(), (getPlayerX() - Utils.Pos.lastX) / 1.3);
                        setVelZ(getPlayerEnt(), (getPlayerZ() - Utils.Pos.lastZ) / 1.3);

                    } else if (speed > max) {
                        setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt()) / 1.7);
                        setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt()) / 1.7);
                        //setVelZ(getPlayerEnt(), (getPlayerZ() - Utils.Pos.lastZ) / 1.1);
                    }
                    break;
                case SpeedMode.LONGJUMP:
                    var speed = Math.sqrt(Math.pow(Entity.getVelX(getPlayerEnt()), 2) + Math.pow(Entity.getVelZ(getPlayerEnt()), 2));
                    if (Utils.Player.onGround()) this.extraTick++;
                    if (speed > 0.105 && this.extraTick > 1 && Utils.Player.onGround()) {
                        this.extraTick = 0;
                        var lastSpeed = Math.sqrt(Math.pow(Utils.Vel.lastX, 2) + Math.pow(Utils.Vel.lastZ, 2));
                        if (speed <= lastSpeed - 0.001) return;
                        var vector = new Array();
                        var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
                        var pitch = 0;
                        vector[0] = Math.cos(yaw) * Math.cos(pitch);
                        vector[2] = Math.sin(yaw) * Math.cos(pitch);
                        if (Utils.bypassMode == BypassMode.LBSG) {
                            vector[0] = vector[0] / 1.8;
                            vector[2] = vector[2] / 1.8;
                        }
                        Entity.setVelX(getPlayerEnt(), vector[0]);
                        Entity.setVelY(getPlayerEnt(), Utils.bypassMode == BypassMode.LBSG ? 0.425 : 0.5);
                        Entity.setVelZ(getPlayerEnt(), vector[2]);
                    } else if (Utils.Vel.calang_lateSpeed() < 0.04) {
                        setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt()) / 2);
                        setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt()) / 2);
                    }
                    break;
            }

        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_speed"));
    }
};
SummitPE.registerModule(speed);

var flight = {
    name: Languages.getString("hacks_flight"),
    desc: "Makes you fly.",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (this.state) {
            Player.setCanFly(1);
            //Player.setFlying(1);
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        Player.setCanFly(this.state ? 1 : Level.getGameMode());
        //Player.setFlying(this.state ? 1 : 0);
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_flight"));
    }
};
SummitPE.registerModule(flight);

var step = {
    name: Languages.getString("hacks_step"),
    desc: "Steps on full blocks like you will on a half slap",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },

    onTick: function() {
        if (this.state && Utils.Player.isCollidedHorizontally()) {
            if (Utils.bypassMode == BypassMode.VANILLA) {
                Entity.setPositionRelative(getPlayerEnt(), 0, 1.6, 0);
                setVelY(getPlayerEnt(), 0.1);
            } else if (Utils.Player.onGround())
                Entity.setPositionRelative(getPlayerEnt(), 0, 1.1, 0);
            else
                setVelY(getPlayerEnt(), 0.42);
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_step"));
    }
};
SummitPE.registerModule(step);

var doubleJump = {
    name: "DoubleJump",
    desc: "Steps on full blocks like you will on a half slap",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },

    onModTick: function() {
        if (this.state && Utils.Player.overGround()) {
            if (Utils.bypassMode == BypassMode.VANILLA) {
                Entity.setPositionRelative(getPlayerEnt(), 0, 1.6, 0);
                setVelY(getPlayerEnt(), 0.1);
            } else if (Utils.Player.onGround())
                Entity.setPositionRelative(getPlayerEnt(), 0, 1.1, 0);
            else
                setVelY(getPlayerEnt(), 0.42);
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("DoubleJump");
    }
};
SummitPE.registerModule(doubleJump);

var scaffoldTap = {
    name: "Scaffold",
    desc: "For fast movement",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onUseItem: function(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        var toPos = [0, 0, 0];
        if (side == BlockFace.NORTH) {
            toPos = [0, 0, -1];
        } else if (side == BlockFace.SOUTH) {
            toPos = [0, 0, 1];
        } else if (side == BlockFace.WEST) {
            toPos = [-1, 0, 0];
        } else if (side == BlockFace.EAST) {
            toPos = [1, 0, 0];
        } else if (side == BlockFace.UP) {
            toPos = [0, 1, 0];
        }

        //общий множитель выносим за скобки
        Entity.setPositionRelative(getPlayerEnt(), toPos[0], toPos[1], toPos[2]);
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) { //TODO сделать в регистрации модуля автозадание функции
        //перезагрузки, где будет вызываться свойство langName с названием языкового кода для
        //Languages.getString(mod.langName); или name. также убрать у всех refresh там, где нет фактического
        //изменения имени функции (искл. gamemode и другие, где есть)
        if (btn != null)
            btn.setText("Scaffold");
    }
};
//SummitPE.registerModule(scaffoldTap);//fastbrige xd

var JesusMode = {
    FLOAT: 0,
    SOLID: 1,
    DOLPHIN: 2
};
var jesus = {
    name: Languages.getString("hacks_jesus"),
    desc: "Jesus used this hack 2000 years ago to walk over water\nFloat: Floats over water\nSolid: Makes liquids solid",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    mode: JesusMode.DOLPHIN,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var dolphin = new android.widget.Button(ctx);
        dolphin.setText("Dolphin");
        dolphin.setTypeface(Utils.font);
        dolphin.setBackground(this.mode == JesusMode.DOLPHIN ? enabledGradient : disabledGradient);
        dolphin.setTextColor(android.graphics.Color.BLACK);
        dolphin.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                /*Block.defineLiquidBlock(8, "Water", [
                	["still_water", 0],
                	["still_water", 0]
                ], 8);
                Block.defineLiquidBlock(10, "Lava", [
                	["still_lava", 0],
                	["still_lava", 0]
                ], 10);*/
                jesus.mode = JesusMode.DOLPHIN;
                dolphin.setBackground(jesus.mode == JesusMode.DOLPHIN ? enabledGradient : disabledGradient);
                float.setBackground(jesus.mode == JesusMode.FLOAT ? enabledGradient : disabledGradient);
                solid.setBackground(jesus.mode == JesusMode.SOLID ? enabledGradient : disabledGradient);
            }
        }));

        var float = new android.widget.Button(ctx);
        float.setText("Float");
        float.setTypeface(Utils.font);

        float.setBackground(this.mode == JesusMode.FLOAT ? enabledGradient : disabledGradient);
        float.setTextColor(android.graphics.Color.BLACK);
        float.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                /*Block.defineLiquidBlock(8, "Water", [
                	["still_water", 0],
                	["still_water", 0]
                ], 8);
                Block.defineLiquidBlock(10, "Lava", [
                	["still_lava", 0],
                	["still_lava", 0]
                ], 10);*/
                jesus.mode = JesusMode.FLOAT;
                dolphin.setBackground(jesus.mode == JesusMode.DOLPHIN ? enabledGradient : disabledGradient);
                float.setBackground(jesus.mode == JesusMode.FLOAT ? enabledGradient : disabledGradient);
                solid.setBackground(jesus.mode == JesusMode.SOLID ? enabledGradient : disabledGradient);
            }
        }));
        var solid = new android.widget.Button(ctx);
        solid.setText("Solid");
        solid.setTypeface(Utils.font);

        solid.setBackground(this.mode == JesusMode.SOLID ? enabledGradient : disabledGradient);
        solid.setTextColor(android.graphics.Color.BLACK);
        solid.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                /*jesus.mode = JesusMode.SOLID;
                dolphin.setBackground(jesus.mode == JesusMode.DOLPHIN ? enabledGradient : disabledGradient);
                float.setBackground(jesus.mode == JesusMode.FLOAT ? enabledGradient : disabledGradient);
                solid.setBackground(jesus.mode == JesusMode.SOLID ? enabledGradient : disabledGradient);
                if(jesus.state) {
                	Block.defineBlock(8, "Water", [
                		["still_water", 0]
                	], 8, false, 4);
                	Block.defineBlock(9, "Stationary Water", [
                		["still_water", 0]
                	], 9, false, 4);
                	Block.setShape(8, 0, 0, 0, 1, 0.7, 1);
                	Block.setShape(9, 0, 0, 0, 1, 0.7, 1);
                	Block.defineBlock(10, "Lava", [
                		["still_lava", 0]
                	], 10, false, 4);
                	Block.defineBlock(11, "Stationary Lava", [
                		["still_lava", 0]
                	], 11, false, 4);
                	Block.setShape(10, 0, 0, 0, 1, 0.7, 1);
                	Block.setShape(11, 0, 0, 0, 1, 0.7, 1);
                }*/
                SummitPE.ctoast("Solid Mode is disabled in 0.17 due to crashes");
            }
        }));
        settings.addView(dolphin, params);
        settings.addView(float, params);
        settings.addView(solid, params);
        return settings;
    },
    onTick: function() {
        if (this.state && SummitPE.inGame) {
            if (this.mode == JesusMode.FLOAT) {
                if ((getTile(getPlayerX(), getPlayerY() - 0.8, getPlayerZ()) >= 8 && getTile(getPlayerX(), getPlayerY() - 0.8, getPlayerZ()) <= 11)) {
                    setVelY(getPlayerEnt(), 0.2);
                } else if ((getTile(getPlayerX(), getPlayerY() - 1.3, getPlayerZ()) >= 8 && getTile(getPlayerX(), getPlayerY() - 1.3, getPlayerZ()) <= 11)) {
                    setVelY(getPlayerEnt(), 0.05);
                } else if ((getTile(getPlayerX(), getPlayerY() - 1.68, getPlayerZ()) >= 8 && getTile(getPlayerX(), getPlayerY() - 1.68, getPlayerZ()) <= 11))
                    setVelY(getPlayerEnt(), 0.015);

            } else if (this.mode == JesusMode.DOLPHIN) {
                if ((getTile(getPlayerX(), getPlayerY() - 1.3, getPlayerZ()) >= 8 && getTile(getPlayerX(), getPlayerY() - 1.3, getPlayerZ()) <= 11)) {
                    setVelY(getPlayerEnt(), 0.4);
                    setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt()) * 1.2);
                    setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt()) * 1.2);
                }
            }
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state && this.mode == JesusMode.SOLID) {
            Block.defineBlock(8, "Water", [
                ["still_water", 0]
            ], 8, false, 4);
            Block.defineBlock(9, "Stationary Water", [
                ["still_water", 0]
            ], 9, false, 4);
            Block.setShape(8, 0, 0, 0, 1, 0.7, 1);
            Block.setShape(9, 0, 0, 0, 1, 0.7, 1);
            Block.defineBlock(10, "Lava", [
                ["still_lava", 0]
            ], 10, false, 4);
            Block.defineBlock(11, "Stationary Lava", [
                ["still_lava", 0]
            ], 11, false, 4);
            Block.setShape(10, 0, 0, 0, 1, 0.7, 1);
            Block.setShape(11, 0, 0, 0, 1, 0.7, 1);
        } else if (this.mode == JesusMode.SOLID) {
            Block.defineLiquidBlock(8, "Water", [
                ["still_water", 0],
                ["still_water", 0]
            ], 8);
            Block.defineLiquidBlock(10, "Lava", [
                ["still_lava", 0],
                ["still_lava", 0]
            ], 10);
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_jesus"));
    }
};
SummitPE.registerModule(jesus);

var autoSprint = {
    name: "Auto Sprint",
    desc: "Auto sprint",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isLoop: false,
    requireGame: true,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state && !this.isLoop) {
            var loopThread = new java.lang.Thread(new java.lang.Runnable({
               run: function() {
                    try {
                        android.os.Looper.prepare();
                        new android.os.Handler().postDelayed(new java.lang.Runnable({
                           run: function() {
                                try {
                                    var inst = new android.app.Instrumentation;
                                    if (autoSprint.state && SummitPE.inGame) {
                                        if (Entity.getVelX(Player.getEntity()) != 0 || Entity.getVelZ(Player.getEntity()) != 0) {
                                            inst.sendKeyDownUpSync(113);
                                        }

                                        new android.os.Handler().postDelayed(this, 50);
                                    } else if (autoSprint.state && !SummitPE.inGame) {
                                        autoSprint.state = false;
                                        SummitPE.ctoast(autoSprint.name + " is disabled, please join the game");
                                    }
                                } catch (e) {
                                    autoSprint.state = false;
                                    SummitPE.ctoast("Error(#" + e.lineNumber + "): " + e);
                                }
                            }
                        }), 50);
                        android.os.Looper.loop();
                    } catch (e) {
                        errorMessage(e)
                    }

                }
            }))
            loopThread.start();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(this.name);
    }
};
SummitPE.registerModule(autoSprint);

var nodownglide = {
    name: Languages.getString("hacks_nodownglide"),
    desc: "Not varting you to move on y-axis (upwards & downwards)",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    startY: -1,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (this.state) {
            setVelY(getPlayerEnt(), 0.000000000001);
            Entity.setPositionRelative(getPlayerEnt(), 0, this.startY - getPlayerY(), 0);
        }
    },
    onClick: function(btn) {
        this.startY = getPlayerY();
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_nodownglide"));
    }
};
SummitPE.registerModule(nodownglide);

var glide = {
    name: Languages.getString("hacks_glide"),
    desc: "Let you glide through the air. Sometimes good to bypass anti cheats",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    motion: -0.001,
    glideGui: null,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var gmText = new android.widget.TextView(ctx);
        gmText.setText("GlideMotion: " + this.motion);
        gmText.setTextColor(android.graphics.Color.BLACK);
        gmText.setTextSize(dip2px(9));
        gmText.setGravity(android.view.Gravity.CENTER);
        gmText.setTypeface(Utils.font);
        var gmSlider = Utils.ModSettings.getSlider();
        gmSlider.setMax(250);
        //rangeSlider.setMin(1);
        gmSlider.setProgress(-(this.motion + 0.001) * 1000);
        gmSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                var pro = (-progress / 1000) - 0.001;
                pro = Math.round(pro * 1000) / 1000;
                pro = pro.toString();
                if (pro.length == 2) pro += ".";
                while (pro.length < 6) pro += "0";

                gmText.setText("GlideMotion: " + pro);

            },
            onStopTrackingTouch: function(seekbar) {
                var pro = (-seekbar.getProgress() / 1000) - 0.001;
                pro = Math.round(pro * 1000) / 1000;
                glide.motion = pro;
            }
        }));
        //		if(Utils.bypassMode == BypassMode.FACILITY) {
        //			gmSlider.setEnabled(false);
        //			gmText.setText("Settings not available in MiniBox bypass mode!");
        //		}
        settings.addView(gmSlider, params);
        settings.addView(gmText, params);


        return settings;
    },
    showGui: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (glide.glideGui == null || glide.glideGui.isShowing() == false) {
                    var glideUpBtn = new android.widget.Button(ctx);
                    glideUpBtn.setTypeface(Utils.font);
                    glideUpBtn.setText("UP");
                    glideUpBtn.getBackground().setAlpha(200);
                    glideUpBtn.setPadding(10, 10, 10, 10);
                    glideUpBtn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(btn) {
                            if (SummitPE.inGame) Entity.setPositionRelative(getPlayerEnt(), 0, 1.01, 0);
                        }
                    }));
                    var glideDownBtn = new android.widget.Button(ctx);
                    glideDownBtn.setTypeface(Utils.font);
                    glideDownBtn.setText("DOWN");
                    glideDownBtn.getBackground().setAlpha(200);
                    glideDownBtn.setPadding(10, 10, 10, 10);
                    glideDownBtn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(btn) {
                            if (SummitPE.inGame) Entity.setPositionRelative(getPlayerEnt(), 0, -1.01, 0);
                        }
                    }));
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    layout.addView(glideUpBtn);
                    layout.addView(glideDownBtn);
                    glide.glideGui = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    glide.glideGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, 0, 0);
                }
            }
        }));

    },
    goDown: function() {
        var found = false;
        var cord = new Array(getPlayerX(), getPlayerY(), getPlayerZ());

        while (!found) {
            cord[1] = cord[1] - 1;
            if (getTile(cord[0], cord[1], cord[2]) != 0) found = true;
        }
        //Entity.setPosition(getPlayerEnt(), cord[0], cord[1]+2.7, cord[2]);
        setVelY(getPlayerEnt(), -4);

    },
    onModTick: function() {
        if (this.state && !Player.isFlying() && !Utils.Player.isInWater()) {
            switch (Utils.bypassMode) {
                case BypassMode.DEFAULT:
                    if (Entity.getVelY(getPlayerEnt()) < 0)
                        setVelY(getPlayerEnt(), this.motion);
                    break;
                case BypassMode.LBSG:
                    if (Entity.getVelY(getPlayerEnt()) < 0)
                        if (Utils.flyTick < 680) {
                            if (tick1 % 2 == 0) setVelY(getPlayerEnt(), -0.03);
                            else setVelY(getPlayerEnt(), -0.1);
                        } else {
                            setVelY(getPlayerEnt(), -3);
                        }
                    break;
            }

        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (!this.state && glide.glideGui != null && glide.glideGui.isShowing() != false)
            glide.glideGui.dismiss();
        else if (this.state)
            this.showGui();
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_glide"));
    }
};
SummitPE.registerModule(glide);

var criticals = {
    name: Languages.getString("hacks_criticals"),
    desc: "Most of your hits will be critical hits!",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    tick: 0,
    velTick: 0,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (this.state && this.tick < 25) {
            this.tick++;
            if (this.tick == 16) Entity.setPositionRelative(getPlayerEnt(), 0, 0.001, 0);


            if (this.tick == 15) {
                this.velTick = 15;
            }
            if (this.velTick > 0) {
                this.velTick--;
                setVelY(getPlayerEnt(), -0.000001);
            }

        }
    },
    onAttack: function(att, vic) {
        if (this.state && att == getPlayerEnt() && Entity.getVelY(getPlayerEnt()) >= -0.079 && Entity.getHealth(vic) > 0) {
            //clientMessage(this.tick);
            if (this.tick >= 16)
                this.tick = 0;

        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(Languages.getString("hacks_criticals"));
    }
};
SummitPE.registerModule(criticals);

var mPosXB = 0,
    mPosYB = 0,
    dxB = 0,
    dyB = 0;

FlytraMode = {
    typeFlight: {
        control: 0,
        autoLookFly: 1
    },
    typeFall: {
        noFall: 0,
        fallUp: 1,
        fallDown: 2
    },
    funcList: {
        typeFlight: {
            control: "getTypeFlight_control()",
            autoLookFly: "getTypeFlight_autoLookFly()"
        },
        typeFall: {
            noFall: "getTypeFall_noFall()",
            fallUp: "getTypeFall_FallUp()",
            fallDown: "getTypeFall_FallDown()"
        },
    }
};

var elytraFlight = {
    name: "FlytraFlight Plus",
    desc: "Let you glide through the air. Sometimes good to bypass anti cheats. Flying on elytra!",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    flyEnable: 1,
    elytraMode: FlytraMode.typeFlight.control,
    typeFall: FlytraMode.typeFall.fallUp,
    dPadEnable: false,
    boostButton: false,
    startY: 0,
    motionUp: 0.001,
    motionDown: -0.001,
    dPadGui: null,
    glideGui: null,
    boostButtonGui: null,
    boostButtonGuiMoving: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        /* Settings boost button */
        var boostButton = new android.widget.CheckBox(ctx);
        boostButton.setText("Boost button");
        boostButton.setTypeface(Utils.font);
        boostButton.setTextColor(android.graphics.Color.BLACK);
        boostButton.setChecked(this.boostButton);
        boostButton.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                elytraFlight.boostButton = v.isChecked();
                if (elytraFlight.boostButton) elytraFlight.showBoostButtonGui();
                else if (!this.boostButton && elytraFlight.boostButtonGui != null && elytraFlight.boostButtonGui.isShowing() != false) {
                    elytraFlight.boostButtonGui.dismiss();
                }
            }
        }));

        var settingTextOne = new android.widget.TextView(ctx);
        settingTextOne.setId(492820);
        settingTextOne.setText("Elytra mode");
        settingTextOne.setGravity(android.view.Gravity.CENTER);
        settingTextOne.setTextColor(android.graphics.Color.BLACK);
        settingTextOne.setTextSize(dip2px(12));
        settingTextOne.setTypeface(Utils.font);

        /* Elytra mode tab */
        var settingsHolderOne = new android.widget.LinearLayout(ctx);
        settingsHolderOne.setId(492818);
        settingsHolderOne.setPadding(0, 80, 0, 80);
        var settingsHolderParam = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1);

        var elytraGradient = new android.graphics.drawable.GradientDrawable();
        elytraGradient.setColor(getColorAHEXFromARGB(190, 0, 0, 0));
        elytraGradient.setStroke(dip2px(1), getColorAHEXFromARGB(200, 255, 255, 255));
        settingsHolderOne.setBackground(elytraGradient);
        var enabGradient = new android.graphics.drawable.GradientDrawable();
        enabGradient.setStroke(dip2px(2), android.graphics.Color.GREEN);

        var holderBtnOne = function(id, name, func) {
            var btn = new android.widget.TextView(ctx);
            btn.setText(name);

            btn.setGravity(android.view.Gravity.CENTER);
            btn.setTextColor(android.graphics.Color.WHITE);
            btn.setPadding(20, 20, 20, 20);
            btn.setTextSize(dip2px(10));
            btn.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
            btn.setMarqueeRepeatLimit(-1);
            btn.setSingleLine();
            btn.setHorizontallyScrolling(true);
            btn.setSelected(true);
            btn.setBackground(elytraFlight.elytraMode == id ? enabGradient : null);
            btn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    elytraFlight.elytraMode = id;
                    settings.removeView(settingsHolderOne);
                    settingsHolderOne.removeAllViews();

                    holderBtnsOne = [
                        holderBtnOne(FlytraMode.typeFlight.control, "Control", FlytraMode.funcList.typeFlight.control),
                        holderBtnOne(FlytraMode.typeFlight.autoLookFly, "Auto look fly", FlytraMode.funcList.typeFlight.autoLookFly),
                    ];

                    updateHolderOne();

                    var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, settingTextOne.getId());
                    params.addRule(android.widget.RelativeLayout.ABOVE, holderListOne.getId());
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                    settings.addView(settingsHolderOne, params);
                    settings.removeView(holderListOne);

                    holderListOne = eval(func);

                    var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, settingsHolderOne.getId());
                    params.addRule(android.widget.RelativeLayout.ABOVE, settingTextOne.getId());
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                    settings.addView(holderListOne, params);
                }
            }));
            return btn;
        };

        holderBtnsOne = [
            holderBtnOne(FlytraMode.typeFlight.control, "Control", FlytraMode.funcList.typeFlight.control),
            holderBtnOne(FlytraMode.typeFlight.autoLookFly, "Auto look fly", FlytraMode.funcList.typeFlight.autoLookFly),
        ];

        var updateHolderOne = function() {
            holderBtnsOne.forEach(function(entry) {
                settingsHolderOne.addView(entry, settingsHolderParam);
                settingsHolderParam = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1);
            });
        };

        updateHolderOne();

        var holderListOne = function() {
            if (elytraFlight.elytraMode == FlytraMode.typeFlight.control) return eval(FlytraMode.funcList.typeFlight.control);
            else return eval(FlytraMode.funcList.typeFlight.autoLookFly);
        }();

        /** Tab elytra mode - control **/
        function getTypeFlight_control() {
            var settingText = new android.widget.TextView(ctx);
            settingText.setId(492822);
            settingText.setText("Fly freely with your gamepad or our d-pad (indev)");
            settingText.setGravity(android.view.Gravity.CENTER);
            settingText.setTextColor(android.graphics.Color.BLACK);
            settingText.setTextSize(dip2px(12));
            settingText.setTypeface(Utils.font);
            return settingText;
        }
        /** Tab elytra mode - autoLootFly **/
        function getTypeFlight_autoLookFly() {
            var settingText = new android.widget.TextView(ctx);
            settingText.setId(492822);
            settingText.setText("You can only fly in the direction you are looking. Unfortunately, you can't stop during the flight yet.");
            settingText.setGravity(android.view.Gravity.CENTER);
            settingText.setTextColor(android.graphics.Color.BLACK);
            settingText.setTextSize(dip2px(12));
            settingText.setTypeface(Utils.font);
            return settingText;
        }

        var settingTextTwo = new android.widget.TextView(ctx);
        settingTextTwo.setId(492821);
        settingTextTwo.setText("Type fall");
        settingTextTwo.setGravity(android.view.Gravity.CENTER);
        settingTextTwo.setTextColor(android.graphics.Color.BLACK);
        settingTextTwo.setTextSize(dip2px(12));
        settingTextTwo.setTypeface(Utils.font);

        /* Type fall tab */
        var settingsHolderTwo = new android.widget.LinearLayout(ctx);
        settingsHolderTwo.setId(492819);
        settingsHolderTwo.setPadding(0, 80, 0, 80);
        var settingsHolderParam = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1);

        settingsHolderTwo.setBackground(elytraGradient);

        var holderBtnTwo = function(id, name, func) {
            var btn = new android.widget.TextView(ctx);
            btn.setText(name);

            btn.setGravity(android.view.Gravity.CENTER);
            btn.setTextColor(android.graphics.Color.WHITE);
            btn.setPadding(20, 20, 20, 20);
            btn.setTextSize(dip2px(10));
            btn.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
            btn.setMarqueeRepeatLimit(-1);
            btn.setSingleLine();
            btn.setHorizontallyScrolling(true);
            btn.setSelected(true);
            btn.setBackground(elytraFlight.typeFall == id ? enabGradient : null);
            btn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    elytraFlight.typeFall = id;
                    settings.removeView(settingsHolderTwo);
                    settingsHolderTwo.removeAllViews();

                    holderBtnsTwo = [
                        holderBtnTwo(FlytraMode.typeFall.noFall, "No fall", FlytraMode.funcList.typeFall.noFall),
                        holderBtnTwo(FlytraMode.typeFall.fallUp, "Fall UP", FlytraMode.funcList.typeFall.fallUp),
                        holderBtnTwo(FlytraMode.typeFall.fallDown, "Fall DOWN", FlytraMode.funcList.typeFall.fallDown)
                    ];

                    updateHolderTwo();

                    var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, settingTextTwo.getId());
                    params.addRule(android.widget.RelativeLayout.ABOVE, holderListTwo.getId());
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                    settings.addView(settingsHolderTwo, params);
                    settings.removeView(holderListTwo);

                    holderListTwo = eval(func);

                    var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    params.addRule(android.widget.RelativeLayout.BELOW, settingsHolderTwo.getId());
                    params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                    //params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                    //params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                    settings.addView(holderListTwo, params);
                }
            }));
            return btn;
        };

        holderBtnsTwo = [
            holderBtnTwo(FlytraMode.typeFall.noFall, "No fall", FlytraMode.funcList.typeFall.noFall),
            holderBtnTwo(FlytraMode.typeFall.fallUp, "Fall UP", FlytraMode.funcList.typeFall.fallUp),
            holderBtnTwo(FlytraMode.typeFall.fallDown, "Fall DOWN", FlytraMode.funcList.typeFall.fallDown)
        ];

        var updateHolderTwo = function() {
            holderBtnsTwo.forEach(function(entry) {
                settingsHolderTwo.addView(entry, settingsHolderParam);
                settingsHolderParam = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1);
            });
        };

        updateHolderTwo();

        var holderListTwo = function() {
            if (elytraFlight.typeFall == FlytraMode.typeFall.fallUp) return eval(FlytraMode.funcList.typeFall.fallUp);
            else if (elytraFlight.typeFall == FlytraMode.typeFall.fallDown) return eval(FlytraMode.funcList.typeFall.fallDown);
            else return eval(FlytraMode.funcList.typeFall.noFall);
        }();

        /** Tab elytra mode - control **/
        function getTypeFall_noFall() {
            var settingText = new android.widget.TextView(ctx);
            settingText.setId(492823);
            settingText.setText("You will not slowly fall or take off during the flight. You can get a kick from the server for this");
            settingText.setGravity(android.view.Gravity.CENTER);
            settingText.setTextColor(android.graphics.Color.BLACK);
            settingText.setTextSize(dip2px(12));
            settingText.setTypeface(Utils.font);
            return settingText;
        }
        /** Tab elytra mode - autoLootFly **/
        function getTypeFall_FallUp() {
            var settingsMode = new android.widget.LinearLayout(ctx);
            settingsMode.setId(492823);
            settingsMode.setOrientation(1);
            var settingText = new android.widget.TextView(ctx);
            settingText.setText("You will slowly fly up. This will allow the server not to kick you for flying. In this tab you can change the flight speed up");
            settingText.setGravity(android.view.Gravity.CENTER);
            settingText.setTextColor(android.graphics.Color.BLACK);
            settingText.setTextSize(dip2px(12));
            settingText.setTypeface(Utils.font);

            var gmText = new android.widget.TextView(ctx);
            gmText.setText("GlideMotionUp: " + elytraFlight.motionUp);
            gmText.setTextColor(android.graphics.Color.BLACK);
            gmText.setTextSize(dip2px(14));
            gmText.setGravity(android.view.Gravity.CENTER);
            gmText.setTypeface(Utils.font);
            var gmSlider = Utils.ModSettings.getSlider();
            gmSlider.setMax(250);
            //rangeSlider.setMin(1);
            gmSlider.setProgress((elytraFlight.motionUp + 0.001) * 1000);
            gmSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
                onProgressChanged: function(seekBar, progress, fromUser) {
                    var pro = (progress / 1000) + 0.001;
                    pro = Math.round(pro * 1000) / 1000;
                    pro = pro.toString();
                    if (pro.length == 2) pro += ".";
                    while (pro.length < 6) pro += "0";

                    gmText.setText("GlideMotionUp: " + pro);
                },
                onStopTrackingTouch: function(seekbar) {
                    var pro = (seekbar.getProgress() / 1000) + 0.001;
                    pro = Math.round(pro * 1000) / 1000;
                    elytraFlight.motionUp = pro;
                }
            }));
            var params = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
            settingsMode.addView(settingText, params);
            settingsMode.addView(gmText, params);
            settingsMode.addView(gmSlider, params);
            return settingsMode;
        }

        function getTypeFall_FallDown() {
            var settingsMode = new android.widget.LinearLayout(ctx);
            settingsMode.setId(492823);
            settingsMode.setOrientation(1);
            var settingText = new android.widget.TextView(ctx);
            settingText.setText("You will slowly fly down. This will also allow the server to not kick you for flying. In this tab you can change the flight speed down");
            settingText.setGravity(android.view.Gravity.CENTER);
            settingText.setTextColor(android.graphics.Color.BLACK);
            settingText.setTextSize(dip2px(12));
            settingText.setTypeface(Utils.font);

            var gmText = new android.widget.TextView(ctx);
            gmText.setText("GlideMotionDown: " + elytraFlight.motionDown);
            gmText.setTextColor(android.graphics.Color.BLACK);
            gmText.setTextSize(dip2px(14));
            gmText.setGravity(android.view.Gravity.CENTER);
            gmText.setTypeface(Utils.font);
            var gmSlider = Utils.ModSettings.getSlider();
            gmSlider.setMax(250);
            //rangeSlider.setMin(1);
            gmSlider.setProgress(-(elytraFlight.motionDown + 0.001) * 1000);
            gmSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
                onProgressChanged: function(seekBar, progress, fromUser) {
                    var pro = (-progress / 1000) - 0.001;
                    pro = Math.round(pro * 1000) / 1000;
                    pro = pro.toString();
                    if (pro.length == 2) pro += ".";
                    while (pro.length < 6) pro += "0";

                    gmText.setText("GlideMotionDown: " + pro);
                },
                onStopTrackingTouch: function(seekbar) {
                    var pro = (-seekbar.getProgress() / 1000) - 0.001;
                    pro = Math.round(pro * 1000) / 1000;
                    elytraFlight.motionDown = pro;
                }
            }));
            var params = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
            8
            settingsMode.addView(settingText, params);
            settingsMode.addView(gmText, params);
            settingsMode.addView(gmSlider, params);
            return settingsMode;
        }

        //layout alignement....
        boostButton.setPadding(0, 10, 0, 10);
        params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
        //params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        settings.addView(boostButton, params);

        settingTextOne.setPadding(0, 20, 0, 20);
        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.BELOW, boostButton.getId());
        params.addRule(android.widget.RelativeLayout.ABOVE, settingsHolderOne.getId());
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        settings.addView(settingTextOne, params);

        settingsHolderOne.setPadding(0, 10, 0, 10);
        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.BELOW, settingTextOne.getId());
        params.addRule(android.widget.RelativeLayout.ABOVE, holderListOne.getId());
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        settings.addView(settingsHolderOne, params);

        holderListOne.setPadding(0, 10, 0, 20);
        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.BELOW, settingsHolderOne.getId());
        params.addRule(android.widget.RelativeLayout.ABOVE, settingTextTwo.getId());
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        settings.addView(holderListOne, params);

        settingTextTwo.setPadding(0, 20, 0, 10);
        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.BELOW, holderListOne.getId());
        params.addRule(android.widget.RelativeLayout.ABOVE, settingsHolderTwo.getId());
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        settings.addView(settingTextTwo, params);

        settingsHolderTwo.setPadding(0, 10, 0, 10);
        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.BELOW, settingTextTwo.getId());
        params.addRule(android.widget.RelativeLayout.ABOVE, holderListTwo.getId());
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        settings.addView(settingsHolderTwo, params);

        holderListTwo.setPadding(0, 10, 0, 20);
        var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
        params.addRule(android.widget.RelativeLayout.BELOW, settingsHolderTwo.getId());
        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
        //params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
        //params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
        settings.addView(holderListTwo, params);

        var settingsScroll = new android.widget.ScrollView(ctx);
        settingsScroll.addView(settings);
        settingsScroll.setId(438358);
        settingsScroll.setPadding(20, 20, 20, 20);
        return settingsScroll;
    },
    showDPadGui: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (elytraFlight.dPadGui == null || elytraFlight.dPadGui.isShowing() == false) {
                    //TODOE
                    elytraFlight.dPadGui = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    elytraFlight.dPadGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.CENTER, 0, 0);
                }
            }
        }));
    },
    showGlideGui: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (elytraFlight.glideGui == null || elytraFlight.glideGui.isShowing() == false) {
                    var glideUpBtn = new android.widget.Button(ctx);
                    glideUpBtn.setTypeface(Utils.font);
                    glideUpBtn.setText("UP");
                    glideUpBtn.getBackground().setAlpha(200);
                    glideUpBtn.setPadding(10, 10, 10, 10);
                    glideUpBtn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(btn) {
                            if (SummitPE.inGame) {
                                var motion = 0;

                                if (elytraFlight.typeFall != FlytraMode.typeFall.noFall) motion = 1.01;
                                else motion = 1;

                                elytraFlight.startY += motion;
                                Entity.setPositionRelative(getPlayerEnt(), 0, motion, 0);
                            }
                        }
                    }));
                    var glideDownBtn = new android.widget.Button(ctx);
                    glideDownBtn.setTypeface(Utils.font);
                    glideDownBtn.setText("DOWN");
                    glideDownBtn.getBackground().setAlpha(200);
                    glideDownBtn.setPadding(10, 10, 10, 10);
                    glideDownBtn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(btn) {
                            if (SummitPE.inGame) {
                                var motion = 0;

                                if (elytraFlight.typeFall != FlytraMode.typeFall.noFall) motion = -1.01;
                                else motion = -1;

                                elytraFlight.startY -= -(motion);
                                Entity.setPositionRelative(getPlayerEnt(), 0, motion, 0);
                            }
                        }
                    }));
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    layout.addView(glideUpBtn);
                    layout.addView(glideDownBtn);
                    elytraFlight.glideGui = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    elytraFlight.glideGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, 0, 0);
                }
            }
        }));
    },
    showBoostButtonGui: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    if (elytraFlight.boostButtonGui == null || elytraFlight.boostButtonGui.isShowing() == false) {
                        var layout = new android.widget.LinearLayout(ctx);
                        layout.setOrientation(1);
                        var button = new android.widget.Button(ctx);
                        button.setText("Boost");
                        button.setPadding(10, 10, 10, 10);
                        button.setTextSize(9);
                        button.setTextColor(android.graphics.Color.parseColor("#42f4e2"));
                        button.getBackground().setAlpha(160);
                        button.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.FILL_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
                        button.setOnClickListener(new android.view.View.OnClickListener({
                            onClick: function(viewarg) {
                                //ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                                if (SummitPE.inGame) {
                                    var playerDir = [0, 0, 0];
                                    Utils.vector.toDirectionalVector(playerDir, (getYaw() + 90) * Math['PI'] / 180, getPitch() * Math['PI'] / 180 * -1);
                                    setVelX(getPlayerEnt(), 12 * playerDir[0]);
                                    setVelZ(getPlayerEnt(), 12 * playerDir[2]);
                                    setVelY(getPlayerEnt(), 1 * playerDir[1]);
                                }
                            }
                        }));
                        button.setOnLongClickListener(new android.view.View.OnLongClickListener({
                            onLongClick: function() {
                                ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                                elytraFlight.boostButtonGuiMoving = true;
                                return true;
                            }
                        }));

                        button.setOnTouchListener(new android.view.View.OnTouchListener({
                            onTouch: function(a, b) {
                                try {
                                    if (!elytraFlight.boostButtonGuiMoving) return false;
                                    switch (b.getAction()) {
                                        case android.view.MotionEvent.ACTION_DOWN:
                                            dxB = mPosXB - b.getRawX();
                                            dyB = mPosYB - b.getRawY();
                                            break;
                                        case android.view.MotionEvent.ACTION_MOVE:
                                            mPosXB = b.getRawX() + dxB;
                                            mPosYB = b.getRawY() + dyB;
                                            elytraFlight.boostButtonGui.update(mPosXB, mPosYB, -1, -1);
                                            break;
                                        case android.view.MotionEvent.ACTION_UP:
                                        case android.view.MotionEvent.ACTION_CANCEL:
                                            elytraFlight.boostButtonGuiMoving = false;
                                    }
                                } catch (e) {
                                    SummitPE.ctoast("Error(#" + e.lineNumber + "): " + e);
                                }
                                return true;
                            }
                        }));
                        layout.addView(button);

                        elytraFlight.boostButtonGui = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        elytraFlight.boostButtonGui.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                        //elytraFlight.boostButtonGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, mPosXB + 1700, mPosYB);//0, 200
                        elytraFlight.boostButtonGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.CENTER, 1500, 500);
                    }
                } catch (e) {
                    SummitPE.ctoast("Error(#" + e.lineNumber + "): " + e);
                }
            }
        }));
    },
    onTick: function() {
        if (!this.state || !SummitPE.inGame)
            return;
        //if (!Player.isFlying() && !Utils.Player.isInWater()) {
        if (this.typeFall != FlytraMode.typeFall.noFall) { //this.elytraMode != FlytraMode.typeFlight.autoLookFly
            var motion = (this.typeFall == FlytraMode.typeFall.fallUp) ? (this.motionUp) : (this.motionDown);

            switch (Utils.bypassMode) {
                case BypassMode.DEFAULT:
                    if (Entity.getVelY(getPlayerEnt()) < 0)
                        setVelY(getPlayerEnt(), motion);
                    break;
                case BypassMode.LBSG:
                    if (Entity.getVelY(getPlayerEnt()) < 0)
                        if (Utils.flyTick < 680) {
                            if (tick1 % 2 == 0) setVelY(getPlayerEnt(), -0.03);
                            else setVelY(getPlayerEnt(), -0.1);
                        } else {
                            setVelY(getPlayerEnt(), -3);
                        }
                    break;
            }
        } else {
            setPosition(getPlayerEnt(), getPlayerX(), this.startY, getPlayerZ());
        }

        if (this.elytraMode == FlytraMode.typeFlight.autoLookFly) {
            if (!Utils.Player.onGround() && getPitch(getPlayerEnt()) < -40) {
                vector = [];
                var yaw = getYaw() + 90;
                var pitch = getPitch() - 180;
                vector[0] = Math.cos(yaw);
                vector[1] = Math.sin(pitch);
                vector[2] = Math.sin(yaw);
                setVelX(Player.getEntity(), vector[0] * 1);
                setVelY(Player.getEntity(), vector[1] * 1);
                setVelZ(Player.getEntity(), vector[2] * 1);
            }
        }
        //}
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (!this.state && elytraFlight.glideGui != null && elytraFlight.glideGui.isShowing() != false)
            elytraFlight.glideGui.dismiss();
        if (!this.state && elytraFlight.dPadGui != null && elytraFlight.dPadGui.isShowing() != false)
            elytraFlight.dPadGui.dismiss();
        /* if (!this.state && elytraFlight.boostButtonGui != null && elytraFlight.boostButtonGui.isShowing() != false)
            elytraFlight.boostButtonGui.dismiss(); */
        if (this.state) {
            this.startY = getPlayerY();

            if (this.dPadEnable) this.showDPadGui();
            this.showGlideGui();
            if (this.boostButton) this.showBoostButtonGui();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(this.name);
    }
};
SummitPE.registerModule(elytraFlight);

/*
//fastfall func
if (Entity.getVelY(getPlayerEnt()) < -0.5) {
    setVelY(Player.getEntity(), 0.00000)
}
*/

/*
toDirectionalVector(playerDir, (Entity.getYaw(Player.getEntity()) + 90) * (Math.PI / 180), Entity.getPitch(Player.getEntity()) * (Math.PI / 180) * -1);
var player = Player.getEntity();
setPosition(Player.getEntity(), Player.getX() + (speed * playerDir[0]), Player.getY() + (speed * playerDir[1]), Player.getZ() + (speed * playerDir[2]))
*/

var chesttracers = {
    name: Languages.getString("hacks_chestTracer"),
    desc: "Makes chests better visible",
    type: ModuleType.mod,
    category: ModCategory.RENDER,
    state: false,
    findTick: 0,
    particleEnable: true,
    groundMode: true,
    tracesEnable: false,
    drawBox: false,
    ChestScan: {
        blocks: 0,
        finished: false,
        scanning: false
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var rangeText = new android.widget.TextView(ctx);
        rangeText.setText("Range: " + this.radius);
        rangeText.setTextColor(android.graphics.Color.BLACK);
        rangeText.setTextSize(dip2px(9));
        rangeText.setGravity(android.view.Gravity.CENTER);
        rangeText.setTypeface(Utils.font);
        var rangeSlider = Utils.ModSettings.getSlider();
        rangeSlider.setMax(100);
        //rangeSlider.setMin(1);
        rangeSlider.setProgress(this.radius);
        rangeSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                rangeText.setText("Range: " + progress);

            },
            onStopTrackingTouch: function(seekbar) {
                chesttracers.radius = seekbar.getProgress();
            }
        }));
        var particleEnable = new android.widget.CheckBox(ctx);
        particleEnable.setChecked(this.particleEnable);
        particleEnable.setText("Particles");
        particleEnable.setTypeface(Utils.font);
        particleEnable.setTextSize(dip2px(8));
        particleEnable.setTextColor(android.graphics.Color.BLACK);

        particleEnable.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                chesttracers.particleEnable = v.isChecked();
                v.setChecked(chesttracers.particleEnable);
            }
        }));
        var groundCheck = new android.widget.CheckBox(ctx);
        groundCheck.setChecked(this.groundMode);
        groundCheck.setText("Ground Mode");
        groundCheck.setTypeface(Utils.font);
        groundCheck.setTextSize(dip2px(8));
        groundCheck.setTextColor(android.graphics.Color.BLACK);

        groundCheck.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                chesttracers.groundMode = v.isChecked();
                v.setChecked(chesttracers.groundMode);
            }
        }));
        var tracesEnable = new android.widget.CheckBox(ctx);
        tracesEnable.setChecked(this.tracesEnable);
        tracesEnable.setText("Traces");
        tracesEnable.setTypeface(Utils.font);
        tracesEnable.setTextSize(dip2px(8));
        tracesEnable.setTextColor(android.graphics.Color.BLACK);

        tracesEnable.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                chesttracers.tracesEnable = v.isChecked();
                v.setChecked(chesttracers.tracesEnable);
            }
        }));
        var drawEspBox = new android.widget.CheckBox(ctx);
        drawEspBox.setChecked(this.drawBox);
        drawEspBox.setText("Draw ESPBox around Chests [Only 1.0+]");
        drawEspBox.setTypeface(Utils.font);
        drawEspBox.setTextSize(dip2px(8));
        drawEspBox.setTextColor(android.graphics.Color.BLACK);

        drawEspBox.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                chesttracers.drawBox = v.isChecked();
                v.setChecked(chesttracers.drawBox);
            }
        }));
        var chestScan = new android.widget.TextView(ctx);
        chestScan.setTypeface(Utils.font);
        chestScan.setGravity(android.view.Gravity.CENTER);
        chestScan.setTextSize(dip2px(9));
        chestScan.setPadding(dip2px(5), 0, dip2px(5), 0);
        chestScan.setTextColor(android.graphics.Color.BLACK);
        if (this.ChestScan.finished)
            chestScan.setText("ChestScan finished. " + this.chests.length + " Chests found (" + this.ChestScan.blocks + " Blocks checked)");
        else if (this.ChestScan.scanning)
            chestScan.setText("Currently scanning for Chests. " + this.ChestScan.blocks + " Blocks already checked");
        else
            chestScan.setText("Chest Scan not started yet");
        var refreshBG = new android.graphics.drawable.GradientDrawable();
        refreshBG.setColor(getColorAHEXFromARGB(90, 30, 30, 30));
        refreshBG.setStroke(dip2px(2), android.graphics.Color.BLACK);
        var refresh = new android.widget.Button(ctx);
        refresh.setBackground(refreshBG);
        refresh.setTypeface(Utils.font);
        refresh.setTextColor(android.graphics.Color.WHITE);
        refresh.setTextSize(dip2px(8));
        refresh.setText("Refresh");
        refresh.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                if (chesttracers.ChestScan.finished) {
                    chestScan.setText("ChestScan finished. " + chesttracers.chests.length + " Chests found (" + chesttracers.ChestScan.blocks + " Blocks checked)");
                } else if (chesttracers.ChestScan.scanning) {
                    chestScan.setText("Currently scanning for Chests. " + chesttracers.ChestScan.blocks + " Blocks already checked");
                } else {
                    chestScan.setText("Chest Scan not started yet");
                }
            }
        }));

        settings.addView(rangeSlider, params);
        settings.addView(rangeText, params);
        settings.addView(particleEnable, params);
        settings.addView(groundCheck, params);
        settings.addView(tracesEnable, params);
        settings.addView(drawEspBox, params);
        settings.addView(chestScan, params);
        settings.addView(refresh, params);
        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    radius: 50,
    chests: new Array(),
    fCheckerThread: null,
    findChests: function() {
        if (this.ChestScan.scanning == true) return;
        this.ChestScan.finished = false;
        this.ChestScan.scanning = true;
        this.ChestScan.blocks = 0;
        var startX = Math.round(getPlayerX());
        var startZ = Math.round(getPlayerZ());
        var startRadius = this.radius;
        var blocks = 0;
        var newChests = new Array();
        var finished = [false, false, false, false];
        var tmpTile = 0;
        var lt = new java.lang.Runnable({
            run: function() {

                for (var x = startX - startRadius; x < startX; x++) {
                    for (var z = startZ; z < startZ + startRadius; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == 54 || tmpTile == 218 || tmpTile == 154) newChests.push([x, y, z]);
                                blocks++;

                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread1 finished");
                finished[0] = true;
            }
        });
        var t = new java.lang.Thread(lt);
        t.start();
        var rt = new java.lang.Runnable({
            run: function() {

                for (var x = startX; x < startX + startRadius; x++) {
                    for (var z = startZ; z < startZ + startRadius; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == 54 || tmpTile == 218 || tmpTile == 154) newChests.push([x, y, z]);

                                blocks++;
                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread2 finished");
                finished[1] = true;
            }
        });
        var t2 = new java.lang.Thread(rt);
        t2.start();
        var lb = new java.lang.Runnable({
            run: function() {

                for (var x = startX - startRadius; x < startX; x++) {
                    for (var z = startZ - startRadius; z < startZ; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == 54 || tmpTile == 218 || tmpTile == 154) newChests.push([x, y, z]);

                                blocks++;
                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread3 finished");
                finished[2] = true;
            }
        });
        var t3 = new java.lang.Thread(lb);
        t3.start();
        var rb = new java.lang.Runnable({
            run: function() {

                for (var x = startX; x < startX + startRadius; x++) {
                    for (var z = startZ - startRadius; z < startZ; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == 54 || tmpTile == 218 || tmpTile == 154) newChests.push([x, y, z]);

                                blocks++;
                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread4 finished");
                finished[3] = true;
            }
        });
        var t4 = new java.lang.Thread(rb);
        t4.start();
        var finishChecker = new java.lang.Runnable({
            run: function() {
                var wasEmpty = false;
                wasEmpty = chesttracers.chests.length == 0;
                while (!finished[0] || !finished[1] || !finished[2] || !finished[3]) {
                    java.lang.Thread.sleep(250);
                    chesttracers.ChestScan.blocks = blocks;
                    if (wasEmpty) chesttracers.chests = newChests;
                    //ModPE.showTipMessage("Blocks: "+blocks);
                }
                //SummitPE.cmsg("Chest scan done. Found "+chesttracers.chests.length+" Chests ("+blocks+" Blocks scanned)");
                chesttracers.fCheckerThread = null;
                chesttracers.chests = newChests;
                chesttracers.ChestScan.finished = true;
                chesttracers.ChestScan.scanning = false;
            }
        });
        this.fCheckerThread = new java.lang.Thread(finishChecker);
        this.fCheckerThread.start();
    },
    onTick: function() {
        if (this.state && SummitPE.inGame) {
            if (this.ChestScan.scanning == false) this.findTick++;

            if (this.findTick >= 63 * this.radius / 3) { //33
                this.findTick = 0;

                if (this.fCheckerThread == null)
                    this.findChests();
            }
            if (chesttracers.particleEnable) {
                this.chests.forEach(function(entry) {
                    var x = getPlayerX() - entry[0] - 0.5;
                    var y = getPlayerY() - entry[1] - 0.5;
                    var z = getPlayerZ() - entry[2] - 0.5;
                    var dist = Math.sqrt(Math.pow(x, 2) * Math.pow(y, 2) * Math.pow(z, 2));
                    while (x > 2 || x < -2 || y > 2 || y < -2 || z > 2 || z < -2) {
                        x /= 1.5;
                        y /= 1.5;
                        z /= 1.5;
                    }
                    Level.addParticle(ParticleType.flame, getPlayerX() - x, getPlayerY() - y - (chesttracers.groundMode ? 0.6 : 0), getPlayerZ() - z, -x / 3, -y / 3, -z / 3, 2);

                });
            }
        }
    },
    onRender: function(gl) {
        if (!SummitPE.inGame) return;

        if (chesttracers.state && chesttracers.drawBox) {
            chesttracers.chests.forEach(function(entry) {
                Utils.Render.drawBox(gl, entry[0] + 1 / 16, entry[1] + 1, entry[2] + 1 / 16, 1 / 16 * 15, 0.875, 1 / 16 * 15);
            });
        }

        if (chesttracers.state && chesttracers.tracesEnable) {
            this.chests.forEach(function(entry) {
                var x = getPlayerX() - entry[0] - 0.5;
                var y = getPlayerY() - entry[1] - 0.5;
                var z = getPlayerZ() - entry[2] - 0.5;
                var dist = Math.sqrt(Math.pow(x, 2) * Math.pow(y, 2) * Math.pow(z, 2));

                if (dist <= 200 && dist > 0.1 && Entity.getEntityTypeId(entry) <= 63)
                    Utils.Render.drawLine(gl, x, y + 0.5, z, entry[0], entry[1] + 1, entry[2]);
            });
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state)
            this.findChests();
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_chestTracer"));
    }
};
SummitPE.registerModule(chesttracers);

var playerEsp = {
    name: Languages.getString("hacks_playerEsp"),
    desc: "Draws a box around players [Works in 1.0 - 1.12]",
    type: ModuleType.mod,
    category: ModCategory.RENDER,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onRender: function(gl) {
        if (playerEsp.state && getPlayerEnt() != -1 && getPlayerEnt() != -1 && true) {
            var mobs = Utils.Entity.getAll();
            var players = Server.getAllPlayers();
            var entityes = [].concat(mobs, players);

            entityes.forEach(function(entry) {
                if (entry != getPlayerEnt() && Entity.getEntityTypeId(entry) == EntityType.PLAYER) {
                    Utils.Render.drawBox(gl, Entity.getX(entry) - 0.5, Entity.getY(entry) - 0.5, Entity.getZ(entry) - 0.50, 1, 2, 1);

                }
            });
            /* players.forEach(function(entry) {
                if (entry != getPlayerEnt() && Entity.getEntityTypeId(entry) == EntityType.PLAYER) {
                    Utils.Render.drawBox(gl, Entity.getX(entry) - 0.5, Entity.getY(entry) - 0.5, Entity.getZ(entry) - 0.5, 1, 2, 1);

                }
            }); */

            //Utils.Render.drawBox(gl,Player.getPointedVecX()-0.5, Player.getPointedVecY()+1,Player.getPointedVecZ()-0.5, 1, 2, 1);

        }

    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_playerEsp"));
    }
};
SummitPE.registerModule(playerEsp);

var tracers = {
    name: "Tracers",
    desc: "Draws lines from you to your enemy [Works in 1.0 - 1.12]",
    type: ModuleType.mod,
    category: ModCategory.RENDER,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onRender: function(gl) {
        if (!this.state)
            return
        var all = Utils.Entity.getAll();
        var players = Server.getAllPlayers();
        var entityes = [].concat(all, players);

        var px = getPlayerX();
        var py = getPlayerY();
        var pz = getPlayerZ();

        entityes.forEach(function(entry) {
            var x = Entity.getX(entry) - px;
            var y = Entity.getY(entry) - py;
            var z = Entity.getZ(entry) - pz;

            var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));



            if (dist <= 200 && dist > 0.1 && Entity.getEntityTypeId(entry) <= 63)
                Utils.Render.drawLine(gl, px, py + 0.8, pz, Entity.getX(entry), Entity.getY(entry) + 1, Entity.getZ(entry));
        });
        /* players.forEach(function(entry) {
            var x = Entity.getX(entry) - px;
            var y = Entity.getY(entry) - py;
            var z = Entity.getZ(entry) - pz;

            var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

            if (dist <= 200 && dist > 0.1 && Entity.getEntityTypeId(entry) <= 63)
                Utils.Render.drawLine(gl, px, py + 0.8, pz, Entity.getX(entry), Entity.getY(entry) + 1, Entity.getZ(entry));
        }); */
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(tracers);

var previousVisualRoadPart = [];
var visualRoadTimer = 0;

function visualRoad() {
    visualRoadTimer++;
    if (visualRoadTimer >= 5) {
        visualRoadTimer = 0;
        var x = Math.floor(getPlayerX());
        var y = Math.floor(getPlayerY());
        var z = Math.floor(getPlayerZ());
        for (var i = 0; i < previousVisualRoadPart.length; i++) {
            Level.setTile(previousVisualRoadPart[i][0], previousVisualRoadPart[i][1], previousVisualRoadPart[i][2], 0);
        }
        previousVisualRoadPart = [];
        for (var xx = x - 1; xx <= x + 1; xx++) {
            for (var zz = z - 1; zz <= z + 1; zz++) {
                if (Level.getTile(xx, y - 2, zz) == 0) {
                    Level.setTile(xx, y - 2, zz, 20);
                    previousVisualRoadPart.push([xx, y - 2, zz]);
                }
            }
        }
    }
}

var visualRoadDraw = {
    name: "Visual road",
    desc: "Draws lines from you to path",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    /* onRender: function (gl) {
    	if(!this.state)
    		return
    	var all = Utils.Entity.getAll();
    	var players = Server.getAllPlayers();
    	var px = getPlayerX();
    	var py = getPlayerY();
    	var pz = getPlayerZ();
    	all.forEach(function (entry) {
    		var x = Entity.getX(entry) - px;
    		var y = Entity.getY(entry) - py;
    		var z = Entity.getZ(entry) - pz;

    		var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));



    		if(dist <= 200 && dist > 0.1 && Entity.getEntityTypeId(entry) <= 63)
    			Utils.Render.drawLine(gl, px, py + 0.8, pz, Entity.getX(entry), Entity.getY(entry) + 1, Entity.getZ(entry));
    	});
    	players.forEach(function (entry) {
    		var x = Entity.getX(entry) - px;
    		var y = Entity.getY(entry) - py;
    		var z = Entity.getZ(entry) - pz;

    		var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

    		if(dist <= 200 && dist > 0.1 && Entity.getEntityTypeId(entry) <= 63)
    			Utils.Render.drawLine(gl, px, py + 0.8, pz, Entity.getX(entry), Entity.getY(entry) + 1, Entity.getZ(entry));
    	});
    }, */
    onModTick: function() {
        visualRoad();
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(visualRoadDraw);

var coords = {
    name: Languages.getString("hacks_coords"),
    desc: "Displays your coordinates",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    requireGame: true,
    coordGui: null,
    coordView: null,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (!SummitPE.inGame && !this.state) {
            return true;
        } else if (!SummitPE.inGame && this.state) {
            this.state = false;
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    if (coords.coordGui != null) coords.coordGui.dismiss();
                }
            }));

            SummitPE.ctoast(coords.name + " is disabled, please join the game");
        }

        if (this.state && (getPlayerEnt() == -1 || getPlayerEnt() == -1))
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    if (coords.coordGui != null) coords.coordGui.dismiss();
                }
            }));
        else if (this.state && tick1 % 4 == 0) { //8
            this.showGui("X: " + Math.floor(getPlayerX()) + "\nY: " + Math.floor(getPlayerY()) + "\nZ: " + Math.floor(getPlayerZ()));
        }
    },
    showGui: function(text) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (coords.coordGui == null || coords.coordGui.isShowing() == false) {
                    var bg = new android.graphics.drawable.GradientDrawable();
                    bg.setColor(getColorAHEXFromARGB(150, 20, 20, 20));
                    bg.setCornerRadius(dip2px(3));
                    coords.coordView = new android.widget.TextView(ctx);
                    coords.coordView.setTypeface(Utils.font);
                    coords.coordView.setTextColor(android.graphics.Color.WHITE);
                    coords.coordView.setBackground(bg);
                    coords.coordView.setText(text);
                    coords.coordGui = new android.widget.PopupWindow(coords.coordView, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    coords.coordGui.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    coords.coordGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.CENTER, 0, 0);
                } else {
                    coords.coordView.setText(text);
                }
            }
        }));

    },
    onClick: function(btn) {
        this.state = !this.state;
        if (!this.state) ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                coords.coordGui.dismiss();
            }
        }));
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText(Languages.getString("hacks_coords"));
    }
};
SummitPE.registerModule(coords);

var crosshair = {
    name: "Crosshair",
    desc: "Displays your coordinates",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    requireGame: true,
    icon: "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAclBMVEUAAAAex/r/KAAAAAAPZX8ZqNMFJS4XmcAcwPESgKEMUGUbuOgIN0YdwvQbteQEIioDGB8Zq9YNWXAGKzcBDA8cve4Vk7kJQFAHMT4artoYos0Rd5YPaYUOYXsKSVwUh6kQcI0MU2kDFBkXncYVjbEUiq08MseMAAAAAXRSTlMAQObYZgAABCxJREFUeNrs3etu2kAQQGGmawrEGBts7pB73v8VuzZWK4QLmVaI2fU5v6JcmNlPCZdEgQEREREREdG/JR0NCCywrgSWIrAUgaUILEVgKQJLEVj3rQtBj9UTSrDAagJLEViKwFIEliKwFIGlCKz7Jrf7f6yOgnyoBBZYp8BSBJYisBSBpQgsRWApAsv3KARLWN8NLLDAAgsssMACCyywwBJ51B8swAILLLDAAgsssMACC6zuFZgR+UHAMjYjmoOAZWxGNAcBy9iMaA4ClrEZ0RwELGMzojkIWMZmRHMQsIzNiOYgYBmbEc1BwDI2I5qD3HGG/C7wg3zzRFYvGiywwHr4RYMFFlgPv2iwwALLzvrRTAt8fbDMTgt8fbDMTgt8fbDMTgt8fbDMTgt8fbDMTgt8fbDMTgt8fbDMTgt8fbDMTgt8fbDMTgt8/XtOu/9TW/7o6Prc619r4GxggQUWWGCBBRZYYIH1cCx9eqzHX4r5wAKrCSxFYCkCSxFYisBSBJYisIiIiIiIKIbkZrG+/NX1wOoxVuJ8P4dyo/GTG4F1CyupP3YDa/gz6QfWdYYW62pgtYF1VovVqKzWVXFMxbdd5K54XmXp1NVN0xPayE22i6Ja76Ruud+4av05nrimXmG9l67ubexRCne6KrvA2lTOV85FZLZ2TaM+Yrnycynz6fuHZIv3l0yy3XH+58ewxaoOM1km7lX8J7nnuWTzZNTHH8O8UZm4L/+ufCdNF1gT8Q3zReaFpjOp6+l1lkjrsXf5YVRTdGPNpk9j/3Yr1HesbJ875/IX6cZKa6yJf7up71i+2epYVKu/YPGddY7le3EHkSTvxvJCa66zvEf69pV6kqSmeXWHTOQSq7k13J5uDbdluesFVvvY8Bxr6prqb52PormfdYkl8/azRt6tJ/ezurBkmJTObfZL8a02rnhbdmDJ8nXjqudVJpIeC1f2AEsRv6I5CyxjmxIREREREfFPAwOwOgJLEViKwFIEliKwFIGlCCxFYPHEPTzLEVhggQUWWGCBBRZYcWEF/nT2vNLAwP60wNcHy+y0wNcHy+y0wNcHy+y0wNcHy+y0wNcHy+y0wNf/1d4d4yAMRDEUhPtfmgKJEsUCKV5r3gHi/OloAqzatcNfH1bt2uGvD6t27fDXh1W79vxa/et/3YAFCxYsWLBufzQsWLBuf/Qe1v2HnLgxcwisso2ZQ2CVbcwcAqtsY+YQWGUbM4fAKtuYOQRW2cbMIbDKNmYOgVW2MXMIrLKNmUNuwPr98/jBIeFTCj6PDwsWLFiwYMGCBQvWgVjn/P0VLFiwYMGCBQsWLFh7WFdrwnq0BwvWO1hBsIJgBcEKghUEKwhWbf/BmuGABetCsIJgBcEKghUEKwhWEKzeBn+yfIIVBCsIVhCsIFhBsIJgBcEKgiVJkiSpuBfSYXR+g2QEUQAAAABJRU5ErkJggg==",
    size: 25,
    chGui: null,
    chLayout: null,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var csText = new android.widget.TextView(ctx);
        csText.setText("Crosshair size: " + this.size);
        csText.setTextColor(android.graphics.Color.BLACK);
        csText.setTextSize(dip2px(9));
        csText.setGravity(android.view.Gravity.CENTER);
        csText.setTypeface(Utils.font);
        var csSlider = Utils.ModSettings.getSlider();
        csSlider.setMax(80);
        //rangeSlider.setMin(1);
        csSlider.setProgress(this.size - 25);
        csSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                var pro = progress + 25;
                //pro = Math.round(pro * 1000) / 1000;
                pro = pro.toString();

                csText.setText("Crosshair size: " + pro);

            },
            onStopTrackingTouch: function(seekbar) {
                var pro = seekbar.getProgress() + 25;
                //pro = Math.round(pro * 1000) / 1000;
                crosshair.size = pro;
            }
        }));
        settings.addView(csSlider, params);
        settings.addView(csText, params);


        return settings;
    },
    onModTick: function() {
        if (!SummitPE.inGame && !this.state) {
            return true;
        } else if (!SummitPE.inGame && this.state) {
            this.state = false;
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    if (crosshair.chGui != null) crosshair.chGui.dismiss();
                }
            }));

            SummitPE.ctoast(crosshair.name + " is disabled, please join the game");
        }

        if (this.state && (getPlayerEnt() == -1 || getPlayerEnt() == -1))
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    if (crosshair.chGui != null) crosshair.chGui.dismiss();
                }
            }));
    },
    showGui: function(text) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (crosshair.chGui == null || crosshair.chGui.isShowing() == false) {
                    crosshair.chLayout = new android.widget.LinearLayout(ctx); //split(';')[0].split(':')[1]
                    crosshair.chGui = new android.widget.PopupWindow(crosshair.chLayout, dip2px(crosshair.size), dip2px(crosshair.size));
                    crosshair.chGui.setTouchable(false);
                    crosshair.chGui.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.BitmapFactory.decodeByteArray(android.util.Base64.decode(crosshair.icon, 0), 0, android.util.Base64.decode(crosshair.icon, 0).length)));
                    crosshair.chGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.CENTER, 0, 0);
                }
            }
        }));

    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) this.showGui();
        else ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                crosshair.chGui.dismiss();
            }
        }));
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("Crosshair");
    }
};
SummitPE.registerModule(crosshair);

var automine = {
    name: "AutoMine",
    desc: "Automatically clicks for the screen! Woooow [Made by Wooo_DFL]",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,

    //настройки поиска руд
    scanRange: 50,
    findTick: 0, //groundMode: true,
    oreScan: {
        blocks: 0,
        finished: false,
        scanning: false
    },
    oreBlocks: new Array(),
    eCheckerThread: null,
    drawBox: true,
    lastPos: [],

    //руды и активная руда
    blocks: [
        [16, "Угольная руда"],
        [15, "Железная руда"],
        [14, "Золотая руда"],
        [21, "Лазуритовая руда"],
        [56, "Алмазная руда"],
        [33, "Поршневая руда"]
    ],
    customBlockActive: false,
    activeBlock: 0, //id блока из массива объекта выше или ID своего блока, если customBlockActive = 1

    //настройки и значения для автоходьбы / ожидания
    waitingMode: [false, 0],
    //on/off, mode (0 - ломание руды, 1 - 
    //ломание преграды, 2 - циклическое ломание/ставка блоков под/над рудой)
    calcBlocksFront: false,
    currentBlock: [],

    //startRayTr
    threadRunning: false,
    aimedBlock: [0, 0, 0],
    selectedBlock: [0, 0, 0],
    //настройки
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);

        var settingsBlock = BtnToggleEntry(
            "Добываемый блок",
            BtnToggleMode.MODE_LIST,
            [
                [this.activeBlock, "ID: " + this.activeBlock], this.blocks
            ],
            true,
            function(newValue) {
                automine.activeBlock = newValue;

                if (automine.oreScan.scanning) automine.stopScan = true;
            }
        );

        var rangeText = new android.widget.TextView(ctx);
        rangeText.setText("Scan range: " + this.scanRange);
        rangeText.setTextColor(android.graphics.Color.BLACK);
        rangeText.setTextSize(dip2px(9));
        rangeText.setGravity(android.view.Gravity.CENTER);
        rangeText.setTypeface(Utils.font);
        var rangeSlider = Utils.ModSettings.getSlider();
        rangeSlider.setMax(199);
        //rangeSlider.setMin(1);
        rangeSlider.setProgress(this.scanRange);
        rangeSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {
                /* Сделать минимальное значение с помощью хитростей */
                var progress_new = progress + 1; // 1 - минимальное значение

                progress_new = progress_new.toString();
                /* конец */
                rangeText.setText("Scan range: " + progress_new);
            },
            onStopTrackingTouch: function(seekbar) {
                /* Сохранить минимальное значение с помощью хитростей */
                var seekbar_new = seekbar.getProgress() + 1; // 1 - минимальное значение
                /* конец */
                automine.scanRange = seekbar_new;
            }
        }));

        var drawEspBox = new android.widget.CheckBox(ctx);
        drawEspBox.setChecked(this.drawBox);
        drawEspBox.setText("Draw ESPBox around Ore blocks [Only 1.0+]");
        drawEspBox.setTypeface(Utils.font);
        drawEspBox.setTextSize(dip2px(9));
        drawEspBox.setTextColor(android.graphics.Color.BLACK);

        drawEspBox.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                automine.drawBox = v.isChecked();
                v.setChecked(automine.drawBox);
            }
        }));

        var oreScan = new android.widget.TextView(ctx);
        oreScan.setTypeface(Utils.font);
        oreScan.setGravity(android.view.Gravity.CENTER);
        oreScan.setTextSize(dip2px(9));
        oreScan.setPadding(dip2px(5), 0, dip2px(5), 0);
        oreScan.setTextColor(android.graphics.Color.BLACK);
        if (this.oreScan.finished)
            oreScan.setText("Ore scan finished. " + this.oreBlocks.length + " ore blocks found (" + this.oreScan.blocks + " Blocks checked)");
        else if (this.oreScan.scanning)
            oreScan.setText("Currently scanning for ore blocks. " + this.oreScan.blocks + " Blocks already checked");
        else
            oreScan.setText("Ore scan not started yet");


        var refreshBG = new android.graphics.drawable.GradientDrawable();
        refreshBG.setColor(getColorAHEXFromARGB(90, 30, 30, 30));
        refreshBG.setStroke(dip2px(2), android.graphics.Color.BLACK);

        var refresh = new android.widget.Button(ctx);
        refresh.setBackground(refreshBG);
        refresh.setTypeface(Utils.font);
        refresh.setTextColor(android.graphics.Color.WHITE);
        refresh.setTextSize(dip2px(8));
        refresh.setText("Refresh");
        refresh.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                if (automine.oreScan.finished) {
                    oreScan.setText("Ore scan finished. " + automine.oreBlocks.length + " ore blocks found (" + automine.oreScan.blocks + " Blocks checked)");
                } else if (automine.oreScan.scanning) {
                    oreScan.setText("Currently scanning for ore blocks. " + automine.oreScan.blocks + " Blocks already checked");
                } else {
                    oreScan.setText("Ore scan not started yet");
                }
            }
        }));

        settings.addView(settingsBlock, params);
        settings.addView(rangeSlider, params);
        settings.addView(rangeText, params);
        settings.addView(drawEspBox, params);
        settings.addView(oreScan, params);
        settings.addView(refresh, params);



        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    findOreBlocks: function() {
        if (this.automine.scanning == true) return;
        else if (!SummitPE.inGame) return;
        this.automine.finished = false;
        this.automine.scanning = true;
        this.automine.blocks = 0;
        var startX = Math.round(getPlayerX());
        var startZ = Math.round(getPlayerZ());
        var startRadius = this.scanRange;
        var blocks = 0;
        var newOreBlocks = new Array();
        var finished = [false, false, false, false];
        var tmpTile = 0;
        var lt = new java.lang.Runnable({
            run: function() {

                for (var x = startX - startRadius; x < startX; x++) {
                    for (var z = startZ; z < startZ + startRadius; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == automine.activeBlock) newOreBlocks.push([x, y, z]);
                                blocks++;

                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread1 finished");
                finished[0] = true;
            }
        });
        var t = new java.lang.Thread(lt);
        t.start();
        var rt = new java.lang.Runnable({
            run: function() {

                for (var x = startX; x < startX + startRadius; x++) {
                    for (var z = startZ; z < startZ + startRadius; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == automine.activeBlock) newOreBlocks.push([x, y, z]);

                                blocks++;
                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread2 finished");
                finished[1] = true;
            }
        });
        var t2 = new java.lang.Thread(rt);
        t2.start();
        var lb = new java.lang.Runnable({
            run: function() {

                for (var x = startX - startRadius; x < startX; x++) {
                    for (var z = startZ - startRadius; z < startZ; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == automine.activeBlock) newOreBlocks.push([x, y, z]);

                                blocks++;
                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread3 finished");
                finished[2] = true;
            }
        });
        var t3 = new java.lang.Thread(lb);
        t3.start();
        var rb = new java.lang.Runnable({
            run: function() {

                for (var x = startX; x < startX + startRadius; x++) {
                    for (var z = startZ - startRadius; z < startZ; z++) {
                        java.lang.Thread.sleep(1);
                        for (var y = 0; y < 129; y++) {
                            try {
                                tmpTile = getTile(x, y, z);
                                if (tmpTile == automine.activeBlock) newOreBlocks.push([x, y, z]);

                                blocks++;
                            } catch (e) {
                                cmsg("Error: " + e);
                            }
                        }
                    }
                }
                //SummitPE.cmsg("Thread4 finished");
                finished[3] = true;
            }
        });
        var t4 = new java.lang.Thread(rb);
        t4.start();
        var finishChecker = new java.lang.Runnable({
            run: function() {
                var wasEmpty = false,
                    stopScan = false;
                wasEmpty = automine.oreBlocks.length == 0;
                while (!finished[0] || !finished[1] || !finished[2] || !finished[3]) {
                    if (automine.stopScan || !SummitPE.inGame) {
                        stopScan = true;
                        automine.stopScan = false;

                        automine.oreScan = {
                            blocks: 0,
                            finished: false,
                            scanning: false
                        };
                        automine.oreBlocks = new Array();

                        break;
                    }
                    java.lang.Thread.sleep(250);
                    automine.oreScan.blocks = blocks;
                    if (wasEmpty) automine.oreBlocks = newOreBlocks;
                    //ModPE.showTipMessage("Blocks: "+blocks);
                }
                //SummitPE.cmsg("Ore scan done. Found "+automine.oreBlocks.length+" Ore blocks ("+blocks+" Blocks scanned)");
                if (!stopScan) {
                    automine.eCheckerThread = null;
                    automine.oreBlocks = newOreBlocks;
                    automine.oreScan.finished = true;
                    automine.oreScan.scanning = false;

                    automine.lastPos[0] = getPlayerX();
                    automine.lastPos[1] = getPlayerY();
                    automine.lastPos[2] = getPlayerZ();
                }
            }
        });
        this.eCheckerThread = new java.lang.Thread(finishChecker);
        this.eCheckerThread.start();
    },
    onTick: function() {
        if (this.state && SummitPE.inGame) {
            //if (this.threadRunning) setVelY(getPlayerEnt(), 0);

            if (this.oreScan.scanning == false) this.findTick++;

            if (this.findTick >= 63 * this.scanRange / 3) { //33
                this.findTick = 0;

                var x = automine.lastPos[0] - getPlayerX();
                var y = automine.lastPos[1] - getPlayerY();
                var z = automine.lastPos[2] - getPlayerZ();

                var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                if (dist > (automine.scanRange / 2) && !automine.waitingMode[0]) {
                    if (this.eCheckerThread == null) this.findOreBlocks();
                }
            }
        }
    },
    //TODOLIST
    onModTickk: function() {
        if (automine.oreScan.finished && !automine.currentBlock) {
            automine.currentBlock = Utils.Block.getNearestBlock(automine.oreBlocks, automine.scanRange);
            //определить ближайшёю руду
        } else if (automine.oreScan.finished && automine.currentBlock && !automine.waitingMode[0]) {
            if (tick1 % 25 == 0) Utils.Block.crosshairAimAtBlock(automine.currentBlock, null, true, -30);

            var x = automine.currentBlock[0] - getPlayerX();
            var y = automine.currentBlock[1] - getPlayerY();
            var z = automine.currentBlock[2] - getPlayerZ();

            var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

            if (dist > 1) {
                autowalk.state = true;
                if (!automine.calcBlocksFront) {
                    automine.calcBlocksFront = true;
                    startRayTr();
                }

                //if (automine.aimedBlock[1] <= 0)
            } else {
                autowalk.state = false;
                automine.calcBlocksFront = false;

                //automine.waitingMode = [true, 2]; - не будет задействовано
                //automine.selectedBlock = блок под игроком
                //Utils.Block.crosshairAimAtBlock(automine.selectedBlock, null, true, ПОД ИГРОКА);
                //ломание блоков вниз, чтобы опуститься к руде циклом, но пусть это делает игрок
                automine.waitingMode = [true, 0];
            }
            //смотреть и идти к ближайшей руде
        } else if (automine.waitingMode[0]) {
            if (tick1 % 25 == 0) {
                var tempBlock = [];
                if (automine.waitingMode[1] == 0) tempBlock = automine.currentBlock;
                else tempBlock = automine.selectedBlock;

                if (getTile(tempBlock[0], tempBlock[1], tempBlock[2]) != 0) {
                    Utils.Block.crosshairAimAtBlock(tempBlock, null, false);
                    SummitPE.ctoast("Please break block!");
                } else {
                    if (automine.waitingMode[1] == 0) {
                        automine.currentBlock = [];
                        automine.waitingMode = [false, 0];
                    }
                }
            }
        }
    },
    startRayTr: function() {
        if (automine.threadRunning) return;
        var tmpTile = 0;
        var t = new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                while (automine.state && SummitPE.inGame && automine.calcBlocksFront) {
                    Timings.startTiming("automine-rayTrThread");
                    var yaw = (getYaw() + 90) * (Math.PI / 180);

                    var pitch = getPitch() * -(Math.PI / 180);
                    var dir = [
                        Math.cos(yaw) * Math.cos(pitch),
                        Math.sin(pitch),
                        Math.sin(yaw) * Math.cos(pitch)
                    ];
                    var res = Utils.Block.rayTrace([
                        dir[0], dir[1], dir[2]
                    ], [getPlayerX(), getPlayerY() + 0.0, getPlayerZ()], 100);
                    if (res.hit) {
                        automine.aimedBlock = [res.x, res.y, res.z];

                        var x = automine.aimedBlock[0] - getPlayerX();
                        var y = automine.aimedBlock[1] - getPlayerY();
                        var z = automine.aimedBlock[2] - getPlayerZ();

                        var dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));

                        if (dist < 2) {
                            var x = automine.aimedBlock[0];
                            var y = automine.aimedBlock[1];
                            var z = automine.aimedBlock[2];

                            if (y == (getPlayerY()) && getTile(x, y + 1, z) == 0 && getTile(x, y + 2, z) == 0) { //означает, что на 1 блок выше ног игрока нет блока
                                var lastX = getPlayerX();
                                var lastY = getPlayerY();
                                var lastZ = getPlayerZ();

                                for (var i = 0; i < 4; i++) {
                                    autowalk.state = true;

                                    //Entity.setPositionRelative(getPlayerEnt(), 0, 1.4, 0);
                                    Entity.setVelY(getPlayerEnt(), 1.4);
                                    java.lang.Thread.sleep(500);
                                }

                                var lastX = lastX - getPlayerX();
                                var lastY = lastY - getPlayerY();
                                var lastZ = lastZ - getPlayerZ();

                                var playerDist = Math.sqrt(Math.pow(lastX, 2) + Math.pow(lastY, 2) + Math.pow(lastZ, 2));

                                if (playerDist < 2) {
                                    autowalk.state = false;
                                    automine.calcBlocksFront = false;

                                    automine.waitingMode = [true, 1];
                                }
                            } else {
                                autowalk.state = false;
                                automine.calcBlocksFront = false;

                                automine.waitingMode = [true, 1];
                            }

                            while (true) {
                                //tmpTile = getTile(x, y, z)
                                if (y == (getPlayerY() + 1) && getTile(x, y, z) != 0) {
                                    automine.selectedBlock = automine.aimedBlock;
                                } else if (y == (getPlayerY() + 1) && getTile(x, y - 1, z) != 0) {
                                    automine.selectedBlock = [automine.aimedBlock[0], automine.aimedBlock[1] - 1, automine.aimedBlock[2]];
                                    /* } else if(y == (getPlayerY()) && getTile(x, y + 2, z) != 0) {
                                    	automine.selectedBlock = automine.aimedBlock;
                                    } else if(y == (getPlayerY()) && getTile(x + 1, y + 2, z) != 0) {
                                    	automine.selectedBlock = automine.aimedBlock;
                                    } else if(y == (getPlayerY()) && getTile(x - 1, y + 2, z) != 0) {
                                    	automine.selectedBlock = automine.aimedBlock;
                                    } else if(y == (getPlayerY()) && getTile(x, y + 2, z + 1) != 0) {
                                    	automine.selectedBlock = automine.aimedBlock;
                                    } else if(y == (getPlayerY()) && getTile(x, y + 2, z - 1) != 0) {
                                    	automine.selectedBlock = automine.aimedBlock; */
                                } else if (y != (getPlayerY()) && getTile(x, y, z) != 0) {
                                    automine.selectedBlock = automine.aimedBlock;
                                } else {
                                    automine.waitingMode = [false, 0];
                                    break;
                                }

                                java.lang.Thread.sleep(100);
                            }
                        }
                    } else {
                        automine.aimedBlock = [0, 0, 0];
                    }
                    Timings.stopTiming("automine-rayTrThread");
                }

                automine.threadRunning = false;

                if (automine.state && !SummitPE.inGame) {
                    automine.onClick();
                    SummitPE.ctoast(automine.name + " is disabled, please join the game");
                }
            }
        }));
        t.start();
        automine.threadRunning = true;
    },
    onRender: function(gl) {
        if (automine.state && automine.drawBox && SummitPE.inGame) {
            automine.oreBlocks.forEach(function(entry) {
                Utils.Render.drawBox(gl, entry[0] + 1 / 16, entry[1] + 1,
                    entry[2] + 1 / 16, 1 / 16 * 15, 0.875, 1 / 16 * 15);
            });
        }
        /* else if (automine.state && SummitPE.inGame) {
                    if (!automine.waitingMode[0]) Utils.Render.drawBox(gl, automine.aimedBlock[0], automine.aimedBlock[1] + 1, automine.aimedBlock[2], 1, 1, 1);
                    else Utils.Render.drawBox(gl, automine.selectedBlock[0], automine.selectedBlock[1] + 1, automine.selectedBlock[2], 1, 1, 1);
                } */
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state)
            this.findOreBlocks();
        else {
            if (this.oreScan.scanning) this.stopScan = true;

            this.oreScan = {
                blocks: 0,
                finished: false,
                scanning: false
            };
            this.oreBlocks = new Array();
        }
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("AutoMine");
    }
};
automine.activeBlock = automine.blocks[4][0];
//SummitPE.registerModule(automine);

var nuker = {
    name: Languages.getString("hacks_nuker"),
    desc: "Nukes blocks around you.",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    smode: false,
    state: false,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var modeSwitch = new android.widget.Switch(ctx);
        modeSwitch.setText("SinglePlayer mode");
        modeSwitch.setTypeface(Utils.font);
        modeSwitch.setTextColor(android.graphics.Color.BLACK);
        modeSwitch.setPadding(10, 3, 3, 3);
        modeSwitch.setTextSize(15);
        modeSwitch.setChecked(nuker.smode);
        modeSwitch.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            onCheckedChanged: function() {
                nuker.smode = !nuker.smode;
                modeSwitch.setChecked(nuker.smode)
            }
        }));
        var radiusText = new android.widget.TextView(ctx);
        radiusText.setText("Radius: " + this.radius);
        radiusText.setTextColor(android.graphics.Color.BLACK);
        radiusText.setTextSize(dip2px(9));
        radiusText.setGravity(android.view.Gravity.CENTER);
        radiusText.setTypeface(Utils.font);
        var radiusSlider = Utils.ModSettings.getSlider();
        radiusSlider.setMax(4);
        //rangeSlider.setMin(1);
        radiusSlider.setProgress(this.radius - 2);
        radiusSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                radiusText.setText("Radius: " + (progress + 2));

            },
            onStopTrackingTouch: function(seekbar) {
                nuker.radius = seekbar.getProgress() + 2;
            }
        }));
        settings.addView(modeSwitch, params);
        settings.addView(radiusSlider, params);
        settings.addView(radiusText, params);


        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    done: true,
    radius: 2,
    onModTick: function() {
        if (this.state == true && this.done == true) {
            var t = new java.lang.Thread(new java.lang.Runnable({
                run: function() {
                    nuker.done = false;
                    for (var x = -nuker.radius; x < nuker.radius; x++) {
                        java.lang.Thread.sleep(20);
                        for (var y = -nuker.radius; y < nuker.radius; y++)
                            java.lang.Thread.sleep(250);
                        for (var z = -nuker.radius; z < nuker.radius; z++)
                            Level.destroyBlock(Math.floor(getPlayerX() + x), Math.floor(getPlayerY() + y), Math.floor(getPlayerZ() + z), nuker.smode);
                    }

                    java.lang.Thread.sleep(450);
                    nuker.done = true;
                }
            }));
            t.run();
        }
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(Languages.getString("hacks_nuker"));
    }
};
SummitPE.registerModule(nuker);

var tunnel = {
    name: "Tunnel",
    desc: "Make tunnel around you. (nuker some)",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    smode: false,
    lmode: false,
    state: false,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var modeSwitch = new android.widget.Switch(ctx);
        modeSwitch.setText("SinglePlayer mode");
        modeSwitch.setTypeface(Utils.font);
        modeSwitch.setTextColor(android.graphics.Color.BLACK);
        modeSwitch.setPadding(10, 3, 3, 3);
        modeSwitch.setTextSize(15);
        modeSwitch.setChecked(tunnel.smode);
        modeSwitch.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            onCheckedChanged: function() {
                tunnel.smode = !tunnel.smode;
                modeSwitch.setChecked(tunnel.smode)
            }
        }));
        var lmodeSwitch = new android.widget.Switch(ctx);
        lmodeSwitch.setText("Ladder");
        lmodeSwitch.setTypeface(Utils.font);
        lmodeSwitch.setTextColor(android.graphics.Color.BLACK);
        lmodeSwitch.setPadding(10, 3, 3, 3);
        lmodeSwitch.setTextSize(15);
        lmodeSwitch.setChecked(tunnel.lmode);
        lmodeSwitch.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            onCheckedChanged: function() {
                tunnel.lmode = !tunnel.lmode;
                lmodeSwitch.setChecked(tunnel.lmode)
            }
        }));
        var radiusText = new android.widget.TextView(ctx);
        radiusText.setText("Radius: " + this.radius);
        radiusText.setTextColor(android.graphics.Color.BLACK);
        radiusText.setTextSize(dip2px(9));
        radiusText.setGravity(android.view.Gravity.CENTER);
        radiusText.setTypeface(Utils.font);
        var radiusSlider = Utils.ModSettings.getSlider();
        radiusSlider.setMax(4);
        //rangeSlider.setMin(1);
        radiusSlider.setProgress(this.radius - 2);
        radiusSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                radiusText.setText("Radius: " + (progress + 2));

            },
            onStopTrackingTouch: function(seekbar) {
                tunnel.radius = seekbar.getProgress() + 2;
            }
        }));
        settings.addView(modeSwitch, params);
        settings.addView(lmodeSwitch, params);
        settings.addView(radiusSlider, params);
        settings.addView(radiusText, params);


        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    done: true,
    radius: 2,
    onModTick: function() {
        if (this.state == true && this.done == true) {
            var t = new java.lang.Thread(new java.lang.Runnable({
                run: function() {
                    tunnel.done = false;
                    for (var x = -tunnel.radius; x < tunnel.radius; x++) {
                        java.lang.Thread.sleep(20);
                        var lYpos = -1
                        if (tunnel.lmode) lYpos = 0;
                        for (var y = lYpos; y < tunnel.radius; y++)
                            java.lang.Thread.sleep(250);
                        for (var z = -tunnel.radius; z < tunnel.radius; z++)
                            Level.destroyBlock(Math.floor(getPlayerX() + x), Math.floor(getPlayerY() + y), Math.floor(getPlayerZ() + z), tunnel.smode);
                    }

                    java.lang.Thread.sleep(450);
                    tunnel.done = true;
                }
            }));
            t.run();
        }
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(tunnel);

var chestStealer = {
    name: "ChestStealer",
    desc: "Break chests around you.",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (Player.getPointedBlockId() == 54) {
            Level.destroyBlock(Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ(), true);
        }
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText("ChestStealer");
    }
}
SummitPE.registerModule(chestStealer);

var bedBreaker = {
    name: "BedBreaker",
    desc: "Break bed's around you.",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (Player.getPointedBlockId() == 26) {
            Level.destroyBlock(Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ(), true);
        }
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText("BedBreaker");
    }
}
SummitPE.registerModule(bedBreaker);

var velocity = {
    name: "Velocity",
    desc: "Disables knockback",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    attackTick: 0,
    lastHealth: 0,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (!this.state || Entity.getHealth(getPlayerEnt()) <= 0)
            return
        if (this.attackTick > 0)
            this.attackTick--;
        else
            Entity.setImmobile(getPlayerEnt(), false);

        if (this.lastHealth > Entity.getHealth(getPlayerEnt())) {
            Entity.setImmobile(getPlayerEnt(), true);
            this.attackTick = 1;
        }

        this.lastHealth = Entity.getHealth(getPlayerEnt());
    },
    onHurt: function(att, vic, hearts) {
        if (!this.state || (vic != getPlayerEnt()))
            return;
        Entity.setImmobile(getPlayerEnt(), true);
        this.attackTick = 2;
    },
    onClick: function(btn) {
        this.state = !this.state
        if (SummitPE.inGame) this.lastHealth = Entity.getHealth(getPlayerEnt());
        else this.lastHealth = 20;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(velocity);

var webbrowser = {
    name: "Webbrowser",
    desc: "Opens the webbrowser",
    type: ModuleType.special,
    browser: null,
    view: null,
    address: null,
    lastUrl: "",
    showBrowser: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                var layout1 = new android.widget.RelativeLayout(ctx);
                webbrowser.view = new android.webkit.WebView(ctx);
                webbrowser.view.getSettings().setJavaScriptEnabled(true);
                webbrowser.view.setWebChromeClient(new android.webkit.WebChromeClient());
                webbrowser.view.setWebViewClient(new android.webkit.WebViewClient());
                webbrowser.view.setId(502103);
                if (webbrowser.lastUrl == "")
                    webbrowser.view.loadUrl("https://www.google.com");
                else
                    webbrowser.view.loadUrl(webbrowser.lastUrl);
                webbrowser.address = new android.widget.EditText(ctx);
                webbrowser.address.setHint("Enter URL or search something");
                webbrowser.address.setId(598258);
                webbrowser.address.setTextColor(android.graphics.Color.BLACK);
                //webbrowser.address.setImeOptions(android.view.inputmethod.EditorInfo.IME_ACTION_DONE);
                webbrowser.address.setSingleLine(true);
                webbrowser.address.setText(webbrowser.view.getUrl());
                webbrowser.address.setOnKeyListener(new android.view.View.OnKeyListener({
                    onKey: function(view, keycode, event) {
                        if (keycode == android.view.KeyEvent.KEYCODE_ENTER && event.getAction() == android.view.KeyEvent.ACTION_DOWN) {
                            var url = webbrowser.address.getText().toString();
                            if (android.util.Patterns.WEB_URL.matcher(url).matches()) {
                                if (url.indexOf("http") == -1)
                                    url = "http://" + url;
                                webbrowser.view.loadUrl(url);
                            } else {
                                webbrowser.view.loadUrl("https://www.google.de/#q=" + (new String(url).replace(new RegExp(" ", 'g'), "+")));
                            }
                            return true;
                        }
                        return true;
                    }
                }));
                var param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                layout1.addView(webbrowser.address, param);
                param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                param.addRule(android.widget.RelativeLayout.BELOW, webbrowser.address.getId());
                layout1.addView(webbrowser.view, param);
                layout1.setBackground(SummitPE.getStyledBackground());
                webbrowser.browser = new android.app.Dialog(ctx);
                webbrowser.browser.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                webbrowser.browser.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                webbrowser.browser.setContentView(layout1);
                webbrowser.browser.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {
                        webbrowser.lastUrl = webbrowser.view.getUrl();
                        showMenu();
                    }
                }));
                webbrowser.browser.show();
                var window = webbrowser.browser.getWindow();
                var display = new android.util.DisplayMetrics();
                com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                    .getWindowManager()
                    .getDefaultDisplay()
                    .getMetrics(display);
                window.setLayout(mwidth, display.heightPixels);
            }
        }));
    },
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true;
    },
    onClick: function(btn) {
        mDismiss();
        this.showBrowser();
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(webbrowser);

var tapBreak = {
    name: "Tap break",
    desc: "Tap break block (better fastbreak)",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    requireGame: true,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onUseItem: function(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        Level.destroyBlock(x, y, z, nuker.smode);
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(tapBreak);

//CRASH THE MOD
//TODO fix
/* if (SummitPE.enableFastEat) {
    try {
        var items = "Ww0KICB7DQogICAgIm5hbWUiOiAiYXBwbGUiLA0KICAgICJpZCI6IDQsDQogICAgImljb24iOiAiYXBwbGUiLA0KICAgICJjYXRlZ29yeSI6ICJNaXNjZWxsYW5lb3VzIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDQsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJsb3ciLA0KICAgICAgImlzX21lYXQiOiBmYWxzZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImdvbGRlbl9hcHBsZSIsDQogICAgImlkIjogNjYsDQogICAgImljb24iOiAiYXBwbGVfZ29sZGVuIiwNCiAgICAiY2F0ZWdvcnkiOiAiTWlzY2VsbGFuZW91cyIsDQogICAgInN0YWNrX2J5X2RhdGEiOiB0cnVlLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KICAgICJmb2lsIjogZmFsc2UsDQogICAgImhvdmVyX3RleHRfY29sb3IiOiAiYXF1YSIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiA0LCANCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogInN1cGVybmF0dXJhbCIsDQogICAgICAiaXNfbWVhdCI6IGZhbHNlLCANCiAgICAgICJlZmZlY3RzIjogWw0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAicmVnZW5lcmF0aW9uIiwNCiAgICAgICAgICAiY2hhbmNlIjogMS4wLA0KICAgICAgICAgICJkdXJhdGlvbiI6IDUsDQogICAgICAgICAgImFtcGxpZmllciI6IDENCiAgICAgICAgfSwNCiAgICAgICAgew0KICAgICAgICAgICJuYW1lIjogImFic29ycHRpb24iLA0KICAgICAgICAgICJjaGFuY2UiOiAxLjAsDQogICAgICAgICAgImR1cmF0aW9uIjogMTIwLCANCiAgICAgICAgICAiYW1wbGlmaWVyIjogMA0KICAgICAgICB9DQogICAgICBdLA0KICAgICAgImVuY2hhbnRlZF9lZmZlY3RzIjogWw0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAicmVnZW5lcmF0aW9uIiwNCiAgICAgICAgICAiY2hhbmNlIjogMC42NiwNCiAgICAgICAgICAiZHVyYXRpb24iOiAzMCwNCiAgICAgICAgICAiYW1wbGlmaWVyIjogNA0KICAgICAgICB9LA0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAiYWJzb3JwdGlvbiIsDQogICAgICAgICAgImNoYW5jZSI6IDAuNjYsDQogICAgICAgICAgImR1cmF0aW9uIjogMTIwLCANCiAgICAgICAgICAiYW1wbGlmaWVyIjogMA0KICAgICAgICB9LA0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAicmVzaXN0YW5jZSIsIA0KICAgICAgICAgICJjaGFuY2UiOiAwLjY2LA0KICAgICAgICAgICJkdXJhdGlvbiI6IDMwMCwNCiAgICAgICAgICAiYW1wbGlmaWVyIjogMA0KICAgICAgICB9LA0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAiZmlyZV9yZXNpc3RhbmNlIiwNCiAgICAgICAgICAiY2hhbmNlIjogMC42NiwNCiAgICAgICAgICAiZHVyYXRpb24iOiAzMDAsDQogICAgICAgICAgImFtcGxpZmllciI6IDANCiAgICAgICAgfQ0KICAgICAgXQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImFwcGxlRW5jaGFudGVkIiwgDQogICAgImlkIjogMjEwLA0KICAgICJpY29uIjogImFwcGxlX2dvbGRlbiIsDQogICAgImNhdGVnb3J5IjogIk1pc2NlbGxhbmVvdXMiLA0KICAgICJoYW5kX2VxdWlwcGVkIjogZmFsc2UsDQogICAgInN0YWNrX2J5X2RhdGEiOiB0cnVlLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KICAgICJmb2lsIjogdHJ1ZSwNCiAgICAiaG92ZXJfdGV4dF9jb2xvciI6ICJsaWdodF9wdXJwbGUiLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogNCwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogInN1cGVybmF0dXJhbCIsDQogICAgICAiaXNfbWVhdCI6IGZhbHNlLA0KICAgICAgImVmZmVjdHMiOiBbDQogICAgICAgIHsNCiAgICAgICAgICAibmFtZSI6ICJyZWdlbmVyYXRpb24iLA0KICAgICAgICAgICJjaGFuY2UiOiAxLjAsDQogICAgICAgICAgImR1cmF0aW9uIjogMzAsDQogICAgICAgICAgImFtcGxpZmllciI6IDQNCiAgICAgICAgfSwNCiAgICAgICAgew0KICAgICAgICAgICJuYW1lIjogImFic29ycHRpb24iLA0KICAgICAgICAgICJjaGFuY2UiOiAxLjAsDQogICAgICAgICAgImR1cmF0aW9uIjogMTIwLCANCiAgICAgICAgICAiYW1wbGlmaWVyIjogMA0KICAgICAgICB9LA0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAicmVzaXN0YW5jZSIsIA0KICAgICAgICAgICJjaGFuY2UiOiAxLjAsDQogICAgICAgICAgImR1cmF0aW9uIjogMzAwLA0KICAgICAgICAgICJhbXBsaWZpZXIiOiAwDQogICAgICAgIH0sDQogICAgICAgIHsNCiAgICAgICAgICAibmFtZSI6ICJmaXJlX3Jlc2lzdGFuY2UiLA0KICAgICAgICAgICJjaGFuY2UiOiAxLjAsDQogICAgICAgICAgImR1cmF0aW9uIjogMzAwLA0KICAgICAgICAgICJhbXBsaWZpZXIiOiAwDQogICAgICAgIH0NCiAgICAgIF0NCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJtdXNocm9vbV9zdGV3IiwNCiAgICAiaWQiOiAyNiwNCiAgICAiaWNvbiI6ICJtdXNocm9vbV9zdGV3IiwNCiAgICAiY2F0ZWdvcnkiOiAiTWlzY2VsbGFuZW91cyIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQogICAgIm1heF9zdGFja19zaXplIjogMSwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDYsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJub3JtYWwiLA0KICAgICAgImlzX21lYXQiOiBmYWxzZSwNCiAgICAgICJ1c2luZ19jb252ZXJ0c190byI6ICJpdGVtLmJvd2wiDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiYnJlYWQiLA0KICAgICJpZCI6IDQxLA0KICAgICJpY29uIjogImJyZWFkIiwNCiAgICAiY2F0ZWdvcnkiOiAiTWlzY2VsbGFuZW91cyIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiA1LA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibm9ybWFsIiwNCiAgICAgICJpc19tZWF0IjogZmFsc2UNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJwb3JrY2hvcCIsDQogICAgImlkIjogNjMsDQogICAgImljb24iOiAicG9ya2Nob3BfcmF3IiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDMsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJsb3ciLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAicG9ya2Nob3BfY29va2VkIiwNCiAgICAiaWQiOiA2NCwNCiAgICAiaWNvbiI6ICJwb3JrY2hvcF9jb29rZWQiLA0KICAgICJjYXRlZ29yeSI6ICJNaXNjZWxsYW5lb3VzIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDgsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJnb29kIiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImZpc2giLA0KICAgICJpZCI6IDkzLA0KICAgICJpY29uIjogImZpc2giLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KICAgICJtYXhfZGFtYWdlIjogMCwNCiAgICAic3RhY2tlZF9ieV9kYXRhIjogdHJ1ZSwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDIsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJwb29yIiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogInNhbG1vbiIsDQogICAgImlkIjogMjA0LA0KICAgICJpY29uIjogInNhbG1vbiIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQogICAgIm1heF9kYW1hZ2UiOiAwLA0KICAgICJzdGFja2VkX2J5X2RhdGEiOiB0cnVlLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogMiwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogInBvb3IiLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiY2xvd25maXNoIiwNCiAgICAiaWQiOiAyMDUsDQogICAgImljb24iOiAiY2xvd25maXNoIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCiAgICAibWF4X2RhbWFnZSI6IDAsDQogICAgInN0YWNrZWRfYnlfZGF0YSI6IHRydWUsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAxLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAicG9vciIsDQogICAgICAiaXNfbWVhdCI6IHRydWUNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJwdWZmZXJmaXNoIiwNCiAgICAiaWQiOiAyMDYsDQogICAgImljb24iOiAicHVmZmVyZmlzaCIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQogICAgIm1heF9kYW1hZ2UiOiAwLA0KICAgICJzdGFja2VkX2J5X2RhdGEiOiB0cnVlLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogMSwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogInBvb3IiLA0KICAgICAgImlzX21lYXQiOiB0cnVlLA0KICAgICAgImVmZmVjdHMiOiBbDQogICAgICAgIHsNCiAgICAgICAgICAibmFtZSI6ICJwb2lzb24iLA0KICAgICAgICAgICJkdXJhdGlvbiI6IDYwLA0KICAgICAgICAgICJhbXBsaWZpZXIiOiAzDQogICAgICAgIH0sDQogICAgICAgIHsNCiAgICAgICAgICAibmFtZSI6ICJuYXVzZWEiLCANCiAgICAgICAgICAiZHVyYXRpb24iOiAxNSwNCiAgICAgICAgICAiYW1wbGlmaWVyIjogMQ0KICAgICAgICB9LA0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAiaHVuZ2VyIiwNCiAgICAgICAgICAiZHVyYXRpb24iOiAxNSwNCiAgICAgICAgICAiYW1wbGlmaWVyIjogMg0KICAgICAgICB9DQogICAgICBdDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiY29va2VkX2Zpc2giLA0KICAgICJpZCI6IDk0LA0KICAgICJpY29uIjogImNvb2tlZF9maXNoIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCiAgICAibWF4X2RhbWFnZSI6IDAsDQogICAgInN0YWNrZWRfYnlfZGF0YSI6IHRydWUsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiA1LA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibm9ybWFsIiwNCiAgICAgICJlYXRfc291bmQiOiAicmFuZG9tLmJ1cnAiLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiY29va2VkX3NhbG1vbiIsDQogICAgImlkIjogMjA3LA0KICAgICJpY29uIjogImNvb2tlZF9zYWxtb24iLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KICAgICJtYXhfZGFtYWdlIjogMCwNCiAgICAic3RhY2tlZF9ieV9kYXRhIjogdHJ1ZSwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDYsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJnb29kIiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImNvb2tpZSIsDQogICAgImlkIjogMTAxLA0KICAgICJpY29uIjogImNvb2tpZSIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAyLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAicG9vciIsDQogICAgICAiaXNfbWVhdCI6IGZhbHNlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAibWVsb24iLA0KICAgICJpZCI6IDEwNCwNCiAgICAiaWNvbiI6ICJtZWxvbiIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAyLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibG93IiwNCiAgICAgICJpc19tZWF0IjogZmFsc2UNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJiZWVmIiwNCiAgICAiaWQiOiAxMDcsDQogICAgImljb24iOiAiYmVlZl9yYXciLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogMywNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogImxvdyIsDQogICAgICAiaXNfbWVhdCI6IHRydWUNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJzdGVhayIsDQogICAgImlkIjogMTA4LA0KICAgICJpY29uIjogImJlZWZfY29va2VkIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDgsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJnb29kIiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImNoaWNrZW4iLA0KICAgICJpZCI6IDEwOSwNCiAgICAiaWNvbiI6ICJjaGlja2VuX3JhdyIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAyLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibG93IiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZSwNCiAgICAgICJlZmZlY3RzIjogWw0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAiaHVuZ2VyIiwNCiAgICAgICAgICAiY2hhbmNlIjogMC4zLA0KICAgICAgICAgICJkdXJhdGlvbiI6IDMwLA0KICAgICAgICAgICJhbXBsaWZpZXIiOiAwDQogICAgICAgIH0NCiAgICAgIF0NCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJjb29rZWRfY2hpY2tlbiIsDQogICAgImlkIjogMTEwLA0KICAgICJpY29uIjogImNoaWNrZW5fY29va2VkIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDYsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJub3JtYWwiLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAibXV0dG9uUmF3IiwNCiAgICAiaWQiOiAxNjcsDQogICAgImljb24iOiAibXV0dG9uX3JhdyIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAyLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibG93IiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogIm11dHRvbkNvb2tlZCIsDQogICAgImlkIjogMTY4LA0KICAgICJpY29uIjogIm11dHRvbl9jb29rZWQiLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogNiwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogImdvb2QiLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAicm90dGVuX2ZsZXNoIiwNCiAgICAiaWQiOiAxMTEsDQogICAgImljb24iOiAicm90dGVuX2ZsZXNoIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDQsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJwb29yIiwNCiAgICAgICJpc19tZWF0IjogdHJ1ZSwNCiAgICAgICJlZmZlY3RzIjogWw0KICAgICAgICB7DQogICAgICAgICAgIm5hbWUiOiAiaHVuZ2VyIiwNCiAgICAgICAgICAiY2hhbmNlIjogMC4zLA0KICAgICAgICAgICJkdXJhdGlvbiI6IDMwLA0KICAgICAgICAgICJhbXBsaWZpZXIiOiAwDQogICAgICAgIH0NCiAgICAgIF0NCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJzcGlkZXJfZXllIiwNCiAgICAiaWQiOiAxMTksDQogICAgImljb24iOiAic3BpZGVyX2V5ZSIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAyLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAiZ29vZCIsDQogICAgICAiaXNfbWVhdCI6IGZhbHNlLA0KICAgICAgImVmZmVjdHMiOiBbDQogICAgICAgIHsNCiAgICAgICAgICAibmFtZSI6ICJwb2lzb24iLA0KICAgICAgICAgICJjaGFuY2UiOiAxLjAsDQogICAgICAgICAgImR1cmF0aW9uIjogNSwNCiAgICAgICAgICAiYW1wbGlmaWVyIjogMA0KICAgICAgICB9DQogICAgICBdDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiY2Fycm90IiwNCiAgICAiaWQiOiAxMzUsDQogICAgImljb24iOiAiY2Fycm90IiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDMsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJub3JtYWwiLA0KICAgICAgImlzX21lYXQiOiBmYWxzZQ0KICAgIH0sDQogICAgInNlZWQiOiB7DQogICAgICAiY3JvcF9yZXN1bHQiOiAiY2Fycm90cyIsDQogICAgICAicGxhbnRfYXQiOiAiZmFybWxhbmQiDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAicG90YXRvIiwNCiAgICAiaWQiOiAxMzYsDQogICAgImljb24iOiAicG90YXRvIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDEsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJsb3ciLA0KICAgICAgImlzX21lYXQiOiBmYWxzZQ0KICAgIH0sDQogICAgInNlZWQiOiB7DQogICAgICAiY3JvcF9yZXN1bHQiOiAicG90YXRvZXMiLA0KICAgICAgInBsYW50X2F0IjogImZhcm1sYW5kIg0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImJha2VkX3BvdGF0byIsDQogICAgImlkIjogMTM3LA0KICAgICJpY29uIjogInBvdGF0b19iYWtlZCIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiA1LA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibm9ybWFsIiwNCiAgICAgICJpc19tZWF0IjogZmFsc2UNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJwb2lzb25vdXNfcG90YXRvIiwNCiAgICAiaWQiOiAxMzgsDQogICAgImljb24iOiAicG90YXRvX3BvaXNvbm91cyIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAyLA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibG93IiwNCiAgICAgICJpc19tZWF0IjogZmFsc2UsDQogICAgICAiZWZmZWN0cyI6IFsNCiAgICAgICAgew0KICAgICAgICAgICJuYW1lIjogInBvaXNvbiIsDQogICAgICAgICAgImNoYW5jZSI6IDAuNiwNCiAgICAgICAgICAiZHVyYXRpb24iOiA1LA0KICAgICAgICAgICJhbXBsaWZpZXIiOiAwDQogICAgICAgIH0NCiAgICAgIF0NCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJnb2xkZW5fY2Fycm90IiwNCiAgICAiaWQiOiAxNDAsDQogICAgImljb24iOiAiY2Fycm90X2dvbGRlbiIsDQogICAgImNhdGVnb3J5IjogIk1pc2NlbGxhbmVvdXMiLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogNiwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogInN1cGVybmF0dXJhbCIsDQogICAgICAiaXNfbWVhdCI6IGZhbHNlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAicHVtcGtpbl9waWUiLA0KICAgICJpZCI6IDE0NCwNCiAgICAiaWNvbiI6ICJwdW1wa2luX3BpZSIsDQogICAgInVzZV9hbmltYXRpb24iOiAiZWF0IiwNCiAgICAidXNlX2R1cmF0aW9uIjogMzIsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiA4LA0KICAgICAgInNhdHVyYXRpb25fbW9kaWZpZXIiOiAibG93IiwNCiAgICAgICJpc19tZWF0IjogZmFsc2UNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJyYWJiaXQiLA0KICAgICJpZCI6IDE1NSwNCiAgICAiaWNvbiI6ICJyYWJiaXQiLA0KICAgICJjYXRlZ29yeSI6ICJNaXNjZWxsYW5lb3VzIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDMsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJsb3ciLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAiY29va2VkX3JhYmJpdCIsDQogICAgImlkIjogMTU2LA0KICAgICJpY29uIjogInJhYmJpdF9jb29rZWQiLA0KICAgICJjYXRlZ29yeSI6ICJNaXNjZWxsYW5lb3VzIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDUsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJub3JtYWwiLA0KICAgICAgImlzX21lYXQiOiB0cnVlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAicmFiYml0X3N0ZXciLA0KICAgICJpZCI6IDE1NywNCiAgICAiaWNvbiI6ICJyYWJiaXRfc3RldyIsDQogICAgImNhdGVnb3J5IjogIk1pc2NlbGxhbmVvdXMiLA0KICAgICJ1c2VfYW5pbWF0aW9uIjogImVhdCIsDQogICAgInVzZV9kdXJhdGlvbiI6IDMyLA0KICAgICJtYXhfc3RhY2tfc2l6ZSI6IDEsDQoNCiAgICAiZm9vZCI6IHsNCiAgICAgICJudXRyaXRpb24iOiAxMCwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogIm5vcm1hbCIsDQogICAgICAidXNpbmdfY29udmVydHNfdG8iOiAiYm93bCIsDQogICAgICAiaXNfbWVhdCI6IHRydWUNCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJiZWV0cm9vdCIsDQogICAgImlkIjogMjAxLA0KICAgICJpY29uIjogImJlZXRyb290IiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCg0KICAgICJmb29kIjogew0KICAgICAgIm51dHJpdGlvbiI6IDEsDQogICAgICAic2F0dXJhdGlvbl9tb2RpZmllciI6ICJub3JtYWwiLA0KICAgICAgImlzX21lYXQiOiBmYWxzZQ0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImJlZXRyb290X3NvdXAiLA0KICAgICJpZCI6IDIwMywNCiAgICAiaWNvbiI6ICJiZWV0cm9vdF9zb3VwIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJlYXQiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAzMiwNCiAgICAibWF4X3N0YWNrX3NpemUiOiAxLA0KDQogICAgImZvb2QiOiB7DQogICAgICAibnV0cml0aW9uIjogNiwNCiAgICAgICJzYXR1cmF0aW9uX21vZGlmaWVyIjogIm5vcm1hbCIsDQogICAgICAidXNpbmdfY29udmVydHNfdG8iOiAiYm93bCIsDQogICAgICAiaXNfbWVhdCI6IGZhbHNlDQogICAgfQ0KICB9LA0KICB7DQogICAgIm5hbWUiOiAid2hlYXRfc2VlZHMiLCANCiAgICAiaWQiOiAzOSwNCiAgICAiaWNvbiI6ICJzZWVkc193aGVhdCIsDQogICAgImNhdGVnb3J5IjogIk1pc2NlbGxhbmVvdXMiLA0KDQogICAgInNlZWQiOiB7DQogICAgICAiY3JvcF9yZXN1bHQiOiAid2hlYXQiLCANCiAgICAgICJwbGFudF9hdCI6ICJmYXJtbGFuZCINCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJwdW1wa2luX3NlZWRzIiwNCiAgICAiaWQiOiAxMDUsDQogICAgImljb24iOiAic2VlZHNfcHVtcGtpbiIsDQogICAgImNhdGVnb3J5IjogIk1pc2NlbGxhbmVvdXMiLA0KDQogICAgInNlZWQiOiB7DQogICAgICAiY3JvcF9yZXN1bHQiOiAicHVtcGtpbl9zdGVtIiwNCiAgICAgICJwbGFudF9hdCI6ICJmYXJtbGFuZCINCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJtZWxvbl9zZWVkcyIsDQogICAgImlkIjogMTA2LA0KICAgICJpY29uIjogInNlZWRzX21lbG9uIiwNCiAgICAiY2F0ZWdvcnkiOiAiTWlzY2VsbGFuZW91cyIsDQoNCiAgICAic2VlZCI6IHsNCiAgICAgICJjcm9wX3Jlc3VsdCI6ICJtZWxvbl9zdGVtIiwNCiAgICAgICJwbGFudF9hdCI6ICJmYXJtbGFuZCINCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJuZXRoZXJfd2FydCIsDQogICAgImlkIjogMTE2LA0KICAgICJpY29uIjogIm5ldGhlcl93YXJ0IiwNCiAgICAiY2F0ZWdvcnkiOiAiTWlzY2VsbGFuZW91cyIsDQoNCiAgICAic2VlZCI6IHsNCiAgICAgICJjcm9wX3Jlc3VsdCI6ICJuZXRoZXJfd2FydCIsDQogICAgICAicGxhbnRfYXQiOiAic291bF9zYW5kIg0KICAgIH0NCiAgfSwNCiAgew0KICAgICJuYW1lIjogImJlZXRyb290X3NlZWRzIiwNCiAgICAiaWQiOiAyMDIsDQogICAgImljb24iOiAic2VlZHNfYmVldHJvb3QiLA0KICAgICJjYXRlZ29yeSI6ICJNaXNjZWxsYW5lb3VzIiwNCg0KICAgICJzZWVkIjogew0KICAgICAgImNyb3BfcmVzdWx0IjogImJlZXRyb290IiwNCiAgICAgICJwbGFudF9hdCI6ICJmYXJtbGFuZCINCiAgICB9DQogIH0sDQogIHsNCiAgICAibmFtZSI6ICJjYW1lcmEiLA0KICAgICJpZCI6IDI0MiwNCiAgICAiaWNvbiI6ICJjYW1lcmEiLA0KICAgICJjYXRlZ29yeSI6ICJNaXNjZWxsYW5lb3VzIiwNCiAgICAidXNlX2FuaW1hdGlvbiI6ICJjYW1lcmEiLA0KICAgICJ1c2VfZHVyYXRpb24iOiAxMDAwMDAsDQogICAgImJsb2NrIjogImNhbWVyYSIsDQoNCiAgICAiY2FtZXJhIjogew0KICAgICAgImJsYWNrX2JhcnNfZHVyYXRpb24iOiAwLjIsDQogICAgICAiYmxhY2tfYmFyc19zY3JlZW5fcmF0aW8iOiAwLjA4LA0KICAgICAgInNodXR0ZXJfZHVyYXRpb24iOiAwLjIsDQogICAgICAicGljdHVyZV9kdXJhdGlvbiI6IDEuMCwNCiAgICAgICJzbGlkZV9hd2F5X2R1cmF0aW9uIjogMC4yDQoNCiAgICB9DQogIH0NCl0NCg";
        //var items = "";
        items = Utils.Base64.decode(items);
        var newStr = "",
            leng = 0;
        for (var i in items)
            leng++;
        for (var i = 0; i < leng; i++)
            newStr += String.fromCharCode(items[i]);
        items = newStr;
    } catch (e) {
        SummitPE.ctoast("Loading FastEat items not working! FastEat wont work. Error: " + e);
    }
} else
    SummitPE.ctoast("FastEat is not enabled! FastEat wont work.");


var fasteat = {
    name: "FastEat",
    desc: "You eat faster.\nEatTime: Time in ticks you need to eat one food Item",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    requireGame: true,
    eatTime: 4,
    refreshFEat: function(eatTime) {
        if (SummitPE.inGame) {
            //SummitPE.ctoast("Loading FastEat items not working! FastEat wont work."); //не работает, бескончный цикл
            var t = new java.lang.Thread(new java.lang.Runnable({
                run: function() {
                    try {
                        items = new org.json.JSONArray(items.toString());
                        var curr;
                        for (var i = 0; i < items.length(); i++)
                            if ((curr = items.optJSONObject(i)) && curr.has("use_duration") && curr.getInt("use_duration") <= 32)
                                if (curr.put("use_duration", eatTime))
                                    Item.setProperties(256 + parseInt(curr.getInt("id")), curr.toString() + "");
                    } catch (e) {
                        SummitPE.ctoast("Error!: " + e);
                    }
                }
            }));
            t.start();
        } else {
            SummitPE.ctoast(this.name + " is disabled, please join the game");
            this.state = !this.state
        }
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var timeText = new android.widget.TextView(ctx);
        timeText.setText("EatTime: " + (this.eatTime));
        timeText.setTextColor(android.graphics.Color.BLACK);
        timeText.setTextSize(dip2px(9));
        timeText.setGravity(android.view.Gravity.CENTER);
        timeText.setTypeface(Utils.font);
        var timeSlider = Utils.ModSettings.getSlider();
        timeSlider.setMax(31);
        //rangeSlider.setMin(1);
        timeSlider.setProgress(this.eatTime - 1);
        timeSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {

                timeText.setText("EatTime: " + (progress + 1));

            },
            onStopTrackingTouch: function(seekbar) {
                fasteat.eatTime = seekbar.getProgress() + 1;
                fasteat.refreshFEat(fasteat.eatTime);
            }
        }));
        settings.addView(timeSlider, params);
        settings.addView(timeText, params);


        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state
        if (this.state)
            this.refreshFEat(this.eatTime);
        else
            this.refreshFEat(32);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(fasteat); */

var autoTotem = {
    name: "Auto totem",
    desc: "Automatically give totem in offhand",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (!SummitPE.inGame) return;
        //if (Entity.getEntityTypeId(getPlayerEnt()) != 0) {
        Entity.setOffhandSlot(getPlayerEnt(), 450, 1, 0);
        //}
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(autoTotem);

var autoLeave = {
    name: "Auto leave",
    desc: "Auto leave, when player health <= 4",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (Entity.getHealth(getPlayerEnt()) <= 4) {
            ModPE.leaveGame();
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(autoLeave);

var lifedisplay = {
    name: "LifeDisplay",
    desc: "Displays your life stats",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    lifeGui: null,
    lifeView: null,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (!SummitPE.inGame) return true;

        if (this.state && (getPlayerEnt() == -1 || getPlayerEnt() == -1)) {
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    if (lifedisplay.lifeGui != null)
                        lifedisplay.lifeGui.dismiss();
                }
            }));
        } else if (this.state && tick1 % 8 == 0) {
            this.showGui(Entity.getHealth(getPlayerEnt()) + "/" + Entity.getMaxHealth(getPlayerEnt()) + "❤");
        }
    },
    showGui: function(text) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (lifedisplay.lifeGui == null || lifedisplay.lifeGui.isShowing() == false) {
                    var bg = new android.graphics.drawable.GradientDrawable();
                    bg.setColor(getColorAHEXFromARGB(150, 20, 20, 20));
                    bg.setCornerRadius(dip2px(3));
                    lifedisplay.lifeView = new android.widget.TextView(ctx);
                    lifedisplay.lifeView.setTypeface(Utils.font);
                    lifedisplay.lifeView.setTextColor(android.graphics.Color.WHITE);
                    lifedisplay.lifeView.setBackground(bg);
                    lifedisplay.lifeView.setTextSize(dip2px(19));
                    lifedisplay.lifeView.setText(text);
                    lifedisplay.lifeGui = new android.widget.PopupWindow(lifedisplay.lifeView, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    lifedisplay.lifeGui.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    lifedisplay.lifeGui.setTouchable(false);
                    lifedisplay.lifeGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                } else {
                    lifedisplay.lifeView.setText(text);
                }
            }
        }));

    },
    onClick: function(btn) {
        this.state = !this.state;
        if (!this.state && this.lifeGui != null)
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    lifedisplay.lifeGui.dismiss();
                }
            }));
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(lifedisplay);

var antiAfkKick = {
    name: "Anti Afk Kick",
    desc: "Auto velocity, when you not around device",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    inMoment: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (tick1 == 10) {
            setVelX(Player.getEntity(), -0.3);
            this.inMoment = true;
        } else if (tick1 == 15 && this.inMoment) {
            setVelY(Player.getEntity(), -0.3);
        } else if (tick1 == 20 && this.inMoment) {
            setVelX(Player.getEntity(), 0);
        } else if (tick1 == 25 && this.inMoment) {
            setVelY(Player.getEntity(), 0);
        } else if (tick1 == 30 && this.inMoment) {
            setVelX(Player.getEntity(), 0.3);
        } else if (tick1 == 35 && this.inMoment) {
            setVelY(Player.getEntity(), 0.3);
        } else if (tick1 == 40 && this.inMoment) {
            setVelX(Player.getEntity(), 0);
        } else if (tick1 == 45 && this.inMoment) {
            setVelY(Player.getEntity(), 0);
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        this.inMoment = false;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(antiAfkKick);

var fpsMeter = {
    name: "FPS meter",
    desc: "Display current fps",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    tick: 0,
    lastTime: -1,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        var time = java.lang.System.currentTimeMillis();
        if (fpsMeter.tick++ % 200 == 0) {
            if (fpsMeter.lastTime != -1) {
                var fps = 1000 / (time - fpsMeter.lastTime) * 60;
                ModPE.showTipMessage(Math.round(Math.round(fps * 10) / 100) + " fps");
            }
            fpsMeter.lastTime = time;
            fpsMeter.tick = 0;
        }
    },
    onClick: function(btn) {
        this.state = !this.state
        if (!this.state) fpsMeter.lastTime = -1;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(fpsMeter);

var fastbridge = {
    name: "FastBridge",
    desc: "You will be teleported to the block you placed",
    type: ModuleType.mod,
    category: ModCategory.PLAYER,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onUseItem: function(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        if (!this.state)
            return;
        if (Math.abs(x - getPlayerX()) > 1.5 || Math.abs(z - getPlayerZ()) > 1.5)
            return;
        if (itemid == 0 || itemid >= 256)
            return;
        switch (side) {
            case BlockFace.NORTH:
                Entity.setPositionRelative(getPlayerEnt(), 0, 0, -1);
                break;
            case BlockFace.SOUTH:
                Entity.setPositionRelative(getPlayerEnt(), 0, 0, 1);
                break;
            case BlockFace.WEST:
                Entity.setPositionRelative(getPlayerEnt(), -1, 0, 0);
                break;
            case BlockFace.EAST:
                Entity.setPositionRelative(getPlayerEnt(), 1, 0, 0);
                break;
            case BlockFace.UP:
                Entity.setPositionRelative(getPlayerEnt(), 0, 1, 0);
                break;
        }
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(fastbridge);

var spammer = {
    name: "Spammer",
    desc: "Spams a specified text" + (Utils.bypassMode != BypassMode.DEFAULT ? "" : ""),
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    lastTime: 0,
    msg: "Spam! Spam! Spam!",
    delay: 100,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var delayText = new android.widget.TextView(ctx);
        delayText.setText("Delay: " + (this.delay / 1000) + " Seconds");
        delayText.setTextColor(android.graphics.Color.BLACK);
        delayText.setTextSize(dip2px(9));
        delayText.setGravity(android.view.Gravity.CENTER);
        delayText.setTypeface(Utils.font);
        var delaySlider = Utils.ModSettings.getSlider();
        delaySlider.setMax(50);
        //5 seconds
        delaySlider.setProgress(this.delay / 100);
        delaySlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {
                switch (Utils.bypassMode) {
                    case BypassMode.LBSG:
                        if (progress < 40) {
                            progress = 40;
                            //SummitPE.ctoast("Spammer delay below 4 seconds is not allowed in LBSG Bypass-Mode!");
                            seekBar.setProgress(40);
                        }
                        break;
                }
                delayText.setText("Delay: " + (progress / 10) + " Seconds");

            },
            onStopTrackingTouch: function(seekbar) {
                spammer.delay = seekbar.getProgress() * 100;
            }
        }));
        var spamMsg = new android.widget.EditText(ctx);
        spamMsg.setText(this.msg);
        spamMsg.setGravity(android.view.Gravity.CENTER);
        spamMsg.setTypeface(Utils.font);
        spamMsg.setHint("Text to spam");
        spamMsg.addTextChangedListener(new android.text.TextWatcher({
            afterTextChanged: function(text) {
                spammer.msg = text;
            }
        }));
        settings.addView(delaySlider, params);
        settings.addView(delayText, params);
        settings.addView(spamMsg, params);

        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (!this.state)
            return
        switch (Utils.bypassMode) {
            case BypassMode.DEFAULT:
                if (java.lang.System.currentTimeMillis() - this.lastTime > this.delay) {
                    var msg = this.msg;
                    if (msg.charAt(0) != "/") {
                        msg = msg + "😀";
                        msg = msg + Math.random().toString(36).replace(/[^a-z]+/g, '');
                    }
                    Server.sendChat(msg);
                    this.lastTime = java.lang.System.currentTimeMillis();
                }
                break;
            case BypassMode.LBSG:
                if (java.lang.System.currentTimeMillis() - this.lastTime > Math.max(this.delay, 4000)) {
                    var msg = this.msg;
                    if (msg.charAt(0) != "/") {
                        msg = msg + "😀";
                        msg = msg + Math.random().toString(36).replace(/[^a-z]+/g, '');
                    }
                    Server.sendChat(msg);
                    this.lastTime = java.lang.System.currentTimeMillis();
                }
                break;
        }

    },
    onClick: function(btn) {
        this.state = !this.state
        this.lastTime = java.lang.System.currentTimeMillis() - 10000;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }

};
SummitPE.registerModule(spammer);

var playerHook = {
    name: "Player warning",
    desc: "Send a message to the chat when a player appears or disappears [Works in 1.0+]",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onEntityAdd: function(entity) {
        //if (Entity.getEntityTypeId(entity) === EntityType.PLAYER || Entity.getEntityTypeId(entity) === EntityType.ENDERMAN) {
        clientMessage("§4Warning§b > §eentity §a" + Entity.getNameTag(entity) + " (Health: " + Entity.getHealth(entity) + ") §eadd in this map! Debug: " + Entity.getEntityTypeId(entity));
        //}
    },
    onEntityRemove: function(entity) {
        //if (Entity.getEntityTypeId(entity) === EntityType.PLAYER || Entity.getEntityTypeId(entity) === EntityType.ENDERMAN) {
        clientMessage("§8Message§b > §eentity §a" + Entity.getNameTag(entity) + " §eremoved in this map! Debug: " + Entity.getEntityTypeId(entity));
        //}
    },
    onClick: function(btn) {
        this.state = !this.state
        this.lastTime = java.lang.System.currentTimeMillis() - 10000;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }

};
SummitPE.registerModule(playerHook);

var timer = {
    name: "Timer",
    desc: "It's timer!",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    gameSpeed: 20,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var timerText = new android.widget.TextView(ctx);
        timerText.setText("Game speed: " + this.gameSpeed + " ticks");
        timerText.setTextColor(android.graphics.Color.BLACK);
        timerText.setTextSize(dip2px(9));
        timerText.setGravity(android.view.Gravity.CENTER);
        timerText.setTypeface(Utils.font);
        var timerSlider = Utils.ModSettings.getSlider();
        timerSlider.setMax(100);
        //timerSlider.setMin(20);
        timerSlider.setProgress(this.gameSpeed);
        timerSlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {
                switch (Utils.bypassMode) {
                    case BypassMode.LBSG:
                        if (progress > 80) {
                            progress = 80;
                            SummitPE.ctoast("Game speed up 80 ticks/second is not allowed in LBSG Bypass-Mode!");
                            seekBar.setProgress(80);
                        }
                        break;
                }
                timerText.setText("Game speed: " + progress + " ticks");

            },
            onStopTrackingTouch: function(seekbar) {
                timer.gameSpeed = seekbar.getProgress();
                if (timer.state) ModPE.setGameSpeed(timer.gameSpeed);
            }
        }));
        settings.addView(timerText, params);
        settings.addView(timerSlider, params);

        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;

        if (!this.state) ModPE.setGameSpeed(20);
        else ModPE.setGameSpeed(this.gameSpeed);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }

};
SummitPE.registerModule(timer);

var autowalk = {
    name: "AutoWalk",
    desc: "Makes you walk automatically.",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (!this.state)
            return;
        var vector = new Array();
        var yaw = (getYaw(getPlayerEnt()) + 90) * (Math.PI / 180);
        var pitch = 0;
        vector[0] = Math.cos(yaw) * Math.cos(pitch);
        vector[1] = Math.sin(getPitch(getPlayerEnt()) * (Math.PI / 180) * -1);
        vector[2] = Math.sin(yaw) * Math.cos(pitch);
        Entity.setVelX(getPlayerEnt(), vector[0] * 0.2);
        if (Player.isFlying()) {
            Entity.setVelY(getPlayerEnt(), vector[1] * 0.2);
        }
        Entity.setVelZ(getPlayerEnt(), vector[2] * 0.2);
        //TODO: Fix flying compatibility
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(autowalk);

var tower = {
    name: "Tower",
    desc: "Makes you jump in building...",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onUseItem: function(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
        if (!this.state)
            return;
        Entity.setVelY(getPlayerEnt(), 0.4);
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(tower);

var passhack = {
    name: "Passhack",
    desc: "Tries to crack a password.",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    lastTime: 0,
    delay: 100,
    loginPattern: "/login {password}",
    passes: "lol",
    usedPasses: 0,
    downloadPasses: function() {
        var url = "https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/10_million_password_list_top_10000.txt";
        Utils.Url.getUrlContents(url, function(cont, error) {
            if (error != null && error != "") {
                SummitPE.ctoast("Pass-DL-Error: " + error);
            } else
                passhack.passes = cont.split("\n");
        });

    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (!this.state || this.passes == "lol")
            return
        if ((java.lang.System.currentTimeMillis() - this.lastTime) > 100) {
            var password = this.passes[this.usedPasses];
            this.usedPasses++;
            Server.sendChat(this.loginPattern.replace(new RegExp("{password}", 'g'), password));
            SummitPE.cmsg("Tried the " + this.usedPasses + "th password \"" + password + "\"");
            clientMessage("SummitPE: Tried the " + this.usedPasses + "th password \"" + password + "\"");
            this.lastTime = java.lang.System.currentTimeMillis();
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
        this.usedPasses = 0;
        this.lastTime = java.lang.System.currentTimeMillis() - 10000;
        if (this.state == true)
            if (this.passes == null) {
                SummitPE.ctoast("Password list not downloaded yet.\nTrying to download it...");
                this.state = false;
                this.downloadPasses();
            }

    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
//passhack.downloadPasses(); don't work
SummitPE.registerModule(passhack);

var ghostmode = {
    name: "GhostMode",
    desc: "Makes the \"SummitPE\" Button invisible",
    type: ModuleType.special,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        SummitPE.ghostMode = this.state;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(ghostmode);

var fullbright = {
    name: "Fullbright",
    desc: "Let you see everything.",
    type: ModuleType.mod,
    category: ModCategory.RENDER,
    state: false,
    requireGame: true,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            Entity.addEffect(Player.getEntity(), 16, 5000000, 999, true);
        } else {
            Entity.removeEffect(Player.getEntity(), 16);
        }
        //Block.setLightLevel(0, this.state ? 15 : 0);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(fullbright);

var follow = {
    name: "Follow",
    desc: "Follows the nearest entity. This works with Target",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    lastTime: 0,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        if (!this.state)
            return
        //		if(this.lastTime == 0)
        //			this.lastTime = java.lang.System.currentTimeMillis() - 100;
        //		if(java.lang.System.currentTimeMillis() - this.lastTime > )
        var target = Utils.Entity.getNearestEntity(80);
        var x = getPlayerX();
        var z = getPlayerZ();
        var x2 = Entity.getX(target);
        var z2 = Entity.getZ(target);
        if (Utils.Player.onGround() && getPlayerY() - 1.62 - (Entity.getEntityTypeId(target) == 63 ? Entity.getY(target) - 1.62 : Entity.getY(target)) < -0.8)
            setVelY(getPlayerEnt(), 0.42);
        if (Utils.Player.isInWater() && getPlayerY() - 1.62 - (Entity.getEntityTypeId(target) == 63 ? Entity.getY(target) - 1.62 : Entity.getY(target)) < -0.8)
            setVelY(getPlayerEnt(), 0.3);
        if (Utils.Player.isOnLadder() && getPlayerY() - 1.62 - (Entity.getEnti7tyTypeId(target) == 63 ? Entity.getY(target) - 1.62 : Entity.getY(target)) < -0.2)
            setVelY(getPlayerEnt(), 0.2);
        var dist = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(z - z2, 2));
        if (dist <= 1)
            return;
        setVelX(getPlayerEnt(), -Math.max(-0.35, Math.min(0.35, ((x - x2) / dist) / 3)));
        setVelZ(getPlayerEnt(), -Math.max(-0.35, Math.min(0.35, ((z - z2) / dist) / 3)));
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(follow);

var teleport = {
    name: "Teleport",
    desc: "Teleports you",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    requireGame: true,
    aimedBlock: [0, 0, 0],
    selectedBlock: [0, 0, 0],
    telGui: null,
    telDelay: 100,
    yMotion: true,
    isThreadRunning: false,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var delayText = new android.widget.TextView(ctx);
        delayText.setText("Delay: " + (this.telDelay / 1000) + " Seconds");
        delayText.setTextColor(android.graphics.Color.BLACK);
        delayText.setTextSize(dip2px(9));
        delayText.setGravity(android.view.Gravity.CENTER);
        delayText.setTypeface(Utils.font);
        var delaySlider = Utils.ModSettings.getSlider();
        delaySlider.setMax(30);
        //3 seconds
        delaySlider.setProgress(this.telDelay / 100);
        delaySlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {
                switch (Utils.bypassMode) {
                    case BypassMode.LBSG:
                        if (progress < 5) {
                            progress = 5;
                            //SummitPE.ctoast("Spammer delay below 4 seconds is not allowed in LBSG Bypass-Mode!");
                            seekBar.setProgress(5);
                        }
                        break;
                }
                delayText.setText("Delay: " + (progress / 10) + " Seconds");
                if (progress == 0)
                    delayText.setText("Delay: Instant");
            },
            onStopTrackingTouch: function(seekbar) {
                teleport.telDelay = seekbar.getProgress() * 100;
            }
        }));

        var yMotCheck = new android.widget.CheckBox(ctx);
        yMotCheck.setGravity(android.view.Gravity.CENTER);
        yMotCheck.setTypeface(Utils.font);
        yMotCheck.setText("YMotion (Deactivate for Fly-Bypass)");
        yMotCheck.setTextColor(android.graphics.Color.BLACK);
        yMotCheck.setChecked(teleport.yMotion);
        yMotCheck.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(view) {
                teleport.yMotion = yMotCheck.isChecked();
            }
        }))

        settings.addView(delaySlider, params);
        settings.addView(delayText, params);
        settings.addView(yMotCheck, params);

        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (teleport.threadRunning)
            setVelY(getPlayerEnt(), 0);
    },
    tpThread: function() {
        if (teleport.threadRunning)
            return;
        var t = new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                teleport.threadRunning = true;
                while (teleport.state && SummitPE.inGame && (Math.floor(teleport.selectedBlock[0]) != Math.floor(getPlayerX()) || (Math.floor(teleport.selectedBlock[1] + 2.8) != Math.floor(getPlayerY()) && teleport.yMotion) || Math.floor(teleport.selectedBlock[2]) != Math.floor(getPlayerZ()))) {
                    java.lang.Thread.sleep(teleport.telDelay);
                    if (!teleport.state)
                        break;
                    var x = getPlayerX();
                    var y = getPlayerY();
                    var z = getPlayerZ();
                    var x2 = teleport.selectedBlock[0];
                    var y2 = teleport.selectedBlock[1] + 2.8;
                    var z2 = teleport.selectedBlock[2];
                    //var dist = Math.sqrt(Math.pow(x2 - x, 2) * Math.pow(y2 - y, 2) * Math.pow(z2- z, 2));
                    //if(dist < 0.1)
                    //break;
                    Entity.setPositionRelative(getPlayerEnt(), -Math.max(-3, Math.min(3, x - x2)), teleport.yMotion ? -Math.max(-2, Math.min(2, y - y2)) : 0, -Math.max(-3, Math.min(3, z - z2)));

                }
                teleport.threadRunning = false;
            }
        }));
        t.start();
    },
    showGui: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                if (teleport.telGui == null || teleport.telGui.isShowing() == false) {
                    var setPosBtn = new android.widget.Button(ctx);
                    setPosBtn.setTypeface(Utils.font);
                    setPosBtn.setText("Set Position");
                    setPosBtn.getBackground().setAlpha(200);
                    setPosBtn.setPadding(10, 10, 10, 10);
                    setPosBtn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(btn) {
                            if (SummitPE.inGame) {
                                if (teleport.aimedBlock[1] <= 0) {
                                    SummitPE.cmsg("Please select a valid Position");
                                    return;
                                }
                                teleport.selectedBlock = teleport.aimedBlock;
                                //Entity.setPosition(getPlayerEnt(), teleport.aimedBlock [0] + 0.5, teleport.aimedBlock[1] + 2.1, teleport.aimedBlock[2] + 0.5);
                                teleport.tpThread();

                            } else {
                                SummitPE.ctoast("Please join the game");
                            }

                        }
                    }));
                    teleport.telGui = new android.widget.PopupWindow(setPosBtn, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                    teleport.telGui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.CENTER, 0, -dip2px(50));
                }
            }
        }));

    },
    startRayTr: function() {
        var t = new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                while (teleport.state && SummitPE.inGame) {
                    if (teleport.threadRunning == true)
                        continue;
                    Timings.startTiming("teleport-rayTrThread");
                    var yaw = (getYaw() + 90) * (Math.PI / 180);

                    var pitch = getPitch() * -(Math.PI / 180);
                    var dir = [
                        Math.cos(yaw) * Math.cos(pitch),
                        Math.sin(pitch),
                        Math.sin(yaw) * Math.cos(pitch)
                    ];
                    var res = Utils.Block.rayTrace([
                        dir[0], dir[1], dir[2]
                    ], [getPlayerX(), getPlayerY() + 0.0, getPlayerZ()], 100);
                    if (res.hit) {
                        teleport.aimedBlock = [res.x, res.y, res.z];
                    } else {
                        teleport.aimedBlock = [0, 0, 0];
                    }
                    Timings.stopTiming("teleport-rayTrThread");
                }

                if (teleport.state && !SummitPE.inGame) {
                    if (teleport.telGui != null && teleport.telGui.isShowing() == true)
                        teleport.telGui.dismiss();
                    teleport.state = false;
                    SummitPE.ctoast(teleport.name + " is disabled, please join the game");
                }
            }
        }));
        t.start();
    },
    onRender: function(gl) {
        if (teleport.state && teleport.aimedBlock[1] > 0)
            Utils.Render.drawBox(gl, teleport.aimedBlock[0], teleport.aimedBlock[1] + 1, teleport.aimedBlock[2], 1, 1, 1);
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            this.startRayTr();
            this.showGui();
        } else if (teleport.telGui != null && teleport.telGui.isShowing() == true) {
            teleport.telGui.dismiss();
        }
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(teleport);

var sbind = {
    name: "SimpleBind",
    desc: "Adds a button which can toggle a module without being in the menu.",
    type: ModuleType.special,
    state: false,
    currentModule: [],
    sgui: null,
    sbtn: null,
    pos: {
        isPos: false,
        dx2: 0,
        dy2: 0,
        mPosX2: 100,
        mPosY2: 0
    },
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var scroll = new android.widget.ScrollView(ctx);
        var modList = new android.widget.LinearLayout(ctx);
        modList.setOrientation(1);
        SummitPE.mods.forEach(function(entry) {
            if (entry.type == ModuleType.mod) {
                var btn = new android.widget.Button(ctx);
                btn.setText(entry.name);
                btn.setTypeface(Utils.font);
                btn.setTextColor(android.graphics.Color.BLACK);
                btn.setBackground(sbind.currentModule.indexOf(entry) <= -1 ? disabledGradient : /*sbind.currentModule.name == entry.name ? */ enabledGradient /*: disabledGradient*/ );
                btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {

                        if (sbind.currentModule.indexOf(entry) <= -1) {
                            sbind.currentModule.push(entry);
                            view.setBackground(enabledGradient);
                            sbind.showBtn();
                        } else {
                            sbind.currentModule.splice(sbind.currentModule.indexOf(entry), 1);
                            view.setBackground(disabledGradient);
                            sbind.showBtn();
                        }
                    }
                }));
                modList.addView(btn);
            }
        });
        scroll.addView(modList);
        settings.addView(scroll);
        return settings;
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    showBtn: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {

                if (sbind.sgui != null && sbind.sgui.isShowing()) sbind.sgui.dismiss();
                var slayout = new android.widget.LinearLayout(ctx);
                slayout.setOrientation(1);

                var moving2 = false;
                var dx2 = 0;
                var dy2 = 0;
                var mPosX2 = 100;
                var mPosY2 = 0;

                if (!sbind.pos.isPos) {
                    dx2 = 0;
                    dy2 = 0;
                    mPosX2 = ctx.getWindowManager().getDefaultDisplay().getWidth() / 16 * 0;
                    mPosY2 = ctx.getWindowManager().getDefaultDisplay().getHeight() / 2;
                } else {
                    dx2 = sbind.pos.dx2;
                    dy2 = sbind.pos.dy2;
                    mPosX2 = sbind.pos.mPosX2;
                    mPosY2 = sbind.pos.mPosY2;
                }

                var touchListen = new android.view.View.OnTouchListener({
                    onTouch: function(view, motionEvent) {
                        try {
                            if (!moving2) return false;
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx2 = mPosX2 - motionEvent.getRawX();
                                    dy2 = mPosY2 - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    mPosX2 = (motionEvent.getRawX() + dx2);
                                    mPosY2 = (motionEvent.getRawY() + dy2);
                                    sbind.sgui.update(mPosX2, mPosY2, -1, -1);

                                    sbind.pos.isPos = true;
                                    sbind.pos.dx2 = dx2;
                                    sbind.pos.dy2 = dy2;
                                    sbind.pos.mPosX2 = mPosX2;
                                    sbind.pos.mPosY2 = mPosY2;

                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    moving2 = false;
                                    break;
                            }
                        } catch (e) {
                            SummitPE.ctoast("Error: " + e);
                        }

                        return true;
                    }
                });
                var longListen = new android.view.View.OnLongClickListener({
                    onLongClick: function(v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE)
                            .vibrate(60);
                        moving2 = true;
                        return true;
                    }
                });
                sbind.currentModule.forEach(function(entry3) {
                    var btn = new android.widget.Button(ctx);
                    btn.setTypeface(Utils.font);
                    btn.setTextColor(android.graphics.Color.WHITE);
                    btn.setBackground(entry3.isStateMode() ? entry3.state ? enabledGradient : disabledGradient : SummitPE.getStyledBtnBackground(false, false));
                    btn.setText(entry3.name);
                    btn.setOnTouchListener(touchListen);
                    btn.setOnLongClickListener(longListen);
                    btn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(view) {
                            entry3.onClick(null);
                            btn.setBackground(entry3.isStateMode() ? entry3.state ? enabledGradient : disabledGradient : SummitPE.getStyledBtnBackground(false, false));
                            var childct = slayout.getChildCount();
                            for (var i = 0; i < childct; i++) {
                                var v = slayout.getChildAt(i);
                                for (var i2 = 0; i2 < sbind.currentModule.length; i2++) {
                                    if (sbind.currentModule[i2].name == v.getText()) {
                                        var m = sbind.currentModule[i2];
                                        v.setBackground(m.isStateMode() ? m.state ? enabledGradient : disabledGradient : SummitPE.getStyledBtnBackground(false, false));
                                        break;
                                    }
                                }

                            }
                        }
                    }));
                    slayout.addView(btn);
                });

                sbind.sgui = new android.widget.PopupWindow(slayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                sbind.sgui.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                sbind.sgui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, mPosX2, mPosY2);
                //sbind.sgui.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, ctx.getWindowManager()
                //.getDefaultDisplay()
                //.getWidth() / 16 * 0, ctx.getWindowManager()
                //.getDefaultDisplay()
                //.getHeight() / 2);


            }
        }));
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            if ((sbind.sgui != null && !sbind.sgui.isShowing()) && sbind.currentModule) {
                sbind.showBtn();
            } else {
                mDismiss();
                SummitPE.showModDialog(this);
            }
        } else {
            //sbind.currentModule = null;
            if (sbind.sgui != null && sbind.sgui.isShowing())
                sbind.sgui.dismiss();
        }


    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(sbind);

var autosword = {
    name: "AutoSword",
    desc: "Automatically selects the best sword in your hotbar if an enemy is near you [Works in ~ 1.2 - 1.12]",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    requireGame: true,
    isTrRunning: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    startThread: function() {
        if (autosword.isTrRunning)
            return;
        var t = new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                autosword.isTrRunning = true;
                while (autosword.state && SummitPE.inGame) {
                    if (Utils.Entity.getNearestEntity(5, true) != null) {
                        var bestsword = [-1, -1];
                        for (var i = 0; i < 10; i++) {
                            var dmg = Utils.Item.getDamage(Player.getInventorySlot(i));
                            if (dmg > bestsword[0]) {
                                bestsword[0] = dmg;
                                bestsword[1] = i;
                            }
                        }
                        if (bestsword[1] != -1)
                            Player.setSelectedSlotId(bestsword[1]);
                    }
                    java.lang.Thread.sleep(50);
                }
                autosword.isTrRunning = false;
                if (autosword.state && !SummitPE.inGame) {
                    autosword.state = false;
                    SummitPE.ctoast(autosword.name + " is disabled, please join the game");
                }
            }
        }));
        t.start();
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state)
            this.startThread();
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(autosword);

//Name Stats
function newLine() {
    return '\n';
}

var moreNameTags = {
    name: "Player Name Tags",
    desc: "Player info in name tag",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        if (!this.state)
            return
        var all = []; //Utils.Entity.getAll();
        var players = Server.getAllPlayers();
        var entityes = [].concat(all, players);

        var px = getPlayerX();
        var py = getPlayerY();
        var pz = getPlayerZ();

        entityes.forEach(function(entry) {
            if (Entity.getNameTag(entry) !== null) {
                if (Entity.getNameTag(entry).includes(',')) {
                    if (Entity.getNameTag(entry).split(',')[0] == '' && getTile(Entity.getX(entry), Entity.getY(entry) - 2, Entity.getZ(entry)) != 0) {
                        setTile(Entity.getX(entry), Entity.getY(entry) - 2, Entity.getZ(entry), 35, 2);
                    }

                    var entityOriName = Entity.getNameTag(entry).split(',')[0];
                    Entity.setNameTag(entry, entityOriName + ',' + newLine() +
                        Entity.getHealth(entry) + '/' + Entity.getMaxHealth(entry) +
                        newLine() + Item.getName(Entity.getCarriedItem(entry), Entity.getCarriedItemData(entry), false) +
                        ':' + Entity.getCarriedItemData(entry));
                } else {
                    Entity.setNameTag(entry, Entity.getNameTag(entry) +
                        ',' + newLine() + Entity.getHealth(entry) + '/' + Entity.getMaxHealth(entry) +
                        newLine() + Item.getName(Entity.getCarriedItem(entry), Entity.getCarriedItemData(entry), false) +
                        ':' + Entity.getCarriedItemData(entry));
                }
            }
        });
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(moreNameTags);

var singsong = {
    name: "SingSong",
    desc: "Choose a song and var the mod sing for you.",
    type: ModuleType.special,
    category: ModCategory.SPECIAL,
    state: false,
    lastTime: 0,
    selectedSong: [0, -1], //[song index, word index]
    delay: 1500,
    songList: [],
    /*songList: [ //[song name, song text splitted with \n]
    	["Adele - Hello", "Hello,\nit's me\nI was wondering if after all these years\nYou'd like to meet,\nto go over\nEverything\n\nThey say that time's supposed to heal ya\nBut I ain't done much healing\nHello, can you hear me?\nI'm in California dreaming about who we used to be\n\nWhen we were younger\nand free\n\nI've forgotten how it felt before the world fell at our feet\nThere's such a difference\nbetween us\nAnd a million miles\n\nHello from the other side\nI must've called a thousand times\nto tell you I'm sorry\nfor everything that I've done\n\nBut when I call you never\nseem to be home\nHello from the outside\nAt least I can say that I've tried\nto tell you I'm sorry\nfor breaking your heart\nBut it don't matter,\nit clearly doesn't tear you apart anymore\n\nHello\nhow are you?\nIt's so typical of me to talk about myself\nI'm sorry\n\nI hope\nthat you're well\nDid you ever make it out of that town\nWhere nothing ever happened?\nIt's no secret\nThat the both of us are running out of time\nHello from the other side\nI must've called a thousand times\nto tell you I'm sorry\nfor everything that I've done\nBut when I call you never seem to be home\n\nHello from the outside\nAt least I can say that I've tried\nto tell you I'm sorry\nfor breaking your heart\nBut it don't matter,\nit clearly doesn't tear you apart anymore\nOoooohh, anymore\nOoooohh, anymore\nOoooohh, anymore\nAnymore\n\nHello from the other side\nI must've called a thousand times\nto tell you I'm sorry\nfor everything that I've done\nBut when I call you never seem to be home\nHello from the outside\nAt least I can say that I've tried\nto tell you I'm sorry\nfor breaking your heart\nBut it don't matter, it clearly doesn't tear you apart anymore".split("\n")],
    	["Rag'n'Bone Man - Human", "Maybe I'm foolish, maybe I'm blind\nThinking I can see through this and see what's behind\nGot no way to prove it so maybe I'm blind\nBut I'm only human after all, I'm only human after all\nDon't put your blame on me\nTake a look in the mirror and what do you see\nDo you see it clearer or are you deceived in what you believe\nCos I'm only human after all, you're only human after all\nDon't put the blame on me\nDon't put your blame on me\nSome people got the real problems\nSome people out of luck\nSome people think I can solve them\nLord heavens above\nI'm only human after all, I'm only human after all\nDon't put the blame on me\nDon't put the blame on me\nDon't ask my opinion, don't ask me to lie\nThen beg for forgiveness for making you cry, making you cry\nCos I'm only human after all, I'm only human after all\nDon't put your blame on me, don't put the blame on me\nSome people got the real problems\nSome people out of luck\nSome people think I can solve them\nLord heavens above\nI'm only human after all, I'm only human after all\nDon't put the blame on me\nDon't put the blame on me\nI'm only human I make mistakes\nI'm only human that's all it takes to put the blame on me\nDon't put your blame on me\nI'm no prophet or messiah\nShould go looking somewhere higher\nI'm only human after all, I'm only human after all\nDon't put the blame on me, don't put the blame on me\nI'm only human I do what I can\nI'm just a man, I do what I can\nDon't put the blame on me\nDon't put your blame on me".split("\n")],
    	["Beginner - Ahnma", "Ey yo, ich komm mit großem Herz und Pauken und Trompeten\nfür die Obernerds und die saufenden Provaren\nDie Messdiener, Crackdealer, Alt-68er\nalle sind happy, denn der Testsieger rappt wieder\nEizi Eiz - heißer Scheiß!\nJeder, den du kennst, kennt eine meiner Lines\nHammertyp, Hammerflow, Hammersprüche\nDarum hängt mein Bild in Marsimotos Mamas Küche\nSchreib Gedichte, schreib damit Geschichte\nJeder, der mich disste, ist bereits Geschichte\nAlter, ich kam schon mit K-Zwo und Hammerhart,\nals ihr noch irgendwo im Sack von eurem Vadder wart\nDer Veteran von der Reeperbahn\nHab Hamburg hinter mi als wär ich Uwe Seeler, man\nUnd die Sonnenbrille - sie ist am Start, Baby\nSie ist der varzte Rest Privatsphäre\nWas los Digger, Ahnma\nWie wir gucken, wie wir labern\nJeder sagt Digger heutzutage\nWir packen Hamburg wieder auf die Karte\nWas los Digger, Ahnma\nWie wir gucken, wie wir labern\nJeder sagt Digger heutzutage\nWir packen Hamburg wieder auf die Karte\nDem can't get we out\nNo matter how dem gon' shout\nDa one ya name trample all doubt\nDem can't get we out\nStill around, still I move the crowd\nFrom Hamburg way down to south\nIch komm mit großem Herz, dickem Kopf und kleinem Bauch\nWortgewalttätig, aber masterpeacig drauf\nTriple A Pass - fremd im eigenem Land\nFette Anlageberater - Afrodeutsche Bank\nDenyo - ich komme rein\nHalt ne Basspredigt und die Sonne scheint\nWas Rap ist in der Sinnkrise?\nGuck, wie ich es hinbiege, mit Armen wie Tim Wiese\nIst n positiver Film den ich schieb, Typ\nVom Eppendorfer Weg bis zur Beatstreet\nHier kommt die Band mit Geschmack\nwenn jeder Jens Peter einen auf Endgegner macht\nUnd irgendwo zwischen Itzehoe und Idaho\nkommt noch einer mit Jason Derulo featuring Tyga Flow\nIs leider so - für uns n Haufen Scherben\ndoch wir lassen uns die legendäre Stimmung nicht verderben\nWas los Digger, Ahnma\nWie wir gucken, wie wir labern\nJeder sagt Digger heutzutage\nWir packen Hamburg wieder auf die Karte\nWas los Digger, Ahnma\nWie wir gucken, wie wir labern\nJeder sagt Digger heutzutage\nWir packen Hamburg wieder auf die Karte\nDem can't get we out\nNo matter how dem gon' shout\nDa one ya name trample all doubt\nDem can't get we out\nStill around, still I move the crowd\nFrom Hamburg way down to south".split("\n")],
    	["Scooter - Hyper Hyper", "Miscellaneous\nHyper Hyper\nIs everybody on the floor?\nWe put some energy into this place!\nI want to ask you something...\nAre you ready for the sound of Scooter?\nI want to see you sweat\nI said... I want to see you sweat!\nYeaah.\nHyper, hyper!\nHyper, hyper!\nHyper, hyper!\nExcuse me! Where is the bass drum?\nWe need the bass drum!\nCome on!\nHyper, hyper!\nHyper, hyper!\nIt's so beautiful to see your hands in the air!\nPut your hands in the air!\nCome on!\nThis is Scooter!\nWe want to sing a big shout to US, and to all ravers in the world!\nAnd to Westbam, Marusha, Steve Mason, The Mystic Man, DJ Dick, Carl Cox, The Hooligan, Cosmic...\nKid Paul, Dag, Mike VanDike, Jens Lissat, Lenny D., Sven Vath, Mark Spoon, Marco Zaffarano...\nHell, Paul Elstac, Mate Galic, Roland Casper, Sylvie, Miss Djax, Jens Mahlstedt, Tanith, Laurent Garnier...\nSpecial, Pascal F.E.O.S., Gary D., Scotty, Gizmo... and to all DJs all over the World!\nKeep the Vibes... Hyper, hyper!\nHyper, hyper!\nHyper, hyper!\nI'll have to ask you again...\nDo you like it hardcore?\nDo you like it hardcore?\nWe need the hardcore!\nCome on! Come on! Come on!\nHyper, hyper!\nSit there.\nBe good.\nBye, Bye!".split("\n")],
    	["Justin Bieber - Baby", "Ohh wooaah Ohh wooaah Ohh wooaah\nYou know you love me, I know you care\nJust shout whenever, And I'll be there\nYou are my love, You are my heart\nAnd we will never ever-ever be apart\nAre we an item. Girl quit playing\n\"We're just friends\"\nWhat are you sayin?\nsaid theres another and look right in my eyes\nMy first love broke my heart for the first time,\nAnd I was like\nBaby, baby, baby ooh\nLike baby, baby, baby noo\nLike baby, baby, baby ooh\nThought you'd always be mine, mine\nBaby, baby, baby oohh\nLike baby, baby, baby noo\nLike baby, baby, baby ohh\nThought you'd always be mine, mine\nFor you, i would have done what ever\nAnd I just cant believe we ain't together\nAnd I wanna play it cool, But I'm losing you\nI'll buy you anything, ill buy you any ring\nAnd I'm in pieces, Baby fix me\nand just shake me til' you wake me from this bad dream\nI'm going down, down, down, down\nAnd I just can't believe, my first love won't be around\nAnd I'm like,\nBaby, baby, baby oooh\nLike baby, baby, baby noo\nLike baby, baby, baby ooh\nThought you'd always be mine, mine\nBaby, baby, baby oooh\nLike baby, baby, baby noo\nLike baby, baby, baby ooh\nThought you'd always be mine, mine\nLuda, When I was thirteen, I had my first love\nThere was nobody that compaired to my baby\nAnd nobody came between us\nor could ever come above\nShe had me going crazy\nOh I was starstruck\nShe woke me up daily\nDon't need no Starbucks\nShe make my heart pound\nand skip a beat when I see her in the street\nand, At school, on the playground\nBut I really wanna see her on the weekend\nShe know she got me dazing\nCuz she was so amazing\nAnd now, my heart is breakin'\nBut I just keep on sayin'\nBaby, baby, baby ohh\nLike baby, baby, baby noo\nLike baby, baby, baby ohh\nThought you'd always be mine, mine\nBaby, baby, baby ooh\nLike baby, baby, baby noo\nLike baby, baby, baby oooh\nThought you'd always be mine, mine\n(Now I'm all gone)\nYeah, Yeah, Yeah\nYeah Yeah Yeah\n(Now I'm all gone)\nYeah, Yeah, Yeah\nYeah, Yeah, Yeah\n(Now I'm all gone)\nYeah, Yeah, Yeah\nYeah, Yeah, Yeah\nNow I'm all gone, gone, gone, ooh\nI'm gone".split("\n")],
    	["Robin Schulz - Sugar", "She got cherry lips\nAngel eyes\nShe knows exactly how to tantalize\nShe's out to get you, danger by design\nCold blooded vixen, she don't compromise\nShe's optimistic of the coded lights\nSo far from typical, but take my advice\nBefore you play with fire, do things twice\nAnd if you get burned, don't be surprised\nGot me tripping higher than the ceiling\nOoh baby it's the ultimate feeling\nYou got me lifted feeling so gifted\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nWe're talking lady\nLove how you in tight\nSugar we're just a rider, man spies\nSean Penn a little bit ethic, one's desire\nShe's out to get you, you can't burn, you can't hide\nShe's optimistic of the coded lights\nSo far from typical, but take my advice\nBefore you play with fire, do things twice\nAnd if you get burned, don't be surprised\nGot me tripping higher than the ceiling\nOoh baby it's the ultimate feeling\nYou got me lifted feeling so gifted\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nBut you won't get me tonight\nGot me tripping higher than the ceiling\nOoh baby it's the ultimate feeling\nYou got me lifted feeling so gifted\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly\nSugar how you get so fly".split("\n")],
    	["Cash Cash - Millionaire", "I feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound\nI feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound\nShe smell like money when she walk by\nAll heat, no smoke, but she on fire\nIf they suicide doors, then she gon' ride\nShe got that passport pussy cause she\ndon't fly, no love\nShe gon' make you pay to see you work it\nShe only twerk it for a Birkin\nI gotta see if shawty worth it\nHey, she must be the money\nI feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound\nI feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound\nShawty work her way, the way she go down\nShawty worth her weight, her weight in gold pounds\nCall me young money, put that milli on me\nShe gon' make you pay to see you work it\nShe only twerk it for a Birkin\nI gotta see if shawty worth it\nHey, she must be the money\nShe must be the money\nShe only looking like money\nI feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound\nI feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound\nI feel like a\nI feel like a\nI feel like a\nI feel like a millionaire\nI feel like a millionaire\nI feel like a millionaire\nWhenever she comes around\nWhenever I hear her sound".split("\n")],
    	["Scooter - Bigroom Blitz", "Chapter five\nBigroom blitz\nInternational bitch\nIt's, it's the bigroom blitz\nTurn it up\nShotta got the plan, man\nAlways like a Grand Slam\nBig shot, hole in one\nShotalot is on the run\nCrack of the whip, snap attack\nBars so tight front to back\nI reach my fate at the gates\nGod says Shotta you was great\nWhen I'm shopping\nAnd my bad filled with options\nSo don't ask what it cost\nI'm in a Maserati coupe\nGoin' so fast that I lost 'em\nAnd my bitch got so much swag\nThat these bad bitches on us\nAh, killin' y'all, pow\nBigroom blitz\nIt's, it's the bigroom blitz\nBring the noise\nI jack them hoes, direct them hoes\nTake 'em home and var them hoes\nGo live out their fantasies\nThey're popping pills, I'm rolling weed\nEven got a couple bad bitches overseas\nShotta got the slo-mo\nYou can call it pro flow\nEvery shot a straight flush\nShotalot is in a rush\nBack on the floor, lyrical madness\nOn the mic, Jack the cactus\nReach my fate at the gates\nGod says Shotta you was great\nShotta got the chicks\nIt's, it's the bigroom blitz\nHee-haa\nYeah\nNobody's hotter than Shotta\nThank you".split("\n")],
    	["257ers - Holz", "Ich und mein Holz\nIch und mein Holz\nOk der Song beginnt, und er bekommt ein Thema\nIch und mein Holz\nUnd das Thema heute, es heißt Holz\nIch und mein, ich und mein Holz\nHolz sieht sehr schön aus, Holz ist vielseitig\nIch und mein Holz\nDu kannst es verbrennen, du kannst es sägen\nIch und mein, ich und mein Holz\nJa, wenn du es verbrennst, dann spendet es Wärme\nIch und mein, ich und mein Holz\nAber wenn du es sägst, dann nicht, oh\nUnd jetzt mal alle in this wood, yo\nIch und mein Holz, ich und mein Holz (Holzi, Holzi, Holz)\nIch und mein Holz, ich und mein Holz\nIch und mein, ich und mein Holz, mein Holz\nIch und mein Holz, ich und mein Holz (Holzi, Holzi, Holz)\nIch und mein Holz, ich und mein Holz\nIch und mein, ich und mein Holz, mein Holz\nIch und mein Holz, best friends forever\nHdgdl, wir sind unzertrennlich\nUnverständlich warum heutzutage nicht jeder Besitzer eines wunderbaren Exemplarers Holz sein will\nund nicht nur weil man es sich wunderschön ins Wohnzimmer stellen kann\nNein, man kann es auch lackieren\nSo und jetzt nochmal alle in this wood, yo\nIch und mein Holz, ich und mein Holz (Holzi, Holzi, Holz)\nIch und mein Holz, ich und mein Holz\nIch und mein, ich und mein Holz, mein Holz\nIch und mein Holz, ich und mein Holz (Holzi, Holzi, Holz)\nIch und mein Holz, ich und mein Holz\nIch und mein, ich und mein Holz, mein Holz\nMit Holz kann man voll gut nen Staudamm bauen\nund wenn der Stau dann bricht ihm auch vertrauen,\ndenn das ist crazy dieses Zeug, rettet nämlich Leute,\nwie die Baywatch flitchen oder dieser David Hasselholt\nDu hast ein (Paysi Pet?) aus Gold, ich bin auf Kettensäge stolz\nDer (?) Proll, ich bin kein (?) unters Volk\n(?) am Holz vor Gebrauchsgegenstände\nEs beginnt ein neues Leben, wenn ein Baumleben endet\nMeine Bank, mein Tisch, meine Treppe, meine Besen,\nmeine Vase, dein Zuhause, mein Kopf\nMeine Gedanken, mein Herz, mein Leben,\nmeine Welt ist der schwerste und der heftigste Stock\nPut your hands in the air\nIch und mein Holz, ich und mein Holz (Holzi, Holzi, Holz)\nIch und mein Holz, ich und mein Holz\nIch und mein, ich und mein Holz, mein Holz\nIch und mein Holz, ich und mein Holz (Holzi, Holzi, Holz)\nIch und mein Holz, ich und mein Holz\nIch und mein, ich und mein Holz, mein Holz\nIch und mein Holz, ich und mein Holz\nIch und mein Holz, ich und mein Holz\nIch und mein Holz, ich und mein Holz\nIch und mein Holz, ich und mein Holz".split("\n")],
    	["Anthony B - Smoke Weed Everyday", "da da da da daaaa it's tha motha fuckin' D O double G (Snoop dogg) da da da da daaaa You know im mobbin' with the D.\nR.\nyeah yeah yeah you know who's back up in this mothafucker\nWhat what what what\nso blaze the weed out there\nBlaze it up\nBlaze that shit up nigga Yeah waz up snoop\none: Top dogg buy them all nigga burn this shit up D-P-G-C my nigga turn that shit up CPT, LBC yeah we hookin' back up N' when they bang this in the club baby you gotta get up thug niggas, drug dealers yeah they givin' it up low life, your life boy we livin' it up take a chance thats why we dancin' in the party fo' sho' slip my ho a fourty four n' she crept in it back do' bitches lookin' at me strange but you know i don't care step up in this mothafucker just to swingin' my hair Bitch quit talkin' Crip walk If you down with the set Take a Bulvar with some dick take this dope from this jet outta town put it down for father of rap n' if your ass get crack bitch shut your trap come back get back thats the part of success n' if you believe the X then you'll relievin' your stress\nmusic in between\nda da da da daaaa\nit's the mothafuckin' D-R-E\nDr.\nDre mothafucker what what what what\nda da da da daaaa\ntwo: you know im mobbing with the D O double G Straight off the fuckin' street's of CPT King of the beats n' you ride to em' in your fleet wood or Coupe De\nVille rollin on dubs How you feel?\nWhoopty whoop nigga what?\nDre n' snoop chronic'ed out In the 'llac with doc in the back Sippin' 'gnac, clip in the strap Dippin' through hoods What hoods?\nCompton, longbeach, ingelwood South central out to the westside (westside) It's california love this california bud Got a nigga gang of pub I'm on one, I might bail up in the Century Club With my jeans on n' my team's strong Get my drink on n' my smoke on Then go home with somethin' to poke on (waz up bitch) Loc' it's on for the two tripple oh Comin' real it's the next episode *\nhold up.\nheeeeey For my niggas who be thinkin' we soft We don't.\nplaaaay We gonna rockin' til the weels fall of Hold up.\nheeeeey For my niggas who be acting to bold Take a.\nseeeeat Hope you ready for the next episode heeeeeey".split("\n")],
    	["Critical Hit - Pokemon Main Theme", "I wanna be the very best,\nLike no one ever was.\nTo catch them all is my real test,\nTo train them is my cause.\nI will travel across the land,\nSearching far and wide.\nTeach Pokemon to understand\nThe power that's inside\nPokemon, gotta catch them all its you and me\nI know its my destiny\nPokemon, oh, you're my best friend\nIn a world we must defend\nPokemon, gotta catch them all a heart so true\nOur courage will pull us through\nYou teach me and I'll teach you\nPo-ke-mon Gotta catch 'em all\nEvery challenge along the way\nWith courage I will face\nI will battle every day\nTo claim my rightful place\nCome with me, the time is right\nThere's no better team\nArm in arm we'll win the fight\nIt's always been our dream\nPokemon!\nGotta catch 'em all\nIt's you and me\nI know it's my destiny\nPokemon!\nOh, you're my best friend,\nIn a world we must defend.\nPokemon!\nA heart so true.\nOur courage will pull us through.\nYou teach me and I'll teach you.\nPokemon!\nGotta catch 'em all\nGotta catch 'em all\nGotta catch 'em all\nGotta catch 'em all\nGotta catch 'em all\nYeah!\nPokemon!\nIt's you and me\nI know it's my destiny\nPokemon!\nOh, you're my best friend,\nIn a world we must defend.\nPokemon!\nA heart so true.\nOur courage will pull us through.\nYou teach me and I'll teach you.\nPOKEMON!\nGotta catch 'em all\nGotta catch 'em all\nPokemon!".split("\n")],
    	["Sia - Cheap Thrills", "Come on, come on, turn the radio on\nIt's Friday night and I won't be long\nGotta do my hair, I put my make up on\nIt's Friday night and I won't be long\nTil I hit the dance floor\nHit the dance floor\nI got all I need\nNo I ain't got cash\nNo I ain't got cash\nBut I got you baby\nBaby I don't need dollar bills to have fun tonight\nI love cheap thrills\nBaby I don't need dollar bills to have fun tonight\nI love cheap thrills\nBut I don't need no money\nAs long as I can feel the beat\nI don't need no money\nAs long as I keep dancing\nCome on, come on, turn the radio on\nIt's Saturday and I won't be long\nGotta paint my nails, put my high heels on\nIt's Saturday and I won't be long\nTil I hit the dance floor\nHit the dance floor\nI got all I need\nNo I ain't got cash\nNo I ain't got cash\nBut I got you baby\nBaby I don't need dollar bills to have fun tonight\nI love cheap thrills\nBaby I don't need dollar bills to have fun tonight\nI love cheap thrills\nBut I don't need no money\nAs long as I can feel the beat\nI don't need no money\nAs long as I keep dancing\nI love cheap thrills\nI love cheap thrills\nI don't need no money\nAs long as I can feel the beat\nI don't need no money\nAs long as I keep dancing\nOh, oh\nBaby I don't need dollar bills to have fun tonight\nI love cheap thrills\nBaby I don't need dollar bills to have fun tonight\nI love cheap thrills\nI don't need no money\nAs long as I can feel the beat\nI don't need no money\nAs long as I keep dancing\nLa, la, la, la, la, la\nI love cheap thrills\nLa, la, la, la, la, la\nI love cheap thrills\nLa, la, la, la, la, la\nI love cheap thrills\nLa, la, la, la, la\nI love cheap thrills".split("\n")],
    	["PSY - Gangnam Style", "Oppan Gangnam style\nGangnam style\nNajeneun ttasaroun inganjeokin yeoja\nKeopi hanjaneu yeoyureul aneun pumgyeok inneun yeoja\nBami omyeon simjangi tteugeowojineun yeoja\nGeureon banjeon inneun yeoja\nNaneun sanai\nNajeneun neomankeum ttasaroun geureon sanai\nKeopi sikgido jeone wonsyat ttaerineun sanai\nBami omyeon simjangi teojyeobeorineun sanai\nGeureon sanai\nAreumdawo sarangseureowo\nGeurae neo, hey, geurae baro neo, hey\nAreumdawo sarangseureowo\nGeurae neo, hey, geurae baro neo, hey\nJigeumbuteo gal ddekkaji gabolkka\nOppan Gangnam style\nGangnam style\nOp, op, op, op\nOppan Gangnam style\nGangnam style\nOp, op, op, op\nOppan Gangnam style\nEeeeeh, sexy lady\nOp, op, op, op\nOppan Gangnam style\nEeeeeh, sexy lady\nOp, op, op, op\nEh-eh, eh-eh-eh-eh\nJeongsukhae boijiman nol ttaen noneun yeoja\nIttaeda sipeumyeon mukkeotdeon meori puneun yeoja\nGaryeotjiman wenmanhan nochulboda yahan yeoja\nGeureon gamgakjeogin yeoja\nNaneun sanai\nJeomjanha boijiman nol ttaen noneun sanai\nTtaega doemyeon wanjeon michyeobeorineun sanai\nGeunyukboda sasangi ultungbultunghan sanai\nGeureon sanai\nAreumdawo sarangseureowo\nGeurae neo, hey, geurae baro neo, hey\nAreumdawo sarangseureowo\nGeurae neo, hey, geurae baro neo, hey\nJigeumbuteo gal ddekkaji gabolkka\nOppan Gangnam style\nGangnam style\nOp, op, op, op\nOppan Gangnam style\nGangnam style\nOp, op, op, op\nOppan Gangnam style\nEeeeeh, sexy lady\nOp, op, op, op\nOppan Gangnam style\nEeeeeh, sexy lady\nOp, op, op, op\nEh-eh, eh-eh-eh-eh\nTtwineun nom geu wiae naneun nom\nBaby, baby, naneun mwol jom aneun nom\nTtwineun nom geu wiae naneun nom\nBaby, baby, naneun mwol jom aneun nom\nYou know what I'm saying\nOppan Gangnam style\nEh-eh, eh-eh-eh-eh\nEeeeeh, sexy lady\nOp, op, op, op\nOppan Gangnam style\nEeeeeh, sexy lady\nOp, op, op, op\nEh-eh, eh-eh-eh-eh\nOppan Gangnam style".split("\n")]
    ], */
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var delayText = new android.widget.TextView(ctx);
        delayText.setText("Delay: " + (this.delay / 1000) + " Seconds");
        delayText.setTextColor(android.graphics.Color.BLACK);
        delayText.setTextSize(dip2px(9));
        delayText.setGravity(android.view.Gravity.CENTER);
        delayText.setTypeface(Utils.font);
        var delaySlider = Utils.ModSettings.getSlider();
        delaySlider.setMax(50);
        //5 seconds
        delaySlider.setProgress(this.delay / 100);
        delaySlider.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
            onProgressChanged: function(seekBar, progress, fromUser) {
                switch (Utils.bypassMode) {
                    case BypassMode.LBSG:
                        if (progress < 40) {
                            progress = 40;
                            //SummitPE.ctoast("Spammer delay below 4 seconds is not allowed in LBSG Bypass-Mode!");
                            seekBar.setProgress(40);
                        }
                        break;
                    default:
                        if (progress < 1)
                            seekBar.setProgress(1);
                }
                delayText.setText("Delay: " + (progress / 10) + " Seconds" + (Utils.bypassMode == BypassMode.LBSG ? " (LBSG Bypass)" : ""));

            },
            onStopTrackingTouch: function(seekbar) {
                singsong.delay = seekbar.getProgress() * 100;
            }
        }));
        var songNames = [];
        singsong.songList.forEach(function(entry, index) {
            songNames.push(singsong.songList[index][0]);
        });
        var spinner = new android.widget.Spinner(ctx);
        var arrAdapter = new android.widget.ArrayAdapter(ctx, android.R.layout.simple_spinner_item, songNames);
        arrAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrAdapter);
        spinner.setSelection(singsong.selectedSong[0]);
        spinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
            onItemSelected: function(parent, v, pos, id) {
                if (singsong.selectedSong[0] == pos)
                    return;
                if (singsong.selectedSong[1] > -1)
                    SummitPE.cmsg("Started playing");
                singsong.selectedSong[0] = pos;
                singsong.selectedSong[1] = -1;
                sing.setText((singsong.selectedSong[1] == -1 ? "Start" : "Stop") + " playing");
                sing.setBackground(singsong.selectedSong[1] == -1 ? disabledGradient : enabledGradient);
            },
            onNothingSelected: function(parent) {
                spinner.setSelection(singsong.selectedSong[0]);
            }
        }));
        var sing = new android.widget.Button(ctx);
        sing.setTypeface(Utils.font);
        sing.setText((singsong.selectedSong[1] == -1 ? "Start" : "Stop") + " playing");
        sing.setBackground(singsong.selectedSong[1] == -1 ? disabledGradient : enabledGradient);
        sing.setTextColor(android.graphics.Color.BLACK);
        sing.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                if (singsong.selectedSong[1] > -1)
                    singsong.selectedSong[1] = -1;
                else
                    singsong.selectedSong[1] = 0;
                singsong.lastTime = java.lang.System.currentTimeMillis() - 10000;
                sing.setText((singsong.selectedSong[1] == -1 ? "Start" : "Stop") + " playing");
                SummitPE.cmsg((singsong.selectedSong[1] == -1 ? "Stopped" : "Started") + " playing.");
                sing.setBackground(singsong.selectedSong[1] == -1 ? disabledGradient : enabledGradient);
            }
        }));

        settings.addView(delaySlider, params);
        settings.addView(delayText, params);
        settings.addView(spinner, params);
        settings.addView(sing, params);
        return settings;
    },
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        /*if(!this.state)
        	return*/
        if (java.lang.System.currentTimeMillis() - this.lastTime > this.delay && this.selectedSong[1] > -1) {
            var msg = this.songList[this.selectedSong[0]][1][this.selectedSong[1]];
            this.selectedSong[1]++;
            if (this.selectedSong[1] >= this.songList[this.selectedSong[0]][1].length) {
                this.selectedSong[1] = -1;
                SummitPE.cmsg("Stopped singing");
            }

            Server.sendChat(msg);
            this.lastTime = java.lang.System.currentTimeMillis();
        }

    },
    onClick: function(btn) {
        /*this.state = !this.state;
        if(singsong.selectedSong[1] > -1 && !this.state){
        	singsong.selectedSong[1] = -1;
        	SummitPE.cmsg ("Stopped singing");
        }
        */

        mDismiss();
        SummitPE.showModDialog(this);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(singsong);

var safewalk = {
    name: "SafeWalk",
    desc: "You wont fall down at the edge of a block",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onModTick: function() {
        Entity.setSneaking(getPlayerEnt(), true);
    },
    onClick: function(btn) {
        this.state = !this.state;

        if (!this.state && SummitPE.inGame)
            Entity.setSneaking(getPlayerEnt(), false);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(safewalk);

var leetspeak = {
    name: "LeetSpeak",
    desc: "Turns sent messages into L33T M3ss4g3s",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    state: false,
    onChatHook: function(text) {
        preventDefault();

        try {
            com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                .updateTextboxText("");
            com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                .nativeSetTextboxText("");

        } catch (e) {
            //Not-BlockLauncher-Error
        }
        var end = text.toUpperCase();
        var normal = new Array("FOR", "TOO", "TO", "ONE", "A", "C", "D", "F", "H", "I", "K", "L", "M", "N", "O", "S", "V", "W");
        var leet = new Array("4", "2", "2", "1", "α", "(", "[)", "ƒ", "|-|", "¡", "|", "|_", "|\\/|", "|\\|", "0", "$", "\\/", "\\/\\/");
        for (i = 0; i < normal.length; i++) {
            end = end.replace(new RegExp(normal[i], 'g'), leet[i]);
        }
        Server.sendChat(end);
    },
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(leetspeak);

var illuminati = {
    name: "Illuminati",
    desc: "Displays a message from the illuminati in the chat!",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    delay: 200,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        var t = new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                Server.sendChat("      /\\");
                java.lang.Thread.sleep(illuminati.delay);
                Server.sendChat("     /  \\");
                java.lang.Thread.sleep(illuminati.delay);
                Server.sendChat("    /    \\");
                java.lang.Thread.sleep(illuminati.delay);
                Server.sendChat("   /   @  \\");
                java.lang.Thread.sleep(illuminati.delay);
                Server.sendChat("  /_______\\");
            }
        }));
        t.start();
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(illuminati);

var serverInfoTg = {
    name: "Server info",
    desc: "Server information",
    type: ModuleType.mod,
    category: ModCategory.MISC,
    requireGame: true,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        clientMessage('§fServer IP: §e' + Server.getAddress() + '§f, Port:§e ' + Server.getPort());
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(serverInfoTg);

var hitboxes = {
    name: "HitBoxes",
    desc: "Increases the size of near Targets defined in the Target Module [Works in 0.11 - 0.16, 1.2 - 1.12]",
    type: ModuleType.mod,
    category: ModCategory.COMBAT,
    state: false,
    isTickState: true,
    tick: 0,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        this.tick++;
        if (this.tick >= 25) {
            this.tick = 0;
            var ent = Utils.Entity.getNearestEntity(12, true);
            if (this.state) {
                if (ent != null) Entity.setCollisionSize(ent, 10, 10);
            } else {
                if (ent != null) Entity.setCollisionSize(ent, 1, 2);
            }
        }
    },
    onClick: function(btn) {
        this.state = !this.state;
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(hitboxes);

var pvpgroup = {
    name: "PVP-Group",
    desc: "Activates all modules which help in Combat",
    type: ModuleType.mod,
    category: ModCategory.GROUP,
    state: false,
    modules: [
        aimaura,
        bowaimbot,
        velocity,
        autosword,
        hitboxes,

        speed,
        jesus,
        //step,

        lifedisplay
    ],
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            this.modules.forEach(function(entry) {
                if (entry.isStateMode() && !entry.state) entry.onClick(null);
            });
            Level.setGameMode(1);
        } else {
            this.modules.forEach(function(entry) {
                if (entry.isStateMode() && entry.state) entry.onClick(null);
            });
        }
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(pvpgroup);

var noclip = {
    name: "NoClip",
    desc: "Walk through walls as if there are no walls!",
    type: ModuleType.mod,
    category: ModCategory.MOVEMENT,
    state: false,
    requireGame: true,
    tick: 0,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onTick: function() {
        this.tick++;
        if (this.tick < 20) return;
        this.tick = 0;
        if (SummitPE.inGame) Entity.setCollisionSize(getPlayerEnt(), 0, 0);
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state)
            Entity.setCollisionSize(getPlayerEnt(), 0, 0);
        else
            Entity.setCollisionSize(getPlayerEnt(), 0.6, 0.6);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(noclip);

//exploits
var breakUnbrekableBlocks = {
    name: "Break unbrekable blocks",
    desc: "Bedrock ezz, world border ezz, and etc ezz",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    state: false,
    requireGame: true,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            Block.setDestroyTime(7, 0.01), //bedrock
                Block.setDestroyTime(137, 0.01),
                Block.setDestroyTime(188, 0.01),
                Block.setDestroyTime(189, 0.01),
                Block.setDestroyTime(209, 0.01),
                Block.setDestroyTime(90, 0.01),
                Block.setDestroyTime(119, 0.01),
                Block.setDestroyTime(120, 0.01),
                Block.setDestroyTime(-161, 0.01);
        } else {
            Block.setDestroyTime(7, -10),
                Block.setDestroyTime(137, -10),
                Block.setDestroyTime(188, -10),
                Block.setDestroyTime(189, -10),
                Block.setDestroyTime(209, -10),
                Block.setDestroyTime(90, -10),
                Block.setDestroyTime(119, -10),
                Block.setDestroyTime(120, -10),
                Block.setDestroyTime(-161, -10);
        }
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(breakUnbrekableBlocks);

var stackableItems = {
    name: "StackableItems",
    desc: "Unstackable items can now be stacked, such as armor and swords, even totems and etc",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    state: false,
    done: false,
    requireGame: true,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state && !this.done) {
            try {
                for (var i = 255; i < 406; i++) {
                    if (i != 210 & i != 211 & i != 212 & i != 217 & i != 230 & i != 241 & i != 242 & i != 248 & i != 249 & i != 250 & i != 326 & i != 327 & i != 343) {
                        Item.setProperties(i, {
                            'stack_by_data': true,
                        });
                        Item.setAllowOffhand(i, true);
                        Item.setHandEquipped(i, true);
                    }
                }

                Item.setProperties(444, {
                    'stack_by_data': true,
                });
                Item.setAllowOffhand(444, true);
                Item.setHandEquipped(444, true);

                Item.setProperties(450, {
                    'stack_by_data': true,
                });
                Item.setAllowOffhand(450, true);
                Item.setHandEquipped(450, true);

                Item.setProperties(441, {
                    'stack_by_data': true,
                });
                Item.setAllowOffhand(441, true);
                Item.setHandEquipped(441, true);

                Item.setProperties(438, {
                    'stack_by_data': true,
                });
                Item.setAllowOffhand(438, true);
                Item.setHandEquipped(438, true);

                this.done = true;
            } catch (e) {
                SummitPE.ctoast("StackableItems Error(" + e.lineNumber + "): " + e);
            }
        } else if (!this.state) {
            //
        }
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(stackableItems);

var elytraGive = {
    name: "ElytraGive",
    desc: "Give elytra in armor slot",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    requireGame: true,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        Player.setArmorSlot(1, 444, 0);
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(elytraGive);

var giveItem = {
    name: "Give item",
    desc: "Give item!",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    requireGame: true,
    isNewDialog: true,
    tmiNewUi: true,
    showDialog: function() {
        if (this.tmiNewUi) {
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    try {
                        var display = new android.util.DisplayMetrics();
                        com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getWindowManager().getDefaultDisplay().getMetrics(display);
                        var dialogLayout = new android.widget.RelativeLayout(ctx);
                        dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                        //default content
                        var title = new android.widget.TextView(ctx);
                        title.setText(android.text.Html.fromHtml("<u>Too many Items!</u>"));
                        title.setTextSize(dip2px(20));
                        title.setGravity(android.view.Gravity.CENTER);
                        title.setTextColor(android.graphics.Color.BLACK);
                        title.setTypeface(Utils.font);
                        title.setId(94771);

                        var bg = new android.graphics.drawable.GradientDrawable();
                        bg.setColor(android.graphics.Color.BLACK);
                        bg.setStroke(dip2px(1), getColorAHEXFromARGB(255, 0, 0, 0));
                        bg.setCornerRadius(0);
                        bg.setAlpha(180);
                        var xbg2 = new android.graphics.drawable.GradientDrawable();
                        xbg2.setStroke(dip2px(1), getColorAHEXFromARGB(255, 0, 0, 0));

                        var tmiLayout = new android.widget.LinearLayout(ctx);
                        var scrollTMI = new android.widget.ScrollView(ctx);
                        var scrollMenu = new android.widget.ScrollView(ctx);
                        var editId = new android.widget.EditText(ctx);
                        var editAmount = new android.widget.EditText(ctx);
                        var editDamage = new android.widget.EditText(ctx);
                        var txtId = android.widget.TextView(ctx);
                        txtId.setTextSize(12);
                        txtId.setPadding(4, 4, 8, 4);
                        txtId.setTextColor(android.graphics.Color.BLACK);
                        txtId.setText("ID:");
                        var txtAmount = android.widget.TextView(ctx);
                        txtAmount.setTextSize(12);
                        txtAmount.setPadding(4, 4, 8, 4);
                        txtAmount.setTextColor(android.graphics.Color.BLACK);
                        txtAmount.setText("Amount:");
                        var txtDamage = android.widget.TextView(ctx);
                        txtDamage.setTextSize(12);
                        txtDamage.setPadding(4, 4, 8, 4);
                        txtDamage.setTextColor(android.graphics.Color.BLACK);
                        txtDamage.setText("Damage/Meta:");
                        var addBtn = new android.widget.Button(ctx);
                        addBtn.setText("Add");
                        addBtn.setTextSize(dip2px(12));
                        addBtn.setTypeface(Utils.font);
                        addBtn.setTextColor(android.graphics.Color.GREEN);
                        addBtn.setOnClickListener(new android.view.View.OnClickListener() {
                            onClick: function(viewarg) {
                                if (false) {
                                    ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                                }

                                var tmiId, tmiAmount, tmiDamage = 0;

                                if (editId.getText().toString().includes(':')) {
                                    tmiId = editId.getText().toString().split(':')[0];
                                    tmiDamage = editId.getText().toString().split(':')[1];
                                } else {
                                    tmiId = parseInt(editId.getText());
                                    tmiDamage = parseInt(editDamage.getText());
                                }

                                tmiAmount = parseInt(editAmount.getText());

                                if (SummitPE.inGame) {
                                    if (tmiAmount <= 64) {
                                        Player.addItemInventory(tmiId, tmiAmount, tmiDamage);
                                    } else if (tmiAmount > 64) {
                                        Player.addItemInventory(tmiId, 64, tmiDamage);
                                    }

                                    print("Item added!");
                                } else {
                                    dialog.dismiss();
                                    SummitPE.ctoast("Please join the game!");
                                }
                            }
                        });

                        var deviceWarn = new android.widget.TextView(ctx);
                        deviceWarn.setGravity(android.view.Gravity.CENTER);
                        deviceWarn.setBackground(xbg2);
                        deviceWarn.setTextSize(dip2px(12));
                        deviceWarn.setText("Tip: If this interface is too\nlaggy on your device,\nenable 'Old TMI GUI' in the\nSettings menu");
                        deviceWarn.setTextColor(android.graphics.Color.WHITE);
                        editId.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
                        editAmount.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
                        editDamage.setInputType(android.text.InputType.TYPE_NUMBER_FLAG_SIGNED);
                        editId.setText("0");
                        editAmount.setText("64");
                        editDamage.setText("0");
                        editId.setHint("ID");
                        editAmount.setHint("Amount");
                        editDamage.setHint("Damage/Meta");
                        editId.setHintTextColor(android.graphics.Color.parseColor("#b7b7b7"));
                        editAmount.setHintTextColor(android.graphics.Color.parseColor("#b7b7b7"));
                        editDamage.setHintTextColor(android.graphics.Color.parseColor("#b7b7b7"));
                        tmiLayout.setGravity(android.view.Gravity.CENTER);
                        tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
                        editId.setTextSize(14);
                        editId.setTypeface(Utils.font);
                        editId.setBackground(xbg2);
                        editId.setPadding(4, 4, 8, 4);
                        editId.setTextColor(android.graphics.Color.BLACK);
                        editAmount.setTextSize(14);
                        editAmount.setTypeface(Utils.font);
                        editAmount.setBackground(xbg2);
                        editAmount.setPadding(4, 4, 8, 4);
                        editAmount.setTextColor(android.graphics.Color.BLACK);
                        editDamage.setTextSize(14);
                        editDamage.setTypeface(Utils.font);
                        editDamage.setBackground(xbg2);
                        editDamage.setPadding(4, 4, 8, 4);
                        editDamage.setTextColor(android.graphics.Color.BLACK);

                        tmiLayout.addView(txtId);
                        tmiLayout.addView(editId);
                        tmiLayout.addView(txtDamage);
                        tmiLayout.addView(editDamage);
                        tmiLayout.addView(txtAmount);
                        tmiLayout.addView(editAmount);

                        tmiLayout.addView(addBtn);
                        /**/
                        var webView = new android.webkit.WebView(ctx);
                        webView.getSettings().setJavaScriptEnabled(true);
                        webView.getSettings().setUserAgentString("Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/20100101 Firefox/4.0");
                        webView.loadUrl("http://instinctmods.com/idlist.html");
                        webView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                        webView.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
                        webView.getLayoutParams().width = ctx.getWindowManager().getDefaultDisplay().getWidth() / 5;
                        webView.setFocusable(false);
                        //tmiLayout.addView(webView);
                        /**/
                        tmiLayout.addView(deviceWarn);
                        scrollTMI.addView(tmiLayout);
                        scrollMenu.addView(webView);

                        scrollTMI.setPadding(12, 4, 4, 12);
                        scrollMenu.setPadding(12, 4, 4, 12);

                        //footer
                        var closeButton = new styledBtn();
                        closeButton.setText("Close");
                        closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                        closeButton.setId(10472);
                        closeButton.setTypeface(Utils.font);
                        closeButton.setTextColor(android.graphics.Color.BLACK);
                        //layout alignement....

                        params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                        params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                        //params.addRule(android.widget.RelativeLayout.LEFT_OF, github.getId());
                        dialogLayout.addView(scrollTMI, params);
                        params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                        params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                        //params.addRule(android.widget.RelativeLayout.RIGHT_OF, github.getId());
                        dialogLayout.addView(scrollMenu, params);

                        params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                        dialogLayout.addView(title, params);
                        params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                        params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                        dialogLayout.addView(closeButton, params);
                        //Dialog Stuff
                        dialog = new android.app.Dialog(ctx);
                        dialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                        dialog.getWindow()
                            .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                        dialog.setContentView(dialogLayout);
                        dialog.setCanceledOnTouchOutside(true);
                        dialog.setTitle("Item give");
                        dialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                            onDismiss: function() {
                                showMenu();
                            }
                        }));
                        dialog.show();
                        var window = dialog.getWindow();
                        window.setLayout(mwidth, display.heightPixels);
                        closeButton.setOnClickListener(new android.view.View.OnClickListener({
                            onClick: function(view) {
                                dialog.dismiss();
                            }
                        }));
                    } catch (error) {
                        SummitPE.ctoast("Error(#" + error.lineNumber + "): " + error);
                        showMenuBtn();
                    }
                }
            }));
        } else {
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function(viewarg) {
                    try {
                        var display = new android.util.DisplayMetrics();
                        com.mojang.minecraftpe.MainActivity.currentMainActivity.get().getWindowManager().getDefaultDisplay().getMetrics(display);
                        var dialogLayout = new android.widget.LinearLayout(ctx);
                        dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                        dialogLayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);

                        var tmiLayout = new android.widget.LinearLayout(ctx);
                        tmiLayout.setGravity(android.view.Gravity.CENTER);
                        tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);

                        var etId = new android.widget.EditText(ctx);
                        var etAmount = new android.widget.EditText(ctx);
                        var etDamage = new android.widget.EditText(ctx);

                        var txtId = android.widget.TextView(ctx);
                        txtId.setTextSize(12);
                        txtId.setText("ID: ");

                        var txtAmount = android.widget.TextView(ctx);
                        txtAmount.setTextSize(12);
                        txtAmount.setText("Amount: ");

                        var txtDamage = android.widget.TextView(ctx);
                        txtDamage.setTextSize(12);
                        txtDamage.setText("Damage/Meta: ");

                        var numbert = android.text.InputType.TYPE_NUMBER_FLAG_SIGNED;
                        etId.setInputType(numbert);
                        etAmount.setInputType(numbert);
                        etDamage.setInputType(numbert);

                        etId.setText("0");
                        etAmount.setText("0");
                        etDamage.setText("0");

                        etId.setHint("ID");
                        etAmount.setHint("Amount");
                        etDamage.setHint("Damage/Meta");



                        var infoBox = new android.widget.TextView(ctx);
                        var itemsList = new android.widget.ScrollView(ctx);
                        
                        //var url = "https://raw.githubusercontent.com/7thShark/MCPE/master/JSONInstinct";
                        //var content = ModPE.getFromUrl(url);
                        var tmiList = "";

                        Utils.Url.getUrlContents("https://raw.githubusercontent.com/7thShark/MCPE/master/JSONInstinct", function(content, err) {
                            if (err == null && content != "") {
                                var jsonGit = JSON.parse(String(content)); //ModPE.JSON.parse(content);
                                tmiList = jsonGit.itemlist;
                            } else {
                                tmiList = "No connection";
                                SummitPE.ctoast("GiveItemDownloadInfoError(#" + err.lineNumber + "): " + err);
                            }
                        });

                        /* if (typeof(content) != "undefined" || content != 0 || content != null || content != "") {
                            var jsonGit = ModPE.JSON.parse(content);
                            tmiList = jsonGit.itemlist;
                        } else tmiList = "No connection"; */

                        infoBox.setText(tmiList);



                        var addBtn = new android.widget.Button(ctx);
                        addBtn.setText("Add");

                        var cancelBtn = android.widget.Button(ctx);
                        cancelBtn.setText("Cancel");

                        addBtn.setOnClickListener(new android.view.View.OnClickListener() {
                            onClick: function(viewarg) {
                                //ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                                tmiId = parseInt(etId.getText());
                                tmiAmount = parseInt(etAmount.getText());
                                tmiDamage = parseInt(etDamage.getText());

                                if (SummitPE.inGame) {
                                    if (tmiAmount <= 64) {
                                        Player.addItemInventory(tmiId, tmiAmount, tmiDamage);
                                    } else if (tmiAmount > 64) {
                                        Player.addItemInventory(tmiId, 64, tmiDamage);
                                    }

                                    print("Item added!");
                                } else {
                                    dialog.dismiss();
                                    SummitPE.ctoast("Please join the game!");
                                }
                            }
                        });

                        cancelBtn.setOnClickListener(new android.view.View.OnClickListener() {
                            onClick: function(viewarg) {
                                //ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                                dialog.dismiss();
                            }
                        });

                        tmiLayout.addView(txtId);
                        tmiLayout.addView(etId);
                        tmiLayout.addView(txtDamage);
                        tmiLayout.addView(etDamage);
                        tmiLayout.addView(txtAmount);
                        tmiLayout.addView(etAmount);
                        tmiLayout.addView(addBtn);
                        tmiLayout.addView(cancelBtn);

                        itemsList.addView(infoBox);

                        dialogLayout.addView(tmiLayout);
                        dialogLayout.addView(itemsList);

                        //Dialog Stuff
                        dialog = new android.app.Dialog(ctx);
                        dialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                        dialog.getWindow().setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                        dialog.setContentView(dialogLayout);
                        dialog.setCanceledOnTouchOutside(true);
                        dialog.setTitle("Item give old");
                        dialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                            onDismiss: function() {
                                showMenu();
                            }
                        }));
                        dialog.show();
                        var window = dialog.getWindow();
                        window.setLayout(mwidth, display.heightPixels);
                    } catch (error) {
                        SummitPE.ctoast("Error(#" + error.lineNumber + "): " + error);
                    }
                }
            }));
        }
    },
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        mDismiss();
        this.showDialog();
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("Give item");
    }
};
SummitPE.registerModule(giveItem);

var dupeItem = {
    name: "Dupe item",
    desc: "Dupe your item!",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    requireGame: true,
    mode: false,
    getSettingsLayout: function(params) {
        var settings = new android.widget.LinearLayout(ctx);
        settings.setOrientation(1);
        var modeSwitch = new android.widget.Switch(ctx);
        modeSwitch.setText("Server mode dupe");
        modeSwitch.setTypeface(Utils.font);
        modeSwitch.setTextColor(android.graphics.Color.BLACK);
        modeSwitch.setPadding(10, 3, 3, 3);
        modeSwitch.setTextSize(15);
        modeSwitch.setChecked(dupeItem.mode);
        modeSwitch.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
            onCheckedChanged: function() {
                dupeItem.mode = !dupeItem.mode;
                modeSwitch.setChecked(dupeItem.mode)
            }
        }));
        //not used
        /* var mode = new android.widget.CheckBox(ctx);
        mode.setText("Mode dupe");
        mode.setTypeface(Utils.font);
        mode.setTextColor(android.graphics.Color.BLACK);
        mode.setChecked(Utils.Entity.targettedMobs[1]);
        mode.setOnClickListener(new android.view.View.OnClickListener({
        	onClick: function (v) {
        		dupeItem.mode = v.isChecked();
        	}
        })); */
        settings.addView(modeSwitch, params);
        return settings;
    },
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    getDupe: function() {
        if (SummitPE.inGame && (Server.getAddress() != null && dupeItem.mode)) {
            if (Player.getCarriedItem() != null) { //Player.getItemCustomName()
                Player.setItemCustomName(Player.getSelectedSlotId(), "[" + Math.random() * 100000000000000000 + "]");
                SummitPE.ctoast("Move item to the inventory crafting section");
            } else {
                SummitPE.ctoast("Carried item is null");
            }
        } else if (SummitPE.inGame) {
            if (Player.getCarriedItem() != null) {
                Player.addItemInventory(Player.getCarriedItem(), Player.getCarriedItemCount(), Player.getCarriedItemData());
            } else {
                SummitPE.ctoast("Carried item is null");
            }
        } else {
            SummitPE.ctoast("Please join the game!");
        }
    },
    onClick: function(btn) {
        this.getDupe();
        /* mDismiss(); */
    },
    onRefresh: function(btn) {
        if (btn != null)
            btn.setText("Dupe item");
    }
};
SummitPE.registerModule(dupeItem);

function renamePopup() {
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function(viewarg) {
            try {
                var cancelBtn = new android.widget.Button(ctx);
                cancelBtn.setText("Cancel");

                var tmiLayout = new android.widget.LinearLayout(ctx);
                var etName = new android.widget.EditText(ctx);
                var txtName = new android.widget.TextView(ctx);

                txtName.setTextSize(12);
                txtName.setText("Name:");

                var addBtn = new android.widget.Button(ctx);
                addBtn.setText("Rename");
                etName.setText("");
                etName.setHint("Name");

                dialog = new android.app.Dialog(ctx);
                dialog.setContentView(tmiLayout);
                dialog.setTitle("Anvil");
                
                tmiLayout.setGravity(android.view.Gravity.CENTER);
                tmiLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
                tmiLayout.addView(txtName);
                tmiLayout.addView(etName);
                tmiLayout.addView(addBtn);
                tmiLayout.addView(cancelBtn);
                dialog.show();

                addBtn.setOnClickListener(new android.view.View.OnClickListener() {
                    onClick: function(viewarg) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                        Player.setItemCustomName(Player.getSelectedSlotId(), etName.getText());
                        dialog.dismiss();
                    }
                });

                cancelBtn.setOnClickListener(new android.view.View.OnClickListener() {
                    onClick: function(viewarg) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(20);
                        dialog.dismiss();
                    }
                });
            } catch (e) {
                SummitPE.ctoast("Error(" + e.lineNumber + "): " + e);
            }
        }
    }));
}

var renameItem = {
    name: "Rename item",
    desc: "Rename everything item",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    requireGame: true,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        mDismiss();
        renamePopup();
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(renameItem);

var GUIe;
var autoEnchantInET = false;

function openEnchantSelect() {
    /* function closeEnchant() {
        GUIe.dismiss();
    }; */
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                //var bg = new android.graphics.drawable.GradientDrawable();
                //bg.setColor(themeBackground);
                //bg.setAlpha(themeAlpha);
                var bg = SummitPE.getStyledBackground();

                var xbg2 = new android.graphics.drawable.GradientDrawable();
                //xbg2.setStroke(1, themeStroke);
                //xbg2.setShape(android.graphics.drawable.GradientDrawable.LINE);
                //xbg2.setColor(android.graphics.Color.TRANSPARENT);
                xbg2.setStroke(dip2px(1), getColorAHEXFromARGB(50, 0, 0, 0));

                var lvl = "32767";
                var menuLayout = new android.widget.LinearLayout(ctx);
                var menuScroll = new android.widget.ScrollView(ctx);
                var menuLayout1 = new android.widget.LinearLayout(ctx);

                menuLayout.setOrientation(1);
                menuLayout1.setOrientation(1);
                menuScroll.addView(menuLayout);
                menuLayout1.addView(menuScroll);
                menuLayout.setBackground(bg);

                var enchantment = "something";
                var elvl = "32767";
                var useLegal = false;
                var useCustom = false;



                function enchantItem(enchantment) {
                    elvl = parseInt(elvlet.getText());
                    if (Player.getSelectedSlotId() != null) {
                        if (enchantment == "everything") {
                            procCmd("vm " + Player.getSelectedSlotId())
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.PROTECTION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_PROTECTION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FEATHER_FALLING, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.BLAST_PROTECTION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.PROJECTILE_PROTECTION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.THORNS, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.RESPIRATION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.AQUA_AFFINITY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.DEPTH_STRIDER, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.SHARPNESS, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.SMITE, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.BANE_OF_ARTHROPODS, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.KNOCKBACK, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_ASPECT, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.LOOTING, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.EFFICIENCY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.SILK_TOUCH, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FORTUNE, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.POWER, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.PUNCH, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FLAME, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.INFINITY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.LUCK_OF_THE_SEA, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.LURE, elvl);
                            if (useCustom) {
                                Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                            } else {
                                //Player.setItemCustomName(Player.getSelectedSlotId(), "Everything Enchnant");
                                Player.setItemCustomName(Player.getSelectedSlotId(), "eeeee");
                            }
                        }

                        if (enchantment == "32axe") {
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.EFFICIENCY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FORTUNE, 80);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                            if (useCustom) {
                                Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                            } else {
                                Player.setItemCustomName(Player.getSelectedSlotId(), "nice 32k Axe");
                            }
                        }
                        if (enchantment == "32pickaxe") {
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.EFFICIENCY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FORTUNE, 80);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                            if (useCustom) {
                                Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                            } else {
                                Player.setItemCustomName(Player.getSelectedSlotId(), "nice 32k Pickaxe");
                            }
                        }
                        if (enchantment == "32sword") {
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_ASPECT, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.KNOCKBACK, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.LOOTING, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.SHARPNESS, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                            if (useCustom) {
                                Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                            } else {
                                Player.setItemCustomName(Player.getSelectedSlotId(), "nice 32k Sword");
                            }
                        }
                        if (enchantment == "32bow") {
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FLAME, 80);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.PUNCH, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.INFINITY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                            if (useCustom) {
                                Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                            } else {
                                Player.setItemCustomName(Player.getSelectedSlotId(), "nice 32k Bow");
                            }
                        }
                        if (enchantment == "32armor") {
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.PROTECTION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.THORNS, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_PROTECTION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.AQUA_AFFINITY, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.RESPIRATION, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.FEATHER_FALLING, elvl);
                            Player.enchant(Player.getSelectedSlotId(), Enchantment.DEPTH_STRIDER, elvl);
                            if (useCustom) {
                                Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                            } else {
                                Player.setItemCustomName(Player.getSelectedSlotId(), "nice 32k Armor");
                            }
                        }
                        if (!useLegal) {
                            if (enchantment == "fireprot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_PROTECTION, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "prot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.PROTECTION, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "featherfall") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FEATHER_FALLING, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "blastprot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.BLAST_PROTECTION, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "projectileprot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.PROJECTILE_PROTECTION, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "thorns") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.THORNS, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "respiration") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.RESPIRATION, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "aquaaffinity") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.AQUA_AFFINITY, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "depthstrider") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.DEPTH_STRIDER, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "sharpness") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.SHARPNESS, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "smite") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.SMITE, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "baneanthro") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.BANE_OF_ARTHROPODS, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "knockback") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.KNOCKBACK, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "fireaspect") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_ASPECT, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "looting") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.LOOTING, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "efficiency") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.EFFICIENCY, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "silktouch") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.SILK_TOUCH, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "unbreaking") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "fortune") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FORTUNE, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "power") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.POWER, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "punch") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.PUNCH, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "flame") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FLAME, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "infinity") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.INFINITY, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "luckofthesea") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.LUCK_OF_THE_SEA, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Rod");
                                }
                            }
                            if (enchantment == "lure") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.LURE, elvl);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Rod");
                                }
                            }
                        }
                        if (useLegal) {
                            if (enchantment == "fireprot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_PROTECTION, 4);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "prot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.PROTECTION, 4);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "featherfall") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FEATHER_FALLING, 4);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "blastprot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.BLAST_PROTECTION, 4);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "projectileprot") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.PROJECTILE_PROTECTION, 4);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "thorns") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.THORNS, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "respiration") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.RESPIRATION, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "aquaaffinity") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.AQUA_AFFINITY, 1);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "depthstrider") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.DEPTH_STRIDER, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Armor");
                                }
                            }
                            if (enchantment == "sharpness") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.SHARPNESS, 5);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "smite") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.SMITE, 5);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "baneanthro") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.BANE_OF_ARTHROPODS, 5);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "knockback") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.KNOCKBACK, 2);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "fireaspect") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FIRE_ASPECT, 2);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "looting") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.LOOTING, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Weapon");
                                }
                            }
                            if (enchantment == "efficiency") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.EFFICIENCY, 5);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "silktouch") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.SILK_TOUCH, 1);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "unbreaking") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.UNBREAKING, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Tool");
                                }
                            }
                            if (enchantment == "fortune") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FORTUNE, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Pickaxe");
                                }
                            }
                            if (enchantment == "power") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.POWER, 5);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "punch") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.PUNCH, 2);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "flame") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.FLAME, 1);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "infinity") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.INFINITY, 1);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Bow");
                                }
                            }
                            if (enchantment == "luckofthesea") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.LUCK_OF_THE_SEA, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Rod");
                                }
                            }
                            if (enchantment == "lure") {
                                Player.enchant(Player.getSelectedSlotId(), Enchantment.LURE, 3);
                                if (useCustom) {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), customItemname);
                                } else {
                                    Player.setItemCustomName(Player.getSelectedSlotId(), Player.getName(Player.getEntity()) + "'s nice Rod");
                                }
                            }
                        }
                    }
                };
                
                var modTextColor = android.graphics.Color.WHITE;
                var titleSize = 22;
                var btntextsize = 18;
                var mcfont = Utils.font;
                
                var button = new android.widget.Button(ctx);
                button.setText("Choose Enchants");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(titleSize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {}
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Tip: Put item in your hand, choose enchantment, then put the item in a crafting table.");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(8);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {}
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Everything");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        enchantItem("everything");
                        GUIe.dismiss();
                        enchantPicker = false;
                    }
                }));
                //menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("32k Sword");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        enchantItem("32sword");
                        GUIe.dismiss();
                        enchantPicker = false;
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("32k Pickaxe");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantItem("32pickaxe");
                        enchantPicker = false;
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("32k Axe");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("32axe");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("32k Bow");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("32bow");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("32k Armor");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("32armor");
                    }
                }));
                menuLayout.addView(button);
                var elvlet = new android.widget.EditText(ctx);
                elvlet.setText(elvl);
                menuLayout.addView(elvlet);
                var enchantseek = new android.widget.SeekBar(ctx);
                //enchantseek.getThumb().setColorFilter(seekThumbTheme, PorterDuff.Mode.SRC_IN);
                //enchantseek.getProgressDrawable().setColorFilter(seekProgressTheme, PorterDuff.Mode.SRC_IN);
                enchantseek.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.FILL_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
                enchantseek.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                enchantseek.setMax(32767);
                enchantseek.getBackground().setAlpha(255);
                enchantseek.setProgress(elvl);
                enchantseek.setBackground(SummitPE.getStyledBackground()); //(xbgGS);
                enchantseek.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener() {
                    onStopTrackingTouch: function(viewarg) {
                        elvl = enchantseek.getProgress();
                        elvlet.setText(elvl.toString());
                        SummitPE.ctoast("elvl... " + elvl);
                    }
                });
                menuLayout.addView(enchantseek);
                var button = new android.widget.CheckBox(ctx);
                button.setText("Use Legal Enchant Lvls");
                button.setChecked(useLegal);
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        if (!useLegal) {
                            useLegal = true;
                        } else {
                            useLegal = false;
                        }
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.CheckBox(ctx);
                button.setText("Use Custom Name");
                button.setChecked(useCustom);
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        if (!useCustom) {
                            //useCustom = true;
                            //customNamePopup(); //crash
                            SummitPE.ctoast("InDev");
                        } else {
                            useCustom = false;
                        }
                    }
                }));
                menuLayout.addView(button);
				var button = new android.widget.CheckBox(ctx);
                button.setText("Automatically enchant the sword in the enchantment table");
                button.setChecked(autoEnchantInET);
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        if (!autoEnchantInET) {
                            autoEnchantInET = true;
                        } else {
                            autoEnchantInET = false;
                        }
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Protection");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("prot");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Fire Protection");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("fireprot");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Feather Falling");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("featherfall");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Blast Protection");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("blastprot");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Projectile Protection");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("projectileprot");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Thorns");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("throns");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Respiration");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("Respiration");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Aqua Affinity");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("aquaaffinity");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Depth Strider");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("depthstrider");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Sharpness");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("sharpness");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Smite");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("smite");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Bane of Anthropods");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("baneanthro");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Knockback");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("knockback");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Fire Aspect");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("fireaspect");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Looting");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("looting");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Efficiency");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("efficiency");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Silk Touch");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("silktouch");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Unbreaking");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("unbreaking");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Fortune");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("fortune");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Power");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("Power");
                    }
                }));

                var button = new android.widget.Button(ctx);
                button.setText("Punch");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("Punch");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Flame");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("flame");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Infinity");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("infinity");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Luck of the Sea");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("luckofthesea");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Lure");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(btntextsize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                        enchantItem("lure");
                    }
                }));
                menuLayout.addView(button);
                var button = new android.widget.Button(ctx);
                button.setText("Close");
                button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                button.setTextColor(modTextColor);
                button.getBackground().setAlpha(130);
                button.setTextSize(titleSize);
                button.setTypeface(mcfont);

                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        GUIe.dismiss();
                        enchantPicker = false;
                    }
                }));
                menuLayout.addView(button);
                GUIe = new android.widget.PopupWindow(menuLayout1, ctx.getWindowManager().getDefaultDisplay().getWidth() / 4, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, true);
                //GUIe.setAnimationStyle(android.R.style.Animation_Toast);
                GUIe.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                GUIe.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
            } catch (e) {
                SummitPE.ctoast("Error(" + e.lineNumber + "): " + e);
            }
        }
    }))
};

var enchantItem = {
    name: "Enchant item",
    desc: "Enchant everything item",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    requireGame: true,
    isStateMode: function() {
        return false; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return false; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        mDismiss();
        openEnchantSelect();
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
SummitPE.registerModule(enchantItem);

var jjdndjjdjdjd = {
    name: "Break unbrekable blocks",
    desc: "Bedrock ezz, world border ezz, and etc ezz",
    type: ModuleType.mod,
    category: ModCategory.EXPLOITS,
    state: false,
    requireGame: true,
    isStateMode: function() {
        return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
        //Call hack.state = !hack.state; to toggle 
    },
    isToggleAble: function() {
        return true; //MUST be true if isStateMode = true
        //Call hack.onClick() to toggle
    },
    onClick: function(btn) {
        this.state = !this.state;
        if (this.state) {
            Block.setDestroyTime(7, 0.01), //bedrock
                Block.setDestroyTime(137, 0.01),
                Block.setDestroyTime(188, 0.01),
                Block.setDestroyTime(189, 0.01),
                Block.setDestroyTime(209, 0.01),
                Block.setDestroyTime(90, 0.01),
                Block.setDestroyTime(119, 0.01),
                Block.setDestroyTime(120, 0.01),
                Block.setDestroyTime(-161, 0.01);
        } else {
            Block.setDestroyTime(7, -10),
                Block.setDestroyTime(137, -10),
                Block.setDestroyTime(188, -10),
                Block.setDestroyTime(189, -10),
                Block.setDestroyTime(209, -10),
                Block.setDestroyTime(90, -10),
                Block.setDestroyTime(119, -10),
                Block.setDestroyTime(120, -10),
                Block.setDestroyTime(-161, -10);
        }
    },
    onRefresh: function(btn) {
        if (btn != null) btn.setText(this.name);
    }
};
//SummitPE.registerModule();

/*
var statehack = {
	name: "Hack",
	desc: "Some Desc",
	type: ModuleType.mod,
	category: ModCategory.MOVEMENT,
	state: false,
	isStateMode: function () {
		return true; //For Menu Button Color (green = enabled, black(alpha:210) = disabled)
		//Call hack.state = !hack.state; to toggle 
	},
	isToggleAble: function () {
		return true; //MUST be true if isStateMode = true
		//Call hack.onClick() to toggle
	},
	onTick: function () {
		if(!this.state)
			return
	},
	onClick: function (btn) {this.state = !this.state},
	onRefresh: function (btn) {
		if(btn != null)btn.setText(this.name);
	}
};
	*/
/*
 * Commands
 */

SummitPE.getHighestPageNumber = function() {
    var cmds = CommandManager.cmdModules.length;
    var pages = 1;
    while (cmds > 8) {
        cmds -= 8;
        pages++;
    }
    return pages;
};

SummitPE.showHelpPage = function(page) {
    SummitPE.cmsg("Showing help page " + page + "/" + SummitPE.getHighestPageNumber());
    CommandManager.cmdModules.forEach(function(element, index, array) {
        if (index >= 8 * (page - 1) && index <= 8 * page - 1) {
            SummitPE.cmsg(Settings.getString("command_prefix", ".") + element.alias[0] + " " + element.syntax);
        }
    });
};

SummitPE.commandUsage = function(command) {
    if (!command.hasOwnProperty("type") || command.type != ModuleType.command) {
        SummitPE.ctoast("Command error: unknown source");
        return false;
    }

    var alias_list = Settings.getString("command_prefix", ".") + command.alias[0];

    command.alias.forEach(function(item, index, array) {
        if (Number(index) != 0) alias_list += ", " + Settings.getString("command_prefix", ".") + item;
    });

    SummitPE.cmsg("Usage: " + alias_list + " " + command.syntax);
};

var help = {
    syntax: "<page>",
    alias: ["help", "h", "?", "commands"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        try {

            if (cmd[0] == undefined || cmd[0] == null || cmd[0] == "1" || cmd[0] <= 0) {
                SummitPE.showHelpPage(1);
            } else {
                var pageInt = parseInt(cmd[0]);
                if (pageInt <= SummitPE.getHighestPageNumber()) {
                    SummitPE.showHelpPage(pageInt);
                } else if (pageInt > SummitPE.getHighestPageNumber()) {
                    SummitPE.showHelpPage(SummitPE.getHighestPageNumber());
                }
            }
        } catch (e) {
            SummitPE.showHelpPage(1);
        }

    }
};

SummitPE.registerModule(help);

var toggle = {
    syntax: "<module>",
    alias: ["toggle", "t"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        if (cmd[0] != undefined && cmd[0] != null && cmd[0] != "") {
            var shouldReturn = false;
            SummitPE.mods.forEach(function(entry, index, array) {
                if (entry.name.toLowerCase() == (cmd[0] + "").toLowerCase() && !shouldReturn) {
                    if (entry.isStateMode()) {
                        SummitPE.mods[index].state = !SummitPE.mods[index].state;
                        SummitPE.mods[index].onRefresh(null);
                        SummitPE.cmsg("Sucessfully toggled module " + entry.name);
                    } else if (entry.isToggleAble()) {
                        SummitPE.mods[index].onClick(null);
                        SummitPE.mods[index].onRefresh(null);
                        SummitPE.cmsg("Sucessfully toggled module " + entry.name);
                    } else {
                        SummitPE.cmsg(entry.name + "can't be toggled!");
                    }
                    shouldReturn = true;
                }
            });
            if (shouldReturn) return;
            SummitPE.cmsg("Module " + cmd[0] + " can't be found!");
        } else {
            //SummitPE.cmsg(".toggle <module>");
            SummitPE.commandUsage(this);
        }
    }
};

SummitPE.registerModule(toggle);

var friend = {
    syntax: "<add|remove|list>",
    alias: ["friend", "f"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(args) {
        switch (args[0]) {
            case "add":
                if (args[1] != "" && args[1] != null) {
                    FriendManager.addFriend(args[1]);
                    SummitPE.cmsg("Friend " + args[1] + " added!");
                } else
                    SummitPE.cmsg(".friend add <name>");
                break;
            case "del":
            case "remove":
                if (args[1] != "" && args[1] != null) {
                    FriendManager.removeFriend(args[1]);
                    SummitPE.cmsg("Friend " + args[1] + " removed!");
                } else
                    SummitPE.cmsg(".friend remove <name>");
                break;
            case "list":
                SummitPE.cmsg("Your friends(" + FriendManager.all.length() + "): " + FriendManager.all.join(", "));
                break;
            default:
                //SummitPE.cmsg("." + this.alias[0] + " " + this.syntax);
                SummitPE.commandUsage(this);
        }
    }
};

SummitPE.registerModule(friend);

var vclip = {
    syntax: "<height>",
    alias: ["vclip"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        if (cmd[0] != undefined && cmd[0] != null && cmd[0] != "") {
            try {
                var height = parseInt(cmd[0]);
                Entity.setPositionRelative(getPlayerEnt(), 0, height, 0);
                SummitPE.cmsg("Moved " + height + " blocks");
            } catch (e) {
                SummitPE.commandUsage(this);
            }
        } else {
            SummitPE.commandUsage(this);
        }
    }
};

SummitPE.registerModule(vclip);

var spamcmd = {
    syntax: "<message|delay>",
    alias: ["spammer"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(args) {
        switch (args[0].toLowerCase()) {
            case "msg":
            case "message":
                args.shift();
                spammer.msg = args.join(" ");
                SummitPE.cmsg("Spammer message has been set to \"" + spammer.msg + "\"");
                break;
            case "delay":
                var delay = parseInt(args[1]) * 1000;
                spammer.delay = delay;
                SummitPE.cmsg("Spammer delay has been set to " + delay + " milliseconds");
                break;
            default:
                SummitPE.commandUsage(this);
        }
    }
};
SummitPE.registerModule(spamcmd);

var timingsCmd = {
    syntax: "",
    alias: ["timings"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        SummitPE.cmsg(Timings.getTimingData().toString());
    }
};
SummitPE.registerModule(timingsCmd);

var copyIp = {
    syntax: "",
    alias: ["copyip", "cip"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
		if (Server.getAddress() != null && Server.getAddress() != "" && Server.getPort() != "0") {
			copyText(Server.getAddress() + ":" + Server.getPort());
			SummitPE.cmsg("The ip address was copied successfully (IP:Port)");
        } else {
			SummitPE.cmsg("Player are in the local world (probably)");
		}
		
		//clientMessage('§fServer IP: §e' + Server.getAddress() + '§f, Port:§e ' + Server.getPort());
		clientMessage("§9IP:§7 " + Server.getAddress() + "\n§9Port:§7 " + Server.getPort());
    }
};
SummitPE.registerModule(copyIp);

var debug = {
    syntax: "<winfo>",
    alias: ["debug"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        switch (cmd[0].toLowerCase()) {
            case "winfo":
                var wInfo = "";
                wInfo += "World Info:\n";
                wInfo += Utils.Entity.getAll().length + " Entitys\n";
                wInfo += Server.getAllPlayers().length + " Players";
                SummitPE.cmsg(wInfo);
                break;
            default:
                SummitPE.commandUsage(this);
        }
    }
};
SummitPE.registerModule(debug);

var tmiSwitch = {
    syntax: "<on/off>",
    alias: ["tmiswitch", "tmis"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        switch (cmd[0].toLowerCase()) {
            case "on":
                giveItem.tmiNewUi = true;
                break;
            case "off":
                giveItem.tmiNewUi = false;
                break;
            default:
                SummitPE.commandUsage(this);
        }
    }
};
SummitPE.registerModule(tmiSwitch);

var chatd = {
    syntax: "<on/off>",
    alias: ["chatdebug", "chatd"],
    type: ModuleType.command,
    isStateMod: function() {
        return false;
    },
    onCall: function(cmd) {
        switch (cmd[0].toLowerCase()) {
            case "on":
                SummitPE.chatDebug = true;
                break;
            case "off":
                SummitPE.chatDebug = false;
                break;
            default:
                SummitPE.commandUsage(this);
        }
    }
};
SummitPE.registerModule(chatd);

/*
var command = {
	syntax: "<args>",
	alias: ["aliases"],
	type: ModuleType.command,
	isStateMod: function () {
		return false;
	},
	onCall: function (cmd) {
		
	}
};

*/


//Menu open Button
var menuBtn;
var moving = false;
var dx = 0;
var dy = 0;
var mPosX = ctx.getWindowManager()
    .getDefaultDisplay()
    .getWidth() / 16 * 5;
var mPosY = 0;
//Main Menu
var mwidth = ctx.getWindowManager()
    .getDefaultDisplay()
    .getWidth() / 100 * 72;
var menu;

/* Normal button */
var styledBtn = function() { //6 раз используется close button
    var defaultBtn = new android.widget.Button(ctx);
    defaultBtn.setBackgroundDrawable(SummitPE.getStyledBackground());
    return defaultBtn;
}

var modEnable = function(mod, btn) { //()=> {} dont work
    if (!mod.requireGame || SummitPE.inGame || mod.state) {
        mod.onClick(btn);
        mod.onRefresh(btn); //TODO : удалить лишние функции
    } else {
        SummitPE.ctoast(mod.name + " is disabled, please join the game");
    }
}

/*
 # Buttons for the menu list
*/

var modBtnCater = function(mod) {
    var btn = new android.widget.Button(ctx);
    btn.setTransformationMethod(null);

    btn.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function(viewarg) {
            modEnable(mod, btn);
            if (!SummitPE.lightMode)
                if (mod.isStateMode())
                    modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(mod.state, true));
                else
                    modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(false, false));

        }
    }));

    if (!SummitPE.lightMode) {
        btn.setBackground(null);
        btn.setShadowLayer(dip2px(1), dip2px(1), dip2px(1), android.graphics.Color.BLACK);
        btn.setTextColor(android.graphics.Color.WHITE);
        btn.setTypeface(Utils.font);
    }

    var btn1 = new android.widget.Button(ctx);
    btn1.setTransformationMethod(null);
    var txt = eval("new String(\"" + "\\" + "uD83D" + "\\" + "uDD3D\")");
    btn1.setText(txt + "");
    if (!SummitPE.lightMode)
        btn1.setBackgroundColor(getColorAHEXFromARGB(100, 0, 0, 0));
    btn1.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function(viewarg) {
            menu.dismiss();
            SummitPE.showModDialog(mod);

            //Show a screen or a dialog with the mod's info and settings
        }
    }));

    var modButtonLayout = new LinearLayout(ctx);
    modButtonLayout.setOrientation(LinearLayout.HORIZONTAL);
    if (!SummitPE.lightMode)
        if (mod.isStateMode())
            modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(mod.state, true));
        else
            modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(false, false));

    var modButtonLayoutLeft = new LinearLayout(ctx);
    modButtonLayoutLeft.setOrientation(1);
    modButtonLayoutLeft.setLayoutParams(new android.view.ViewGroup.LayoutParams(mwidth / 1.2, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
    modButtonLayout.addView(modButtonLayoutLeft);

    var modButtonLayoutRight = new LinearLayout(ctx);
    modButtonLayoutRight.setOrientation(1);
    modButtonLayoutRight.setLayoutParams(new android.view.ViewGroup.LayoutParams(mwidth / 1 - mwidth / 1.2, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
    modButtonLayout.addView(modButtonLayoutRight);

    modButtonLayoutLeft.addView(btn);
    modButtonLayoutRight.addView(btn1);

    mod.onRefresh(btn);
    return modButtonLayout;
};

var modBtnNavigator = function(mod) {
    var btn = new android.widget.Button(ctx);
    btn.setTransformationMethod(null);
    if (!SummitPE.lightMode) {
        btn.setBackground(null);
        btn.setShadowLayer(dip2px(1), dip2px(1), dip2px(1), android.graphics.Color.BLACK);
        btn.setTextColor(android.graphics.Color.WHITE);
        btn.setTypeface(Utils.font);
    }

    btn.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function(viewarg) {
            modEnable(mod, btn);
            if (!SummitPE.lightMode)
                if (mod.isStateMode())
                    modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(mod.state, true));
                else
                    modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(false, false));

        }
    }));

    var btn1 = new android.widget.Button(ctx);
    btn1.setTransformationMethod(null);
    var txt = eval("new String(\"" + "\\" + "uD83D" + "\\" + "uDD3D\")");
    btn1.setText(txt + "");
    if (!SummitPE.lightMode)
        btn1.setBackgroundColor(getColorAHEXFromARGB(100, 0, 0, 0));
    btn1.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function(viewarg) {
            menu.dismiss();
            SummitPE.showModDialog(mod);

            //Show a screen or a dialog with the mod's info and settings
        }
    }));

    var modButtonLayout = new LinearLayout(ctx);
    modButtonLayout.setOrientation(LinearLayout.HORIZONTAL);
    if (!SummitPE.lightMode)
        if (mod.isStateMode())
            modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(mod.state, true));
        else
            modButtonLayout.setBackground(SummitPE.getStyledBtnBackground(false, false));

    var modButtonLayoutLeft = new LinearLayout(ctx);
    modButtonLayoutLeft.setOrientation(1);
    modButtonLayoutLeft.setLayoutParams(new android.view.ViewGroup.LayoutParams(mwidth / 2.5, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
    modButtonLayout.addView(modButtonLayoutLeft);

    var modButtonLayoutRight = new LinearLayout(ctx);
    modButtonLayoutRight.setOrientation(1);
    modButtonLayoutRight.setLayoutParams(new android.view.ViewGroup.LayoutParams(mwidth / 2 - mwidth / 2.5, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
    modButtonLayout.addView(modButtonLayoutRight);

    modButtonLayoutLeft.addView(btn);
    modButtonLayoutRight.addView(btn1);

    mod.onRefresh(btn);
    return modButtonLayout;
};

/*
 # Creating lists of utilities (options) for all types of menus
*/

function getEpicList(category, lineRGB) {
    var listLayout = new android.widget.GridLayout(ctx);
    listLayout.setColumnCount(1);
    SummitPE.mods.forEach(function(entry, index, array) {
        if (entry.type != ModuleType.cmd && entry.category == category || (category == ModCategory.SPECIAL && entry.type == ModuleType.special)) {
            var btn = new android.widget.TextView(ctx);
            btn.setText(entry.name);
            btn.setTextColor(android.graphics.Color.WHITE);
            btn.setTextSize(18);
            btn.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
            btn.setLayoutParams(new LinearLayout.LayoutParams(ctx.getWindowManager().getDefaultDisplay().getWidth() / 6.2, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
            btn.setPadding(5, 5, 5, 5);
            if (entry.isStateMode() && entry.state)
                btn.setBackgroundColor(getColorAHEXFromARGB(210, 0, 200, 0));
            else if (entry.isStateMode())
                btn.setBackgroundColor(getColorAHEXFromARGB(80, 0, 0, 0));
            else
                btn.setBackgroundColor(getColorAHEXFromARGB(210, 230, 150, 30));
            btn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                    modEnable(entry, btn);
                    if (entry.isStateMode() && entry.state)
                        btn.setBackgroundColor(getColorAHEXFromARGB(210, 0, 200, 0));
                    else if (entry.isStateMode())
                        btn.setBackgroundColor(getColorAHEXFromARGB(80, 0, 0, 0));
                    else
                        btn.setBackgroundColor(getColorAHEXFromARGB(210, 230, 150, 30));
                }
            }));
            btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                onLongClick: function(v, t) {
                    mDismiss();

                    var t = new java.lang.Thread(new java.lang.Runnable({
                        run: function() {
                            ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                            java.lang.Thread.sleep(20);
                            SummitPE.showModDialog(entry);
                            return true;
                        }
                    }));
                    t.start();
                    return true;
                }
            }));
            listLayout.addView(btn);
        }
    });
    listLayout.addView(lineRGB);
    var scroll = new android.widget.ScrollView(ctx);
    scroll.addView(listLayout);
    scroll.setId(438358);
    return scroll;
}

function getCaterList(category) {
    var list = new android.widget.LinearLayout(ctx);
    list.setOrientation(1);
    var bg = new android.graphics.drawable.GradientDrawable();
    bg.setStroke(dip2px(1), getColorAHEXFromARGB(255, 0, 0, 0));
    list.setBackground(bg);
    SummitPE.mods.forEach(function(entry, index, array) {
        if (entry.type != ModuleType.cmd && entry.category == category || (category == ModCategory.SPECIAL && entry.type == ModuleType.special)) {
            var btn = new android.widget.Button(ctx);
            entry.onRefresh(btn);
            btn.setTextColor(android.graphics.Color.WHITE);
            if (entry.isStateMode() && entry.state)
                btn.setBackgroundColor(getColorAHEXFromARGB(210, 0, 200, 0));
            else if (entry.isStateMode())
                btn.setBackgroundColor(getColorAHEXFromARGB(80, 0, 0, 0));
            else
                btn.setBackgroundColor(getColorAHEXFromARGB(210, 230, 150, 30));
            btn.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg) {
                    modEnable(entry, btn);
                    if (entry.isStateMode() && entry.state)
                        btn.setBackgroundColor(getColorAHEXFromARGB(210, 0, 200, 0));
                    else if (entry.isStateMode())
                        btn.setBackgroundColor(getColorAHEXFromARGB(80, 0, 0, 0));
                    else
                        btn.setBackgroundColor(getColorAHEXFromARGB(210, 230, 150, 30));
                }
            }));
            btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                onLongClick: function(v, t) {
                    ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE)
                        .vibrate(60);
                    menu.dismiss();
                    SummitPE.showModDialog(entry);
                    return true;
                }
            }));
            list.addView(btn); //new modBtnCater(SummitPE.mods[index])
        }
    });
    var scroll = new android.widget.ScrollView(ctx);
    scroll.addView(list);
    scroll.setId(438354);
    return scroll;
}

function generateNavigatorList(keyword) {
    var lay = new android.widget.TableLayout(ctx);
    var currow;
    SummitPE.mods.forEach(function(entry, index, array) {
        if (entry.type != ModuleType.cmd) {
            if ((entry.name.toString()
                    .toLowerCase()
                    .indexOf(keyword.toString()
                        .toLowerCase())) > -1 || (keyword == null || keyword == "" || keyword == undefined)) {
                if (index % 2 == 1) {
                    if (!currow) currow = new android.widget.TableRow(ctx);
                    currow.addView(new modBtnNavigator(SummitPE.mods[index]));
                    lay.addView(currow);
                    currow = null;

                } else {
                    currow = new android.widget.TableRow(ctx);
                    currow.addView(new modBtnNavigator(SummitPE.mods[index]));

                }
            } else {

            }
        }
    });
    if (currow != null) lay.addView(currow);
    var sc = new SummitPE.scrollView(ctx);
    sc.addView(lay);
    return sc;
}

/*
 # Displaying all menu views
*/

/*
 # Epic menu:

Спасибо Patrix читу за открытость (даже если бы нет, все равно бы добавил оттуда)
Еще раз спасибо!

Код настолько изменен мной, что от Patrix остается только идея и суть.

Упоминания в помощи над меню (в Patrix):
Made By Nireal Cheater 350
Помощники
Swinks Bag Cheats
Darnex Menu
NullZeep No Bag Killaura Click Max
Jagin combat Menu
Jivint Motion Menu
JIvanig World Menu
Vanêk Button Start

Упоминания в моем меню:
Я

*/

var epicMenuViewMenu = [],
    openMenus = [],
    scrollLs = [],
    thanksForMenu = 0;

/*
    MOVEMENT: 1,
    COMBAT: 2,
    RENDER: 3,
    MISC: 4,
    PLAYER: 5,
    GROUP: 7,
    SPECIAL: 6,
*/

var epicPos = {
    1: {
        dx: 0,
        dy: 0,
        mPosX: -620,
        mPosY: 20,
        moving: false
    },
    2: {
        dx: 0,
        dy: 0,
        mPosX: -420,
        mPosY: 20,
        moving: false
    },
    3: {
        dx: 0,
        dy: 0,
        mPosX: -220,
        mPosY: 20,
        moving: false
    },
    4: {
        dx: 0,
        dy: 0,
        mPosX: -20,
        mPosY: 20,
        moving: false
    },
    5: {
        dx: 0,
        dy: 0,
        mPosX: 180,
        mPosY: 20,
        moving: false
    },
    6: {
        dx: 0,
        dy: 0,
        mPosX: 380,
        mPosY: 20,
        moving: false
    },
    7: {
        dx: 0,
        dy: 0,
        mPosX: 580,
        mPosY: 20,
        moving: false
    },
    8: {
        dx: 0,
        dy: 0,
        mPosX: 580,
        mPosY: 20,
        moving: false
    }
};

/*
var epicPos = [
	[ModCategory.GROUP]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.MOVEMENT]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.COMBAT]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.MISC]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.RENDER]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.PLAYER]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.SPECIAL]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false},
	[ModCategory.EXPLOITS]: {dx: 0, dy: 0, mPosX: 40, mPosY: 20, moving: false}
];
*/

/* for (var category in ModCategory) {
    if (typeof ModCategory[category] == "function") continue;
    epicPos[ModCategory[category]] = {
        dx: 0,
        dy: 0,
        mPosX: 40,
        mPosY: 20,
        moving: false
    };
    //TODO сделать задание определённых позиций
} */

/* Отдельно для внутренней кнопки */
var movingMode = false;
var dxp = 0;
var dyp = 0;
var mPosXp = ctx.getWindowManager().getDefaultDisplay().getWidth() / 16 * 15;
var mPosYp = 100;

function showEpicMenu() {
    //SummitPE.ctoast("Still not done here!");
    //showBasicMenu();
    //return;
    if (!thanksForMenu) {
        //SummitPE.ctoast("Thank autor's the idea menu (from the Patrix utility)!");
        thanksForMenu = 1;
    }

    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var toplayout = new android.widget.RelativeLayout(ctx);
                if (SummitPE.isDev) {
                    toplayout.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(viewarg) {
                            mDismiss(menu);
                            showMenuBtn();
                            searchQ = "";
                        }
                    }));
                }

                var bg__ = new android.graphics.drawable.GradientDrawable();
                //bg__.setStroke(2, getColorAHEXFromARGB(255, 0, 0, 0));
                bg__.setStroke(dip2px(3), getColorAHEXFromARGB(200, 5, 5, 5));
                bg__.setColor(getColorAHEXFromARGB(130, 200, 202, 200));
                bg__.setCornerRadius(dip2px(4));
                bg__.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);

                var bg = new android.graphics.drawable.GradientDrawable();
                bg.setColor(getColorAHEXFromARGB(130, 200, 202, 200));

                /* var mDismiss = function() {
                    menu.dismiss();

                    if (epicMenuViewMenu) {
                        epicMenuViewMenu.forEach(function(entry, index, array) {
                            entry.dismiss();
                        });
                    }
                }; */

                var bg_cb = new android.graphics.drawable.GradientDrawable();
                bg_cb.setColor(getColorAHEXFromARGB(200, 200, 102, 40));
                bg_cb.setStroke(dip2px(3), getColorAHEXFromARGB(200, 5, 5, 5));
                bg_cb.setCornerRadius(dip2px(20));
                bg_cb.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);

                var bg_db = new android.graphics.drawable.GradientDrawable();
                bg_db.setColor(getColorAHEXFromARGB(130, 120, 20, 200));
                bg_db.setStroke(dip2px(3), getColorAHEXFromARGB(200, 5, 5, 5));
                bg_db.setCornerRadius(dip2px(20));
                bg_db.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);

                var closeBtn = new android.widget.Button(ctx);
                closeBtn.setId(6782);
                closeBtn.setText("CLOSE");
                closeBtn.setCompoundDrawablesWithIntrinsicBounds(0, android.R.drawable.ic_menu_close_clear_cancel, 0, 0);
                closeBtn.setTypeface(Utils.font);
                closeBtn.setTextColor(android.graphics.Color.WHITE);
                closeBtn.setBackground(bg_cb);
                closeBtn.setGravity(android.view.Gravity.CENTER);
                closeBtn.setTextSize(12);
                //closeBtn.setPadding(10, 10, 10, 10);
                closeBtn.setTransformationMethod(null);
                closeBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        mDismiss();
                        showMenuBtn();
                    }
                }));

                var dashBtn = new android.widget.Button(ctx);
                dashBtn.setId(47732);
                dashBtn.setText(Languages.getString("special_more"));
                dashBtn.setCompoundDrawablesWithIntrinsicBounds(0, android.R.drawable.ic_menu_more, 0, 0);
                dashBtn.setTypeface(Utils.font);
                dashBtn.setTextColor(android.graphics.Color.WHITE);
                dashBtn.setBackground(bg_db);
                dashBtn.setGravity(android.view.Gravity.CENTER);
                dashBtn.setTextSize(12);
                //dashBtn.setPadding(10, 10, 10, 10);
                dashBtn.setTransformationMethod(null);
                dashBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        mDismiss();
                        openABoard();
                    }
                }));

                lparam = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                toplayout.addView(dashBtn, lparam);

                lparam = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lparam.addRule(android.widget.RelativeLayout.RIGHT_OF, dashBtn.getId());
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                toplayout.addView(closeBtn, lparam);

                menu = new android.widget.PopupWindow(toplayout, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, true);
                if (!SummitPE.lightMode)
                    menu.setAnimationStyle(android.R.style.Animation_Dialog);
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);

                var generateEpicMenu = function(category) {
                    ctx.runOnUiThread(new java.lang.Runnable({
                        run: function() {
                            /* basic styles */
                            var menuLayout = android.widget.LinearLayout(ctx);
                            var menuScroll = new android.widget.RelativeLayout(ctx);
                            var panelLayout = new android.widget.LinearLayout(ctx);

                            panelLayout.setOrientation(LinearLayout.VERTICAL);
                            menuLayout.addView(menuScroll);
                            //panelLayout.setBackground(bg__);


                            /* Panel text (Right & left) */
                            var Left = new android.widget.TextView(ctx);
                            Left.setText(ModCategory.toName(category));
                            Left.setPadding(5, 5, 5, 5);
                            Left.setTextColor(android.graphics.Color.WHITE);
                            Left.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                            Left.setTextSize(18);

                            var Right = new android.widget.TextView(ctx);
                            Right.setText(">");
                            Right.setPadding(5, 5, 20, 6);
                            Right.setTextColor(android.graphics.Color.WHITE);
                            Right.setGravity(android.view.Gravity.END);
                            Right.setTypeface(android.graphics.Typeface.create("sans-serif", android.graphics.Typeface.BOLD));
                            Left.setTextSize(18);
                            //Right.setTransformationMethod(null);

                            /* Right & Left text styles in panel */
                            var panelButtonLayout = new LinearLayout(ctx);
                            panelButtonLayout.setOrientation(LinearLayout.HORIZONTAL);
                            panelButtonLayout.setBackground(bg);
                            panelButtonLayout.setLayoutParams(new LinearLayout.LayoutParams(ctx.getWindowManager().getDefaultDisplay().getWidth() / 6.2, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));

                            panelButtonLayout.addView(Left);
                            panelButtonLayout.addView(Right);

                            /* RBG line */
                            var lineRGB = new android.widget.TextView(ctx);
                            lineRGB.setText("");
                            lineRGB.setBackgroundColor(getColorAHEXFromARGB(76, 0, 0, 0));
                            lineRGB.setLayoutParams(new LinearLayout.LayoutParams(ctx.getWindowManager().getDefaultDisplay().getWidth() / 6.2, ctx.getWindowManager().getDefaultDisplay().getWidth() / 350.5));

                            panelButtonLayout.setOnClickListener(new android.view.View.OnClickListener({
                                onClick: function(viewarg) {
                                    if (!openMenus[category]) {
                                        Right.setText("^");
                                        openMenus[category] = true;
                                        if (!scrollLs[category]) {
                                            var scrollLayout = getEpicList(category, lineRGB);
                                            scrollLs[category] = scrollLayout;
                                        }
                                        panelLayout.addView(scrollLs[category]);
                                    } else {
                                        Right.setText(">");
                                        openMenus[category] = false;
                                        //panelLayout.removeAllViews();
                                        panelLayout.removeView(scrollLs[category]);
                                        //panelLayout.addView(panelButtonLayout);
                                    }
                                }
                            }));

                            panelButtonLayout.setOnTouchListener(new android.view.View.OnTouchListener({
                                onTouch: function(view, motionEvent) {
                                    try {
                                        if (!epicPos[category].moving) {
                                            return false
                                        };
                                        switch (motionEvent.getAction()) {
                                            case android.view.MotionEvent.ACTION_DOWN:
                                                epicPos[category].dx = epicPos[category].mPosX - motionEvent.getRawX();
                                                epicPos[category].dy = epicPos[category].mPosY - motionEvent.getRawY();
                                                break;
                                            case android.view.MotionEvent.ACTION_MOVE:
                                                epicPos[category].mPosX = (motionEvent.getRawX() + epicPos[category].dx) - 580;
                                                epicPos[category].mPosY = (motionEvent.getRawY() + epicPos[category].dy) - 40;
                                                epicMenuViewMenu[category].update(epicPos[category].mPosX, epicPos[category].mPosY, -1, -1);
                                                break;
                                            case android.view.MotionEvent.ACTION_UP:
                                            case android.view.MotionEvent.ACTION_CANCEL:
                                                epicPos[category].moving = false;
                                                break
                                        }
                                    } catch (e) {
                                        print("Error: " + e)
                                    };
                                    return true
                                }
                            }));
                            panelButtonLayout.setOnLongClickListener(new android.view.View.OnLongClickListener({
                                onLongClick: function(v, t) {
                                    ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE).vibrate(60);
                                    epicPos[category].moving = true;
                                    return true;
                                }
                            }));

                            //ITS WONT WORK! (in ToolBox, blocklauncher - idk)
                            //if (openMenus[category] && SummitPE.isDev) panelButtonLayout.callOnClick(true);//performClick

                            panelLayout.addView(panelButtonLayout);
                            menuScroll.addView(panelLayout);

                            if (openMenus[category]) {
                                Right.setText("^");
                                if (!scrollLs[category]) {
                                    var scrollLayout = getEpicList(category, lineRGB);
                                    scrollLs[category] = scrollLayout;
                                }
                                if (scrollLs[category].getParent() != null) {
                                    scrollLs[category].getParent().removeView(scrollLs[category]); // <- fix (sof)
                                }
                                panelLayout.addView(scrollLs[category]);
                            }

                            /* Final */
                            epicMenuViewMenu[category] = new android.widget.PopupWindow(menuLayout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                            epicMenuViewMenu[category].setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
                            epicMenuViewMenu[category].setAnimationStyle(android.R.style.Animation_InputMethod);
                            epicMenuViewMenu[category].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP, epicPos[category].mPosX, epicPos[category].mPosY);
                        }
                    }));
                }

                for (var category in ModCategory) {
                    if (typeof ModCategory[category] == "function") continue;
                    generateEpicMenu(ModCategory[category]);
                }

                /* GUI.dismiss = (function() {
    var cached_function = GUI.dismiss;

    return function() {
        epicMenuViewMenu.forEach(function(entry, index, array) {
						entry.dismiss();
					});

        var result = cached_function.apply(this);
        return result;
    }
})(); */
            } catch (e) {
                SummitPE.ctoast("Epic Menu Error(" + e.lineNumber + "): " + e);
            }
        }
    }));
}

var currentCategory = ModCategory.GROUP;

function showCaterMenu() {
    /* SummitPE.ctoast("Still not done here!");
    showBasicMenu();
    return; */
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var categoryHolder = new android.widget.LinearLayout(ctx);
                categoryHolder.setId(492817);
                var categoryParam = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1);
                /* current category */

                var cateGradient = new android.graphics.drawable.GradientDrawable();
                cateGradient.setColor(getColorAHEXFromARGB(190, 0, 0, 0));
                cateGradient.setStroke(dip2px(1), getColorAHEXFromARGB(200, 255, 255, 255));
                categoryHolder.setBackground(cateGradient);
                var enabGradient = new android.graphics.drawable.GradientDrawable();
                enabGradient.setStroke(dip2px(2), android.graphics.Color.GREEN);

                var categoryBtn = function(category) {
                    var btn = new android.widget.TextView(ctx);
                    btn.setText(ModCategory.toName(category));

                    btn.setGravity(android.view.Gravity.CENTER);
                    btn.setTextColor(android.graphics.Color.WHITE);
                    btn.setTextSize(dip2px(8));
                    btn.setEllipsize(android.text.TextUtils.TruncateAt.MARQUEE);
                    btn.setMarqueeRepeatLimit(-1);
                    btn.setSingleLine();
                    btn.setHorizontallyScrolling(true);
                    btn.setSelected(true);
                    btn.setBackground(currentCategory == category ? enabGradient : null);
                    btn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            currentCategory = category;
                            toplayout.removeView(categoryHolder);
                            categoryHolder.removeAllViews();

                            /* cateBtns = [];
                            for(var category in ModCategory) {
                            	if(typeof ModCategory[category] == "function") continue;
                            	cateBtns.push(categoryBtn(ModCategory[category]));
                            } */

                            cateBtns = [
                                categoryBtn(ModCategory.GROUP),
                                categoryBtn(ModCategory.MOVEMENT),
                                categoryBtn(ModCategory.COMBAT),
                                categoryBtn(ModCategory.MISC),
                                categoryBtn(ModCategory.EXPLOITS),
                                categoryBtn(ModCategory.RENDER),
                                categoryBtn(ModCategory.PLAYER),
                                categoryBtn(ModCategory.SPECIAL)
                            ];

                            updateCaregoryHolder();

                            lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, dip2px(50));
                            lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                            lparam.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
                            toplayout.addView(categoryHolder, lparam);
                            toplayout.removeView(caterList);
                            caterList = getCaterList(currentCategory);
                            lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                            lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                            lparam.addRule(android.widget.RelativeLayout.BELOW, categoryHolder.getId());
                            lparam.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
                            toplayout.addView(caterList, lparam);

                        }
                    }));
                    return btn;
                };

                /* cateBtns = [];
                for(var category in ModCategory) {
                	if(typeof ModCategory[category] == "function") continue;
                	cateBtns.push(categoryBtn(ModCategory[category]));
                } */

                cateBtns = [
                    categoryBtn(ModCategory.GROUP),
                    categoryBtn(ModCategory.MOVEMENT),
                    categoryBtn(ModCategory.COMBAT),
                    categoryBtn(ModCategory.MISC),
                    categoryBtn(ModCategory.EXPLOITS),
                    categoryBtn(ModCategory.RENDER),
                    categoryBtn(ModCategory.PLAYER),
                    categoryBtn(ModCategory.SPECIAL)
                ];

                var updateCaregoryHolder = function() {
                    cateBtns.forEach(function(entry) {
                        categoryHolder.addView(entry, categoryParam);
                        categoryParam = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1);
                    });
                };

                updateCaregoryHolder();

                var caterList = getCaterList(currentCategory);



                var toplayout = new android.widget.RelativeLayout(ctx);
                toplayout.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        menu.dismiss();
                        showMenuBtn();
                        searchQ = "";
                    }
                }));

                var dashBtn = new android.widget.Button(ctx);
                dashBtn.setText(Languages.getString("special_more"));
                dashBtn.setCompoundDrawablesWithIntrinsicBounds(0, android.R.drawable.ic_menu_more, 0, 0);
                dashBtn.setTypeface(Utils.font);
                dashBtn.setTextColor(android.graphics.Color.WHITE);
                dashBtn.setTransformationMethod(null);
                dashBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        menu.dismiss();
                        openABoard();
                    }
                }));

                var lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, dip2px(50));
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                lparam.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
                toplayout.addView(categoryHolder, lparam);
                lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                lparam.addRule(android.widget.RelativeLayout.BELOW, categoryHolder.getId());
                lparam.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
                toplayout.addView(caterList, lparam);
                lparam = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                lparam.addRule(android.widget.RelativeLayout.LEFT_OF, caterList.getId());
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                toplayout.addView(dashBtn, lparam);
                menu = new android.widget.PopupWindow(toplayout, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, true);
                if (!SummitPE.lightMode)
                    menu.setAnimationStyle(android.R.style.Animation_Dialog);
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
            } catch (e) {
                SummitPE.ctoast("Cater Menu Error(" + e.lineNumber + "): " + e);
            }
        }
    }));
}

function showBasicMenu() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var mlist = new android.widget.LinearLayout(ctx);
                mlist.setOrientation(1);

                SummitPE.mods.forEach(function(entry, index, array) {
                    if (entry.type != ModuleType.cmd) {
                        var btn = new android.widget.Button(ctx);
                        btn.setText(entry.name);
                        btn.setTextColor(android.graphics.Color.WHITE);
                        if (entry.isStateMode() && entry.state)
                            btn.setBackgroundColor(getColorAHEXFromARGB(210, 0, 200, 0));
                        else if (entry.isStateMode())
                            btn.setBackgroundColor(getColorAHEXFromARGB(80, 0, 0, 0));
                        else
                            btn.setBackgroundColor(getColorAHEXFromARGB(210, 230, 150, 30));
                        btn.setOnClickListener(new android.view.View.OnClickListener({
                            onClick: function(viewarg) {
                                modEnable(entry, btn);
                                if (entry.isStateMode() && entry.state)
                                    btn.setBackgroundColor(getColorAHEXFromARGB(210, 0, 200, 0));
                                else if (entry.isStateMode())
                                    btn.setBackgroundColor(getColorAHEXFromARGB(80, 0, 0, 0));
                                else
                                    btn.setBackgroundColor(getColorAHEXFromARGB(210, 230, 150, 30));
                            }
                        }));
                        btn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                            onLongClick: function(v, t) {
                                ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE)
                                    .vibrate(60);
                                menu.dismiss();
                                SummitPE.showModDialog(entry);
                                return true;
                            }
                        }));
                        mlist.addView(btn);
                    }
                });
                var scroll = new android.widget.ScrollView(ctx);
                scroll.addView(mlist);
                scroll.setId(52991);

                var dashBtn = new android.widget.Button(ctx);
                dashBtn.setText(Languages.getString("special_more"));
                dashBtn.setCompoundDrawablesWithIntrinsicBounds(0, android.R.drawable.ic_menu_more, 0, 0);
                dashBtn.setTypeface(Utils.font);
                dashBtn.setTextColor(android.graphics.Color.WHITE);
                dashBtn.setTransformationMethod(null);
                dashBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        menu.dismiss();
                        openABoard();
                    }
                }));

                var toplayout = new android.widget.RelativeLayout(ctx);
                toplayout.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        menu.dismiss();
                        showMenuBtn();
                        searchQ = "";
                    }
                }));

                var lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                lparam.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
                toplayout.addView(scroll, lparam);
                lparam = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                lparam.addRule(android.widget.RelativeLayout.LEFT_OF, scroll.getId());
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                toplayout.addView(dashBtn, lparam);
                menu = new android.widget.PopupWindow(toplayout, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, true);
                if (!SummitPE.lightMode)
                    menu.setAnimationStyle(android.R.style.Animation_Dialog);
                menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
            } catch (e) {
                SummitPE.ctoast("Basic Menu Error(" + e.lineNumber + "): " + e);
            }
        }
    }));
}

function showNavigatorMenu() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {

                var sbar = new android.widget.LinearLayout(ctx);
                if (!SummitPE.lightMode) {
                    var bg = android.graphics.drawable.GradientDrawable();
                    bg.setColor(getColorAHEXFromARGB(100, 255, 255, 255));
                    bg.setStroke(dip2px(2), android.graphics.Color.BLACK);
                    bg.setCornerRadius(1);

                    sbar.setBackgroundDrawable(bg);
                }

                search = new android.widget.EditText(ctx);
                //search.setImeOptions( android.view.inputmethod.EditorInfo.IME_ACTION_DONE |  android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
                search.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
                search.setBackgroundColor(android.graphics.Color.TRANSPARENT);
                search.setHint("Search a mod");
                search.setTypeface(Utils.font);
                search.setHintTextColor(getColorAHEXFromARGB(240, 80, 80, 80));
                search.setTextColor(android.graphics.Color.BLACK);
                search.setGravity(android.view.Gravity.CENTER);
                search.addTextChangedListener(new android.text.TextWatcher({
                    afterTextChanged: function(text) {
                        updateNavigatorMenu(text, toplayout);
                        searchQ = text;
                    }
                }));
                sbar.addView(search, new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT));
                sbar.setId(39472);
                mlist = new android.widget.LinearLayout(ctx);
                mlist.setId(20372);
                mlist.addView(generateNavigatorList(search.getText() + ""));
                var lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);

                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                lparam.addRule(android.widget.RelativeLayout.CENTER_HORIZONTAL);
                var toplayout = new android.widget.RelativeLayout(ctx);
                toplayout.addView(sbar, lparam);
                lparam = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);

                lparam.addRule(android.widget.RelativeLayout.BELOW, toplayout.getChildAt(0).getId());
                lparam.addRule(android.widget.RelativeLayout.ALIGN_RIGHT, toplayout.getChildAt(0).getId());
                lparam.addRule(android.widget.RelativeLayout.ALIGN_LEFT, toplayout.getChildAt(0).getId());
                lparam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                mlist.setLayoutParams(lparam);
                mlist.setId(563729);
                toplayout.addView(mlist);

                //Side stuff
                var sideLayout = new android.widget.RelativeLayout(ctx);
                var roundGradient = new android.graphics.drawable.GradientDrawable();
                roundGradient.setColor(getColorAHEXFromARGB(200, 30, 30, 30));
                roundGradient.setCornerRadius(dip2px(20));
                roundGradient.setStroke(dip2px(1), getColorAHEXFromARGB(150, 0, 0, 0));

                var dashBtn = new android.widget.Button(ctx);
                dashBtn.setText(Languages.getString("special_more"));
                dashBtn.setCompoundDrawablesWithIntrinsicBounds(0, android.R.drawable.ic_menu_more, 0, 0);
                dashBtn.setTypeface(Utils.font);
                dashBtn.setTextColor(android.graphics.Color.WHITE);
                dashBtn.setTransformationMethod(null);
                dashBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        menu.dismiss();
                        openABoard();
                    }
                }));

                var InParam = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                InParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                InParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                InParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                InParam = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                InParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                InParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                InParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                sideLayout.addView(dashBtn, InParam);

                var sideParams = new android.widget.RelativeLayout.LayoutParams(ctx.getWindowManager().getDefaultDisplay().getWidth() / 100 * 15, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
                sideParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                sideParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);

                toplayout.addView(sideLayout, sideParams);
                toplayout.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        menu.dismiss();
                        showMenuBtn();
                        searchQ = "";
                    }
                }));
                menu = new android.widget.PopupWindow(toplayout, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, true);
                if (!SummitPE.lightMode)
                    menu.setAnimationStyle(android.R.style.Animation_Dialog);
                menu.showAtLocation(ctx.getWindow()
                    .getDecorView(), android.view.Gravity.CENTER, 0, 0);
            } catch (e) {
                SummitPE.ctoast("Navigator Menu Error(" + e.lineNumber + "): " + e);
            }
        }
    }));
}

/* Toggle button menu */
var BtnToggleMode = {
    MODE_TOGGLE: 1,
    MODE_LIST: 2
};

/* Example:
BtnToggleEntry(
"Menu",
BtnToggleMode.MODE_LIST,
[
    "Navigator",
    ["Navigator", "Basic", "Cater", "Epic"]
],
false,
func(newValue){});

or

BtnToggleEntry(
"Menu",
BtnToggleMode.MODE_LIST,
[
    [0, "Navigator"],
    [[0, "Navigator"], [1, "Basic"], [2, "Cater"], [3, "Epic"]]
],
true,
func(newValue){});
*/

//[[propertyName, fallbackValue], [value1, value2, value3, .....]] 
function BtnToggleEntry(name, mode, valueList, arrayInArrayMode, onSelect) {
    var layout = new android.widget.LinearLayout(ctx);
    var bg = new android.graphics.drawable.GradientDrawable();
    bg.setStroke(3, android.graphics.Color.BLACK);
    var nameT = new android.widget.TextView(ctx);
    nameT.setTypeface(Utils.font);
    nameT.setText(" " + name);
    nameT.setSingleLine(true);
    nameT.setTextSize(dip2px(13));
    nameT.setTextColor(android.graphics.Color.WHITE);
    nameT.setGravity(android.view.Gravity.CENTER);
    var chooser = new android.widget.Button(ctx);
    if (mode == BtnToggleMode.MODE_TOGGLE) {
        var curValue = valueList[0] == null ? "" : valueList[0];
        var on = valueList[1][0] == null ? "On" : valueList[1][0];
        var off = valueList[1][1] == null ? "Off" : valueList[1][1];
        chooser.setText(curValue ? on : off);
        chooser.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                curValue = !curValue;
                if (onSelect != null)
                    onSelect(curValue);
                chooser.setText(curValue ? on : off);
            }
        }));
    } else if (mode == BtnToggleMode.MODE_LIST) {
        var curValue = valueList[0] == null ? "" : valueList[0];
        var nextValue = curValue;
        var done = false;
        if (arrayInArrayMode) {
            valueList[1].forEach(function(entry, index) {
                if (entry[0] == curValue[0] && done == false) {
                    if (index + 1 == valueList[1].length) {
                        nextValue = valueList[1][0];
                    } else {
                        nextValue = valueList[1][index + 1];
                    }
                    done = true;
                }
            });
        } else {
            valueList[1].forEach(function(entry, index) {
                if (entry.toLowerCase() == curValue.toLowerCase() && done == false) {
                    if (index + 1 == valueList[1].length) {
                        nextValue = valueList[1][0];
                    } else {
                        nextValue = valueList[1][index + 1];
                    }
                    done = true;
                }
            });
        }
        if (arrayInArrayMode) chooser.setText(curValue[1]);
        else chooser.setText(curValue);
        chooser.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                if (arrayInArrayMode) v.setText(nextValue[1]);
                else v.setText(nextValue);
                curValue = nextValue;
                if (onSelect != null) {
                    if (arrayInArrayMode) onSelect(curValue[0]);
                    else onSelect(curValue);
                }
                var done = false;
                if (arrayInArrayMode) {
                    valueList[1].forEach(function(entry, index) {
                        if (entry[0] == curValue[0] && done == false) {
                            if (index + 1 == valueList[1].length) {
                                nextValue = valueList[1][0];
                            } else {
                                nextValue = valueList[1][index + 1];
                            }
                            done = true;
                        }
                    });
                } else {
                    valueList[1].forEach(function(entry, index) {
                        if (entry.toLowerCase() == curValue.toLowerCase() && done == false) {
                            if (index + 1 == valueList[1].length) {
                                nextValue = valueList[1][0];
                            } else {
                                nextValue = valueList[1][index + 1];
                            }
                            done = true;
                        }
                    });
                }
            }
        }));
    }
    var param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
    param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
    param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
    layout.addView(nameT, param);
    param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
    param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
    param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
    layout.addView(chooser, param);
    param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dip2px(50));
    layout.setLayoutParams(param);
    layout.setBackground(bg);
    return layout;
}

var updatemgrDialog;
var settingDialog;
var aboutDialog;
var colorSetDialog;
var SettingMode = {
    MODE_TOGGLE: 1,
    MODE_LIST: 2
};
//[[propertyName, fallbackValue], [value1, value2, value3, .....]] 
function SettingEntry(name, mode, valueList, onSelect, isLanguage) {
    var layout = new android.widget.RelativeLayout(ctx);
    var bg = new android.graphics.drawable.GradientDrawable();
    bg.setStroke(3, android.graphics.Color.BLACK);
    var nameT = new android.widget.TextView(ctx);
    nameT.setTypeface(Utils.font);
    nameT.setText(" " + name);
    nameT.setSingleLine(true);
    nameT.setTextSize(dip2px(13));
    nameT.setTextColor(android.graphics.Color.WHITE);
    nameT.setGravity(android.view.Gravity.CENTER);
    var chooser = new android.widget.Button(ctx);
    if (mode == SettingMode.MODE_TOGGLE) {
        var curValue = Settings.getBoolean(valueList[0][0], valueList[0][1] == null ? false : valueList[0][1]);
        var on = valueList[1] == null ? "On" : valueList[1][0];
        var off = valueList[1] == null ? "Off" : valueList[1][1];
        chooser.setText(curValue ? on : off);
        chooser.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                curValue = !curValue;
                if (onSelect != null)
                    onSelect(curValue);
                Settings.setBoolean(valueList[0][0], curValue);
                chooser.setText(curValue ? on : off);
            }
        }));
    } else if (mode == SettingMode.MODE_LIST) {
        var curValue = Settings.getString(valueList[0][0], valueList[0][1] == null ? "" : valueList[0][1]);
        var nextValue = curValue;
        var done = false;
        valueList[1].forEach(function(entry, index) {
            if (entry.toLowerCase() == curValue.toLowerCase() && done == false) {
                if (index + 1 == valueList[1].length) {
                    nextValue = valueList[1][0];
                } else {
                    nextValue = valueList[1][index + 1];
                }
                done = true;
            }
        });
        chooser.setText(curValue);
        chooser.setOnClickListener(new android.view.View.OnClickListener({
            onClick: function(v) {
                v.setText(nextValue);
                if (onSelect != null)
                    onSelect(nextValue);
                curValue = nextValue;
                Settings.setString(valueList[0][0], curValue);
                if (isLanguage) {
                    Languages.loadLang(false, curValue);
                }
                var done = false;
                valueList[1].forEach(function(entry, index) {
                    if (entry.toLowerCase() == curValue.toLowerCase() && done == false) {
                        if (index + 1 == valueList[1].length) {
                            nextValue = valueList[1][0];
                        } else {
                            nextValue = valueList[1][index + 1];
                        }
                        done = true;
                    }
                });
            }
        }));
    }
    var param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
    param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
    param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
    layout.addView(nameT, param);
    param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
    param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
    param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
    layout.addView(chooser, param);
    param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dip2px(50));
    layout.setLayoutParams(param);
    layout.setBackground(bg);
    return layout;
}

function openSettingScreen() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var display = new android.util.DisplayMetrics();
                com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                    .getWindowManager()
                    .getDefaultDisplay()
                    .getMetrics(display);
                var content = new android.widget.LinearLayout(ctx);
                content.setId(9472729);
                content.setOrientation(1);
                var contentScroll = new SummitPE.scrollView(ctx);
                contentScroll.setId(492628);
                //default content
                var title = new android.widget.TextView(ctx);
                title.setText(android.text.Html.fromHtml("<u>" + Languages.getString("screen_settings") + "</u>"));
                title.setTextSize(dip2px(20));
                title.setGravity(android.view.Gravity.CENTER);
                title.setTextColor(android.graphics.Color.BLACK);
                title.setTypeface(Utils.font);
                title.setId(94771);

                var btnBg = new android.graphics.drawable.GradientDrawable();
                btnBg.setColor(getColorAHEXFromARGB(120, 255, 255, 255));
                btnBg.setStroke(2, android.graphics.Color.BLACK);
                btnBg.setCornerRadius(dip2px(5));

                var languageSettings = SettingEntry("Language", SettingMode.MODE_LIST, [
                    ["language", "en_US"],
                    ["en_US", "ru_RU"]
                ], null, true);
                content.addView(languageSettings);
                var setMenu = SettingEntry("Menu", SettingMode.MODE_LIST, [
                    ["menu", "Navigator"],
                    ["Navigator", "Basic", "Cater", "Epic"]
                ], function(item) {
                    switch (item) {
                        case "Basic":
                            SummitPE.ctoast("Long hold a button to open its Settings menu!");
                            break;
                        case "Cater":
                            break;
                    }
                }, false);
                content.addView(setMenu);
                var setCommandEnable = SettingEntry("Enable Commands", SettingMode.MODE_TOGGLE, [
                    ["enable_commands", true],
                    null
                ], null, false)
                content.addView(setCommandEnable);
                var commandPrefix = SettingEntry("Command Prefix", SettingMode.MODE_LIST, [
                    ["command_prefix", "."],
                    [".", "@", "&", "*", "~"]
                ], null, false);
                content.addView(commandPrefix);

                //footer
                var closeButton = new styledBtn();
                closeButton.setText("Close");
                closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                closeButton.setId(10472);
                closeButton.setTypeface(Utils.font);
                closeButton.setTextColor(android.graphics.Color.BLACK);
                closeButton.setTypeface(Utils.font);
                //layout alignement....
                var dialogLayout = new android.widget.RelativeLayout(ctx);
                dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                var params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                dialogLayout.addView(title, params);
                contentScroll.addView(content);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                contentScroll.setFillViewport(true);
                dialogLayout.addView(contentScroll, params);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                dialogLayout.addView(closeButton, params);
                //Dialog Stuff
                settingDialog = new android.app.Dialog(ctx);
                settingDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                settingDialog.getWindow()
                    .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                settingDialog.setContentView(dialogLayout);
                settingDialog.setCanceledOnTouchOutside(true);
                settingDialog.setTitle(Languages.getString("special.aboard"));
                settingDialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {

                    }
                }));
                settingDialog.show();
                var window = settingDialog.getWindow();
                window.setLayout(mwidth, display.heightPixels);
                closeButton.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        settingDialog.dismiss();
                    }
                }));
            } catch (e) {
                SummitPE.ctoast("Error: " + e);
            }
        }
    }));
}

function openAboutScreen() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var display = new android.util.DisplayMetrics();
                com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                    .getWindowManager()
                    .getDefaultDisplay()
                    .getMetrics(display);
                var dialogLayout = new android.widget.RelativeLayout(ctx);
                dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                //default content
                var title = new android.widget.TextView(ctx);
                title.setText(android.text.Html.fromHtml("<u>" + Languages.getString("screen_about") + "</u>"));
                title.setTextSize(dip2px(20));
                title.setGravity(android.view.Gravity.CENTER);
                title.setTextColor(android.graphics.Color.BLACK);
                title.setTypeface(Utils.font);
                title.setId(94771);

                var about = new android.widget.TextView(ctx);
                about.setTextSize(dip2px(10));
                about.setText(android.text.Html.fromHtml("It's tools for mcpe singleplayer and multiplayer <br> Version: " + UpdateManager.version + " <br> DragOP was made by GodSoft029 and Peacestorm, forked/modifed and rename to <b>SummitPE</b> by WDH"));
                about.setGravity(android.view.Gravity.CENTER | android.view.Gravity.TOP);
                about.setTextColor(android.graphics.Color.BLACK);
                about.setTypeface(Utils.font);
                about.setId(96751);

                var yt = new android.widget.Button(ctx);
                yt.setText("YouTube");
                yt.setTypeface(Utils.font);
                yt.setGravity(android.view.Gravity.CENTER);
                yt.setTextColor(android.graphics.Color.BLACK);
                yt.setId(63619);
                yt.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://youtube.com/c/godsoft029")));
                    }
                }));

                var twitter = new android.widget.Button(ctx);
                twitter.setText("Twitter");
                twitter.setTypeface(Utils.font);
                twitter.setGravity(android.view.Gravity.CENTER);
                twitter.setTextColor(android.graphics.Color.BLACK);
                twitter.setId(13827);
                twitter.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://twitter.com/godsoft029")));
                    }
                }));

                var github = new android.widget.Button(ctx);
                github.setText("Github");
                github.setTypeface(Utils.font);
                github.setGravity(android.view.Gravity.CENTER);
                github.setTextColor(android.graphics.Color.BLACK);
                github.setId(28472);
                github.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://github.com/godsoft029")));
                    }
                }));

                //footer
                var closeButton = new styledBtn();
                closeButton.setText("Close");
                closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                closeButton.setId(10472);
                closeButton.setTypeface(Utils.font);
                closeButton.setTextColor(android.graphics.Color.BLACK);
                closeButton.setTypeface(Utils.font);
                //layout alignement....

                var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                params.addRule(android.widget.RelativeLayout.ABOVE, yt.getId());
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                dialogLayout.addView(about, params);
                params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.LEFT_OF, github.getId());
                dialogLayout.addView(yt, params);
                params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                params.addRule(android.widget.RelativeLayout.RIGHT_OF, github.getId());
                dialogLayout.addView(twitter, params);
                params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                params.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
                dialogLayout.addView(github, params);

                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                dialogLayout.addView(title, params);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                dialogLayout.addView(closeButton, params);
                //Dialog Stuff
                aboutDialog = new android.app.Dialog(ctx);
                aboutDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                aboutDialog.getWindow()
                    .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                aboutDialog.setContentView(dialogLayout);
                aboutDialog.setCanceledOnTouchOutside(true);
                aboutDialog.setTitle(Languages.getString("special.about"));
                aboutDialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {

                    }
                }));
                aboutDialog.show();
                var window = aboutDialog.getWindow();
                window.setLayout(mwidth, display.heightPixels);
                closeButton.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        aboutDialog.dismiss();
                    }
                }));
            } catch (e) {
                SummitPE.ctoast("Error: " + e);
            }
        }
    }));
}

function openUpdateMgrScreen() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var display = new android.util.DisplayMetrics();
                com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                    .getWindowManager()
                    .getDefaultDisplay()
                    .getMetrics(display);
                var content = new android.widget.LinearLayout(ctx);
                content.setId(9472729);
                content.setOrientation(1);
                var contentScroll = new SummitPE.scrollView(ctx);
                contentScroll.setId(492628);
                //default content
                var title = new android.widget.TextView(ctx);
                title.setText(android.text.Html.fromHtml("<u>" + Languages.getString("screen_updatemgr") + "</u>"));
                title.setTextSize(dip2px(20));
                title.setGravity(android.view.Gravity.CENTER);
                title.setTextColor(android.graphics.Color.BLACK);
                title.setTypeface(Utils.font);
                title.setId(94771);

                var verBg = new android.graphics.drawable.GradientDrawable();
                verBg.setColor(getColorAHEXFromARGB(120, 255, 255, 255));
                verBg.setStroke(2, android.graphics.Color.BLACK);
                verBg.setCornerRadius(dip2px(12));

                var heig = dip2px(100);

                var verParam = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                //CurrentVersion
                var currentVer = new android.widget.RelativeLayout(ctx);
                currentVer.setBackground(verBg);
                var currTitle = new android.widget.TextView(ctx);
                currTitle.setTypeface(Utils.font);
                currTitle.setTextSize(dip2px(13));
                currTitle.setId(972404);
                currTitle.setTextColor(android.graphics.Color.BLACK);
                currTitle.setText("Current Version (v" + UpdateManager.version + ")");
                var currDlBtn = new android.widget.Button(ctx);
                currDlBtn.setText("Installed");
                currDlBtn.setId(535714);
                currDlBtn.setTextColor(android.graphics.Color.BLACK);
                currDlBtn.setEnabled(false);
                currDlBtn.setTypeface(Utils.font);
                currDlBtn.setTextSize(dip2px(9));
                var desc = new android.widget.TextView(ctx);
                desc.setTypeface(Utils.font);
                desc.setTextColor(android.graphics.Color.BLACK);
                desc.setPadding(dip2px(4), dip2px(2), dip2px(5), 0);
                desc.setText("Thats your version. (" + (SummitPE.isDev ? "Developer" : "Stable") + "-Channel)");

                verParam.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
                verParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                currentVer.addView(currTitle, verParam);
                verParam = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                verParam.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
                verParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                currentVer.addView(currDlBtn, verParam);
                verParam = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                verParam.addRule(android.widget.RelativeLayout.BELOW, currTitle.getId());
                verParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                verParam.addRule(android.widget.RelativeLayout.LEFT_OF, currDlBtn.getId());
                currentVer.addView(desc, verParam);

                //Stable Version
                var stableVer = new android.widget.RelativeLayout(ctx);
                stableVer.setBackground(verBg);
                var stableTitle = new android.widget.TextView(ctx);
                stableTitle.setTypeface(Utils.font);
                stableTitle.setTextSize(dip2px(13));
                stableTitle.setId(972144);
                stableTitle.setTextColor(android.graphics.Color.BLACK);
                if (UpdateManager.stableInfo == null)
                    stableTitle.setText("No Network Connection");
                else
                    stableTitle.setText("Stable version (" + UpdateManager.stableInfo.getString("tag_name") + ")");
                var stableDlBtn = new android.widget.Button(ctx);
                stableDlBtn.setText("New");
                stableDlBtn.setId(537814);
                stableDlBtn.setTextColor(android.graphics.Color.BLACK);
                stableDlBtn.setEnabled(false);
                stableDlBtn.setTypeface(Utils.font);
                stableDlBtn.setTextSize(dip2px(9));
                var stableDesc = new android.widget.TextView(ctx);
                stableDesc.setTypeface(Utils.font);
                stableDesc.setTextColor(android.graphics.Color.BLACK);
                stableDesc.setPadding(dip2px(4), dip2px(2), dip2px(5), 0);
                stableDesc.setVerticalScrollBarEnabled(true);
                stableDesc.setMovementMethod(new android.text.method.ScrollingMovementMethod());
                if (UpdateManager.stableInfo == null)
                    stableDesc.setText("No Network Connection");
                else
                    stableDesc.setText("The latest Stable version. \nRelease Notes: \n" + UpdateManager.stableInfo.getString("body"));

                verParam = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                verParam.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
                verParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                stableVer.addView(stableTitle, verParam);
                verParam = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                verParam.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
                verParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                stableVer.addView(stableDlBtn, verParam);
                verParam = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT);
                verParam.addRule(android.widget.RelativeLayout.BELOW, stableTitle.getId());
                verParam.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                verParam.addRule(android.widget.RelativeLayout.LEFT_OF, stableDlBtn.getId());
                stableVer.addView(stableDesc, verParam);

                var params = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, heig);
                content.addView(currentVer, params);
                params = new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, heig);
                content.addView(stableVer, params);


                //footer
                var closeButton = new styledBtn();
                closeButton.setText("Close");
                closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                closeButton.setId(10472);
                closeButton.setTypeface(Utils.font);
                closeButton.setTextColor(android.graphics.Color.BLACK);
                closeButton.setTypeface(Utils.font);
                //layout alignement....
                var dialogLayout = new android.widget.RelativeLayout(ctx);
                dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                dialogLayout.addView(title, params);
                contentScroll.addView(content);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                contentScroll.setFillViewport(true);
                dialogLayout.addView(contentScroll, params);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                dialogLayout.addView(closeButton, params);
                //Dialog Stuff
                updatemgrDialog = new android.app.Dialog(ctx);
                updatemgrDialog.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                updatemgrDialog.getWindow()
                    .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                updatemgrDialog.setContentView(dialogLayout);
                updatemgrDialog.setCanceledOnTouchOutside(true);
                updatemgrDialog.setTitle(Languages.getString("special.aboard"));
                updatemgrDialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {

                    }
                }));
                updatemgrDialog.show();
                var window = updatemgrDialog.getWindow();
                window.setLayout(mwidth, display.heightPixels);
                closeButton.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        updatemgrDialog.dismiss();
                    }
                }));
            } catch (e) {
                SummitPE.ctoast("No Internet Connection detected. Restart your Launcher if you think this is an Error");
            }
        }
    }));
}



function openABoard() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var display = new android.util.DisplayMetrics();
                com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                    .getWindowManager()
                    .getDefaultDisplay()
                    .getMetrics(display);
                var content = new android.widget.LinearLayout(ctx);
                content.setId(9472729);
                content.setOrientation(1);
                var contentScroll = new SummitPE.scrollView(ctx);
                contentScroll.setId(492628);
                //default content
                var title = new android.widget.TextView(ctx);
                title.setText(android.text.Html.fromHtml("<u>" + Languages.getString("special_more") + "</u>"));
                title.setTextSize(dip2px(20));
                title.setGravity(android.view.Gravity.CENTER);
                title.setTextColor(android.graphics.Color.BLACK);
                title.setTypeface(Utils.font);
                title.setId(94771);

                var btnBg = new android.graphics.drawable.GradientDrawable();
                btnBg.setColor(getColorAHEXFromARGB(120, 255, 255, 255));
                btnBg.setStroke(2, android.graphics.Color.BLACK);
                btnBg.setCornerRadius(dip2px(5));

                var btnSelected = new android.graphics.drawable.GradientDrawable();
                btnSelected.setColor(getColorAHEXFromARGB(120, 170, 170, 170));
                btnSelected.setStroke(2, android.graphics.Color.BLACK);
                btnSelected.setCornerRadius(dip2px(5));

                var btnListener = new android.view.View.OnTouchListener({
                    onTouch: function(v, motionEvent) {
                        try {
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    v.setBackground(btnSelected);
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    v.setBackground(btnBg);
                                    break;
                            }

                        } catch (e) {
                            SummitPE.ctoast("Error: " + e);
                        }
                        return false;
                    }
                });

                var settingBtn = new android.widget.Button(ctx);
                settingBtn.setText("Settings");
                settingBtn.setTypeface(Utils.font);
                settingBtn.setBackground(btnBg);
                settingBtn.setCompoundDrawablesWithIntrinsicBounds(0, 0, android.R.drawable.ic_menu_manage, 0);
                settingBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        aboard.dismiss();
                        openSettingScreen();
                    }
                }));
                settingBtn.setOnTouchListener(btnListener);
                content.addView(settingBtn);

                var updateBtn = new android.widget.Button(ctx);
                updateBtn.setText(Languages.getString("screen_updatemgr"));
                updateBtn.setTypeface(Utils.font);
                updateBtn.setBackground(btnBg);
                updateBtn.setCompoundDrawablesWithIntrinsicBounds(0, 0, android.R.drawable.stat_sys_download, 0);
                updateBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        aboard.dismiss();
                        openUpdateMgrScreen();
                    }
                }));
                updateBtn.setOnTouchListener(btnListener);
                content.addView(updateBtn);

                var aboutBtn = new android.widget.Button(ctx);
                aboutBtn.setText(Languages.getString("screen_about"));
                aboutBtn.setTypeface(Utils.font);
                aboutBtn.setBackground(btnBg);
                aboutBtn.setCompoundDrawablesWithIntrinsicBounds(0, 0, android.R.drawable.ic_menu_info_details, 0);
                aboutBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        aboard.dismiss();
                        openAboutScreen();
                    }
                }));
                aboutBtn.setOnTouchListener(btnListener);
                content.addView(aboutBtn);

                var feedbackBtn = new android.widget.Button(ctx);
                feedbackBtn.setText("Send Feedback");
                feedbackBtn.setTypeface(Utils.font);
                feedbackBtn.setBackground(btnBg);
                feedbackBtn.setCompoundDrawablesWithIntrinsicBounds(0, 0, android.R.drawable.stat_notify_chat, 0);
                feedbackBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(v) {
                        aboard.dismiss();
                        ctx.startActivity(new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse("https://docs.google.com/forms/d/e/1FAIpQLSdWnyMzCq9XOZLlS5TQBlyj9MO2eK4yGi8IObOFi-twQKcwCg/viewform")));
                    }
                }));
                feedbackBtn.setOnTouchListener(btnListener);
                content.addView(feedbackBtn);


                //footer
                var closeButton = new styledBtn();
                closeButton.setText("Close");
                closeButton.setPadding(0.5, closeButton.getPaddingTop(), 0.5, closeButton.getPaddingBottom());
                closeButton.setId(10472);
                closeButton.setTypeface(Utils.font);
                closeButton.setTextColor(android.graphics.Color.BLACK);
                closeButton.setTypeface(Utils.font);
                //layout alignement....
                var dialogLayout = new android.widget.RelativeLayout(ctx);
                dialogLayout.setBackgroundDrawable(SummitPE.getStyledBackground());
                var params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                dialogLayout.addView(title, params);
                contentScroll.addView(content);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.BELOW, title.getId());
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
                params.addRule(android.widget.RelativeLayout.ABOVE, closeButton.getId());
                contentScroll.setFillViewport(true);
                dialogLayout.addView(contentScroll, params);
                params = new android.widget.RelativeLayout.LayoutParams(mwidth, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                params.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
                dialogLayout.addView(closeButton, params);
                //Dialog Stuff
                aboard = new android.app.Dialog(ctx);
                aboard.requestWindowFeature(android.view.Window.FEATURE_NO_TITLE);
                aboard.getWindow()
                    .setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                aboard.setContentView(dialogLayout);
                aboard.setCanceledOnTouchOutside(true);
                aboard.setTitle(Languages.getString("special.aboard"));
                aboard.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function() {
                        showMenuBtn();
                    }
                }));
                aboard.show();
                var window = aboard.getWindow();
                window.setLayout(mwidth, display.heightPixels);
                closeButton.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view) {
                        aboard.dismiss();
                    }
                }));
            } catch (e) {
                SummitPE.ctoast("Error: " + e);
            }
        }
    }));
}

/*function refreshMenu() {
	if(mlist != null && mlist != Undefined) {
		mlist.removeAllViews();
		var genmenu = generateNavigatorList(search.getText() + "");
		if(mlist != null) mlist.addView(genmenu);
	}
}*/

SummitPE.mt = ModuleType;

function updateNavigatorMenu(keyword, toplayout) {
    Utils.currentSearchCount += 1;
    if (Utils.currentSearchCount > 999) Utils.currentSearchCount = 0;
    var myNum = Utils.currentSearchCount;
    var r = new java.lang.Runnable({
        run: function() {
            var newList = generateNavigatorList(keyword);
            ctx.runOnUiThread(new java.lang.Runnable({
                run: function() {
                    try {
                        if (myNum == Utils.currentSearchCount) {
                            var mlist = toplayout.getChildAt(1);
                            var lparam = mlist.getLayoutParams();
                            while (mlist.getChildCount() > 0) mlist.removeView(mlist.getChildAt(0));
                            mlist.addView(newList);
                        }
                    } catch (e) {
                        SummitPE.ctoast(e);
                    }
                }
            }));
        }
    });
    var t = new java.lang.Thread(r);
    t.start();
}

function showMenu() {
    var menu = Settings.getString("menu", "navigator").toLowerCase();
    if (menu == "basic") {
        showBasicMenu();
    } else if (menu == "cater") {
        showCaterMenu();
    } else if (menu == "epic") {
        showEpicMenu();
    } else {
        showNavigatorMenu();
    }

}

function menuBtnAnimation(currentAlpha) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            new android.os.Handler().postDelayed(new java.lang.Runnable({
                run: function() {
                    menuBtn.getBackground().setAlpha(currentAlpha);
                    menuBtn.setTextColor(menuBtn.getTextColors().withAlpha(currentAlpha));
                    if (currentAlpha != 0) {
                        currentAlpha = Math.max(0, currentAlpha - 4);
                        menuBtnAnimation(currentAlpha);
                    }

                }
            }), 10);
        }
    }))
}

function showMenuBtn() {

    menuBtn = new android.widget.Button(ctx);
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var bg = new android.graphics.drawable.GradientDrawable();
                bg.setStroke(2, getColorAHEXFromARGB(255, 0, 0, 0));
                bg.setColor(getColorAHEXFromARGB(130, 200, 202, 200));
                bg.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                menuBtn.setText("SummitPE");
                menuBtn.setTextSize(12);
                menuBtn.setPadding(10, 10, 10, 10);
                menuBtn.setCompoundDrawablesWithIntrinsicBounds(0, android.R.drawable.ic_menu_info_details, 0, 0);
                menuBtn.setTextColor(android.graphics.Color.BLACK);
                menuBtn.setTypeface(Utils.font);
                menuBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(viewarg) {
                        showMenu();
                        GUI.dismiss();
                        GUI = null;
                    }
                }));
                menuBtn.setOnTouchListener(new android.view.View.OnTouchListener({
                    onTouch: function(view, motionEvent) {
                        try {
                            if (!moving) {
                                return false
                            };
                            switch (motionEvent.getAction()) {
                                case android.view.MotionEvent.ACTION_DOWN:
                                    dx = mPosX - motionEvent.getRawX();
                                    dy = mPosY - motionEvent.getRawY();
                                    break;
                                case android.view.MotionEvent.ACTION_MOVE:
                                    mPosX = (motionEvent.getRawX() + dx) - 60;
                                    mPosY = (motionEvent.getRawY() + dy) - 45;
                                    GUI.update(mPosX, mPosY, -1, -1);
                                    break;
                                case android.view.MotionEvent.ACTION_UP:
                                case android.view.MotionEvent.ACTION_CANCEL:
                                    moving = false;
                                    break
                            }
                        } catch (e) {
                            print("Error: " + e)
                        };
                        return true
                    }
                }));
                menuBtn.setOnLongClickListener(new android.view.View.OnLongClickListener({
                    onLongClick: function(v, t) {
                        ctx.getSystemService(android.content.Context.VIBRATOR_SERVICE)
                            .vibrate(60);
                        moving = true;
                        return true;
                    }
                }));
                menuBtn.setBackground(bg);
                if (GUI != null && GUI.isShowing()) GUI.dismiss();
                GUI = new android.widget.PopupWindow(menuBtn, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
                GUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                GUI.showAtLocation(ctx.getWindow()
                    .getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, mPosX, mPosY);
                if (SummitPE.ghostMode)
                    menuBtnAnimation(250);
            } catch (err) {
                SummitPE.ctoast(err);
            }
        }
    }));
}
showMenuBtn();

function rptask() {
    var t = new java.lang.Thread(new java.lang.Runnable({
        run: function() {

            while (true) {
                //Timings.resetData();
                var randString = "";

                if (SummitPE.modi && tick1 % 25 == 0) {
                    for (var i = 0; i < 30; i++) randString += String.fromCharCode(Math.floor(Math.random() * 255));
                    if (tick1 % 5 == 0) {
                        setVelX(getPlayerEnt(), Math.random() * 2 - 1);
                        setVelY(getPlayerEnt(), Math.random() - 0.5);
                        setVelZ(getPlayerEnt(), Math.random() * 2 - 1);

                    }
                    Entity.setRot(getPlayerEnt(), getYaw() + 6, 45 * Math.sin(getYaw() / 45));
                    if (tick1 % 25 == 0 && getPlayerEnt() != 0 && getPlayerEnt() != -1)
                        Level.explode(getPlayerX(), getPlayerY(), getPlayerZ(), 5);
                    ModPE.langEdit("gui.back", randString);
                    ModPE.langEdit("gui.toMenu", randString);
                    ModPE.langEdit("menu.returnToGame", randString);
                    ModPE.langEdit("menu.returnToMenu", randString);
                    ModPE.langEdit("pauseScreen.back", randString);
                    ModPE.langEdit("pauseScreen.header", randString);
                    ModPE.langEdit("pauseScreen.options", randString);
                    ModPE.langEdit("pauseScreen.quit", randString);
                    ModPE.langEdit("pauseScreen.invite", randString);
                    ModPE.langEdit("playscreen.new", randString);
                }
                Timings.startTiming("onTick");
                if (SummitPE.inGame) {
                    SummitPE.mods.forEach(function(entry, index, array) {
                        try {
                            if (entry.hasOwnProperty("onTick") && (entry.state || entry.isStateMode() == false || entry.isTickState)) entry.onTick();
                        } catch (e) {
                            if (SummitPE.isDev) SummitPE.ctoast("Error onTick(#" + e.lineNumber + "): " + e);
                        }
                    });
                }
                Timings.stopTiming("onTick");
                if (Utils.Render.initted)
                    Utils.Render.glSurface.requestRender();
                Timings.startTiming("misc");
                if (SummitPE.inGame == true && Player.getEntity() != -1 && getPlayerEnt() != 0) {
                    if (Utils.Player.onGround()) Utils.flyTick = 0;
                    else Utils.flyTick++;
                    Utils.Vel.lastX = Entity.getVelX(Player.getEntity());
                    Utils.Vel.lastY = Entity.getVelY(Player.getEntity());
                    Utils.Vel.lastZ = Entity.getVelZ(Player.getEntity());

                    Utils.Pos.lastX = getPlayerX();
                    Utils.Pos.lastY = getPlayerY();
                    Utils.Pos.lastZ = getPlayerZ();
                }

                if (SummitPE.getMetersScrolled() >= 1000 && !SummitPE.finishedScroll) {
                    SummitPE.finishedScroll = true;
                    editor.putBoolean("SummitPE.egg.finishedScroll", true);
                    editor.commit();
                    SummitPE.ctoast("Achievement get: Scroll 1 km", true, android.R.drawable.star_big_off);
                }
                Timings.stopTiming("misc");
                tick1++;
                if (tick1 > 50) tick1 = 0;


                if (tick1 % 10 == 0) {
                    Timings.startTiming("workaround");
                    ctx.runOnUiThread(new java.lang.Runnable({
                        run: function() {

                            if ((GUI != null && GUI.isShowing()) && (menu != null && menu.isShowing())) GUI.dismiss();
                            if ((GUI == null || !GUI.isShowing()) &&
                                (GUIe == null || !GUIe.isShowing()) &&
                                (menu == null || !menu.isShowing()) &&
                                (dialog == null || !dialog.isShowing()) &&
                                (aboard == null || !aboard.isShowing()) &&
                                (settingDialog == null || !settingDialog.isShowing()) &&
                                (updatemgrDialog == null || !updatemgrDialog.isShowing()) &&
                                (aboutDialog == null || !aboutDialog.isShowing()) &&
                                (webbrowser.browser == null || !webbrowser.browser.isShowing())) {
                                showMenuBtn();
                            }
                            if (SummitPE.modi == undefined &&
                                ((GUI != null && GUI.isShowing() == true && menuBtn != null && (menuBtn.getText() != "DragOP" && menuBtn.getText() != "SummitPE")) || (typeof SummitPE == undefined))) {

                                SummitPE.modi = true;
                                if (!SummitPE.finishedBreak) {
                                    SummitPE.finishedBreak = true;
                                    //editor.putBoolean("SummitPE.egg.finishedBreak", true);
                                    //editor.commit();
                                    SummitPE.ctoast("Achievement get: Break SummitPE", true, android.R.drawable.star_big_off);
                                }
                            }
                            if (SummitPE.modi && menu != null && menu.isShowing()) {
                                mDismiss();
                            }
                            /* if (SummitPE.modi && tick1 % 2 == 0 && getPlayerEnt() != 0 && getPlayerEnt() != -1 && menuBtn != null && GUI != null && GUI.isShowing()) {
                                menuBtn.setBackgroundColor(android.graphics.Color.rgb(Math.random() * 200, Math.random() * 200, Math.random() * 200));
                                menuBtn.setText(randString);
                            } */

                        }
                    }));
                    Timings.stopTiming("workaround");
                }
                java.lang.Thread.sleep(20);
            }
        }
    }));
    t.start();
}

rptask();
SummitPE.loadModsAnim(0);

function newLevel() {
    SummitPE.inGame = true;
}

function leaveGame() {
    Utils.Entity.allEntitys = new Array();
    SummitPE.inGame = false;
}

function chatHook(text) {

    if (text.charAt(0) == Settings.getString("command_prefix", ".") && Settings.getBoolean("enable_commands", true) == true && !CommandManager.isBlacklisted(text.substring(1, text.length))) {
        preventDefault();

        try {
            com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                .updateTextboxText("");
            com.mojang.minecraftpe.MainActivity.currentMainActivity.get()
                .nativeSetTextboxText("");

        } catch (e) {
            //Not-BlockLauncher-Error
        }
        CommandManager.onCommand(text.substring(1, text.length));
    } else {
        SummitPE.mods.forEach(function(entry, index, array) {
            try {
                if (entry.hasOwnProperty("onChatHook") && (entry.state || entry.isStateMode() == false)) entry.onChatHook(text);
            } catch (e) {
                if (SummitPE.isDev) SummitPE.ctoast("Error onChatHook(#" + e.lineNumber + "): " + e);
            }
        });
    }
}
this.Item.getEnchantType = function(id) {
    if (id == 340) return 0;
    if (Item.getUseAnimation(id) == UseAnimation.bow) return 1;
    if (id == 258 || id == 271 || id == 275 || id == 279 || id == 286) return 2;
    if (id == 290 || id == 291 || id == 292 || id == 293 || id == 294) return 2;
    if (id == 257 || id == 270 || id == 274 || id == 278 || id == 285) return 2;
    if (id == 256 || id == 269 || id == 273 || id == 277 || id == 284) return 2;
    if (id == 359 || id == 259) return 2;
    if (id == 267 || id == 268 || id == 272 || id == 276 || id == 283) return 3;
    if (id >= 298 && id <= 317) return 4;
    if (id == 346) return 5;
};

function attackHook(att, vic) {

    SummitPE.mods.forEach(function(entry, index, array) {
        try {
            if (entry.hasOwnProperty("onAttack") && (entry.state || entry.isStateMode() == false)) entry.onAttack(att, vic);
        } catch (e) {
            if (SummitPE.isDev) SummitPE.ctoast("Error onAttack(#" + e.lineNumber + "): " + e);
        }

    });
}

function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
    SummitPE.mods.forEach(function(entry, index, array) {
        try {
            if (entry.hasOwnProperty("onUseItem") && (entry.state || entry.isStateMode() == false)) entry.onUseItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage);
        } catch (e) {
            if (SummitPE.isDev) SummitPE.ctoast("Error onUseItem(#" + e.lineNumber + "): " + e);
        }

    });

}

//it is fix lag
if (!Launcher.isToolbox()) {

    function entityAddedHook(ent) {
        if (Entity.getMobSkin(ent) != "mob/char.png") Utils.Entity.allEntitys.push(ent);
        else Utils.Entity.charEnts.push(ent);

        SummitPE.mods.forEach(function(entry, index, array) {
            try {
                if (entry.hasOwnProperty("onEntityAdd") && (entry.state || entry.isStateMode() == false)) entry.onEntityAdd(ent);
            } catch (e) {
                if (SummitPE.isDev) SummitPE.ctoast("Error onEntityAdd(#" + e.lineNumber + "): " + e);
            }

        });
    }

    function entityRemovedHook(ent) {
        Utils.Entity.charEnts.forEach(function(entry, index, array) {
            if (entry == ent) Utils.Entity.charEnts.splice(index, 1);

        });
        Utils.Entity.allEntitys.forEach(function(entry, index, array) {
            if (entry == ent) Utils.Entity.allEntitys.splice(index, 1);

        });

        SummitPE.mods.forEach(function(entry, index, array) {
            try {
                if (entry.hasOwnProperty("onEntityRemove") && (entry.state || entry.isStateMode() == false)) entry.onEntityRemove(ent);
            } catch (e) {
                if (SummitPE.isDev) SummitPE.ctoast("Error onEntityRemove(#" + e.lineNumber + "): " + e);
            }

        });
    }

}

function entityHurtHook(att, vic, hearts) {
    /* SummitPE.mods.forEach(function (entry, index, array) {
    	try {
    		if(entry.hasOwnProperty("onHurt") && (entry.state || entry.isStateMode() == false)) entry.onHurt(att, vic, hearts);
    	} catch(e) {
    	    if(SummitPE.isDev) SummitPE.ctoast("Error onHurt(#" + e.lineNumber + "): " + e);
    	}

    }); */
    //lag fixed!

    try {
        velocity.onHurt(att, vic, hearts);
    } catch (e) {
        if (SummitPE.isDev) SummitPE.ctoast("Error onHurtFix(#" + e.lineNumber + "): " + e);
    }
}

function modTick() {
    SummitPE.mods.forEach(function(entry, index, array) {
        try {
            if (entry.hasOwnProperty("onModTick") && (entry.state || entry.isStateMode() == false)) entry.onModTick();
        } catch (e) {
            if (SummitPE.isDev) SummitPE.ctoast("Error onModTick(#" + e.lineNumber + "): " + e);
        }

    });

    if (Server.getAddress()) SummitPE.inGame = true;
}

function screenChangeHook(screen) {
    if (screen.toString().indexOf("progress_screen") > -1 && !Utils.Render.initted)
        Utils.Render.init();
    //if(SummitPE.isDev) SummitPE.ctoast(screen);
    Utils.currentScreen = screen;
	
	if (screen == "enchanting_screen") { //code from Ambien
        if (autoEnchantInET == true) {
            for (i = 0; i < 9; i++) {
                if (Player.getInventorySlot(i) == "276") {
                    Player.enchant(i, Enchantment.SHARPNESS, 10000);
                    Player.setItemCustomName(i, "§aOneHit");
                    autoEnchantInET = false;
                }
            }
        }
    }
}
