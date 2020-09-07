const hourHand = document.getElementById('hour-data')
const minuteHand = document.getElementById('minute-data')
const secondHand = document.getElementById('second-data')
const clock = document.querySelector(".clock")
const clockNumbers = document.querySelectorAll(".clock .numbers")
const timeZoneButton = document.querySelector(".timezoneSelection ul")
const digital = document.querySelector(".digitalTime")
const locationSelected = document.querySelector(".location")
const timeZoneSign = document.querySelector(".timezoneSelection button")
const bgTrigger = document.querySelector(".background")

let startingTime = setInterval(selector, 1000) //start of Analog clock code
let startingDisplay = setInterval(displayDigitalTime, 1000) //start of Digital clock

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
        case 'nyc':
            offset = -4;
            place = 'New York City'
            break;
        case 'manila':
            offset = 8;
            place = 'City of Manila'
            break;
        case 'london':
            offset = 1;
            place = 'London'
            break;
        case 'la':
            offset = -7;
            place = 'City of Los Angeles'
            break;  
        case 'mumbai':
            offset = 5.5;
            place = 'Mumbai'
            break;
        case 'cape':
            offset = 2;
            place = 'Cape Town'
            break;
        case 'edmon':
            offset = -6;
            place = 'Edmonton'
            break;
        case 'moscow':
            offset = 3;
            place = 'Moscow'
            break;
        case 'tokyo':
            offset = 9;
            place = 'Tokyo Metropolis'
            break;
        case 'rio':
            offset = -3;
            place = 'Rio de Janeiro'
            break;
        case 'dubai':
            offset = 4;
            place = 'Dubai'
            break;
        case 'madrid':
            offset = 0;
            place = 'Madrid'
            break;
        case 'mel':
            offset = 10;
            place = 'Melbourne'
            break;
        case 'bk':
            offset = 7;
            place = 'Bangkok'
            break;
        case 'cope':
            offset = 2;
            place = 'Copenhagen'
            break;
        case 'stock':
            offset = 2;
            place = 'Stockholm'
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
    //document.body.style.backgroundImage = 'linear-gradient(to bottom right, #ffe6ee, #cfeefa)';
    clock.style.background = 'white';
    clock.style.border = 'solid white 17px';
    secondHand.style.border = '1px solid white';
    for (i = 0; i <  clockNumbers.length; i++){
        clockNumbers[i].style.color = 'black';
    }
    digital.style.color = 'black';
    locationSelected.style.color = 'black';
    timeZoneSign.style.color = 'black';
    bgTrigger.classList.toggle("trigger", false)
}

function nightTime(){      //night time detection
    //document.body.style.backgroundImage = 'linear-gradient(to top left, #3d1c51, #000033)';
    clock.style.background = 'black';
    clock.style.border = 'solid black 17px';
    secondHand.style.border = '1px solid black'
    for (i = 0; i <  clockNumbers.length; i++){
        clockNumbers[i].style.color = 'white';
    }
    digital.style.color = 'white';
    locationSelected.style.color = 'white';
    timeZoneSign.style.color = 'white';
    bgTrigger.classList.toggle("trigger", true)
}

function setRotation(element, rotationRatio){  //set the rotation of the hands
    element.style.transform = "translateX(-50%) rotate(" + rotationRatio*360 + "deg)"
}
function displayDigitalTime(timeGiven = new Date(), place = 'City of Manila'){    //displays the digital clock
    document.querySelector(".location").innerHTML = place;
    document.querySelector(".digitalTime").innerHTML = timeGiven.toLocaleTimeString();

}

function showTab(){     //when clicked, will open the possible timezones
    timeZoneButton.style.opacity = "0.8";
    timeZoneButton.style.pointerEvents = "all";
    timeZoneButton.style.transform = "translateY(0px)";
    timeZoneButton.style.transition = "1s ease";
}

function closeTab(){
    timeZoneButton.style.opacity = "0";
    timeZoneButton.style.pointerEvents = "none";
    timeZoneButton.style.transform = "translateY(-10px)";
    timeZoneButton.style.transition = "1s ease";
}
selector();