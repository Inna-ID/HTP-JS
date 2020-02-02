var input = document.getElementById('tab-tag');
var close = document.getElementsByClassName('close');

function addTag(e) {
	if(!input.value || e.keyCode !== 13) {
		return;
	}
	var tab = document.createElement('div');
	var x = document.createElement('span');

	var container = document.querySelector('.tabs-container');
	tab.innerText = input.value;
	tab.classList.add('tab');

	x.classList.add('close');
	tab.appendChild(x);
	x.addEventListener('click', deleteElement);

	container.appendChild(tab);
	input.value = '';
}


input.addEventListener('keyup', addTag)

function deleteElement(e) {
	e.target.parentNode.remove()
}