/* Followed Mozilla's example from:
https://github.com/mdn/webextensions-examples/blob/master/google-userinfo/background/authorize.js */

//export default authenticate

const AUTH_URL = ""

function extractToken(redirectURL){

}

function validateToken(redirectURL){

}

function authenticate(){
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: AUTH_URL
    }).then(validateToken);
}