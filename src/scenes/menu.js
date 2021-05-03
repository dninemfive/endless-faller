class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload(){
        this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
    }

    create(){
        mainMenuConfig.fontSize = "50px";
        this.background = this.add.sprite(game.config.width / 2, 0,"background").setOrigin(0.5,0);
        this.background.setScale(game.config.width / this.background.width);
        this.add.text(game.config.width / 2, borderUISize + borderPadding, "H O R I Z O N   D O W N", mainMenuConfig).setOrigin(0.5);
        mainMenuConfig.fontSize = "28px";
        this.add.text(game.config.width / 2, game.config.height - (borderUISize + borderPadding), "press SPACE to start", mainMenuConfig).setOrigin(0.5);
        // might want to make this any key eventually
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            this.scene.start("play");
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)){
            this.scene.start("lore"); 
        }
    }
}