// model
function ClockModel() {
	let self = this;
	self.ms = new Date().getTime(); // from 1970
	self.msPerHour = 3600000;
	self.msPerMinute = 60000;
	self.msPerSecond = 1000;

	let viewInstance = null;
	let timerId =  null;
	let gmt = null;

	self.init = function(view, gmt) {
		viewInstance = view;
		gmt = gmt;
	}

	self.updateView = function() {
		if(viewInstance) {
			viewInstance.update(self.convertMS(gmt));
		}
	}

	self.convertMS = function(gmt) {
		
		console.log( new Date().getUTCHours() + ':' + new Date().getUTCMinutes());
		let now = new Date();
		let utcNow = new Date(now.getUTCFullYear(),  now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds())
		let msUTC = utcNow.getTime();
		console.log('UTC: ' + utcNow) // correct UTC time but wrong timezone!
		console.log('UTC (in ms): ' + utcNow.getTime())

		let msGTM2 = msUTC + (self.msPerHour * 2);
		console.log(`${0}:${msGTM2.getMinutes}:${msGTM2 / 1000}`)

		console.log(`${utcNow.getHours()}:${utcNow.getMinutes()}:${utcNow.getSeconds()}`)
		

		return {
			hours: utcNow.getHours() + gmt,
			minutes: utcNow.getMinutes(),
			seconds: utcNow.getSeconds()
		}
		
	}

	self.getTime = function() {
		self.ms = new Date().getTime();
		self.updateView()
	}

	self.start = function() {
		timerId = setInterval(self.getTime, 1000);
	}
	self.stop = function() {
		clearInterval(timerId);
	}
}



////////// view
function ClockView() {
	let modelInstance = null;
	let clockContainer = null;
	let timeDiv = null;

	this.init = function(model, container) {
		modelInstance = model;
		clockContainer = container;

		timeDiv = clockContainer.querySelector('.time');
	}

	this.update = function(time) {
		timeDiv.innerHTML = `${time.hours} : ${time.minutes} : ${time.seconds}`;
	}
}




///// controller
function ClockController() {
	let modelInstance = null;
	let clockContainer = null;
	let timeDiv = null;

	this.init = function(model, container) {
		modelInstance = model;
		clockContainer = container;

		timeDiv = clockContainer.querySelector('.time');
		let btnStart = clockContainer.querySelector('.startBtn');
		let btnStop = clockContainer.querySelector('.stopBtn');

		btnStart.addEventListener('click', this.start);
		btnStop.addEventListener('click', this.stop);
	}

	this.start = function() {
		modelInstance.start()
	}
	this.stop = function() {
		modelInstance.stop()
	}
}

// setup and initialisation
// create components
let model1 = new ClockModel();
let view1 = new ClockView();
let controller1 = new ClockController();

//point the component at each other and DOM elemtnt
let containerClock1 = document.getElementById('clock1');

let time = [
	{sity: 'Minsk',	gmt: 3},
	{sity: 'London', gmt: 0}
]

model1.init(view1, time[0].gmt);
view1.init(model1, containerClock1);
controller1.init(model1, containerClock1);

//init the first Model in View displaying
model1.updateView();