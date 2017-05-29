module.exports = {
    "development":{
        mongoDBUrl: process.env.CUSTOMDB || 'mongodb://localhost:27017/team0x13',
        secret: 'areyoucuriousnow?'
    },
    "production": {
        mongoDBUrl: process.env.MONGODB_URL || process.env.MONGOLAB_URI,
        secret: process.env.SECRET
    },
    port: process.env.PORT || 3000
};
