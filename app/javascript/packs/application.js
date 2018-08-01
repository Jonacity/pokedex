/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

const box = document.getElementById("box");
const search = document.getElementById("search");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const url_list = "https://pokeapi.co/api/v2/pokemon-form/";

let current = 1;
let size = 18;
let max = 150;
let pokemons = [];
let pokemons_search = [];
let isFetched = false;

// Next button event
next.addEventListener("click", (event) => {
    if (current + size < max) {
        if (needToFetch(current + size)) {
            getSizePokemons(current + size, displayPokemons);
        } else {
            displayPokemons(current + size);
        }
    }
})

// Previous button event
previous.addEventListener("click", (event) => {
    if (current - size > 0) {
        if (needToFetch(current - size)) {
            getSizePokemons(current - size, displayPokemons);
        } else {
            displayPokemons(current - size);
        }
    }
})

// Check if fetch is needed
function needToFetch(next) {
    for (i = next; i < next + size; i++) {
        if (!pokemons[i]) {
            return true;
        } 
    }
    return false;
}

// Fetch a pokemon from the API
function getPokemon(id, callback, arg) {
    fetch(url_list + id)
    .then(response => response.json())
    .then((data) => {
        console.log(data);

        pokemons[data["id"]] = data;

        callback(arg);
    });
}

// Fetch pokemons for a size
function getSizePokemons(current_id, callback) {
    for (i = current_id; i < current_id + size; i++) {
        getPokemon(i, callback, current_id);
    }
}

// Loop to display the pokemons
function displayPokemons(start) {
    box.innerHTML = "";
    for (i = start; i < start + size; i++) {
        if (i <= 150) {
            pokemon = pokemons[i];
            if (pokemon) {
                displayPokemon(pokemon);
            } 
        }  
    }
    current = start;
}

// Insert a pokemon item in the html box
function displayPokemon(pokemon) {
    pokemon_name = pokemon["name"];
    pokemon_image = pokemon["sprites"]["front_shiny"];
    // pokemon_type = pokemon["version_group"]["name"];
    pokemon_id = pokemon["id"];

    item = `<div class="col-xs-12 col-sm-4">
                <div class="card-pokemon">
                    <p> ${pokemon_id}
                    - ${pokemon_name} </p>
                    <p><img src="${pokemon_image}"></p>
                </div>
            </div>`; 

    box.insertAdjacentHTML("beforeend", item);
}

// Display pokemons filtered by search input
function displaySearchPokemons() {
    value = search.value;
    let results_search = [];

    box.innerHTML = "";
    for (i = 1; i <= max; i++) {
        if (pokemons[i]) {
            if (pokemons[i]["name"].includes(value)) {
                displayPokemon(pokemons[i]);
                results_search.push(i);
            } 
        }
    }

    no_results = `<div class="no-results">
                        <p>No results found...</p>
                  </div>`; 

    if (!results_search.length) {
        box.innerHTML = no_results;
        previous.style.display = "none";
        next.style.display = "none";
    } else {
        previous.style.display = "initial";
        next.style.display = "initial";
    }
}

// Get search pokemon
function getSearchPokemons() {
    for (i = 1; i <= max; i++) {
        if (!pokemons[i]) {
            getPokemon(i, displaySearchPokemons);
        }     
    }
}

// Search input event
search.addEventListener("keyup", (event) => {
    if (search.value) {
        if (!isFetched) {
            getSearchPokemons();
            isFetched = true;
        } else {
            displaySearchPokemons();
        }
    } else {
        displayPokemons(current);
    }
})

function init() {
    getSizePokemons(current, displayPokemons);
}

init();