var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tileSize = 30;
var xDimension = 20;
var yDimension = 20;
var xPos;
var yPos;
var xVel;
var yVel;
var dir;
var prevDir;
var fruitX;
var fruitY;
var fruitSpawned;
var gameLoop;

$('#restart').on("click", function(){
    $('#restart').hide();
    initialiseGame();
    gameLoop = setInterval(update,250);
})

function initialiseGame(){
    xPos = [9,9,9];
    yPos = [10,11,12];
    xVel = 0;
    yVel = -1;
    dir = "up";
    prevDir = "up";
    fruitX = Math.floor(Math.random()*8) + 10;
    fruitY = Math.floor(Math.random()*tileSize);
    fruitSpawned = false;
}

$(document).on("keydown", function(e){
    e = e || window.event;
    if((e.keyCode===37 || e.keyCode===65) && prevDir!=="right"){
        dir = "left";
    }
    else if((e.keyCode===38 || e.keyCode===87) && prevDir!=="down"){
        dir = "up";
    }
    else if((e.keyCode===39 || e.keyCode===68) && prevDir!=="left"){
        dir = "right";
    }
    else if((e.keyCode===40 || e.keyCode===83) && prevDir!=="up"){
        dir = "down";
    }
});

function update(){

    var i;
    if(xPos[0]===fruitX && yPos[0]===fruitY){
        fruitSpawned = false;
        xPos.push(xPos[xPos.length-1]);
        yPos.push(yPos[yPos.length-1]);
        i = xPos.length-2;
    }
    else i = xPos.length-1;

    for(; i>0; i--){
        xPos[i] = xPos[i-1];
        yPos[i] = yPos[i-1];
    }

    if(dir==="left"){
        prevDir = "left"
        if(xPos[0]===0) xPos[0] = xDimension-1;
        else xPos[0] += -1;
    }
    else if(dir==="up"){
        prevDir = "up"
        if(yPos[0]===0) yPos[0] = yDimension-1;
        else yPos[0] += -1;
    }
    else if(dir==="right"){
        prevDir = "right"
        if(xPos[0]===xDimension-1) xPos[0] = 0;
        else xPos[0] += 1;
    }
    else if(dir==="down"){
        prevDir = "down"
        if(yPos[0]===yDimension-1) yPos[0] = 0
        else yPos[0] += 1;
    }

    while(!fruitSpawned){
        fruitX = Math.floor(Math.random()*xDimension);
        fruitY = Math.floor(Math.random()*yDimension);

        fruitSpawned = true;
        for(var i=0; i<xPos.length; i++){
            if(xPos[i]===fruitX && yPos[i]===fruitY){
                fruitSpawned = false;
                break;
            }
        }
    }

    for(var i=0; i<xPos.length; i++){
        for(var j=0; j<xPos.length; j++){
            if(j!==i && xPos[i]===xPos[j] && yPos[i]===yPos[j]){
                clearInterval(gameLoop);
                $('#restart').show();
            }
        }
    }

    draw();
}

function draw(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#ff0000"; //bright red
    context.beginPath();
    context.arc((fruitX*tileSize)+tileSize/2, (fruitY*tileSize)+tileSize/2, 12, 0, 2*Math.PI);
    context.fill();
    context.closePath();
    context.fillStyle = "#cc0000"; //red
    context.beginPath();
    context.arc((fruitX*tileSize)+tileSize/2, (fruitY*tileSize)+tileSize/2, 8, 0, 2*Math.PI);
    context.fill();
    context.closePath();

    for(var i=0; i<xPos.length; i++){
        context.fillStyle = "#00ff00"; //neon green
        context.fillRect((xPos[i]*tileSize)+2, (yPos[i]*tileSize)+2, tileSize-4, tileSize-4);
        context.fillStyle = "#33cc33"; //green
        context.fillRect((xPos[i]*tileSize)+5, (yPos[i]*tileSize)+5, tileSize-10, tileSize-10);
    }
}
