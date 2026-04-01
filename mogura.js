let moguraScore = 0;
let moguraTime = 20;
let moguraTimer;
let moguraSpawn;

// ゲーム開始
function startMoguraGame(){
    moguraScore = 0;
    moguraTime = 20;

    document.getElementById("moguraScore").innerText = 0;
    document.getElementById("moguraTime").innerText = 20;

    // タイマー
    moguraTimer = setInterval(()=>{
        moguraTime--;
        document.getElementById("moguraTime").innerText = moguraTime;

        if(moguraTime <= 0){
            endMoguraGame();
        }
    },1000);

    // 出現
    moguraSpawn = setInterval(spawnMogura, 500);
}

// モグラ出現
function spawnMogura(){
    for(let i=0;i<2;i++){

        const img = document.createElement("img");
        img.src = "MoguraSITM.png";
        img.style.position = "absolute";
        img.style.width = "60px";

        img.style.top = Math.random()*80 + "%";
        img.style.left = Math.random()*80 + "%";

        // 叩いた
        img.onclick = ()=>{
            moguraScore++;
            document.getElementById("moguraScore").innerText = moguraScore;
            img.remove();
        };

        document.getElementById("moguraGame").appendChild(img);

        // 0.5秒で消える
        setTimeout(()=>{
            img.remove();
        },500);
    }
}

// 終了
function endMoguraGame(){
    clearInterval(moguraTimer);
    clearInterval(moguraSpawn);

    document.getElementById("moguraResultText").innerText =
        "スコア: " + moguraScore;

    showScreen("moguraResult");

    // 残ってるモグラ消す
    document.querySelectorAll("#moguraGame img").forEach(e=>e.remove());
}

// 再挑戦
function restartMogura(){
    showScreen("moguraGame");
    startMoguraGame();
}
