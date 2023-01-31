const rawCountParser = require('./parsers/raw-count-parser');
const propertyParser = require('./parsers/property-parser');
const propertyGroupParser = require('./parsers/property-group-parser');
const railroadParser = require('./parsers/railroad-parser');
const utilityParser = require('./parsers/utility-parser');

// Aggregates the all the data for raw counts of times players ended their turn on a given space into a single json
const aggregateRawCountResults = (counts, individual=true, group=true) => {
    const name = "raw counts"
    let output = {"raw counts": {}};
    if(individual) {
        const source = rawCountParser.outputIndividualPropertiesWithRawCounts(counts);
        output[name]["individual"] = source;
    }
    if(group) {
        const source = rawCountParser.outputPropertyGroupsWithRawCounts(counts);
        output[name]["group"] = source;
    }
    return output;
}

// Aggregates all the profit data for individual properties (but not railroads and utilities)
const aggregateIndividualPropertyProfitResults = (
    counts, numberOfGames, undeveloped=true, completeSet=true, oneHouse=true, 
    twoHouses=true, threeHouses=true, fourHouses=true, hotel=true
    ) => {
    const name = "individual property profits";
    let output = {"individual property profits" : {}};
    if (undeveloped) {
        const source = propertyParser.outputProfitForIndividualUndevelopedProperties(counts, numberOfGames);
        output[name]["undeveloped"] = source;
    }
    if (completeSet) {
        const source = propertyParser.outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup(counts, numberOfGames);
        output[name]["complete set"] = source
    }
    if (oneHouse) {
        const source = propertyParser.outputProfitForIndividualPropertiesWithOneHouse(counts, numberOfGames);
        output[name]["one house"] = source;
    }
    if (twoHouses) {
        const source = propertyParser.outputProfitForIndividualPropertiesWithTwoHouses(counts, numberOfGames);
        output[name]["two houses"] = source;
    }
    if (threeHouses) {
        const source = propertyParser.outputProfitForIndividualPropertiesWithThreeHouses(counts, numberOfGames);
        output[name]["three houses"] = source;
    }
    if (fourHouses) {
        const source = propertyParser.outputProfitForIndividualPropertiesWithFourHouses(counts, numberOfGames);
        output[name]["four houses"] = source;
    }
    if (hotel) {
        const source = propertyParser.outputProfitForIndividualPropertiesWithHotels(counts, numberOfGames);
        output[name]["hotel"] = source;
    }
    return output;
};

// Aggregates all the profit data for property groups (as opposed to individual properties)
const aggregatePropertyGroupProfitResults = (
    counts, numberOfGames, undeveloped=true, oneHouse=true, 
    twoHouses=true, threeHouses=true, fourHouses=true, hotel=true) => {
    const name = "property group profits"
    let output = {"property group profits" : {}};
    if(undeveloped) {
        const source = propertyGroupParser.outputProfitForUndevelopedPropertyGroups(counts, numberOfGames);
        output[name]["undeveloped"] = source
    }
    if(oneHouse) {
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithOneHouse(counts, numberOfGames);
        output[name]["one house"] = source
    }
    if(twoHouses) {
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithTwoHouses(counts, numberOfGames);
        output[name]["two houses"] = source
    }
    if(threeHouses) {
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithThreeHouses(counts, numberOfGames);
        output[name]["three houses"] = source
    }
    if(fourHouses) {
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithFourHouses(counts, numberOfGames);
        output[name]["four houses"] = source
    }
    if(hotel) {
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithHotels(counts, numberOfGames);
        output[name]["hotel"] = source
    }
    return output;
};

// Aggregates all the profit data for the railroads
const aggregateRailroadProfitResults = (counts, numberOfGames, oneRailroad=true, twoRailroads=true, threeRailroads=true, fourRailroads=true) => {
    let output = {"railroad profits": {}};
    const name = "railroad profits";
    if(oneRailroad){
        const source = railroadParser.outputProfitForIndividualRailroads(counts, numberOfGames);
        output[name]["one railroad"] = source
    }
    if(twoRailroads){
        const source = railroadParser.outputProfitForPairsOfRailroads(counts, numberOfGames);
        output[name]["two railroads"] = source
    }
    if(threeRailroads){
        const source = railroadParser.outputProfitForTripletsOfRailroads(counts, numberOfGames);
        output[name]["three railroads"] = source
    }
    if(fourRailroads){
        const source = railroadParser.outputProfitForAllFourRailroads(counts, numberOfGames);
        output[name]["four railroads"] = source
    }
    return output;
};

// Aggregates all the profit data for the utilities
const aggregateUtilityProfitResults = (counts, numberOfGames, individual=true, both=true) => {
    const name = "utility profits";
    let output = {"utility profits": {}};
    if (individual) {
        const source = utilityParser.outputProfitForIndividualUtilities(counts, numberOfGames);
        output[name]["one utility"] = source
    }
    if (both) {
        const source = utilityParser.outputProfitForBothUtilities(counts, numberOfGames);
        output[name]["two utilities"] = source
    }
    return output;
};

module.exports = {
    aggregateRawCountResults,
    aggregatePropertyGroupProfitResults,
    aggregateIndividualPropertyProfitResults,
    aggregateRailroadProfitResults,
    aggregateUtilityProfitResults
};