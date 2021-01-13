const Profile = require('../models/Profile');
const date = require('../tools/getDate');

exports.addWeight = (req,res,next) =>{
    let now = date.getDate();
    Profile.findOne( { email: req.body.email, weight: {$elemMatch: {date: now}} })
    .then(function(profile){
        console.log('['+profile+']')
        if(profile)
          Profile.findOneAndUpdate( //je change la masse si  une as dejas ete enregistrer aujourdhuis 
            { email: req.body.email, weight: {$elemMatch: {date: now}} },
            { $set: { "weight.$": {date: now, weight :  req.body.weight}} }
          )
            .then( res.status(200).json('poids modifier'))
            .catch(error => res.status(404).json({ error }))
        else
          Profile.findOneAndUpdate( //je set la masse si aucune est enregistrer aujourdhuis
            { email: req.body.email }, 
            { $push: {weight: {"date" : now,"weight" : req.body.weight,}}})
            .then(() => res.status(200).json('poids ajouter'))
            .catch(error => res.status(404).json({ error }))
      })
    .catch(error=> console.log('userWeight say : ' + error))
  }
  
  exports.showWeight = (req,res,next) =>{
    console.log (req.body.userId)
    Profile.findOne({ _id: req.body.userId })
      .then(profile => res.status(200).json(profile.weight))
      .catch(error => res.status(404).json({ error }))
  };