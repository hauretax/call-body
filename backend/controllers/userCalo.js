const Profile = require('../models/Profile');
const date = require('../tools/getDate');

exports.addCalo = (req, res, next) => {
  let now = date.getDate();
  Profile.findOne({ _id: req.body.userId, calo: { $elemMatch: { date: now } } })
    .then(function (profile) {
      if (profile) {
        Profile.updateOne( //j'ajoute les caloris si  une as dejas ete enregistrer aujourdhuis 
          { _id: req.body.userId, calo: { $elemMatch: { date: now } } },
          { $inc: { "calo.$.calo": Number(req.body.calo) } }
        )
          .then(() => res.status(200).json(profile.calo[profile.calo.length - 1]))
          .catch(error => res.status(404).json({ error }))
      }
      else
        Profile.updateOne( //je set la premier calorie du jours
          { _id: req.body.userId },
          { $push: { calo: { "date": now, "calo": Number(req.body.calo) } } })
          .then(() => res.status(200).json(profile.calo[profile.calo.length - 1]))
          .catch(error => res.status(404).json({ error }))
    })
    .catch(error => console.log('usercalo say : ' + error))
}

exports.showcalo = (req, res, next) => {
  Profile.findOne({ _id: req.body.userId })
    .then(profile => { console.log(profile.calo); res.status(200).json(profile.calo || null);})
    .catch(error => res.status(404).json({ error }))
};