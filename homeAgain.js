/*jshint esversion: 6 */


// Main global variables that I will be using for this game
const context, controller, player, loop;


// Defining and setting up the canvas
context = document.querySelector('canvas').getContext('2d');

context.canvas.height = 1080;
context.canvas.width = 1920;


// Defing the player character
player = {
    height: 10,
    width: 10,
    dash: true,
    x: 960,
    y: 540,
    xVelocity: 0,
    yVelocity: 0
}


// Defining the controller
controller = {
    left: false,
    right: false,
    up: false,
    down: false,
    dash: false,

    keyListener: function(event) {
        const keyStatus = (event.type === 'keydown') ? true : false;

        switch(event.keyCode) {
            case 37: // Left Arrow
                controller.left = keyStatus;
                break;
            case 39: // Right Arrow
                controller.right = keyStatus;
                break;
            case 38: // Up Arrow
                controller.up = keyStatus;
                break;
            case 40: // Down Arrow
                controller.down = keyStatus;
                break;
            case 32: // Space Bar
                controller.dash = keyStatus;
                break;
        }
    }
};


// Setting up the game loop
loop = function() {
    if(controller.left) {
        player.xVelocity -= 10;
    }
    if(controller.right) {
        player.xVelocity += 10;
    }
    if(controller.up) {
        player.yVelocity += 10;
    }
    if(controller.down) {
        player.yVelocity -= 10;
    }
    if(controller.up && player.dash === false) {
        player.yVelocity -= 50;
        player.dash = true;
}


// This controls the stength of the gravity
player.xVelocity += 1.5; 


// This adds velocity to the x and y positions
player.x += player.xVelocity;
player.y += player.yVelocity;
player.xVelocity *= 0.7;
player.yVelocity *= 0.7;


// World collision

// Bottom
if(player.y > context.canvas.height - player.height) {
    player.dash = false;
    player.y = context.canvas.height - player.height;
    player.yVelocity = 0;
}
// Top
if(player.y > -(context.canvas.height) + player.height) {
    player.dash = false;
    player.y = context.canvas.height - player.height;
    player.yVelocity = 0;
}
// Left
if(player.x < -(player.height)) {
    player.dash = false;
    player.y = context.canvas.height - player.height;
    player.yVelocity = 0;
}
// Right
if(rectangle.y > -(context.canvas.height) + player.height) {
    player.dash = false;
    player.y = context.canvas.height - player.height;
    player.yVelocity = 0;
}



// hjkhkh


// Event listeners that are tracking the controller keys
window.addEventListener('keyleft',controller.keyListener);
window.addEventListener('keyright',controller.keyListener);
window.addEventListener('keyup',controller.keyListener);
window.addEventListener('keydown',controller.keyListener);
window.addEventListener('space',controller.keyListener);