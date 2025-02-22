ModPE.setItem(500, "blaze_rod", 0, "Explosion Staff");
ModPE.setItem(501, "blaze_rod", 0, "Ice Staff");
ModPE.setItem(502, "blaze_rod", 0, "Obsidian Staff");
ModPE.setItem(503, "blaze_rod", 0, "Water staff");
ModPE.setItem(504, "blaze_rod", 0, "Lava Staff");
function useItem(x,y,z,itemId,blockId,side)
{
     if(itemId==264)
     {
        addItemInventory(500,1);
        addItemInventory(501,1);
        addItemInventory(502,1);
        addItemInventory(503,1);
        addItemInventory(504,1);
        addItemInventory(264,-1);
        }
     if(itemId==500)
     {
        explode(x+15, y, z, 15);
        }
     if(itemId==501)
     {
         setTile(x, y, z, 79);
         }
     if(itemId==502)
     {
         setTile(x, y, z, 49);
         }
     if(itemId==503)
       {
           setTile(x, y, z, 8);
           }
        if(itemId==504)
        {
            setTile(x+1, y, z, 10);
            setTile(x-1, y, z, 10);
            setTile(x, y, z+1, 10);
            setTile(x, y, z-1, 10);
            }
}