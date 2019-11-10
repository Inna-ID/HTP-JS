"use strict";

function randomDiap( min,  max ) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}


//////var 1 
/// remove elements from an array that have been accessed already
/// method random can give the same values
function mood1(colorsCount) { 
    var colors = [ 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];

    for ( var i =  0; i < colorsCount; i++ ) {
        var randomNum = randomDiap( 0, colors.length-1 );
        var colorName = (colors.splice(randomNum, 1)).toString();
        console.log( colorName );
    }
}


////// var 2
/// use hash. and check if a random number already existed, then it find other random number
/// this method does more iterations
function mood2(colorsCount) {
    var colors = [ 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
    var usedNumber = {};
    var i = 0;

    while(i < colorsCount) {
    	var randomNum = randomDiap( 0, colors.length-1 );
    	if(randomNum in usedNumber) {
    		continue;
    	}
    	usedNumber[randomNum] = true;
    	i++;
        var colorName = colors[randomNum];
        console.log( colorName );
    }
}


mood1(6);
console.log('-------');
mood2(6);