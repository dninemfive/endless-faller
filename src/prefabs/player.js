class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        // add an instance to scene
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.hp = 10; // can be whatever
    }
    
    update(){
        // movement
        let mouse = this.scene.input.activePointer;
        if(useMouse) {
            // https://photonstorm.github.io/phaser3-docs/Phaser.Input.Pointer.html
            if(mouse.x < this.x && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(mouse.x > this.x && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        } else { 
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
            if(Phaser.Input.Keyboard.JustDown(keyF)){
                this.fire();
            }
        }
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    fire(){
        if(!this.scene.gameOver && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play();
        }        
    }
}