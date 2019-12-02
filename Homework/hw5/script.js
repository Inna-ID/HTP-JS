let catDragStart = 'img/cat_draggable.jpg';
let catDragEnd = 'img/cat_sleeping.jpg';


function dragStart(e) {

	if(e.target.tagName != 'IMG' ) {
		return;
	}

	e.target.setAttribute('src', catDragStart);
	e.target.setAttribute('data-ismoved', 'true');

	e.target.style.zIndex = '9';
}

function dragEnd(e) {

	if(e.target.tagName != 'IMG' ) {
		return;
	}
	
	e.target.setAttribute('src', catDragEnd);
	e.target.setAttribute('data-ismoved', 'false');
	e.target.style.zIndex = '1';
}

function imageMove(e) {
	if(e.target.getAttribute('data-ismoved') === 'true') {
		e.target.style.top = `${e.pageY - 50}px`;
		e.target.style.left = `${e.pageX - 50}px`;
	}
}


document.querySelector('#image-container').addEventListener('mousedown', function(e){
	dragStart(e);
});

document.querySelector('#image-container').addEventListener('dragstart', function(e){
	e.preventDefault();
});


document.querySelector('#image-container').addEventListener('mouseup', function(e){
	dragEnd(e);
});

document.querySelector('#image-container').addEventListener('mouseleave', function(e){
	dragEnd(e);
});

document.querySelector('#image-container').addEventListener('mousemove', function(e){
	imageMove(e);
});

