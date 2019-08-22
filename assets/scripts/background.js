//import authenticate from "./authenticate";

var selectedText = ""

function tryAddingEvent(date, name){
    authenticate().then((token) => {
        console.log("Authentication successful");
        addCalendarEvent(token, date, name);
    })
}

function backgroundListener(message){
    switch (message.command){
        case "sendHighlighted":
            return Promise.resolve({response: selectedText});
        case "addEvent":
            tryAddingEvent(message.date, message.eventName);
    }
}

function createContextItem(){
    browser.contextMenus.create({
        id: "add-new-date",
        title: "Add to Calendar",
        contexts: ["selection"]
    })

    browser.contextMenus.onClicked.addListener((info) => {
        if (info.hasOwnProperty('selectionText')){
            selectedText = info.selectionText;
        } else {
            selectedText = "";
        }

        browser.browserAction.openPopup();        
    })
}

function setup(){
    createContextItem();
    browser.runtime.onMessage.addListener(backgroundListener);
    console.log(browser.identity.getRedirectURL());
}

setup();