# Firefox-Google-Calendar-Extension-Test
### (In Development) ###

This extension creates is a popup in Firefox that allows you to input a date and name for an event. The popup will also "autofill" itself with the correct date if you highlight text corresponding to a date (ex: "Mar 7", "7 March 2019"). If the date isn't valid, the "name" field will be auto-filled instead. The popup can also be accessed through the context menu when highlighting text.


The ability to add the event into Google Calendar is still in development. Google's calendar API seems like it will only accept requests from Google's own Javascript client library (so far other methods result in a CORS error). The issue here is that Google's library can only be accessed through linking to it explicity in a html, but Firefox's (and Chrome's) Content Security Policy forbids that type of behavior. I am working on finding a solution to this issue.

#### Libraries Used ####
* [Moment.js](https://momentjs.com/) (for parsing the highlighted text into a date)
