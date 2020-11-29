// 1º Charge all the elements // OK
// Global variables

const divMain = document.getElementById('div-main');
const homeImage = document.getElementById('home-image')

window.onload = function(){
    renderMenu();
    render(divMain, state);
}
// eslint-disable-next-line no-undef
let state = {
    roverSelection: '',
    // eslint-disable-next-line no-undef
    rovers: Immutable.List(['Curiosity', 'Spirit', 'Opportunity']),
}

// ------------------------------------------------------  FUNCTIONS

const renderMenu = () => {
    const containerMenuItems = document.getElementById('menu-items');
    let menuHTML = '';
    menuHTML += `<ul class="navbar-nav">
    <li class="nav-item">
    <button id="home" class="nav-link">Home</button></li>`;
    state.rovers.map((name) => {
      return menuHTML += `<li class="nav-item">
      <button class="nav-link rovers" data-name="${name}">${name}</button>
      </li>`;  
    });
    menuHTML += `</ul>`
    containerMenuItems.innerHTML = menuHTML;
    const arrayButtons = document.getElementsByClassName('nav-link rovers');
        for (let i = 0; i < arrayButtons.length; i++) {
            arrayButtons[i].addEventListener('click', loadRover);
        }
    
        const buttonHome = document.getElementById('home');
        buttonHome.addEventListener('click', refreshHome);
}

const render = async(divMain, state) => {
    divMain.innerHTML = startApp(state);
}

const startApp = (state) => `
            <section>
                <h2 class="text-center font-weight-bold">Welcome to the Mars Rover App</h2>
                <h4 class="text-center font-weight-medium">See what the rovers have discovered with your own eyes.</h4>
                ${renderRover(state)}
            </section>
            `

const updateState = (state, newState) => {
    state = Object.assign(state, newState);
    renderRover(state);
};

// ------------------------------------------------------  COMPONENTS
function refreshHome() {
    const paintHome = (divMain, renderSpaceImage) => {
         return divMain.innerHTML = 
        `
        <div>
        ${renderSpaceImage()}
        </div>
        `
    };

    const renderSpaceImage = () => `<img id="home-image" class="img-fluid" src="https://www.nationalgeographic.com/content/dam/magazine/rights-exempt/2020/10/departments/explore/departments-stellar-map-galaxy.adapt.1900.1.jpg"/>`

    paintHome(divMain, renderSpaceImage);
}

function loadRover(){
    //Get the name of the selected rover
    state.roverSelection = this.dataset.name;

    //Call to the API
    getInfoRovers(state);
}

function renderRover(state){

    //No rover is selcted, create a rover grid images. I need to refer to a HOF
    if (!state.roverSelection) {
        return (`<div class="text-center font-weight-small">
                    Please select a Rover from the menu
                </div>`);
    }

    else {

        homeImage.style.display = 'none';
        //Get API photos
        const photos = state.state.latest_photos;

        // Map photo URLS to use afterwards with HTML function
        const urlPhotos = photos.map(photo => photo.img_src);

        // Put rover data inside an object to display in a HTML
        const data = {
            name: photos[0].rover.name,
            launchDate: photos[0].rover.launch_date,
            landingDate: photos[0].rover.landing_date,
            missionStatus: photos[0].rover.status,
            photoDate: photos[0].earth_date
        }

        const displayRoverInfo = () => 
        `<img src="./assets/${state.roverSelection}.jpeg" class="img-fluid" alt="image rover">
            <div id="data-info">
                <h2 class="text-center font-weight-bold">Name: ${data.name}</h2>
                <h4 class="text-center font-weight-normal">Launch date: ${data.launchDate}</h2>
                <h4 class="text-center font-weight-normal">Landing date: ${data.landingDate}</h2>
                <h4 class="text-center font-weight-normal">Mission status: ${data.missionStatus}</h2>
            </div>
        `;

        return divMain.innerHTML =  (`
            <div id="rover-container">
                <div id="rover">
                    ${displayRoverInfo()}
                </div>
                <div class="container">
                    ${createImgContainer(state.roverSelection, "row", urlPhotos, displayImg)}
                </div>
            </div>
            `);
    }
}

// HOF

const createImgContainer = (state, divClassBootstrap, array, displayImg) => {
                                                                                return (`
                                                                                <div class="${divClassBootstrap}">
                                                                                    ${displayImg(state, array)}
                                                                                </div>
                                                                            `)}
    
const displayImg = (state, array) => {
    if(array.length < 3){
        const imageElements = array.map((url) =>{
            return (`  
                    <div id="image-container" class="col-sm">
                        <img src="${url}" alt="Image from Mars taken by the ${state} Rover"/>
                    </div>
                    `);
                });
        return imageElements.reduce( (a,b) => a+b );
            }
    const imageElements = array.map((url) =>{
        return (`  
                <div id="image-container" class="col-sm-4">
                    <img src="${url}" alt="Image from Mars taken by the ${state} Rover"/>
                </div>
                `);
            });
    return imageElements.reduce( (a,b) => a+b );
}

// ------------------------------------------------------  API CALLS

const getInfoRovers = (state) => {
    fetch(`rover-photos/${state.roverSelection}`)
        .then(res => res.json())
        .then(roverData => updateState(state, roverData));
}
