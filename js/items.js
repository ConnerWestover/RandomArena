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
		active: false,
		doEffect: function(){
			myPermanentItems.EnemyFiresBulletsNonLethal.active = false;
			myPermanentItems.EnemyFiresBulletsLethal.active = false;
			app.main.eBullActive = true;
			app.main.eBullLethal = true;
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
			myPermanentItems.EnemyFiresBulletsNonLethal.active = false;
			myPermanentItems.EnemyFiresBulletsLethal.active = false;
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
		this.active = false;
	}
};

var SlowEnemy = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	slowEnemy: true,
	active: false,
	doEffect: function(){
		for(var i = 0; i < app.main.enemies.length; i++){
			var e = app.main.enemies[i];
			e.speed /= 2;
		}
		this.active = false;
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
		this.active = false;
	}
};

var SlowAll = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	slowAll: true,
	active: false,
	doEffect: function(player){
		for(var i = 0; i < app.main.enemies.length; i++){
			var e = app.main.enemies[i];
			e.speed /= 2;
		}
		player.speed /= 2;
		this.active = false;
	}
};

//-----------Neutral------------
var myTemporaryItems = [RangeUp, RangeDown, SlowEnemy, SlowAll];


