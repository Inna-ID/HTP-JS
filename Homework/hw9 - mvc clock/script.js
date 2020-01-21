// model
let time = {
	ms: new Date().getTime(),
	msPerHour: 3600000,
	msPerMinute: 6000,
	msPerSecond: 1000,
	// gtm: 3,
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


function ClockModel() {
	this.ms = new Date().getTime();
	this.msPerHour = 3600000;
	this.msPerMinute = 6000;
	this.msPerSecond = 1000;

	let viewInstance = null;

	this.init = function(view) {
		viewInstance = view;
	}

	this.updateView = function() {
		if(viewInstance) {
			viewInstance.update();
		}
	}

	this.getTime() {
		this.ms = new Date().getTime();
		this.updateView()
	}
}



////////// view
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