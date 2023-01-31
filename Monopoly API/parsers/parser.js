const { getSpaceByPosition } = require('../utils/spaces-by-position');

const outputIndividualPropertiesWithRawCounts = (counts) => {
    const output = []
    for (let i = 0; i < counts.length; i++) {
        output.push(`${ getSpaceByPosition(i).name } : ${counts[i]}`);
    }
    return output;
};

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
};

module.exports = {
    outputIndividualPropertiesWithRawCounts,
    outputPropertyGroupsWithRawCounts
};