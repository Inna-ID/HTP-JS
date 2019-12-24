var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');

var Xc = canvas.width/2,
	Yc = canvas.height/2,
	R = canvas.width/4-4,
	alpha = 0;


function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function getTime() {
	var date = new Date();
	return {
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds()
	}
}


function drawDial() {
	ctx.beginPath();
	ctx.strokeStyle = '#4D0D00';
	ctx.fillStyle = 'antiquewhite';	
	ctx.arc(Xc, Yc, R, 0, Math.PI * 2, false);
	ctx.stroke();
	ctx.fill();
}

function drawSerifs() {
	var x, y, x1, y1;

	for(var i = 0; i < 12; i++) {
		alpha -=30;

		x = R * Math.sin(toRadians(alpha)) + Xc;
		y = R * Math.cos(toRadians(alpha)) + Yc;

		x1 = (R-6) * Math.sin(toRadians(alpha)) + Xc;
		y1 = (R-6) * Math.cos(toRadians(alpha)) + Yc;

		ctx.beginPath();
		ctx.strokeStyle = '#4D2600';
		ctx.moveTo(x, y);
		ctx.lineTo(x1, y1);
		ctx.stroke();
	}
}

function drawArrows() {
	
	var arrows = [
		arrowHour = {
			length: R - 20,
			lineWidth: 6,
			alpha: (-getTime().hour * 30) - 180
		},
		arrowMinute = {
			length: R - 15,
			lineWidth: 4,
			alpha: (-getTime().minute * 6) - 180
		},
		arrowSecond = {
			length: R - 8,
			lineWidth: 2,
			alpha: (-getTime().second * 6) -180
		}
	]

	for(var i = 0; i < arrows.length; i++) {
		let x = arrows[i].length * Math.sin(toRadians(arrows[i].alpha)) + Xc;
		let y = arrows[i].length * Math.cos(toRadians(arrows[i].alpha)) + Yc;

		ctx.beginPath();
		ctx.lineWidth = arrows[i].lineWidth;
		ctx.strokeStyle = '#4D0D00';
		ctx.moveTo(Xc, Yc);
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

// call functions
setInterval(function() {
ctx.clearRect(0,0, canvas.width, canvas.height);
	drawDial();
	drawSerifs();
	drawArrows();
}, 1000)


// задание нечетной толчины линии - делает линию размытой.
// как улучшить качество изображения
// при изменении ширины/высоты канваса, изображение в нем 
// не масштабируется, а деформируется. сделать скрин