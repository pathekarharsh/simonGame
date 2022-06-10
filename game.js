//array of all colours
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array for pattern
var gamePattern = [];
var userClickedPattern = [];

var started = false;

//starting from 0
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//handler function which will trigger button
$(".btn").click(function() {

  //it will store id
  var userChosenColour = $(this).attr("id");

  //for checking userclicked pattern and game pattern is same or not
  userClickedPattern.push(userChosenColour);

  //it will work on chosen colour
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    //condition checking answer
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      //checking is paterrn and clicked pattern is equal or not
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      //it will show game over for 200ms
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //updateing h1 after wrong
      $("#level-title").text("Game Over, Press Any Key to Restart");


      startOver();
    }

}

//first function that we have created
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //we have 4 colours so 0,1,2,3 i.e. *4
  var randomNumber = Math.floor(Math.random() * 4);

  //this variable will hold the random number
  var randomChosenColour = buttonColours[randomNumber];

  //this pattern of the game will push random chosen colour
  gamePattern.push(randomChosenColour);

  //using jq with same id
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//refactoring play sound()
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//for animating our pressed button
function animatePress(currentColor) {
  //we hace oressed in css
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    //after 100ms it will removed
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//for starting again 
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
