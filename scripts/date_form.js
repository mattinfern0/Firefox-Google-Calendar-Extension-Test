function updateName(message){
    newText = message.response;
    document.getElementById("name").value = newText;
    console.log("Updated name to " + newText);
}

function autoFillText(e){
    var sending = browser.runtime.sendMessage({command: "sendHighlighted"});
    sending.then(updateName);
}

function getMaxDay(month){
    if (month == 2){
        return 28
    } else if ((month % 2) == 0){
        return 30
    } else {
        return 31
    }
}

// Called for onInput in month select
function updateMaxDay(e){
    month = this.value
    dayInput = document.getElementById("day")
    dayInput.max = getMaxDay(month)
}

function setInputDefaults(){
    today = new Date();
    document.getElementById("day").value = today.getDate();
    document.getElementById("month").value = today.getMonth() + 1; // getMonth() returns 0-based month number
    document.getElementById("year").value = today.getFullYear();
}

function setup(){
    document.querySelector("select").oninput = updateMaxDay
    setInputDefaults();
    autoFillText();
}

setup();