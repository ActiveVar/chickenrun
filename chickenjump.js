var character = document.getElementById("character");
var block = document.getElementById("block");
var scoreDisplay = document.getElementById("score");
var score = 0;
var gameOver = false;

function jump() {
    if (!gameOver && character.classList != "animate") {
        character.classList.add("animate");
    }
    setTimeout(function () {
        character.classList.remove("animate");
    }, 500);
}

document.addEventListener("keydown", function (event) {
    jump();
});

function restartGame() {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = "Score " + score;
    block.style.animation = "block 1s infinite linear";
    block.style.display = "block";
}

var checkDead = setInterval(function () {
    var characterTop =
        parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockleft =
        parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if (blockleft < 20 && blockleft > 0 && characterTop > 130) {
        gameOver = true;
        block.style.animation = "none";
        block.style.display = "none";
        var restart = confirm("Bawk Bawk! Play again?");
        if (restart) {
            restartGame();
        }
    } else if (blockleft < -20) {
        // When the obstacle passes the player, increment the score
        score++;
        scoreDisplay.textContent = "Score " + score;
    }
}, 10);

