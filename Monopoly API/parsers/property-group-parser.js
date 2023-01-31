const propertyGroupsByName = require('../utils/property-groups-by-name.json');
const propertyParser = require('./property-parser');

const propertyGroups = ["purple", "light blue", "magenta", "orange", "red", "yellow", "green", "blue"]
const getPropertyGroupByName = (name) => {
    return propertyGroupsByName[name];
};

// Takes the individual profits for each property and converts them into collective profits for each property group
const convertIndividualProfitsToGroupProfits = (counts, numberOfGames, calcFunction) => {
    const individuals = (calcFunction(counts, numberOfGames));
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
};

const outputProfitForUndevelopedPropertyGroups = (counts, numberOfGames) => {
    return convertIndividualProfitsToGroupProfits(
        counts, numberOfGames, 
        propertyParser.outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup);
};

const outputProfitForPropertyGroupsWithOneHouse = (counts, numberOfGames) => {
    return convertIndividualProfitsToGroupProfits(
        counts, numberOfGames, propertyParser.outputProfitForIndividualPropertiesWithOneHouse);
};

const outputProfitForPropertyGroupsWithTwoHouses = (counts, numberOfGames) => {
    return convertIndividualProfitsToGroupProfits(
        counts, numberOfGames, propertyParser.outputProfitForIndividualPropertiesWithTwoHouses);
};

const outputProfitForPropertyGroupsWithThreeHouses = (counts, numberOfGames) => {
    return convertIndividualProfitsToGroupProfits(
        counts, numberOfGames, propertyParser.outputProfitForIndividualPropertiesWithThreeHouses);
};

const outputProfitForPropertyGroupsWithFourHouses = (counts, numberOfGames) => {
    return convertIndividualProfitsToGroupProfits(
        counts, numberOfGames, propertyParser.outputProfitForIndividualPropertiesWithFourHouses);
};

const outputProfitForPropertyGroupsWithHotels = (counts, numberOfGames) => {
    return convertIndividualProfitsToGroupProfits(
        counts, numberOfGames, propertyParser.outputProfitForIndividualPropertiesWithHotels);
};

module.exports = {
    outputProfitForUndevelopedPropertyGroups,
    outputProfitForPropertyGroupsWithOneHouse,
    outputProfitForPropertyGroupsWithTwoHouses,
    outputProfitForPropertyGroupsWithThreeHouses,
    outputProfitForPropertyGroupsWithFourHouses,
    outputProfitForPropertyGroupsWithHotels
};