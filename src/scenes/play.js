class Play extends Phaser.Scene {
    constructor(){
        super("play");
    }

    preload(){
        this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
        this.load.image("player", "assets/FallingMan.gif");
        this.load.image("leftWall", "assets/FallingFallingBordersLeft.png");
        this.load.image("rightWall", "assets/FallingFallingBordersRight.png");
        this.load.image("leftObstacle", "assets/ObstacleBalconyLeft.png");
        //this.load.spritesheet("explosion", "assets/explosion.png", { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
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
        this.obstacles = [];
    }

    update(){
        this.leftWall.tilePositionY += fallSpeed;
        this.rightWall.tilePositionY += fallSpeed;
        if(this.gameOver){
            this.scene.start("lose"); 
        } else {
            this.player.update();
        }
        //this.zoom(1.001);
        if(((++this.counter) % 1000) == 0){
            console.log("trying to spawn a new obstacle");
            this.obstacles.add(new Obstacle(this, game.config.width / 2, game.config.height / 2, "leftObstacle").setOrigin(0,0));
        }
        for(let obstacle of this.obstacles){
            obstacle.update();
        }
    }

    checkCollision(player, obstacle) {
        // simple AABB checking
        if (player.x < obstacle.x + obstacle.width && 
            player.x + player.width > obstacle.x && 
            player.y < obstacle.y + obstacle.height &&
            player.height + player.y > obstacle. y) {
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