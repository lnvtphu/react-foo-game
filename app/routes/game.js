// import the game schema
import Game from '../models/game';

// Get all the games sorted by postDate
const getGames = (req, res) => {
    // Query the db, if no errors send all the games to the client
    Game.find(null, null, { sort: {postDate : 1 } }, (err, games) => {
        if (err) {
            res.send(err);
        }else {
            res.json(games); // Send a list games as json
        }
    });
}

// Get the single game filtered by Id
const getGameById = (req, res) => {
    const { id } = req.params;
    // Query the db, if no errors send the game to the client
    Game.findById(id, (err, game) => {
        if (err) {
            res.send(err);
        }else {
            res.json(game);
        }
    });
}

// Get the body data to created a new game
const postGame = (req, res) => {
    // Assign the game info to a empty game and send a message back if no errors
    let game = Object.assign( new Game(), req.body);
    // And then save it to the db
    game.save( (err) => {
        if (err) {
            res.send(err);
        }else {
            res.json({ message: 'Game created'});
        }
    });
}

// Delete the game by Id
const deleteGame = (req, res) => {
    const { id } = req.params;
    // Remove the game by id and send a message back if no errors
    Game.remove({ _id: id }, (err) => {
        if (err) {
            res.send(err);
        }else {
            res.json({ message: 'Successfully deleted'});
        }
    });
}

// Export functions to be used in the server routes
export { getGames, getGameById, postGame, deleteGame };