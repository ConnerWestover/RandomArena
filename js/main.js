// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.main = {
	//  properties
    WIDTH : 840, 
    HEIGHT: 840,
    canvas: undefined,
    ctx: undefined,
   	lastTime: 0, // used by calculateDeltaTime() 
    debug: true,
	paused: false,
	animationID: 0,
	gameState: undefined,
	roundScore: 0,
	totalScore: 0,
	sound: undefined,
	
	PLAYER: {
		health: 10,
		weapon: "none",
		attackPower: 5,
		defense: 1,
		x: 420,
		y: 420
	},
	
	// Part I - #2
	GAME_STATE: { // another fake enumeration
		//Play States
		BEGIN : 0,
		DEFAULT : 1,
		ROUND_OVER : 2,
		REPEAT_LEVEL : 3,
		//Menu States
		MAIN_MENU : 4,
		OPTIONS: 5,
		INSTRUCTIONS: 6,
		ABOUT: 7
	},	

	//  Part II - #2,3,4
	doMousedown: function(e){

		this.sound.playBGAudio();
	
		if (this.paused){
			this.paused = false;
			this.update;
			return;
		}
		
		//click one circle
		
		if(this.gameState == this.GAME_STATE.ROUND_OVER){
			this.gameState = this.GAME_STATE.DEFAULT;
			this.reset();
			return;
		}
		var mouse = getMouse(e);

		if(this.gameState == this.GAME_STATE.MAIN_MENU){
			if (mouse.x > this.WIDTH/8 && mouse.x < this.WIDTH/8 + this.WIDTH*3/4 &&
			    mouse.y > this.HEIGHT/8  && mouse.y < this.HEIGHT/8 + this.HEIGHT/6){
					
				this.gameState = this.GAME_STATE.DEFAULT;
				
			} else if (mouse.x > this.WIDTH/8 && mouse.x < this.WIDTH/8 + this.WIDTH*3/4 &&
			    mouse.y > this.HEIGHT/8 + this.HEIGHT/6 + 15 && mouse.y < this.HEIGHT/8 + this.HEIGHT/6 + 15 + this.HEIGHT/6){
				
				this.gameState = this.GAME_STATE.INSTRUCTIONS;
				
			} else if (mouse.x > this.WIDTH/8 && mouse.x < this.WIDTH/8 + this.WIDTH*3/4 &&
			    mouse.y > this.HEIGHT/8 + this.HEIGHT*2/6 + 30 && mouse.y < this.HEIGHT/8  + this.HEIGHT*2/6 + 30 + this.HEIGHT/6){
				
				this.gameState = this.GAME_STATE.OPTIONS;
				
			} else if (mouse.x > this.WIDTH/8 && mouse.x < this.WIDTH/8 + this.WIDTH*3/4 &&
			    mouse.y > this.HEIGHT/8  + this.HEIGHT*3/6 + 45 && mouse.y < this.HEIGHT/8  + this.HEIGHT*3/6 + 45 + this.HEIGHT/6){
				
				this.gameState = this.GAME_STATE.ABOUT;
				
			}
		}
		
	},

    // methods
	init : function() {
		console.log("app.main.init() called");
		// initialize properties
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.gameState = this.GAME_STATE.MAIN_MENU;
		this.canvas.onmousedown = this.doMousedown.bind(this);
				
		this.reset();
		
		this.update();
	},
	
	reset: function(){
		this.roundScore = 0;
	},
	
	update: function(){
	 	this.animationID = requestAnimationFrame(this.update.bind(this));
		
	 	// 2) PAUSED?
	 	// if so, bail out of loop
	 	if (this.paused){
			this.drawPauseScreen(this.ctx);
			return;
		}
	 	// 3) HOW MUCH TIME HAS GONE BY?
	 	var dt = this.calculateDeltaTime();
	 	 
	 	// 4) UPDATE
		
		this.checkForCollisions();
		console.log(this.gameState);
		// 5) DRAW	
		// i) draw background
		this.ctx.fillStyle = "black"; 
		this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT); 
		
		this.drawMain(this.ctx);
		
		//GamePlay Drawing Happens
		if (this.gameState == this.GAME_STATE.DEFAULT){
			this.drawPlayer(this.ctx);
			this.ctx.globalAlpha = 1.0;
			this.drawHUD(this.ctx);
		}
				
		// iv) draw debug info
		if (this.debug){
			// draw dt in bottom right corner
			this.fillText(this.ctx,"dt: " + dt.toFixed(3), this.WIDTH - 150, this.HEIGHT - 10, "18pt courier", "white");
		}
		
	},
	
	drawMain: function(ctx){
		if (this.gameState == this.GAME_STATE.MAIN_MENU){
			ctx.save();
			
			ctx.strokeStyle = "white";
			ctx.lineWidth = 4;
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8, this.WIDTH*3/4, this.HEIGHT/6);
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8 + this.HEIGHT/6 + 15, this.WIDTH*3/4, this.HEIGHT/6);
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8  + this.HEIGHT*2/6 + 30, this.WIDTH*3/4, this.HEIGHT/6);
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8  + this.HEIGHT*3/6 + 45, this.WIDTH*3/4, this.HEIGHT/6);
			
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			
			this.fillText(ctx, "Play", this.WIDTH/2, this.HEIGHT/8+ this.HEIGHT/11, "30pt courier", "white");
			this.fillText(ctx, "Instructions", this.WIDTH/2, this.HEIGHT/6 + this.HEIGHT/4 - 10, "30pt courier", "white");
			this.fillText(ctx, "Options", this.WIDTH/2, this.HEIGHT*2/6 + this.HEIGHT/4 + 5, "30pt courier", "white");
			this.fillText(ctx, "About", this.WIDTH/2, this.HEIGHT*3/6 + this.HEIGHT/4+ 20, "30pt courier", "white");
			ctx.restore();
		}
	},
	
	drawHUD: function(ctx){
		ctx.save(); // NEW
		// draw score
      	// fillText(this.ctx,string, x, y, css, color)
		this.fillText(this.ctx,"Total Score: " + this.totalScore, this.WIDTH - 200, 20, "14pt courier", "#ddd");

		// NEW
		if(this.gameState == this.GAME_STATE.BEGIN){
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.fillText(this.ctx,"To begin, click the screen", this.WIDTH/2, this.HEIGHT/2, "30pt courier", "white");
		} // end if
	
		// NEW
		if(this.gameState == this.GAME_STATE.ROUND_OVER){
			ctx.save();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			this.fillText(this.ctx,"Round Over", this.WIDTH/2, this.HEIGHT/2 - 40, "30pt courier", "red");
			this.fillText(this.ctx,"Click to continue", this.WIDTH/2, this.HEIGHT/2, "30pt courier", "red");
		} // end if
		
		ctx.restore(); // NEW
	},
	
	drawPlayer: function(ctx){
		ctx.save();
		ctx.fillStyle = "red";
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(this.PLAYER.x, this.PLAYER.y, 30, 0,Math.PI*2, false);
		ctx.fill();
		ctx.closePath();
		ctx.stroke();
		ctx.restore();
	},
	
	fillText: function(ctx, string, x, y, css, color) {
		ctx.save();
		// https://developer.mozilla.org/en-US/docs/Web/CSS/font
		ctx.font = css;
		ctx.fillStyle = color;
		ctx.fillText(string, x, y);
		ctx.restore();
	},
	
	calculateDeltaTime: function(){
		// what's with (+ new Date) below?
		// + calls Date.valueOf(), which converts it from an object to a 	
		// primitive (number of milliseconds since January 1, 1970 local time)
		var now,fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
	
	
	checkForCollisions: function(){
		
	},
	
	drawPauseScreen: function(ctx){
		ctx.save();
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline= "middle";
		this.fillText(this.ctx,"...PAUSED...", this.WIDTH/2, this.HEIGHT/2, "40pt courier", "white");
		ctx.restore();
	},
	
	pauseGame: function(){
		if (this.gameState == this.GAME_STATE.DEFAULT){
			this.paused = true;
			cancelAnimationFrame(this.animationID);
			this.stopBGAudio();
			this.update();
		}
	},
	
	resumeGame: function(){
		if (this.gameState == this.GAME_STATE.DEFAULT){
			cancelAnimationFrame(this.animationID);
			this.paused = false;
			this.sound.playBGAudio();
			this.update();
		}
	},
	
	stopBGAudio: function(){
		//this.bgAudio.pause();
		//this.bgAudio.currentTime = 0;
		this.sound.stopBGAudio();
	}
    
}; // end app.main