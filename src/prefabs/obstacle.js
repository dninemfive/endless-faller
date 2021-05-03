class Obstacle extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, collectible = false){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.passed = false;
        this.collectible = collectible; // Reusing this class bc I might as well
    }
    
    update(){                
    }
}