const { player } = require('./player');

for (let i = 0; i < 100; i++) {
    player.takeTurn();
    console.log(player.getCurrentSpace().name);
}