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
    info: '',
    latest_photos: []
};

// ------------------------------------------------------  FUNCTIONS

const renderMain = () => {
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

// ------------------------------------------------------  COMPONENTS

function loadRover(){

    state.roverSelection = this.dataset.name;

    getInfoRovers(state);

    //Get photos from API
    
    
    
    // Map photo URLS to use afterwards with HTML function
    //const URL = photos.map(photo => photo.img_src);
    //console.log(URL);


    // Get the required mission data to paint inside the main function return
    //const infoRover = {
    //    name: photos.rover.name,
    //    //launch_date
    //    //landing_date
    //    //status
    //};

    // Print the HTML and add buttons onclick event to fetch API
    let result = `
    <div id="container-intro" class="container">

        <div class="row">

        <div id="col-rover-0" class="col-lg-4">

            <img src="../public/assets/curiosity.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
            <h2> </h2>
            <p><a id="btn-0" class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>

        </div>

        <div d="col-rover-1" class="col-lg-4">

            <img src="../public/assets/opportunity.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
            <h2>OPPORTUNITY</h2>
            <p><a id="btn-1" class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>

        </div>

        <div d="col-rover-2" class="col-lg-4">

            <img src="../public/assets/spirit.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
            <h2>SPIRIT</h2>
            <p><a id="btn-2" class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>

        </div>

        </div>

    </div>
    `
    console.log(result);
    return root.innerHTML = result;
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
        .then(state => { state })
}


//function StartApp
    //Renderizo (function renderMain) 3 opciones de Menú


//Evento que al clickar en un botón (function loadRover) fetchea la api ("rovers/*"), recoge el nombre del rover en cuestión y empieza la carga de la pantalla de ese rover
    //Recoger el nombre del rover
    //Llama a la API y recoge el resto de propiedades del rover en cuestión (state)
        //Pinto (renderRover) los datos del rover + las imágenes que me interesan