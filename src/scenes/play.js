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
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //this.anims.create({ key: "explode", frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 9, first: 0}), frameRate: 30 });

        //textConfig.fixedWidth = 100;
        //this.score = 0;        
        //this.scoreLabel = this.add.text(borderUISize + borderPadding, borderUISize + (borderPadding * 2), this.score, textConfig);

        // timer
        this.gameOver = false;
        textConfig.fixedWidth = 0;
        this.counter = 0;
        this.obstacles = new Set();
    }

    update(){
        this.leftWall.tilePositionY += fallSpeed;
        this.rightWall.tilePositionY += fallSpeed;
        this.player.update();
        //this.zoom(1.001);
        this.counter += Phaser.Math.Between(1, fallSpeed);
        if((this.counter % 500) == 0){
            fallSpeed += 0.1;
            console.log("trying to spawn a new obstacle");
            //let leftright = Phaser.Math.Between(0,1);
            //if(!leftright){
                this.obstacles.add(new Obstacle(this, Phaser.Math.Between(0,game.config.width), game.config.height, "leftObstacle").setOrigin(0,0).setScale(wallScale));
            //} else {
            //    this.obstacles.add(new Obstacle(this, game.config.width - Phaser.Math.Between(-100,250), game.config.height, "rightObstacle").setOrigin(1,0).setScale(wallScale));
            //}
        }
        for(let obstacle of this.obstacles){
            obstacle.update();
            if(this.checkCollision(this.player, obstacle)){
                this.scene.start("lose");
            }
        }        
    }

    checkCollision(player, obstacle) {
        // simple AABB checking
        if (player.x < obstacle.x + obstacle.displayWidth && 
            player.x + player.displayWidth > obstacle.x && 
            player.y < obstacle.y + obstacle.displayHeight &&
            player.displayHeight + player.y > obstacle.y) {
                return true;
        } else {
            return false;
        }
    }

    zoom(amount){
        this.background.setScale(this.background.scale * amount);
        this.player.setScale(this.player.scale * amount);
        this.leftWall.setScale(this.leftWall.scale * amount);        
        this.rightWall.setScale(this.rightWall.scale * amount);
    }
}