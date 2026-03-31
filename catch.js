let score = 0;
let timeLeft = 15;
let gameInterval;
let fallInterval;

function openGame(id){
    showScreen(id);

    if(id === "catchGame"){
        startCatchGame();
    }
}

function startCatchGame(){
    score = 0;
    timeLeft = 15;

    document.getElementById("score").innerText = 0;
    document.getElementById("time").innerText = 15;

    // タイマー
    gameInterval = setInterval(()=>{
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if(timeLeft <= 0){
            endCatchGame(false);
        }
    },1000);

    // 落下
    fallInterval = setInterval(createItem, 800);
}

// 落下物
function createItem(){
    const items = ["🥒","🐙","☄️","😏"];
    const item = document.createElement("div");

    item.innerText = items[Math.floor(Math.random()*items.length)];
    item.style.position = "absolute";
    item.style.top = "0px";
    item.style.left = Math.random()*90 + "%";
    item.style.fontSize = "30px";

    document.getElementById("catchGame").appendChild(item);

    let fall = setInterval(()=>{
        let top = parseInt(item.style.top);
        item.style.top = (top + 5) + "px";

        // 当たり判定
        const player = document.getElementById("player");
        const pRect = player.getBoundingClientRect();
        const iRect = item.getBoundingClientRect();

        if(
            iRect.bottom > pRect.top &&
            iRect.left < pRect.right &&
            iRect.right > pRect.left
        ){
            score++;
            document.getElementById("score").innerText = score;
            item.remove();
            clearInterval(fall);

            if(score >= 20){
                endCatchGame(true);
            }
        }

        if(top > window.innerHeight){
            item.remove();
            clearInterval(fall);
        }

    },30);
}

// 終了
function endCatchGame(win){
    clearInterval(gameInterval);
    clearInterval(fallInterval);

    let text = win ? "完遂" : "Oh...";

    document.getElementById("catchGame").innerHTML = `
        <div style="color:#00ff66; font-size:30px;">
            ${text}
        </div>

        <button onclick="restartCatch()">再挑戦</button>
        <button onclick="goHome()">ホームへ</button>
    `;
}

// 再挑戦
function restartCatch(){
    location.reload(); // ←あとで改良可
}


let player = document.getElementById("player");

let startX = 0;

document.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
});

document.addEventListener("touchmove", e=>{
    let moveX = e.touches[0].clientX;

    let diff = moveX - startX;

    let current = player.offsetLeft;

    player.style.left = (current + diff) + "px";

    startX = moveX;
});
