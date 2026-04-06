const GRID = 10;
let currentLane = 5;

let escapeScore = 0;
let enemyLoop;

// ゲーム開始
function startEscapeGame(){
    escapeScore = 0;
    currentLane = 5;

    document.getElementById("escapeScore").textContent = 0;

    updatePlayer();

    // 前のループ止める（超重要）
    clearInterval(enemyLoop);

    enemyLoop = setInterval(createEnemy, 800);
}

// 上
function moveUp(){
    if(currentLane > 0){
        currentLane--;
        updatePlayer();
    }
}

// 下
function moveDown(){
    if(currentLane < GRID - 1){
        currentLane++;
        updatePlayer();
    }
}

// プレイヤー位置更新
function updatePlayer(){
    const player = document.getElementById("playerBox");
    const game = document.getElementById("escapeGame");

    const laneHeight = game.clientHeight / GRID;
    const y = currentLane * laneHeight;

    player.style.top = y + "px";
}

// 敵生成
function createEnemy(){
    const game = document.getElementById("escapeGame");
    const area = document.getElementById("enemyArea");

    const gameWidth = game.clientWidth;
    const gameHeight = game.clientHeight;

    const enemy = document.createElement("div");

    // マス位置
    const lane = Math.floor(Math.random() * GRID);
    const laneHeight = gameHeight / GRID;
    let y = lane * laneHeight;

    enemy.style.position = "absolute";
    enemy.style.left = gameWidth + "px";
    enemy.style.top = y + "px";
    enemy.style.width = "30px";
    enemy.style.height = "30px";
    enemy.style.background = "red";

    area.appendChild(enemy);

    let x = gameWidth;

    const move = setInterval(() => {
        x -= 6; // スピード
        enemy.style.left = x + "px";

        const player = document.getElementById("playerBox");
        const p = player.getBoundingClientRect();
        const e = enemy.getBoundingClientRect();

        // 衝突
        if(
            p.left < e.right &&
            p.right > e.left &&
            p.top < e.bottom &&
            p.bottom > e.top
        ){
            clearInterval(move);
            endGame();
        }

        // 通過
        if(x < -40){
            escapeScore++;
            document.getElementById("escapeScore").textContent = escapeScore;
            enemy.remove();
            clearInterval(move);
        }

    }, 20);
}

// 終了
function endGame(){
    clearInterval(enemyLoop);

    document.getElementById("escapeResultText").textContent =
        "スコア: " + escapeScore;

    showScreen("escapeResult");
}

// 再スタート
function restartEscape(){
    // 敵全消し（超重要）
    document.getElementById("enemyArea").innerHTML = "";

    showScreen("escapeGame");
    startEscapeGame();
}
