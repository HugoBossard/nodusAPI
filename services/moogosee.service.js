const mongoose = require('mongoose');
let count = 0;

let options = {

    
};

mongoose.set('strictQuery', true);

let connectWithRetry;

if (process.env.NODE_ENV === "production") {
    options = {
        'dbName': process.env.MONGODB_ADDON_DB,
        'user': process.env.MONGODB_ADDON_USER,
        'pass': process.env.MONGODB_ADDON_PASSWORD
    }

    connectWithRetry = () => {
        console.log('MongoDB connection with retry')
        mongoose.connect(process.env.MONGODB_ADDON_URI, options).then(()=>{
            console.log('MongoDB is connected')
        }).catch(err=>{
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000)
        })
    };
}
else {
    connectWithRetry = () => {
        console.log('MongoDB connection with retry')
        mongoose.connect("mongodb://localhost:27017/Nodus-API", options).then(()=>{
            console.log('MongoDB is connected')
        }).catch(err=>{
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
            setTimeout(connectWithRetry, 5000)
        })
    };
}

connectWithRetry();

exports.mongoose = mongoose;