const aggregator = require('./aggregator');
const { simulateGames } = require('./simulator');

const requestDataProxy = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    if (numberOfGames * turnsPerGame * numberOfOpponents > 1000000) {
        return "Please keep the product of the three input values at or below 1 million.";
    }
    return requestData(numberOfGames, turnsPerGame, numberOfOpponents);
}

const requestData = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    const counts = simulateGames(numberOfGames, turnsPerGame, numberOfOpponents);
    let  output = [];
    output = output.concat(aggregator.aggregateRawCountResults(counts));
    output = output.concat(aggregator.aggregateIndividualPropertyProfitResults(counts, numberOfGames));
    output = output.concat(aggregator.aggregatePropertyGroupProfitResults(counts, numberOfGames));
    output = output.concat(aggregator.aggregateRailroadProfitResults(counts, numberOfGames));
    output = output.concat(aggregator.aggregateUtilityProfitResults(counts, numberOfGames));
    return output;
};

module.exports = { requestDataProxy };