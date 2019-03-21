/*jshint esversion: 6 */
// This game.js file handles all game objects

// This game constructor controls how the game world will appear and behave
const Game = function() {
    this.world = {

        background_color: 'rgba(40, 48, 56, 0.25)',
        friction: 0.9,
        gravity: 3,
        player: new Game.Player(),
        height: 72,
        width: 128,

        // Outer world boundary collision for any given object
        collideObject: function(object) {
            if(object.x < 0) {
                object.x = 0;
                object.velocity_x = 0; 
            } 
            else if(object.x + object.width > this.width) {
                object.x = this.width;
            }
            if(object.y < 0) {
                object.y = 0;
                object.velocity_y = 0;
            }
            else if(object.y + object.height > this.height) {
                object.jumping
            }
        },

        // This function updates the game loop for each frame
        update: function() {
            this.player.velocity_y += this.gravity;
            this.player.update();
            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;
            this.collideObject(this.player);
        }

    };

    this.update = function() {
        this.world.update();
    };

    Game.prototype = {
        constructor: Game
    };

    Game.Player = function(x, y) {
        this.color = '#40e0d0';
        this.height = 16;
        this.jumping = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width = 16;
        this.x = 100;
        this.y = 50;
    };

    Game.Player.prototype = {

    }

}