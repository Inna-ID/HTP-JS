// model
function ClockModel() {
	let self = this;
	this.msUTC = null; //ms from 1970
	this.msGTM = null; // gtm in ms (example -5 = )
	self.msPerHour = 3600000;
	self.msPerMinute = 60000;
	self.msPerSecond = 1000;
	this.time = {};
	let viewInstance = null;
	let timerId =  null;
	let msGTM = null;

	self.init = function(view, gmt=0) {
		viewInstance = view;
		this.msGTM = gmt * this.msPerHour;
	}

	this.setUTCms = function() {
		this.msUTC = new Date().getTime() + (new Date().getTimezoneOffset() * this.msPerMinute);		
	}

	this.msUTCPlusGMTConvertToDate = function() {
		//if(!(this.msUTC || this.msGTM)) {return}
		let gmtDate = new Date(this.msUTC + this.msGTM);
		this.time = {
			hours: gmtDate.getHours(),
			minutes: gmtDate.getMinutes(),
			seconds: gmtDate.getSeconds()
		}
	}

	this.getTime = function() {
		//get utc time in ms
		self.setUTCms();
		// convert utc time in gtm and then to date
		self.msUTCPlusGMTConvertToDate();
		// call update view with
		self.updateView();
	}

	this.updateView = function() {
		if(viewInstance) {
			viewInstance.update(this.time);
		}
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
let cities = [
	{city: 'New York', gmt: -5},
	{city: 'London', gmt: 0},
	{city: 'Berlin', gmt: 1},
	{city: 'Minsk',	gmt: 3},	
	{city: 'Tokio', gmt: 9},
	{city: 'Vladivostok', gmt: 10}
]


function createDomElements() {
	let clockWrap = document.getElementsByClassName('clocks-wrap')[0];

	cities.forEach(function(item, i, arr) {
	let divClock = document.createElement('div');
	divClock.id = `clock${i+1}`;

	let btnStart = document.createElement('button');
	btnStart.className = 'startBtn';
	btnStart.innerHTML = 'Start';

	let btnStop = document.createElement('button');
	btnStop.className = 'stopBtn';
	btnStop.innerHTML = 'Stop';

	let pCityName = document.createElement('p');
	pCityName.className = 'name';
	pCityName.innerHTML = item.city;

	let pTime = document.createElement('p');
	pTime.className = 'time';
		
	
	clockWrap.appendChild(divClock);
	divClock.appendChild(btnStart);
	divClock.appendChild(btnStop);
	divClock.appendChild(pCityName);
	divClock.appendChild(pTime);
	})
}

createDomElements();

// function createInstances() {
// 	cities.forEach(function(item, i, arr) {
// 		let `model${i+1}` = new ClockModel();
// 		let `view${i+1}` = new ClockView();
// 		let `controller${i+1}` = new ClockController();

// 		//point the component at each other and DOM elemtnt
// 		let `containerClock${i+1}` = document.getElementById(`clock${i+1}`);

// 		`model${i+1}`.init(`view${i+1}`, cities[i].gmt);
// 		`view${i+1}`.init(`model${i+1}`, `containerClock${i+1}`);
// 		`controller${i+1}`.init(`model${i+1}`, `containerClock${i+1}`);

// 		`model${i+1}`.getTime();
// 	}
// }
//createInstances();


let model1 = new ClockModel();
let view1 = new ClockView();
let controller1 = new ClockController();

//point the component at each other and DOM elemtnt
let containerClock1 = document.getElementById('clock1');


model1.init(view1, cities[0].gmt);
view1.init(model1, containerClock1);
controller1.init(model1, containerClock1);

//init the first Model in View displaying

model1.getTime();