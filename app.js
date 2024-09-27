const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //대분자 아니고 소문자
const lineWidth = document.querySelector('#lineWidth');
const color = document.querySelector('#color');
const modeButton = document.getElementById('mode-button');
const removeAllButton = document.getElementById('removeAll-button');
const eraseButton = document.getElementById('erase-button');
const fileInput = document.getElementById('file');
const textInput = document.getElementById('text');
const saveButton = document.getElementById('save-button');

//Prototype이 HTMLCollection이라 forEach메서드 사용못하므로 배열로 만든다
const colorOptions = Array.from(document.getElementsByClassName('color-option'));

//css에서 정한 canvas의 크기를 js파일에게도 알려줘야한다.
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = 'round';
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
  //배경색채우기
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
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
//각 색상마다  이벤트리스너넣기!
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
modeButton.addEventListener('click', modeChange);

// function fillBackground() {
//   if (isFilling) {
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//   }
// }
// canvas.addEventListener('click', fillBackground); ==> 캔버스에 마우스 누르기만해도 배경비뀌게하면되니까 mousedown이벤트발생시 추가함.

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

//========================= 이미지파일 업로드하기 =========================//
function onFileChange(event) {
  const file = event.target.files[0]; // input의 file타입은 multiple이 가능하므로 여러개의 file을 가진 files 배열이다.

  const url = URL.createObjectURL(file); // blob:http://~~  blob부터 주소복사하면 이미지 뜸.

  const image = new Image(); //== html파일안에 <img src=''/>와 같음

  image.src = url; //

  image.onload = function () {
    ctx.drawImage(image, 0, 0, 200, 200);
    fileInput.value = null; //fileInput의 value가 이미지 파일 주소이므로 새 이미지 업로드 위해 null로 설정함.
  };
}
fileInput.addEventListener('change', onFileChange);

//========================= 텍스트 넣기 =========================//
function onDoubleClick(event) {
  const text = textInput.value;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '40px serif';
  ctx.fillText(text, event.offsetX, event.offsetY);
  // ctx.strokeText(text, event.offsetX, event.offsetY);
  ctx.restore();
}
canvas.addEventListener('dblclick', onDoubleClick);

//========================= 캠버스의 그림 저장하기 =========================//
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url; //그림의 url로 설정
  a.download = 'myDrawing.jpg'; //어떻게 저장할지 설정
  a.click(); //다운로드하기
}
saveButton.addEventListener('click', onSaveClick);
