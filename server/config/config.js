module.exports = {
    "development":{
        mongoDBUrl: process.env.CUSTOMDB || 'mongodb://localhost:27017/team0x13',
    },
    "production": {
        mongoDBUrl: process.env.MONGODB_URL || process.env.MONGOLAB_URI,
    },
    port: process.env.PORT || 3000
};
