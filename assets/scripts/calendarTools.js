function addCalendarEvent(token, date, eventName){
    console.log("addCalendarEvent: ", token);
    var theDate = moment(date);
    console.log("Adding date object: ", theDate);
    //var dateString = `${theDate.year()}-${(theDate.month() + 1)}-${theDate.date()}`
    dateString = "2019-08-25";
    
    
    console.log(eventName);

    
    //request = new XMLHttpRequest();
    const requestURL = `https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=${encodeURIComponent(token)}`;
    /*const body = JSON.stringify({
        "start": {"date": dateString},
        "end": {"date": dateString},
        "summary": eventName
    });

    request.open('POST', requestURL, true);
    request.setRequestHeader(
        'Content-Type', 'application/jsonp');
    
    request.onload = function() {
        console.log(request.responseText);
    }

    request.onerror = function(){
        console.log("Error sending add request")
    }

    request.withCredentials = true;

    request.send(body);*/

    var initObject = {
        method: 'POST',
        body: JSON.stringify({
            "start": {"date": dateString},
            "end": {"date": dateString},
            "summary": eventName
        }),
        credentials: 'omit'
    }

    //calendarRequest = new Request(requestURL, );

    //calendarRequest.json().then(console.log);

    
    return fetch(requestURL, initObject).then((response) => {
        if (response.status === 200){
            console.log("Sucess");
            return;
        } else {
            console.log(response.status);
            throw response.status;
        }
    });
}