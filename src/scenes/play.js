class Play extends Phaser.Scene {
    constructor(){
        super("play");
    }

    preload(){
        this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
        //this.load.image("player", "assets/FallingMan.gif");
        this.load.image("leftWall", "assets/FallingFallingBordersLeft.png");
        this.load.image("rightWall", "assets/FallingFallingBordersRight.png");
        this.load.image("leftObstacle", "assets/ObstacleBalconyLeft.png");
        this.load.image("rightObstacle", "assets/ObstacleBalconyRight.png");
        this.load.spritesheet("player", "assets/FallingManSpritesheet.png", { frameWidth: 875, frameHeight: 304, startFrame: 0, endFrame: 1 });
    }

    create(){
        this.background = this.add.sprite(game.config.width / 2, 0,"background").setOrigin(0.5,0);
        this.background.setScale(game.config.width / this.background.width);
        this.leftWall = this.add.tileSprite(0, 0, 0, 0, "leftWall").setOrigin(0,0);
        this.leftWall.setScale(wallScale);
        this.rightWall = this.add.tileSprite(game.config.width, 0, 0, 0, "rightWall").setOrigin(1,0);
        this.rightWall.setScale(wallScale);
        this.player = new Player(this, game.config.width / 2, game.config.height * playerStartPos, "player").setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);
        this.fallSpeedDebug = this.add.text(game.config.width / 2, 0, "fall speed: " + this.fallSpeed, menuConfig).setOrigin(0.5, 0);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({ key: "player", frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.player.anims.play("player");

        //textConfig.fixedWidth = 100;
        //this.score = 0;        
        //this.scoreLabel = this.add.text(borderUISize + borderPadding, borderUISize + (borderPadding * 2), this.score, textConfig);

        // timer
        this.gameOver = false;
        textConfig.fixedWidth = 0;
        this.counter = 0;
        this.obstacles = new Set();
        this.fallSpeed = initialFallSpeed;
    }

    update(){
        this.fallSpeedDebug.text = "fall speed: " + this.fallSpeed;
        this.leftWall.tilePositionY += this.fallSpeed;
        this.rightWall.tilePositionY += this.fallSpeed;
        this.player.update();
        //this.zoom(1.001);
        this.counter += this.fallSpeed / 5;
        if(this.counter > obstacleSpawnPeriod){
            this.counter = 0;
            this.fallSpeed *= fallSpeedIncrease;
            let leftright = Phaser.Math.Between(0,1);
            if(!leftright){
                this.obstacles.add(new Obstacle(this, Phaser.Math.Between(-100, this.leftWall.displayWidth), game.config.height, "leftObstacle").setOrigin(0,0).setScale(wallScale * 1.5, wallScale / 2));
            } else {
                this.obstacles.add(new Obstacle(this, game.config.width - Phaser.Math.Between(-100, this.rightWall.displayWidth), game.config.height, "rightObstacle").setOrigin(1,0).setScale(wallScale * 1.5, wallScale / 2));
            }
        }
        for(let obstacle of this.obstacles){
            obstacle.y -= this.fallSpeed / 5; // todo: figure out why dividing by 5 syncs up with the wall
            if(obstacle.y + obstacle.displayHeight < 0){
                obstacle.destroy();
                this.obstacles.delete(obstacle);
            }            
            if(this.checkCollision(this.player, obstacle)){
                this.doCollision();
            }
        }       
        if(this.player.hp <= 0) this.scene.start("lose"); 
        this.background.y -= this.fallSpeed * backgroundScaleFactor;
        this.fallSpeed = Phaser.Math.Clamp(this.fallSpeed, initialFallSpeed, maxFallSpeed);
    }

    checkCollision(player, obstacle) {
        if(obstacle.originX === 0){
            if(player.x >= obstacle.x && player.x <= (obstacle.x + obstacle.displayWidth)){
                return player.y >= obstacle.y && player.y <= obstacle.y + obstacle.displayHeight;
            }
        } else if(obstacle.originX === 1){ // note that any other origin value will break this
            if(player.x >= (obstacle.x - obstacle.displayWidth) && player.x <= obstacle.x){
                return player.y >= obstacle.y && player.y <= obstacle.y + obstacle.displayHeight;
            }
        }
        return false;
    }

    doCollision(){
        let extraMoveAmt = 1.3; // to ensure the player doesn't infinitely clip into obstacles
        this.player.hp -= obstacleDamage;
        for(let obstacle of this.obstacles){
            obstacle.y -= obstacleDamage * game.config.height * extraMoveAmt; 
        }
        this.leftWall.tilePositionY += obstacleDamage * game.config.height * extraMoveAmt * 5;
        this.rightWall.tilePositionY += obstacleDamage * game.config.height * extraMoveAmt * 5;
        this.fallSpeed -= fallSpeedDamage;
    }

    zoom(amount){
        this.background.setScale(this.background.scale * amount);
        this.player.setScale(this.player.scale * amount);
        this.leftWall.setScale(this.leftWall.scale * amount);        
        this.rightWall.setScale(this.rightWall.scale * amount);
    }
}