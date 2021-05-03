class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.velocity = 0;
        this.hp = playerStartPos;
    }
    
    update(){
        if(state === STATES.GAME){
            let leftWall = this.scene.leftWall;
            let rightWall = this.scene.rightWall;
            if(keyLEFT.isDown) {
                this.velocity -= playerAcceleration;
            } else if(keyRIGHT.isDown){
                this.velocity += playerAcceleration;
            }
            this.velocity -= this.velocity / playerDeceleration;
            Phaser.Math.Clamp(this.velocity, -playerMaxSpeed, playerMaxSpeed);
            this.flipX = this.velocity > 0;
            let newX = Phaser.Math.Clamp(this.x + this.velocity, leftWall.displayWidth + this.displayWidth / 2, game.config.width - rightWall.displayWidth - this.displayWidth / 2);
            this.x = newX;
            this.y = this.hp * game.config.height;
            if(this.hp < playerStartPos){
                this.hp += playerHealthPerTick;
            }
        }        
    }
}