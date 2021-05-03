let config = {
    type: Phaser.CANVAS,
    width: 1000,
    height: 750,
    scene: [Play, Lose, Lore],
    autoCenter: Phaser.CENTER_HORIZONTALLY
};
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT; // globals so that player.update() can access them

// basically an enum
let STATES = { MAIN: 0, TRANSITION: 1, GAME: 2 };
// Stores the current game state.
// MAIN is basically the old main menu scene, with the titles and stuff.
// GAME is the old play scene, with no title text and all the game objects spawning
// TRANSITION transitions from MAIN to GAME, fading out the title and moving the player in from the top
let state = STATES.MAIN;
let score = 0;
let highScore = 0;

// global settings
let playerScale = 0.225,
    wallScale = 0.2,
    initialFallSpeed = 10,         // minimum and initial fall speed
    fallSpeedIncrease = 1.1,       // how much the player's fall speed increases each time an obstacle spawns, as a factor of their current speed
    maxFallSpeed = 50,
    playerAcceleration = 0.5,
    playerDeceleration = 50,        // __divisor__ for player deceleration (higher values = less deceleration)
    playerMaxSpeed = 3,             // max player velocity
    obstacleSpawnPeriod = 500,      // approximately how many update() calls between obstacle spawn. affected by randomness.
    playerStartPos = 0.333,         // vertical location of the player, as a proportion of screen height; also max player health
    obstacleDamage = 0.111,         // amount of damage the player takes from obstacles
    fallSpeedDamage = 2,            // how much the player's speed is divided when hitting an obstacle. will never fall below the initial fall speed
    playerHealthPerTick = 0.00005,  // amount the player heals each tick
    backgroundScaleFactor = 0.0001, // modifies the amount the background moves, for parallax purposes
    blackoutFadeout = 0.02,         // how much (as a proportion of 100%) the blackout frame fades per tick
    obstacleDelay = 300,            // how long, in ticks, before the obstacle counter begins
    pointsPerObstacle = 100;        // how many points you get per obstacle. Multiplied by the log of the player's current speed.
                                    // The player also loses this much score (not multiplied by the log) when hitting an obstacle (min 0)

// if we make this a global we don't have to copy this to multiple contexts >.>
let textConfigWhite = {
    fontFamily: "Century Gothic",
    fontSize: "28px",
    backgroundColor: "#00000000",
    color: "#FFFFFF",
    align: "right",
    padding: { top: 5, bottom: 5 },
    fixedWidth: 0
}
let textConfigBlack = {
    fontFamily: "Century Gothic",
    fontSize: "28px",
    backgroundColor: "#00000000", // transparent
    color: "#000000",
    align: "right",
    padding: { top: 5, bottom: 5 },
    fixedWidth: 0
}
let textConfigDebug = {
    fontFamily: "Century Gothic",
    fontSize: "28px",
    backgroundColor: "#e8bc4e", // from the side walls
    color: "#000000",
    align: "left",
    padding: { top: 5, bottom: 5, right: 10, left: 10 },
    fixedWidth: 0
}