function getTime() {
	var date = new Date(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds();

	writeTime(hour, minute, second);
}

function writeTime(h, m, s) {
	var container = document.getElementById('clock');
	var h = h < 10 ? `0${h}` : h;
	var m = m < 10 ? `0${m}` : m;
	var s = s < 10 ? `0${s}` : s;

	container.innerHTML = `${h}:${m}:${s}`;
}

setInterval(getTime, 1000);
//// find time end


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