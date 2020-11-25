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

    //HOF paintRovers
    const paintRovers = (displayRoverInfo, displayImg) => `
                                                            <section id="rover">
                                                                ${displayRoverInfo()}
                                                            </section>
                                                            <section>
                                                                <div class="container">
                                                                    <div id="image-container" class="row">
                                                                        ${displayImg()}
                                                                    </div>
                                                                  </div>
                                                            </section>
                                                            `;


    const displayRoverInfo = () => {
        let containerRover = document.getElementById('rover');
        containerRover.innerHTML = `<img src="./assets/${state.roverSelection}.jpeg" class="img-fluid" alt="image rover">
                                        <h1 class="text-center">Name: ${data.name}</h1>
                                        <h2 class="text-center">Launch date: ${data.launchDate}</h2>
                                        <h2 class="text-center">Landing date: ${data.landingDate}</h2>
                                        <h2 class="text-center">Mission status: ${data.missionStatus}</h2>
        `
    }
    
    const displayImg = () => {
        let containerRoverPhotos = document.getElementById('image-container');
        let html = '';
        if(URL.length < 3){
            for(let i = 0; i < URL.length; i++){
                html += `<div class="col-sm"><img src="${URL[i]}" alt="Image from Mars taken by the ${data.name} Rover"/></div>`;
            }
        }
        else{
            for(let i = 0; i < URL.length; i++){
                html += `<div class="col-sm-4"><img src="${URL[i]}" alt="Image from Mars taken by the ${data.name} Rover"/></div>`;
            }
        }

        containerRoverPhotos.innerHTML = html;
    }

    paintRovers(displayRoverInfo, displayImg);

    

}

// ------------------------------------------------------  API CALLS

const getInfoRovers = (state) => {
    fetch(`rover-photos/${state.roverSelection}`)
        .then(res => res.json())
        .then(roverData => updateState(state, roverData));
}
