class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    
    update(){        
        this.y -= fallSpeed;
        // find obstacle in list and destroy it
        //
        if(this.y + this.height < 0){
            this.destroy();
        }
    }
}