const Profile = require('../models/Profile');
const date = require('../tools/getDate');

exports.addCalo = (req, res, next) => {
  let now = date.getDate();
  Profile.findOne( { email: req.body.email, calo: {$elemMatch: {date: now}} })
  .then(function(profile){
      console.log('['+profile+']')
      if(profile){
        Profile.updateOne( //j'ajoute les caloris si  une as dejas ete enregistrer aujourdhuis 
          { email: req.body.email, calo: {$elemMatch: {date: now}} },
          { $inc: { "calo.$.calo" : Number(req.body.calo)}}
        )
          .then(() => res.status(200).json('poids modifier'))
          .catch(error => console.log(error) )
        }
      else
        Profile.updateOne( //je set la premier calorie du jours
          { email: req.body.email }, 
          { $push: {calo: {"date" : now,"calo" : Number(req.body.calo)}}})
          .then(() => res.status(200).json('poids ajouter'))
          .catch(error => res.status(404).json({ error }))
    })
  .catch(error=> console.log('usercalo say : ' + error))
}

exports.showcalo = (req, res, next) => {
  console.log(req.body.userId)
  Profile.findOne({ _id: req.body.userId })
    .then(profile => res.status(200).json(profile.calo))
    .catch(error => res.status(404).json({ error }))
};