module.exports = {

    "development":{
        mongoDBUrl: 'mongodb://localhost:27017/team0x13',
         secret: 'areyoucuriousnow?'
    },
    "production": {
        mongoDBUrl: process.env.MONGODB_URL || process.env.MONGOLAB_URI,
    }
    
};
