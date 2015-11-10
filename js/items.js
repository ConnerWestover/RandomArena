//this is for items 
"use strict";
//Permanent Items
var myPermanentItems = {
	
	count:3,

	//-----------Positive-----------
	OnFire: {
		x: 0,
		y: 0,
		radius: 5,
		onGround: false,
		active: false,
		doEffect: function(player, enemy){
			enemy.health -= player.attackPower * 2;
			if (enemy.health <= 0){
				enemy.alive = false;
			}
		}
	},
	//-----------Negative-----------
	EnemyFiresBulletsLethal: {
		x: 0,
		y: 0,
		radius: 5,
		onGround: false,
		active: true,
		doEffect: function(){
			app.main.eBullActive = true;
			app.main.eBullLethal = true;
			myPermanentItems.EnemyFiresBulletsNonLethal = false;
		}
	},
	EnemyFiresBulletsNonLethal: {
		x: 0,
		y: 0,
		radius: 5,
		onGround: false,
		active: false,
		doEffect: function(){
			app.main.eBullActive = true;
			app.main.eBullLethal = false;
			myPermanentItems.EnemyFiresBulletsLethal = false;
		}
	}
	//-----------Neutral------------

};
//temporaryItems

//-----------Positive-----------
var RangeUp = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	active: false,
	doEffect: function(player){
		player.maxDistance += 20;
	}
};
//-----------Negative-----------
var RangeDown = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	active: false,
	doEffect: function(player){
		player.maxDistance -= 20;
	}
};
//-----------Neutral------------
var myTemporaryItems = [RangeUp, RangeDown];


