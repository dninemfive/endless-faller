class Lose extends Phaser.Scene {
    constructor(){
        super("lose");
    }

    preload(){
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){
        this.add.text(game.config.width / 2, borderUISize + borderPadding, " YOU LOST ", textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, "Press R to restart or SPACE to return to menu", textConfig).setOrigin(0.5);
        // might want to make this any key eventually
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            this.scene.start("menu");
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyR)){
            this.scene.start("play");
        }
    }
}