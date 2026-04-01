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

    moguraTimer = setInterval(()=>{
        moguraTime--;
        document.getElementById("moguraTime").innerText = moguraTime;

        if(moguraTime <= 0){
            endMoguraGame();
        }
    },1000);

    moguraSpawn = setInterval(spawnMogura, 500);
}

function spawnMogura(){
    for(let i=0;i<2;i++){
        const img = document.createElement("img");
        img.src = "MoguraSITM.png";
        img.style.position = "absolute";
        img.style.width = "60px";

        img.style.top = Math.random() * (window.innerHeight - 80) + "px";
        img.style.left = Math.random() * (window.innerWidth - 80) + "px";

        img.onclick = ()=>{
            moguraScore++;
            document.getElementById("moguraScore").innerText = moguraScore;
            img.remove();
        };

        document.getElementById("moguraGame").appendChild(img);

        setTimeout(()=> img.remove(), 500);
    }
}

function endMoguraGame(){
    clearInterval(moguraTimer);
    clearInterval(moguraSpawn);

    document.getElementById("moguraResultText").innerText =
        "スコア: " + moguraScore;

    showScreen("moguraResult");

    document.querySelectorAll("#moguraGame img").forEach(e=>e.remove());
}

function restartMogura(){
    showScreen("moguraGame");
    startMoguraGame();
}
