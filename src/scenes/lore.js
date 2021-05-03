class Lore extends Phaser.Scene {
    constructor(){
        super("lore");
    }

    preload(){
    }

    create(){

        let loreConfig = {
            fontFamily: 'Courier',
            fontSize: '25px',
            backgroundColor: '#00000000',
            color: 'cyan',
            align: 'right',
            padding: {
              top: 1,
              bottom: 1,
            },
            fixedWidth: 0
        }
        textConfigWhite.fontSize = "50px";
        this.add.text(game.config.width / 2, borderUISize + borderPadding, " H O R I Z O N   D O W N ", textConfigWhite).setOrigin(0.5);
        textConfigWhite.fontSize = "28px";
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
        this.add.text(game.config.width / 2, game.config.height - (borderUISize + borderPadding), "press UP to return to menu", textConfigWhite).setOrigin(0.5);
        // might want to make this any key eventually
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keyUP)){
            state = STATES.MAIN;
            this.scene.start("play");
        }
    }
}