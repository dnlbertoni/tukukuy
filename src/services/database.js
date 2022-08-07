require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB, {})
        .then(db => console.log('DB conectada'))
        .catch(err => console.log(err));