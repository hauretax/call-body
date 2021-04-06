const Profile = require('../models/Profile');
const date = require('../tools/getDate');

exports.addWeight = (req, res, next) => {
  console.log(req.body.userId + " sssici")
  let now = date.getDate();
  Profile.findOne({ _id: req.body.userId, weight: { $elemMatch: { date: now } } })
    .then(function (profile) {
      if (profile) {
        Profile.updateOne( //je change la masse si  une as dejas ete enregistrer aujourdhuis 
          { _id: req.body.userId, weight: { $elemMatch: { date: now } } },
          { $set: { "weight.$": { date: now, weight: req.body.weight } } }
        )
          .then(res.status(200).json(profile.weight[profile.weight.length - 1]))
          .catch(error => res.status(404).json({ error }))
          console.log(profile.weight);
      }
      else {
        let value = { date: now, value: req.body.weight }
        Profile.updateOne( //je set la masse si aucune est enregistrer aujourdhuis
          { _id: req.body.userId },
          { $push: { weight: { "date": now, "weight": req.body.weight, } } })
          .then(() => res.status(200).json(value))
          .catch(error => res.status(404).json({ error }))
      }
    })
    .catch(error => console.log('userWeight say : ' + error))
}

exports.showWeight = (req, res, next) => {
  Profile.findOne({ _id: req.body.userId })
    .then(profile => { res.status(200).json(profile.weight || null); })
    .catch(error => res.status(404).json({ error }))
};