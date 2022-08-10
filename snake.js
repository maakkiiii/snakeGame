//Create Snake Class with constructor for snake
class Snake {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.tail = [{ x: this.x, y: this.y }]
        this.rotateX = 0
        this.rotateY = 1
    }
    //Create move function 
    move() {
        var newRect;
        if (this.rotateX == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY == 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY == -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }

        this.tail.shift()
        this.tail.push(newRect)
    }
}
//Create Apple class, with constructor for apple
class Apple {
    constructor() {
        console.log("Spawn Apple")
        console.log(snake.si)
        var isTouching;
        while (true) {
            isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size
            for (var i = 0; i < snake.tail.length; i++) {
                if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                    isTouching = true
                }
            }
            console.log(this.x, this.y)
            this.color = "red" //Set color of apple
            this.size = snake.size

            if (!isTouching) {
                break;
            }
        }
    }
}


var canvas = document.getElementById("canvas") //Get canvas from HTML file
var snake = new Snake(20,20,20); //Create Sanke
var apple = new Apple(); //Create Apple
var canvasContext = canvas.getContext('2d'); //Set context for canvas

//As soon as the site loads, start gameLoop function
window.onload = () => {
    gameLoop();
}

//Put show function in gameLoop
function gameLoop() {
    setInterval(show, 1000 / 15) //Set Speed for Snake

}

//Put update and draw function in show function
function show() {
    update();
    draw();
}

//Update function consists of most mechanics for the game. 
function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    console.log("hallo update hallo")
    snake.move()
    eatApple()
    checkHitWall();

}
/*
Function for hitting wall. Game continues after hitting the wall, 
although it can get hard to get the snake back on the canvas.
Still working on that.
*/
function checkHitWall(){
    var headTail = snake.tail[snake.tail.length -1]
    if(headTail.x == - snake.size){
        headTail.x = canvas.width - snake.size
    } else if(headTail.x == - canvas.width){
        headTail.x = 0
    } else if(headTail.y == - snake.size){
        headTail.x = canvas.height - snake.size
    } else if(headTail.y == - canvas.height){
        headTail.x = 0
    }
}

//Eat apple function, for increasing snake length and adding new apple
function eatApple(){
    if(snake.tail[snake.tail.length - 1].x == apple.x &&
        snake.tail[snake.tail.length - 1].y == apple.y){
            snake.tail[snake.tail.length] = {x: apple.x, y: apple.y}
            apple = new Apple();
            apple1 = new Apple();
        }
}


function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black")
    createRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < snake.tail.length; i++) {
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
            snake.size - 5, snake.size - 5, 'green')
    }
    //Create Scoreboard
    canvasContext.font = "20px Calibri"
    canvasContext.fillStyle = "#00ffb3"
    canvasContext.fillText("Score:  " + (snake.tail.length - 1), canvas.width - 120, 20) //Get score here
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color)
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(x, y, width, height)
}
//Set arrow-keys for movement
window.addEventListener("keydown", (event)=>{
    setTimeout(()=>{
        if(event.keyCode == 37 && snake.rotateX != 1){
            snake.rotateX = -1
            snake.rotateY = 0;
        } else if(event.keyCode == 38 && snake.rotateY != 1){
            snake.rotateX = 0
            snake.rotateY = -1;
        } else if(event.keyCode == 39 && snake.rotateX != -1){
            snake.rotateX = 1
            snake.rotateY = 0; 
        } else if(event.keyCode == 40 && snake.rotateY != -1){
            snake.rotateX = 0
            snake.rotateY = 1;
        } 
    }, 1)
})