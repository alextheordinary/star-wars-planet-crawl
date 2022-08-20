// Initial js file for the project

// Variables
var characterName;
var characterNumber;
var starshipsUrl = "https://swapi.dev/api/starships/1";
var homeworld;
var starships = []; // Array of API URLs for vehicles associated with the character
// Variables for chooseDestination
var destinationName;
var destinationClimate;
var destinationURL;
var chooseDestButtonEl = document.querySelector("#choose-dest-button");
var logButtonEl = document.querySelector("#log-planet-one");
chooseDestButtonEl.addEventListener("click", chooseDestination);
var chooseSpacecraftButtonEl = document.querySelector('#choose-starship-button')
chooseSpacecraftButtonEl.addEventListener("click", chooseSpacecraft);
var encounterButtonEl = document.querySelector("#encounter-button");
encounterButtonEl.addEventListener("click", randomSpeciesEncounter);
var chosenCharacterTextEl = document.querySelector("#chosen-character-text");
var chosenStarshipTextEl = document.querySelector("#chosen-starship-text");
var chosenDestinationTextEl = document.querySelector("#chosen-destination-text");
var journeyCount;
var chosenSpeciesTextEl = document.querySelector("#chosen-species-text");
var chosenPlanet = document.querySelector("#chosenPlanet");
// var encounterTaskTextEl = document.querySelector('#encounterTask');
var reachDestinationModalEl = document.querySelector("#modal-reach-destination");
var startCrawlButtonEl = document.querySelector("#start-crawl");
startCrawlButtonEl.addEventListener("click", startCrawl);
var reachDestPlanetTextEl = document.querySelector("#reach-dest-planet-text");

var crawlCharacterEl = document.querySelector("#crawl-character");
var crawlStarShipEl = document.querySelector("#crawl-starship")
var crawlDestinationEl = document.querySelector("#crawl-destination");
var crawlSpeciesEl = document.querySelector("#crawl-species");
var crawlTaskEl = document.querySelector("#crawl-task");
var crawlHomeworldEl = document.querySelector("#crawl-homeworld");

var completeTaskButtonEl = document.querySelector("#completeTask");
completeTaskButtonEl.addEventListener("click", reachDestination);
var creatureInteractionModalEL = document.querySelector("#modal-creature-interaction");



// End variables for chooseDestination
// Variables for start adventure
var startAdvButtonEl = document.querySelector("#start-adv-button");
startAdvButtonEl.addEventListener("click", startAdventure);
var characterURL;
// End variables for start adventure
// Variables for randomSpeciesEncounter
var encounterSpecies;
var encounterTask;
// End variables for randomSpecies
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
  event.preventDefault();
  var startAdvModalEL = document.querySelector("#modal-start-adventure");
  var characters = ["1", "4", "9", "10", "11", "13", "14", "18", "19", "22", "25"];
  var charactersSelected = [];
  var charOneEl = document.querySelector("#character-1");
  var charTwoEl = document.querySelector("#character-2");
  var charThreeEl = document.querySelector("#character-3");


  while (charactersSelected.length < 3) {
    var randomCharNum = (Math.floor(Math.random() * characters.length)).toString();
    if (charactersSelected.indexOf(characters[randomCharNum]) === -1) {
      charactersSelected.push(characters[randomCharNum]);
    }
  }


  function getCharacter(charNum, charEl) {
    var queryURLBase = "https://swapi.dev/api/people";
    var queryURL = queryURLBase + "/" + charNum;

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        charEl.querySelector(".character-name").textContent = data.name;
        charEl.setAttribute("data-name", data.name);
        charEl.setAttribute("data-url", data.url);
        charEl.setAttribute("data-homeworld", data.homeworld);
        charEl.setAttribute("data-starships", data.starships.toString());
        charEl.addEventListener("click", makeChoice);
        startAdvModalEL.classList.add("is-active"); // Shows the modal
      });
  }

  function makeChoice(event) {
    var boxEl = event.target.closest(".box");
    charOneEl.removeEventListener("click", makeChoice);
    charTwoEl.removeEventListener("click", makeChoice);
    charThreeEl.removeEventListener("click", makeChoice);
    characterName = boxEl.dataset.name;
    characterURL = boxEl.dataset.url;
    starships = boxEl.dataset.starships.split(",");
    homeworld = boxEl.dataset.homeworld;
    chosenCharacterTextEl.textContent = 'You are now ' + characterName;
    console.log(characterName);
    console.log(characterURL);
    console.log(starships);
    console.log(homeworld);

    startAdvModalEL.classList.remove("is-active"); // Hides the modal
    startAdvButtonEl.classList.add("is-hidden");
    chooseSpacecraftButtonEl.classList.remove("is-hidden");
    chooseDestButtonEl.classList.add("is-hidden");
    encounterButtonEl.classList.add("is-hidden");
  }

  getCharacter(charactersSelected[0], charOneEl);
  getCharacter(charactersSelected[1], charTwoEl);
  getCharacter(charactersSelected[2], charThreeEl);


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
  starshipOneEl.querySelector(".starship-name").textContent = "";
  starshipTwoEl.querySelector(".starship-name").textContent = "";
  starshipThreeEl.querySelector(".starship-name").textContent = "";
  starshipTwoEl.setAttribute("data-name", "");
  starshipTwoEl.setAttribute("data-url", "");
  starshipThreeEl.setAttribute("data-name", "");
  starshipThreeEl.setAttribute("data-url", "");

  // max at 3 ships, if array is null don't run code

  function getSpacecraft(starshipNum, starshipEl) {
    var queryURL = starshipNum;

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
        starshipEl.classList.remove("is-hidden");
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
    chosenStarshipTextEl.textContent = 'Your starship is ' + starshipName;
    console.log(starshipName);
    console.log(starshipURL);



    chooseStarshipModalEL.classList.remove("is-active"); // Hides the modal
    startAdvButtonEl.classList.add("is-hidden");
    chooseSpacecraftButtonEl.classList.add("is-hidden");
    chooseDestButtonEl.classList.remove("is-hidden");
    encounterButtonEl.classList.add("is-hidden");
  }

  getSpacecraft(starships[0], starshipOneEl);
  if (typeof (starships[1]) === 'undefined') {
    starshipTwoEl.classList.add("is-hidden");
  } else {
    getSpacecraft(starships[1], starshipTwoEl);
  }
  if (typeof (starships[2]) === 'undefined') {
    starshipThreeEl.classList.add("is-hidden");
  } else {
    getSpacecraft(starships[2], starshipThreeEl);
  }
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
  planetOneEl.querySelector(".planet-name").textContent = "";
  planetTwoEl.querySelector(".planet-name").textContent = "";
  planetThreeEl.querySelector(".planet-name").textContent = "";


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
    chosenDestinationTextEl.textContent = 'Your destination is the planet ' + destinationName;
    console.log(destinationName);
    console.log(destinationClimate);
    console.log(destinationURL);

    chooseDestModalEL.classList.remove("is-active"); // Hides the modal
    startAdvButtonEl.classList.add("is-hidden");
    chooseSpacecraftButtonEl.classList.add("is-hidden");
    chooseDestButtonEl.classList.add("is-hidden");
    encounterButtonEl.classList.remove("is-hidden");
    chosenPlanet.textContent = destinationName;
  }

  getPlanet(planets[1], planetOneEl);
  getPlanet(planets[2], planetTwoEl);
  getPlanet(planets[3], planetThreeEl);

}

// Random Species Encounter. Pop up the modal for being stopped by a group of a random species. This is populated by using API calls to pick a random species. Need to check if any criteria are needed (maybe some species aren't spacefaring?). Displays a message saying that a group of [species name] have yanked your ship out of hyperspace. They're willing to let you go if you perform a random task. This task is populated by pulling a random task from the Bored API (criteria TBD). Call reachDestination(). Parameters - none
function randomSpeciesEncounter(event) {
  event.preventDefault();
  var randomSpecies = (Math.floor(Math.random() * 37)).toString();


  function getSpecies(speciesNum) {
    var queryURLBase = "https://swapi.dev/api/species/";
    var queryURL = queryURLBase + speciesNum;

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        encounterSpecies = data.name;
        console.log(encounterSpecies);

        chosenSpeciesTextEl.textContent = encounterSpecies;
        var chosenSpeciesCreatureInteractionEl = document.querySelector("#chosen-species-text");
        chosenSpeciesCreatureInteractionEl.textContent = encounterSpecies;

      });
  }

  function getActivity() {
    var queryURL = "http://www.boredapi.com/api/activity/";

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        console.log(data);
        encounterTask = data.activity;
        console.log(encounterTask);
        // encounterTaskTextEl.textContent = encounterTask;
        var encounterTaskEl = document.querySelector("#encounter-task-text");
        encounterTaskEl.textContent = encounterTask;

      });
  }

  getSpecies(randomSpecies);
  getActivity();


  // Displays creature encounter modal

  // var startJourneyButtonEl = document.querySelector("#encounter-button")


  var chosenPlanetCreatureInteractionEl = document.querySelector("#chosen-planet-text");
  chosenPlanetCreatureInteractionEl.textContent = destinationName;


 
  creatureInteractionModalEL.classList.add("is-active");


  // startJourneyButtonEl.addEventListener("click",creatureEncounter);



}

// Reach destination. Pop up the modal saying that you've reached your destination planet. Display a circle of the planet again in a larger size. Display a button to start the crawl summarizing the journey. Calls startCrawl(). Parameters - destination planet name and climate type
function reachDestination() {
  reachDestPlanetTextEl.textContent = destinationName;
  creatureInteractionModalEL.classList.remove("is-active");
  reachDestinationModalEl.classList.add("is-active");
}

// Start crawl. It's either animated or static text on black background. Depends on time. Implement last. Option to play again that would call startAdventure. Parameters - none
function startCrawl() {
  reachDestinationModalEl.classList.remove("is-active");
  journeyCount++;
  console.log(journeyCount);
  localStorage.setItem("journey-count", JSON.stringify(journeyCount));

crawlCharacterEl.textContent = characterName;
crawlStarShipEl.textContent = starshipName;
crawlDestinationEl.textContent = destinationName;
crawlSpeciesEl.textContent = encounterSpecies;
crawlTaskEl.textContent = encounterTask;
}

function init() {
  startAdvButtonEl.classList.remove("is-hidden");
  chooseSpacecraftButtonEl.classList.add("is-hidden");
  chooseDestButtonEl.classList.add("is-hidden");
  encounterButtonEl.classList.add("is-hidden");

  // Pull journey-count from local storage and set variable journeyCount equal to it if it's not null
  var storedJourneyCount = JSON.parse(localStorage.getItem("journey-count"));
  if (storedJourneyCount !== null) {
    journeyCount = storedJourneyCount;
  } else {
    journeyCount = 0;
  }

}

init();
