const { getSpaceByPosition } = require('../utils/spaces-by-position');

const outputProfitForIndividualProperties = (counts, numberOfGames, rentKey, houseMultiplier, rentMultiplier=1) => {
    const output = {};
    for(let i = 0; i < counts.length; i++) {
        const space = getSpaceByPosition(i);
        if (space.type !== "property") {
            continue;
        }
        const income = (counts[i] * space[rentKey] * rentMultiplier) / numberOfGames;
        const profit = (Math.round((income - space.price - (houseMultiplier * space["house cost"])) * 100)) / 100;
        output[space.name] = profit;
    };
    return output;
}

const outputProfitForIndividualUndevelopedProperties = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "rent", 0);
}

const outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "rent", 0, 2);
}

const outputProfitForIndividualPropertiesWithOneHouse = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "one house", 1);
}

const outputProfitForIndividualPropertiesWithTwoHouses = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "two houses", 2);
}

const outputProfitForIndividualPropertiesWithThreeHouses = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "three houses", 3);
}

const outputProfitForIndividualPropertiesWithFourHouses = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "four houses", 4);
}

const outputProfitForIndividualPropertiesWithHotels = (counts, numberOfGames) => {
    return outputProfitForIndividualProperties(counts, numberOfGames, "hotel", 5);
};

module.exports = { 
    outputProfitForIndividualUndevelopedProperties,
    outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup,
    outputProfitForIndividualPropertiesWithOneHouse,
    outputProfitForIndividualPropertiesWithTwoHouses,
    outputProfitForIndividualPropertiesWithThreeHouses,
    outputProfitForIndividualPropertiesWithFourHouses,
    outputProfitForIndividualPropertiesWithHotels
};