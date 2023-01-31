const { getSpaceByPosition } = require('../utils/spaces-by-position');

const getRailroads = () => {
    const output = [];
    output.push(getSpaceByPosition(5));
    output.push(getSpaceByPosition(15));
    output.push(getSpaceByPosition(25));
    output.push(getSpaceByPosition(35));
    return output;
};

// Returns the average profit for each railroad space as though it were the only one owned
const outputProfitForIndividualRailroads = (counts, numberOfGames) => {
    const output = {};
    for(let railroad in getRailroads()) {
        const space = getRailroads()[railroad];
        const income = (counts[(railroad * 10) + 5] * space["rent"]) / numberOfGames;
        const profit = (Math.round(income - space.price) * 100) / 100;
        output[space.name] = profit;
    };
    return output;
};

// Returns the average profit for each pair of railroad spaces as though they were the only ones owned
const outputProfitForPairsOfRailroads = (counts, numberOfGames) => {
    const output = {};
    for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 4; j++) {
            const space1 = getRailroads()[i];
            const space2 = getRailroads()[j];
            const names = `${space1.name}, ${space2.name}`;
            income1 = (counts[(i * 10) + 5] * space1["two railroads"]) / numberOfGames;
            income2 = (counts[(j * 10) + 5] * space2["two railroads"]) / numberOfGames;
            const totalIncome = income1 + income2;
            const totalPrice = space1.price + space2.price;
            const profit = (Math.round(totalIncome - totalPrice) * 100) / 100;
            output[names] = profit;
        };
    };
    return output;
};

// Returns the average profit for every combination of three railroad spaces as though they were the only ones owned
const outputProfitForTripletsOfRailroads = (counts, numberOfGames) => {
    const output = {};
    for (let i = 0; i < 2; i++) {
        for (let j = i + 1; j < 3; j++) {
            for (let k = j + 1; k < 4; k++) { 
                const space1 = getRailroads()[i];
                const space2 = getRailroads()[j];
                const space3 = getRailroads()[k];
                const names = `${space1.name}, ${space2.name}, ${space3.name}`;
                income1 = (counts[(i * 10) + 5] * space1["three railroads"]) / numberOfGames;
                income2 = (counts[(j * 10) + 5] * space2["three railroads"]) / numberOfGames;
                income3 = (counts[(j * 10) + 5] * space3["three railroads"]) / numberOfGames;
                const totalIncome = income1 + income2 + income3;
                const totalPrice = space1.price + space2.price + space3.price;
                const profit = (Math.round(totalIncome - totalPrice) * 100) / 100;
                output[names] = profit;
            }
        };
    };
    return output;
};

// Returns the average profit for all four railroad spaces as though all four were owned
const outputProfitForAllFourRailroads = (counts, numberOfGames) => {
    const allFourRailroads = "All four railroads";
    const output = {"All four railroads": 0};
    for(let railroad in getRailroads()) {
        const space = getRailroads()[railroad];
        const income = (counts[(railroad * 10) + 5] * space["four railroads"]) / numberOfGames;
        const profit = income - space.price
        output["All four railroads"] += profit;
    };
    output["All four railroads"] = Math.round(output["All four railroads"] * 100) / 100;
    return output;
};

module.exports = {
    outputProfitForIndividualRailroads,
    outputProfitForPairsOfRailroads,
    outputProfitForTripletsOfRailroads,
    outputProfitForAllFourRailroads
};