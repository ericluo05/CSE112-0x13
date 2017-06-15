module.exports = {
    "development":{
        mongoDBUrl: process.env.CUSTOMDB || 'mongodb://localhost:27017/team0x13',
    },
    "production": {
        mongoDBUrl: process.env.MONGODB_URL || process.env.MONGOLAB_URI,
    },
    "test": {
        mongoDBUrl: 'mongodb://localhost:27017/team0x13',
    },
    port: process.env.PORT || 3000
};
