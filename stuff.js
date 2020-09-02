setInterval(setClock, 1000)

const hourHand = document.getElementById('hour-data')
const minuteHand = document.getElementById('minute-data')
const secondHand = document.getElementById('second-data')
const clock = document.querySelector(".clock")
const clockNumbers = document.querySelectorAll(".clock .numbers")

function setClock(){
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds()/60
    const minutesRatio = (secondsRatio + currentDate.getMinutes())/60
    const hoursRatio = (minutesRatio + currentDate.getHours())/12
    setRotationSeconds(secondHand, secondsRatio)
    setRotationMinutes(minuteHand, minutesRatio)
    setRotationHours(hourHand, hoursRatio)

    if (currentDate.getHours() > 14) {
        document.body.style.background = 'linear-gradient(to top left, #301e5d, #000033)';
        clock.style.background = 'black';
        clock.style.border = 'solid black 17px';
        secondHand.style.border = '1px solid black'
        for (i = 0; i <  clockNumbers.length; i++){
            clockNumbers[i].style.color = 'white';
        }
    }
}

function setRotationSeconds(element, rotationRatio){
    element.style.transform = "translateX(-50%) rotate(" + rotationRatio*360 + "deg)"
    element.style.transition = "3s linear"
}
function setRotationMinutes(element, rotationRatio){
    element.style.transform = "translateX(-50%) rotate(" + rotationRatio*360 + "deg)"
}
function setRotationHours(element, rotationRatio){
    element.style.transform = "translateX(-50%) rotate(" + rotationRatio*360 + "deg)"
}

setClock()