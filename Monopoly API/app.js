const { requestDataProxy } = require('./request-handler');
const express = require('express');

const app = new express();
const numberRegex = /^\d+$/;

app.get('/api', (req, res) => {
    const { games, turns, opponents } = req.query;
    if (!games || !turns || !opponents || !numberRegex.test(games) || !numberRegex.test(turns) || !numberRegex.test(opponents)) {
        res.status(400).send("Invalid query. Query must specify an integer number of 'games', 'turns', and 'opponents' such that the product of those numbers is not greater than 5 million.");
        return;
    }
    requestDataAsync(Number(games), Number(turns), Number(opponents))
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send("Error encountered"));
})

app.listen(5000, () => {
    console.log('server is listening on port 5000');
});

const requestDataAsync = async (numberOfGames, turnsPerGame, numberOfOpponents) => {
    try {
        return await requestDataProxy(numberOfGames, turnsPerGame, numberOfOpponents);
    } catch (err) {
        console.log(err);
        throw new Error();
    }
};