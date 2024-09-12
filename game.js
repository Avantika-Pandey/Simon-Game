//alert("hello");
var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var started = false;
var level=0;


$(document).keydown(function(){
    if(!started)
    {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
  });

$(".btn").click(function(event){

    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    playSound( userChosenColour + ".mp3");

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    
});

              

function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);    

    var randomNumber = Math.random() * 4;
     randomNumber = Math.floor(randomNumber) ;
     
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound( randomChosenColor + ".mp3");
    }

    

function playSound(name)
{
    var audio = new Audio(name);
    audio.play();

}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
    console.log("success");
    
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(function () {
             nextSequence();
             }, 1000);
  
        }
    }

    else
    {
    console.log("wrong");

    playSound("sounds/wrong.mp3");

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
    
    }
}

function startOver()
{
    //level, gamePattern and started

    level = 0;
    gamePattern = [];
    started = false;
}



