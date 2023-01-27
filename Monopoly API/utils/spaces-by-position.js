const spaces = require('./spaces.json');

const propertyPositions = [
    1, 3, 6, 8, 9, 
    11, 13, 14, 16, 18, 19,
    21, 23, 24, 26, 27, 29,
    31, 32, 34, 37, 39
];

const railroadPositions = [
    5, 15, 25, 35
];

const utilityPositions = [
    12, 28
];

const chancePositions = [
    7, 22, 36
];

const communityChestPositions = [
    2, 17, 33
];

const otherPositions = [
    0, 4, 10, 20, 30, 38
];

const getPropertyByPosition = (position) => {
    const properties = spaces.Properties;
    for (let i in properties) {
        if (properties[i].position === position) {
            return properties[i];
        }
    }
    console.log("ERROR: No such property");
    return undefined;
};

const getRailroadByPosition = (position) => {
    const railroads = spaces.Railroads;
    for (let i in railroads) {
        if (railroads[i].position === position) {
            return railroads[i];
        }
    }
    console.log("ERROR: No such railroad");
    return undefined;
};

const getUtilityByPosition = (position) => {
    const utilities = spaces.Utilities;
    for (let i in utilities) {
        if (utilities[i].position === position) {
            return utilities[i];
        }
    }
    console.log("ERROR: No such utility");
    return undefined;
};

const getChanceByPosition = (position) => {
    const chance = spaces.Chance;
    for (let i in chance) {
        if (chance[i].position === position) {
            return chance[i];
        }
    }
    console.log("ERROR: No such chance space");
    return undefined;
};

const getCommunityChestByPosition = (position) => {
    const communityChest = spaces['Community Chest'];
    for (let i in communityChest) {
        if (communityChest[i].position === position) {
            return communityChest[i];
        }
    }
    console.log("ERROR: No such community chest space");
    return undefined;
};

const getOtherByPosition = (position) => {
    const other = spaces.Other;
    for (let i in other) {
        if (other[i].position === position) {
            return other[i];
        }
    }
    console.log("ERROR: No such space");
    return undefined;
};

const getSpaceByPosition = (position) => {
    if (propertyPositions.includes(position)) {
        return getPropertyByPosition(position);
    }
    if (railroadPositions.includes(position)) {
        return getRailroadByPosition(position);
    }
    if (utilityPositions.includes(position)) {
        return getUtilityByPosition(position);
    }
    if (chancePositions.includes(position)) {
        return getChanceByPosition(position);
    }
    if (communityChestPositions.includes(position)) {
        return getCommunityChestByPosition(position);
    }
    if (otherPositions.includes(position)) {
        return getOtherByPosition(position);
    }
    console.log("ERROR: No space at given position");
    return undefined;
};

module.exports = { getSpaceByPosition };