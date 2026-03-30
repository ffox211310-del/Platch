let playerScore = 0;
let enemyScore = 0;

function openGame(id){
    showScreen(id);
}

function playJanken(player){

    const choices = ["グー","チョキ","パー"];
    const enemy = choices[Math.floor(Math.random()*3)];

    let result = "";

    if(player === enemy){
        result = "あいこ！";
    }else if(
        (player==="グー" && enemy==="チョキ") ||
        (player==="チョキ" && enemy==="パー") ||
        (player==="パー" && enemy==="グー")
    ){
        result = "勝ち！";
        playerScore++;
    }else{
        result = "負け！";
        enemyScore++;
    }

    document.getElementById("jankenText").innerText =
        `相手:${enemy} → ${result}`;

    document.getElementById("playerScore").innerText = playerScore;
    document.getElementById("enemyScore").innerText = enemyScore;

    // 勝敗判定
    if(playerScore >= 10 || enemyScore >= 10){
        endGame();
    }
}

function endGame(){

    let text = playerScore >= 10 ? "おめでとう" : "ざ〜んね〜んｗ";

    document.getElementById("janken").innerHTML = `
        <div style="color:#00ff66; font-size:30px;">
            ${text}
        </div>

        <button onclick="restartGame()">再挑戦</button>
        <button onclick="goHome()">ホームへ</button>
    `;
}

function restartGame(){
    playerScore = 0;
    enemyScore = 0;
    location.reload();
}

function goHome(){
    location.reload();
}
