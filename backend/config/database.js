const mongoose = require("mongoose");


const Database_Connection = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true,})
        .then((data) => {
            console.log(`successfully connect database host in ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = Database_Connection;