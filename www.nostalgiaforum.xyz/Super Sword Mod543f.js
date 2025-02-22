/*The MIT License (MIT)

Copyright (c) 2014 lol_gamer688_

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* *******Super Sword Mod by lol_gamer688_********/

var posionswordactive = false;
var entityPoisoned;
var countdown = 0;

ModPE.setItem(501, "record_chirp", 0, "Ring of power");
ModPE.setItem(502, "record_cat", 0, "Fire sword");
ModPE.setItem(503, "record_blocks", 0, "Death sword");
ModPE.setItem(504, "record_13", 0, "Creeper sword");
ModPE.setItem(505, "record_11", 0, "Posion sword");
Item.addCraftRecipe(501, 1, 0, [266, 1, 0, 263, 4, 0]);
Item.addCraftRecipe(502, 1, 0, [280, 1, 0, 259, 2, 0, 501, 1, 0]);
Item.addCraftRecipe(503, 1, 0, [280, 1, 0, 272, 2, 0, 501, 1, 0]);
Item.addCraftRecipe(504, 1, 0, [280, 1, 0, 289, 2, 0, 501, 1, 0]);
Item.addCraftRecipe(505, 1, 0, [280, 1, 0, 40, 2, 0, 501, 1, 0,])

function attackHook(attacker, victim)
{
	if(Player.getCarriedItem() == 502)
	{
		Entity.setHealth(victim, Entity.getHealth(victim) - 4);
		Entity.setFireTicks(victim, 6);
	}
	if(Player.getCarriedItem() == 503)
	{
		Entity.setHealth(victim, 0)
	}
	if(Player.getCarriedItem() == 504)
	{
		Entity.setHealth(victim, Entity.getHealth(victim) - 4);
		explode(Entity.getX(victim), Entity.getY(victim), Entity.getZ(victim), 5);
	}
	if(Player.getCarriedItem() == 505)
	{
		posionswordactive = true;
		entityPoisoned = victim;
		Entity.setHealth(victim, Entity.getHealth(victim) - 4);
	}
}

function modTick()
{
	if(posionswordactive == true)
	{
		countdown++;
		if(countdown == 60)
		{
			if(Entity.getHealth(entityPoisoned) == 1)
			{
				posionswordactive = false;
			}
			Entity.setHealth(entityPoisoned, Entity.getHealth(entityPoisoned) - 1);
			ModPE.showTipMessage("Entity is poisoned. Health: " + (Entity.getHealth(entityPoisoned) / 2) + ".");
			countdown = 0;
		}
	}
}



