const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProfileSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required:true},
    goal: {type: Number, required: false},
    age: {type: Number, required: false},
    type: {type: Number, required: false},
    caloGoal: {type: Number, required: false},
    weight: {type: Object, require: false},
    calo: {type: Object, require: false},
    tauxg: {type: Number, require: false},
    multa: {type: Number, require: false},
    pertp: {type: Number, require: false},
});

ProfileSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Profile', ProfileSchema);