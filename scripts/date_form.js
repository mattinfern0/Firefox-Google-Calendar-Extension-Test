
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
    console.log(theDate);
}

function setInputDefaults(selectedText){
    if (selectedText != ""){
        updateName(selectedText)
    }
    today = new Date();
    document.getElementById("day").value = today.getDate();
    document.getElementById("month").value = today.getMonth() + 1; // getMonth() returns 0-based month number
    document.getElementById("year").value = today.getFullYear();
    console.log(moment());
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

function setup(){
    document.querySelector("select").oninput = updateMaxDay
    autoFillText();
    parseDateString("Jan 4 2017");
}

setup();