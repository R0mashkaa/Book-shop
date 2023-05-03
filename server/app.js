const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
require('dotenv').config({ path: path.join(__dirname, 'env', `.env.${process.env.NODE_ENV || 'local'}`) });
global.rootPath = __dirname;

const mainRouter = require('./api/api.router');
const { PORT, MONGO_URL } = require('./configs/variables');
const { NotFound } = require('./errors/Apierror');
const { SERVER_ERROR } = require('./errors/error.codes');

const app = express();

mongoose.set('debug', true);
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL)
    .then(() => { console.log('Connected to: ', MONGO_URL); })
    .catch((e) => { console.log(e); });


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
// app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(fileUpload({
    limits: { fileSize: 200 * 1024 * 1024 },
}));

app.use('/api', mainRouter);
app.use('*', notFoundError);
app.use(mainErrorHandler);

app.listen(PORT, () => {
    console.log('Started on port: ', PORT);
});

function notFoundError(req, res, next) {
    next(new NotFound('Route not found'));
}

function mainErrorHandler(err, req, res) {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error'
        });
}