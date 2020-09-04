const hourHand = document.getElementById('hour-data')
const minuteHand = document.getElementById('minute-data')
const secondHand = document.getElementById('second-data')
const clock = document.querySelector(".clock")
const clockNumbers = document.querySelectorAll(".clock .numbers")
const timeZoneButton = document.querySelector(".timezoneSelection ul")
const digital = document.querySelector(".digitalTime")
const timeZoneSign = document.querySelector(".timezoneSelection button")

let startingTime = setInterval(selector, 1000) //Analog
let startingDisplay = setInterval(displayDigitalTime, 1000) //Digital

function startClock(place){     //starting clock
    clearInterval(startingTime);
    clearInterval(startingDisplay);
    startingTime = setInterval(selector, 1000, place)
}

function selector(timeZoneSelected){    //The entire clock selector and operator
    const date = new Date()
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset; 
    let offset;
    let place;
    switch(timeZoneSelected){
        case 'murica':
            offset = -4;
            place = 'New York City'
            break;
        case 'pinoy':
            offset = 8;
            place = 'City of Manila'
            break;
        case 'tea':
            offset = 1;
            place = 'London'
            break;
        default:
            offset = 8;
            place = "City of Manila";
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

    if (currentDate.getHours() >= 18 || currentDate.getHours() <= 5) {
        nightTime()
    } else {
        dayTime()
    }
    displayDigitalTime(currentDate, place)
}

function dayTime(){     // day time detection
    document.body.style.backgroundImage = 'linear-gradient(to bottom right, #ffe6ee, #cfeefa)';
    clock.style.background = 'white';
    clock.style.border = 'solid white 17px';
    secondHand.style.border = '1px solid white';
    for (i = 0; i <  clockNumbers.length; i++){
        clockNumbers[i].style.color = 'black';
    }
    digital.style.color = 'black';
    timeZoneSign.style.color = 'black';
    
}

function nightTime(){      //night time detection
    document.body.style.backgroundImage = 'linear-gradient(to top left, #3d1c51, #000033)';
    clock.style.background = 'black';
    clock.style.border = 'solid black 17px';
    secondHand.style.border = '1px solid black'
    for (i = 0; i <  clockNumbers.length; i++){
        clockNumbers[i].style.color = 'white';
    }
    digital.style.color = 'white';
    timeZoneSign.style.color = 'white';
}

function setRotation(element, rotationRatio){  //set the rotation of the hands
    element.style.transform = "translateX(-50%) rotate(" + rotationRatio*360 + "deg)"
}
function displayDigitalTime(timeGiven = new Date(), place = 'City of Manila'){    //displays the digital clock
    document.querySelector(".digitalTime").innerHTML = place + "<br>" + timeGiven.toLocaleTimeString();

}

function showTab(){     //when clicked, will open the possible timezones
    timeZoneButton.style.opacity = "0.8";
    timeZoneButton.style.pointerEvents = "all";
    timeZoneButton.style.transform = "translateY(0px)";
    timeZoneButton.style.transition = "0.5s linear";
}

function closeTab(){
    timeZoneButton.style.opacity = "0";
    timeZoneButton.style.pointerEvents = "none";
    timeZoneButton.style.transform = "translateY(-10px)";
    timeZoneButton.style.transition = "0.5s linear";
}
selector();