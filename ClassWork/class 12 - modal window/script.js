function openModal() {
	$('.shadow').fadeIn();
}

function closeModal() {
	$('.shadow').fadeOut();
}

$(document).keyup(function(e) {
	if(e.keyCode === 27) {
		closeModal()
	}
})


$('.shadow').click(function(e) {
	closeModal()
})

$('.modal-window').click(function(e) {
	e.stopPropagation()
})



$('.open-btn').click(openModal);
$('.close-btn').click(closeModal);


$("#login-form").validate({
	rules: {
	    login: {
	      required: true,
	      minlength: 4,
	      maxlength: 20
	    },
	    password: {
	      required: true,
	      password: true,
	      minlength: 3,
	      maxlength: 10
	    }
	  },

	messages: {
		login: "Please enter your name",
		password: {
		    required: "We need your email address to contact you",
		    email: "Your email address must be in the format of name@domain.com"
		    }
		}
 });


$('.toggle-form').click(function() {
	$('form').toggleClass('active');

	let text = $('.toggle-form').text();
	$('.toggle-form').text(text == 'Register' ? 'Login' : 'Register' );
})