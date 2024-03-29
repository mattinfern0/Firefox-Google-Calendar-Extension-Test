function updateName(newName){
    document.getElementById("name").value = newName;
    console.log("Updated name to " + newName);
}

function parseDateString(dateStr){
    const dateFormats = [
        "DD-MMM-YYYY",
        "MM-DD-YYYY",
        "LL",
        "L"
    ]
    var theDate = moment(dateStr, dateFormats);
    return theDate;
}

function setInputDefaults(selectedText){
    var theDate = parseDateString(selectedText);

    if (theDate.isValid()){
        document.getElementById("day").value = theDate.date();
        document.getElementById("month").value = theDate.month() + 1; // month() returns 0-based month number
        document.getElementById("year").value = theDate.year();
    } else {
        if (selectedText != ""){
            updateName(selectedText)
        }

        today = new Date();
        document.getElementById("day").value = today.getDate();
        document.getElementById("month").value = today.getMonth() + 1; // getMonth() returns 0-based month number
        document.getElementById("year").value = today.getFullYear();
    }
}

function autoFillText(e){
    var getSelected = browser.runtime.sendMessage({command: "sendHighlighted"});
    getSelected.then((message)=>{
        setInputDefaults(message.response)
    });
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

function handleResponse(result){
    return;
}

function addEvent(){
    // Code to parse the date from the form
    monthDay = document.getElementById("day").value;
    month = document.getElementById("month").value;
    year = document.getElementById("year").value;

    var theDate = moment().month(month - 1).date(monthDay).year(year);
    var name = document.getElementById("name").value;
    console.log("Inputted date: ");
    console.log(theDate);

    browser.runtime.sendMessage({
        command: "addEvent",
        date: theDate.toJSON(),
        eventName: name,
    })
}

function setup(){
    document.querySelector("select").oninput = updateMaxDay
    autoFillText();
    document.getElementById("date-form").addEventListener('submit', addEvent);
}

setup();