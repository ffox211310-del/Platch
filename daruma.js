let steps = 50;
let isLooking = false;
let darumaTimer = null;
let lookTimeout = null;

// ===== 開始 =====
function startDarumaGame(){
    console.log("だるま開始");

    steps = 50;
    isLooking = false;

    const screen = document.getElementById("darumaGame");

    // 初期表示
    document.getElementById("steps").innerText = steps;
    document.getElementById("sitom").src = "Haigo.png";
    document.getElementById("statusText").innerText = "シトムくんが...";

    // イベント初期化（重要）
    screen.onclick = handleDarumaClick;
    screen.ontouchstart = handleDarumaClick;

    // タイマー初期化
    clearTimeout(darumaTimer);
    clearTimeout(lookTimeout);

    nextTurn();
}

// ===== タップ処理 =====
function handleDarumaClick(){
    const screen = document.getElementById("darumaGame");
    if(screen.style.display === "none") return;

    console.log("タップ");

    if(isLooking){
        endDaruma(false);
        return;
    }

    steps--;
    document.getElementById("steps").innerText = steps;

    if(steps <= 0){
        endDaruma(true);
    }
}

// ===== 次のターン =====
function nextTurn(){
    clearTimeout(darumaTimer);

    const time = Math.random() * 2000 + 1000;

    darumaTimer = setTimeout(lookPlayer, time);
}

// ===== 振り向く =====
function lookPlayer(){
    isLooking = true;

    document.getElementById("sitom").src = "SITMPlus.png";
    document.getElementById("statusText").innerText = "見てるぞ！！";

    lookTimeout = setTimeout(()=>{
        isLooking = false;

        document.getElementById("sitom").src = "Haigo.png";
        document.getElementById("statusText").innerText = "シトムくんが...";

        nextTurn();
    }, 800);
}

// ===== 終了 =====
function endDaruma(clear){
    console.log("終了");

    clearTimeout(darumaTimer);
    clearTimeout(lookTimeout);

    const screen = document.getElementById("darumaGame");

    // イベント削除
    screen.onclick = null;
    screen.ontouchstart = null;

    const text = clear ? "やるじゃないか" : "どんまい";
    document.getElementById("darumaText").innerText = text;

    showScreen("darumaResult");
}

// ===== HOME戻る =====
function goHome(){
    // 念のため全部止める
    clearTimeout(darumaTimer);
    clearTimeout(lookTimeout);

    const screen = document.getElementById("darumaGame");
    screen.onclick = null;
    screen.ontouchstart = null;

    showScreen("home");
}
