class Play extends Phaser.Scene {
    constructor(){
        super("play");
    }

    preload(){
        this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
        this.load.image("player", "assets/FallingMan.gif");
        //this.load.spritesheet("explosion", "assets/explosion.png", { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create(){
        this.player = new Player(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, "player").setOrigin(0.5, 0);    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //this.anims.create({ key: "explode", frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 9, first: 0}), frameRate: 30 });

        //textConfig.fixedWidth = 100;
        //this.score = 0;        
        //this.scoreLabel = this.add.text(borderUISize + borderPadding, borderUISize + (borderPadding * 2), this.score, textConfig);

        // timer
        this.gameOver = false;
        textConfig.fixedWidth = 0;
    }

    update(){
        if(this.gameOver){
            this.scene.start("lose"); 
        } else {
            this.player.update();
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
}