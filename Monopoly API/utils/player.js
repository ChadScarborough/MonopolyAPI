const { diceRoll } = require('./dice');
const { getSpaceByPosition } = require('./spaces-by-position');
const { drawCommunityChestCard, drawChanceCard } = require('./decks');

function Player() {
    this.position = 0,
    this.consecutiveDoubles = 0,
    this.advance = function(distance) {
        this.position = (this.position + distance) % 40;
        if (this.position === 30) {
            this.position = 10;
            this.consecutiveDoubles = 0;
        }
    },
    this.rollDiceToAdvance = function() {
        const roll = diceRoll();
        if (roll.isDouble) {
            this.consecutiveDoubles++;
        }
        else {
            this.consecutiveDoubles = 0;
        }
        if (this.consecutiveDoubles >= 3) {
            this.position = 10;
            this.consecutiveDoubles = 0;
        }
        else {
            this.advance(roll.value);
        }
    },
    this.takeTurn = function() {
        if (this.getCurrentSpace().type === "community chest") {
            if (this.moveByCommunityChestCard()) {
                return;
            }
        }
        if (this.getCurrentSpace().type === "chance") {
            if (this.moveByChanceCard()) {
                return;
            }
        }
        this.rollDiceToAdvance();
    },
    this.rollDice = function() {
        return diceRoll();
    },
    this.getCurrentSpace = function() {
        return getSpaceByPosition(this.position);
    },
    this.advanceToNearestRailroad = function() {
        do {
            this.advance(1);
        } while (this.position % 10 !== 5);
    },
    this.advanceToNearestUtility = function() {
        this.position < 28 && this.position >= 12 ?
            this.position = 28 :
            this.position = 12;
    },
    this.advanceToSpace = function(position) {
        this.position = position;
    },
    this.payOneUtility = function() {
        return 4 * diceRoll();
    },
    this.payTwoUtilities = function() {
        return 10 * diceRoll();
    },
    this.drawChance = function() {
        return drawChanceCard();
    },
    this.drawCommunityChest = function() {
        return drawCommunityChestCard();
    },
    this.moveByCard = function(card) {
        if (!card.hasOwnProperty('new position')) {
            return false;
        }
        switch (card['new position']) {
            case 'Next utility':
                this.advanceToNearestUtility();
                break;
            case 'Back 3 spaces':
                this.advance(-3);
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
    this.moveByCommunityChestCard = function() {
        return this.moveByCard(this.drawCommunityChest());
    },
    this.moveByChanceCard = function() {
        return this.moveByCard(this.drawChance());
    }
}

module.exports = { Player };