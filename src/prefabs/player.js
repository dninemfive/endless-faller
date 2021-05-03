class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = playerMoveSpeedFactor;
        this.hp = 10; // can be whatever
    }
    
    update(){        
        let leftWall = this.scene.leftWall;
        let rightWall = this.scene.rightWall;
        if(keyLEFT.isDown && this.x > (leftWall.width * leftWall.scale) + (this.width * this.scale) / 2) {
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x < game.config.width - (rightWall.width * rightWall.scale) - (this.width * this.scale) / 2){
            this.x += this.moveSpeed;
        }
    }
}