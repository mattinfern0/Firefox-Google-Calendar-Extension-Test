/* Followed Mozilla's example from:
https://github.com/mdn/webextensions-examples/blob/master/google-userinfo/background/authorize.js */

const REDIRECT_URL = "";
const CLIENT_ID = "";
const SCOPES = ["email", "profile", "openid", "https://www.googleapis.com/auth/calendar.events"]
const AUTH_URL = 
`https://accounts.google.com/o/oauth2/auth\
?client_id=${CLIENT_ID}\
&response_type=token\
&redirect_uri=${encodeURIComponent(REDIRECT_URL)}\
&scope=${encodeURIComponent(SCOPES.join(' '))}`;

const VALIDATE_BASE_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo";

function extractToken(redirectURL){
    let m = redirectURL.match(/[#?](.*)/);
    if (!m || m.length < 1)
      return null;
    let params = new URLSearchParams(m[1].split("#")[0]);
    return params.get("access_token");
}

function validateToken(redirectURL){
    const accessToken = extractToken(redirectURL);
    if (!accessToken){
        throw "Authorization failure"
    }

    console.log("Recieved an access token");

    const validationURL = `${VALIDATE_BASE_URL}?access_token=${accessToken}`;
    const validationRequest = new Request(validationURL, {
    method: "GET"
    });

    function checkResponse(response) {
        return new Promise((resolve, reject) => {
            if (response.status != 200) {
                reject("Token validation error");
            }
            response.json().then((json) => {
                if (json.aud && (json.aud === CLIENT_ID)) {
                resolve(accessToken);
                } else {
                reject("Token validation error");
                }
            });
        });
    }

    console.log("validateToken: ", accessToken);
    return fetch(validationRequest).then(checkResponse);
}

function authenticate(){
    return browser.identity.launchWebAuthFlow({
        interactive: true,
        url: AUTH_URL
    }).then(validateToken);
}