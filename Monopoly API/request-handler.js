const aggregator = require('./aggregator');
const { simulateGames } = require('./simulator');

// Prevents the user from requesting arbitrarily large simulations
const requestDataProxy = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    if (numberOfGames * turnsPerGame * numberOfOpponents > 5000000) {
        return "Please keep the product of the number of games, the number of turns per game, and the number of opponents at or below 5 million.";
    }
    return requestData(numberOfGames, turnsPerGame, numberOfOpponents);
}

// Collects all the aggregated simulation results and returns them in JSON format
const requestData = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    const counts = simulateGames(numberOfGames, turnsPerGame, numberOfOpponents);
    let output = {};
    output["number of games"] = numberOfGames;
    output["turns per game"] = turnsPerGame;
    output["number of opponents"] = numberOfOpponents;
    output = Object.assign(output, aggregator.aggregateRawCountResults(counts));
    output = Object.assign(output, aggregator.aggregateIndividualPropertyProfitResults(counts, numberOfGames));
    output = Object.assign(output, aggregator.aggregatePropertyGroupProfitResults(counts, numberOfGames));
    output = Object.assign(output, aggregator.aggregateRailroadProfitResults(counts, numberOfGames));
    output = Object.assign(output, aggregator.aggregateUtilityProfitResults(counts, numberOfGames));
    return output;
};

module.exports = { requestDataProxy };