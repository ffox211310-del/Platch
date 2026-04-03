let steps = 50; let isLooking = false; let darumaTimer;
 
// 開始 
function startDarumaGame(){ steps = 50; isLooking = false;
 `document.getElementById("steps").innerText = steps;   document.getElementById("sitom").src = "Haigo.png";   document.getElementById("statusText").innerText = "シトムくんが...";    nextTurn();   ` 
}
 
// タップ処理 
document.addEventListener("click", ()=>{ const screen = document.getElementById("darumaGame");
 `if(!screen || screen.style.display !== "flex") return;    if(isLooking){       endDaruma(false);   }else{       steps--;       document.getElementById("steps").innerText = steps;        if(steps <= 0){           endDaruma(true);       }   }   ` 
});
 
// ランダム振り向き
function nextTurn(){ clearTimeout(darumaTimer);
 `const time = Math.random() * 2000 + 1000;    darumaTimer = setTimeout(()=>{       lookPlayer();   }, time);   ` 
}
 
// 見る
function lookPlayer(){ isLooking = true;
 `document.getElementById("sitom").src = "SITMPlus.png";   document.getElementById("statusText").innerText = "見てるぞ！！";    setTimeout(()=>{       isLooking = false;       document.getElementById("sitom").src = "Haigo.png";       document.getElementById("statusText").innerText = "シトムくんが...";       nextTurn();   }, 800);   ` 
}
 
// 終了 
function endDaruma(clear){ clearTimeout(darumaTimer);
 `let text = clear ? "やるじゃないか" : "どんまい";    document.getElementById("darumaText").innerText = text;    showScreen("darumaResult");   ` 
}
 
