class Menu extends Phaser.Scene {
    constructor(){
        super("menu");
    }

    preload(){
    }

    create(){
        this.add.text(game.config.width / 2, borderUISize + borderPadding, " MAIN MENU ", textConfig).setOrigin(0.5);
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