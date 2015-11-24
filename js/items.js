//this is for items 
"use strict";

function timerCall(){
	var d = new Date();
	var n = d.getTime();
	return n;
}

//Permanent Items
var myPermanentItems = {
	
	count:3,

	//-----------Positive-----------
	OnFire: {
		x: 0,
		y: 0,
		radius: 20,
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
		radius: 20,
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
		radius: 20,
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
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			player.maxDistance += 20;
			this.beingUsed = true;
			this.active = false;
			console.log("Range Up");
		}else{
			player.maxDistance -= 20;
			this.beingUsed = false;
			this.timeActive = 0;
		}
		
	}
};

var BulletSizeUp = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			app.main.bulletSize += 1;
			this.beingUsed = true;
			this.active = false;
			console.log("Bullet Up");
		}else{
			app.main.bulletSize -= 1;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var SlowEnemy = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	slowEnemy: true,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			for(var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.speed /= 2;
			}
			this.beingUsed = true;
			this.active = false;
			console.log("Slow Enemy");
		}else{
			for(var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.speed *= 2;
			}
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};
//-----------Negative-----------
var RangeDown = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			player.maxDistance -= 20;
			this.beingUsed = true;
			this.active = false;
			console.log("Range Down");
		}else{
			player.maxDistance += 20;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var SlowAll = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	slowAll: true,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			for(var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.speed /= 2;
			}
			player.speed /= 2;
			this.beingUsed = true;
			this.active = false;
			console.log("Speed");
		}else{	
			for(var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.speed *= 2;
			}
			player.speed *= 2;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var BulletSizeDown = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			app.main.bulletSize -= 1;
			console.log("Bullet Down");
			this.beingUsed = true;
			this.active = false;
		}else{
			app.main.bulletSize += 1;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

//-----------Neutral------------
var NegativeColor = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			this.timeActive = timerCall();
			app.main.invert = !app.main.invert;
			console.log("Negative");
			this.beingUsed = true;
			this.active = false;
		}else{
			app.main.invert = app.main.invert;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var EnemySizeUp = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			app.main.ENEMY_RADIUS+=4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			this.active = false;
			console.log("Enemy Size Up");
		}else{
			app.main.ENEMY_RADIUS -= 4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var EnemySizeDown = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			app.main.ENEMY_RADIUS-=4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			this.active = false;
			console.log("Enemy Size Down");
		}else{
			app.main.ENEMY_RADIUS += 4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var PlayerSizeUp = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			player.radius +=4;
			this.active = false;
			console.log("Player Size Up");
		}else{
			player.radius -=4;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var PlayerSizeDown = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			player.radius -= 4;
			this.active = false;
			console.log("Player Size Down");
		}else{
			player.radius +=4;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var EveryoneSizeUp = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			app.main.ENEMY_RADIUS+=4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			player.radius +=4;
			this.active = false;
			console.log("Everyone Size Up");
		}else{
			app.main.ENEMY_RADIUS-=4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			player.radius -=4;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var EveryoneSizeDown = {
	x: 0,
	y: 0,
	radius: 20,
	onGround: false,
	active: false,
	image: undefined,
	beingUsed: false,
	timeActive: 0,
	doEffect: function(player){
		if(this.beingUsed == false){
			app.main.ENEMY_RADIUS-=4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			player.radius -=4;
			this.active = false;
			console.log("Everyone Size Down");
		}else{
			app.main.ENEMY_RADIUS+=4;
			for (var i = 0; i < app.main.enemies.length; i++){
				var e = app.main.enemies[i];
				e.radius = app.main.ENEMY_RADIUS;
			}
			player.radius +=4;
			this.beingUsed = false;
			this.timeActive = 0;
		}
	}
};

var myTemporaryItems = [RangeUp, RangeDown, SlowEnemy, SlowAll, NegativeColor, BulletSizeDown, BulletSizeUp,EnemySizeUp,EnemySizeDown,PlayerSizeUp,PlayerSizeDown, EveryoneSizeUp, EveryoneSizeDown];
