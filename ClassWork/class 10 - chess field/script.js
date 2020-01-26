var table = document.getElementById('table');

// create tr's
for(let i=0; i<10; i++) {
	var isEven = false;
	//row
	let tr = document.createElement('tr');

	if(i % 2 == 0) {
		isEven = true;
	} else {
		isEven = false;
	}
	for(let i=0; i < 10; i++) {
		// colums
		let td = document.createElement('td');
		tr.appendChild(td);

		if(isEven) {
			if(i % 2 != 0) {
				td.className = 'black'
			} else {
				td.className = 'white'
			}
		} else {
			if(i % 2 == 0) {
				td.className = 'black'
			} else {
				td.className = 'white'
			}
		}
	}

	table.appendChild(tr);
}


function changeColor() {
	let td = table.getElementsByTagName('td');
	for(let i=0; i < td.length; i++) {
		if(td[i].classList == 'black') {
			td[i].classList.remove('black');
			td[i].classList.add('white')
		} else {
			td[i].classList.remove('white');
			td[i].classList.add('black')
			//td[i].classList.toggle('black')
		}
	}
}




table.addEventListener('click', changeColor)