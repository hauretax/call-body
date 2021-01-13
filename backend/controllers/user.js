const Profile = require('../models/Profile');
const date = require('../tools/getDate')

exports.modifyUser = (req, res, next) =>{
  console.log('yooo' + req.body.nb + req.body.param);
  switch(req.body.param){
    case 'goal':   {
      Profile.updateOne({ email: req.body.email}, 
        {goal: req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
    case 'calo':{
      Profile.updateOne({ email: req.body.email}, 
        {calo: req.body.nb})
      .then(() => res.status(200).json({message: 'objet modifier'}))
      .catch(error => res.status(400).json({ error }))
      break;
    }
  }
};

/*
exports.showUser = (req,res,next) =>{
    Profile.findOne({ _id: req.params.id })
      .then(profile => res.status(200).json(profile))
      .catch(error => res.status(404).json({ error }))
};

exports.showAllUser = (req, res, next) => {
    Profile.find()
      .then(profile => res.status(200).json(profile))
      .catch(error => res.status(400).json({ error }))
};*/