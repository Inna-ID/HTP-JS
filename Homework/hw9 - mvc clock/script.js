const CITIES = [
	{name: 'New York', gmt: -5},
	{name: 'London', gmt: 0},
	{name: 'Berlin', gmt: 1},
	{name: 'Minsk',	gmt: 3},
	{name: 'Tokio', gmt: 9},
	{name: 'Vladivostok', gmt: 10}
]

function isNullOrUndefined(val) {
	return val === undefined || val == null
}

// model
function ClockModel() {
	let self = this;
	this.msUTC = null; //ms from 1970
	this.msGTM = null; // gtm in ms (example -5 = )
	this.msPerHour = 3600000;
	this.msPerMinute = 60000;
	this.msPerSecond = 1000;
	this.time = {};
	this.city = null;
	let viewInstance = null;
	let timerId =  null;
	let msGTM = null;

	this.init = function(view, city) {
		viewInstance = view;
		this.city = city;
		this.msGTM = this.city.gmt * this.msPerHour;
	}

	this.setUTCms = function() {
		this.msUTC = new Date().getTime() + (new Date().getTimezoneOffset() * this.msPerMinute);		
	}

	this.setZero = function(num) {
		return (num < 10 ? `0${num}` : num);
	}

	this.msUTCPlusGMTConvertToDate = function() {
		if(!isNullOrUndefined(this.msUTC) && !isNullOrUndefined(this.msGTM)) {
			let gmtDate = new Date(this.msUTC + this.msGTM);
			this.time = {
				hours: self.setZero(gmtDate.getHours()),
				minutes: self.setZero(gmtDate.getMinutes()),
				seconds: self.setZero(gmtDate.getSeconds())
			}
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

	this.start = function() {
		self.getTime()
		timerId = setInterval(self.getTime, 1000);
	}

	this.stop = function() {
		clearInterval(timerId);
	}
}



////////// view
function ClockView() {
	this.modelInstance = null;
	this.clockContainer = null;
	this.timeDiv = null;

	this.init = function(model) {
		this.clockContainer = this.createClockContainer(model.city);
		this.modelInstance = model;
		this.timeDiv = this.clockContainer.querySelector('.time');
	}

	this.createClockContainer = function(city) {
		let clockWrap = document.getElementsByClassName('clocks-wrap')[0];
		let divClock = document.createElement('div');
		divClock.className = 'clock';

		let btnStart = document.createElement('button');
		btnStart.className = 'startBtn';
		btnStart.innerHTML = 'Start';

		let btnStop = document.createElement('button');
		btnStop.className = 'stopBtn';
		btnStop.innerHTML = 'Stop';

		let pCityName = document.createElement('p');
		pCityName.className = 'name';

		let gmt = city.gmt >-1 ? '+'+city.gmt : city.gmt;
		pCityName.innerHTML = `${city.name} (GMT${gmt})`;

		let pTime = document.createElement('p');
		pTime.className = 'time';		
		
		clockWrap.appendChild(divClock);
		divClock.appendChild(btnStart);
		divClock.appendChild(btnStop);
		divClock.appendChild(pCityName);
		divClock.appendChild(pTime);

		return divClock;
	}

	this.update = function(time) {
		this.timeDiv.innerHTML = `${time.hours} : ${time.minutes} : ${time.seconds}`;
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
function createInstances() {
	CITIES.forEach(function(item, i, arr) {
		let model = new ClockModel();
		let view = new ClockView();
		let controller = new ClockController();

		model.init(view, CITIES[i]);
		view.init(model);
		controller.init(model, view.clockContainer);

		model.getTime();
	})
}
createInstances();