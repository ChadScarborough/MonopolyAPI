const { getSpaceByPosition } = require('../utils/spaces-by-position');

const propertyGroups = ["purple", "light blue", "magenta", "orange", "red", "yellow", "green", "blue", "railroad", "utility", "community chest", "chance", "other"]

// Returns the number of times a player ended their turn on each space over the course of all simulated games
const outputIndividualPropertiesWithRawCounts = (counts) => {
    const output = {}
    for (let i = 0; i < counts.length; i++) {
        output[getSpaceByPosition(i).name] = counts[i];
    }
    return output;
};

// Returns the number of times a player ended their turn on each type of space over the course of all simulated games
const outputPropertyGroupsWithRawCounts = (counts) => {
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
    return output;
};

module.exports = {
    outputIndividualPropertiesWithRawCounts,
    outputPropertyGroupsWithRawCounts
};