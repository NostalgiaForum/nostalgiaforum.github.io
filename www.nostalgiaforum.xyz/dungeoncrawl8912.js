/*
 * Dungeon Crawl
 *
 * Copyright (C) 2014 Tee7even
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

ModPE.setItem(500,"map_filled",0,"Fire Scroll");
ModPE.setItem(501,"map_filled",0,"Poisonous Scroll");
ModPE.setItem(502,"map_filled",0,"Healing Scroll");

ModPE.setItem(511,"name_tag", 0, "Key");

Block.defineBlock(175,"gravedirt","dirt",0,0,0);

var menu, exitUI;

var slimeRenderer = Renderer.createHumanoidRenderer();
addSlimeToRenderer(slimeRenderer);

function addSlimeToRenderer(renderer)
{
	var model = renderer.getModel(),
		body = model.getPart("body").clear().setTextureOffset(64, 32);
	
	body.addBox(0, 0, 0, 16, 16, 16, 0);
	
	model.getPart("rightArm").clear();
	model.getPart("leftArm").clear();
	model.getPart("leftLeg").clear();
	model.getPart("rightLeg").clear();
	model.getPart("head").clear();
}

var hi = 40,
	difficulty = 0,
	boss = 0,
	mboss = 0,
	teleport = -1,
	fireball = -1,
	ball = {ent: 0, cnt: 0, x: 0, y: 0, z:0};
	
var items =
[
	//food
	{id: 282, diff: 1, max:1, name: 'Mushroom Stew', cost: 5},
	{id: 366, diff: 1, max:1, name: 'Chicken', cost: 5},
	{id: 393, diff: 3, max:1, name: 'Potato', cost: 5},
	{id: 297, diff: 6, max:1, name: 'Bread', cost: 5},
	{id: 260, diff: 9, max:2, name: 'Apple', cost: 5},
	{id: 360, diff: 12, max:3, name: 'Melon', cost: 5},
	//weapons
	{id: 261, diff: 1, max:1, name: 'Bow', cost: 10},
	{id: 283, diff: 1, max:1, name: 'Golden Sword', cost: 10},
	{id: 268, diff: 3, max:1, name: 'Wooden Sword', cost: 10},
	{id: 272, diff: 6, max:1, name: 'Stone Sword', cost: 15},
	{id: 267, diff: 9, max:1, name: 'Iron Sword', cost: 25},
	{id: 276, diff: 12, max:1, name: 'Diamond Sword', cost: 30},
	//boots
	{id: 301, diff: 1, max:1, name: 'Leather Boots', cost: 3},
	{id: 317, diff: 3, max:1, name: 'Golden Boots', cost: 3},
	{id: 305, diff: 6, max:1, name: 'Chain Boots', cost: 4},
	{id: 309, diff: 9, max:1, name: 'Iron Boots', cost: 4},
	{id: 313, diff: 12, max:1, name: 'Diamond Boots', cost: 5},
	//helmets
	{id: 298, diff: 1, max:1, name: 'Leather Helmet', cost: 3},
	{id: 314, diff: 3, max:1, name: 'Golden Helmet', cost: 3},
	{id: 302, diff: 6, max:1, name: 'Chain Helmet', cost: 4},
	{id: 306, diff: 9, max:1, name: 'Iron Helmet', cost: 4},
	{id: 310, diff: 12, max:1, name: 'Diamond Helmet', cost: 5},
	//leggins
	{id: 300, diff: 1, max:1, name: 'Leather Leggins', cost: 3},
	{id: 316, diff: 3, max:1, name: 'Golden Leggins', cost: 3},
	{id: 304, diff: 6, max:1, name: 'Chain Leggins', cost: 4},
	{id: 308, diff: 9, max:1, name: 'Iron Leggins', cost: 4},
	{id: 312, diff: 12, max:1, name: 'Diamond Leggins', cost: 5},
	//chestplates
	{id: 299, diff: 1, max:1, name: 'Leather Chestplate', cost: 3},
	{id: 315, diff: 3, max:1, name: 'Golden Chestplate', cost: 3},
	{id: 303, diff: 6, max:1, name: 'Chain Chestplate', cost: 4},
	{id: 307, diff: 9, max:1, name: 'Iron Chestplate', cost: 4},
	{id: 311, diff: 12, max:1, name: 'Diamond Chestplate', cost: 5},
	//scrolls
	{id: 500, diff: 1, max:1, name: 'Fire Scroll', cost: 10},
	{id: 501, diff: 1, max:1, name: 'Poisonous Scroll', cost: 10},
	{id: 502, diff: 1, max:1, name: 'Healing Scroll', cost: 10},
	//various items
	{id: 264, diff: 1, max:10, name: 'Diamonds', cost: 10},
	{id: 50, diff: 1, max:10, name: 'Torch', cost: 5},
	{id: 262, diff: 1, max:10, name: 'Arrows', cost: 5}
];

var arena =
{
	str:
	"###############################################"+
	"#############.....................#############"+
	"############.......................############"+
	"############.......................############"+
	"#......#####.......................#####......#"+
	"#..<...#####.......................#####......#"+
	"#......#####.......................#####S.....#"+
	"#......#####.......................#####......#"+
	"#......#####.......................#####......#"+
	"#......#...#.......................#...#......#"+
	"#..........D.......................L..........#"+
	"#......#...#.......................#...#......#"+
	"#......#####.......................#####......#"+
	"#......#####.......................#####......#"+
	"#......#####.......................#####......#"+
	"#......#####.......................#####...>..#"+
	"#......#####.......................#####......#"+
	"############.......................############"+
	"############.......................############"+
	"#############.....................#############"+
	"###############################################",
	width: 47,
	height: 21
};

var options = 
{
	size: { x: 128, y: 128 },
    minRoomSize: { x: 8, y: 8 },
    maxRoomSize: { x: 16, y: 16 },
    maxRooms: 24,
	roomTypes: [0.50,0.3,0.18, 0.02]//Вероятность
};

function dip2px(dips)
{
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function getRandom(low, high)
{
	return ~~(Math.random() * (high - low)) + low;
}

function getRandomElement(array) 
{
	if(!array || !array.length)
		return null;

    var start = 0,
		end = array.length;

	return array[getRandom(start, end)];
}

function distance(pos1, pos2)
{
	var dx = Math.abs(pos1.x - pos2.x);
	var dy = Math.abs(pos1.y - pos2.y);
	return Math.max(dx, dy);
}

function blankMap()
{
	var map = [];
    for(var x = 0; x < options.size.x; x++)
	{
        map[x] = [];
        for(var y = 0; y < options.size.y; y++)
		{
            map[x][y] = 'empty';
		}
	}
	return map;
}

function generateArena()
{
	var map = blankMap();
	
	var width = arena.width,
		height = arena.height;
	
	for (var x=0;x<width;x++)
	{
		for (var y=0;y<height;y++)
		{
			var char = arena.str.charAt(width*y + x);
			switch(char)
			{
				case '#':
					map[x][y] = 'wall';
					break;
				case '.':
					map[x][y] = 'floor';
					break;
				case 'D':
					map[x][y] = 'door';
					break;
				case 'L':
					map[x][y] = 'locked';
					break;
				case 'S':
					map[x][y] = 'shop';
					break;
				case '<':
					map[x][y] = 'enter';
					break;
				case '>':
					map[x][y] = 'exit';
					break;
			}
		}
	}
	
	return map;
}

function Room() 
{
    this.type = 0;
	this.position = { x: 0, y: 0 };
	this.size = { x: 0, y: 0 };
	this.tiles = [];
	this.walls = [];
}

var Dungeon =//Dungeon Generator
{
    generate:function()
	{
		print('Generating Map...');
        var map = blankMap(),
			rooms = this.generateRooms(map);
		
		this.placeStairs(map, rooms);

        return map;
    },
	
	generateRooms: function(map)
	{
		print('Generating Rooms...');
		var rooms = [this.generateRoom()];
        this.placeRoom(map, rooms[0],(options.size.x / 2) - (rooms[0].size.x / 2),(options.size.y / 2) - (rooms[0].size.y / 2));

        var area = options.size.x * options.size.y,
            roomPos = { x: 0, y: 0 };

        for(var i = 0; i < area; i++)
		{
            if(rooms.length === options.maxRooms)
                break;

            var wall = this.getRandomWall(rooms),
                direction = wall.dir;

            var room = this.generateRoom();

            roomPos.x = 0;
            roomPos.y = 0;

            switch(direction)
			{
                case 1:
                    roomPos.x = wall.x - (room.size.x / 2);
                    roomPos.y = wall.y - room.size.y;
                    break;

                case 2:
                    roomPos.x = wall.x - (room.size.x / 2);
                    roomPos.y = wall.y + 1;
                    break;

                case 3:
                    roomPos.x = wall.x - room.size.x;
                    roomPos.y = wall.y - (room.size.y / 2);
                    break;
				
				case 4:
                    roomPos.x = wall.x + 1;
                    roomPos.y = wall.y - (room.size.y / 2);
                    break;
            }

            roomPos.x = ~~roomPos.x;
            roomPos.y = ~~roomPos.y;

            if(this.freeSpace(map, room, roomPos)) 
			{
                rooms.push(room);
                this.placeRoom(map, room, roomPos.x, roomPos.y);
                this.connectRooms(map, wall);
            }
        }
		
		return rooms;
	},
	
	placeStairs: function(map, rooms)
	{
		var roomarr = rooms.filter(function(a){/* only normal rooms */
			return a.type === 0;
			});
		roomarr.sort(function(a,b){ /* find closest to 0,0 */
			return distance({x:a.position.x, y:a.position.y}, {x: 0, y: 0}) - distance({x:b.position.x, y:b.position.y}, {x: 0, y: 0});
			});
		var position = this.getCenter(roomarr[0]);
		map[position.x][position.y] = 'enter';
		
		position = this.getCenter(roomarr[roomarr.length - 1]);
		map[position.x][position.y] = 'exit';
	},
	
    generateRoom: function() 
	{
        var room = new Room(),
            sx = room.size.x = getRandom(options.minRoomSize.x, options.maxRoomSize.x),
            sy = room.size.y = getRandom(options.minRoomSize.y, options.maxRoomSize.y),
            tiles = room.tiles,
            walls = room.walls,
            col;
			
		var	roomtype,
			roomtypes = options.roomTypes,
			q = [roomtypes[0] * roomtypes.length],
			ch = getRandom(0, roomtypes.length+1);
		for(var i = 0; i < roomtypes.length; i++)
		{
			if(q[i] >= ch)
			{
				roomtype = room.type = i;
				break;
			}
			q[i+1] = q[i] + (roomtypes[i+1] * roomtypes.length);
		}
			
        for(var x = 0; x < sx; x++) 
		{
            tiles.push(col = []);
            for(var y = 0; y < sy; y++) 
			{
                if(x === 0 || x === sx - 1 || y === 0 || y === sy - 1) 
				{
                    var tile = 'wall',
                        dir = 0;

                    if(y !== 0 && y !== sy - 1)
					{
                        if(x === 0)
						{
                            dir = 3;//west
                        }
						else if(x === sx - 1)
						{
                            dir = 4;//east
                        }
                    }
					else if(x !== 0 && x !== sx - 1)
					{
                        if(y === 0)
						{
                            dir = 1;//north
                        }
						else if(y === sy - 1)
						{
                            dir = 2;//south
                        }
                    }

                    walls.push({ x: x, y: y, dir: dir});
                    col.push(tile);
                }
				else
				{
					if(roomtype === 1)
						col.push('wood');
					else
						col.push('floor');
                }
            }
        }
        
		var tx, ty;
        
        if(roomtype === 2)
		{
			var web = Math.floor(sx * sy / 5);
			for(var i; i < web; i++)
			{
				tx = getRandom(1, sx - 1),
				ty = getRandom(1, sy - 1);
				tiles[tx][ty] = 'cobweb';
			}
		}
		
		if(roomtype === 3)
		{
			tx = Math.floor(sx / 2),
			ty = Math.floor(sy / 2);
			tiles[tx][ty] = 'grave';
		}
        
		if(roomtype === 1||roomtype === 2)
		{
			tx = Math.floor(sx / 2),
			ty = Math.floor(sy / 2);
			tiles[tx][ty] = 'chest';
		}

        return room;
    },
	
    placeRoom:function(map, room, px, py) 
	{
        px = ~~px;
        py = ~~py;
		
		room.position.x = px;
        room.position.y = py;

        var tx = 0,
            ty = 0;

        for(var x = px; x < (px + room.size.x); x++)
		{
            for(var y = py; y < (py + room.size.y); y++)
			{
                map[x][y] = room.tiles[tx][ty];
                ty++;
            }
            tx++;
            ty = 0;
        }
    },
	
    getRandomWall: function(rooms)
	{
        var room = getRandomElement(rooms),
            wall = getRandomElement(room.walls.filter(function(v) { return v.dir!==0; }));

        return { x: wall.x + room.position.x, y: wall.y + room.position.y, dir: wall.dir };
    },
	
	getCenter: function(room)
	{
		var tx = Math.floor(room.position.x + room.size.x / 2),
			ty = Math.floor(room.position.y + room.size.y / 2);
		
		return {x: tx, y: ty};
	},
	
    freeSpace: function(map, room, roomPos)
	{
        var tx = roomPos.x + room.size.x,
            ty = roomPos.y + room.size.y;

        if(roomPos.x < 0 || tx > options.size.x)
            return false;

        if(roomPos.y < 0 || ty > options.size.y)
            return false;

        for(var x = roomPos.x; x < tx; x++)
		{
            for(var y = roomPos.y; y < ty; y++)
			{
                if(map[x][y] !== 'empty')
				{
                    return false;
                }
            }
        }

        return true;
    },
	
    connectRooms: function(map, wall)
	{
        switch(wall.dir)
		{
            case 1://north
                map[wall.x][wall.y] = 'door';
				map[wall.x][wall.y - 1] = 'door';
                break;
            case 2://south
                map[wall.x][wall.y] = 'door';
				map[wall.x][wall.y + 1] = 'door';
                break;
            case 3://west
				map[wall.x][wall.y] = 'door';
                map[wall.x - 1][wall.y] = 'door';
                break;
			case 4://east
				map[wall.x][wall.y] = 'door';
                map[wall.x + 1][wall.y] = 'door';
                break;
        }
    }
};

function buildMap(map, height) 
{
    print('Building Map...');
	var xl = map.length,
        yl = map[0].length;

	
	for(var x = 0; x < xl; x++)
	{
        for(var y = 0; y < yl; y++)
		{
			if(map[x][y]==='empty') continue;
			
			for(var hi=0;hi<4;hi++)
			{
				setTile(x, height+hi, y, 0);
			}
		}
	}
    
    for(var x = 0; x < xl; x++)
	{
        for(var y = 0; y < yl; y++)
		{
            var tile = map[x][y];
			
			if(tile==='empty') continue;
			
			switch(tile)
			{
				case 'wall':
					for(var hi=0;hi<4;hi++)
					{
						setTile(x, height+hi, y, 98, getRandom(0,2));
					}
					break;
				case 'door':
					setTile(x, height, y, 42);
					setTile(x, height+1, y, 101);
					setTile(x, height+2, y, 101);
					setTile(x, height+3, y, 98, getRandom(0,2));
					setTile(x, height+4, y, 98, getRandom(0,2));
					break;
				case 'locked':
					setTile(x, height+1, y, 85);
					setTile(x, height+2, y, 85);
					setTile(x, height, y, 98, getRandom(0,2));
					setTile(x, height+3, y, 98, getRandom(0,2));
					setTile(x, height+4, y, 98, getRandom(0,2));
					break;
				case 'floor':
					setTile(x, height, y, 98, getRandom(0,2));
					setTile(x, height+4, y, 98, getRandom(0,2));
					break
				case 'wood':
					setTile(x, height, y, 5);
					setTile(x, height+4, y, 98, getRandom(0,2));
					break;
				case 'cobweb':
					setTile(x, height, y, 98);
					setTile(x, height+1, y, 30);
					setTile(x, height+4, y, 98, getRandom(0,2));
					break;
				case 'shop':
					setTile(x, height, y, 98, getRandom(0,2));
					setTile(x, height+4, y, 98, getRandom(0,2));
					
					for(var xi = 0; xi < 6; xi++)
					{
						setTile(x+xi, height+1, y, 5);
						setTile(x+xi, height+2, y, 171);
					}
					
					setTile(x, height+1, y-2, 58);
					setTile(x+1, height+1, y-2, 61);
					setTile(x+2, height+1, y-2, 245);
					setTile(x+3, height+1, y-2, 54);
					setTile(x+4, height+1, y-2, 54);
					setTile(x+5, height+1, y-2, 43);
					
					setTile(x, height+3, y-2, 50);
					setTile(x+5, height+3, y-2, 50);
					
					setTile(x, height+1, y+1, 63);
					Level.setSignText(x, height+1, y+1, 1, 'Tap the carpet');
					Level.setSignText(x, height+1, y+1, 2, 'to open shop menu');
					
					var shopk = Level.spawnMob(x+1,height+1,y-1,11,"mob/char.png");
					Entity.setRenderType(shopk,3);
					Entity.setNameTag(shopk, "Shopkeeper");
					break;
				case 'chest':
					setTile(x, height, y, 98, getRandom(0,2));
					setTile(x, height+1, y, 54);
					setTile(x, height+4, y, 98, getRandom(0,2));
					var count = getRandom(1, 6);
					for(var i=0;i<count;i++)
					{
						var itemlist = [], item;
						for(var l=0;l<items.length;l++)
						{
							item = items[l];
							if(item.diff <= difficulty)
							itemlist.push(item);
						}
						item = getRandomElement(itemlist);
						Level.setChestSlot(x, height+1, y, i, item.id, 0, getRandom(1, item.max));
					}
					break;
				case 'grave':
					setTile(x, height, y, 175);
					setTile(x+1, height+1, y, 98, 3);
					break;
				case 'enter':
					setTile(x, height, y, 98, getRandom(0,2));
					setTile(x, height+4, y, 98, getRandom(0,2));
					setTile(x, height+1, y, 63);
					setTile(x-1, height+1, y, 50);
					Level.setSignText(x, height+1, y, 1, 'Enter');
					break;
				case 'exit':
					setTile(x, height-1, y, 98, getRandom(0,2));
					setTile(x, height+4, y, 98, getRandom(0,2));
					setTile(x, height, y, 96);
					setTile(x-1, height+1, y, 50);
					break;
			}
			
			if(tile==='enter')
			{
				Level.setSpawn(x, height, y+2);
				setPosition(Player.getEntity(),x,height+3,y);
			}
        }
    }
}

function changeLevel()
{
	ModPE.saveData('dc_diff',difficulty);
	ModPE.saveData('dc_world',Level.getWorldDir());
	var map;
	switch(difficulty)
	{
		case 5:
		case 10:
		case 15:
			map = generateArena();
			buildMap(map, hi);
			spawnBoss();
			break;
		case 16:
			clientMessage('Congratulations! You completed the game and escaped from the dungeon!');
			var x = Player.getX(),
				z = Player.getZ();
			for(var i = Player.getY()+2; i < 128; i++)
			{
				if(getTile(x, i, z) === 0 && getTile(x, i+1, z) === 0)
				{
					Entity.setPosition(Player.getEntity(), x, i+2, z);
					break;
				}
			}
			break;
		default:
			map = Dungeon.generate();
			buildMap(map, hi);
			break;
	}
	clientMessage('Welcome to level '+difficulty+' of Dungeon Crawl!');
}

function spawnBoss()
{
	switch(difficulty)
	{
		case 5:
			boss = Level.spawnMob(23,hi+1,8,35,"mob/slime.png");
			Entity.setNameTag(boss, "Slime");
			break;
		case 10:
			boss = Level.spawnMob(23,hi+1,8,35,"mob/ender.png");
			Entity.setNameTag(boss, "Ender-cube");
			teleport = 150;
			break;
		case 15:
			boss = Level.spawnMob(23,hi+1,8,35,"mob/magma.png");
			Entity.setNameTag(boss, "Magma-cube");
			fireball = 100;
			break;
	}
	Entity.setRenderType(boss, slimeRenderer.renderType);
	Entity.setHealth(boss, difficulty * 10 * 2);
}

function getPlayerDiamonds()
{
	var dm = 0;
	for(var i = 0; i < 36; i++)
	{
		if(Player.getInventorySlot(i) === 264)
		{
			dm += Player.getInventorySlotCount(i);
		}
	}
	return dm;
}

function shopBuy(id, cost, max)
{
	if(getPlayerDiamonds() < cost)
		print("You don't have enough diamonds!");
	else
	{
		Player.addItemInventory(id, max);
		Player.addItemInventory(264, -cost);
	}
}

function addButton(ctx, layout, item)
{
	var button = new android.widget.Button(ctx);
	button.setText(item.name + ' - ' + item.cost + ' diamonds');
	button.setOnClickListener(new android.view.View.OnClickListener({
		onClick: function(viewarg)
		{
			shopBuy(item.id, item.cost, item.max);
		}
	}));
	layout.addView(button);
}

function shopMenu()
{
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var menuLayout = new android.widget.LinearLayout(ctx);
            var menuScroll = new android.widget.ScrollView(ctx);
            var menuLayout1 = new android.widget.LinearLayout(ctx);
            menuLayout.setOrientation(1);
            menuLayout1.setOrientation(1);

            menuScroll.addView(menuLayout);
            menuLayout1.addView(menuScroll);
            
            var textParams = new android.widget.LinearLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			textParams.setMargins(dip2px(5), 0, 0, 0);
			
			var title = new android.widget.TextView(ctx);
			title.setTextSize(25);
			title.setText("Shop");
			title.setLayoutParams(textParams);
			menuLayout.addView(title);
			
			var title2 = new android.widget.TextView(ctx);
			title2.setTextSize(15);
			title2.setText("Welcome!");
			title2.setLayoutParams(textParams);
			menuLayout.addView(title2);
            
            for(var i = 0; i < items.length; i++)
            {
				if(items[i].id === 264) continue;
				
				addButton(ctx, menuLayout, items[i]);
			}

            menu = new android.widget.PopupWindow(menuLayout1, ctx.getWindowManager().getDefaultDisplay().getWidth()/2, ctx.getWindowManager().getDefaultDisplay().getHeight());
            menu.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
            menu.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(error){
            print("Error: " + error);
        }
    }}));
}

function showExitButton()
{
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        try{
            var xLayout = new android.widget.LinearLayout(ctx);

            var xButton = new android.widget.Button(ctx);
            xButton.setText("x");
            xButton.setTextColor(android.graphics.Color.WHITE);
            xButton.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(viewarg){
                    exitUI.dismiss();
                    menu.dismiss();
                }
            }));
            xLayout.addView(xButton);

            exitUI = new android.widget.PopupWindow(xLayout, dip2px(40), dip2px(40));
            exitUI.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
            exitUI.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
        }catch(exception){
            print(exception);
        }
    }}));
}

function newLevel()
{
	var dc_diff = ModPE.readData('dc_diff'),
		dc_world = ModPE.readData('dc_world');
	if(dc_diff > 0 && dc_world === Level.getWorldDir())
	{
		difficulty = dc_diff;
		clientMessage('Welcome back to level '+difficulty+' of Dungeon Crawl!');
	}
}

function leaveGame()
{
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
        if(menu != null){
            menu.dismiss();
            menu = null;
        }
        if(exitUI != null){
            exitUI.dismiss();
            exitUI = null;
        }
    }}));
}

function procCmd(command) 
{
	var cmd=command.split(' ');
	if(cmd[0]==='newgame')
	{
		difficulty = 1,
		boss = 0,
		teleport = -1,
		fireball = -1;
		addItemInventory(50, 5, 0);
		addItemInventory(262, 10, 0);
		addItemInventory(261, 1, 0);
		addItemInventory(268, 1, 0);
		changeLevel();
	}
	else if(cmd[0]==='skip')
	{
		difficulty++
		changeLevel();
	}
}

function useItem(x,y,z,itemId,blockId,side,itemDamage,blockDamage) 
{
	if(blockId===42)
	{
		if(getTile(x, y+1, z)===0)
		{
			setTile(x, y+1, z, 101);
			setTile(x, y+2, z, 101);
		}
		else
		{
			Level.destroyBlock(x, y+1, z);
			Level.destroyBlock(x, y+2, z);
		}
	}
	else if(blockId===101)
	{
		if(getTile(x, y+1, z)===101)
		{
			Level.destroyBlock(x, y, z);
			Level.destroyBlock(x, y+1, z);
		}
		else
		{
			Level.destroyBlock(x, y, z);
			Level.destroyBlock(x, y-1, z);
		}
	}
	else if(blockId===85 && itemId===511)
	{
		if(getTile(x, y+1, z)===85)
		{
			Level.destroyBlock(x, y, z);
			Level.destroyBlock(x, y+1, z);
		}
		else
		{
			Level.destroyBlock(x, y, z);
			Level.destroyBlock(x, y-1, z);
		}
		addItemInventory(511,-1,0);
	}
	else if(blockId===96)
	{
		difficulty++
		changeLevel();
	}
	else if(blockId===171)
	{
		shopMenu();
		showExitButton();
	}
	else if(blockId===175)
	{
		Level.destroyBlock(x, y, z);
		mboss = Level.spawnMob(x,y+1,z,32,"mob/zombie.png");
		Entity.setHealth(mboss, difficulty * 10 * 2);
		Entity.setNameTag(mboss, "Zombie");
	}
	
	if(itemId===500)
	{
		if(getTile(x, y+1, z)===0)
		{
			setTile(x, y+1, z, 51);
			addItemInventory(500,-1);
		}
	}
	else if(itemId===502)
	{
		Player.setHealth(20);
		addItemInventory(502,-1);
	}
}

function modTick()
{
	if(ball.x-Entity.getX(ball.ent) >= 0)
	{
		setVelX(ball.ent,0.3);
	}
	else if(ball.x-Entity.getX(ball.ent) <= 0)
	{
		setVelX(ball.ent,-0.3);
	}
	
	if(ball.y-Entity.getY(ball.ent) >= 0)
	{
		setVelY(ball.ent,0.3);
	}
	else if(ball.y-Entity.getY(ball.ent) <= 0)
	{
		setVelY(ball.ent,-0.3);
	}
	
	if(ball.z-Entity.getZ(ball.ent) >= 0)
	{
		setVelZ(ball.ent,0.3);
	}
	else if(ball.z-Entity.getZ(ball.ent) <= 0)
	{
		setVelZ(ball.ent,-0.3);
	}
	
	if(teleport !== -1)
	{
		if(teleport === 0)
		{
			teleport = 150;
			var pos = {x: Player.getX(), y: Player.getY(), z: Player.getZ()};
			if(getTile(pos.x, pos.y, pos.z) === 0)
				setPosition(boss, pos.x, pos.y, pos.z);
		}
		else teleport--;
	}
	
	if(fireball !== -1)
	{
		if(fireball === 0)
		{
			fireball = 100;
			ball.ent = Level.spawnMob(Entity.getX(boss),Entity.getY(boss)+1,Entity.getZ(boss),10);
			Entity.setRenderType(ball.ent, 18);
			ball.cnt = 40;
			ball.x = Player.getX();
			ball.y = Player.getY()-2;
			ball.z = Player.getZ();
		}
		else fireball--;
	}
	
	if(ball.cnt !== -1)
	{
		if(ball.cnt === 0)
		{
			ball.cnt = -1;
			Entity.remove(ball.ent);
			setTile(Entity.getX(ball.ent),Entity.getY(ball.ent),Entity.getZ(ball.ent), 51);
		}
		else ball.cnt--;
	}		
}

function attackHook(attacker,victim)
{
	if(getCarriedItem()===501)
	{
		if(victim === boss) return clientMessage('Nothing happened');
		
		Entity.setHealth(victim, 0);
		addItemInventory(501,-1);
	}
}

function deathHook(murderer, victim)
{
	if(victim===boss)
	{
		addItemInventory(511, 1, 0);
		teleport = -1;
		fireball = -1;
		clientMessage('Boss Slain!');
	}
	else if(victim===mboss)
	{
		var reward = getRandom(1, 10);
		addItemInventory(264, reward);
		clientMessage('Bonus: '+reward+' diamonds!');
	}
}

function entityAddedHook(entity)
{
	if(Entity.getEntityTypeId(entity)===33||Entity.getEntityTypeId(entity)===64)
	{
		Entity.remove(entity);
	}
}
