jQuery(document).ready(function() {

    function drawRounds() {
        var elem = $('.vinyl-record');

        //var redRound = 'transparent 1.7%, rgb(129, 29, 29) 1.9%, rgb(134, 29, 29) 21%, rgb(88, 20, 20) 21.1%, rgb(150, 27, 27) 21.3%, rgb(129, 29, 29) 23%,';
        var blackRound = 'rgb(0, 0, 0) 23.2%, rgb(3, 6, 3) 24.2%, rgb(28, 28, 29) 24.3%, rgb(3, 6, 3) 24.4%,' +
        'rgb(0, 0, 0) 25.2%, rgb(28, 28, 29) 25.4%, rgb(3, 6, 3) 25.4%, rgb(13, 12, 14) 26%, rgb(55, 60, 59) 26.2%, rgb(47, 51, 46) 26.5%, rgb(62, 62, 63) 26.9%,';
        var gr = blackRound;

        var blackend = 'rgb(31, 32, 34) 68.9%, rgb(13, 16, 13) 69%, rgb(0, 0, 0) 70.3%, rgb(45, 50, 49) 70.4%, rgb(23, 26, 23) 70.5%';

        //array of strings
        var flares = [];
        for(var i = 32; i < 100; i+=6) {
            flares.push(`rgb(40, 40, 39) ${i}%, rgb(51, 50, 55) ${i+ 0.4}%, rgb(7, 7, 10) ${i+ 0.5}%, rgb(48, 48, 55) ${i+ 0.6}%, rgb(42, 40, 43) ${i+ 0.7}%,`);
            //i+=.1;
        }

        var gaps = [];

        function randomNum(min, max) {
            let obj = {
                r: Math.floor(Math.random()*(max - min + 1) + min),
                g: Math.floor(Math.random()*(max - min + 1) + min),
                b: Math.floor(Math.random()*(max - min + 1) + min)
            }
            return obj;
        }
        
        var grayRounds = [];
        for(var i = 27; i < 100; i+=1) {            
            //во вложенном фор создавать оттенки как строки и пушить их во внутреннем фор 
            var repeatingStyles = '';
            for (var j = 0; j < 10; j++) {
                //dark, dark, light, dark, dark...
                repeatingStyles += `rgb(${randomNum(30, 35).r}, ${randomNum(30, 35).g}, ${randomNum(30, 35).b})${i}%, rgb(${randomNum(30, 37).r}, ${randomNum(30, 35).g}, ${randomNum(30, 38).b})${i+ 0.4}%, 
                    rgb(${randomNum(37, 42).r}, ${randomNum(37, 42).g}, ${randomNum(37, 42).b})${i+ 0.5}%, rgb(${randomNum(30, 35).r}, ${randomNum(30, 35).g}, ${randomNum(30, 35).b}) ${i+ 0.6}%, rgb(${randomNum(32, 35).r}, ${randomNum(35, 37).g}, ${randomNum(32, 35).b}) ${i+ 0.7}%,`;
                
                    i+=.5;

            }
            grayRounds.push(repeatingStyles);
        }

        //summ arrays
         var str = '';
        for(var i = 0; i < 7; i++) {

            str += grayRounds[i] + flares[i];
        }

        //delete last comma
        //gr += str.substring(0, str.length -1);

        elem.css('background', `radial-gradient(${gr + str + blackend})`);
    }

    drawRounds();


    //////////// audio

    var audio = new Audio('The_Beatles_Yesterday.mp3');
    var vinylRecord = $('.vinyl-record');

    function recordPlayStop() {
        if(audio.paused) {
            vinylRecord.addClass('playing');
            audio.play();
        } else {
            var rotateDeg = getRotationDegrees($('.vinyl-record')[0]);
            vinylRecord.css('transform', `rotate(${rotateDeg}deg)`)
            audio.pause();
            vinylRecord.removeClass('playing');
        }
    }


    $('#play-stop').click(recordPlayStop);


    function getRotationDegrees(element) {
        // get the computed style object for the element
        var w = window;
        var style = window.getComputedStyle(element);
        // this string will be in the form 'matrix(a, b, c, d, tx, ty)'
        var transformString = style['-webkit-transform']
                           || style['-moz-transform']
                           || style['transform'] ;
        if (!transformString || transformString == 'none')
            return 0;
        var splits = transformString.split(',');
        // parse the string to get a and b
        var parenLoc = splits[0].indexOf('(');
        var a = parseFloat(splits[0].substr(parenLoc+1));
        var b = parseFloat(splits[1]);
        // doing atan2 on b, a will give you the angle in radians
        var rad = Math.atan2(b, a);
        var deg = 180 * rad / Math.PI;
        // instead of having values from -180 to 180, get 0 to 360
        if (deg < 0) deg += 360;
        return deg;
    }

});