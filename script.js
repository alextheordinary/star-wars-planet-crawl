// Initial js file for the project

// Variables
var characterName;
var characterNumber;
var homeworld;
var starships = []; // Array of API URLs for vehicles associated with the character
var chosenStarship; 
var destinationName;
var destinationClimate;

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

// For testing purposes
//var dummyStarships = ["https://swapi.dev/api/starships/12/", "https://swapi.dev/api/starships/13/"] ;
//chooseSpacecraft(dummyStarships);

// Functions

// Start the Adventure. Reset variables. Pop up the modal for Choose Your Character. 3 random characters (from a predetermined list) for name and portrait will be displayed. A character can be chosen by clicking anywhere in the container for that character. Clicking on that character stores the character name, character number, homeworld, and starships in global variables. Calls function chooseSpacecraft()
function startAdventure(event) {

}

// Choose your Spacecraft. Pop up the modal for Choosing your Spacecraft. This is populated using API calls to the starships API. A call needs to be made for each starship. Display the names of starships in buttons. Clicking on a button saves the name of the starship to chosenStarship variable. Calls function chooseDestination. Parameters - an array of starship API URLs from the people API call in startAdventure
function chooseSpacecraft(starships) {

}

// Choose your destination planet. Pop up the modal for Choosing your destination. This is populated by using API calls to pick 3 random planets. These cannot be the homeworld. Need logic to check if homeworld and/or if the planet has already been chosen. Displays each planet name and a circle that is colored based on climate type. (Note: need to define which climate types go to which colors). A planet can be chosen by clicking anywhere in the container for that planet. Call randomSpeciesEncounter. Parameters - starting homeworld API URL
function chooseDestination(homeworld) {

}

// Random Species Encounter. Pop up the modal for being stopped by a group of a random species. This is populated by using API calls to pick a random species. Need to check if any criteria are needed (maybe some species aren't spacefaring?). Displays a message saying that a group of [species name] have yanked your ship out of hyperspace. They're willing to let you go if you perform a random task. This task is populated by pulling a random task from the Bored API (criteria TBD). Call reachDestination(). Parameters - none
function randomSpeciesEncounter() {

}

// Reach destination. Pop up the modal saying that you've reached your destination planet. Display a circle of the planet again in a larger size. Display a button to start the crawl summarizing the journey. Calls startCrawl(). Parameters - destination planet name and climate type
function reachDestination(destinationName, climate) {

}

// Start crawl. It's either animated or static text on black background. Depends on time. Implement last. Option to play again that would call startAdventure. Parameters - none
function startCrawl() {

}