var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
var gameStarted = false;
var runningUpdate = false;

hole.addEventListener("animationiteration", () => {
    if (gameStarted) {
        resetHolePosition();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        handleSpaceInteract();
    }
});

function startGame() {
    gameStarted = true;
     startPopup.style.display = 'none'; 
    gameLoop(); // Start the game loop when the game starts
}

function gameLoop() {
    if (!gameStarted) {
        return;
    }

    updateGame();
    requestAnimationFrame(gameLoop);
}

function updateGame() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);

    if ((characterTop > 480 || (blockLeft < 20 && blockLeft > -50 && (cTop < holeTop || cTop > holeTop + 130)))) {
        handleGameOver();
    } else if (blockLeft == 20) {
        handleScoreIncrease();
    }
}

function jump() {
    if (jumping == 0) {
        jumping = 1;
        let jumpCount = 0;
        var startTime = performance.now(); 

        function updateJump() {
            if (!runningUpdate) {
                return; // Stop the update if the flag is false
            }

            var currentTime = performance.now();
            var deltaTime = currentTime - startTime;

            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if ((characterTop > 6) && (counter < 15)) {
                character.style.top = (characterTop - 3) + "px"; // Use a fixed gravity value
            }

            if (jumpCount > 20) {
                jumping = 0;
                return;
            }

            jumpCount++;
            requestAnimationFrame(updateJump);
        }

        runningUpdate = true; // Set the flag to true before starting the jump
        requestAnimationFrame(updateJump);
    }
}

function resetHolePosition() {
    var random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
}

function handleSpaceInteract() {
    if (!gameStarted) {
        startGame();   
    } else {
        jump();
    }
}

function handleGameOver() {
    alert("Game Over. Score: " + counter);
    resetGame();
}

function handleScoreIncrease() {
    counter++;
    updateScore(counter);
}

function updateScore(value) {
    document.getElementById("score").textContent = "Score: " + value;
}

function resetGame() {
    character.style.top = "100px";
    counter = 0;
    updateScore(0);
    gameStarted = false;
    runningUpdate = false; // Set the flag to false to stop the update
}