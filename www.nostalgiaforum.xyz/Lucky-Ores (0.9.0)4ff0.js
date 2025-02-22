function destroyBlock(x, y, z, side) 
{
if(getTile(x, y, z)==15)
{
var luck = Math.floor(Math.random()*(13));
}
else if(getTile(x, y, z)==56)
{
var luck2 = Math.floor(Math.random()*(13));
}
else if(getTile(x, y, z)==14)
{
var luck3 = Math.floor(Math.random()*(13));
}
else if(getTile(x, y, z)==16)
{
var luck4 = Math.floor(Math.random()*(6));
}
else if(getTile(x, y, z)==129)
{
var luck5 = Math.floor(Math.random()*(4));
}

if (luck == 0)
{
Level.dropItem(x,y,z,0,265,1,0);
}
else if (luck == 1) 
{
Level.dropItem(x,y,z,0,42,1,0);
} 
else if (luck == 2) 
{
Level.dropItem(x,y,z,0,267,1,0);
} 
else if (luck == 3) 
{
Level.dropItem(x,y,z,0,258,1,0);
} 
else if (luck == 4) 
{
Level.dropItem(x,y,z,0,257,1,0);
} 
else if (luck == 5) 
{
Level.dropItem(x,y,z,0,256,1,0);
} 
else if (luck == 6) 
{
Level.dropItem(x,y,z,0,101,1,0);
} 
else if (luck == 7) 
{
Level.dropItem(x,y,z,0,306,1,0);
} 
else if (luck == 8) 
{
Level.dropItem(x,y,z,0,307,1,0);
} 
else if (luck == 9) 
{
Level.dropItem(x,y,z,0,308,1,0);
} 
else if (luck == 10) 
{
Level.dropItem(x,y,z,0,309,1,0); 
} 
else if (luck == 11) 
{
Level.dropItem(x,y,z,0,15,1,0);
} 
else if (luck == 12) 
{
Level.dropItem(x,y,z,0,15,1,0); 
} 

if (luck2 == 0)
{
Level.dropItem(x,y,z,0,57,1,0);
}
else if (luck2 == 1) 
{
Level.dropItem(x,y,z,0,264,1,0);
} 
else if (luck2 == 2) 
{
Level.dropItem(x,y,z,0,276,1,0);
} 
else if (luck2 == 3) 
{
Level.dropItem(x,y,z,0,277,1,0);
} 
else if (luck2 == 4) 
{
Level.dropItem(x,y,z,0,278,1,0);
} 
else if (luck2 == 5) 
{
Level.dropItem(x,y,z,0,279,1,0);
} 
else if (luck2 == 6) 
{
Level.dropItem(x,y,z,0,310,1,0);
} 
else if (luck2 == 7) 
{
Level.dropItem(x,y,z,0,311,1,0);
} 
else if (luck2 == 8) 
{
Level.dropItem(x,y,z,0,312,1,0);
} 
else if (luck2 == 9) 
{
Level.dropItem(x,y,z,0,313,1,0);
} 
else if (luck2 == 10) 
{
Level.dropItem(x,y,z,0,264,1,0); 
} 
else if (luck2 == 11) 
{
Level.dropItem(x,y,z,0,264,1,0);
} 
else if (luck2 == 12) 
{
Level.dropItem(x,y,z,0,264 ,1,0); 
} 

if (luck3 == 0)
{
Level.dropItem(x,y,z,0,14,1,0);
}
else if (luck3 == 1) 
{
Level.dropItem(x,y,z,0,41,1,0);
} 
else if (luck3 == 2) 
{
Level.dropItem(x,y,z,0,266,1,0);
} 
else if (luck3 == 3) 
{
Level.dropItem(x,y,z,0,283,1,0);
} 
else if (luck3 == 4) 
{
Level.dropItem(x,y,z,0,284,1,0);
} 
else if (luck3 == 5) 
{
Level.dropItem(x,y,z,0,285,1,0);
} 
else if (luck3 == 6) 
{
Level.dropItem(x,y,z,0,286,1,0);
} 
else if (luck3 == 7) 
{
Level.dropItem(x,y,z,0,314,1,0);
} 
else if (luck3 == 8) 
{
Level.dropItem(x,y,z,0,315,1,0);
} 
else if (luck3 == 9) 
{
Level.dropItem(x,y,z,0,316,1,0);
} 
else if (luck3 == 10) 
{
Level.dropItem(x,y,z,0,317,1,0); 
} 
else if (luck3 == 11) 
{
Level.dropItem(x,y,z,0,14,1,0);
} 
else if (luck3 == 12) 
{
Level.dropItem(x,y,z,0,294,1,0); 
} 

if (luck4 == 0)
{
Level.dropItem(x,y,z,0,173,1,0);
}
else if (luck4 == 1) 
{
Level.dropItem(x,y,z,0,263,1,0);
} 
else if (luck4 == 2) 
{
Level.dropItem(x,y,z,0,263,8,0);
} 
else if (luck4 == 3) 
{
Level.dropItem(x,y,z,0,263,4,0);
} 
else if (luck4 == 4) 
{
Level.dropItem(x,y,z,0,263,2,0);
}
else if (luck4 == 5) 
{
Level.dropItem(x,y,z,0,263,6,0);
} 

if (luck5 == 0)
{
Level.dropItem(x,y,z,0,388,1,0);
}
else if (luck5 == 1) 
{
Level.dropItem(x,y,z,0,133,1,0);
} 
else if (luck5 == 2) 
{
Level.dropItem(x,y,z,0,388,2,0);
} 
else if (luck5 == 3) 
{
Level.dropItem(x,y,z,0,388,1,0);
} 
}