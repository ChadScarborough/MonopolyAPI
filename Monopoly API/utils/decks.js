const communityChest = require('./community-chest.json');
const chance = require('./chance.json');

const communityChestDeck = communityChest['Community Chest cards'];
const chanceDeck = chance['Chance cards'];

let shuffledCommunityChestDeck, shuffledChanceDeck;

const shuffle = (deck) => {
    const outputDeck = [];
    while (deck.length > 0) {
        const random = Math.floor(Math.random() * deck.length);
        const card = deck.splice(random, 1)[0];
        outputDeck.push(card);
    }
    return outputDeck;
}

const drawCard = (deck) => {
    const card = deck[0];
    deck.push(deck.shift());
    return card;
}

const drawCommunityChestCard = () => {
    return drawCard(shuffledCommunityChestDeck);
}

const drawChanceCard = () => {
    return drawCard(shuffledChanceDeck);
}

shuffledCommunityChestDeck = shuffle(communityChestDeck);
shuffledChanceDeck = shuffle(chanceDeck);

module.exports = { drawCommunityChestCard, drawChanceCard };