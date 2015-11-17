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
		image: undefined,
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
		image: undefined,
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
		image: undefined,
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
	image: undefined,
	doEffect: function(player){
		player.maxDistance += 20;
		this.active = false;
		console.log("Range Up");
	}
};

var BulletSizeUp = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	active: false,
	image: undefined,
	doEffect: function(player){
		app.main.bulletSize += 1;
		this.active = false;
		console.log("Bullet Up");
	}
};

var SlowEnemy = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	slowEnemy: true,
	active: false,
	image: undefined,
	doEffect: function(){
		for(var i = 0; i < app.main.enemies.length; i++){
			var e = app.main.enemies[i];
			e.speed /= 2;
		}
		this.active = false;
		console.log("Slow Enemy");
	}
};
//-----------Negative-----------
var RangeDown = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	active: false,
	image: undefined,
	doEffect: function(player){
		player.maxDistance -= 20;
		this.active = false;
		console.log("Range Down");
	}
};

var SlowAll = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	slowAll: true,
	active: false,
	image: undefined,
	doEffect: function(player){
		for(var i = 0; i < app.main.enemies.length; i++){
			var e = app.main.enemies[i];
			e.speed /= 2;
		}
		player.speed /= 2;
		this.active = false;
		console.log("Speed");
	}
};

var BulletSizeDown = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	active: false,
	image: undefined,
	doEffect: function(player){
		app.main.bulletSize -= 1;
		console.log("Bullet Down");
		this.active = false;
	}
};

//-----------Neutral------------
var NegativeColor = {
	x: 0,
	y: 0,
	radius: 5,
	onGround: false,
	active: false,
	image: undefined,
	doEffect: function(player){
		app.main.invert = !app.main.invert;
		console.log("Negative");
		this.active = false;
	}
};

var myTemporaryItems = [RangeUp, RangeDown, SlowEnemy, SlowAll, NegativeColor, BulletSizeDown, BulletSizeUp];
