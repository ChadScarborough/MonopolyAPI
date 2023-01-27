class diceRollObj {
    constructor(roll1, roll2) {
        this.roll1 = roll1;
        this.roll2 = roll2;
        this.value = roll1 + roll2;
        this.isDouble = (roll1 === roll2);
    }
};

const dieRoll = () => Math.ceil(Math.random() * 6);

const diceRoll = () => {
    const roll1 = dieRoll();
    const roll2 = dieRoll();
    return new diceRollObj(roll1, roll2);
}

module.exports = { diceRoll };