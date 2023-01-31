class diceRollObj {
    constructor(roll1, roll2) {
        this.roll1 = roll1;
        this.roll2 = roll2;
        this.value = roll1 + roll2;
        this.isDouble = (roll1 === roll2);
    }
};

const rollDie = () => Math.ceil(Math.random() * 6);

const rollDice = () => {
    const roll1 = rollDie();
    const roll2 = rollDie();
    return new diceRollObj(roll1, roll2);
}

module.exports = { rollDice };