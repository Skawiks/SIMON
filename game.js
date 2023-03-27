let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence() {
  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animateClick(randomChosenColour);
  playSound(randomChosenColour);
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
};

$(".btn").click(function(){
  if (started=== true){
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    animateClick(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
      }
    });


  $(document).keydown(function(){
    if (started === false){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  })



function playSound(name) {
  let audio = new Audio ("sounds/"+name+".mp3");
  audio.play();
};

function animateClick(click) {
  $("#"+ click).fadeOut(100).fadeIn(100);
};

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success")
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
    nextSequence();
        }, 1000);

      }
  } else {
    console.log("wrong");
    $("#level-title").text(`You lost! Press any key to restart`);
    $("body").addClass("gameOver");
    setTimeout(function() {
      $("body").removeClass("gameOver");
    }, 200);
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    let audio = new Audio ("sounds/wrong.mp3");
    audio.play();
    started = false;
}
}
