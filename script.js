// Initial js file for the project

// Test function for calling the Bored API
function testBored() {
    var queryURL = "http://www.boredapi.com/api/activity/";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
        });
}


// Test function for calling the Star Wars API (SWAPI)
function testSWAPI() {
    var queryURL = "https://swapi.dev/api/";

    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            console.log(data);
        });
}

testBored();
testSWAPI();