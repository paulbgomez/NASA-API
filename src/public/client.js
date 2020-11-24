// 1º Charge all the elements // OK
// Global variables
window.onload = function(){
    startApp(root);
}

const root = document.getElementById('root')
/*
*** {array} rovers. Immutable array with the three rovers.
*** {object} state. Empty object that we will use along the program to store data from the API
*/
const rovers = ['curiosity', 'opportunity', 'spirit'];

let state = {
    roverSelection: '',
};

// ------------------------------------------------------  FUNCTIONS

const renderMain = () => {
    root.style.display = 'none';
    let menuHTML = '';
    for (let i = 0; i < rovers.length; i++) {
       menuHTML += `<div>
       <button class="btn" data-name="${rovers[i]}" >${rovers[i]}</button>
       </div>`;
    }
    document.getElementById('box').innerHTML = menuHTML;
    let arrayButtons = document.getElementsByTagName('button');
    for (let i = 0; i < arrayButtons.length; i++) {
        arrayButtons[i].addEventListener('click', loadRover);
    }
};

const startApp = (root) => {
    root.innerHTML = renderMain();
};

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
    console.log(photos);

    // Map photo URLS to use afterwards with HTML function
    const URL = photos.map(photo => photo.img_src);
    console.log(URL);

    // Put rover data inside an object to display in a HTML
    const data = {
       name: photos[0].rover.name,
       launchDate: photos[0].rover.launch_date,
       landingDate: photos[0].rover.landing_date,
       missionStatus: photos[0].rover.status
    }
    console.log(data);

}


// ------------------------------------------------------  HIGUER ORDER FUNCTIONS

//Crear funciones que reciban otras funciones por parametro. Funcional
/*
const createTags = (state) => {
    let containerIntro = document.getElementById('container-intro');
    containerIntro.style.display = 'none';
    return `` //here comes the rover grid
}

const roverGrid = (rover) => ``;

const photoHTML = (url) => `<img class="photo" src="${url}"/>`;
*/

// ------------------------------------------------------  API CALLS

const getInfoRovers = (state) => {
    fetch(`rover-photos/${state.roverSelection}`)
        .then(res => res.json())
        .then(roverData => updateState(state, roverData));
}