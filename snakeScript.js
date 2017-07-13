var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var highScores = [];
var maxHighScores = 5;
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
var score;

$('#restart').on("click", function(){
    $('#restart').hide();
    $('#gameover').hide();
    $('#summary').hide();
    initialiseGame();
    gameLoop = setInterval(update,100);
});  

function initialiseGame(){
    xPos = [9,9,9,9,9];
    yPos = [10,11,12,13,14];
    xVel = 0;
    yVel = -1;
    dir = "up";
    prevDir = "up";
    fruitX = Math.floor(Math.random()*8) + 10;
    fruitY = Math.floor(Math.random()*tileSize);
    fruitSpawned = false;
    score = 0;
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
        score++;
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
                context.clearRect(0, 0, canvas.width, canvas.height);
                $('#restart').show();
                $('#gameover').show();
                $('#gameover').html('Game Over :(');
                $('#summary').show();
                if(checkNewHighScore()) $('#summary').html('You ate <font color="#75B200">' + score + '</font> berries');
                else $('#summary').html('You ate ' + score + ' berries');
                updateHighScores();
                $('#highscores').html('<h2>Scores:</h2>');
                $('#highscores').append('<h3>' + highScores[0] + '</h3>');
                for(var i=1; i<highScores.length; i++){
                    $('#highscores').append('<h2>' + highScores[i] + '</h2>');
                }
                return;
            }
        }
    }

    draw();
}

function checkNewHighScore(){
    for(var i=0; i<highScores.length; i++){
        if(score<=highScores[i]) return false;
    }
    return true;
}

function updateHighScores(){
    if(highScores.length===0) highScores.push(score);
    else{
        var added = false;
        for(var i=0; i<highScores.length; i++){
            if(score>=highScores[i]){
                highScores.splice(i, 0, score);
                added = true;
                break;
            }
        }
        if(!added){
            highScores.push(score);
        }
        if(highScores.length>maxHighScores){
            highScores.pop();
        }
    }
}

function draw(){

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#C819FF"; //bright purple
    context.beginPath();
    context.arc((fruitX*tileSize)+tileSize/2, (fruitY*tileSize)+tileSize/2, 12, 0, 2*Math.PI);
    context.fill();
    context.closePath();
    context.fillStyle = "#932EB2"; //purple
    context.beginPath();
    context.arc((fruitX*tileSize)+tileSize/2, (fruitY*tileSize)+tileSize/2, 8, 0, 2*Math.PI);
    context.fill();
    context.closePath();

    for(var i=0; i<xPos.length; i++){
        context.fillStyle = "#A7FF00"; //neon green
        context.fillRect((xPos[i]*tileSize)+2, (yPos[i]*tileSize)+2, tileSize-4, tileSize-4);
        context.fillStyle = "#75B200"; //green
        context.fillRect((xPos[i]*tileSize)+5, (yPos[i]*tileSize)+5, tileSize-10, tileSize-10);
    }
}
