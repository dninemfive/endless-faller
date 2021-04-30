class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.hp = 10; // can be whatever
    }
    
    update(){        
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
            this.x += this.moveSpeed;
        }
    }
}