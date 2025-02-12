var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var gameStarted = false;

function nextSequence() {
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    showSequence();
    userClickedPattern = [];
} 

function showSequence() {
    gamePattern.forEach(function (element, index) {
        setTimeout(function () {
            $("#" + element).fadeOut(100).fadeIn(100);
            playSound(element);
            if (index === level - 1) {
                $(".btn").click(buttonClick);
            }
        }, 500 * (index + 1));
    });
}

function buttonClick() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (!(userClickedPattern[currentLevel] == gamePattern[currentLevel])) {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    } else if (userClickedPattern.length == gamePattern.length) {
        $(".btn").off("click");
        setTimeout(function () {
            level++;
            nextSequence();
        }, 500);
    }
}

function startOver() {
    $(".btn").off("click");
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}

function playGame() {
    $("body").keypress(function () {
        if (!gameStarted) {
            gameStarted = true;
            nextSequence();
        }
    });
}

playGame();
