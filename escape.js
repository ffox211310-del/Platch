const GRID = 10; // 全体10マス
let currentLane = 5; // 真ん中スタート（0〜9）

let escapeScore = 0;
let playerY = window.innerHeight / 2;
let gameLoop;
let enemyLoop;

function startEscapeGame(){
    escapeScore = 0;
    currentLane = 5;

    document.getElementById("escapeScore").textContent = 0;

    updatePlayer();

    gameLoop = setInterval(updateGame, 20);
    enemyLoop = setInterval(createEnemy, 1000);
}

function moveUp(){
    if(currentLane > 0){
        currentLane--;
        updatePlayer();
    }
}

function moveDown(){
    if(currentLane < GRID - 1){
        currentLane++;
        updatePlayer();
    }
}

function updatePlayer(){
    const player = document.getElementById("playerBox");

    const laneHeight = window.innerHeight / GRID;
    const y = currentLane * laneHeight;

    player.style.top = y + "px";
}

function createEnemy(){
    const enemy = document.createElement("div");

    const lane = Math.floor(Math.random() * GRID);
    const laneHeight = window.innerHeight / GRID;
    let y = lane * laneHeight;

    enemy.style.position = "absolute";
    enemy.style.left = window.innerWidth + "px";
    enemy.style.top = y + "px";
    enemy.style.width = "30px";
    enemy.style.height = "30px";
    enemy.style.background = "red";

   document.getElementById("enemyArea").appendChild(enemy);

    let x = window.innerWidth;

    const move = setInterval(() => {
        x -= 5;
        enemy.style.left = x + "px";

        const player = document.getElementById("playerBox");
        const pRect = player.getBoundingClientRect();
        const eRect = enemy.getBoundingClientRect();

        if(
            pRect.left < eRect.right &&
            pRect.right > eRect.left &&
            pRect.top < eRect.bottom &&
            pRect.bottom > eRect.top
        ){
            endGame();
            clearInterval(move);
        }

        if(x < 0){
            escapeScore++;
            document.getElementById("escapeScore").textContent = escapeScore;
            enemy.remove();
            clearInterval(move);
        }

    }, 20);
}

function updateGame(){
    // 今は特に処理なし（拡張用）
}

function endGame(){
    clearInterval(gameLoop);
    clearInterval(enemyLoop);

    document.getElementById("escapeResultText").textContent =
        "スコア: " + escapeScore;

    showScreen("escapeResult");
}

function restartEscape(){
    showScreen("escapeGame");
    startEscapeGame();
}
