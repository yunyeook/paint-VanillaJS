const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //대분자 아니고 소문자

//css에서 정한 canvas의 크기를 js파일에게도 알려줘야한다.
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;
let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    // console.log(event.offsetX, event.offsetY);
    return; //반환해야 움직이는 순간순간마다 그려지니까!!
  }
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

// canvas.addEventListener('click', onClick);
// function onClick(event) {
//   console.log(event.offsetX, event.offsetY);
// }
