var menuObj = [{
	name: 'Link 1',
	submenu: [{
		name: 'Link 1.1',
		submenu: [{
			name: 'Link 1.1.1',
			url: 'https://tut.by'
		},{
			name: 'Link 1.1.2',
			url: 'https://tut.by'
		}]
	}]
}, {
	name: 'Link 2',
	url: 'https://tut.by'
}]

function createMenu(menuObj) {
	var ul = document.createElement('ul');
	for(var key of menuObj) {
		var li = document.createElement('li');
		var link = document.createElement('a');
		link.innerHTML = key.name;

		if(key.url) {
			link.setAttribute('href', key.url);
		} else {
			link.setAttribute('href', '#');
		}
		li.appendChild(link);
		ul.appendChild(li);
		
		if(key.submenu) {
			li.appendChild(createMenu(key.submenu));
		}
	}
	return ul;
}

document.querySelector('body').appendChild(createMenu(menuObj));