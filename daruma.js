let steps = 50;
let isLooking = false;
let darumaTimer;

// クリック処理（←これを分離するのが超重要）
function handleDarumaClick(){
   console.log("クリックされた");
    const screen = document.getElementById("darumaGame");

  if(!screen || screen.style.display === "none") return;

    if(isLooking){
        endDaruma(false);
    }else{
        steps--;
        document.getElementById("steps").innerText = steps;

        if(steps <= 0){
            endDaruma(true);
        }
    }
}

// 開始
function startDarumaGame(){
    steps = 50;
    isLooking = false;

    document.getElementById("steps").innerText = steps;
    document.getElementById("sitom").src = "Haigo.png";
    document.getElementById("statusText").innerText = "シトムくんが...";

    // ←ここ修正（安全版）
    setTimeout(() => {
        const screen = document.getElementById("darumaGame");
       screen.addEventListener("touchstart", handleDarumaClick);
    }, 0);

    nextTurn();
}

// ランダム振り向き
function nextTurn(){
    clearTimeout(darumaTimer);

    const time = Math.random() * 2000 + 1000;

    darumaTimer = setTimeout(()=>{
        lookPlayer();
    }, time);
}

// 見る
function lookPlayer(){
    isLooking = true;

    document.getElementById("sitom").src = "SITMPlus.png";
    document.getElementById("statusText").innerText = "見てるぞ！！";

    setTimeout(()=>{
        isLooking = false;
        document.getElementById("sitom").src = "Haigo.png";
        document.getElementById("statusText").innerText = "シトムくんが...";
        nextTurn();
    }, 800);
}

// 終了
function endDaruma(clear){
    clearTimeout(darumaTimer);

    const screen = document.getElementById("darumaGame");
    screen.removeEventListener("click", handleDarumaClick);

    let text = clear ? "やるじゃないか" : "どんまい";

    document.getElementById("darumaText").innerText = text;

    showScreen("darumaResult");
}

function goHome(){
    showScreen("home");
}
