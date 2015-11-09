//this is for items 
"use strict";
//Permanent Items
var myPermanentItems = {
	
	count:1,

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
	}
	//-----------Negative-----------
	
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


