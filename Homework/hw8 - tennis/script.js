let ballElem = document.getElementById('ball');
let sratnBtn = document.getElementById('start');

const FIELD = {
	element: document.getElementsByClassName('field')[0],
	width: 600,
	height: 400
}

let ball = {
	element: document.getElementById('ball'),
	diameter: 50,
	speedX: 5,
	speedY: 1,
	accelY : .5,
	accelX : 2,
	posX: FIELD.width / 2 - 25,
	posY: FIELD.height / 2 - 25,

	y0: function() {return this.element.offsetTop},
	y1: function() {return this.element.offsetTop + this.diameter},
	x: function() {return this.element.offsetLeft},
	update: function() {		
		this.element.style.left = Math.round(this.posX) + 'px';
		this.element.style.top = Math.round(this.posY) + 'px';
	}
}

let racket = {
	left: document.getElementById('racket1'),
	right: document.getElementById('racket2'),
	speed: 10,
	leftScore: 0,
	rightScore: 0,
	left_X: 20,
	right_X: 580 - ball.diameter,
	left_Y0: function() {return this.left.offsetTop},
	left_Y1: function() {return this.left.offsetTop + 100},
	right_Y0: function() {return this.right.offsetTop},
	right_Y1: function() {return this.right.offsetTop + 100},
}


function init(elem, w, h) {
	elem.style.width = w + 'px';
	elem.style.height = h + 'px';
}

function keyPressHandler(e) {
	let {left: leftRacket, right: rightRacket, speed} = racket;
	let left_Y = racket.left_Y0();
	let right_Y = racket.right_Y0();

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


function isBallTouchRacket(racket_x, racket_y0, racket_y1) {
	// the ball entered into racket zone, need to push it away
	if( ball.y1() >= racket_y0 && ball.y0() <= racket_y1 && ball.x() == racket_x ) {
		console.log('попал в ракетку')
		countScore(racket_x);
		return true;
	} else {
		return false;
	}
}


function tick() {
	ball.posX += ball.speedX;
	//ball.speedY += ball.accelY;
	ball.posY += ball.speedY;

	//the ball has gone beyond the field ?
	//right borders
	let isRightRacketTouch = isBallTouchRacket(racket.right_X, racket.right_Y0(), racket.right_Y1() );
	if( ball.posX + ball.diameter > FIELD.width || isRightRacketTouch ) {
		// set reverse speed
		ball.speedX = -ball.speedX;
		//move to reverse side
		isRightRacketTouch ? ball.posX = FIELD.width - ball.diameter - 21 : ball.posX = FIELD.width - ball.diameter;
	}
	//left borders
	let isLeftRacketTouch = isBallTouchRacket(racket.left_X, racket.left_Y0(), racket.left_Y1() );
	if( ball.posX < 0 || isLeftRacketTouch) {
		ball.speedX = -ball.speedX;
		isLeftRacketTouch ? ball.posX = 21 : ball.posX = 0;
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

	ball.update();
	requestAnimationFrame(tick);
}


function countScore(racketPos) {
	racketPos === 20 ? racket.rightScore +=1 : racket.leftScore +=1;
	console.log(`green ${racket.leftScore} : ${racket.rightScore } blue`)
}


function startGame() {
	// плавное движение - от 25 кадр/сек, 1000мс/25к=40мс
	//setInterval(tick, 25)

	// надо замкнуть isPlaying и timer
	let isPlaying = false;
	var timer;

	function setTimer(isPl, _timer) {
		if(!isPl) {
			isPl = true;
			_timer = requestAnimationFrame(tick);
		} else {
			cancelAnimationFrame(_timer);
		}
	}

	setTimer(isPlaying, timer)
}


init(FIELD.element, FIELD.width, FIELD.height);

window.addEventListener('keydown', keyPressHandler );

ball.update();

sratnBtn.addEventListener('click', startGame);