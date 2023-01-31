const { Player } = require('./utils/player');

// Simulates games of Monopoly with the specified number of games, turns and opponents
const simulateGames = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    const spaceCounts = new Array(40).fill(0);
    for (let i = 0; i < numberOfGames; i++) {
        HandleOneGame(numberOfOpponents, turnsPerGame, spaceCounts);
    }
    return spaceCounts;
}

// Simulates a single game ith the specified number of opponents and turns
function HandleOneGame(numberOfOpponents, turnsPerGame, spaceCounts) {
    const players = new Array(numberOfOpponents).fill(new Player());
    for (let j = 0; j < turnsPerGame; j++) {
        HandleOneTurn(numberOfOpponents, players, spaceCounts);
    }
}

// Simulates a single turn with the specified number of opponents
function HandleOneTurn(numberOfOpponents, players, spaceCounts) {
    for (let k = 0; k < numberOfOpponents; k++) {
        players[k].takeTurn();
        spaceCounts[players[k].position]++;
    }
}

module.exports = { simulateGames };