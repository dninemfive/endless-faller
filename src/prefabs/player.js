class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.velocity = 0;
        this.hp = 10; // can be whatever
    }
    
    update(){        
        let leftWall = this.scene.leftWall;
        let rightWall = this.scene.rightWall;
        if(keyLEFT.isDown) {
            this.velocity -= playerMoveSpeedFactor / 10;
        } else if(keyRIGHT.isDown){
            this.velocity += playerMoveSpeedFactor / 10;
        }
        if(this.velocity > 0){
            this.velocity -= playerMoveSpeedFactor / 20;
        } else if(this.velocity < 0) {
            this.velocity += playerMoveSpeedFactor / 20;
        }
        console.log("pre: " + this.velocity);
        Phaser.Math.Clamp(this.velocity, -playerMoveSpeedFactor, playerMoveSpeedFactor);
        this.flipX = this.velocity > 0;
        let newX = Phaser.Math.Clamp(this.x + this.velocity, leftWall.displayWidth + this.displayWidth / 2, game.config.width - rightWall.displayWidth - this.displayWidth / 2);
        this.x = newX;
    }
}