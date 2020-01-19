// model
let time = {
	date: new Date(),
	// gtm: 3,
	// start: false,
	// stop: true,

	updateView() {
		pageView.update()
	},
	updateTime() {
		this.date = new Date();
		console.log(this.date)
		this.updateView();
	}
}

// view
let pageView = {
	update() {
		document.getElementsByClassName('time')[0].innerHTML = time.date;
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