// header config

const headerHtml = document.getElementById("header");
const navItem = document.createElement('nav');

navItem.innerHTML = `
    <h1 class="logo"><a href="index.html">Shiny Collector</a></h1>
        <ul>
            <li><a href="/generation.html">Search by generation</a></li>
            <li><a href="/games.html">Search by games</a></li>
            <li><a href="/mycollection.html">My shiny collection</a></li>
        </ul>
`

headerHtml.appendChild(navItem);

// footer config

const footerHtml = document.getElementById("footer");

footerHtml.innerHTML = `
        <ul>
            <li><a href="index.html">Legal notice</a></li>
            <li class="footername">By L. BUCHELET, 2024</li>
        </ul>
`

