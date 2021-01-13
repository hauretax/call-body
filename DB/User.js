const mongoose = require('mongoose');

const user = new mongoose.Schema({
    fistname:{
        type:String
    },
    badname:{
        type:String
    }
});

module.exports = User = mongoose.model('user', user);