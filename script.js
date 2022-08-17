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

//testBored();
//testSWAPI();
chooseDestination("https://swapi.dev/api/planets/1");

// For testing purposes
//var dummyStarships = ["https://swapi.dev/api/starships/12/", "https://swapi.dev/api/starships/13/"] ;
//chooseSpacecraft(dummyStarships);

// Functions

// Start the Adventure. Reset variables. Pop up the modal for Choose Your Character. 3 random characters (from a predetermined list) for name and portrait will be displayed. A character can be chosen by clicking anywhere in the container for that character. Clicking on that character stores the character name, character number, homeworld, and starships in global variables. Calls function chooseSpacecraft()
function startAdventure(event) {

}

// Choose your Spacecraft. Pop up the modal for Choosing your Spacecraft. This is populated using API calls to the starships API. A call needs to be made for each starship. Display the names of starships in buttons. Clicking on a button saves the name of the starship to chosenStarship variable. Calls function chooseDestination. Parameters - an array of starship API URLs from the people API call in startAdventure

// There are 36 starships to choose from, I chose 
// Millenium Falcon: "https://swapi.dev/api/starships/10/" (Hans Solo)
// Xwing: "https://swapi.dev/api/starships/12/" (Luke Skywalker)
// TIEX1: "https://swapi.dev/api/starships/13/" (Darth Vader)

  
var starship1Btn = document.querySelector('.starship1Btn');
var starship1Label = document.querySelector('.starship1Label');

function chooseSpacecraft(starships) {

  var starship1 = 'https://swapi.dev/api/starships/10/';
  var starship2 = 'https://swapi.dev/api/starships/12/';
  

  // with variables
  // var starshipId
  // var starship1variables = 'https://swapi.dev/api/starships/' + starshipId +'/'
  // could also use a forloop

  fetch(starship1)
  .then(function (response) {
      if (response.ok) {
          return response.json();
      }
  })
  .then(function (data) {
      console.log(data);

      var starshipLabel = data.name;
      starship1Label.textContent=starshipLabel;

      // assigns chosen starship from starship (unclear if this is what we want here)
      var chosenStarship = data.name;
      console.log(chosenStarship);

      // sets chosen Starship to local storage
      localStorage.setItem("chosenStarship", JSON.stringify(chosenStarship));

  });


  }

// What I have happening is that on click the name is assigned, what we want to happen is the name is assigned on launch of the modal, then the click will be what chooses the starship. Options > create the buttons dynamically pulling the variables from the api via for loop so the forloop is fetching the name of the vehicle. Or hardcode the names of the ships in the modal launch.

starship1Btn.addEventListener("click",chooseSpacecraft);
    



// Choose your destination planet. Pop up the modal for Choosing your destination. This is populated by using API calls to pick 3 random planets. These cannot be the homeworld. Need logic to check if homeworld and/or if the planet has already been chosen. Displays each planet name and a circle that is colored based on climate type. (Note: need to define which climate types go to which colors). A planet can be chosen by clicking anywhere in the container for that planet. Call randomSpeciesEncounter. Parameters - starting homeworld API URL
function chooseDestination(homeworld) {
  var splitHomeworld = homeworld.split("/");
  var homeworldNumber = splitHomeworld[splitHomeworld.length - 1];
  var planets = [homeworldNumber]; // The homeworld is index 0. Possible destinations are index 1, 2, or 3

  var planetOne; // Objects with name, climate, URL
  var planetTwo;
  var planetThree;

  var planetOneEl = document.getElementById("planet-1-name");
  var planetTwoEl = document.getElementById("planet-2-name");
  var planetThreeEl = document.getElementById("planet-3-name");

  while (planets.length < 4) {
    var randomPlanetNum = (Math.floor(Math.random() * 60) + 1).toString();
    if (planets.indexOf(randomPlanetNum) === -1) {
      planets.push(randomPlanetNum);
    }
  }
  console.log(planets);


  function getPlanet(planetNum, planetEl) {
    var queryURLBase = "https://swapi.dev/api/planets";
    var queryURL = queryURLBase + "/" + planetNum;

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        planetEl.textContent = data.name;
        planetEl.setAttribute("dataclimate", data.climate);
      });
  }

  getPlanet(planets[1], planetOneEl);
  getPlanet(planets[2], planetTwoEl);
  getPlanet(planets[3], planetThreeEl);

  console.log(planetOneEl.getAttribute("dataclimate"));
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

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});