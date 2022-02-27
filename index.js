const playerContainer = document.getElementById("player-contaiener");

const allPlayersList = () => {
    const searchField = document.getElementById("search-box");
    const searchFieldValue = searchField.value;
    if (searchField.value == '') {
        document.getElementById('alert').style.display = 'block'
    }
    else {
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchFieldValue}`)
            .then(res => res.json())
            .then(data => arra(data.player))
        searchField.value = '';
    }
};

const arra = (players) => {
    playerContainer.innerHTML = '';
    for (const player of players) {
        const div = document.createElement('div');
        div.innerHTML = `
             <img onclick="seeDetails(${player.idPlayer})" class="w-75" src="${player.strThumb}" alt="">
             <h2>Player Name: ${player.strPlayer}</h2>
             <h2>Player Birthday: ${player.dateBorn}</h2>
             <p>Player Nationality: ${player.strNationality}</p>
         `
        playerContainer.appendChild(div)
    }
}
const seeDetails = (playerId) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`
    fetch(url)
        .then(res => res.json())
        .then(data => detailOfPlayer(data.players[0]))
}

const detailOfPlayer = (detail) => {
    const playerDetails = document.getElementById('details-container');
    const div = document.createElement('div');
    div.innerHTML = `
            <img onclick="seeDetails(${detail.idPlayer})" class="w-75" src="${detail.strThumb}" alt="">
            <h2>Player Name: ${detail.strPlayer}</h2>
            <h2>Date of Born: ${detail.dateBorn}</h2>
            <h2>Gender: ${detail.strGender}</h2>
            <p>Player Nationality: ${detail.strNationality}</p>
            <p>Birth Location: ${detail.strBirthLocation}</p> 
            <button onclick="deletePlayer()" class="btn btn-danger">Delete</button>
    `
    playerDetails.appendChild(div)
    playerContainer.innerHTML = ``

}

const deletePlayer = () => {
    const deleteValue = document.getElementById('details-container');
    deleteValue.style.display = 'none'

    const deleteAlert = document.getElementById("bodyItem");
    deleteAlert.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Deleted</strong> Player from the list.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `


}