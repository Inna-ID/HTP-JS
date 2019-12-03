let catDragStart = 'img/cat_draggable.jpg';
let catDragEnd = 'img/cat_sleeping.jpg';

let shift = {
	x: 0,
	y: 0
}

function dragStart(e) {
	if(e.target.tagName != 'IMG' ) {
		return;
	}
	e.target.setAttribute('src', catDragStart);
	e.target.classList.add('mousedown');

	// difference of coordinates relative to the mouse and the top left corner of the image
	shift.y = e.clientY - e.target.getBoundingClientRect().top;
	shift.x = e.clientX - e.target.getBoundingClientRect().left;
}

function dragEnd(e) {
	if(e.target.tagName != 'IMG' ) {
		return;
	}
	e.target.setAttribute('src', catDragEnd);
	e.target.classList.remove('mousedown');
}

function imageMove(e) {
	if(e.target.classList.contains('mousedown')) {

		//разница смещения
		e.target.style.top = `${e.pageY - shift.y}px`;
		e.target.style.left = `${e.pageX - shift.x}px`;
	}
}



document.querySelector('#image-container').addEventListener('mousedown', dragStart);

//forbid to drag a copy
document.querySelector('#image-container').addEventListener('dragstart', function(e){
	e.preventDefault();
});

document.querySelector('#image-container').addEventListener('mouseup', dragEnd);
document.querySelector('#image-container').addEventListener('mouseleave', dragEnd);

document.querySelector('#image-container').addEventListener('mousemove', imageMove);