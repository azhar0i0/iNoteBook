const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://azhar7t2:IT579oR8lLehs0xf@cluster0.4qku3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = () => {
    mongoose.connect(mongoURL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => {
        console.error("Error connecting to MongoDB:", err, "error in db.js");
        process.exit(1);
    });
};

module.exports = connectToMongo;
