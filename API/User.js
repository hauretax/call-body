const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', async(req,res)=>{
    const{firstname,lastname} = req.body;
    let user = {};
    user.fistname = firstname;
    user.badname = lastname;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
})

module.exports = route;