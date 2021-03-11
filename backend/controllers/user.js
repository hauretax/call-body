const Profile = require('../models/Profile');
const date = require('../tools/getDate')

exports.modifyUser = (req, res, next) =>{
  console.log('yooo' + req.body.nb + req.body.param);
  switch(req.body.param){
    case 'goal':   {
      Profile.updateOne({ _id: req.body.userId}, 
        {goal: req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
    case 'calo':{
      Profile.updateOne({ _id: req.body.userId}, 
        {caloGoal : req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
    case 'tauxg':{
      Profile.updateOne({ _id: req.body.userId}, 
        {tauxg : req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
    case 'multa':{
      Profile.updateOne({ _id: req.body.userId}, 
        {multa : req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
    case 'pertp':{
      Profile.updateOne({ _id: req.body.userId}, 
        {pertp : req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
  }
};

exports.getBodyValue = (req,res,next) =>{
    Profile.findOne({ _id: req.body.userId })
      .then(profile => {res.status(200).json({
        u : profile
          }|| null);})
      .catch(error => res.status(404).json({ error }))
};

/*
exports.showAllUser = (req, res, next) => {
    Profile.find()
      .then(profile => res.status(200).json(profile))
      .catch(error => res.status(400).json({ error }))
};*/