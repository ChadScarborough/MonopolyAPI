const { rollDice } = require('./dice');
const { getSpaceByPosition } = require('./spaces-by-position');
const { drawCommunityChestCard, drawChanceCard } = require('./decks');

function Player() {
    // Position around the board
    this.position = 0, 
    // Number of consecutive times dice rolls have been doubles (3 sends the player to jail)
    this.consecutiveDoubles = 0, 
    // Moves the player around the board
    this.advance = function(distance) { 
        this.position = (this.position + distance) % 40;
        if (this.position === 30) {
            this.position = 10;
            this.consecutiveDoubles = 0;
        }
    },
    // Rolls dice, checks for consecutive doubles, and advances the player as appropriate
    this.rollDiceToAdvance = function() { 
        const roll = rollDice();
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
    // Handles dice rolls as well as movement by Chance and Community Chest cards
    /* 
    This implementation isn't 100% accurate, because normally landing on a Chance space and being moved to
    a new space by the card drawn all happens on a single turn, but here a player lands on the space one turn
    and is moved on the next turn in place of rolling dice. However, given a sufficiently large sample size,
    the effect on the data is ultimately negligible. The only noticeable effect will be a slight 
    overrepresentation of Chance and (to a lesser extent) Community Chest spaces in the raw counts of spaces 
    where players ended their turns (though, in a sense, that count is more accurate because it represents
    the number of times players landed on those spaces at all as opposed to completely ending their turns on
    them).
    */
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
        return rollDice();
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
};

module.exports = { Player };