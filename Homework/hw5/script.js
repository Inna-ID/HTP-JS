let catImage = document.getElementById('cat-img');

let catDragStart = 'img/cat_draggable.jpg';
let catDragEnd = 'img/cat_sleeping.jpg';


var mouse = {
	x: 0,
	y: 0,
	isDown: false
}


function dragStart(e) {
	catImage.setAttribute('src', catDragStart);
	
	setTimeout( () => (this.className = 'invisible'), 0);
	

}

function dragEnd(e) {
	catImage.setAttribute('src', catDragEnd);
	
	this.className = ' ';
}

function imageMove(e) {
	mouse.x = e.pageX - 30;
	mouse.y = e.pageY - 18;	

	catImage.style.cssText = `top: ${mouseY}px; left: ${mouseX}px;`;
}

//document.querySelector('#image-container').addEventListener('mousemove', imageMove);
catImage.addEventListener('mousedown', dragStart);
catImage.addEventListener('mouseup', dragEnd);

