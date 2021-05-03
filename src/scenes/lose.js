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
        this.youredead = this.add.text(game.config.width / 2, (game.config.height / 2) - (borderPadding * 3), "You are dead.", textConfigWhite).setOrigin(0.5);
        this.youredead.alpha = 0;
        this.yourscore = this.add.text(game.config.width / 2, game.config.height / 2, "Your score was " + score + ".", textConfigWhite).setOrigin(0.5);
        this.yourscore.alpha = 0;
        this.highscore = this.add.text(game.config.width / 2, (game.config.height / 2) + (borderPadding * 3), "The high score is " + highScore + ".", textConfigWhite).setOrigin(0.5);
        this.highscore.alpha = 0;
        this.returntext = this.add.text(game.config.width / 2, 
            game.config.height - (borderUISize + borderPadding), "press R to restart or SPACE to return to menu", textConfigWhite).setOrigin(0.5);
        this.returntext.alpha = 0;
        // might want to make this any key eventually
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(){
        let alphaIncrease = 0.005;
        if(this.youredead.alpha < 1){
            this.youredead.alpha += alphaIncrease;
            if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
                this.youredead.alpha = 1;
            }
        } else if(this.yourscore.alpha < 1){
            this.yourscore.alpha += alphaIncrease;
            if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
                this.yourscore.alpha = 1;
            }
        } else if(this.highscore.alpha < 1){
            this.highscore.alpha += alphaIncrease;
            if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
                this.highscore.alpha = 1;
            }
        } else {
            this.returntext.alpha = 1;
        }
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