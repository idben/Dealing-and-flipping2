const body = document.querySelector("body");
const tipDiv = document.querySelector(".game .tip");
let canClick = true;
let canSelect = false;
let finished = false;
let pickAry = [];

body.addEventListener("click", async ()=>{
  console.log(canClick, finished)
  if(canClick === false){
    return false;
  }
  if(finished === true){
    reset();
    return false;
  }
  tipDiv.innerHTML = "Shuffling";
  let cardNum = getRandomNumbers(1, 10, 10);
  for(let i=0;i<cardNum.length;i++){
    document.querySelector(`.card${cardNum[i]} .back`).innerHTML = "";
    document.querySelector(`.card${cardNum[i]} .back`).setAttribute("text",`Back!${i+1}`);
    let ran = Math.round(Math.random()*2);
    console.log(ran)
    if(ran === 0){
      document.querySelector(`.card${cardNum[i]} .back`).classList.add("reversed");
    }
  }
  canClick = false;
  for(let i=1;i<=10;i++){
    document.querySelector(`.card${i}`).classList.add(`card${i}Active`)
  }
  tipDiv.innerHTML = "pick up the 1st card";
  canSelect = true;
})

for(let i=1;i<=10;i++){
  document.querySelector(`.card${i}`).addEventListener("click", (e)=>{
    if(canSelect){
      canSelect = false;
      pickAry.push(i)
      playSelection()
    }
  });
}

async function reset(){
  tipDiv.innerHTML = "";
  canClick = false;
  for(let i=pickAry.length-1;i>=0;i--){
    document.querySelector(`.card${pickAry[i]} .content`).classList.remove("active");
    await waittings(300);
    document.querySelector(`.card${pickAry[i]}`).classList.remove(`forward${i+1}2`);
    await waittings(300);
    document.querySelector(`.card${pickAry[i]}`).classList.remove(`forward${i+1}`);
    document.querySelector(`.card${pickAry[i]}`).classList.add(`card${pickAry[i]}Active`);
    await waittings(300);
  }

  await waittings(500);
  for(let i=1;i<=10;i++){
    document.querySelector(`.card${i}`).classList.remove(`card${i}Active`);
    document.querySelector(`.card${i} .back`).classList.remove("reversed");
  }
  await waittings(1000);
  tipDiv.innerHTML = "click and start";
  canClick = true;
  canSelect = false;
  finished = false;
  pickAry = [];
}


async function playSelection(){
  let pickNum = pickAry.length - 1;
  document.querySelector(`.card${pickAry[pickNum]}`).classList.remove(`card${pickAry[pickNum]}pickup`);
  document.querySelector(`.card${pickAry[pickNum]}`).classList.remove(`card${pickAry[pickNum]}Active`);
  document.querySelector(`.card${pickAry[pickNum]}`).classList.add(`forward${pickAry.length}`);
  await waittings(300);
  document.querySelector(`.card${pickAry[pickNum]}`).classList.add(`forward${pickAry.length}2`);
  await waittings(300);
  document.querySelector(`.card${pickAry[pickNum]} .content`).classList.add("active");
  await waittings(1000);
  if(pickAry.length < 3){
    if(pickAry.length === 1){
      tipDiv.innerHTML = "pick up the 2nd card";
    }else if(pickAry.length === 2){
      tipDiv.innerHTML = "pick up the 3rd card";
    }
    canSelect = true;
  }else{
    tipDiv.innerHTML = "click and restart";
    canClick = true;
    finished = true;
  }
}

function waittings(time){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve();
    }, time);
  });
}

function getRandomNumbers(start, end, count) {
  const numbers = Array.from({ length: end - start + 1 }, (v, i) => i + start);
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    result.push(numbers[randomIndex]);
    numbers.splice(randomIndex, 1);
  }
  return result;
}