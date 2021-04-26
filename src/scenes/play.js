class Play extends Phaser.Scene {
    constructor(){
        super("play");
    }

    preload(){
        this.load.image("starfield", "assets/starfield.png");
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("spaceship", "assets/spaceship.png");
        this.load.spritesheet("explosion", "assets/explosion.png", { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create(){
        this.starfield = this.add.tileSprite(0,0,640,480,"starfield").setOrigin(0,0);

        // rocket
        this.rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);    
        // spaceships
        this.ships = [];

        // adds ship from the top to the bottom of the screen
        for(let i = 0; i < numShips; i++){
            this.ships.push(new Spaceship(
                this,
                game.config.width + borderUISize * (2 * (numShips - i - 1)),
                borderUISize * (4 + i) + borderPadding * (2 * i),
                'spaceship', 0,
                10 * (numShips - i)
            ).setOrigin(0,0));
        }

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);      
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        if(useMouse){
            // from https://phaser.discourse.group/t/detect-click-event-anywhere-on-canvas/924
            this.input.on('pointerdown', () => this.fire());
        }    

        this.anims.create({ key: "explode", frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 9, first: 0}), frameRate: 30 });

        textConfig.fixedWidth = 100;
        this.score = 0;        
        this.scoreLabel = this.add.text(borderUISize + borderPadding, borderUISize + (borderPadding * 2), this.score, textConfig);
        this.timeRemaining = game.settings.gameTimer;
        this.timerLabel = this.add.text(game.config.width - (borderUISize + (borderPadding * 2)), borderUISize + (borderPadding * 2), this.timeRemaining, textConfig).setOrigin(1, 0);

        // timer
        this.gameOver = false;
        textConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(1000 * timerDelta, () => {
            this.timerTick();
        }, null, this);
    }

    update(){
        if(this.gameOver){
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart();
            } else if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.start("menu");                
            }
        } else {
            this.rocket.update();
            for (let ship of this.ships){
                ship.update();
                if (this.checkCollision(this.rocket, ship)){
                    this.rocket.reset();
                    this.shipExplode(ship);
                    this.timeRemaining += timeGainOnKill;
                }
            }
        }
        this.starfield.tilePositionX -= 4;
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position        
            ship.active = false;  
            boom.destroy();                       // remove explosion sprite
            this.time.delayedCall(Phaser.Math.Between(125, 375) * Math.log10(ship.points), () => {
                ship.active = true;
                ship.alpha = 1;                       // make ship visible again
            }, null, this);
        }); 
        this.score += ship.points;
        this.scoreLabel.text = this.score;
        this.sound.play('sfx_explosion');
    }

    // Called once per second. Schedules a call to itself until the game is over.
    timerTick(){
        if (this.timeRemaining > 0) {
            this.timeRemaining -= timerDelta;
            this.timerLabel.text = Math.round(10 * this.timeRemaining) / 10; // round to one decimal place
        }
        if (this.timeRemaining <= 0){
            this.timerLabel.text = 0;
            if(this.score > highScore) {
                highScore = this.score;
            }
            this.add.text(game.config.width / 2, game.config.height / 2 - 32, "GAME OVER", textConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2, "High Score: " + highScore, textConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 32, "Press (R) to Restart or ← for Menu", textConfig).setOrigin(0.5);
            this.gameOver = true;            
            console.log("Game over. High score: " + highScore);
        } else {            
            this.clock = this.time.delayedCall(1000 * timerDelta, () => {
                this.timerTick();
            }, null, this);
        }
    }
}