const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth-router');
const usersRouter = require('./routes/users-router');
const MongoClient = require('mongodb').MongoClient;
const sendError = require('./utils').sendError;
const url = 'mongodb://localhost:27017';
const db_name = 'ShoppingAssistant';

const app = express();
const port = 8080;

const corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }));
app.use('/api/auth', authRouter)
    .use('/api/users', usersRouter);

app.get('/', (req, res) => res.send('Hello from Shopping Assistant API!'))

app.use(function (err, req, res, next) {
    console.error(err.stack)
    sendError(req, res, 500, `Server error: ${err.message}`, err);
})

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, con) {
    if (err) throw err;
    app.locals.db = con.db(db_name);
    console.log(`Connection established to ${db_name}.`);
    app.listen(port, () => console.log(`Shopping assistant app listening at http://localhost:${port}`))
});

