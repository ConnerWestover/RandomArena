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
    WIDTH : 920, 
    HEIGHT: 640,
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
	enemies: [],
	numEnemies: 5,
	staggerTime: 0,
	
	PLAYER: {
		health: 10,
		weapon: "none",
		attackPower: 5,
		defense: 1,
		x: 420,
		y: 420,
		radius: 0,
		maxBullets: 50000,
		BULLET:{
			distance: 600,
			power: 1,
			x: 0,
			y: 0,
			radius: 2,
			speed: 0,
			live: false
		},
	},
	
	ENEMY: {
		health: 2,
		attackPower: 1,
		defense: 1,
		x: 0,
		y: 0,
		radius: 15
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
		this.PLAYER = this.makePlayer();
		console.log(this.gameState, this.PLAYER);
		//debugger;
		this.enemies = this.makeEnemy(this.numEnemies);
		this.delayEnemy();
			
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
		this.moveEnemy(dt);
		this.checkForCollisions();
		
		// 5) DRAW	
		// i) draw background		
		this.drawMain(this.ctx);

		//GamePlay Drawing Happens
		if (this.gameState == this.GAME_STATE.DEFAULT){
			this.drawBackground(this.ctx);
			if(myKeys.keydown[myKeys.KEYBOARD.KEY_W]){
				this.PLAYER.moveY(-dt);
			}	
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_S]){
				this.PLAYER.moveY(dt);
			} 
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_A]){
				this.PLAYER.moveX(-dt);
			} 
			if (myKeys.keydown[myKeys.KEYBOARD.KEY_D]){
				this.PLAYER.moveX(dt);
			} 
			this.PLAYER.update(dt);
			this.PLAYER.draw(this.ctx);
			this.ctx.globalAlpha = 1.0;
			this.drawHUD(this.ctx);
			this.drawEnemy(this.ctx);
		}
		
		if(this.gameState == this.GAME_STATE.ROUND_OVER){
			this.PLAYER.draw(this.ctx);
			this.ctx.globalAlpha = 1.0;
			this.drawHUD(this.ctx);
		}
		
	},
	
	drawBackground: function(ctx){
		ctx.fillStyle = "white"; 
		ctx.strokeStyle = "black";
		ctx.fillRect(0,0,this.WIDTH,this.HEIGHT); 
		for (var i = 0; i < this.WIDTH; i+= this.WIDTH/20){
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, this.HEIGHT);
			ctx.closePath();
			ctx.stroke();
		}
		
		for (var i = 0; i < this.HEIGHT; i+= this.HEIGHT/20){
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(this.WIDTH, i);
			ctx.closePath();
			ctx.stroke();
		}
	},
	
	drawMain: function(ctx){
		if (this.gameState == this.GAME_STATE.MAIN_MENU){
			ctx.save();
			
			ctx.strokeStyle = "black";
			ctx.lineWidth = 4;
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8, this.WIDTH*3/4, this.HEIGHT/6);
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8 + this.HEIGHT/6 + 15, this.WIDTH*3/4, this.HEIGHT/6);
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8  + this.HEIGHT*2/6 + 30, this.WIDTH*3/4, this.HEIGHT/6);
			ctx.strokeRect(this.WIDTH/8, this.HEIGHT/8  + this.HEIGHT*3/6 + 45, this.WIDTH*3/4, this.HEIGHT/6);
			
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			
			this.fillText(ctx, "Play", this.WIDTH/2, this.HEIGHT/8+ this.HEIGHT/11, "30pt courier", "black");
			this.fillText(ctx, "Instructions", this.WIDTH/2, this.HEIGHT/6 + this.HEIGHT/4 - 10, "30pt courier", "black");
			this.fillText(ctx, "Options", this.WIDTH/2, this.HEIGHT*2/6 + this.HEIGHT/4 + 5, "30pt courier", "black");
			this.fillText(ctx, "About", this.WIDTH/2, this.HEIGHT*3/6 + this.HEIGHT/4+ 20, "30pt courier", "black");
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
	
	
	makePlayer: function(){
		var makeBullet = function(x,y,xSpeed, ySpeed){
			var move = function(dt){
				this.x += this.xSpeed;
				this.y += this.ySpeed;
				this.traveled += Math.abs(this.ySpeed);
				this.traveled += Math.abs(this.xSpeed);
				
				if (this.maxDistance < this.traveled){
					this.live = false;
				}
			};
			
			var draw = function(ctx){
				ctx.save();
				ctx.fillStyle = "red";
				ctx.strokeStyle = "black";
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			};
			
			var b = {};
			b.maxDistance = 600;
			b.traveled = 0;
			b.power = 1;
			b.x = this.x;
			b.y = this.y;
			b.radius = 5;
			b.xSpeed = xSpeed;
			b.ySpeed = ySpeed;
			b.live = true
			b.draw = draw;
			b.move = move;
			
			return b;
		};
		
		var fireU = function(){
			if (this.bullets.length < p.maxBullets){
				this.bullets.push(this.makeBullet(this.x,this.y,0,-5));
			}
		};
		var fireD = function(){
			if (this.bullets.length < p.maxBullets){
				this.bullets.push(this.makeBullet(this.x,this.y,0,5));
			}
		};
		var fireL = function(){
			if (this.bullets.length < p.maxBullets){
				this.bullets.push(this.makeBullet(this.x,this.y,-5,0));
			}
		};
		var fireR = function(){
			if (this.bullets.length < p.maxBullets){
				this.bullets.push(this.makeBullet(this.x,this.y,5,0));
			}
		};
		var drawPlayer = function(ctx){
			ctx.save();
			ctx.fillStyle = "black";
			ctx.strokeStyle = "black";
			ctx.globalAlpha = .7;
			ctx.beginPath();
			ctx.arc(this.x, this.y+20, this.radius*.9, 0, Math.PI*2, false);
			ctx.fill();
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
			ctx.save();
			ctx.fillStyle = "red";
			ctx.strokeStyle = "black";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.fill();
			ctx.closePath();
			ctx.stroke();
			ctx.restore();
			for (var i = 0; i < this.bullets.length; i++){
				this.bullets[i].draw(ctx);
			}
		};
		
		var movePlayerX = function(dt){
			this.x += this.speed * dt;
		};
		
		var movePlayerY = function(dt){
			this.y += this.speed * dt;
		};
		
		var update = function(dt){
			for (var i = 0; i < this.bullets.length; i++){
				this.bullets[i].move(dt);
				if(this.bullets[i].live == false) this.bullets.splice(i, 1);
			}
			if (this.x - this.radius < 0) this.x = this.radius;
			if (this.x + this.radius > app.main.WIDTH) this.x = app.main.WIDTH - this.radius;
			if (this.y - this.radius < 0) this.y = this.radius;
			if (this.y + this.radius > app.main.HEIGHT) this.y = app.main.HEIGHT - this.radius;
		}
		
		var p = {};
		p.draw = drawPlayer;
		p.speed = 200;
		p.x = this.WIDTH/2;
		p.y = this.HEIGHT/2;
		p.moveX = movePlayerX;
		p.moveY = movePlayerY;
		p.health = 10;
		p.weapon = "gun";
		p.attackPower = 1;
		p.defense = 1;
		p.radius = 30;
		p.maxBullets = 10;
		p.bullets = [];
		p.makeBullet = makeBullet;
		p.fireUp = fireU;
		p.fireDown = fireD;
		p.fireLeft = fireL;
		p.fireRight = fireR;
		p.update = update;
		
		return p;
	},
	
	makeEnemy: function(num){
		var enemyDraw = function(ctx){
			ctx.save();
			ctx.fillStyle = "green";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		};
		
		var enemyMove = function(dt){
			this.xSpeed = app.main.PLAYER.x - this.x;
			this.ySpeed = app.main.PLAYER.y - this.y;
			
			var mag = Math.sqrt(this.xSpeed*this.xSpeed + this.ySpeed*this.ySpeed);
			this.xSpeed /= mag;
			this.ySpeed /= mag;
			
			this.x += this.xSpeed * this.speed * dt;
			this.y += this.ySpeed * this.speed * dt;
		}
		
		var array = [];
		for(var i = 0; i < num; i++){
			var e = {};
			var door = Math.floor(getRandom(0, 2));
			//control spawn point
			if(door == 0){
				e.x = 30;
				e.y = this.HEIGHT/2;
			}
			else if(door == 1){
				e.x = this.WIDTH/2;
				e.y = 30;
			}
			else{
				e.x = this.WIDTH - 30;
				e.y = this.HEIGHT/2;
			}
			
			e.started = false;
			
			//calculate direction to player
			e.xSpeed = this.PLAYER.x - e.x;
			e.ySpeed = this.PLAYER.y - e.y;
			//normalize
			var mag = Math.sqrt(e.xSpeed*e.xSpeed + e.ySpeed*e.ySpeed);
			e.xSpeed /= mag;
			e.ySpeed /= mag;
			
			
			e.timeDelay = i*1000;
			
			e.speed = 30;
			
			e.health = 10;
			e.attackPower = 1;
			e.radius = this.ENEMY.radius;
			
			e.draw = enemyDraw;
			e.move = enemyMove;
			
			//Object.seal(e);
			array.push(e);
		}
		return array;
	},
	
	drawEnemy: function(ctx){
		for(var i = 0; i < this.enemies.length; i++){
			var e = this.enemies[i];
			//console.log(e.started);
			//should function to make them leave at different intervals
			if(e.started == true){
				e.draw(ctx);
			}
		}
	},
	
	moveEnemy: function(dt){
		for(var i = 0; i < this.enemies.length; i++){
			var e = this.enemies[i];
			e.move(dt);
		}
	},
	
	delayEnemy: function(){
		for(var i = 0; i < this.enemies.length; i++){
			var e = this.enemies[i];
			setTimeout(function(){e.started = true;}, e.timeDelay);
		}
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
		for (var j = 0; j < this.enemies.length; j++){
			if (this.PLAYER.x - this.enemies[j].x < this.PLAYER.radius + this.enemies[j].radius &&
				this.PLAYER.y - this.enemies[j].y < this.PLAYER.radius + this.enemies[j].radius){
					this.PLAYER.health -= this.enemies[j].attackPower;
				}
			for (var i = 0; i < this.PLAYER.bullets.length; i++){
				var e = this.enemies[j];
				var b = this.PLAYER.bullets[i];
				if (Math.abs(b.x - e.x) < b.radius + e.radius && Math.abs(b.y - e.y) < b.radius + e.radius){
					e.health -= b.power;
					b.live = false;
				}
			}
		}
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