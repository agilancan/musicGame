/*jshint esversion: 6 */


// Main global variables that I will be using for this game
let context, controller, player, loop, enemy;


// Defining and setting up the canvas
context = document.querySelector('canvas').getContext('2d');

context.canvas.height = 700;
context.canvas.width = 1000;


// Defing the player character
player = {
    height: 10,
    width: 10,
    dash: false,
    x: 960,
    y: 540,
    xVelocity: 0,
    yVelocity: 0
};


// Defing the enemy character
enemy = {
    height: 20,
    width: 20,
    x: 360,
    y: 240,
    xVelocity: 0,
    yVelocity: 0
};


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
        player.xVelocity -= 5;
    }
    if(controller.right) {
        player.xVelocity += 5;
    }
    if(controller.up) {
        player.yVelocity -= 5;
    }
    if(controller.down) {
        player.yVelocity += 5;
    }
    if(controller.dash && player.dash === false) {
        player.yVelocity -= 50;
        player.dash = true;
    }


    // This adds velocity to the x and y positions
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.5;
    player.yVelocity *= 0.5;


    // World collision

    // Up/Down
    if(player.y < -(player.height)) {
        player.y = context.canvas.height - player.height;
    }
    else if (player.y > (context.canvas.height - player.height)) {
        player.y = 10;
    }
    // Left/Right
    if (player.x < -(player.width)) {
        player.x = context.canvas.width - player.width;
    } 
    else if (player.x > (context.canvas.width - player.width)) {
        player.x = 10;
    }


    // Defining the canvas visuals
    context.fillStyle = 'rgba(64, 224, 208, 0.25)'; // Canvas color
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#fa2a55'; // Player color
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();
    context.fillStyle = '#F6E481'; // Enemy color
    context.beginPath();
    context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
    context.fill();


    // This asks the browser to re draw the game via the loop, when ready to do so
    window.requestAnimationFrame(loop);

};


// Event listeners that are tracking the controller keys
window.addEventListener('keyleft', controller.keyListener);
window.addEventListener('keyright', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);
window.addEventListener('keydown',controller.keyListener);
window.addEventListener("keypress", spaceKey, false);
window.requestAnimationFrame(loop);



// Defining spaceKey function for setting up the space bar keypress
function spaceKey(e) {
    if (e.keyCode == '32' && e.keyCode == '38') {
        player.yVelocity -= 100;
        player.dash = true;
    }
    else if (e.keyCode == "32" && e.keyCode == '40') {
      player.yVelocity += 100;
      player.dash = true;
    }
}


let update = function() {
    // Randomly generate enemies
    let randomEnemy = function() { 
        enemy.height = 10 + Math.random() * 50;
        enemy.width = 10 + Math.random() * 50;
        enemy.x = Math.random() * enemy.width;
        enemy.y = Math.random() * enemy.height;
        enemy.xVelocity = 20 + Math.random() * 20;
        enemy.yVelocity = 20 + Math.random() * 20;
    };

    new Enemy(randomEnemy());
    new Enemy(randomEnemy());
    new Enemy(randomEnemy());

};


// 1. create many enemies with random properties
// 2. make enemies home towards the player, from where ever they spawn
// 3. make enemies get smaller while homing towards the player, until the enemy dissapears no longer a threat
// 4. enemies collision with eath other
// 5. enemies collision with the world boundary
// 6. enemy collision with player => lose
// 7. set up scoring system based on time passed