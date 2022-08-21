// Variables
var characterName;
var homeworld;
var starships = []; // Array of API URLs for vehicles associated with the character
var destinationName;
var destinationClimate;
var destinationURL;
var chooseDestButtonEl = document.querySelector("#choose-dest-button");
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
var reachDestinationModalEl = document.querySelector("#modal-reach-destination");
var startCrawlButtonEl = document.querySelector("#start-crawl");
startCrawlButtonEl.addEventListener("click", startCrawl);
var reachDestPlanetTextEl = document.querySelector("#reach-dest-planet-text");

var crawlCharacterEl = document.querySelector("#crawl-character");
var crawlStarShipEl = document.querySelector("#crawl-starship")
var crawlDestinationEl = document.querySelector("#crawl-destination");
var crawlSpeciesEl = document.querySelector("#crawl-species");
var crawlHomeworldEl = document.querySelector("#crawl-homeworld");
var crawlModalEl = document.querySelector("#modal-story-crawl");

var trueButtonEl = document.querySelector("#true-button");
trueButtonEl.addEventListener("click", reachDestination);
var falseButtonEl = document.querySelector("#false-button");
falseButtonEl.addEventListener("click", reachDestination);
var creatureInteractionModalEL = document.querySelector("#modal-creature-interaction");
var closeCrawlButtonEl = document.querySelector("#close-crawl")
closeCrawlButtonEl.addEventListener("click", closeCrawl);
var crawlEpisodeTextEl = document.querySelector("#episode-number");

var startAdvButtonEl = document.querySelector("#start-adv-button");
startAdvButtonEl.addEventListener("click", startAdventure);
var characterURL;

var encounterSpecies;
var encounterTask;
var encounterAnswer;
var encounterCorrectAnswer;
var quizResult;
var chosenPlanetCreatureInteractionEl = document.querySelector("#chosen-planet-text");
var encounterTaskEl = document.querySelector("#encounter-task-text");
var encounterQuizResultEl = document.querySelector("#quiz-result");
var isYouTextEl = document.querySelector("#is-you-text");
var correctCount;
var correctCountEl = document.querySelector("#correct-count-text");

// Functions

// Pop up the modal for Choose Your Character. 3 random character names (from a predetermined list) will be displayed. A character can be chosen by clicking anywhere in the container for that character. Clicking on that character stores the character name, character number, homeworld, and starships in global variables. 
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

// Choose your Spacecraft. Pop up the modal for Choosing your Spacecraft. This is populated using API calls to the starships API. A call needs to be made for each starship. Display the names of starships. Clicking on a button saves the name of the starship to starshipName variable. 

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



    chooseStarshipModalEL.classList.remove("is-active"); // Hides the modal
    startAdvButtonEl.classList.add("is-hidden");
    chooseSpacecraftButtonEl.classList.add("is-hidden");
    chooseDestButtonEl.classList.remove("is-hidden");
    encounterButtonEl.classList.add("is-hidden");
  }

  // Logic to handle cases with less than 3 starships
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

// Choose your destination planet. Pop up the modal for Choosing your destination. This is populated by using API calls to pick 3 unique random planets. These cannot be the homeworld. Need logic to check if homeworld and/or if the planet has already been chosen. Displays each planet name and a circle. A planet can be chosen by clicking anywhere in the container for that planet. Call randomSpeciesEncounter. 

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

  // Makes a fetch request to the planets API. Sets the data attributes for name, climate, and url using api response data and then makes the modal active. 
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

    chooseDestModalEL.classList.remove("is-active"); // Hides the modal
    startAdvButtonEl.classList.add("is-hidden");
    chooseSpacecraftButtonEl.classList.add("is-hidden");
    chooseDestButtonEl.classList.add("is-hidden");
    encounterButtonEl.classList.remove("is-hidden");
     }

  getPlanet(planets[1], planetOneEl);
  getPlanet(planets[2], planetTwoEl);
  getPlanet(planets[3], planetThreeEl);

}

// Random Species Encounter. Pop up the modal for being stopped by a group of a random species. This is populated by using API calls to pick a random species. This species stops you and forces you to answer a true/false question in order to proceed. Question is obtained from opentdb API. Clicking true or false will call reachDestination()
function randomSpeciesEncounter(event) {
  event.preventDefault();
  var randomSpecies = (Math.floor(Math.random() * 37) + 1).toString();


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
        encounterSpecies = data.name;

        chosenSpeciesTextEl.textContent = encounterSpecies;
        var chosenSpeciesCreatureInteractionEl = document.querySelector("#chosen-species-text");
        chosenSpeciesCreatureInteractionEl.textContent = encounterSpecies;

      });
  }

  function getQuestion() {
    var queryURL = "https://opentdb.com/api.php?amount=1&category=9&type=boolean";

    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        encounterTask = data.results[0].question;
        encounterTaskEl.innerHTML = encounterTask;
        encounterCorrectAnswer = data.results[0].correct_answer;
      });
  }

  getSpecies(randomSpecies);
  getQuestion();


  chosenPlanetCreatureInteractionEl.textContent = destinationName;
  creatureInteractionModalEL.classList.add("is-active");
}

// Pop up a modal that will say whether or not the question was answered correctly. This is followed by a message about reaching your destination. Clicking Show Story button will call startCrawl()
function reachDestination(event) {
  encounterAnswer = event.target.dataset.answer;
  reachDestPlanetTextEl.textContent = destinationName;
  quizResult = encounterAnswer === encounterCorrectAnswer;
  if (quizResult) {
    encounterQuizResultEl.textContent = "You answer correctly and you are sent on your way to great fanfare by the " + encounterSpecies ;
    correctCount++;
  } else {
    encounterQuizResultEl.textContent = "The " + encounterSpecies + " are disgusted by your lack of knowledge and banish you from their presence."
  }
  creatureInteractionModalEL.classList.remove("is-active");
  reachDestinationModalEl.classList.add("is-active");
}

// Start crawl. Pops up a modal that will display a summary of the game in the "Star Wars Crawl" style. Summary includes persistent local storage variables for # of games played and # of questions answered correctly. Sets these variables to local storage. Clicking the Close Story button will hide the modal and run the init() function
function startCrawl() {
  reachDestinationModalEl.classList.remove("is-active");
  journeyCount++;
  localStorage.setItem("journey-count", JSON.stringify(journeyCount));
  localStorage.setItem("correct-count", JSON.stringify(correctCount));

  crawlCharacterEl.textContent = characterName;
  crawlStarShipEl.textContent = starshipName;
  crawlDestinationEl.textContent = destinationName;
  crawlSpeciesEl.textContent = encounterSpecies;
  crawlEpisodeTextEl .textContent = journeyCount;
  correctCountEl.textContent = correctCount;
  if (quizResult) {
    isYouTextEl.textContent = "A winner is you!"
  } else {
    isYouTextEl.textContent = "A loser is you!" 
  }

  crawlModalEl.classList.add("is-active");
}

function closeCrawl (){
  crawlModalEl.classList.remove("is-active");
  init();
}

// Initializes variables and display state of buttons and variable text fields
function init() {
  startAdvButtonEl.classList.remove("is-hidden");
  chooseSpacecraftButtonEl.classList.add("is-hidden");
  chooseDestButtonEl.classList.add("is-hidden");
  encounterButtonEl.classList.add("is-hidden");
  chosenCharacterTextEl.textContent = ""; 
  chosenStarshipTextEl.textContent = "";  
  chosenDestinationTextEl.textContent = ""; 
  encounterAnswer = null;
  encounterCorrectAnswer = null;
  quizResult = null;

  // Pull journey-count and correct-count from local storage and set variables journeyCount and correctCount equal to those values if they're not null
  var storedJourneyCount = JSON.parse(localStorage.getItem("journey-count"));
  var storedCorrectCount = JSON.parse(localStorage.getItem("correct-count"));
  if (storedJourneyCount !== null) {
    journeyCount = storedJourneyCount;
  } else {
    journeyCount = 0;
  }
  if (storedCorrectCount !== null) {
    correctCount = storedCorrectCount;
  } else {
    correctCount = 0;
  }
}

init();
