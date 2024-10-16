let gameseq = [];
let userseq = [];
let btns = ['r','g','y','p'];
let highscore=0;
let started = false;
let level = 0;
let h2 = document.getElementById("result");
let h2forhighscore=document.getElementById("highscore");
const buttons = document.querySelectorAll('.btn');

document.getElementById('start').addEventListener("click",function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelup();
        document.getElementById('start').style.visibility="hidden";
    }
});
function gameflash(btn) {
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    }, 900);
}
function userflash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },200);
}
function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let random = Math.floor(Math.random() * 4)
    let color = btns[random];
    let randbtn = document.querySelector(`.${color}`);
    gameseq.push(color);
    console.log(gameseq);
    gameflash(randbtn);
}
function checkAns(idx){
    if(userseq[idx] === gameseq[idx]){
        let btn = document.querySelector(`.${userseq[idx]}`);
        btn.classList.add('correct');
        setTimeout(() => {
            btn.classList.remove('correct');
        }, 200);
        if(userseq.length == gameseq.length){
            setTimeout(levelup,750);
        }
    }
    else{
        let btn = document.querySelector(`.${userseq[idx]}`);
        btn.classList.add('incorrect');
        setTimeout(() => {
            btn.classList.remove('incorrect');
        }, 200);
       if(level>highscore){
           highscore=level;
           if (level==1){
            highscore=0;
           }
       }
       h2forhighscore.innerHTML=`Highest Score is ${highscore}`
       h2.innerHTML = `Game Over! Your Score was <b>${highscore}</b> <br> Press restart to start again.`;
       document.querySelector("body").style.background = "red";
       setTimeout(function(){
        document.querySelector("body").style.background = "white";
       },250);
       document.getElementById('start').style.visibility="visible";
       document.getElementById('start').textContent="Restart";
       reset();
    }
}
function reset(){
    started = false;
    level = 0;
    gameseq = [];
    userseq = [];
}
function btnpress(){
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}
let allbtns = document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click',btnpress);
}