function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
    }
  
let pokemonNumber = getRandomInt(1, 1025);

const genInputForm = document.getElementById("genInputForm");

fetch('https://tyradex.tech/api/v1/pokemon/'+ pokemonNumber)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(myShinyPokemon => {

        const roundedElement = document.querySelector(".rounded-background")
        // const randomPkm = document.createElement('div');
        const pokeId = pokemonNumber;
        let currentCount = parseInt(localStorage.getItem(pokeId)) || 0;
        console.log(myShinyPokemon.types)

            roundedElement.innerHTML = `
                    <div class="sprite-bg">
                        <div class="middle-round-pkball"></div>
                        <div class="middle-sep-pkball"></div>
                        <img class="pkmn-sprite" src="${myShinyPokemon.sprites.shiny || myShinyPokemon.sprites.regular}" alt="${myShinyPokemon.name.fr}">
                    </div>
                    <br>
                    <b>#${pokeId}</b><br>
                    <b>${myShinyPokemon.name.en}</b> <i>FR: ${myShinyPokemon.name.fr}</i><br>
                    <div>
                        <img src="${myShinyPokemon.types[0].image}" alt="type" class="pkmn-type">
                        ${myShinyPokemon.types[1] ? `<img src="${myShinyPokemon.types[1].image}" alt="type" class="pkmn-type"><br>` : ''}
                    </div>
                    <div class="pkm-collection">
                        <button class="addPokemon" id="addPokemon${pokeId}"><i class="bi bi-plus-circle"></i></button>
                        <span class="countPokemon" id="countPokemon${pokeId}">x${currentCount}</span>
                        <button class="deletePokemon" id="deletePokemon${pokeId}"><i class="bi bi-dash-circle"></i></button>
                    </div>
                    <button class="accesspage">See more</button>
                `;

                // Add event listener for Add Pokemon button
                const addPokemonButton = roundedElement.querySelector(`#addPokemon${pokeId}`);
                addPokemonButton.addEventListener('click', () => {
                    currentCount++;
                    localStorage.setItem(pokeId, currentCount);
                    roundedElement.querySelector(`#countPokemon${pokeId}`).innerText = `x${currentCount}`;
                });

                // Add event listener for Delete Pokemon button
                const deletePokemonButton = roundedElement.querySelector(`#deletePokemon${pokeId}`);
                deletePokemonButton.addEventListener('click', () => {
                    if (currentCount > 0) {
                        currentCount--;
                        localStorage.setItem(pokeId, currentCount);
                        roundedElement.querySelector(`#countPokemon${pokeId}`).innerText = `x${currentCount}`;
                    }
                });
            })

    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

