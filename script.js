// Initial js file for the project

// Variables
var characterName;
var characterNumber;
var homeworld = "https://swapi.dev/api/planets/1"; // Temporary variable value
var starshipsUrl = "https://swapi.dev/api/starships/1";
var starships = []; // Array of API URLs for vehicles associated with the character
var chosenStarship;
// Variables for chooseDestination
var destinationName;
var destinationClimate;
var destinationURL;
var chooseDestButtonEl = document.querySelector("#choose-dest-button");
var logButtonEl = document.querySelector("#log-planet-one");
chooseDestButtonEl.addEventListener("click", chooseDestination);
var chooseSpacecraftButtonEl = document.querySelector('#choose-starship-button')
chooseSpacecraftButtonEl.addEventListener("click", chooseSpacecraft);

// End variables for chooseDestination

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
//startAdventure();

// For testing purposes
//var dummyStarships = ["https://swapi.dev/api/starships/12/", "https://swapi.dev/api/starships/13/"] ;
//chooseSpacecraft(dummyStarships);

// Functions

// Start the Adventure. Reset variables. Pop up the modal for Choose Your Character. 3 random characters (from a predetermined list) for name and portrait will be displayed. A character can be chosen by clicking anywhere in the container for that character. Clicking on that character stores the character name, character number, homeworld, and starships in global variables. Calls function chooseSpacecraft()
function startAdventure(event) {
  var characters = ["1", "4", "9", "10"];
  var charactersSelected = [];
  var characterOneEl = document.querySelector('#character-1-name');
  var characterTwoEl = document.querySelector('#character-2-name');
  var characterThreeEl = document.querySelector('#character-3-name');
  var characterElArray = [characterOneEl, characterTwoEl, characterThreeEl];
  console.log(characterElArray);


  while (charactersSelected.length < 3) {
    var randomCharacterNum = (Math.floor(Math.random() * 4)).toString();
    if (charactersSelected.indexOf(characters[randomCharacterNum]) === -1) {
      charactersSelected.push(characters[randomCharacterNum]);
    }
  }
  console.log(charactersSelected);

  for (var i = 0; i < 3; i++) {
    var queryURLBase = "https://swapi.dev/api/people";
    console.log(charactersSelected[i]);
    var queryURL = queryURLBase + "/" + charactersSelected[i];
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        console.log(characterElArray[i]);
        characterElArray[i].textContent = data.name;

      }
      )
  }
}

// Choose your Spacecraft. Pop up the modal for Choosing your Spacecraft. This is populated using API calls to the starships API. A call needs to be made for each starship. Display the names of starships in buttons. Clicking on a button saves the name of the starship to chosenStarship variable. Calls function chooseDestination. Parameters - an array of starship API URLs from the people API call in startAdventure

// There are 36 starships to choose from, I chose 
// Millenium Falcon: "https://swapi.dev/api/starships/10/" (Hans Solo)
// Xwing: "https://swapi.dev/api/starships/12/" (Luke Skywalker)
// TIEX1: "https://swapi.dev/api/starships/13/" (Darth Vader)





function chooseSpacecraft(event) {
  event.preventDefault();
  var starshipOneEl = document.querySelector("#starship-1");
  var starshipTwoEl = document.querySelector("#starship-2");
  var starshipThreeEl = document.querySelector("#starship-3");
  var chooseStarshipModalEL = document.querySelector("#modal-choose-starship");



  // This while loop will keep generating random numbers between 1 and 60 until the array has 4 unique values

  var queryURLBase = "https://swapi.dev/api/starships";
  var queryURL = queryURLBase + "/" + starshipNum;


  // max at 3 ships, if array is null don't run code

  function getSpacecraft(starshipNum, starshipEl) {

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        starshipEl.querySelector(".starship-name").textContent = data.name;
        starshipEl.setAttribute("data-name", data.name);
        starshipEl.setAttribute("data-url", data.url);
        starshipEl.addEventListener("click", makeChoice);
        chooseStarshipModalEL.classList.add("is-active"); // Shows the modal
      });
  }

  function makeChoice(event) {
    var boxEl = event.target.closest(".box");
    starshipOneEl.removeEventListener("click", makeChoice);
    starshipTwoEl.removeEventListener("click", makeChoice);
    starshipThreeEl.removeEventListener("click", makeChoice);
    starshipName = boxEl.dataset.name;
    starshipURL = boxEl.dataset.url;
    console.log(starshipName);
    console.log(starshipURL);

    chooseStarshipModalEL.classList.remove("is-active"); // Hides the modal
  }

  // if starships [0] === null hide boxes use is-hidden

  getSpacecraft(starships[0], starshipOneEl);
  getSpacecraft(starships[1], starshipTwoEl);
  getSpacecraft(starships[2], starshipThreeEl);

}
// starship1Btn.addEventListener("click", chooseSpacecraft);




// Choose your destination planet. Pop up the modal for Choosing your destination. This is populated by using API calls to pick 3 random planets. These cannot be the homeworld. Need logic to check if homeworld and/or if the planet has already been chosen. Displays each planet name and a circle that is colored based on climate type. (Note: need to define which climate types go to which colors). A planet can be chosen by clicking anywhere in the container for that planet. Call randomSpeciesEncounter. Parameters - starting homeworld API URL
function chooseDestination(event) {
  event.preventDefault();
  var chooseDestModalEL = document.querySelector("#modal-choose-destination");


  var splitHomeworld = homeworld.split("/");
  var homeworldNumber = splitHomeworld[splitHomeworld.length - 1];
  var planets = [homeworldNumber]; // The homeworld is index 0. Possible destinations are index 1, 2, or 3

  var planetOneEl = document.querySelector("#planet-1");
  var planetTwoEl = document.querySelector("#planet-2");
  var planetThreeEl = document.querySelector("#planet-3");

  // This while loop will keep generating random numbers between 1 and 60 until the array has 4 unique values
  while (planets.length < 4) {
    var randomPlanetNum = (Math.floor(Math.random() * 60) + 1).toString();
    if (planets.indexOf(randomPlanetNum) === -1) {
      planets.push(randomPlanetNum);
    }
  }

  // Makes a fetch request to the planets API. Sets the data attributes for name, climate, and url using api response data and then makes the modal active. Still need to alter background color of circle class elements based on climate.
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
        planetEl.querySelector(".planet-name").textContent = data.name;
        planetEl.setAttribute("data-name", data.name);
        planetEl.setAttribute("data-climate", data.climate);
        planetEl.setAttribute("data-url", data.url);
        planetEl.addEventListener("click", makeChoice);
        chooseDestModalEL.classList.add("is-active"); // Shows the modal
      });
  }

  function makeChoice(event) {
    var boxEl = event.target.closest(".box");
    planetOneEl.removeEventListener("click", makeChoice);
    planetTwoEl.removeEventListener("click", makeChoice);
    planetThreeEl.removeEventListener("click", makeChoice);
    destinationName = boxEl.dataset.name;
    destinationClimate = boxEl.dataset.climate;
    destinationURL = boxEl.dataset.url;
    console.log(destinationName);
    console.log(destinationClimate);
    console.log(destinationURL);

    chooseDestModalEL.classList.remove("is-active"); // Hides the modal
  }

  getPlanet(planets[1], planetOneEl);
  getPlanet(planets[2], planetTwoEl);
  getPlanet(planets[3], planetThreeEl);

}

// Random Species Encounter. Pop up the modal for being stopped by a group of a random species. This is populated by using API calls to pick a random species. Need to check if any criteria are needed (maybe some species aren't spacefaring?). Displays a message saying that a group of [species name] have yanked your ship out of hyperspace. They're willing to let you go if you perform a random task. This task is populated by pulling a random task from the Bored API (criteria TBD). Call reachDestination(). Parameters - none
function randomSpeciesEncounter() {

}
//kerri making math things
/*while (creature.length < 3) {
    var randomCreatureNum = (Math.floor(Math.random() * 20) + 1).toString();
    if (creatures.indexOf(randomCreatureNum) === -1) {
      planets.push(randomPlanetNum);
    }
  }*/

/*var randomSpeciesEncounter = function(min, max) {
    var value = Math.floor(Math.random() * (max - min) + min);
  
    return value;
  };*/




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