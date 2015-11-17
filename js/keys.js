// The myKeys object will be in the global scope - it makes this script 
// really easy to reuse between projects

// Credit Enemy Sprite Sheet to https://andrewphillippi.files.wordpress.com/2013/01/zombiesheet.png
// another source of same spritesheet https://andrewphillippi.wordpress.com/2013/01/18/project-idea/
// Credit Player Sprite Sheet to http://knightyamato.deviantart.com/art/Blank-Sprite-Sheet-4-2-129192797 
// another source of above sprite sheet http://orig12.deviantart.net/9b3c/f/2009/193/f/2/blank_sprite_sheet_4_2_by_knightyamato.png

"use strict";

var myKeys = {};

myKeys.KEYBOARD = Object.freeze({
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_W": 87, 
	"KEY_A": 65, 
	"KEY_S": 83, 
	"KEY_D": 68,
	"KEY_SPACE": 32,
	"KEY_SHIFT": 16
});

// myKeys.keydown array to keep track of which keys are down
// this is called a "key daemon"
// main.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
myKeys.keydown = [];


// event listeners
window.addEventListener("keydown",function(e){
	//console.log("keydown=" + e.keyCode);
	myKeys.keydown[e.keyCode] = true;

});
	
window.addEventListener("keyup",function(e){
	//console.log("keyup=" + e.keyCode);
	myKeys.keydown[e.keyCode] = false;
	
	// pausing and resuming
	var char = String.fromCharCode(e.keyCode);
	if (char == "p" || char == "P"){
		if (app.main.paused){
			app.main.resumeGame();
		} else {
			app.main.pauseGame();
		}
	}
	//debugger;

	
});

app.IMAGES = {
	enemyImage: "media/zombiesheet.png",
	playerImage: "media/playersheet.png",
	deer: "media/deer.png",
	bear: "media/bear.png",
	bunny: "media/bunny.png"
};