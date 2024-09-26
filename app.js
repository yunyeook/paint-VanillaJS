const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //대분자 아니고 소문자
const lineWidth = document.querySelector('#lineWidth');
const color = document.querySelector('#color');
const modeButton = document.getElementById('mode-button');
const removeAllButton = document.getElementById('removeAll-button');
const eraseButton = document.getElementById('erase-button');

//Prototype이 HTMLCollection이라 forEach메서드 사용못하므로 배열로 만든다
const colorOptions = Array.from(document.getElementsByClassName('color-option'));

//css에서 정한 canvas의 크기를 js파일에게도 알려줘야한다.
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

//========================= 그리기 =========================//
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return; //반환해야 움직이는 순간순간마다 그려지니까!!
  }
  ctx.beginPath(); // 선 두께를 바꾸면 그전에 그린 것도 바뀌니까 그릴때마다 경로를 바꿔줘야함!!
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMoveDown() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', onMoveDown);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);

//========================= 선 두께 바꾸기 =========================//

function lineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
lineWidth.addEventListener('change', lineWidthChange);

//========================= 색상바꾸기 =========================//
function colorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
color.addEventListener('change', colorChange);

function colorClick(event) {
  // console.dir(event.target);
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;

  color.value = event.target.dataset.color; //클릭한 컬러가 무엇인지 알기위해 input color의 색을 바꿔주기
}
colorOptions.forEach(color => color.addEventListener('click', colorClick));

//========================= 배경채우기 =========================//
function modeChange() {
  if (isFilling) {
    isFilling = false;
    modeButton.innerText = 'Fill';
  } else {
    isFilling = true;
    modeButton.innerText = 'Draw';
  }
}
function fillBackground() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
modeButton.addEventListener('click', modeChange);
canvas.addEventListener('click', fillBackground);

//========================= 지우기 =========================//
function removeAll() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function erase() {
  // 하얀색으로 그리는 것과 같음.
  isFilling = false;
  modeButton.innerText = 'Fill';
  ctx.strokeStyle = 'white';
}
removeAllButton.addEventListener('click', removeAll);
eraseButton.addEventListener('click', erase);
