// header config

const headerHtml = document.getElementById("header");
const navItem = document.createElement('nav');

navItem.innerHTML = 
`
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <div class="logo">SHINY COLLECTOR</div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarScroll">
      <ul class="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/generationsearch">Search by generation</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/gamessearch">Search by games</a>
        </li>
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/mycollection">My shiny collection</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

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

