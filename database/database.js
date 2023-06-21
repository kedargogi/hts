const mongoose = require("mongoose");
const configs = require("../config/config");


let url = process.env.DB_URL || configs.DB_URL;
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set('strictQuery', true);
const createDbConnection = () => {
    mongoose
        .connect(url, connectionOptions)
        .then(() => {
            console.log("DATABASE CONNECTED SUCCESSFULLY");
        })
        .catch((error) => console.error(error));
};

module.exports = {
    createDbConnection,
};
