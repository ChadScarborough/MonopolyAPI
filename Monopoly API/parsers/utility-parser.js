const getUtilities = () => {
    const output = [];
    output.push(getSpaceByPosition(12));
    output.push(getSpaceByPosition(28));
    return output;
};

const calculateUtilityIncome = (count, multiplier) => {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += (diceRoll().value) * multiplier;
    }
    return total;
};

const outputProfitForIndividualUtilities = (counts, numberOfGames) => {
    const output = {};
    for(let utility in getUtilities()) {
        const space = getUtilities()[utility];
        const position = utility ? 12 : 28;
        const income = (calculateUtilityIncome(counts[position], 4)) / numberOfGames;
        const profit = Math.round((income - space.price) * 100) / 100;
        output[space.name] = profit;
    }
    return output;
};

const outputProfitForBothUtilities = (counts, numberOfGames) => {
    const output = {"Utilities": 0};
    for(let utility in getUtilities()) {
        const space = getUtilities()[utility];
        const position = utility ? 12 : 28;
        const income = (calculateUtilityIncome(counts[position], 10)) / numberOfGames;
        const profit = income - space.price;
        output["Utilities"] += profit;
    }
    output["Utilities"] = Math.round(output["Utilities"] * 100) / 100;
    return output;
};

module.exports = {
    outputProfitForIndividualUtilities,
    outputProfitForBothUtilities
};