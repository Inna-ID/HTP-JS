//var arr = [1,[],2,[3,4],[7,8,[1,1]],[56,7]];
var arr = [1,[],2,[3,4],2];

function summ(arr) {
	var result = 0;
	var insetArr = [];

	for(var i = 0; i < arr.length; i++) {
		if(Array.isArray(arr[i])) {
			result += summ(arr[i]); 
		} else {
			result += arr[i];
		}
	}
	return result;
}

console.log(summ(arr));


function fibonacci(num) {
	if(num <=1) {
		return num;
	} else {
		return fibonacci(num -1) + fibonacci(num - 2);
	}
}

console.log(fibonacci(1));