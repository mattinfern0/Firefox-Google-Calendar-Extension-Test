var selectedText = ""

function backgroundListener(message){
    if (message.command === "sendHighlighted"){
        return Promise.resolve({response: selectedText});
    }
}

browser.runtime.onMessage.addListener(backgroundListener)

function createContextItem(){
    browser.contextMenus.create({
        id: "add-new-date",
        title: "Add to Calendar",
        contexts: ["selection"]
    })

    browser.contextMenus.onClicked.addListener((info) => {
        if (info.hasOwnProperty('selectionText')){
            selectedText = info.selectionText;
            console.log("Selected text: " + selectedText);
        } else {
            selectedText = "";
        }

        browser.browserAction.openPopup();        
    })
}

function setup(){
    
    createContextItem();
}

setup();