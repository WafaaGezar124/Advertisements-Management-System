fetch("../components/header.html")
    .then(r => r.text())
    .then(d => document.querySelector("header").innerHTML = d);

fetch("../components/footer.html")
    .then(r => r.text())
    .then(d => document.querySelector("footer").innerHTML = d);
