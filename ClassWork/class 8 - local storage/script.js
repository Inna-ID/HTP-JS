function getFormData() {
	var form = document.getElementById('form');
	var inputs = form.getElementsByTagName('input');
	var user = {}

	for(let item of inputs) {
		user[item.name] = item.value;
	}

	return user;
}

function saveToLocalStorage() {
	for(let key in getFormData()) {
		localStorage.setItem(key, getFormData()[key]);
	}
}


function getLocalStorageData() {
	var textarea = document.getElementsByTagName('textarea')[0];
	var str = '';
	for(var i=0; i < localStorage.length; i++) {
		let key = localStorage.key(i);
		str += `${key[0].toUpperCase() + key.slice(1)}: ${localStorage.getItem(key)}\n`;
	}
	textarea.value = str;
}


document.getElementById('save').addEventListener('click', saveToLocalStorage);
document.getElementById('load').addEventListener('click', getLocalStorageData);