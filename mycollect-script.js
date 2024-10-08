function retrieveCollectionById() {
    let collection = [];

    for (let i = 0; i < localStorage.length; i++) {
        const pkmnId = localStorage.key(i);
        const pkmnQuantity = localStorage.getItem(pkmnId);
        
        if(pkmnQuantity >0) {
        collection.push(pkmnId);
        }
    }
    return collection.sort((a, b) => a - b);
}

let myShinyCollection = retrieveCollectionById();
console.log(localStorage);


loadCollection(myShinyCollection);

function loadCollection(collection) {
    const myCollectionSection = document.getElementById('pokemon-list');
    myCollectionSection.innerHTML = ''; // Clear existing content before loading new collection

    let fetchPromises = collection.map(caughtPokemon => {
        return fetch('https://tyradex.tech/api/v1/pokemon/' + caughtPokemon)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            });
    });

    Promise.all(fetchPromises)
        .then(pokemons => {
            // pokemons array will be in the same order as the collection array
            pokemons.forEach(pokemon => {
                const pokeId = pokemon.pokedex_id;
                let currentCount = parseInt(localStorage.getItem(pokeId)) || 0; // Parse as integer

                // Create list item for the Pokémon
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div class="pkmn-background ${currentCount > 0 ? 'sprite-bg-caught' : 'sprite-bg'}">
            <div class="middle-round-pkball"></div>
            <div class="middle-sep-pkball"></div>
            <img class="pkmn-sprite" src="${pokemon.sprites.shiny || pokemon.sprites.regular}" alt="${pokemon.name.fr}">
        </div>
        <div class="small-screen">
            <div class="d-block d-md-flex flex-md-column pkm-identity">
                <b># ${pokemon['pokedex_id']}</b>
                <b>${pokemon['name']['en']}</b>
                <i>FR: ${pokemon['name']['fr']}</i>
            </div>
            <div>
                <img src="${pokemon.types[0].image}" alt="type" class="pkmn-type">
                ${pokemon.types[1] ? `<img src="${pokemon.types[1].image}" alt="type" class="pkmn-type"><br>` : ''}
            </div>
            <div class="pkm-collection mb-2">
                <button class="addPokemon" id="addPokemon${pokemon['pokedex_id']}"><i class="bi bi-plus-circle"></i></button>
                <span class="countPokemon" id="countPokemon${pokemon['pokedex_id']}">x${currentCount}</span>
                <button class="deletePokemon" id="deletePokemon${pokemon['pokedex_id']}"><i class="bi bi-dash-circle"></i></button>
            </div>
        </div>
        <div>
            <a href="/pokedex?num=${pokemon['pokedex_id']}" class="btn accesspage"><span class="d-none d-md-inline">See more</span><span class="d-inline d-md-none""><i class="bi bi-eye"></i></span></a>
        </div>
                `;
                myCollectionSection.appendChild(listItem);

                // Add event listener for Add Pokemon button
                const addPokemonButton = listItem.querySelector(`#addPokemon${pokeId}`);
                addPokemonButton.addEventListener('click', () => {
                    currentCount++;
                    localStorage.setItem(pokeId, currentCount);
                    listItem.querySelector(`#countPokemon${pokeId}`).innerText = `x${currentCount}`;
                });

                // Add event listener for Delete Pokemon button
                const deletePokemonButton = listItem.querySelector(`#deletePokemon${pokeId}`);
                deletePokemonButton.addEventListener('click', () => {
                    if (currentCount > 0) {
                        currentCount--;
                        localStorage.setItem(pokeId, currentCount);
                        listItem.querySelector(`#countPokemon${pokeId}`).innerText = `x${currentCount}`;
                    }
                });
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
