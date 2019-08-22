function addCalendarEvent(token, date, eventName){
    console.log("addCalendarEvent: ", token);
    var theDate = moment(date);
    console.log("Adding date object: ", theDate);
    var dateString = `${theDate.year()}-${(theDate.month() + 1)}-${theDate.date()}`
    //dateString = "2019-08-25";
    console.log(eventName);

    const requestURL = `https://www.googleapis.com/calendar/v3/calendars/primary/events?access_token=${encodeURIComponent(token)}`;

    var initObject = {
        method: 'POST',
        body: JSON.stringify({
            "start": {"date": dateString},
            "end": {"date": dateString},
            "summary": eventName
        }),
        credentials: 'omit'
    }
    
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