const rawCountParser = require('./parsers/raw-count-parser');
const propertyParser = require('./parsers/property-parser');
const propertyGroupParser = require('./parsers/property-group-parser');
const railroadParser = require('./parsers/railroad-parser');
const utilityParser = require('./parsers/utility-parser');

const aggregateRawCountResults = (counts, individual=true, group=true) => {
    let output = ["RAW COUNTS"];
    if(individual) {
        output.push("INDIVIDUAL");
        const source = rawCountParser.outputIndividualPropertiesWithRawCounts(counts);
        output.push(source);
    }
    if(group) {
        output.push("GROUP");
        const source = rawCountParser.outputPropertyGroupsWithRawCounts(counts);
        output.push(source);
    }
    return output;
}

const aggregateIndividualPropertyProfitResults = (
    counts, numberOfGames, undeveloped=true, completeSet=true, oneHouse=true, 
    twoHouses=true, threeHouses=true, fourHouses=true, hotel=true
    ) => {
    let output = ["INDIVIDUAL PROPERTY PROFITS"];
    if (undeveloped) {
        output.push("UNDEVELOPED");
        const source = propertyParser.outputProfitForIndividualUndevelopedProperties(counts, numberOfGames);
        output.push(source);
    }
    if (completeSet) {
        output.push("COMPLETE SET");
        const source = propertyParser.outputProfitForIndividualUndevelopedPropertiesWithAllPropertiesInEachGroup(counts, numberOfGames);
        output.push(source);
    }
    if (oneHouse) {
        output.push("ONE HOUSE");
        const source = propertyParser.outputProfitForIndividualPropertiesWithOneHouse(counts, numberOfGames);
        output.push(source);
    }
    if (twoHouses) {
        output.push("TWO HOUSES");
        const source = propertyParser.outputProfitForIndividualPropertiesWithTwoHouses(counts, numberOfGames);
        output.push(source);
    }
    if (threeHouses) {
        output.push("THREE HOUSES");
        const source = propertyParser.outputProfitForIndividualPropertiesWithThreeHouses(counts, numberOfGames);
        output.push(source);
    }
    if (fourHouses) {
        output.push("FOUR HOUSES");
        const source = propertyParser.outputProfitForIndividualPropertiesWithFourHouses(counts, numberOfGames);
        output.push(source);
    }
    if (hotel) {
        output.push("HOTELS");
        const source = propertyParser.outputProfitForIndividualPropertiesWithHotels(counts, numberOfGames);
        output.push(source);
    }
    return output;
};

const aggregatePropertyGroupProfitResults = (
    counts, numberOfGames, undeveloped=true, oneHouse=true, 
    twoHouses=true, threeHouses=true, fourHouses=true, hotel=true) => {
    let output = ["PROPERTY GROUP PROFITS"];
    if(undeveloped) {
        output.push("UNDEVELOPED");
        const source = propertyGroupParser.outputProfitForUndevelopedPropertyGroups(counts, numberOfGames);
        output.push(source);
    }
    if(oneHouse) {
        output.push("ONE HOUSE");
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithOneHouse(counts, numberOfGames);
        output.push(source);
    }
    if(twoHouses) {
        output.push("TWO HOUSES");
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithTwoHouses(counts, numberOfGames);
        output.push(source);
    }
    if(threeHouses) {
        output.push("THREE HOUSES");
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithThreeHouses(counts, numberOfGames);
        output.push(source);
    }
    if(fourHouses) {
        output.push("FOUR HOUSES");
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithFourHouses(counts, numberOfGames);
        output.push(source);
    }
    if(hotel) {
        output.push("HOTEL");
        const source = propertyGroupParser.outputProfitForPropertyGroupsWithHotels(counts, numberOfGames);
        output.push(source);
    }
    return output;
};

const aggregateRailroadProfitResults = (counts, numberOfGames, oneRailroad=true, twoRailroads=true, threeRailroads=true, fourRailroads=true) => {
    let output = ["RAILROAD PROFITS"];
    if(oneRailroad){
        output.push("ONE RAILROAD");
        const source = railroadParser.outputProfitForIndividualRailroads(counts, numberOfGames);
        output.push(source);
    }
    if(twoRailroads){
        output.push("TWO RAILROADS");
        const source = railroadParser.outputProfitForPairsOfRailroads(counts, numberOfGames);
        output.push(source);
    }
    if(threeRailroads){
        output.push("THREE RAILROADS");
        const source = railroadParser.outputProfitForTripletsOfRailroads(counts, numberOfGames);
        output.push(source);
    }
    if(fourRailroads){
        output.push("FOUR RAILROADS");
        const source = railroadParser.outputProfitForAllFourRailroads(counts, numberOfGames);
        output.push(source);
    }
    return output;
};

const aggregateUtilityProfitResults = (counts, numberOfGames, individual=true, both=true) => {
    let output = ["UTILITY PROFITS"];
    if (individual) {
        output.push("ONE UTILITY");
        const source = utilityParser.outputProfitForIndividualUtilities(counts, numberOfGames);
        output.push(source);
    }
    if (both) {
        output.push("TWO UTILITIES");
        const source = utilityParser.outputProfitForBothUtilities(counts, numberOfGames);
        output.push(source);
    }
    return output;
};