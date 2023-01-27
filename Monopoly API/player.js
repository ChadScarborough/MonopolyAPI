const { diceRoll } = require('./utils/dice');
const { getSpaceByPosition } = require('./utils/spaces-by-position');
const { drawCommunityChestCard, drawChanceCard } = require('./utils/decks');

const player = {
    position: 0,
    consecutiveDoubles: 0,
    advance: function (distance) {
        this.position = (this.position + distance) % 40;
        if (this.position === 30) {
            this.position = 10;
            this.consecutiveDoubles = 0;
        }
    },
    rollDiceToAdvance: function () {
        const roll = diceRoll();
        console.log(roll.value);
        if (roll.isDouble) {
            this.consecutiveDoubles++;
            console.log("Double");
        }
        else {
            this.consecutiveDoubles = 0;
        }
        if (this.consecutiveDoubles >= 3) {
            this.position = 10;
            this.consecutiveDoubles = 0;
            console.log("Caught speeding");
        }
        else {
            this.advance(diceRoll().value);
        }
    },
    takeTurn: function () {
        if (this.getCurrentSpace().type === "community chest") {
            if (this.moveByCommunityChestCard()) {
                console.log("Moved by community chest");
                return;
            }
        }
        if (this.getCurrentSpace().type === "chance") {
            if (this.moveByChanceCard()) {
                console.log("Moved by chance");
                return;
            }
        }
        this.rollDiceToAdvance();
    },
    rollDice: function () {
        return diceRoll();
    },
    getCurrentSpace: function () {
        return getSpaceByPosition(this.position);
    },
    advanceToNearestRailroad: function () {
        console.log("Advanced to nearest railroad");
        do {
            this.advance(1);
        } while (this.position % 10 !== 5);
    },
    advanceToNearestUtility: function () {
        console.log("Advanced to nearest utility");
        this.position < 28 && this.position >= 12 ?
            this.position = 28 :
            this.position = 12;
    },
    advanceToSpace: function (position) {
        console.log(`Advanced to ${getSpaceByPosition(position).name}`);
        this.position = position;
    },
    payOneUtility: function () {
        return 4 * diceRoll();
    },
    payTwoUtilities: function () {
        return 10 * diceRoll();
    },
    drawChance: function () {
        return drawChanceCard();
    },
    drawCommunityChest: function () {
        return drawCommunityChestCard();
    },
    moveByCard: function (card) {
        console.log(card['text']);
        if (!card.hasOwnProperty('new position')) {
            return false;
        }
        switch (card['new position']) {
            case 'Next utility':
                this.advanceToNearestUtility();
                break;
            case 'Back 3 spaces':
                this.advance(-3);
                console.log("Sent back three spaces");
                break;
            case 'Next railroad':
                this.advanceToNearestRailroad();
                break;
            default:
                this.advanceToSpace(Number(card['new position']));
                break;
        }
        return true;
    },
    moveByCommunityChestCard: function () {
        return this.moveByCard(this.drawCommunityChest());
    },
    moveByChanceCard: function () {
        return this.moveByCard(this.drawChance());
    }
}

module.exports = { player };