"use strict";

// model
let time = {
	ms: new Date().getTime(),
	msPerSecond: 1000,
	msPerMinute: 6000,
	msPerHour: 3600000,
	// gtm: 3,
	// start: false,
	// stop: true,
	convertMS: function() {
		return {
			hour: Math.floor(this.ms / this.msPerHour),
			minute: Math.floor(this.ms / this.msPerMinute),
			second: Math.floor(this.ms / this.msPerHour)
		}
	},
	updateView: function() {
		let date = this.convertMS();
		pageView.update(date);
	},
	updateTime: function() {
		this.ms = new Date().getTime();
		this.updateView();
	}
}
setInterval(time.updateTime, 1000);


// view
let pageView = {
	update: function(curTime) {
		document.getElementsByClassName('time')[0].innerHTML = `${curTime.hour} : ${curTime.minute} : ${curTime.second}`;
	}
}


// controller
function updateTimeContr() {
	//передавать gtm
	time.updateTime();
}


document.getElementsByClassName('startBtn')[0].addEventListener('click', updateTimeContr)
//document.getElementsByClassName('stopBtn')[0];

time.updateView();