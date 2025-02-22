//Industrial PE v1.0 by damir345
var x1 = 0;
var y1 = 0;
var z1 = 0;
var x2 = 0;
var y2 = 0;
var z2 = 0;
var qactive = 0;
var q1 = 0;
var q2 = 0;
var qdepth = 0;
ModPE.setItem(500, "nether_star", 0, "Resource Searcher Key");

function newLevel() {
    Block.defineBlock(190, "Quarry #1", [["piston_bottom", 0],
                                         ["iron_block", 0],
                                         ["cobblestone", 0],
                                         ["cobblestone", 0],
                                         ["cobblestone", 0],
                                         ["cobblestone", 0]], 6, true, 0);
    Block.setDestroyTime(190, 0.5);
    Block.defineBlock(191, "Quarry #2", [["piston_bottom", 0],
                                         ["gold_block", 0],
                                         ["cobblestone", 0],
                                         ["cobblestone", 0],
                                         ["cobblestone", 0],
                                         ["cobblestone", 0]], 6, true, 0);
    Block.setDestroyTime(191, 0.5);
    Block.defineBlock(192, "Resource Searcher", [["piston_inner", 0],
                                         ["cobblestone", 0],
                                         ["piston_inner", 0],
                                         ["piston_inner", 0],
                                         ["piston_inner", 0],
                                         ["piston_inner", 0]], 6, true, 0);
    Block.setDestroyTime(192, 0.5);
    Item.addCraftRecipe(190, 1, 0, [245, 1,0, 41, 1,0, 4, 1,0]);
    Item.addCraftRecipe(191, 1, 0, [245, 1,0, 42, 1,0, 4, 1,0]);
    Item.addCraftRecipe(192, 1, 0, [245, 1,0, 54, 1,0]);
    Item.addCraftRecipe(500, 1, 0, [41, 1,0, 24, 1,0, 20, 1,0]);
}

function useItem(x, y, z, itemId, blockId, side) {
    if (blockId == 190 && itemId == 280) {
        x1 = x;
        y1 = y - 1;
        z1 = z;
        preventDefault();
        iMessage("pos #1 set");
        q1 = 1;
        preventDefault();
    }
    if (blockId == 191 && itemId == 280) {
        x2 = x;
        y2 = y - 1;
        z2 = z;
        preventDefault();
        iMessage("pos #2 set");
        q2 = 1;
        preventDefault();
    }
    if (itemId == 331 && blockId == 190) {
        qactive = 1;
        iMessage("Quarries are ready!");
        preventDefault();
        iMessage("Quarry #1 Y = " + Math.ceil(y1) + " and Quarry #2 Y = " + Math.ceil(y2));
    }
    else if (itemId == 331 && blockId == 191) {
        qactive = 1;
        iMessage("Quarries are ready!");
        preventDefault();
        iMessage("Quarry #1 Y = " + Math.ceil(y1) + " and Quarry #2 Y = " + Math.ceil(y2));
    }
    /*
    if(itemId==280&&blockId==54)
    {
     Level.getChestSlot(x,y,z,1);
     iMessage(Level.getChestSlot(x,y,z,1) + " is in the chest!");
     }   
     */
    tttt(x, y, z, itemId, blockId, side, 190);
    tttt(x, y, z, itemId, blockId, side, 191);
}

function tttt(x, y, z, itemId, blockId, side, quarry)
{
    var leftChestSlotId = Level.getChestSlot(x - 1, y, z, 0);
    var rightChestSlotId = Level.getChestSlot(x + 1, y, z, 0);
    var frontChestSlotId = Level.getChestSlot(x, y, z + 1, 0);
    var backChestSlotId = Level.getChestSlot(x, y, z - 1, 0);
    var isDiamondChestSlot = 0;
    var isGoldChestSlot = 0;
    var isIronChestSlot = 0;
    var isCoalChestSlot = 0;
    var leftResourceSearcher = Level.getTile(x - 1, y, z, 0);
    var rightResourceSearcher = Level.getTile(x + 1, y, z, 0);
    var frontResourceSearcher = Level.getTile(x, y, z - 1, 0);
    var backResourceSearcher = Level.getTile(x, y, z + 1, 0);

    if (itemId == 500 && blockId == 192)//For diamonds
    {
        var startX = Math.ceil(Math.min(x1, x2));
        var startY = Math.ceil(Math.min(y1, y2));
        var startZ = Math.ceil(Math.min(z1, z2));
        var endX = Math.ceil(Math.max(x1, x2));
        var endY = Math.ceil(Math.max(y1, y2));
        var endZ = Math.ceil(Math.max(z1, z2));
        qdepth = startY - (startY - 1);

        if (leftChestSlotId == 264) {
            isDiamondChestSlot = 1;
            preventDefault();
        }
        else if (rightChestSlotId == 264) {
            isDiamondChestSlot = 1;
            preventDefault();
        }
        else if (frontChestSlotId == 264) {
            isDiamondChestSlot = 1;
            preventDefault();
        }
        else if (backChestSlotId == 264) {
            isDiamondChestSlot = 1;
            preventDefault();
        }

        if (leftResourceSearcher == quarry && isDiamondChestSlot == 1) {
            iMessage("Working!");
            dCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for diamonds!");
			iMessage("All done!");
        }
        else if (rightResourceSearcher == quarry && isDiamondChestSlot == 1) {
            iMessage("Working!");
            dCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for diamonds!");
			iMessage("All done!");
        }
        else if (frontResourceSearcher == quarry && isDiamondChestSlot == 1) {
            iMessage("Working!");
            dCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for diamonds!");
			iMessage("All done!");
        }
        else if (backResourceSearcher == quarry && isDiamondChestSlot == 1) {
            iMessage("Working!");
            dCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for diamonds!");
			iMessage("All done!");
        }
    }

    if (itemId == 500 && blockId == 192)//For coal
    {
        var startX = Math.ceil(Math.min(x1, x2));
        var startY = Math.ceil(Math.min(y1, y2));
        var startZ = Math.ceil(Math.min(z1, z2));
        var endX = Math.ceil(Math.max(x1, x2));
        var endY = Math.ceil(Math.max(y1, y2));
        var endZ = Math.ceil(Math.max(z1, z2));
        qdepth = startY - (startY - 1);

        if (Level.getChestSlot(x - 1, y, z, 0) == 263) {
            isCoalChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x + 1, y, z, 0) == 263) {
            isCoalChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x, y, z + 1, 0) == 263) {
            isCoalChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x, y, z - 1, 0) == 263) {
            isCoalChestSlot = 1;
            preventDefault();
        }

        if (Level.getTile(x - 1, y, z, 0) == quarry && isCoalChestSlot == 1) {
            iMessage("Working!");
            cCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for coal!");
			iMessage("All done!");
        }
        else if (Level.getTile(x + 1, y, z, 0) == quarry && isCoalChestSlot == 1) {
            iMessage("Working!");
            cCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for coal!");
			iMessage("All done!");
        }
        else if (Level.getTile(x, y, z - 1, 0) == quarry && isCoalChestSlot == 1) {
            iMessage("Working!");
            cCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for coal!");
			iMessage("All done!");
        }
        else if (Level.getTile(x, y, z + 1, 0) == quarry && isCoalChestSlot == 1) {
            iMessage("Working!");
            cCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for coal!");
			iMessage("All done!");
        }

    }

    if (itemId == 500 && blockId == 192)//For gold
    {
        var startX = Math.ceil(Math.min(x1, x2));
        var startY = Math.ceil(Math.min(y1, y2));
        var startZ = Math.ceil(Math.min(z1, z2));
        var endX = Math.ceil(Math.max(x1, x2));
        var endY = Math.ceil(Math.max(y1, y2));
        var endZ = Math.ceil(Math.max(z1, z2));
        qdepth = startY - (startY - 1);
        if (Level.getChestSlot(x - 1, y, z, 0) == 266) {
            isGoldChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x + 1, y, z, 0) == 266) {
            isGoldChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x, y, z + 1, 0) == 266) {
            isGoldChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x, y, z - 1, 0) == 266) {
            isGoldChestSlot = 1;
            preventDefault();
        }
        if (Level.getTile(x - 1, y, z, 0) == quarry && isGoldChestSlot == 1) {
            iMessage("Working!");
            iMessage("Searching for gold!");
            gCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("All done!");
        }
        else if (Level.getTile(x + 1, y, z, 0) == quarry && isGoldChestSlot == 1) {
            iMessage("Working!");
            iMessage("Searching for gold!");
            gCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("All done!");
        }
        else if (Level.getTile(x, y, z - 1, 0) == quarry && isGoldChestSlot == 1) {
            iMessage("Working!");
            gCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("All done!");
            iMessage("Searching for gold!");
        }
        else if (Level.getTile(x, y, z + 1, 0) == quarry && isGoldChestSlot == 1) {
            iMessage("Working!");
            gCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("All done!");
            iMessage("Searching for gold!");
        }

    }

    if (itemId == 500 && blockId == 192)//For iron
    {
        var startX = Math.ceil(Math.min(x1, x2));
        var startY = Math.ceil(Math.min(y1, y2));
        var startZ = Math.ceil(Math.min(z1, z2));
        var endX = Math.ceil(Math.max(x1, x2));
        var endY = Math.ceil(Math.max(y1, y2));
        var endZ = Math.ceil(Math.max(z1, z2));
        qdepth = startY - (startY - 1);
        if (Level.getChestSlot(x - 1, y, z, 0) == 265) {
            isIronChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x + 1, y, z, 0) == 265) {
            isIronChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x, y, z + 1, 0) == 265) {
            isIronChestSlot = 1;
            preventDefault();
        }
        else if (Level.getChestSlot(x, y, z - 1, 0) == 265) {
            isIronChestSlot = 1;
            preventDefault();
        }
        if (Level.getTile(x - 1, y, z, 0) == quarry && isIronChestSlot == 1) {
            iMessage("Working!");
            iCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for iron!");
			iMessage("All done!");
        }
        else if (Level.getTile(x + 1, y, z, 0) == quarry && isIronChestSlot == 1) {
            iMessage("Working!");
            iCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for iron!");
			iMessage("All done!");
        }
        else if (Level.getTile(x, y, z - 1, 0) == quarry && isIronChestSlot == 1) {
            iMessage("Working!");
            iCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for iron!");
			iMessage("All done!");
        }
        else if (Level.getTile(x, y, z + 1, 0) == quarry && isIronChestSlot == 1) {
            iMessage("Working!");
            iCube(startX, startY, startZ, endX, endY, endZ);
            iMessage("Searching for iron!");
			iMessage("All done!");
        }
    }

}


function getBlocks(x, y, z) {
    var qY = 0;

    var minedblock = getTile(x, y - qY, z);

    if (minedblock == 7) return;

    if (minedblock == 7 || minedblock == 49 || minedblock == 247 || minedblock == 95) {
        preventDefault();
    }
    else if (minedblock == 2 || minedblock == 60) {
        addItemInventory(3, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 1) {
        addItemInventory(4, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 73 || minedblock == 74) {
        addItemInventory(4, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 56) {
        addItemInventory(264, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 16) {
        addItemInventory(263, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 30) {
        addItemInventory(287, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 157) {
        addItemInventory(158, 2);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 102) {
        addItemInventory(360, 5);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 89) {
        addItemInventory(348, 4);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 83) {
        addItemInventory(338, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 82) {
        addItemInventory(337, 4);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 62) {
        addItemInventory(61, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 68 || minedblock == 63) {
        addItemInventory(323, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 47) {
        addItemInventory(340, 3);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 43) {
        addItemInventory(44, 1);
        setTile(x, y - qY, z, 0);
    }
    else if (minedblock == 105 || minedblock == 20 || minedblock == 102 || minedblock == 18 || minedblock == 253 || minedblock == 254 || minedblock == 248 || minedblock == 249 || minedblock == 92 || minedblock == 79 || minedblock == 78 || minedblock == 59 || minedblock == 31 || minedblock == 80 || minedblock == 0 || minedblock == 51 || minedblock == 8 || minedblock == 9 || minedblock == 10 || minedblock == 11 || minedblock == 255) {
        setTile(x, y - qY, z, 0);
    }
    else {
        addItemInventory(minedblock, 1);
        setTile(x, y - qY, z, 0);
    }
}

function cutCube(startX, startY, startZ, endX,
endY, endZ) {
    /*
      iMessage("x1 = " + startX);
      iMessage("x2 = " + endX);
      iMessage("y1 = " + startY);
      iMessage("y2 = " + endY);
      iMessage("z1 = " + startZ);
      iMessage("z2 = " + endZ);
    */


    //for (var qY = 1; qY < 55; qY++)

    for (var x = startX; x <= endX; x++) {
        for (var y = startY; y > startY - qdepth; y--) {
            for (var z = startZ; z <= endZ; z++) {
                //iMessage("setTile: x = " + x + ", y = " + y + ", z = " + z + ", id = " + id);
                getBlocks(x, y, z);
            }
        }
    }
}

function procCmd(cmd) {
    //iMessage("cmd = " + cmd);
    var Command = cmd.split(" ");
    switch (Command[0]) {
        case "qgo":
            {
                var startX = Math.ceil(Math.min(x1, x2));
                var startY = Math.ceil(Math.min(y1, y2));
                var startZ = Math.ceil(Math.min(z1, z2));
                var endX = Math.ceil(Math.max(x1, x2));
                var endY = Math.ceil(Math.max(y1, y2));
                var endZ = Math.ceil(Math.max(z1, z2));
                cutCube(startX, startY, startZ, endX, endY, endZ);
            }
            break;

        case "qdset":
            {
                qdepth = parseInt(Command[1]);
                iMessage("Digging depth is " + Command[1]);
            }
            break;

        case "indpeinfo":
		{
                iMessage("Industrial PE v1.1 by damir345");
				iMessage("Have fun playing!");
		}
			break;
    }
}

function diamondSearch(x, y, z) {

    var qY = 0;

    var minedblock = getTile(x, y - qY, z);

    if (minedblock == 7) return;

    if (minedblock == 7 || minedblock == 49 || minedblock == 247 || minedblock == 95) {
        preventDefault();
    }
    else if (minedblock == 56) {
        addItemInventory(264, 1);
        setTile(x, y - qY, z, 0);
    }
}

function ironSearch(x, y, z) {

    var qY = 0;

    var minedblock = getTile(x, y - qY, z);

    if (minedblock == 7) return;

    if (minedblock == 7 || minedblock == 49 || minedblock == 247 || minedblock == 95) {
        preventDefault();
    }
    else if (minedblock == 15) {
        addItemInventory(15, 1);
        setTile(x, y - qY, z, 0);
    }
}

function goldSearch(x, y, z) {

    var qY = 0;

    var minedblock = getTile(x, y - qY, z);

    if (minedblock == 7) return;

    if (minedblock == 7 || minedblock == 49 || minedblock == 247 || minedblock == 95) {
        preventDefault();
    }
    else if (minedblock == 14) {
        addItemInventory(14, 1);
        setTile(x, y - qY, z, 0);
    }
}

function coalSearch(x, y, z) {

    var qY = 0;

    var minedblock = getTile(x, y - qY, z);

    if (minedblock == 7) return;

    if (minedblock == 7 || minedblock == 49 || minedblock == 247 || minedblock == 95) {
        preventDefault();
    }
    else if (minedblock == 16) {
        addItemInventory(263, 1);
        setTile(x, y - qY, z, 0);
    }
}

function dCube(startX, startY, startZ, endX, endY, endZ) {
    for (var x = startX; x <= endX; x++) {
        for (var y = startY; y > startY - (startY - 1) ; y--) {
            for (var z = startZ; z <= endZ; z++) {
                diamondSearch(x, y, z);
            }
        }
    }
}

function iCube(startX, startY, startZ, endX, endY, endZ) {
    for (var x = startX; x <= endX; x++) {
        for (var y = startY; y > startY - (startY - 1) ; y--) {
            for (var z = startZ; z <= endZ; z++) {
                ironSearch(x, y, z);
            }
        }
    }
}

function gCube(startX, startY, startZ, endX, endY, endZ) {
    for (var x = startX; x <= endX; x++) {
        for (var y = startY; y > startY - (startY - 1) ; y--) {
            for (var z = startZ; z <= endZ; z++) {
                goldSearch(x, y, z);
            }
        }
    }
}

function cCube(startX, startY, startZ, endX, endY, endZ) {
    for (var x = startX; x <= endX; x++) {
        for (var y = startY; y > startY - (startY - 1) ; y--) {
            for (var z = startZ; z <= endZ; z++) {
                coalSearch(x, y, z);
            }
        }
    }
}

function iMessage(msg) 
{
    clientMessage("[IndPE] " +msg);
}