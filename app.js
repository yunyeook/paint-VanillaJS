const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //대분자 아니고 소문자

//css에서 정한 canvas의 크기를 js파일에게도 알려줘야한다.
canvas.width = 800;
canvas.height = 800;
const colors = ['#F7A3A7', '#F7AD97', '#FAD89E', '#C8D7C4', '#BBCBD2', '#B7B6D6', '#E2BBD8'];

ctx.lineWidth = 2;

// canvas.addEventListener('click', onClick);
canvas.addEventListener('mousemove', onClick);

function onClick(event) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
