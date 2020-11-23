// 1º charge all the elements // 
// Global variables
window.onload = function(){
    render(root, vault)
    console.log('on load')
}

const root = document.getElementById('root')

let vault = {
    rovers: ['curiosity', 'opportunity', 'spirit'],
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
    root.innerHTML = App(state);
    console.log('render');
}

// We write the HTML<root> with the updatedvault objects
const App = (state) => {
    return `
    <div class="container">

    <!-- Three columns of text below the carousel -->
    <div class="row">
      <div id="col-rover-0" class="col-lg-4">
        <img src="../public/assets/${state.rovers[0]}.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
        <h2>${state.rovers[0]}</h2>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div><!-- /.col-lg-4 -->
      <div d="col-rover-1" class="col-lg-4">
        <img src="../public/assets/${state.rovers[1]}.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
        <h2>${state.rovers[1]}</h2>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div><!-- /.col-lg-4 -->
      <div d="col-rover-2" class="col-lg-4">
        <img src="../public/assets/${state.rovers[2]}.jpeg" class="bd-placeholder-img rounded-circle" width="140" height="140"  xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img>
        <h2>${state.rovers[2]}</h2>
        <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
      </div><!-- /.col-lg-4 -->
    </div><!-- /.row -->

  </div><!-- /.container -->
    `
}

// Add eventlisteners and buttons functionality for the HTML

// 

// ------------------------------------------------------  COMPONENTS

const roverInfo = () => {
    if(vault.info == undefined){
        console.log('rover info');
        getInfoRovers(vault);
    }
    console.log(vault.info);
}


// ------------------------------------------------------  API CALLS

// Example API call

const getInfoRovers = (state) => {
    const { selectRover } = state

    fetch(`http://localhost:3000/rover-photos/${selectRover}`)
        .then(res => res.json())
        .then(info => updateVault(vault, { info })) //???
}
