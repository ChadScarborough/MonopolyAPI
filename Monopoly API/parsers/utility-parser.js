const { getSpaceByPosition } = require('../utils/spaces-by-position');
const { rollDice } = require('../utils/dice');

const getUtilities = () => {
    const output = [];
    output.push(getSpaceByPosition(12));
    output.push(getSpaceByPosition(28));
    return output;
};

const calculateUtilityIncome = (count, multiplier) => {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += (rollDice().value) * multiplier;
    }
    return total;
};

function calculateUtilityProfit(utility, counts, numberOfGames, multiplier) {
    const position = utility ? 12 : 28;
    const income = (calculateUtilityIncome(counts[position], multiplier)) / numberOfGames;
    const profit = income - getUtilities()[utility].price;
    return profit;
}

const outputProfitForIndividualUtilities = (counts, numberOfGames) => {
    const output = {};
    for(let utility in getUtilities()) {
        const space = getUtilities()[utility];
        const profit = calculateUtilityProfit(utility, counts, numberOfGames, 4);
        output[space.name] = profit;
    }
    return output;
};

const outputProfitForBothUtilities = (counts, numberOfGames) => {
    const output = {"Utilities": 0};
    for(let utility in getUtilities()) {
        const profit = calculateUtilityProfit(utility, counts, numberOfGames, 10);
        output["Utilities"] += profit;
    }
    output["Utilities"] = Math.round(output["Utilities"] * 100) / 100;
    return output;
};

module.exports = {
    outputProfitForIndividualUtilities,
    outputProfitForBothUtilities
};
