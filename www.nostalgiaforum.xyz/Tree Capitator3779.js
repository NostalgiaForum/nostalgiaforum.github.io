function useItem(x,y,z,itemId,blockId,side)
{
  if(itemId == 271 || itemId == 275 || itemId == 279 || itemId == 286 || itemId == 258)
        {
                if(blockId == 17)
                {
                        setTile(x,y,z,0);
                        addItemInventory(17,1);
                        for(var a = 1; a < 10; a++) //adding until the end of the tree trunk
                        {
                                if(getTile(x,y+a,z) == 17)
                                {
                                        setTile(x,y+a,z,0); //Detroys all the trunks
                                        addItemInventory(17,1);//adds wood in your inventory
                                }
                                else {break;}
                        }
                        preventDefault();
                }
        }
}