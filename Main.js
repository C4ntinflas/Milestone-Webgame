function startGame() {
    myGamePiece = new component(20, 20, "blue", 10, 120, "circle");
    myGamePiece.gravity = 0.08;
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");

    window.addEventListener('keydown', function (e) {
        if (e.code === 'Space') {
            accelerate(-0.1);
        }
    });

    window.addEventListener('keyup', function (e) {
        if (e.code === 'Space') {
            accelerate(0.3);
        }
    });

    let resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset Game';
    resetButton.onclick = function () {
        resetGame();
    };
    document.body.appendChild(resetButton);

    myGameArea.start();
}

function resetGame() {
    myGamePiece = new component(20, 20, "blue", 10, 120, "circle");
    myObstacles = [];
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.frameNo = 0;
    myGameArea.clear();
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
