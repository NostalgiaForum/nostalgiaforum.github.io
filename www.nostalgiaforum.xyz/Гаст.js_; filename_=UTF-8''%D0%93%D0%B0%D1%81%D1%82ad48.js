//Cоздатель скрипта: CHESTERvar playerrotation
var activate_time = 0;
var activate_time_explode = 0;
var bombtime = 0.0;
var bombtimeexplode = 10.0;
var bombactivated = 0;
var otherbomb = 0;
var explosion = 0;
var bombx;
var bomby;
var bombz;
var meteorshower = 0;
var meteorintervall = 0.0;
var time = 0.0;
var second = 1.0;
var meteors = 0;
var meteorx1;
var meteory1;
var meteorz1;
var meteorx2;
var meteory2;
var meteorz2;
var meteorx3;
var meteory3;
var meteorz3;
var meteorx4;
var meteory4;
var meteorz4;
var meteorx5;
var meteory5;
var meteorz5;
var meteorfree1 = 1;
var meteorfree2 = 1;
var meteorfree3 = 1;
var meteorfree4 = 1;
var meteorfree5 = 1;
var meteorslot;
var posx = 0;
var posz = 0;
var randx = 1.0;
var randz = 1.0;
var commander = 0;
var commanderx;
var commandery;
var commanderz;
var signalx;
var signaly;
var signalz;
var signal = 0;
var targetingx;
var targetingy;
var targetingz;
var targetx;
var targety;
var targetz;
var projectil = 0;
var projectilx;
var projectily;
var projectilz;
var velocityx;
var velocityy;
var velocityz;
var distancex;
var distancey;
var distancez;
var targetpositivx;
var targetpositivy;
var targetpositivz;
var oldplayerx;
var oldplayery;
var oldplayerz;
var ritual = 0;
var bossactive = 0;
var dirtbossactive = 0;
var dirtbossx;
var dirtbossy;
var dirtbossz;
var dirtbosslastx;
var dirtbosslasty;
var dirtbosslastz;
var movedirtbossx = 0;
var movedirtbossy = 0;
var movedirtbossz = 0;
var dirtbosslive = 500;
var dirtbossdamage = 0;
var dirtbossmoved = 0;
var dirtbossrotation = 1;
var dirtbossrotationlast = 1;
var dirtbosstimer = 0;
var dirtbossanimationalready = 0;
var dirtbossanimation = 0;
var dirtbossanimationlast = 0;
var dirtbossminus;
var dirtbossdistancex;
var dirtbossdistancey;
var dirtbossdistancez;
var dirtbossspecialattacktimer = 0;
var dirtbosstargetx = 0;
var dirtbosstargetz = 0;
var supervirus = 0;
var supervirusentity;
var supervirusrotx = 0;
var supervirusroty = 0;
var firebossactive = 0;
var firebosslive = 750;
var firebossx = 0;
var firebossy = 0;
var firebossz = 0;
var movefirebossx = 0;
var movefirebossy = 0;
var movefirebossz = 0;
var firebossrotation = 1;
var firebossanimation = 0;
var firebosslastx = 0;
var firebosslasty = 0;
var firebosslastz = 0;
var firebossball = 0;
var firebossballx;
var firebossbally;
var firebossballz;
var firebossballlastx;
var firebossballlasty;
var firebossballlastz;
var firebossmoved = 0;
var firebosstimer = 0;
var firebossdamage = 0;
var firebossdistancex = 0;
var firebossdistancez = 0;
var firebossminus = 0;
var firebossattacktimer = 0;
var firebossanimationtime = 0;
var firebosstargetx = 0;
var firebosstargety = 0;
var firebosstargetz = 0;
var firebossnegativx = 0;
var firebossnegativy = 0;
var firebossnegativz = 0;

function useItem(x,y,z,itemId,blockId,side)
{
    //Nether-Rack Creating
    if (itemId == 259 && blockId == 74)
    {
      preventDefault();
      setTile(x,y,z,87);
    }

    //Super-Weapon
    //Crafting the Super-Weapon
    if (itemId == 283 && blockId == 87)
    {
      addItemInventory(347,1);
      explode(x,y,z,1);
      clientMessage("You just crafted a Super-Weapon");
     }
    //Bomb exploding
    if (itemId == 347 && bombactivated == 1 && activate_time_explode == 0)
    {
      explosion = 0;
      if (getTile(bombx,bomby,bombz) == 46)
      {
        setTile(bombx,bomby,bombz,0);
        //Napalm-Bombe
        if (explosion == 0)
        {
          if (getTile(bombx + 1,bomby,bombz) == 87)
          {
            if (getTile(bombx - 1,bomby,bombz) == 87)
            {
              if (getTile(bombx,bomby,bombz + 1) == 87)
              {
                if (getTile(bombx,bomby,bombz - 1) == 87)
                {
                  setTile(bombx + 1,bomby,bombz,0);
                  setTile(bombx - 1,bomby,bombz,0);
                  setTile(bombx,bomby,bombz + 1,0);
                  setTile(bombx,bomby,bombz - 1,0);
                  explode(bombx,bomby,bombz,5);
                  for (var i = 0;i < 20;i++)
                  {
                    for (var j = 0;j < 20;j++)
                    {
                      for (var k = 0;k < 30;k++)
                      {
                        if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 0)
                        {
                          setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,51);
                        }
                      }
                    }
                  }
                  explosion = 1;
                }
              }
            }
          }
        }
        //Biochemikalbomb
        if (explosion == 0)
        {
          if (getTile(bombx + 1,bomby,bombz) == 3)
          {
            if (getTile(bombx - 1,bomby,bombz) == 3)
            {
              if (getTile(bombx,bomby,bombz + 1) == 3)
              {
                if (getTile(bombx,bomby,bombz - 1) == 3)
                {
                  if (getTile(bombx + 1,bomby,bombz + 1) == 11)
                  {
                    if (getTile(bombx - 1,bomby,bombz - 1) == 11)
                    {
                      if (getTile(bombx + 1,bomby,bombz - 1) == 11)
                      {
                        if (getTile(bombx - 1,bomby,bombz + 1) == 11)
                        {
                          setTile(x + 1,y,z,0);
                          setTile(bombx + 1,bomby - 1,bombz);
                          setTile(bombx - 1,bomby - 1,bombz);
                          setTile(bombx,bomby - 1,bombz + 1);
                          setTile(bombx,bomby - 1,bombz - 1);
                          setTile(bombx + 1,bomby,bombz);
                          setTile(bombx - 1,bomby,bombz);
                          setTile(bombx,bomby,bombz + 1);
                          for (var i = 0;i < 20;i++)
                          {
                            for (var j = 0;j < 20;j++)
                            {
                              for (var k = 0;k < 30;k++)
                              {
                                if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 2)
                                {
                                  setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,11);
                                }
                                if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 17)
                                {
                                  setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,11);
                                }
                                if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 18)
                                {
                                  setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,11);
                                }
                              }
                            }
                          }
                          explosion = 1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        //Nuke
        if (explosion == 0)
        {
          if (getTile(bombx,bomby - 1,bombz) == 49)
          {
            if (getTile(bombx,bomby + 1,bombz) == 49)
            {
              if (getTile(bombx + 1,bomby,bombz) == 49)
              {
                if (getTile(bombx - 1,bomby,bombz) == 49)
                {
                  if (getTile(bombx,bomby,bombz + 1) == 49)
                  {
                    if (getTile(bombx,bomby,bombz - 1) == 49)
                    {
                      setTile(bombx,bomby - 1,bombz,0);
                      setTile(bombx,bomby + 1,bombz,0);
                      setTile(bombx + 1,bomby,bombz,0);
                      setTile(bombx - 1,bomby,bombz,0);
                      setTile(bombx,bomby,bombz + 1,0);
                      setTile(bombx,bomby,bombz - 1,0);
                      explode(bombx,bomby,bombz,15);
                      explode(bombx,bomby + 15,bombz,15);
                      explode(bombx,bomby,bombz + 15,10);
                      explode(bombx,bomby,bombz - 15,10);
                      explode(bombx + 15,bomby,bombz,10);
                      explode(bombx - 15,bomby,bombz,10);
                      explosion = 1;
                    }
                  }
                }
              }
            }
          }
        }
        //Bombe
        if (explosion == 0)
        {
          explode(bombx,bomby,bombz,15);
          explosion = 1;
        }
        otherbomb = 1;
      }
      bombactivated = 0;
    }
    //Bomb activating
    if (itemId == 347 && blockId == 46 && otherbomb == 0)
    {
      clientMessage("The Bomb is activated.Take You to safety.");
      activate_time_explode = activate_time;
      bombx = x;
      bomby = y;
      bombz = z;
      bombactivated = 1;
    }

    //Super-Miner
    //Crafting the Super-Miner
    if (itemId == 285 && blockId == 87)
    {
      clientMessage("You just crafted a Super-Miner.");
      addItemInventory(345,1);
    }
    //Using the Super-Miner
    if (itemId == 345)
    {
      MineOres(x,y,z);
    }
    //Super-Virus
    if (itemId == 295 && blockId == 87)
    {
      clientMessage("You just crafted a Super-Virus.");
      addItemInventory(341,1);
    }
    //Building a Commander
    if (itemId == 345 && blockId == 57)
    {
      if (getTile(x,y - 1,z) == 41)
      {
        if (getTile(x + 1,y - 1,z) == 42)
        {
          if (getTile(x - 1,y - 1,z) == 42)
          {
            if (getTile(x,y - 1,z + 1) == 42)
            {
              if (getTile(x,y - 1,z - 1) == 42)
              {
                clientMessage("You build a Commander.");
                setTile(x,y,z,0);
                setTile(x,y - 1,z,0);
                setTile(x + 1,y - 1,z,0);
                setTile(x - 1,y - 1,z,0);
                setTile(x,y - 1,z + 1,0);
                setTile(x,y - 1,z - 1,0);
                buildcommander(x,y,z);
              }
            }
          }
        }
      }
    }
    //Re-Activating Commander
    if (blockId == 41)
    {
      if (getTile(x + 1,y,z) == 57)
      {
        if(getTile(x + 2,y,z) == 42)
        {
          if(getTile(x + 3,y,z) == 42)
          {
            if(getTile(x + 4,y,z) == 42)
            {
              if(getTile(x + 4,y,z - 1) == 42)
              {
                commanderx = x;
                commandery = y;
                commanderz = z;
                commander = 1;
                clientMessage("Commander activated.");
              }
            }
          }
        }
      }
    }
    //Activate mortar
    if (blockId == 41)
    {
      //Mortar
      if (getTile(x,y + 1,z) == 49)
      {
        if (getTile(x + 1,y + 1,z) == 49)
        {
          if (getTile(x - 1,y + 1,z) == 49)
          {
            if (getTile(x,y + 1,z + 1) == 49)
            {
              if (getTile(x,y + 1,z - 1) == 49)
              {
                if (getTile(x + 1,y + 1,z + 1) == 49)
                {
                  if (getTile(x - 1,y + 1,z - 1) == 49)
                  {
                    if (getTile(x + 1,y + 1,z - 1) == 49)
                    {
                      if (getTile(x - 1,y + 1,z + 1) == 49)
                      {
                        if (getTile(x + 1,y + 2,z) == 49)
                        {
                          if (getTile(x - 1,y + 2,z) == 49)
                          {
                            if (getTile(x,y + 2,z + 1) == 49)
                            {
                              if (getTile(x,y + 2,z - 1) == 49)
                              {
                                clientMessage("Mortar is connected to Commander.");
                                signal = 1;
                                signalx = x;
                                signaly = y;
                                signalz = z;
                                targetingx = 0;
                                targetingz = 0;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //Shot war-machines
    if (blockId == 57 && signal != 0 && commanderx + 1 == x && commandery == y && commanderz == z && projectil == 0)
    {
      if (signal == 1)
      {
        //Mortar
        if (getTile(signalx,signaly + 1,signalz) == 49)
        {
          if (getTile(signalx + 1,signaly + 1,signalz) == 49)
          {
            if (getTile(signalx - 1,signaly + 1,signalz) == 49)
            {
              if (getTile(signalx,signaly + 1,signalz + 1) == 49)
              {
                if (getTile(signalx,signaly + 1,signalz - 1) == 49)
                {
                  if (getTile(signalx + 1,signaly + 1,signalz + 1) == 49)
                  {
                    if (getTile(signalx - 1,signaly + 1,signalz - 1) == 49)
                    {
                      if (getTile(signalx + 1,signaly + 1,signalz - 1) == 49)
                      {
                        if (getTile(signalx - 1,signaly + 1,signalz + 1) == 49)
                        {
                          if (getTile(signalx + 1,signaly + 2,signalz) == 49)
                          {
                            if (getTile(signalx - 1,signaly + 2,signalz) == 49)
                            {
                              if (getTile(signalx,signaly + 2,signalz + 1) == 49)
                              {
                                if (getTile(signalx,signaly + 2,signalz - 1) == 49)
                                {
                                  if (getTile(signalx,signaly - 1,signalz) == 46)
                                  {
                                    clientMessage("Mortar shot.");
                                    explode(signalx,signaly + 3,signalz,1);
                                    setTile(signalx,signaly - 1,signalz,0);
                                    targetx = targetingx;
                                    targetz = targetingz;
                                    projectil = 1;
                                    projectilx = signalx;
                                    projectily = signaly + 2;
                                    projectilz = signalz;
                                    velocityx = 0;
                                    velocityz = 0;
                                    targetpositivx = targetx;
                                    targetpositivz = targetz;
                                    thirdframe = 0;
                                    if (targetpositivx < 0)
                                    {
                                      targetpositivx *= -1;
                                    }
                                    if (targetpositivz < 0)
                                    {
                                      targetpositivz *= -1;
                                    }
                                    for (var i = 0;i < y;i++)
                                    {
                                      if (getTile(signalx,signaly - 1 - i,signalz) == 46)
                                      {
                                        setTile(signalx,signaly - 1 - i,signalz,0);
                                        setTile(signalx,signaly - i,signalz,46);
                                      }
                                    }
                                  }
                                  else
                                  {
                                    clientMessage("No more mortargrenades.");
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //Targeting with mortar
    //Right
    if (blockId == 42 && commanderx + 2 == x && commandery == y && commanderz == z && signal == 1)
    {
      if (targetingx > -50)
      {
        targetingx -= 1;
        clientMessage(-1 *targetingx);
      }
      else
      {
        clientMessage("Target out of range.");
      }
    }
    //Left
    if (blockId == 42 && commanderx + 3 == x && commandery == y && commanderz == z)
    {
      if (targetingx < 50)
      {
        targetingx += 1;
        clientMessage(-1 * targetingx);
      }
      else
      {
        clientMessage("Target out of range.");
      }
    }
    //Up
    if (blockId == 42 && commanderx + 4 == x && commandery == y && commanderz == z)
    {
      if (targetingz < 50)
      {
        targetingz += 1;
        clientMessage(targetingz);
      }
      else
      {
        clientMessage("Target out of range.");
      }
    }
    //Down
    if (blockId == 42 && commanderx + 4 == x && commandery == y && commanderz == z + 1)
    {
      if (targetingz > -50)
      {
        targetingz -= 1;
        clientMessage(targetingz);
      }
      else
      {
        clientMessage("Target out of range.");
      }
    }
    //Meteorshower-Ritual
    if (itemId == 347 && blockId == 87 && getPlayerX() >= x && getPlayerX() < x + 1 && getPlayerY() - 2 < y + 1 && getPlayerY() - 2 >= y && getPlayerZ() < z + 1 && getPlayerZ() >= z )
    {
      ritual = 1;
      for (var i = 0;i < 3;i++)
      {
        for(var j = 0;j < 3;j++)
        {
          if (getTile(x - 1 + i,y,z - 1 + j) != 87)
          {
            ritual = 0;
          }
        }
      }
      if (getTile(x - 1,y + 1,z - 1) != 87)
      {
        ritual = 0;
      }
      if (getTile(x + 1,y + 1,z + 1) != 87)
      {
        ritual = 0;
      }
      if (getTile(x + 1,y + 1,z - 1) != 87)
      {
        ritual = 0;
      }
      if (getTile(x - 1,y + 1,z + 1) != 87)
      {
        ritual = 0;
      }
      if (getTile(x - 1,y + 2,z - 1) != 51)
      {
        ritual = 0;
      }
      if (getTile(x + 1,y + 2,z + 1) != 51)
      {
        ritual = 0;
      }
      if (getTile(x + 1,y + 2,z - 1) != 51)
      {
        ritual = 0;
      }
      if (getTile(x - 1,y + 2,z + 1) != 51)
      {
        ritual = 0;
      }
      if (meteorshower == 0 && ritual == 1)
      {
        clientMessage("Get in cover.Meteors are incoming");
        meteorintervall = 0;
        meteorshower = 1;
        time = 0.0;
      }
      else if (ritual == 1)
      {
        clientMessage("Meteors are no longer falling from the sky.");
        meteorshower = 0;
        for (var i = 0;i < 4;i++)
        {
          setTile(meteorx1,meteory1 + i,meteorz1,0);
        }
        for (var i = 0;i < 4;i++)
        {
          setTile(meteorx2,meteory2 + i,meteorz2,0);
        }
        for (var i = 0;i < 4;i++)
        {
          setTile(meteorx3,meteory3 + i,meteorz3,0);
        }
        for (var i = 0;i < 4;i++)
        {
          setTile(meteorx4,meteory4 + i,meteorz4,0);
        }
        for (var i = 0;i < 4;i++)
        {
          setTile(meteorx5,meteory5 + i,meteorz5,0);
        }
      }
    }
    otherbomb = 0;
    //Spawn dirt-boss
    if (blockId == 8 && itemId == 10 && bossactive == 0)
    {
      if (getTile(x,y + 1,z) == 7)
      {
        if (getTile(x,y - 1,z) == 9)
        {
          setTile(x,y,z,0);
          setTile(x,y + 1,z,0);
          setTile(x,y - 1,z,0);
          clientMessage("A dirt-boss wants to kill you.");
          bossactive = 1;
          dirtbossactive = 1;
          spawndirtboss(x,y + 4,z);
          movedirtbossx = 0;
          movedirtbossy = 0;
          movedirtbossz = 0;
          dirtbossx = x;
          dirtbossy = y + 4;
          dirtbossz = z;
          dirtbosslive = 500;
          dirtbossmoved = 0
          dirtbossrotation = 1;
          dirtbossanimation = 0;
          dirtbossspecialattacktimer = 0;
        }
      }
    }
    //Hit dirtboss
    if (itemId == 268 || itemId == 272 || itemId == 267 || itemId == 283 || itemId == 276)
    {
      if (blockId == 3 || blockId == 2)
      {
        for (var i = 0;i < 3;i++)
        {
          for (var j = 0;j < 3;j++)
          {
            for (var k = 0;k < 3;k++)
            {
              if (x == dirtbossx - 1 + i && y == dirtbossy - 1 + j && z == dirtbossz - 1 + k)
              {
                if (itemId == 268)
                {
                  dirtbosslive -= 1;
                  if (dirtbosslive > 0)
                  {
                    clientMessage(dirtbosslive);
                  }
                }
                if (itemId == 272)
                {
                  dirtbosslive -= 2;
                  if (dirtbosslive > 0)
                  {
                    clientMessage(dirtbosslive);
                  }
                }
                if (itemId == 267)
                {
                  dirtbosslive -= 3;
                  if (dirtbosslive > 0)
                  {
                    clientMessage(dirtbosslive);
                  }
                }
                if (itemId == 283)
                {
                  dirtbosslive -= 4;
                  if (dirtbosslive > 0)
                  {
                    clientMessage(dirtbosslive);
                  }
                }
                if (itemId == 276)
                {
                  dirtbosslive -= 5;
                  if (dirtbosslive > 0)
                  {
                    clientMessage(dirtbosslive);
                  }
                }
              }
            }
          }
        }
      }
    }
    //Spawn fire-boss
    if (blockId == 49 && itemId == 155 && bossactive == 0)
    {
      if (getTile(x,y + 1,z) == 49)
      {
        if (getTile(x,y - 1,z) == 49)
        {
          setTile(x,y,z,0);
          setTile(x,y + 1,z,0);
          setTile(x,y - 1,z,0);
          clientMessage("Ты возродил моё создание, теперь беги!");
          bossactive = 1;
          firebossactive = 1;
          spawnfireboss(x,y + 10,z);
          movefirebossx = 0;
          movefirebossy = 0;
          movefirebossz = 0;
          firebossx = x;
          firebossy = y + 6;
          firebossz = z;
          firebosslive = 50;
          firebossmoved = 0
          firebossrotation = 1;
          firebossanimation = 0;
          firebossspecialattacktimer = 0;
          firebossball = 0;
          firebosstimer = 0;
          firebossattacktimer = 0;
        }
      }
    }
    //Hit fireboss
    if (itemId == 268 || itemId == 272 || itemId == 267 || itemId == 283 || itemId == 276)
    {
      if (blockId == 155)
      {
        for (var i = 0;i < 5;i++)
        {
          for (var j = 0;j < 5;j++)
          {
            for (var k = 0;k < 5;k++)
            {
              if (x == firebossx - 2 + i && y == firebossy - 2 + j && z == firebossz - 2 + k)
              {
                if (itemId == 268)
                {
                  firebosslive -= 1;
                  if (firebosslive > 0)
                  {
                    clientMessage(firebosslive);
                  }
                }
                if (itemId == 272)
                {
                  firebosslive -= 2;
                  if (firebosslive > 0)
                  {
                    clientMessage(firebosslive);
                  }
                }
                if (itemId == 267)
                {
                  firebosslive -= 3;
                  if (firebosslive > 0)
                  {
                    clientMessage(firebosslive);
                  }
                }
                if (itemId == 283)
                {
                  firebosslive -= 4;
                  if (firebosslive > 0)
                  {
                    clientMessage(firebosslive);
                  }
                }
                if (itemId == 276)
                {
                  firebosslive -= 5;
                  if (firebosslive > 0)
                  {
                    clientMessage(firebosslive);
                  }
                }
              }
            }
          }
        }
      }
    }
}

function attackHook(attacker,victim)
{
    playerrotation = getYaw();
    if (playerrotation > 360 || playerrotation < -360)
    {
      playerrotation -= parseInt(playerrotation / 360) * 360;
    }

    //Super-Weapon attack
    if (getCarriedItem() == 347)
    {
      if (playerrotation > 0 && playerrotation < 90)
      {
        setVelY(victim,1.5);
        setVelZ(victim,5);
      }
      if (playerrotation > 90 && playerrotation < 180)
      {
        setVelY(victim,1.5);
        setVelX(victim,-5);
      }
      if (playerrotation > 180 && playerrotation < 270)
      {
        setVelY(victim,1.5);
        setVelZ(victim,-5);
      }
      if (playerrotation > 270 && playerrotation < 360)
      {
        setVelY(victim,1.5);
        setVelX(victim,5);
      }
      if (playerrotation > -360 && playerrotation < -270)
      {
        setVelY(victim,1.5);
        setVelZ(victim,5);
      }
      if (playerrotation > -270 && playerrotation < -180)
      {
        setVelY(victim,1.5);
        setVelX(victim,-5);
      }
      if (playerrotation > -180 && playerrotation < -90)
      {
        setVelY(victim,1.5);
        setVelZ(victim,-5);
      }
      if (playerrotation > -90 && playerrotation < 0)
      {
        setVelY(victim,1.5);
        setVelX(victim,5);
      }
    }
    //Super-Virus attack
    if (getCarriedItem() == 341)
    {
      supervirusentity = victim;
      supervirus = 1;
      supervirusrotx = Entity.getPitch(victim);
      supervirusroty = Entity.getYaw(victim);
    }
}

function modTick()
{
    //Time-Bomb
    if (activate_time_explode == 1 && bombactivated == 1)
    {
      bombtime += 0.05;
      if (bombtime >= bombtimeexplode)
      {
        bombtime = 10.0;
        explosion = 0;
        if (getTile(bombx,bomby,bombz) == 46)
        {
          clientMessage("BOOOOOOOM");
          setTile(bombx,bomby,bombz,0);
          //Napalm-Bombe
          if (explosion == 0)
          {
            if (getTile(bombx + 1,bomby,bombz) == 87)
            {
              if (getTile(bombx - 1,bomby,bombz) == 87)
              {
                if (getTile(bombx,bomby,bombz + 1) == 87)
                {
                  if (getTile(bombx,bomby,bombz - 1) == 87)
                  {
                    setTile(bombx + 1,bomby,bombz,0);
                    setTile(bombx - 1,bomby,bombz,0);
                    setTile(bombx,bomby,bombz + 1,0);
                    setTile(bombx,bomby,bombz - 1,0);
                    explode(bombx,bomby,bombz,5);
                    for (var i = 0;i < 20;i++)
                    {
                      for (var j = 0;j < 20;j++)
                      {
                        for (var k = 0;k < 30;k++)
                        {
                          if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 0)
                          {
                            setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,51);
                          }
                        }
                      }
                    }
                    explosion = 1;
                  }
                }
              }
            }
          }
          //Biochemikalbomb
          if (explosion == 0)
          {
            if (getTile(bombx + 1,bomby,bombz) == 3)
            {
              if (getTile(bombx - 1,bomby,bombz) == 3)
              {
                if (getTile(bombx,bomby,bombz + 1) == 3)
                {
                  if (getTile(bombx,bomby,bombz - 1) == 3)
                  {
                    if (getTile(bombx + 1,bomby,bombz + 1) == 11)
                    {
                      if (getTile(bombx - 1,bomby,bombz - 1) == 11)
                      {
                        if (getTile(bombx + 1,bomby,bombz - 1) == 11)
                        {
                          if (getTile(bombx - 1,bomby,bombz + 1) == 11)
                          {
                            setTile(x + 1,y,z,0);
                            setTile(bombx + 1,bomby - 1,bombz);
                            setTile(bombx - 1,bomby - 1,bombz);
                            setTile(bombx,bomby - 1,bombz + 1);
                            setTile(bombx,bomby - 1,bombz - 1);
                            setTile(bombx + 1,bomby,bombz);
                            setTile(bombx - 1,bomby,bombz);
                            setTile(bombx,bomby,bombz + 1);
                            for (var i = 0;i < 20;i++)
                            {
                              for (var j = 0;j < 20;j++)
                              {
                                for (var k = 0;k < 30;k++)
                                {
                                  if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 2)
                                  {
                                    setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,11);
                                  }
                                  if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 17)
                                  {
                                    setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,11);
                                  }
                                  if (getTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j) == 18)
                                  {
                                    setTile(bombx - 10 + i,bomby - 15 + k,bombz - 10 + j,11);
                                  }
                                }
                              }
                            }
                            explosion = 1;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          //Nuke
          if (explosion == 0)
          {
            if (getTile(bombx,bomby - 1,bombz) == 49)
            {
              if (getTile(bombx,bomby + 1,bombz) == 49)
              {
                if (getTile(bombx + 1,bomby,bombz) == 49)
                {
                  if (getTile(bombx - 1,bomby,bombz) == 49)
                  {
                    if (getTile(bombx,bomby,bombz + 1) == 49)
                    {
                      if (getTile(bombx,bomby,bombz - 1) == 49)
                      {
                        setTile(bombx,bomby - 1,bombz,0);
                        setTile(bombx,bomby + 1,bombz,0);
                        setTile(bombx + 1,bomby,bombz,0);
                        setTile(bombx - 1,bomby,bombz,0);
                        setTile(bombx,bomby,bombz + 1,0);
                        setTile(bombx,bomby,bombz - 1,0);
                        explode(bombx,bomby,bombz,15);
                        explode(bombx,bomby + 15,bombz,15);
                        explode(bombx,bomby,bombz + 15,10);
                        explode(bombx,bomby,bombz - 15,10);
                        explode(bombx + 15,bomby,bombz,10);
                        explode(bombx - 15,bomby,bombz,10);
                        explosion = 1;
                      }
                    }
                  }
                }
              }
            }
          }
          //Bombe
          if (explosion == 0)
          {
            explode(bombx,bomby,bombz,15);
            explosion = 1;
          }
          otherbomb = 1;
        }
        bombactivated = 0;
      }
    }
    //Meteor-Shower
    randx += getPlayerZ();
    randz += getPlayerX();
    while (randx > 1)
    {
      randx --;
    }
    while (randz > 1)
    {
      randz --;
    }
    if (meteorshower == 1)
    {
      time += 1;
      second += 0.05;
      if (second >= 1)
      {
        second = 0;
      }
      if (time > meteorintervall && meteors < 5)
      {
        if (meteorfree1 == 1)
        {
          meteorfree1 = 0;
          meteorslot = 1;
        }
        else if (meteorfree2 == 1)
        {
          meteorfree2 = 0;
          meteorslot = 2;
        }
        else if (meteorfree3 == 1)
        {
          meteorfree3 = 0;
          meteorslot = 3;
        }
        else if (meteorfree4 == 1)
        {
          meteorfree4 = 0;
          meteorslot = 4;
        }
        else if (meteorfree5 == 1)
        {
          meteorfree5 = 0;
          meteorslot = 5;
        }
        posx = 256 * randx;
        posz = 256 * randz;
        switch (meteorslot)
        {
          case 1:
            meteorx1 = posx;
            meteory1 = 128;
            meteorz1 = posz;
            break;

          case 2:
            meteorx2 = posx;
            meteory2 = 128;
            meteorz2 = posz;
            break;

          case 3:
            meteorx3 = posx;
            meteory3 = 128;
            meteorz3 = posz;
            break;

          case 4:
            meteorx4 = posx;
            meteory4 = 128;
            meteorz4 = posz;
            break;

          case 5:
            meteorx5 = posx;
            meteory5 = 128;
            meteorz5 = posz;
            break;
        }
        time = 0;
        meteors++;
      }
    }
    if (meteors > 0)
    {
      for (var i = 0;i < meteors;i++)
      {
        switch (i)
        {
          case 0:
            if (meteorfree1 == 0)
            {
              setTile(meteorx1,meteory1 + 3,meteorz1,0);
              meteory1 -= 1;
              setTile(meteorx1,meteory1 + 1,meteorz1,10);
              setTile(meteorx1,meteory1 + 2,meteorz1,10);
              setTile(meteorx1,meteory1 + 3,meteorz1,10);
              if (getTile(meteorx1,meteory1,meteorz1) == 0)
              {
                setTile(meteorx1,meteory1,meteorz1,87);
              }
              else
              {
                setTile(meteorx1,meteory1 + 1,meteorz1,0);
                setTile(meteorx1,meteory1 + 2,meteorz1,0);
                setTile(meteorx1,meteory1 + 3,meteorz1,0);
                explode(meteorx1,meteory1,meteorz1,5);
                SetonFire(meteorx1,meteory1,meteorz1,4);
                meteors--;
                meteorfree1 = 1;
              }
            }
            break;

          case 1:
            if (meteorfree2 == 0)
            {
              setTile(meteorx2,meteory2 + 3,meteorz2,0);
              meteory2 -= 1;
              setTile(meteorx2,meteory2 + 1,meteorz2,10);
              setTile(meteorx2,meteory2 + 2,meteorz2,10);
              setTile(meteorx2,meteory2 + 3,meteorz2,10);
              if (getTile(meteorx2,meteory2,meteorz2) == 0)
              {
                setTile(meteorx2,meteory2,meteorz2,87);
              }
              else
              {
                setTile(meteorx2,meteory2 + 1,meteorz2,0);
                setTile(meteorx2,meteory2 + 2,meteorz2,0);
                setTile(meteorx2,meteory2 + 3,meteorz2,0);
                explode(meteorx2,meteory2,meteorz2,5);
                SetonFire(meteorx2,meteory2,meteorz2,4);
                meteors--;
                meteorfree2 = 1;
              }
            }
            break;

          case 2:
            if (meteorfree3 == 0)
            {
              setTile(meteorx3,meteory3 + 3,meteorz3,0);
              meteory3 -= 1;
              setTile(meteorx3,meteory3 + 1,meteorz3,10);
              setTile(meteorx3,meteory3 + 2,meteorz3,10);
              setTile(meteorx3,meteory3 + 3,meteorz3,10);
              if (getTile(meteorx3,meteory3,meteorz3) == 0)
              {
                setTile(meteorx3,meteory3,meteorz3,87);
              }
              else
              {
                setTile(meteorx3,meteory3 + 1,meteorz3,0);
                setTile(meteorx3,meteory3 + 2,meteorz3,0);
                setTile(meteorx3,meteory3 + 3,meteorz3,0);
                explode(meteorx3,meteory3,meteorz3,5);
                SetonFire(meteorx3,meteory3,meteorz3,4);
                meteors--;
                meteorfree3 = 1;
              }
            }
            break;

          case 3:
            if (meteorfree4 == 0)
            {
              setTile(meteorx4,meteory4 + 3,meteorz4,0);
              meteory4 -= 1;
              setTile(meteorx4,meteory4 + 1,meteorz4,10);
              setTile(meteorx4,meteory4 + 2,meteorz4,10);
              setTile(meteorx4,meteory4 + 3,meteorz4,10);
              if (getTile(meteorx4,meteory4,meteorz4) == 0)
              {
                setTile(meteorx4,meteory4,meteorz4,87);
              }
              else
              {
                setTile(meteorx4,meteory4 + 1,meteorz4,0);
                setTile(meteorx4,meteory4 + 2,meteorz4,0);
                setTile(meteorx4,meteory4 + 3,meteorz4,0);
                explode(meteorx4,meteory4,meteorz4,5);
                SetonFire(meteorx4,meteory4,meteorz4,4);
                meteors--;
                meteorfree4 = 1;
              }
            }
            break;

          case 4:
            if (meteorfree5 == 0)
            {
              setTile(meteorx5,meteory5 + 3,meteorz5,0);
              meteory5 -= 1;
              setTile(meteorx5,meteory5 + 1,meteorz5,10);
              setTile(meteorx5,meteory5 + 2,meteorz5,10);
              setTile(meteorx5,meteory5 + 3,meteorz5,10);
              if (getTile(meteorx5,meteory5,meteorz5) == 0)
              {
                setTile(meteorx5,meteory5,meteorz5,87);
              }
              else
              {
                setTile(meteorx5,meteory5 + 1,meteorz5,0);
                setTile(meteorx5,meteory5 + 2,meteorz5,0);
                setTile(meteorx5,meteory5 + 3,meteorz5,0);
                explode(meteorx5,meteory5,meteorz5,5);
                SetonFire(meteorx5,meteory5,meteorz5,4);
                meteors--;
                meteorfree5 = 1;
              }
            }
            break;
        }
      }
    }
    //Projectiles
    if (projectil == 1)
    {
      //Mortar
      if (signal == 1)
      {
        setTile(projectilx,projectily,projectilz,0);
        if (targetx > 0)
        {
          if (velocityx < targetx)
          {
            velocityx ++;
            projectilx ++;
          }
        }
        else
        {
          if (velocityx > targetx)
          {
            velocityx --;
            projectilx --;
          }
        }
        if (targetz > 0)
        {
          if (velocityz < targetz)
          {
            velocityz ++;
            projectilz ++;
          }
        }
        else
        {
          if (velocityz > targetz)
          {
            velocityz --;
            projectilz --;
          }
        }
        distancex = velocityx;
        distancez = velocityz;
        if (distancex < 0)
        {
          distancex *= -1;
        }
        if (distancez < 0)
        {
          distancez *= -1;
        }
        if ((distancex + distancez) < (targetpositivx + targetpositivz) / 2)
        {
          projectily++;
        }
        else
        {
          projectily--;
        }
        if (projectilx > 256 || projectilx < 0 || projectily < 0 || projectilz > 256 || projectilz < 0)
        {
          clientMessage("Mortargrenade flies out of the world.");
          projectil = 0;
        }
        if (getTile(projectilx,projectily,projectilz) == 0)
        {
          setTile(projectilx,projectily,projectilz,49);
        }
        else
        {
          explode(projectilx,projectily,projectilz,4);
          projectil = 0;
        }
      }
    }
    //Boss spawn
    if (randx > randz && randx < randz + 0.00001 && bossactive == 0)
    {
      if (randx > 0.5)
      {
        clientMessage("A dirt-boss wants to kill you.");
        bossactive = 1;
        dirtbossactive = 1;
        spawndirtboss(randx * 256,getPlayerY(),randz  * 256);
        movedirtbossx = 0;
        movedirtbossy = 0;
        movedirtbossz = 0;
        dirtbossx = randx * 256;
        dirtbossy = getPlayerY();
        dirtbossz = randz * 256;
        dirtbosslive = 500;
        dirtbossmoved = 0
        dirtbossrotation = 1;
        dirtbossanimation = 0;
        dirtbossspecialattacktimer = 0;
      }
      else
      {
        clientMessage("Ты возродил моё создание, теперь беги!");
        bossactive = 1;
        firebossactive = 1;
        spawnfireboss(randx * 256,getPlayerY(),randz * 256);
        movefirebossx = randx * 256;
        movefirebossy = getPlayerY();
        movefirebossz = randz * 256;
        firebossx = x;
        firebossy = y + 4;
        firebossz = z;
        firebosslive = 750;
        firebossmoved = 0
        firebossrotation = 1;
        firebossanimation = 0;
        firebossspecialattacktimer = 0;
        firebossball = 0;
        firebosstimer = 0;
        firebossattacktimer = 0;
      }
    }
    else if (randz > randx && randz < randx + 0.00001 && bossactive == 0)
    {
      if (randx > 0.5)
      {
        clientMessage("A dirt-boss wants to kill you.");
        bossactive = 1;
        dirtbossactive = 1;
        spawndirtboss(randx * 256,getPlayerY(),randz * 256);
        movedirtbossx = 0;
        movedirtbossy = 0;
        movedirtbossz = 0;
        dirtbossx = randx * 256;
        dirtbossy = getPlayerY();
        dirtbossz = randz * 256;
        dirtbosslive = 500;
        dirtbossmoved = 0
        dirtbossrotation = 1;
        dirtbossanimation = 0;
        dirtbossspecialattacktimer = 0;
      }
      else
      {
        clientMessage("A fire-boss wants to kill you.");
        bossactive = 1;
        firebossactive = 1;
        spawnfireboss(randx * 256,getPlayerY(),randz * 256);
        movefirebossx = randx * 256;
        movefirebossy = getPlayerY();
        movefirebossz = randz * 256;
        firebossx = x;
        firebossy = y + 6;
        firebossz = z;
        firebosslive = 50;
        firebossmoved = 0
        firebossrotation = 1;
        firebossanimation = 0;
        firebossspecialattacktimer = 0;
        firebossball = 0;
        firebosstimer = 0;
        firebossattacktimer = 0;
      }
    }
    //Dirtboss
    //Damage check
    dirtbossdamage = 0;
    if (dirtbossactive == 1)
    {
      dirtbossdamagetest(dirtbossx,dirtbossy,dirtbossz,dirtbossrotation,dirtbossanimation);
    }
    if (dirtbossdamage > 0 && dirtbossactive == 1)
    {
      dirtbosslive -= dirtbossdamage;
      if (dirtbosslive > 0)
      {
        clientMessage(dirtbosslive);
      }
    }
    if (dirtbosslive <= 0 && dirtbossactive == 1)
    {
      bossactive = 0;
      dirtbossactive = 0;
      cleardirtboss(dirtbossx,dirtbossy,dirtbossz,dirtbossrotation,dirtbossanimation);
      explode(dirtbossx,dirtbossy,dirtbossz,5);
      clientMessage("You killed the dirtboss");
      clientMessage("You received a diamond");
      addItemInventory(264,1);
    }
    if (dirtbossactive == 1)
    {
      dirtbossanimationlast = dirtbossanimation;
      dirtbosslastx = dirtbossx;
      dirtbosslasty = dirtbossy;
      dirtbosslastz = dirtbossz;
      dirtbossrotationlast = dirtbossrotation;
      dirtbosstimer += 0.05;
      if (dirtbossrotation == 1 || dirtbossrotation == 3)
      {
        if (getTile(dirtbossx - 1,dirtbossy - 4,dirtbossz) == 0)
        {
          if (getTile(dirtbossx + 1,dirtbossy - 4,dirtbossz) == 0)
          {
            movedirtbossy -= 1;
          }
        }
      }
      else
      {
        if (getTile(dirtbossx,dirtbossy - 4,dirtbossz + 1) == 0)
        {
          if (getTile(dirtbossx,dirtbossy - 4,dirtbossz - 1) == 0)
          {
            movedirtbossy -= 1;
          }
        }
      }
    }
    //AI
    if (dirtbossactive == 1 && dirtbosstimer >= 0.4)
    {
      dirtbossai(dirtbossx,dirtbossy,dirtbossz,getPlayerX(),getPlayerY(),getPlayerZ(),dirtbossrotation);
    }
    if (dirtbossactive == 1)
    {
      dirtbossspecialattacktimer += 0.05;
    }
    if (firebossball == 1)
    {
      setTile
    }
    //New rendering
    dirtbossmoved = 0;
    if (movedirtbossx != 0 && dirtbossactive == 1)
    {
      dirtbossx += movedirtbossx;
      movedirtbossx = 0;
      dirtbossmoved = 1;
    }
    if (movedirtbossy != 0 && dirtbossactive == 1)
    {
      dirtbossy += movedirtbossy;
      movedirtbossy = 0;
      dirtbossmoved = 1;
    }
    if (movedirtbossz != 0 && dirtbossactive == 1)
    {
      dirtbossz += movedirtbossz;
      movedirtbossz = 0;
      dirtbossmoved = 1;
    }
    if (dirtbossmoved == 1  && dirtbossactive == 1)
    {
      cleardirtboss(dirtbosslastx,dirtbosslasty,dirtbosslastz,dirtbossrotationlast,dirtbossanimationlast);
      renderdirtboss(dirtbossx,dirtbossy,dirtbossz,dirtbossrotation,dirtbossanimation);
    }
    else if (dirtbossdamage > 0 && dirtbossactive == 1)
    {
      cleardirtboss(dirtbosslastx,dirtbosslasty,dirtbosslastz,dirtbossrotationlast,dirtbossanimationlast);
      renderdirtboss(dirtbossx,dirtbossy,dirtbossz,dirtbossrotation,dirtbossanimation);
    }
    if (dirtbosstimer >= 0.4)
    {
      dirtbosstimer = 0;
    }
    //Super-Virus
    if (supervirus == 1)
    {
      supervirusrotx += randx - randz;
      supervirusroty += randz - randx;
      setRot(supervirusentity,supervirusrotx,supervirusroty);
      if (randx > 0.5)
      {
        setVelX(supervirusentity,randx - 0.5);
      }
      else
      {
        setVelX(supervirusentity,-randx);
      }
      if (randz > 0.5)
      {
        setVelZ(supervirusentity,randz - 0.5);
      }
      else
      {
        setVelZ(supervirusentity,-randz);
      }
      if (randz > 0.5)
      {
        setVelY(supervirusentity,randz - 0.5);
      }
      else
      {
        setVelY(supervirusentity,-randz);
      }
    }
    //Fireboss
    //Gravity
    if (firebossactive == 1)
    {
      firebossdamage = 0;
      //firebossdamagetest(firebossx,firebossy,firebossz,firebossanimation);
      firebosslastx = firebossx;
      firebosslasty = firebossy;
      firebosslastz = firebossz;
      if (firebossanimation == 1)
      {
        firebossanimationtime += 0.05;
        if (firebossanimationtime >= 2.0)
        {
          firebossanimation = 0;
        }
      }
    }
    if (firebossactive == 1 && firebosslive <= 0)
    {
      firebossactive = 0;
      bossactive = 0;
      clearfireboss(firebossx,firebossy,firebossz);
      explode(firebossx,firebossy,firebossz,5);
      SetonFire(firebossx,firebossy,firebossz,5);
      clientMessage("Красава, ты убил моего гаста;)");
      clientMessage("Лови 1000 алмазов;)");
      addItemInventory(264,1000);
    }
    if (getTile(firebossx,firebossy - 5,firebossz) == 0 && firebossactive == 1)
    {
      movefirebossy --;
    }
    //Fire
    if (firebossactive == 1)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          for (var k = 0;k < 5;k++)
          {
            if (getTile(firebossx - 2 + i,firebossy - 4 + j,firebossz - 2 + k) == 0)
            {
              setTile(firebossx - 2 + i,firebossy - 4 + j,firebossz - 2 + k,49);
            }
          }
        }
      }
    }
    //AI
    firebosstimer += 0.05;
    firebossattacktimer += 0.05;
    if (firebossactive == 1 && firebosstimer >= 0.5)
    {
      firebossai(firebossx,firebossy,firebossz,getPlayerX(),getPlayerY(),getPlayerZ(),firebossrotation,firebossanimation);
    }
    if (firebossactive == 1)
    {
      firebossspecialattacktimer += 0.05;
    }
    if (firebossball == 1)
    {
      setTile(firebossballlastx,firebossballlasty,firebossballlastz,0);
      setTile(firebossballlastx,firebossballlasty + 1,firebossballlastz,0);
      firebossballlastx = firebossballx;
      firebossballlasty = firebossbally;
      firebossballlastz = firebossballz;
      firebossballx += firebosstargetx;
      firebossbally += firebosstargety;
      firebossballz += firebosstargetz;
      if (getTile(firebossballx,firebossbally,firebossballz) == 0)
      {
        setTile(firebossballx,firebossbally,firebossballz,10);
        setTile(firebossballx,firebossbally + 1,firebossballz,51);
      }
      else
      {
        firebossball = 0;
        explode(firebossballx,firebossbally,firebossballz,20);
        SetonFire(firebossballx,firebossbally,firebossballz,10);
      }
      if (firebossballx > 256 || firebossballx < 0 || firebossballz > 256 || firebossballz < 0 || firebossbally > 128 || firebossbally < 0)
      {
        firebossball = 0;
      }
    }
    //New rendering
    firebossmoved = 0;
    if (movefirebossx != 0 && firebossactive == 1)
    {
      firebossx += movefirebossx;
      movefirebossx = 0;
      firebossmoved = 1;
    }
    if (movefirebossy != 0 && firebossactive == 1)
    {
      firebossy += movefirebossy;
      movefirebossy = 0;
      firebossmoved = 1;
    }
    if (movefirebossz != 0 && firebossactive == 1)
    {
      firebossz += movefirebossz;
      movefirebossz = 0;
      firebossmoved = 1;
    }
    if (firebossmoved == 1 && firebossactive == 1)
    {
      clearfireboss(firebosslastx,firebosslasty,firebosslastz);
      renderfireboss(firebossx,firebossy,firebossz,firebossrotation,firebossanimation);
    }
    else if (firebossdamage > 0 && firebossactive == 1)
    {
      clearfireboss(firebosslastx,firebosslasty,firebosslastz);
      renderfireboss(firebossx,firebossy,firebossz,firebossrotation,firebossanimation);
    }
    if (firebossdamage > 0 && firebossactive == 1)
    {
      firebosslive -= firebossdamage;
      clientMessage(firebosslive);
    }
    if (firebosstimer >= 0.5)
    {
      firebosstimer = 0;
    }
}

function procCmd(cmd)
{
    var cmd=cmd.split(" ");
    switch (cmd [0])
    {
      case "help":
        clientMessage("getplayerposition");
        clientMessage("setplayerposition <x> <y> <z>");
        clientMessage("moveplayer <x> <y> <z>");
        clientMessage("give <id> <amount>");
        clientMessage("bombactivate");
        clientMessage("bombtime");
        clientMessage("setbombtime <time>");
        clientMessage("explode <x> <y> <z> <radius>");
        clientMessage("setonfire <x> <y> <z> <radius>");
        clientMessage("meteorshower <intervall>");
        clientMessage("killboss");
        break;

      case "getplayerposition":
        clientMessage(getPlayerX());
        clientMessage(getPlayerY());
        clientMessage(getPlayerZ());
        break;

      case "setplayerposition":
        setPosition(getPlayerEnt(),parseInt(cmd[1]),parseInt(cmd[2]),parseInt(cmd[3]));
        break;

      case "moveplayer":
        setPositionRelative(getPlayerEnt(),parseInt(cmd[1]),parseInt(cmd[2]),parseInt(cmd[3]));
        break;

      case "give":
        addItemInventory(parseInt(cmd[1]),parseInt(cmd[2]));
        break;

      case "bombactivate":
         activate_time = 0;
        clientMessage("Bombactivation is now set to activation by yourself");
        break;

      case "bombtime":
        activate_time = 1;
        clientMessage("Bombactivation is now set to time");
        break;

      case "setbombtime":
        clientMessage("New bombtime has been set.");
        bombtimeexplode = parseInt(cmd[1]);
        break;

      case "explode":
        clientMessage("BOOOOOOOM");
        explode(parseInt(cmd[1]),parseInt(cmd[2]),parseInt(cmd[3]),parseInt(cmd[4]));
        break;

      case "setonfire":
        SetonFire(parseInt(cmd[1]),parseInt(cmd[2]),parseInt(cmd[3]),parseInt(cmd[4]));
        break;

      case "meteorshower":
        if (meteorshower == 0)
        {
          clientMessage("Get in cover.Meteors are incoming");
          meteorintervall = parseInt(cmd[1]);
          if (meteorintervall == 0)
          {
            meteorintervall = 1;
          }
          meteorshower = 1;
          time = 0.0;
        }
        else
        {
          clientMessage("Meteors are no longer falling from the sky.");
          meteorshower = 0;
          for (var i = 0;i < 4;i++)
          {
            setTile(meteorx1,meteory1 + i,meteorz1,0);
          }
          for (var i = 0;i < 4;i++)
          {
            setTile(meteorx2,meteory2 + i,meteorz2,0);
          }
          for (var i = 0;i < 4;i++)
          {
            setTile(meteorx3,meteory3 + i,meteorz3,0);
          }
          for (var i = 0;i < 4;i++)
          {
            setTile(meteorx4,meteory4 + i,meteorz4,0);
          }
          for (var i = 0;i < 4;i++)
          {
            setTile(meteorx5,meteory5 + i,meteorz5,0);
          }
        }
        break;

      case "killboss":
        if (bossactive == 1)
        {
          if (dirtbossactive == 1)
          {
            dirtbosslive = 0;
          }
          else if (firebossactive == 1)
          {
            firebosslive = 0;
          }
        }
        else
        {
          clientMessage("No boss is here.");
        }
        break;

      default:
        clientMessage("No valid command.");
    }
}

function MineOres(x,y,z)
{
    var ores = 0;
    var block = 0;
    if (getTile(x,y,z) == 78)
    {
      ores = -1;
    }
    for (var i = y;i >= 0;i--)
    {
      block = getTile(x,i,z);
      if (block == 14 || block == 15 || block == 16 || block == 21|| block == 56)
      {
        ores++;
        setTile(x,i,z,0);
        setTile(x,y + ores,z,block);
      }
    }
}

function SetonFire(x,y,z,radius)
{
    for (var i = 0;i < radius * 2 + 1;i++)
    {
      for (var j = 0;j < radius * 2 + 1;j++)
      {
        for (var k = 0;k < radius * 2 + 1;k++)
        {
          if (getTile(x - radius + i,y - radius + k,z - radius + j) == 0)
          {
            setTile(x - radius + i,y - radius + k,z - radius + j,51);
          }
        }
      }
    }
}

function buildcommander(x,y,z)
{
    for (var i = 0;i < 7;i++)
    {
      for (var j = 0;j < 5;j++)
      {
        for (var k = 0;k < 7;k++)
        {
          setTile(x - 3 + i,y - 2 + j,z - 3 + k,0);
        }
      }
    }
    for (var i = 0;i < 7;i++)
    {
      for (var j = 0;j < 7;j++)
      {
        setTile(x - 3 + i,y - 2,z - 3 + j,155);
      }
    }
    for (var i = 0;i < 7;i++)
    {
      for (var j = 0;j < 7;j++)
      {
        setTile(x - 3 + i,y + 2,z - 3 + j,155);
      }
    }
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 3;j++)
      {
        setTile(x - 1 + i,y - 2,z - 1 + j,89);
      }
    }
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 7;j++)
      {
        setTile(x - 3,y - 1 + i,z - 3 + j,155);
      }
    }
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 7;j++)
      {
        setTile(x + 3,y - 1 + i,z - 3 + j,155);
      }
    }
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 7;j++)
      {
        setTile(x - 3 + j,y - 1 + i,z - 3,155);
      }
    }
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 7;j++)
      {
        setTile(x - 3 + j,y - 1 + i,z + 3,155);
      }
    }
    for (var i = 0;i < 2;i++)
    {
      for (var j = 0;j < 5;j++)
      {
        setTile(x - 3,y + i,z - 2 + j,20);
      }
    }
    for (var i = 0;i < 2;i++)
    {
      for (var j = 0;j < 5;j++)
      {
        setTile(x + 3,y + i,z - 2 + j,20);
      }
    }
    for (var i = 0;i < 2;i++)
    {
      for (var j = 0;j < 5;j++)
      {
        setTile(x - 2 + j,y + i,z - 3,20);
      }
    }
    for (var i = 0;i < 2;i++)
    {
      for (var j = 0;j < 5;j++)
      {
        setTile(x - 2 + j,y + i,z + 3,20);
      }
    }
    setTile(x - 2,y,z - 3,20);
    setTile(x - 2,y + 1,z - 3,20);
    setTile(x + 2,y,z - 3,20);
    setTile(x + 2,y + 1,z - 3,20);
    setTile(x,y - 1,z - 3,0);
    setTile(x,y,z - 3,0);
    setTile(x - 2,y - 1,z + 2,41);
    setTile(x - 1,y - 1,z + 2,57);
    setTile(x,y - 1,z + 2,42);
    setTile(x + 1,y - 1,z + 2,42);
    setTile(x + 2,y - 1,z + 2,42);
    setTile(x + 2,y - 1,z + 1,42);
    commanderx = x + 2;
    commandery = y - 1;
    commanderz = z + 2;
    commander = 1;
}

function spawndirtboss(x,y,z)
{
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 3;j++)
      {
        for (var k = 0;k < 3;k++)
        {
          setTile(x - 1 + i,y - 1 + j,z - 1 + k,3);
        }
      }
    }
    for (var i = 0;i < 5;i++)
    {
      for (var j = 0;j < 4;j++)
      {
        setTile(x - 2 + i,y - 1 + j,z,3);
      }
    }
    setTile(x - 1,y - 3,z,3);
    setTile(x - 1,y - 2,z,3);
    setTile(x + 1,y - 3,z,3);
    setTile(x + 1,y - 2,z,3);
    setTile(x,y + 2,z + 1,3);
    setTile(x,y + 2,z - 1,3);
    setTile(x,y + 3,z,3);
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 2;j++)
      {
        setTile(x - 1 + i,y + 4,z + j,2);
      }
    }
}

function cleardirtboss(x,y,z,rot,ani)
{
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 3;j++)
      {
        for (var k = 0;k < 3;k++)
        {
          setTile(x - 1 + i,y - 1 + j,z - 1 + k,0);
        }
      }
    }
    if (rot == 1)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x - 2 + i,y - 1 + j,z,0);
        }
      }
      setTile(x - 1,y - 3,z,0);
      setTile(x - 1,y - 2,z,0);
      setTile(x + 1,y - 3,z,0);
      setTile(x + 1,y - 2,z,0);
      setTile(x,y + 2,z + 1,0);
      setTile(x,y + 2,z - 1,0);
      setTile(x,y + 3,z,0);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x - 1 + i,y + 4,z + j,0);
        }
      }
      if (ani == 1)
      {
        setTile(x - 1,y - 3,z + 1,0);
      }
      else if (ani == 3)
      {
        setTile(x + 1,y - 3,z + 1,0);
      }
    }
    if (rot == 2)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x,y - 1 + j,z - 2 + i,0);
        }
      }
      setTile(x,y - 3,z - 1,0);
      setTile(x,y - 2,z - 1,0);
      setTile(x,y - 3,z + 1,0);
      setTile(x,y - 2,z + 1,0);
      setTile(x + 1,y + 2,z,0);
      setTile(x - 1,y + 2,z,0);
      setTile(x,y + 3,z,0);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x - j,y + 4,z - 1 + i,0);
        }
      }
      if (ani == 1)
      {
        setTile(x - 1,y - 3,z - 1,0);
      }
      else if (ani == 3)
      {
        setTile(x - 1,y - 3,z + 1,0);
      }
    }
    if (rot == 3)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x - 2 + i,y - 1 + j,z,0);
        }
      }
      setTile(x - 1,y - 3,z,0);
      setTile(x - 1,y - 2,z,0);
      setTile(x + 1,y - 3,z,0);
      setTile(x + 1,y - 2,z,0);
      setTile(x,y + 2,z + 1,0);
      setTile(x,y + 2,z - 1,0);
      setTile(x,y + 3,z,0);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x - 1 + i,y + 4,z - j,0);
        }
      }
      if (ani == 1)
      {
        setTile(x - 1,y - 3,z - 1,0);
      }
      else if (ani == 3)
      {
        setTile(x + 1,y - 3,z - 1,0);
      }
    }
    if (rot == 4)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x,y - 1 + j,z - 2 + i,0);
        }
      }
      setTile(x,y - 3,z - 1,0);
      setTile(x,y - 2,z - 1,0);
      setTile(x,y - 3,z + 1,0);
      setTile(x,y - 2,z + 1,0);
      setTile(x + 1,y + 2,z,0);
      setTile(x - 1,y + 2,z,0);
      setTile(x,y + 3,z,0);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x + j,y + 4,z - 1 + i,0);
        }
      }
      if (ani == 1)
      {
        setTile(x + 1,y - 3,z - 1,0);
      }
      else if (ani == 3)
      {
        setTile(x + 1,y - 3,z + 1,0);
      }
    }
}

function renderdirtboss(x,y,z,rot,ani)
{
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 3;j++)
      {
        for (var k = 0;k < 3;k++)
        {
          setTile(x - 1 + i,y - 1 + j,z - 1 + k,3);
        }
      }
    }
    if (rot == 1)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x - 2 + i,y - 1 + j,z,3);
        }
      }
      setTile(x - 1,y - 3,z,3);
      setTile(x - 1,y - 2,z,3);
      setTile(x + 1,y - 3,z,3);
      setTile(x + 1,y - 2,z,3);
      setTile(x,y + 2,z + 1,3);
      setTile(x,y + 2,z - 1,3);
      setTile(x,y + 3,z,3);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x - 1 + i,y + 4,z + j,2);
        }
      }
      if (ani == 1)
      {
        setTile(x - 1,y - 3,z,0);
        setTile(x - 1,y - 3,z + 1,3);
      }
      else if (ani == 3)
      {
        setTile(x + 1,y - 3,z,0);
        setTile(x + 1,y - 3,z + 1,3);
      }
    }
    if (rot == 2)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x,y - 1 + j,z - 2 + i,3);
        }
      }
      setTile(x,y - 3,z - 1,3);
      setTile(x,y - 2,z - 1,3);
      setTile(x,y - 3,z + 1,3);
      setTile(x,y - 2,z + 1,3);
      setTile(x + 1,y + 2,z,3);
      setTile(x - 1,y + 2,z,3);
      setTile(x,y + 3,z,3);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x - j,y + 4,z - 1 + i,2);
        }
      }
      if (ani == 1)
      {
        setTile(x,y - 3,z - 1,0);
        setTile(x - 1,y - 3,z - 1,3);
      }
      else if (ani == 3)
      {
        setTile(x,y - 3,z + 1,0);
        setTile(x - 1,y - 3,z + 1,3);
      }
    }
    if (rot == 3)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x - 2 + i,y - 1 + j,z,3);
        }
      }
      setTile(x - 1,y - 3,z,3);
      setTile(x - 1,y - 2,z,3);
      setTile(x + 1,y - 3,z,3);
      setTile(x + 1,y - 2,z,3);
      setTile(x,y + 2,z + 1,3);
      setTile(x,y + 2,z - 1,3);
      setTile(x,y + 3,z,3);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x - 1 + i,y + 4,z - j,2);
        }
      }
      if (ani == 1)
      {
        setTile(x - 1,y - 3,z,0);
        setTile(x - 1,y - 3,z - 1,3);
      }
      else if (ani == 3)
      {
        setTile(x + 1,y - 3,z,0);
        setTile(x + 1,y - 3,z - 1,3);
      }
    }
    if (rot == 4)
    {
      for (var i = 0;i < 5;i++)
      {
        for (var j = 0;j < 4;j++)
        {
          setTile(x,y - 1 + j,z - 2 + i,3);
        }
      }
      setTile(x,y - 3,z - 1,3);
      setTile(x,y - 2,z - 1,3);
      setTile(x,y - 3,z + 1,3);
      setTile(x,y - 2,z + 1,3);
      setTile(x + 1,y + 2,z,3);
      setTile(x - 1,y + 2,z,3);
      setTile(x,y + 3,z,3);
      for (var i = 0;i < 3;i++)
      {
        for (var j = 0;j < 2;j++)
        {
          setTile(x + j,y + 4,z - 1 + i,3);
        }
      }
      if (ani == 1)
      {
        setTile(x,y - 3,z - 1,0);
        setTile(x + 1,y - 3,z - 1,3);
      }
      else if (ani == 3)
      {
        setTile(x,y - 3,z + 1,0);
        setTile(x + 1,y - 3,z + 1,3);
      }
    }
}

function dirtbossdamagetest(x,y,z,rot,ani)
{
    for (var i = 0;i < 3;i++)
    {
      for (var j = 0;j < 3;j++)
      {
        for (var k = 0;k < 3;k++)
        {
          if (getTile(x - 1 + i,y - 1 + j,z - 1 + k,3) != 3)
          {
            dirtbossdamage ++;
          }
        }
      }
    }
}

function dirtbossai(x,y,z,px,py,pz,rot)
{
  //Move and rotate
  dirtbossanimationalready = 0;
  dirtbossminus = 0;
  if (px > x)
  {
    if (px - 2 > x)
    {
      movedirtbossx ++;
    }
    dirtbossanimation ++;
    dirtbossdistancex = px - x;
    dirtbossanimationalready = 1;
  }
  else if (px < x)
  {
    if (px + 2 < x)
    {
      movedirtbossx --;
    }
    dirtbossanimation ++;
    dirtbossminus = 1;
    dirtbossdistancex = x - px;
    dirtbossanimationalready = 1;
  }
  if (pz > z)
  {
    if (pz - 2 > z)
    {
      movedirtbossz ++;
    }
    if (dirtbossanimationalready == 0)
    {
      dirtbossanimation ++;
    }
    dirtbossdistancez = pz - z;
    if (dirtbossdistancex > dirtbossdistancez)
    {
      if (dirtbossminus == 0)
      {
        dirtbossrotation = 4;
      }
      else
      {
        dirtbossrotation = 2;
      }
    }
    else
    {
      dirtbossrotation = 1;
    }
  }
  else if (pz < z)
  {
    if (pz + 2 < z)
    {
      movedirtbossz --;
    }
    if (dirtbossanimationalready == 0)
    {
      dirtbossanimation ++;
    }
    dirtbossdistancez = z - pz;
    if (dirtbossdistancex > dirtbossdistancez)
    {
      if (dirtbossminus == 0)
      {
        dirtbossrotation = 4;
      }
      else
      {
        dirtbossrotation = 2;
      }
    }
    else
    {
      dirtbossrotation = 3;
    }
  }
  if (dirtbossanimation >= 4)
  {
    dirtbossanimation = 0;
  }
  if (rot == 1)
  {
    if (getTile(dirtbossx - 1,dirtbossy - 3,dirtbossz + 2) != 0 || getTile(dirtbossx + 1,dirtbossy - 3,dirtbossz + 2) != 0)
    {
      movedirtbossy ++;
    }
  }
  else if (rot == 2)
  {
    if (getTile(dirtbossx - 1,dirtbossy - 3,dirtbossz + 1) != 0 || getTile(dirtbossx - 1,dirtbossy - 3,dirtbossz - 1) != 0)
    {
      movedirtbossy ++;
    }
  }
  else if (rot == 3)
  {
    if (getTile(dirtbossx - 1,dirtbossy - 3,dirtbossz - 1) != 0 || getTile(dirtbossx + 1,dirtbossy - 3,dirtbossz - 1) != 0)
    {
      movedirtbossy ++;
    }
  }
  else if (rot == 4)
  {
    if (getTile(dirtbossx + 1,dirtbossy - 3,dirtbossz + 1) != 0 || getTile(dirtbossx + 1,dirtbossy - 3,dirtbossz - 1) != 0)
    {
      movedirtbossy ++;
    }
  }
  //Special-Atttack
  if (dirtbossspecialattacktimer >= 5)
  {
    dirtbossspecialattacktimer = 0;
    dirtbossspecialattack(px,py,pz);
  }
  dirtbossdistancey = y - py;
  //Standard-Attack
  if (dirtbossdistancex <= 3 && dirtbossdistancez <= 3 && dirtbossdistancey <= 6 && dirtbossdistancey >= -4)
  {
    dirtbossattack(px,py,pz,rot);
  }
}

function dirtbossspecialattack(x,y,z)
{
  dirtbosstargetx = x - 1 + (2 * randx);
  dirtbosstargetz = z - 1 + (2 * randz);
  setTile(dirtbosstargetx,y,dirtbosstargetz,3);
  setTile(dirtbosstargetx,y - 1,dirtbosstargetz,3);
}

function dirtbossattack(x,y,z,rot)
{
  if (rot == 1)
  {
    setVelZ(getPlayerEnt(),4);
    setVelY(getPlayerEnt(),1);
  }
  else if (rot == 2)
  {
    setVelX(getPlayerEnt(),-4);
    setVelY(getPlayerEnt(),1);
  }
  else if (rot == 3)
  {
    setVelZ(getPlayerEnt(),-4);
    setVelY(getPlayerEnt(),1);
  }
  else if (rot == 4)
  {
    setVelX(getPlayerEnt(),4);
    setVelY(getPlayerEnt(),1);
  }
}

function spawnfireboss(x,y,z)
{
  for (var i = 0;i < 5;i++)
  {
    for (var j = 0;j < 5;j++)
    {
      for (var k = 0;k < 5;k++)
      {
        setTile(x - 2 + i,y - 2 +j,z - 2 + k,87);
      }
    }
  }
  setTile(x - 1,y + 1,z + 2,51);
  setTile(x + 1,y + 1,z + 2,51);
}

function firebossdamagetest(x,y,z,ani)
{
  for (var i = 0;i < 5;i++)
  {
    for (var j = 0;j < 5;j++)
    {
      for (var k = 0;k < 5;k++)
      {
        if (getTile(x - 2 + i,y - 2 + j,z - 2 + k) != 155)
        {
          firebossdamage ++;
        }
        firebossdamage += 2;
        if (ani == 1)
        {
          firebossdamage --;
        }
      }
    }
  }
}

function clearfireboss(x,y,z)
{
  for (var i = 0;i < 5;i++)
  {
    for (var j = 0;j < 5;j++)
    {
      for (var k = 0;k < 5;k++)
      {
        setTile(x - 2 + i,y - 2 + j,z - 2 + k,0);
      }
    }
  }
}

function renderfireboss(x,y,z,rot,ani)
{
  for (var i = 0;i < 5;i++)
  {
    for (var j = 0;j < 5;j++)
    {
      for (var k = 0;k < 5;k++)
      {
        setTile(x - 2 + i,y - 2 + j,z - 2 + k,155);
      }
    }
  }
  if (rot == 1)
  {
    setTile(x - 1,y + 1,z + 2,49);
    setTile(x + 1,y + 1,z + 2,49);
    if (ani == 1)
    {
      setTile(x,y - 1,z + 2,49);
    }
  }
  if (rot == 2)
  {
    setTile(x - 2,y + 1,z - 1,49);
    setTile(x - 2,y + 1,z + 1,49);
    if (ani == 1)
    {
      setTile(x - 2,y - 1,z,49);
    }
  }
  if (rot == 3)
  {
    setTile(x - 1,y + 1,z - 2,49);
    setTile(x + 1,y + 1,z - 2,49);
    if (ani == 1)
    {
      setTile(x,y - 1,z - 2,49);
    }
  }
  if (rot == 4)
  {
    setTile(x + 2,y + 1,z - 1,49);
    setTile(x + 2,y + 1,z + 1,49);
    if (ani == 1)
    {
      setTile(x + 2,y - 1,z,49);
    }
  }
}

function firebossai(x,y,z,px,py,pz,rot,ani)
{
  //Move and rotate
  firebossminus = 0;
  if (px > x)
  {
    if (px - 2 > x)
    {
      movefirebossx ++;
    }
    firebossdistancex = px - x;
  }
  else if (px < x)
  {
    if (px + 2 < x)
    {
      movefirebossx --;
    }
    firebossminus = 1;
    firebossdistancex = x - px;
  }
  if (pz > z)
  {
    if (pz - 2 > z)
    {
      movefirebossz ++;
    }
    firebossdistancez = pz - z;
    if (firebossdistancex > firebossdistancez)
    {
      if (firebossminus == 0)
      {
        firebossrotation = 4;
      }
      else
      {
        firebossrotation = 2;
      }
    }
    else
    {
      firebossrotation = 1;
    }
  }
  else if (pz < z)
  {
    if (pz + 2 < z)
    {
      movefirebossz --;
    }
    firebossdistancez = z - pz;
    if (firebossdistancex > firebossdistancez)
    {
      if (firebossminus == 0)
      {
        firebossrotation = 4;
      }
      else
      {
        firebossrotation = 2;
      }
    }
    else
    {
      firebossrotation = 3;
    }
  }
  if (rot == 1)
  {
    if (getTile(firebossx - 1,firebossy - 5,firebossz + 2) != 0 || getTile(firebossx + 1,firebossy - 4,firebossz + 2) != 0)
    {
      movefirebossy ++;
    }
  }
  else if (rot == 2)
  {
    if (getTile(firebossx - 2,firebossy - 5,firebossz + 1) != 0 || getTile(firebossx - 2,firebossy - 4,firebossz - 1) != 0)
    {
      movefirebossy ++;
    }
  }
  else if (rot == 3)
  {
    if (getTile(firebossx - 1,firebossy - 5,firebossz - 2) != 0 || getTile(firebossx + 1,firebossy - 4,firebossz - 2) != 0)
    {
      movefirebossy ++;
    }
  }
  else if (rot == 4)
  {
    if (getTile(firebossx + 2,firebossy - 5,firebossz + 1) != 0 || getTile(firebossx + 2,firebossy - 4,firebossz - 1) != 0)
    {
      movefirebossy ++;
    }
  }
  if (firebossattacktimer >= 10.0 && firebossball == 0)
  {
    firebossattack(x,y,z,px,py,pz,rot);
    firebossattacktimer = 0;
    firebossanimation = 1;
  }
}

function firebossattack(x,y,z,px,py,pz,rot)
{
  firebossnegativx = 0;
  firebossnegativy = 0;
  firebossnegativz = 0;
  firebosstargetx = px - x;
  if (firebosstargetx < 0)
  {
    firebossnegativx = 1;
    firebosstargetx *= -1;
  }
  firebosstargety = py - y;
  if (firebosstargety < 0)
  {
    firebossnegativy = 1;
    firebosstargety *= -1;
  }
  firebosstargetz = pz - z;
  if (firebosstargetz < 0)
  {
    firebossnegativz = 1;
    firebosstargetz *= -1;
  }
  if (firebosstargetx >= firebosstargety)
  {
    if (firebosstargetx >= firebosstargetz)
    {
      firebosstargety /= firebosstargetx;
      firebosstargetz /= firebosstargetx;
      firebosstargetx = 1;
    }
    else
    {
      firebosstargetx /= firebosstargetz;
      firebosstargety /= firebosstargetz;
      firebosstargetz /= 1;
    }
  }
  else
  {
    if (firebosstargety >= firebosstargetz)
    {
      firebosstargetx /= firebosstargety;
      firebosstargetz /= firebosstargety;
      firebosstargety /= 1;
    }
    else
    {
      firebosstargetx /= firebosstargetz;
      firebosstargety /= firebosstargetz;
      firebosstargetz /= 1;
    }
  }
  if (firebossnegativx == 1)
  {
    firebosstargetx *= -1;
  }
  if (firebossnegativy == 1)
  {
    firebosstargety *= -1;
  }
  if (firebossnegativz == 1)
  {
    firebosstargetz *= -1;
  }
  firebossball = 1;
  if (rot == 1)
  {
    firebossballx = x;
    firebossbally = y;
    firebossballz = z + 3;
  }
  else if (rot == 2)
  {
    firebossballx = x - 3;
    firebossbally = y;
    firebossballz = z;
  }
  else if (rot == 3)
  {
    firebossballx = x;
    firebossbally = y;
    firebossballz = z - 3;
  }
  else if (rot == 4)
  {
    firebossballx = x;
    firebossbally = y;
    firebossballz = z - 3;
  }
  firebossballlastx = firebossballx;
  firebossballlasty = firebossbally;
  firebossballlastz = firebossballz;
}





