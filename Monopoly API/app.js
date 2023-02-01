const { requestDataProxy } = require('./request-handler');
const express = require('express');

const app = new express();

app.get('/api/query', (req, res) => {
    const { games, turns, opponents } = req.query;
    if (!games || !turns || !opponents) {
        res.status(400).send("Invalid query");
        return;
    }
    requestDataAsync(Number(games), Number(turns), Number(opponents))
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send("Error encountered"));
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