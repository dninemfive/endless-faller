class Lose extends Phaser.Scene {
    constructor(){
        super("lose");
    }

    preload(){
        //this.load.image("background", "assets/PlanetSkyScapeSmaller.png");
    }

    create(){
        //this.background = this.add.sprite(game.config.width / 2, 0,"background").setOrigin(0.5,0);
        //this.background.setScale(game.config.width / this.background.width);
        this.add.text(game.config.width / 2, (game.config.height / 2) - (borderPadding * 3), "You are dead.", textConfigWhite).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, "Your score was " + score + ".", textConfigWhite).setOrigin(0.5);
        this.add.text(game.config.width / 2, (game.config.height / 2) + (borderPadding * 3), "press R to restart or SPACE to return to menu", textConfigWhite).setOrigin(0.5);
        // might want to make this any key eventually
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            state = STATES.MAIN;
            this.scene.start("play");
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            state = STATES.GAME;
            this.scene.start("play");
        }
    }
}