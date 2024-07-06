let pkmNumber = 1;

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
        .then(pokedexEntry => {
            console.log(pokedexEntry);
            const dexTitle = document.getElementById("dex-title");
            dexTitle.innerText = "(#" + pokedexEntry.pokedex_id + ") " + pokedexEntry.name.en + " / " + pokedexEntry.name.fr;
            const dexInfo = document.getElementById("dex-info");
            // dexInfo.innerHTML = 
            // `
            // <div class="sprite-bg">
            //     <div class="middle-round-pkball"></div>
            //     <div class="middle-sep-pkball"></div>
            //     <img class="pkmn-sprite" src="${pokedexEntry.sprites.shiny || pokedexEntry.sprites.regular}" alt="${pokedexEntry.name.fr}">
            // </div>
            // <br>
            // <b># ${pokedexEntry.pokedex_id}</b><br>
            // <b>${pokedexEntry.name.en}</b> <i>FR: ${pokedexEntry.name.fr}</i><br>
            // <div>
            //     <img src="${pokedexEntry.types[0].image}" alt="type" class="pkmn-type">
            //     ${pokedexEntry.types[1] ? `<img src="${pokedexEntry.types[1].image}" alt="type" class="pkmn-type"><br>` : ''}
            // </div>
            // `
    } )  
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

