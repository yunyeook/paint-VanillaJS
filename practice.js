const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //대분자 아니고 소문자

//css에서 정한 canvas의 크기를 js파일에게도 알려줘야한다.
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(50, 50, 100, 200); //색이 채워진 직사각형그리기
ctx.strokeRect(200, 50, 100, 200); //선으로 직사각형 그리기

ctx.rect(500, 400, 50, 50);
ctx.stroke(); //-> 윤곽선만 그리기

ctx.beginPath(); //-> 새로운 경로 만들기(해당 메서드가 없으면 같은 경로라서 위의것도 아래의 fill의 영향으로 색이 칠해진다)
ctx.rect(500, 500, 50, 50);
ctx.fillStyle = 'red';
ctx.fill(); //-> 색칠도 하기

ctx.rect(500, 600, 50, 50); //-> fill()메서드 이후에 나온건 색칠이든 윤곽선이든 안됨! 채우려면 ctx.fill() 메서드 다시 호출
ctx.rect(500, 700, 50, 50);

//별만들기
ctx.beginPath();
ctx.moveTo(50, 400); //펜을 설정 위치로 옮기기 => 옮겨진 위치가 현재위치가 됨.
ctx.lineTo(200, 400); // 현재 위치에서 설정 위치까지 선그리기 => 옮겨진 위치가 새로운 현재위치가 됨.
ctx.lineTo(75, 500);
ctx.lineTo(125, 350);
ctx.lineTo(175, 500);
ctx.lineTo(50, 400);
ctx.stroke();
ctx.fillStyle = 'yellow';
ctx.fill(); //하위경로의 시작지점(moveTo) 부터 마지막 지점(마지막lineTo)까지 가상으로 연결되어 색칠됨!!

//사람 만들기
ctx.beginPath();
ctx.fillStyle = 'bisque';
ctx.fillRect(500, 150, 15, 100);
ctx.fillRect(600, 150, 15, 100);
ctx.fillRect(530, 150, 55, 180);
//arc(x, y, 반지름, 시작각도, 종료각도, 그리는방향) : 그리는방향 시계방향false가 기본값
// ctx.arc(557.5, 90, 50, 0, 0.5 * Math.PI, true);
ctx.arc(557.5, 90, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = 'black';
ctx.arc(540, 75, 10, Math.PI, 2 * Math.PI);
ctx.arc(575, 75, 10, Math.PI, 2 * Math.PI);
ctx.fill();
