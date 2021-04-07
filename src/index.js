window.onload = () => {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    }
}

const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "/coffee1.jpg" },
  { name: "Voluptatem", image: "/coffee1.jpg" },
  { name: "Explicabo", image: "/coffee1.jpg" },
  { name: "Rchitecto", image: "/coffee1.jpg" },
  { name: " Beatae", image: "/coffee1.jpg" },
  { name: " Vitae", image: "/coffee1.jpg" },
  { name: "Inventore", image: "/coffee1.jpg" },
  { name: "Veritatis", image: "/coffee1.jpg" },
  { name: "Accusantium", image: "/coffee1.jpg" },
]

// ---------------------------------------------

const showCoffees = () => {
  let output = ""

  coffees.forEach(
    ({ name, image }) =>
      (output += `
          <div class="card">
            <img class="card--avatar" src=${image} />
            <h1 class="card--title">${name}</h1>
            <a class="card--link" href="#">Taste</a>
          </div>
          `)
  )

  container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showCoffees)

