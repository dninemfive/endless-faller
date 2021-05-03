class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload(){
        this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
        this.load.spritesheet("player", "assets/FallingManSpritesheet.png", { frameWidth: 875, frameHeight: 304, startFrame: 0, endFrame: 1 });
    }

    create(){
        mainMenuConfig.fontSize = "50px";
        this.background = this.add.sprite(game.config.width / 2, 0,"background").setOrigin(0.5,0);
        this.background.setScale(game.config.width / this.background.width);
        this.player = new Player(this, game.config.width / 2, -100, "player").setOrigin(0.5, 0.5);
        this.player.setScale(playerScale);
        this.anims.create({ key: "player", frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1, first: 0}), frameRate: 12, repeat: -1 });
        this.player.anims.play("player");
        this.title = this.add.text(game.config.width / 2, borderUISize + borderPadding, "H O R I Z O N   D O W N", mainMenuConfig).setOrigin(0.5);
        mainMenuConfig.fontSize = "28px";
        this.startText = this.add.text(game.config.width / 2, game.config.height - (borderUISize + borderPadding), "press SPACE to start", mainMenuConfig).setOrigin(0.5);
        // might want to make this any key eventually
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.ready = false;
        this.zoom = 1.5;
        this.setZoom(this.zoom);
    }

    update(){
        let playerMoveSpeed = 5;
        this.zoom -= (this.zoom - 1) / ((game.config.height * playerStartPos) / playerMoveSpeed);
        if(this.ready){
            if(this.player.y < game.config.height * playerStartPos){
                this.player.y += playerMoveSpeed;
                this.setZoom(this.zoom);
            } else{
                this.scene.start("play");
            }
        }
        if(Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.ready = true;
            this.title.setVisible(false);
            this.startText.setVisible(false);
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
            this.scene.start("lore"); 
        }
    }

    setZoom(amount){
        this.background.setScale((game.config.width / this.background.width) * amount);
        this.player.setScale(playerScale * amount);
    }
}