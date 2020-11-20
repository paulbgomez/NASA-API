// 1º charge all the elements // 
// Global variables
window.onload = function(){
    render(root, vault)
}

const root = document.getElementById('root')

let vault = {
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    roverSelection: '',
    info: '',
    //mas variables?
}

//We update the vault and make sure that the newState applies all the updated values to vault
const updateVault = (vault, newState) => {
    vault = Object.assign(vault, newState) //target vault -----< source newState
    render(root, vault)
    console.log('updateVault');
}

//We call the render with root and the state(as the updatevault)
const render = async (root, state) => {
    root.innerHTML = App(state)
    console.log('render');
}

// We write the HTML<root> with the updatedvault objects
const App = () => {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-item nav-link" href="#">Home</a>
                    <a class="nav-item nav-link" href="/rover-photos/spirit">Spirit</a>
                    <a class="nav-item nav-link" href="/rover-photos/opportunity">Opportunity</a>
                    <a class="nav-item nav-link" href="/rover-photos/curiosity">Cursiosity</a>
                </div>
            </div>
    </nav>
    `
}

// ------------------------------------------------------  COMPONENTS

const roverInfo = () => {
    if(vault.info == undefined){
        console.log('mierda');
        getInfoRovers(vault);
    }
    console.log(vault.info);
}

const displayRovers = () => {
    return `
    <div class="container">
        <div class="row">
            <div class="col">
                1 of 3
            </div>
            <div class="col">
                2 of 3
            </div>
            <div class="col">
                3 of 3
            </div>
        </div>
    </div>`
}

// ------------------------------------------------------  API CALLS

// Example API call

const getInfoRovers = (state) => {
    const { selectRover } = state

    fetch(`http://localhost:3000/rover-photos/${selectRover}`)
        .then(res => res.json())
        .then(info => updateVault(vault, { info })) //???
}

