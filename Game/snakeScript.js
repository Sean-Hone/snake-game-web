var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var tileSize = 30;
var xPos = [9,9,9];
var yPos = [10,11,12];
var dir = 'up';


update();

var gameLoop = setInterval(update,1000);

function update(){
    draw();
}

function draw(){
    for(var i=xPos.length-1; i>=0; i--){
        context.fillStyle = "#00ff00";
        context.fillRect((xPos[i]*tileSize)+2, (yPos[i]*tileSize)+2,tileSize-4,tileSize-4);
        context.fillStyle = "#33cc33";
        context.fillRect((xPos[i]*tileSize)+5, (yPos[i]*tileSize)+5,tileSize-10,tileSize-10);
    }
}
