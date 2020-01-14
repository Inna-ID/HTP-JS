let field = document.getElementsByClassName('field')[0];
let ballElem = document.getElementById('ball');
let sratnBtn = document.getElementById('start');

const FIELD = {
	width: 600,
	height: 400
}

let ball = {	
	diameter: 50,
	speedX: 5,
	speedY: 1,
	accelY : .5,
	accelX : 2,
	posX: FIELD.width / 2 - 25,
	posY: FIELD.height / 2 - 25,

	update: function() {		
		ballElem.style.left = Math.round(this.posX) + 'px';
		ballElem.style.top = Math.round(this.posY) + 'px';
	}
}

function init(elem, w, h) {
	elem.style.width = w + 'px';
	elem.style.height = h + 'px';
}

init(field, FIELD.width, FIELD.height);

function start() {
	// плавное движение - от 25 кадр/сек, 1000мс/25к=40мс
	//setInterval(tick, 25)
    requestAnimationFrame(tick);
}

function tick() {
	ball.posX += ball.speedX;
	//ball.speedY += ball.accelY;
	ball.posY += ball.speedY;
	//the ball has gone beyond the field ?
	//right borders
	if(ball.posX + ball.diameter > FIELD.width) {
		// set reverse speed
		ball.speedX = -ball.speedX;
		//move to reverse side
		ball.posX = FIELD.width - ball.diameter;
	}
	//left borders
	if(ball.posX < 0) {
		ball.speedX = -ball.speedX;
		ball.posX = 0;
	}

	//bottom borders
	if(ball.posY + ball.diameter > FIELD.height) {
		ball.speedY = -ball.speedY;
		ball.posY = FIELD.height - ball.diameter;
	}
	//top borders
	if(ball.posY < 0) {
		ball.speedY = -ball.speedY;
		ball.posY = 0;
	}

	//ускорение
	// var underFloor = ball.posY + ball.diameter - FIELD.height;
 //    if(underFloor>0) {
 //        ball.speedY = -ball.speedY;
 //        ball.posY -= underFloor*2; // корректируем позицию
 //    }

	// if(accel) {
	// 	console.log('ускорился');
	// 	ball.speedX += ball.accelX;
	// }

	// if(!(ball.posX > 100)) {
	// 	console.log('замедляемся');
	// 	ball.speedX += ball.accelX - 0.5;
	// }

	ball.update();
	requestAnimationFrame(tick);
}

ball.update();

sratnBtn.onclick = start;


let racket = {
	left: document.getElementById('racket1'),
	right: document.getElementById('racket2'),
	left_Y: function() {return this.left.offsetTop},
	right_Y: document.getElementById('racket2').offsetTop,
	speed: 10
}



function keyPressHandler(e) {
	let {left: leftRacket, right: rightRacket, left_Y, right_Y, speed} = racket;
	// let leftRacket = document.getElementById('racket1');
	// let rightRacket = document.getElementById('racket2');
	// let leftTopVal = racket.left.offsetTop;
	// let rightTopVal = racket.right.offsetTop;
	//let speed = 10;


	//racket.left_Y()
	console.log(left_Y);
	console.log(left_Y());
	//to top shift
	if(e.keyCode === 16 && left_Y() >= speed) {
		console.log('shift');
		leftRacket.style.top = `${left_Y() - speed}px`;
	}
	// to bottom ctrl
	if(e.keyCode === 17 && left_Y() <= 300 - speed) {
		console.log('ctrl');
		leftRacket.style.top = `${left_Y() + speed}px`;
	}
	// to top arrow
	if(e.keyCode === 38 && right_Y >= speed) {
		rightRacket.style.top = `${right_Y - speed}px`;
	}
	// to bottom arrow
	if(e.keyCode === 40 && right_Y <= 300 - speed) {
		rightRacket.style.top = `${right_Y + speed}px`;
	}
}

document.addEventListener('keydown', keyPressHandler );

function checkRacketBallOverlap() {

}