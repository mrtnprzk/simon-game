// Empty Arrays
const gamePattern = [];
const userClickedPattern = [];

// Array with Colors
const buttonColours = ["red", "blue", "green", "yellow"];


// Start Game on KEY PRESS
let level = 0;
let enterKeyPress = false;

$(document).keypress(function (e) { 

    if (e.keyCode == 13 && enterKeyPress == false) {
        
        // Changing to True to Start Game just on First ENTER
        enterKeyPress = true

        // Starting Game with nextSequence() after 0.3 sec
        setTimeout(function () {
            nextSequence();
        }, 300) // setTimeout not neccesary

        // empty h2 text
        $("h2").html("");

        // not neccesary, just like Level 0 is there before 0.3 sec
        $("#level-title").html(`Level ${level}`);
    }
});


// Function to Play Sound
const playSound = (name) => {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play(); 
}


// Function to Animate 
const animatePress = (currentColour) => {

    // adding class to selected buttons
    $(`.${currentColour}`).addClass( "pressed" );

    // removing class after 0.1 sec
    setTimeout(function () {
        $(`#${currentColour}`).removeClass( "pressed" );
    }, 100)
}


// On Button Click
$(".btn").click(function (e) { 

    if (enterKeyPress == true) {

        // will get name of Color from id
        const userChosenColour = e.target.id;
        
        // Pushing Color into Empty Array
        userClickedPattern.push(userChosenColour);

        // Play Sound
        playSound(userChosenColour);

        // Animate
        animatePress(userChosenColour);

        // Chcek Answer
        checkAnswer(userClickedPattern.length - 1)
    }
});


// Function to ...
const nextSequence = () => {
    // Random Number 0-3
    const randomNumber = Math.floor(Math.random() * 4);
    
    // Random Color connected by Random Number
    const randomChosenColour = buttonColours[randomNumber];

    // Pushing Color into Empty Array
    gamePattern.push(randomChosenColour);

    // Animate Flash
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100)

    // Play Sound
    playSound(randomChosenColour)

    // Change Text h1 + Raise Level
    $("#level-title").html(`Level ${level}`);
    level++
}


// Function to chceck ORDER Click Answer
const checkAnswer = (currentLevel) => {
    
    // IF both Arrays have same ORDER Value of Strings inside
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        
        // IF Arrays have same lenght it will...
        if(userClickedPattern.length === gamePattern.length){

            // ...Play Audio
            const audio = new Audio(`sounds/right.wav`);
            audio.play(); 

            // ...Change Color of Screen
            $("body").addClass("level-right");
            setTimeout(function () {
                $("body").removeClass("level-right");
            }, 200)

            // ...after 1 sec...
            setTimeout(function () {

                // ...start nextSequence()
                nextSequence();

                // ...empty array userClickedPattern
                userClickedPattern.splice(0, userClickedPattern.length);
            }, 1000)
        } 
    } else {

        // Play Audio
        const audio = new Audio(`sounds/wrong.mp3`);
        audio.play(); 

        // Change Color of Screen
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        // Change Text of h1
        $("h1").html("GAME OVER!");
        $("h2").html("Press ENTER key to Restart");

        // NEW GAME
        startOver()
    }
}


// Function to setting NEW GAME
const startOver = () => {
    level = 0;
    enterKeyPress = false;
    userClickedPattern.splice(0, userClickedPattern.length);
    gamePattern.splice(0, gamePattern.length);
}