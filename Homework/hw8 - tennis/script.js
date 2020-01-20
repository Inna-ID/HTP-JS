let sratnBtn = document.getElementById('start');
let isPlaying = false;

const FIELD = {
	element: document.getElementsByClassName('field')[0],
	width: 600,
	height: 400,
	centerX: 300,
	centerY: 200
}

let ball = {
	element: document.getElementById('ball'),
	diameter: 50,
	speedX: 4,
	speedY: 1,
	posX: FIELD.centerX,
	posY: FIELD.centerY,

	x0: function() {return this.element.offsetLeft},
	x1: function() {return this.element.offsetLeft + this.diameter},
	y0: function() {return this.element.offsetTop},
	y1: function() {return this.element.offsetTop + this.diameter},
	updatePos: function(x, y) {
		this.posX = x;
		this.posY = y;
		this.element.style.left = Math.round(this.posX) + 'px';
		this.element.style.top = Math.round(this.posY) + 'px';
	}
}


let leftRacket = {
	elem: document.getElementById('racket1'),
	width: 20,
	speed: 10,
	score: 0,
	x: 20,
	y0: function() {return this.elem.offsetTop},
	y1: function() {return this.elem.offsetTop + 100},
}

let rightRacket = {
	elem: document.getElementById('racket2'),
	width: 20,
	speed: 10,
	score: 0,
	x: 580,
	y0: function() {return this.elem.offsetTop},
	y1: function() {return this.elem.offsetTop + 100},
}


function keyPressHandler(e) {
	//to top shift 16 (w=87)
	if(e.keyCode === 87 && leftRacket.y0() >= leftRacket.speed) {
		leftRacket.elem.style.top = `${leftRacket.y0() - leftRacket.speed}px`;
	}
	// to bottom ctrl 17 (s=83)
	if(e.keyCode === 83 && FIELD.height - leftRacket.y1() >= leftRacket.speed) {
		leftRacket.elem.style.top = `${leftRacket.y0() + leftRacket.speed}px`;
	}
	// to top arrow
	if(e.keyCode === 38 && rightRacket.y0() >= rightRacket.speed) {
		rightRacket.elem.style.top = `${rightRacket.y0() - rightRacket.speed}px`;
	}
	// to bottom arrow
	if(e.keyCode === 40 && FIELD.height - rightRacket.y1() >= rightRacket.speed) {
		rightRacket.elem.style.top = `${rightRacket.y0() + rightRacket.speed}px`;
	}
}


function isBallTouchRacket(racket_x, racket_y0, racket_y1) {
	// the ball in any racket zone
	if(ball.y0() <= racket_y1 && ball.y1() >= racket_y0) {
		//is it left racket or is it right
		if( (racket_x == 20 && ball.x0() <= racket_x) || (racket_x != 20 && ball.x1() >= racket_x) ) {
			return true;
		}
	}
	else {
		return false;
	}
}


function tick() {
	ball.posX += ball.speedX;
	ball.posY += ball.speedY;

	//the ball has gone beyond the field ?
	//left borders
	let isBallTouchLR = isBallTouchRacket(leftRacket.x, leftRacket.y0(), leftRacket.y1() );
	if(isBallTouchLR) {
		beatOffBallOnRacketTouch(leftRacket.width +1);
	} else if(ball.x0() <= 0) {
		ball.posX = 0;		
		//зачислить гол правой ракетке
		countScore(false);
		stopGame();
	}
	
	//right borders
	let isBallTouchRR = isBallTouchRacket(rightRacket.x, rightRacket.y0(), rightRacket.y1() );
	if(isBallTouchRR) {
		beatOffBallOnRacketTouch(FIELD.width - ball.diameter - rightRacket.width -1);
	} else if(ball.x1() >= FIELD.width) {
		ball.posX = FIELD.width - ball.diameter;
		//зачислить гол правой ракетке
		countScore(true);
		stopGame();
	}

	//bottom borders
	if(ball.posY + ball.diameter > FIELD.height) {
		beatOffBallOnTopBottom(FIELD.height - ball.diameter);
	}
	//top borders
	if(ball.posY < 0) {
		beatOffBallOnTopBottom(0);
	}

	ball.updatePos(ball.posX, ball.posY);
	if(isPlaying) {
		requestAnimationFrame(tick);
	}
}


function beatOffBallOnRacketTouch(posX) {
	ball.speedX = -ball.speedX;
	ball.posX = posX;
}

function beatOffBallOnTopBottom(posY) {
	ball.speedY = -ball.speedY;
	ball.posY = posY;
}


function countScore(isLeftRacketScoreGoal) {
	// if the isLeftRacket == false (it is rigth racket) don't beat off the ball goal will be credited to the left racket
	isLeftRacketScoreGoal ? leftRacket.score +=1 : rightRacket.score +=1;
	console.log(`green ${leftRacket.score} : ${rightRacket.score} blue`);
	document.getElementsByClassName('score')[0].innerText = `${leftRacket.score}:${rightRacket.score}`;
}


function random( min,  max ) {
	return Math.floor(Math.random()*(max - min + 1) + min);
}

function startGame() {
	// плавное движение - от 25 кадр/сек, 1000мс/25к=40мс
	//setInterval(tick, 25)

    ball.updatePos(FIELD.centerX-25, FIELD.centerY-25);

	random(-1, 0) < 0 ? ball.speedX = -ball.speedX : ball.speedX;
	random(-1, 0) < 0 ? ball.speedY = -ball.speedY : ball.speedY;

	if(!isPlaying) {
		isPlaying = true;
		requestAnimationFrame(tick);
	} 
	else {
		isPlaying = false;
	}
}

function stopGame() {
	isPlaying = false;
}

function initGame() {
	FIELD.element.style.width = FIELD.width + 'px';
	FIELD.element.style.height = FIELD.height + 'px';

	ball.updatePos(FIELD.centerX-25, FIELD.centerY-25);
}


initGame();
window.addEventListener('keydown', keyPressHandler );
sratnBtn.addEventListener('click', startGame);