let genNumber = 1;
changeGen(genNumber);

// h2 title

const genInputForm = document.getElementById("genInputForm");

genInputForm.addEventListener("submit", (SubmitEvent) => {
    SubmitEvent.preventDefault();
    let selectedGen = document.querySelector('input[name="genInput"]:checked').value;
    let catchFilter = document.querySelector('input[name="caughtInput"]:checked').value;
    genNumber = selectedGen.slice(-1);
    changeGen(genNumber, catchFilter);
});

function changeGen(genNumber, catchFilter) {
    const generationTitle = document.querySelector(".generationTitle");
    generationTitle.innerText = "Generation " + genNumber;
    
    fetch('https://tyradex.tech/api/v1/gen/' + genNumber)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(pkmnList => {
            let listSection = document.getElementById('pokemon-list');
            listSection.innerHTML = '';

            switch (catchFilter) {
                case 'caughtPkm':
                    for (const pokemon of pkmnList) {
                        let currentCount = parseInt(localStorage.getItem(pokemon['pokedex_id'])) || 0;
                        let lastCaughtDate = parseInt(localStorage.getItem(lastCaughtDate)) || 0;

                        if (currentCount > 0) {
                            let listItem = createPokemonListItem(pokemon, currentCount);
                            listSection.appendChild(listItem);
                        }
                    }
                    break;
                case 'uncaughtPkm':
                    for (const pokemon of pkmnList) {
                        let currentCount = parseInt(localStorage.getItem(pokemon['pokedex_id'])) || 0;
                        if (!currentCount) {
                            let listItem = createPokemonListItem(pokemon, 0);
                            listSection.appendChild(listItem);
                        }
                    }
                    break;
                default:
                    for (const pokemon of pkmnList) {
                        let currentCount = parseInt(localStorage.getItem(pokemon['pokedex_id'])) || 0;
                        let listItem = createPokemonListItem(pokemon, currentCount);
                        listSection.appendChild(listItem);
                    }
            }

            const addPokemonButtons = document.querySelectorAll('.addPokemon');
            const deletePokemonButtons = document.querySelectorAll('.deletePokemon');

            addPokemonButtons.forEach(button => {
                button.addEventListener('click', () => {
                    let selectedId = button.id.slice(10);
                    let countSpan = document.getElementById(`countPokemon${selectedId}`);
                    let currentCount = parseInt(localStorage.getItem(selectedId)) || 0;

                    currentCount++;

                    localStorage.setItem(selectedId, currentCount);
                    countSpan.innerText = `x${currentCount}`;

                    const catchIndicator = countSpan.closest('li').querySelector('.catchIndicator');
                    if (currentCount > 0) {
                        catchIndicator.classList.remove('isNotCaught');
                        catchIndicator.classList.add('isCaught');
                    }
                });
            });

            deletePokemonButtons.forEach(button => {
                button.addEventListener('click', () => {
                    let selectedId = button.id.slice(13);
                    let countSpan = document.getElementById(`countPokemon${selectedId}`);
                    
                    if (countSpan) {
                        let currentCount = parseInt(localStorage.getItem(selectedId)) || 0;

                        if (currentCount > 0) {
                            currentCount--;
                        }

                        localStorage.setItem(selectedId, currentCount);
                        countSpan.innerText = `x${currentCount}`;

                        const catchIndicator = countSpan.closest('li').querySelector('.catchIndicator');
                        if (currentCount === 0) {
                            catchIndicator.classList.remove('isCaught');
                            catchIndicator.classList.add('isNotCaught');
                        }
                    } else {
                        console.error(`No count span found for ID: countPokemon${selectedId}`);
                    }
                });
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function createPokemonListItem(pokemon, currentCount) {
    let listItem = document.createElement('li');
    listItem.innerHTML = `
        <div class="pkmn-background ${currentCount > 0 ? 'sprite-bg-caught' : 'sprite-bg'}">
            <div class="middle-round-pkball"></div>
            <div class="middle-sep-pkball"></div>
            <img class="pkmn-sprite" src="${pokemon.sprites.shiny || pokemon.sprites.regular}" alt="${pokemon.name.fr}">
        </div>
        <br>
        <b># ${pokemon['pokedex_id']}</b><br>
        <div>
            <span class="catchIndicator ${currentCount > 0 ? 'isCaught' : 'isNotCaught'}"></span>
            <b>${pokemon['name']['en']}</b><br>
            <i>FR: ${pokemon['name']['fr']}</i>
        </div>
        <div>
            <img src="${pokemon.types[0].image}" alt="type" class="pkmn-type">
            ${pokemon.types[1] ? `<img src="${pokemon.types[1].image}" alt="type" class="pkmn-type"><br>` : ''}
        </div>
        <div class="pkm-collection">
            <button class="addPokemon" id="addPokemon${pokemon['pokedex_id']}"><i class="bi bi-plus-circle"></i></button>
            <span class="countPokemon" id="countPokemon${pokemon['pokedex_id']}">x${currentCount}</span>
            <button class="deletePokemon" id="deletePokemon${pokemon['pokedex_id']}"><i class="bi bi-dash-circle"></i></button>
        </div>
    `;
    return listItem;
}
