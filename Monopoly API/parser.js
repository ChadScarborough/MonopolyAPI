const { simulateGames } = require('./simulator');
const { getSpaceByPosition } = require('./utils/spaces-by-position');
const propertyGroupsByName = require('./utils/property-groups-by-name.json');

const propertyGroups = ["purple", "light blue", "magenta", "orange", "red", "yellow", "green", "blue", "railroad", "utility", "community chest", "chance", "other"]
const getPropertyGroupByName = (name) => {
    return propertyGroupsByName[name];
}

const outputIndividualPropertiesWithRawCounts = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    const counts = simulateGames(numberOfGames, turnsPerGame, numberOfOpponents);
    const output = []
    for (let i = 0; i < counts.length; i++) {
        output.push(`${ getSpaceByPosition(i).name } : ${counts[i]}`);
    }
    return output;
};

const outputPropertyGroupsWithRawCounts = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    const counts = simulateGames(numberOfGames, turnsPerGame, numberOfOpponents);
    const output = {};
    for (let group in propertyGroups) {
        output[propertyGroups[group]] = 0;
    }
    for (let i = 0; i < 40; i++) {
        const space = (getSpaceByPosition(i));
        let type = "";
        if (space.type === "property") {
            type = space.color;
        }
        else {
            type = space.type;
        }
        output[type] += counts[i];
    };
}

const outputProfitForIndividualProperties = (numberOfGames, turnsPerGame, numberOfOpponents, rentKey, houseMultiplier, rentMultiplier=1) => {
    const counts = simulateGames(numberOfGames, turnsPerGame, numberOfOpponents);
    const output = {};
    for(let i = 0; i < counts.length; i++) {
        const space = getSpaceByPosition(i);
        if (space.type !== "property") {
            continue;
        }
        const income = (counts[i] * space[rentKey]) / numberOfGames;
        const profit = (Math.round((income - space.price - (houseMultiplier * space["house cost"])) * 100)) / 100;
        output[space.name] = profit;
    };
    return output;
}

const outputProfitForIndividualUndevelopedProperties = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "rent", 0, 1);
}

const outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "rent", 0, 2);
}

const outputProfitForIndividualPropertiesWithOneHouse = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "one house", 1);
}

const outputProfitForIndividualPropertiesWithTwoHouses = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "two houses", 2);
}

const outputProfitForIndividualPropertiesWithThreeHouses = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "three houses", 3);
}

const outputProfitForIndividualPropertiesWithFourHouses = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "four houses", 4);
}

const outputProfitForIndividualPropertiesWithHotels = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return outputProfitForIndividualProperties(
        numberOfGames, turnsPerGame, numberOfOpponents, "hotel", 5);
}

const convertIndividualProfitsToGroupProfits = (numberOfGames, turnsPerGame, numberOfOpponents, calcFunction) => {
    const individuals = (calcFunction(numberOfGames, turnsPerGame, numberOfOpponents));
    const output = {};
    for (let group in propertyGroups) {
        output[propertyGroups[group]] = 0;
    };
    const propertyNames = Object.keys(individuals);
    for (let name in propertyNames) {
        const group = getPropertyGroupByName(propertyNames[name]);
        output[group] += individuals[propertyNames[name]];
    }
    for (let value in output) {
        output[value] = Math.round(output[value] * 100) / 100;
    }
    return output;
}

const outputProfitForUndevelopedPropertyGroups = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return convertIndividualProfitsToGroupProfits(
        numberOfGames, turnsPerGame, numberOfOpponents, outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup
        );
};

const outputProfitForPropertyGroupsWithOneHouse = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return convertIndividualProfitsToGroupProfits(
        numberOfGames, turnsPerGame, numberOfOpponents, outputProfitForIndividualPropertiesWithOneHouse
        );
};

const outputProfitForPropertyGroupsWithTwoHouses = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return convertIndividualProfitsToGroupProfits(
        numberOfGames, turnsPerGame, numberOfOpponents, outputProfitForIndividualPropertiesWithTwoHouses
        );
};

const outputProfitForPropertyGroupsWithThreeHouses = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return convertIndividualProfitsToGroupProfits(
        numberOfGames, turnsPerGame, numberOfOpponents, outputProfitForIndividualPropertiesWithThreeHouses
        );
};

const outputProfitForPropertyGroupsWithFourHouses = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return convertIndividualProfitsToGroupProfits(
        numberOfGames, turnsPerGame, numberOfOpponents, outputProfitForIndividualPropertiesWithFourHouses
        );
};

const outputProfitForPropertyGroupsWithHotels = (numberOfGames, turnsPerGame, numberOfOpponents) => {
    return convertIndividualProfitsToGroupProfits(
        numberOfGames, turnsPerGame, numberOfOpponents, outputProfitForIndividualPropertiesWithHotels
        );
};

console.log(outputProfitForPropertyGroupsWithHotels(10000, 50, 2));