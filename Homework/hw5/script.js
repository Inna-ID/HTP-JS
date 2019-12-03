let catDragStart = 'img/cat_draggable.jpg';
let catDragEnd = 'img/cat_sleeping.jpg';

let shift = {
	x: 0,
	y: 0
}

let currentImage;

function dragStart(e) {
	if(e.target.tagName != 'IMG' ) {
		return;
	}

	currentImage = e.target;

	currentImage.setAttribute('src', catDragStart);
	currentImage.classList.add('mousedown');

	// to move by any point of the image
	// difference of coordinates relative to the mouse and the top left corner of the image
	shift.y = e.clientY - currentImage.getBoundingClientRect().top;
	shift.x = e.clientX - currentImage.getBoundingClientRect().left;
}

function dragEnd(e) {
	if (!currentImage) {
		return;
	}
	currentImage.setAttribute('src', catDragEnd);
	currentImage.classList.remove('mousedown');

	currentImage = null;
}

function imageMove(e) {
	if (!currentImage) {
		return;
	}
	
	// current mouse position - difference of mouse position and top left corner of the image at start
	currentImage.style.top = `${e.pageY - shift.y}px`;
	currentImage.style.left = `${e.pageX - shift.x}px`;
}


document.querySelector('#image-container').addEventListener('mousedown', dragStart);

//forbid to drag a copy
document.querySelector('#image-container').addEventListener('dragstart', function(e){
	e.preventDefault();
});

document.querySelector('#image-container').addEventListener('mouseup', dragEnd);
document.querySelector('#image-container').addEventListener('mouseleave', dragEnd);

document.querySelector('#image-container').addEventListener('mousemove', imageMove);