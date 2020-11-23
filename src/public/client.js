// 1º Charge all the elements // OK
// Global variables
window.onload = function(){
    render(root, vault)
}

const root = document.getElementById('root')

let vault = {
    rovers: ['curiosity', 'opportunity', 'spirit'],
    roverSelection: '',
    info: '',
}

//We call the render with root and the state(as the updatevault)
const render = async (root, state) => {
    root.innerHTML = App(state);
    console.log('render');
}

//We update the vault and make sure that the newState applies all the updated values to vault
const updateVault = (vault, newState) => {
    vault = Object.assign(vault, newState) //target vault -----< source newState
    render(root, vault)
    console.log('updateVault');
}

// We write the HTML<root> with the main function inside
const App = (state) => {
    return `
        <div>
            ${mainFunction(state)}
        </div>`
}

// ------------------------------------------------------  COMPONENTS

const mainFunction = (state) => {

    // Call the API if there is no info // Trying with curiosity
    if (!state.info) {
        getInfoRovers(state.rovers[2]);
        console.log('funct working js43') //OK
    }

    //console.log(state.rovers[0]) works
    
    // Get photos from API 
    let photos = state;

    console.log(photos)

    // Map photo URLS to use afterwards with HTML function
    const URL = photos.map(photo => photo.img_src);

    // Same day for all the photos [0]
    const date = photos[0].earth_date;

    // Get the required mission data to paint inside this function return
    const { name, launch_date, landing_date, status } = photos[0].rover

    // Print the HTML and add buttons onclick event to fetch API
    return `
    <div id="container-intro" class="container">

        <div class="row">

        <div id="col-rover-0" class="col-lg-4">

            <img src="../public/assets/curiosity.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
            <h2>${name}</h2>
            <h2>${launch_date}</h2>
            <h2>${landing_date}</h2>
            <h2>${status}</h2>
            <p><a id="btn-0" onclick="createTags(${state})" class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>

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
}

// ------------------------------------------------------  HIGUER ORDER FUNCTIONS

const createTags = (state, ) => {
    let containerIntro = document.getElementById('container-intro');
    containerIntro.style.display = 'none';
    return `` //here comes the rover grid
}

const roverGrid = (rover) => ``;

const photoHTML = (url) => `<img class="photo" src="${url}"/>`;


// ------------------------------------------------------  API CALLS

const getInfoRovers = (state) => {
    console.log(state);
    [roverSelection] = state;// Devuelve undefined no se porqué. Con Object.assign tampoco funciona. JSON.parse no funciona. { [roverSelection] } : state no funciona
    console.log('API working');

    fetch(`rover-photos/${roverSelection}`)
        .then(res => res.json())
        .then(info => updateVault(vault, { state }))
}
