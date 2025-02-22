/*
 Автор: STALKER_2010
 */
var version = "0.5";
var height = 15;
var diff = 0;
var generated = false;
var up = true;
var roof = (2 + height + 1);
var floor = 2;
var nr = 87;
var obs = 49;
var lava = 10;
function useItem(x, y, z, itemId, blockId, side) {
    if (itemId != 259) return; // Зажигалка
    if (blockId != obs) return; // Обсидиан
    preventDefault();
	check();
	if (!checkPortal(x, y, z))
	{
		clientMessage("Портал построен неверно");
		return;
	}
	if (!generated)
	{
		clientMessage("Ад не сгенерирован!");
		return;
	}
	var spawn;
	if (up)
	{
		spawn = getFloor(Player.getX(), Player.getZ(), false);
		clientMessage("Телепортировано в ад!");
	}
	else
	{
		spawn = getFloor(Player.getX(), Player.getZ(), true);
		clientMessage("Телепортировано в обычный мир!");
	}
	setPosition(Player.getEntity(), Player.getX(), spawn + 1, Player.getZ());
}
function procCmd(cmd) {
	var c = cmd.split(" ");
	if (c[0] != "hell") return;
	if (c[1] == "generate")
	{
		if (checkHell())
		{
			clientMessage("Ад уже сгенерирован!");
			return;
		}
		generateHell();
		check();
	}
	else if (c[1] == "state")
	{
		check();
		clientMessage((generated) ? "Ад сгенерирован!" : "Ад отсутствует!");
	}
	else if (c[1] == "about")
	{
		clientMessage("Hell Script");
		clientMessage("Версия " + version);
		clientMessage("Автор: STALKER_2010");
		clientMessage("Скрипт добавляет ад из ПК версии игры.");
		clientMessage("Портал в ширину 3 блока, а не 4.");
		clientMessage("Углы у портала необязательны.");
		clientMessage("Не активируйте портал без");
		clientMessage("генерации ада!");
		clientMessage("Для получения списка комманд введите");
		clientMessage(" /hell help");
	}
	else if (c[1] == "help")
	{
		clientMessage("Перед всеми коммандами ставится /hell!");
		clientMessage("Список комманд:");
		clientMessage("+ generate - генерирует ад");
		clientMessage("+ state - показать наличие ада");
		clientMessage("+ help - справка по коммандам");
		clientMessage("+ about - о скрипте");
		clientMessage("Пример комманды:");
		clientMessage(" /hell generate");
	}
}
function check() {
	generated = checkHell();
	if (generated) up = (Player.getY() > roof);
}
function checkHell() {
	if (getTile(1, roof, 1) == nr) return true;
	return false;
}
function generateHell() {
    print("Начинаем генерировать... Ждите");
    // Очистка пространства для ада
	cleanHell();
    print("35%");
    // Потолок ада
    generateRoof();
    print("40%");
    // Пол ада
    generateFloor();
    print("45%");
	//Нормализуем террейн
	normalizeHell();
    print("70%");
    // Генерация гор
    for (var i = 0;i < 72; i++)
	{
        generateHill(random(16, 240), random(8, (roof - 3)), random(16, 240));
    }
    print("90%");
    // Генерация лавы
    makeLava();
    print("95%");
    // Подготовка спавна
    var spawn = getFloor(Player.getX(), Player.getZ(), false) - 1;
    cleanSpawn(Player.getX(), spawn, Player.getZ());
    setTile(Player.getX() + 1, spawn, Player.getZ(), obs, 0);
    clientMessage("Генерация успешно завершена!");
	check();
}
function generateRoof() {
    var x, z;
    // Адский камень(потолок)
    // X
    for (x = 1;x < 256; x++)
	{ 
        // Z
        for (z = 1;z < 256; z++)
		{
            setTile(x, roof, z, nr, 0);
        }
    }
}
function generateFloor() {
    var x, z;
    // Адский камень
    // X
    for (x = 1;x < 256; x++)
	{ 
        // Z
        for (z = 1;z < 256; z++)
		{
            setTile(x, floor, z, nr, 0);
        }
    }
    // Бедрок
    // X
    for (x = 1;x < 256; x++)
	{ 
        // Z
        for (z = 1;z < 256; z++)
		{
            setTile(x, 1, z, 7, 0);
        }
    }
}
function cleanHell() {
	var x, y, z;
    for (y = roof - 1;y > floor; y--)
	{
        // X
        for (x = 2;x < 256; x++)
		{ 
            // Z
            for (z = 2;z < 256; z++)
			{
                setTile(x, y, z, 0, 0);
            }
        }
    }
}
function getFloor(x, z, _up) {
    var i = 4;
    if (_up)
	{
        i = roof + 1;
        for (i; i < 128; i++)
		{
            if (getTile(x, i, z) == 0)  return i + diff;
        }
    }
	else
	{
        i = floor;
        for (i; i < roof - 3; i++)
		{
            if (getTile(x, i, z) == 0) return i;
        }
    }
    return 4;
}
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateHill(up_x, up_y, up_z) {
    var x, y, z, tall, direction;
    tall = 3;
    // Слои горы
    for (y = up_y;y > floor;y--)
	{
        direction = (tall - 1) / 2;
        // X
        for (x = (up_x - direction);x <= (up_x + direction); x++)
		{ 
            // Z
            for (z = (up_z - direction);z <= (up_z + direction); z++)
			{
                setTile(x, y, z, nr, 0);
            }
        }
        tall += 2;
    }
}
function makeLava() {
    for (var i = 0;i < 72; i++)
	{
        var x = random(16, 240);
        var z = random(16, 240);
        if (getTile(x, roof, z) == 87)
            setTile(x, roof, z, lava, 0);
    } 
}
function spawnPigZombies() {
    for (var i = 0;i < 36; i++)
	{
		var x = random(16, 240);
		var z = random(16, 240);
		var y = getFloor(x, z, false);
		spawnPigZombie(x, y, z, "mob/pigzombie.png");
    }
}
function cleanSpawn(x, y, z) {
    var _x, _y, _z;
    var _size = 2;
    //Y
    for (_y = roof - 1; _y >= y; _y--)
	{
        // X
        for (_x = (x - _size); _x <= (x + _size); _x++)
		{ 
            // Z
            for (_z = (z - _size); _z <= (z + _size); _z++)
			{
                setTile(_x, _y, _z, 0, 0);
            }
        }
    }
}
//-------------[CHECK PORTAL]---------------
function checkPortal(x, y, z) {
	if (
		(cpb(x + 1, y + 1, z) && cpb(x + 1, y + 2, z) && cpb(x, y + 3, z) && cpb(x - 1, y + 2, z) && cpb(x - 1, y + 1, z))
		||
		(cpb(x, y + 1, z + 1) && cpb(x, y + 2, z + 1) && cpb(x, y + 3, z) && cpb(x, y + 2, z - 1) && cpb(x, y + 1, z - 1))
		) return true;
	return false;
}
function cpb(x, y, z) {
	if (getTile(x, y, z) == obs) return true;
	return false;
}
//------------[NORMALIZE HELL]-------------
function normalizeHell() {
	print("Генерируем Random");
	generateRand();
	print("Сглаживаем");
	for (var i = 0; i < 1;i++)
	{
		var x, z, h;
		// X
		for (x = 4;x < 254; x++)
		{ 
			// Z
			for (z = 4;z < 254; z++)
			{
				h = (getRow(x, z + 1) + getRow(x, z) + getRow(x, z - 1)) / 9;
				generateColumn(x, h, z);
			}
		}
	}
}
function generateRand() {
	var x, z;
	var max_y = 8;
	// X
	for (x = 3;x < 256; x++)
	{ 
		// Z
		for (z = 3;z < 256; z++)
		{
			generateColumn(x, random(5, max_y), z);
		}
	}
}
function getRow(x, z) {
	return (getFloor(x - 1, z, false) + getFloor(x, z, false) + getFloor(x + 1, z, false) - 3);
}
function generateColumn(x, y, z) {
	var _y = y;
	for (_y; _y < (roof - 1); _y++) setTile(x, _y, z, 0, 0);
	for (_y = y; _y > floor; _y--) setTile(x, _y, z, nr, 0);
}
