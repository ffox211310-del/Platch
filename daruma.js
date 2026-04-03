let steps = 50;
let isLooking = false;
let darumaTimer;

// クリック処理（←これを分離するのが超重要）
function handleDarumaClick(){
    const screen = document.getElementById("darumaGame");

    if(!screen || screen.style.display !== "flex") return;

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

    // ←これ追加（毎回登録）
    document.addEventListener("click", handleDarumaClick);

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

    // ←これ超重要（イベント削除）
    document.removeEventListener("click", handleDarumaClick);

    let text = clear ? "やるじゃないか" : "どんまい";

    document.getElementById("darumaText").innerText = text;

    showScreen("darumaResult");
}
