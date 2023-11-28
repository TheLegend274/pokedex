// Define a constant for the maximum number of Pokemon to fetch
const MAX_POKEMON = 600;

// Get references to HTML elements
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");

// Create an array to store all Pokemon data
let allPokemons = [];

// Fetch Pokemon data from the PokeAPI
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    // Store the fetched Pokemon data in the 'allPokemons' array
    allPokemons = data.results;
    
    // Display the initial list of Pokemon
    displayPokemons(allPokemons);
  });

// Function to fetch additional Pokemon data before redirecting to the detail page
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    // Use Promise.all to fetch data for the Pokemon and its species concurrently
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json()),
    ]);
    return true; // Return true if the data is fetched successfully
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}

// Function to display a list of Pokemon
function displayPokemons(pokemon) {
  // Clear the existing content of the list wrapper
  listWrapper.innerHTML = "";

  // Iterate through each Pokemon and create HTML elements for display
  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
    `;

    // Add a click event listener to each list item for redirection to the detail page
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        // Redirect to the detail page with the Pokemon ID as a parameter
        window.location.href = `./detail.html?id=${pokemonID}`;
      }
    });

    // Append the list item to the list wrapper
    listWrapper.appendChild(listItem);
  });
}

// Event listener for the search input to filter Pokemon based on user input
searchInput.addEventListener("keyup", handleSearch);

// Function to handle the search functionality
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  // Check which filter is selected (number or name) and filter the Pokemon accordingly
  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    // If no filter is selected, display all Pokemon
    filteredPokemons = allPokemons;
  }

  // Display the filtered list of Pokemon
  displayPokemons(filteredPokemons);

  // Show or hide the "not found" message based on the search results
  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

// Event listener for the close button to clear the search input
const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

// Function to clear the search input and display all Pokemon
function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}
