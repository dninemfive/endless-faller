class Play extends Phaser.Scene {
    constructor(){
        super("play");
    }

    preload(){
        this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
        this.load.spritesheet("player", "assets/FallingManSpritesheet.png", { frameWidth: 875, frameHeight: 304, startFrame: 0, endFrame: 1 });
        this.load.image("leftWall", "assets/FallingFallingBordersLeft.png");
        this.load.image("rightWall", "assets/FallingFallingBordersRight.png");
        this.load.image("leftObstacle", "assets/ObstacleBalconyLeft.png");
        this.load.image("rightObstacle", "assets/ObstacleBalconyRight.png");  
        this.load.image("collectible", "assets/CoreMap.png");
        this.load.audio("bgmusic", "assets/RunnnerScore1.wav");
        this.load.audio("crash", "assets/RunnerCrash2.wav");
    }

    create(){
        
        this.background = this.add.sprite(game.config.width / 2, 0,"background").setOrigin(0.5,0).setDepth(-2);
        this.background.setScale(game.config.width / this.background.width);

        textConfigBlack.fontSize = "50px";
        this.title = this.add.text(game.config.width / 2, borderUISize + borderPadding, "H O R I Z O N   D O W N", textConfigBlack).setOrigin(0.5);
        textConfigBlack.fontSize = "28px";
        this.startText = this.add.text(game.config.width / 2, game.config.height - (borderUISize + borderPadding), "press SPACE to start", textConfigBlack).setOrigin(0.5);
        this.startText.alpha = 1;

        this.player = new Player(this, game.config.width / 2, -100, "player").setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);
        this.anims.create({ key: "player", frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.player.anims.play("player");

        this.leftWall = this.add.tileSprite(0, 0, 0, 0, "leftWall").setOrigin(0,0);
        this.leftWall.setScale(wallScale);
        this.rightWall = this.add.tileSprite(game.config.width, 0, 0, 0, "rightWall").setOrigin(1,0);
        this.rightWall.setScale(wallScale);

        

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        score = 0;
        this.scoreLabel = this.add.text(this.leftWall.displayWidth, 0, score, textConfigDebug);
        this.scoreLabel.alpha = 0;

        this.blackout = this.add.rectangle(0, 0, game.config.width, game.config.height, 0x000000).setOrigin(0,0);
        this.blackout.alpha = 0;
        
        this.delayCounter = 0;
        this.obstacleCounter = 0;
        this.obstacles = new Set();
        this.fallSpeed = initialFallSpeed;
        this.zoom = 1.5;

        this.targetPos = game.config.width / 2; // obstacles will be placed in order to avoid this point
        
        switch(state){
            case STATES.GAME:
                this.title.setVisible(false);
                this.startText.setVisible(false);
                this.delayCounter = obstacleDelay;
                this.startText.alpha = 0;
                break;
            default:
                this.setZoom(this.zoom);
                break;
        }

        this.paused = false;

        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/audio/
        this.music = this.sound.add("bgmusic", { loop: true });        
    }

    update(){
        switch(state){
            case STATES.MAIN:
                this.doMainTick();
                break;
            case STATES.TRANSITION:
                this.doTransitionTick();
                break;
            case STATES.GAME:
                this.doGameTick();
                break;
        }        
    }

    doMainTick(){
        if(Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            state = STATES.TRANSITION;
            this.startText.alpha = 1;
            this.music.play();
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
            this.scene.start("lore"); 
        }
    }

    setZoom(amount){
        this.background.setScale((game.config.width / this.background.width) * amount);
        this.player.setScale(playerScale * amount);
    }

    doTransitionTick(){
        let playerMoveSpeed = 5;
        this.zoom -= (this.zoom - 1) / ((game.config.height * playerStartPos) / playerMoveSpeed);
        if(this.player.y < game.config.height * playerStartPos){
            this.player.y += playerMoveSpeed;
            this.setZoom(this.zoom);
            this.title.alpha -= 0.025;
        } else{
            state = STATES.GAME;
            this.startText.text = "use A and D to move left and right";
            this.startText.alpha = 1;
        }
    }

    doGameTick(){
        if(Phaser.Input.Keyboard.JustDown(this.keyP)) {
            this.paused = !this.paused;
        }
        if(this.paused){
        } else {
            this.scoreLabel.text = score;
            this.leftWall.tilePositionY += this.fallSpeed;
            this.rightWall.tilePositionY += this.fallSpeed;
            this.player.update();
            if((++this.delayCounter) <= obstacleDelay){
            } else {
                this.obstacleCounter += this.fallSpeed / 5;
                this.startText.alpha -= 0.1;
                this.scoreLabel.alpha += 0.1;
            }        
            if(this.obstacleCounter > obstacleSpawnPeriod){
                this.obstacleCounter = 0;
                this.fallSpeed *= fallSpeedIncrease;
                this.spawnObstacle();
            }
            for(let obstacle of this.obstacles){
                obstacle.y -= this.fallSpeed / 5; // todo: figure out why dividing by 5 syncs up with the wall
                if(obstacle.y + obstacle.displayHeight < 0){
                    obstacle.destroy();
                    this.obstacles.delete(obstacle);                
                } else if(!obstacle.passed && obstacle.y < (this.player.y - this.player.displayHeight)){
                    obstacle.passed = true;
                    score += Math.round(pointsPerObstacle * (Math.log10(this.fallSpeed) / Math.log10(initialFallSpeed)));
                }
                if(this.checkCollision(this.player, obstacle)){
                    if(obstacle.collectible) {
                        score += collectibleScore;
                        obstacle.destroy();
                        this.obstacles.delete(obstacle);
                    } else { 
                        this.doCollision();
                    }                
                }
            }       
            if(this.player.hp <= 0) {
                state = STATES.MAIN;
                if(score > highScore) highScore = score;
                this.music.stop();
                this.scene.start("lose"); 
            }
            this.background.y -= this.fallSpeed * backgroundScaleFactor;
            this.fallSpeed = Phaser.Math.Clamp(this.fallSpeed, initialFallSpeed, maxFallSpeed);
            if(this.blackout.alpha > 0){
                this.blackout.alpha -= blackoutFadeout;
            }
        }
    }

    spawnObstacle(){
        let delta = (game.config.width - this.leftWall.displayWidth - this.rightWall.displayWidth) / 2;
        this.targetPos += Phaser.Math.Between(-delta, delta);
        this.targetPos = Phaser.Math.Clamp(this.targetPos, this.leftWall.displayWidth, game.config.width - this.rightWall.displayWidth);
        let type = Phaser.Math.Between(0,1);
        let collectible = Phaser.Math.Between(1, collectibleSpawnChance) === 1;
        switch(type){
            case 0: // left obstacle only
                this.spawnSingleObstacle(false, collectible);
                break;
            case 1: // right obstacle only
                this.spawnSingleObstacle(true, collectible);
                break;
            default: // paired (left and right) obstacles
                break;
        }
    }

    spawnSingleObstacle(right = false, collectible = false) {        
        let obstacleWidth = obstacleWidthScale * 1500; //this.textures.get("leftObstacle").width;        
        let obstaclePos;
        if(right) {
            // position the right edge such that the left edge is the player's width away from the target pos
            obstaclePos = Phaser.Math.Clamp(this.targetPos + obstacleWidth,                                         
                                         game.config.width - this.rightWall.displayWidth,   // at most so far left it's just barely touching the wall
                                         game.config.width + obstacleWidth - obstacleOffset);                // at most so far right it can't be seen
            if (collectible) this.spawnCollectible(this.leftWall.displayWidth, obstaclePos - obstacleWidth);
        } else {
            // position the left edge such that the right edge is the player's width away from the target pos
            obstaclePos = Phaser.Math.Clamp(this.targetPos - obstacleWidth,
                                         -obstacleWidth + obstacleOffset,                   // at most so far left it can't be seen
                                         this.leftWall.displayWidth);                       // at most so far right it's just barely touching the wall
            if (collectible) this.spawnCollectible(obstaclePos + obstacleWidth, game.config.width - this.rightWall.displayWidth);
        }
        let tex = (right ? "righ" : "lef") + "tObstacle";
        let temp = new Obstacle(this, obstaclePos, game.config.height, tex).setOrigin(right ? 1 : 0, 0).setScale(obstacleWidthScale, wallScale).setDepth(-1);
        this.obstacles.add(temp);
    }

    spawnCollectible(left, right){
        let margin = 55;
        let collectiblePos = Phaser.Math.Between(left + margin, right - margin);
        this.obstacles.add(new Obstacle(this, collectiblePos, game.config.height, "collectible", undefined, true).setOrigin(0.5,0).setScale(wallScale));
    }

    checkCollision(player, obstacle) {
        let oCoords = this.getBounds(obstacle);
        if(this.inBounds({ x: player.x, y: player.y }, oCoords)) return true;
        //if(this.inBounds({ x: pCoords.x1, y: pCoords.y2}, oCoords)) return true;
        //if(this.inBounds({ x: pCoords.x2, y: pCoords.y1}, oCoords)) return true;
        //if(this.inBounds({ x: pCoords.x2, y: pCoords.y2}, oCoords)) return true;
        return false;
    }

    // returns a an object holding numbers representing the leftmost, rightmost, topmost, and bottommost edges, in that order
    getBounds(sprite){
        return {
            x1: sprite.x - (sprite.originX * sprite.displayWidth),
            x2: sprite.x + ((1 - sprite.originX) * sprite.displayWidth),
            y1: sprite.y - (sprite.originY * sprite.displayHeight),
            y2: sprite.y + ((1 - sprite.originY) * sprite.displayHeight)
        };
    }
    
    // point: an object holding 2-dimensional coordinates
    // box: an object holding numbers representing the outer edges of a box, as returned by getBounds
    inBounds(point, box){
        // console.log("inBounds({" + box.x1 + ", " + box.x2 + "}, {" + box.x1 + ", " + box.x2 + ", " + box.y1 + ", " + box.y2 + "})");
        return point.x >= box.x1 && point.x <= box.x2 && point.y >= box.y1 && point.y <= box.y2;
    }

    doCollision(){
        this.sound.play("crash");
        let extraMoveAmt = 1.3; // to ensure the player doesn't infinitely clip into obstacles
        this.player.hp -= obstacleDamage;
        for(let obstacle of this.obstacles){
            if(obstacle.y > game.config.height * (1 - ((1 - playerStartPos) / 2))) {
                obstacle.y -= obstacleDamage * game.config.height * extraMoveAmt; 
            } else {
                obstacle.y = -100;
            }
        }
        this.leftWall.tilePositionY += obstacleDamage * game.config.height * extraMoveAmt * 5;
        this.rightWall.tilePositionY += obstacleDamage * game.config.height * extraMoveAmt * 5;
        this.fallSpeed /= fallSpeedDamage;
        this.blackout.alpha = 1;
        score -= pointsPerObstacle;
        if(score < 0) score = 0;        
    }    
}