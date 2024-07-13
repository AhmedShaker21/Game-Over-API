import {Category} from "./uiGame.js"
import { Game } from "./gameDetails.js"

(function () {
    displayGames('mmorpg')
})();


window.exit = exit;
let categories = document.getElementById('categories');
let gamesData = document.getElementById('gamesData');
let gameInfo = document.getElementById('gameInfo');
let loading = document.querySelector('.loading');
const navbar = document.querySelector('.navbar');

/* Display All Category and Games */
categories.addEventListener('click', function (clicked) {

    const navItem = document.querySelectorAll('.nav-item a');
    for (let i = 0; i < navItem.length; i++)
        navItem[i].classList.remove('active')

    loading.style.display = "flex"

    document.getElementById(clicked.target.id).classList.add('active');

    displayGames(clicked.target.id)

})

/* Display Game Details */
gamesData.addEventListener('click', function (clicked) {
    displayDetails(clicked.target.id)

})

async function displayGames(category) {

    let cartona = ``

    const objectCategory = new Category(category);
    let gamesArray = await objectCategory.getGames()
    if (gamesArray.length !== 0) {
        loading.style.display = "none"
    }
    for (let i = 0; i < gamesArray.length; i++) {
        cartona += `
        <div class="card h-100 bg-transparent col-md-3"  id="${gamesArray[i].id}" style="background-color:#272B30;" role="button"  >
        <img src=${gamesArray[i].thumbnail} class="card-img-top p-3 h-100 object-fit-cover " alt="..." id="${gamesArray[i].id}">
        <div class="card-body d-flex justify-content-between p-2 " id="id${i}">
        <h3 class="card-title text-white" id="${gamesArray[i].id}">${gamesArray[i].title}</h3>
        <span id="${gamesArray[i].id}" style="background-color: red; border-radius: 10px;" class="text-white p-2">
        Free</span>
        </div>
        <div id="${gamesArray[i].id}" class="game-details text-center p-3 overflow-hidden">
        <p id="${gamesArray[i].id}" >${gamesArray[i].short_description}</p>
        </div>
        <div id="${gamesArray[i].id}" class="card-footer d-flex justify-content-between align-items-center m-0 ">
        <span id="${gamesArray[i].id}" class="text-white p-1">${gamesArray[i].genre}</span>
        <span id="${gamesArray[i].id}" class="text-white p-1">${gamesArray[i].platform}</span>
        </div>
        </div>
        `
    }

    gamesData.innerHTML = cartona
}

async function displayDetails(gameid) {
    gameInfo.classList.remove('d-none')
    navbar.classList.add('d-none')
    gamesData.classList.add('d-none')
    loading.style.display = "flex"
    const game = new Game(gameid)
    let gameDetails = await game.getGameDetails()
    console.log(gameDetails)
    if (gameDetails.length !== 0) {
        loading.style.display = "none"
    }
    let cartonaDetails = ``

    cartonaDetails += `

    <div class="d-flex ps-5 ms-5 justify-content-between">
    <h2>Details Game</h2>
    <button class="btn fs-4" id="exit" onclick="exit()" ><i class="fas fa-xmark"></i></button>
    </div>

    <div class="col-md-4 offset-1 img vh-100">
    <img class="w-100" src=${gameDetails.thumbnail} alt="">
    </div>
    <div class="col-md-5 offset-2 vh-100 game-info">
    <h2>Title: ${gameDetails.title}</h2>
    <p>Category: <span>${gameDetails.genre}</span></p>
    <p>Platform: <span>${gameDetails.platform}</span></p>
    <p>Status: <span>${gameDetails.status}</span></p>
    <p>${gameDetails.description}</p>
    <a class="btn" href="${gameDetails.game_url}">Show Game</a>
    </div>

    `
    gameInfo.innerHTML = cartonaDetails

}
function exit() {
    gamesData.classList.remove('d-none')
    gameInfo.classList.add('d-none')
    navbar.classList.replace('d-none', 'd-flex')
}