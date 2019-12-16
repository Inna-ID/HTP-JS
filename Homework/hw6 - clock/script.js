var arrows = {
	second: document.getElementsByClassName('sec-arrow')[0],
	minute: document.getElementsByClassName('min-arrow')[0],
	hour: document.getElementsByClassName('hour-arrow')[0]
}

function getTime() {
	var date = new Date(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds();

	writeTime(hour, minute, second);

	//for smooth movement of arrows
	//current minute or second / 60 * the angle of arrow rotation
	var hourAdditionalDegree = (minute / 60) * 30;
	var minuteAdditionalDegree = (second / 60) * 6;

	rotateArrow(second, arrows.second, 6, 0);
	rotateArrow(minute, arrows.minute, 6, minuteAdditionalDegree);
	rotateArrow(hour, arrows.hour, 30, hourAdditionalDegree);
}


function writeTime(h, m, s) {
	var container = document.getElementById('time');
	var h = h < 10 ? `0${h}` : h;
	var m = m < 10 ? `0${m}` : m;
	var s = s < 10 ? `0${s}` : s;

	container.innerHTML = `${h}:${m}:${s}`;
}


function rotateArrow(t, arrow, multiplicity, additionalDegree) {
	arrow.style.transform = `rotate(${t * multiplicity + additionalDegree}deg)`;
}


function drawNums() {
	for(let i = 0; i < 12; i++) {
		var wrap = document.createElement('div'),
			num = document.createElement('div'),
			span = document.createElement('span'),
			container = document.getElementsByClassName('numbers')[0];

		wrap.classList.add('num-wrap');
		wrap.style.transform = `rotate(${(i * 30) + 30}deg)`;

		num.classList.add('num-round');
		num.setAttribute('id', 'num-' + i);

		span.innerHTML = i+1;
		span.style.transform = `rotate(-${(i * 30) + 30}deg)`;
		
		num.appendChild(span);
		wrap.appendChild(num);		
		container.appendChild(wrap);
	}
}

drawNums();
getTime();
setInterval(getTime, 1000);