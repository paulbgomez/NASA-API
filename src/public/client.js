// 1º Charge all the elements // OK
// Global variables
window.onload = function(){
    startApp();
}

const rovers = ['curiosity', 'opportunity', 'spirit'];

let state = {
    roverSelection: '',
};

// ------------------------------------------------------  FUNCTIONS
const startApp = () => {
    renderMenu();
};

const renderMenu = () => {
    const containerMenuItems = document.getElementById('menu-items');
    let menuHTML = '';
    menuHTML += `<button class="nav-link home">Home</button>`;
        for (let i = 0; i < rovers.length; i++) {
            menuHTML += `<button class="nav-link" data-name="${rovers[i]}">${rovers[i]}</button>`;
        }
    containerMenuItems.innerHTML = menuHTML;
    let arrayButtons = document.getElementsByClassName('nav-link');
        for (let i = 0; i < arrayButtons.length; i++) {
            arrayButtons[i].addEventListener('click', loadRover);
        }
}

const updateState = (state, newState) => {
    state = Object.assign(state, newState);
    renderRover(state);
}

// ------------------------------------------------------  COMPONENTS

function loadRover(){

    //Get the name of the selected rover
    state.roverSelection = this.dataset.name;

    //Call to the API
    getInfoRovers(state);
}

function renderRover(state){

    //Get API photos
    let photos = state.state.latest_photos;

    // Map photo URLS to use afterwards with HTML function
    const URL = photos.map(photo => photo.img_src);

    // Put rover data inside an object to display in a HTML
    const data = {
        name: photos[0].rover.name,
        launchDate: photos[0].rover.launch_date,
        landingDate: photos[0].rover.landing_date,
        missionStatus: photos[0].rover.status,
        photoDate: photos[0].earth_date
    }

    const displayRoverInfo = () => {
        let containerRover = document.getElementById('rover');
        containerRover.innerHTML = `<img src="./assets/${state.roverSelection}.jpeg" class="img-fluid" alt="image rover">
                                        <h1 class="text-center" >Name: ${data.name}</h1>
                                        <h2 class="text-center" >Launch date: ${data.launchDate}</h2>
                                        <h2 class="text-center" >Landing date: ${data.landingDate}</h2>
                                        <h2 class="text-center" >Mission status: ${data.missionStatus}</h2>
        `
    }
    
    const displayImg = () => {
        let containerRoverPhotos = document.getElementById('rover-photos');
        console.log(URL[0]);
        let x ='';
        x +=`<div class="carousel-item active">
                <img src="${URL[0]}" class="d-block w-100" >
            </div>`;
        x += URL.map((url) => `
          <div class="carousel-item">
            <img src="${url}" class="d-block w-100" >
          </div>`);
        x += `  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>`
        containerRoverPhotos.innerHTML = x;
        console.log(containerRoverPhotos)
    }

    displayRoverInfo();
    displayImg();

}

// ------------------------------------------------------  HIGUER ORDER FUNCTIONS

//Crear funciones que reciban otras funciones por parametro. Funcional


// ------------------------------------------------------  API CALLS

const getInfoRovers = (state) => {
    fetch(`rover-photos/${state.roverSelection}`)
        .then(res => res.json())
        .then(roverData => updateState(state, roverData));
}
