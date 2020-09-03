const hourHand = document.getElementById('hour-data')
const minuteHand = document.getElementById('minute-data')
const secondHand = document.getElementById('second-data')
const clock = document.querySelector(".clock")
const clockNumbers = document.querySelectorAll(".clock .numbers")
const timeZoneButton = document.querySelector(".timezoneSelection ul")

const startingTime = setInterval(selector, 1000)
const startingDisplay = setInterval(displayDigitalTime, 1000)

function stopStarting(){    //will stop the beginning clock when another timezone is selected
    clearInterval(startingTime);
    clearInterval(startingDisplay);
}
function startClock(place){     //starting clock
    setInterval(selector, 1000, place)
}

function selector(timeZoneSelected){    //The entire clock selector and operator
    const date = new Date()
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset; 

    switch(timeZoneSelected){
        case 'murica':
            var offset = -4;
            var place = "Murica";
            console.log('murica was chosen')
            break;
        case 'peenoise':
            var offset = 8;
            var place = "Peenoise Republic";
            break;
        default:
            var offset = 8;
            var place = "Nothing is selected";
            console.log("default is selected")
            break;
    }

    timeSelected = utc + (3600000*offset); 
    const currentDate = new Date(timeSelected);

    const secondsRatio = currentDate.getSeconds()/60
    const minutesRatio = (secondsRatio + currentDate.getMinutes())/60
    const hoursRatio = (minutesRatio + currentDate.getHours())/12

    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)

    if (currentDate.getHours() >= 16 || currentDate.getHours() <= 6) {
        nightTime()
    } else {
        dayTime()
    }
    setInterval(displayDigitalTime, 1000, currentDate)
}

function dayTime(){     // day time detection
    document.body.style.background = 'linear-gradient(to bottom right, #ffe6ee, #cfeefa)';
    clock.style.background = 'white';
    clock.style.border = 'solid white 17px';
    secondHand.style.border = '1px solid white'
    for (i = 0; i <  clockNumbers.length; i++){
        clockNumbers[i].style.color = 'black';
    }
}

function nightTime(){      //night time detection
    document.body.style.background = 'linear-gradient(to top left, #3d1c51, #000033)';
    clock.style.background = 'black';
    clock.style.border = 'solid black 17px';
    secondHand.style.border = '1px solid black'
    for (i = 0; i <  clockNumbers.length; i++){
        clockNumbers[i].style.color = 'white';
    }
}

function setRotation(element, rotationRatio){  //set the rotation of the hands
    element.style.transform = "translateX(-50%) rotate(" + rotationRatio*360 + "deg)"
}
function displayDigitalTime(timeGiven = new Date()){    //displays the digital clock
    document.querySelector(".digitalTime").innerHTML = timeGiven.toLocaleTimeString();

}

function showTab(){     //when clicked, will open the possible timezones
    timeZoneButton.style.opacity = "0.8";
    timeZoneButton.style.pointerEvents = "all";
    timeZoneButton.style.transform = "translateY(0px)";
    timeZoneButton.style.transition = "0.5s linear";

}