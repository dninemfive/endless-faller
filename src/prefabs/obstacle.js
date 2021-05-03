class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }
    
    update(){        
        this.y -= fallSpeed / 5; // todo: figure out why dividing by 5 syncs up with the wall
        // find obstacle in list and destroy it
        //
        if(this.y + this.height < 0){
            this.destroy();
        }
    }
}