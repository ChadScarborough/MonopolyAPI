const { Player } = require('./utils/player');

const simulateGames = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    const spaceCounts = new Array(40).fill(0);

    for (let i = 0; i < numberOfGames; i++) {
        HandleOneGame(numberOfOpponents, turnsPerGame, spaceCounts);
    }
    return spaceCounts;
}

function HandleOneGame(numberOfOpponents, turnsPerGame, spaceCounts) {
    const players = new Array(numberOfOpponents).fill(new Player());
    for (let j = 0; j < turnsPerGame; j++) {
        HandleOneTurn(numberOfOpponents, players, spaceCounts);
    }
}

function HandleOneTurn(numberOfOpponents, players, spaceCounts) {
    for (let k = 0; k < numberOfOpponents; k++) {
        players[k].takeTurn();
        spaceCounts[players[k].position]++;
    }
}

module.exports = { simulateGames };