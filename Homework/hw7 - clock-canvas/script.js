var cvs = document.getElementById('clock').getContext('2d');
var cvsW = cvs.width,
	cvsH = cvs.height,
	Xc = 72,
	Yc = 72,
	R = 70,
	alpha = 0;

var arrow = {
	hour: R - 20,
	minute: R - 15,
	second: R - 8
};


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

	//for smooth movement of arrows
	//current minute or second / 60 * the angle of arrow rotation
	// var hourAdditionalDegree = (minute / 60) * 30;
	// var minuteAdditionalDegree = (second / 60) * 6;

	// rotateArrow(second, arrows.second, 6, 0);
	// rotateArrow(minute, arrows.minute, 6, minuteAdditionalDegree);
	// rotateArrow(hour, arrows.hour, 30, hourAdditionalDegree);
}


function drawDial() {
	cvs.strokeStyle = 'black';
	cvs.fillStyle = 'antiquewhite';
	cvs.beginPath();
	cvs.arc(Xc, Yc, R, 0, Math.PI * 2, false);
	cvs.stroke();
	cvs.fill();
}

function drawSerifs() {
	cvs.clearRect(0,0, cvsW, cvsH);

	var x, y, x1, y1;

	for(var i = 0; i < 12; i++) {
		alpha -=30;

		x = R * Math.sin(toRadians(alpha)) + Xc;
		y = R * Math.cos(toRadians(alpha)) + Yc;

		x1 = (R-6) * Math.sin(toRadians(alpha)) + Xc;
		y1 = (R-6) * Math.cos(toRadians(alpha)) + Yc;

		cvs.beginPath();
		cvs.strokeStyle = '#4D2600';
		cvs.moveTo(x, y);
		cvs.lineTo(x1, y1);
		cvs.stroke();
	}
}

function drawArrow(r, lw) {
	//redrawing
	cvs.clearRect(0,0, cvsW, cvsH);

	// find alpha by time
	var hour = getTime().hour;


	var x = r * Math.sin(toRadians(-30)) + Xc;
	var y = r * Math.cos(toRadians(alpha)) + Yc;

	cvs.beginPath();
	cvs.lineWidth = lw;
	cvs.strokeStyle = '#4D0D00';
	cvs.moveTo(Xc, Yc);
	cvs.lineTo(x, y);
	cvs.stroke();
}

// call functions
drawDial();
drawSerifs();

drawArrow(arrow.hour, 6);
drawArrow(arrow.minute, 4);
drawArrow(arrow.second, 2);


// задание нечетной толчины линии - делает линию размытой.
// как улучшить качество изображения
// при изменении ширины/высоты канваса, изображение в нем 
// не масштабируется, а деформируется. сделать скрин