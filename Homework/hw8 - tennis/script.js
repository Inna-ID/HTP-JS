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

let racket = {
	left: document.getElementById('racket1'),
	right: document.getElementById('racket2'),
	speed: 10,
	left_Y: function() {return this.left.offsetTop},
	right_Y: function() {return this.right.offsetTop},
}


function init(elem, w, h) {
	elem.style.width = w + 'px';
	elem.style.height = h + 'px';
}

function keyPressHandler(e) {
	let {left: leftRacket, right: rightRacket, speed} = racket;
	let left_Y = racket.left_Y();
	let right_Y = racket.right_Y();

	//to top shift 16
	if(e.keyCode === 87 && left_Y >= speed) {
		console.log('shift');
		leftRacket.style.top = `${left_Y - speed}px`;
	}
	// to bottom ctrl 17
	if(e.keyCode === 83 && left_Y <= 300 - speed) {
		console.log('ctrl');
		leftRacket.style.top = `${left_Y + speed}px`;
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


function checkRacketBallOverlap() {
	//let left_Y = racket.left_Y();
	let right_Y = racket.right_Y();
	let leftRacket = {
		y0: racket.left_Y(),
		y1: racket.left_Y() + 100,
		x: 20
	}
	let ball = {
		//elem: ballElem,
		y0: ballElem.offsetTop,
		y1: ballElem.offsetTop + 50,
		x: ballElem.offsetLeft
	}


	console.log('racket space from' + leftRacket.y0 + 'to ' + leftRacket.y1);
	console.log('ball space' + ball.y0);
	//если мяч входит в зону ракетки
	if(ball.y0 >= leftRacket.y0 && ball.y1 <= leftRacket.y1 && ball.x == leftRacket.x) {
		console.log('вошел в зону')
	}
}

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
	requestAnimationFrame(checkRacketBallOverlap);
}


init(field, FIELD.width, FIELD.height);

window.addEventListener('keydown', keyPressHandler );

ball.update();

sratnBtn.addEventListener('click', start);
