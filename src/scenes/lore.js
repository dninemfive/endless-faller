class Lore extends Phaser.Scene {
    constructor(){
        super("lore");
    }

    preload(){
        //this.load.audio('sfx_select', './assets/blip_select12.wav');
        //this.load.audio('sfx_explosion', './assets/explosion38.wav');
        //this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create(){

        let loreConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: 'cyan',
            color: 'white',
            align: 'right',
            padding: {
              top: 1,
              bottom: 1,
            },
            fixedWidth: 0
          }

        console.log("we're in lore");
        this.add.text(game.config.width / 2, borderUISize + borderPadding, " HORIZON DOWN ", textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*2 + borderPadding, " Living beings of Planet Sky have spent their ", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*3 + borderPadding, " peaceful lives on roof tops of buildings so ", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*4 + borderPadding, " bizarrely high, Earthlings couldn’t quite comprehend them. ", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*5 + borderPadding, " But as of 2384 AD, Planet Sky is on course to collide with", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*6 + borderPadding, " two celestial objects: Planets designated LB6385, and GS1119. ", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*7 + borderPadding, "  Now, those same citizens that have spent their lives ", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*8 + borderPadding, " in the sky, find that their only escape lies at the very ", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*9 + borderPadding, "  bottom of the planet: The Core. With working teleportation", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*10 + borderPadding, "  devices awaiting them there, those who dare take the fall,", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*11 + borderPadding, "  and chance their luck with fate.", loreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, borderUISize*13 + borderPadding, " Press Up to return to Title Screen", loreConfig).setOrigin(0.5);
        // might want to make this any key eventually
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyUP)){
            this.scene.start("menu");
        }
    }
}