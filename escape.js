const GRID = 10; // 全体10マス
let currentLane = 5; // 真ん中スタート（0〜9）

let escapeScore = 0;
let playerY = window.innerHeight / 2;
let gameLoop;
let enemyLoop;

function startEscapeGame(){
    escapeScore = 0;
    playerY = window.innerHeight / 2;

    document.getElementById("escapeScore").textContent = 0;

    const player = document.getElementById("playerBox");
    player.style.top = playerY + "px";

    // ループ開始
    gameLoop = setInterval(updateGame, 20);
    enemyLoop = setInterval(createEnemy, 1000);
}

function moveUp(){
    playerY -= 30;
    updatePlayer();
}

function moveDown(){
    playerY += 30;
    updatePlayer();
}

function updatePlayer(){
    const player = document.getElementById("playerBox");
    player.style.top = playerY + "px";
}

function createEnemy(){
    const enemy = document.createElement("div");

    let y = Math.random() * (window.innerHeight - 30);

    enemy.style.position = "absolute";
 enemy.style.left = window.innerWidth + "px";
    enemy.style.top = y + "px";
    enemy.style.width = "30px";
    enemy.style.height = "30px";
    enemy.style.background = "red";

    document.getElementById("escapeGame").appendChild(enemy);

    let x = window.innerWidth;

    const move = setInterval(() => {
        x -= 5;
        enemy.style.left = x + "px";

        // 衝突判定
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

        // 通過成功
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
