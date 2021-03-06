import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

// Import models and routes
// import Game from './app/models/game';
import { getGames, getGameById, postGame, deleteGame } from './app/routes/game';
import { register, login, logout, updateUser, deleteUser } from './app/routes/user';
// verify token for some api
import { verifyToken } from './app/utils/verifyToken';

// import mongodb config
import { mongodbUser } from './app/config/mongodb';

const app = express();
const port = process.env.PORT || 8080;
// DB connecttion through Mongoose
const options = {
    server: {
        socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
    },
    replset: {
        socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }
    }
};

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongodbUser.userName}:${mongodbUser.password}@ds125341.mlab.com:25341/game`, options);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Tell express where to find the static assets
app.use(express.static(__dirname + '/client/dist'));

// Enabled CORS to make HTTP request from webpack-dev-server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// API routes
app.route('/api/auth/register').post(register);
app.route('/api/auth/login').post(login);
app.route('/api/auth/logout').get(verifyToken, logout);
app.route('/api/user/:id').put(verifyToken, updateUser)
    .delete(verifyToken, deleteUser);

// Send back homepage for other requests
app.route('*').get((req, res) => {
    res.sendFile('client/dist/index.html', { root: __dirname });
});

app.listen(port);

console.log(`App listening on port ${port}`);