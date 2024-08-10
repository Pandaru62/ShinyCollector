const urlParams = new URLSearchParams(window.location.search);
let pkmNumber = urlParams.get('num') || 1;


loadInfo(pkmNumber);



function loadInfo(pkmNumber) {
    // Using Fetch API to make a GET request
    fetch('https://tyradex.tech/api/v1/pokemon/' + pkmNumber)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(pokemon => {
            const previousPkmn = pokemon.pokedex_id !== 1 ? pokemon.pokedex_id - 1 : 'none'; 
            const nextPkmn = pokemon.pokedex_id !== 1025 ? pokemon.pokedex_id + 1 : 'none' ;

            let currentCount = parseInt(localStorage.getItem(pkmNumber)) || 0;

            // navigation in the dex

            const dexNav = document.getElementById("dex-nav");

            dexNav.innerHTML = 
                    `
                    <div class="row justify-content-between align-items-center text-center">
                        <button id="previous-btn" class="col-1 btn btn-primary"><</button>
                        <div class="col-1 sprite-dexnav" id="previoussprite">${pkmNumber !== 1 ? `<img height="50" src="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${previousPkmn}/shiny.png">` : ``}</div>
                        <div class="col-8">
                            <b class="pkmId"># ${pokemon.pokedex_id}</b><br>
                            <b class="pkmEngName">${pokemon.name.en}</b> / <i class="pkmFrName">FR : ${pokemon.name.fr}</i>
                        </div>
                        <div class="col-1 sprite-dexnav" id="nextsprite">${pkmNumber !== 1025 ? `<img height="50" src="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${nextPkmn}/shiny.png">` : ``}</div>
                        <button id="next-btn" class="col-1 btn btn-primary">></button>
                    </div>
                    `;

            if(pkmNumber === 1) {
                document.getElementById('previous-btn').classList.add('d-none');
                document.getElementById('previoussprite').remove();
            } else if (pkmNumber === 1025) {
                document.getElementById('next-btn').classList.add('d-none');
                document.getElementById('nextsprite').remove();
            }


            const spritesSection = document.getElementById("sprites-section");
            spritesSection.innerHTML = `
            <div>
                <div class="d-flex align-items-center justify-content-center">
                    <span class="bg-primary rounded-4 px-5 py-2 m-3">SHINY</span>
                </div>
                <div id="shinySprite" class="sprite-bg mb-3">
                    <div class="middle-round-pkball"></div>
                    <div class="middle-sep-pkball"></div>
                    <img class="pkmn-sprite" src="${pokemon.sprites.shiny}" alt="image du pokémon chromatique ${pokemon.name.fr}">
                </div>
            </div>
            <div>
                <div class="d-flex align-items-center justify-content-center">
                    <span class="bg-primary rounded-4 px-5 py-2 m-3">NORMAL</span>
                </div>
                <div id="regularSprite" class="sprite-bg mb-3">
                    <div class="middle-round-pkball"></div>
                    <div class="middle-sep-pkball"></div>
                    <img class="pkmn-sprite" src="${pokemon.sprites.regular}" alt="image du pokémon normal ${pokemon.name.fr}">
                </div>
            </div>
            `;

            const infoList = document.getElementById('info-list');
            infoList.innerHTML = `
            <li><span class="list-title">Types</span> : <img src="${pokemon.types[0].image}" alt="type" class="pkmn-type">
                        ${pokemon.types[1] ? `<img src="${pokemon.types[1].image}" alt="type" class="pkmn-type"><br>` : ''}</li>
            <li><span class="list-title">Catégorie</span> : ${pokemon.category}</li>
            <li><span class="list-title">Talents</span> : ${pokemon.talents[0].name} ${pokemon.talents[1] ? '/ ' + pokemon.talents[1].name : ''}</li>
            <li><span class="list-title">Groupes oeufs</span> : ${pokemon.egg_groups !== null ? pokemon.egg_groups[0] : 'Pokémon non reproductible'} ${pokemon.egg_groups !== null && pokemon.egg_groups[1] ? '/ ' + pokemon.egg_groups[1] : ''}</li>
            <li><span class="list-title">Stats</span> :
                <canvas id="statsBar" width="400" height="100"></canvas>
            </li>
            `;

            // chart config
            
            
            const ctx = document.getElementById('statsBar').getContext('2d');
            const statsBar = new Chart(ctx, {
                type: 'bar', 
                data: {
                    labels: ['ATTAQUE', 'ATTAQUE SP.', 'DEFENSE', 'DEFENSE SP', 'VITESSE'],
                    datasets: [{
                        label: '', 
                        data: [pokemon.stats.atk, pokemon.stats.spe_atk, pokemon.stats.def, pokemon.stats.spe_def, pokemon.stats.vit], 
                        backgroundColor: [
                            'rgba(255, 99, 132)',
                            'rgba(161, 251, 142)',
                            'rgba(195, 195, 195)',
                            'rgba(75, 192, 192)',
                            'rgba(153, 102, 255)'
                        ],
                        borderWidth: 1
                    }]
                },

                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            beginAtZero: true,
                            max: 255,
                            grid: {
                                display: false 
                            },
                            ticks: {
                                display: false  
                            },
                            title: {
                                display: false 
                            },
                            border: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false  
                            },
                            ticks: {
                                display: true,
                                font: {
                                    weight: 'bold',
                                    size: 14
                                }
                            },
                            title: {
                                display: false 
                            },
                            border: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false 
                        },
                    },
                }
            });

            // shiny count

            const pokemonCount = document.getElementById('pokemon-count');
            pokemonCount.innerHTML = `
            <button class="addPokemon" id="addPokemon${pkmNumber}"><i class="bi bi-plus-circle"></i></button>
            <span class="countPokemon" id="countPokemon${pkmNumber}">Vous avez ${currentCount} ${pokemon.name.fr} chromatique(s).</span>
            <button class="deletePokemon" id="deletePokemon${pkmNumber}"><i class="bi bi-dash-circle"></i></button>
            `

            // Add event listener for Add Pokemon button
            const addPokemonButton = document.querySelector(`#addPokemon${pkmNumber}`);
            addPokemonButton.addEventListener('click', () => {
                currentCount++;
                localStorage.setItem(pkmNumber, currentCount);
                document.querySelector(`#countPokemon${pkmNumber}`).innerText = `Vous avez ${currentCount} ${pokemon.name.fr} chromatique(s).`;
            });

            // Add event listener for Delete Pokemon button
            const deletePokemonButton = document.querySelector(`#deletePokemon${pkmNumber}`);
            deletePokemonButton.addEventListener('click', () => {
                if (currentCount > 0) {
                    currentCount--;
                    localStorage.setItem(pkmNumber, currentCount);
                    document.querySelector(`#countPokemon${pkmNumber}`).innerText = `Vous avez ${currentCount} ${pokemon.name.fr} chromatique(s).`;
                }
            });

            const previousButton = document.getElementById('previous-btn')
            previousButton.addEventListener('click', () => {
                loadInfo(pkmNumber - 1);
            })

            const nextButton = document.getElementById('next-btn')
            nextButton.addEventListener('click', () => {
                loadInfo(pkmNumber + 1);
            })

            // evolution section

            const currentPokemonSprite = document.getElementById("currentPokemonSprite");
            currentPokemonSprite.innerHTML = `
            <div class="sprite-background">
                <img height="50" src="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pokemon.pokedex_id}/shiny.png">
            </div>
            `;

            const evolCondition = document.querySelector('.evol-condition');
            const evolutionPokemonSprite = document.getElementById("evolutionPokemonSprite");

            if (pokemon.evolution.next) {
            
            evolCondition.innerHTML = `
                
                <div>${pokemon.evolution.next[0].condition}</div>
                <div class="arrow-container">
                    <div class="arrow-line"></div><div class="arrow-right"></div>
                </div>
            `;

            evolutionPokemonSprite.innerHTML = `
            <div class="sprite-background">
                <img height="50" src="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${pokemon.evolution.next[0].pokedex_id}/shiny.png">
            </div>
            `;
            } else {
                evolCondition.innerText = "Pas d'évolution";
            }

    } )  
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}


