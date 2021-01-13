const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const Profile = require('../models/Profile')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Profile({
                ...req.body,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur cree !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.statu(500).json({ error }));
}

exports.login = (req, res, next) => {
    console.log(req.body) 
    Profile.findOne({ email: req.body.email })
        .then(user => {
            if ( !user )
                return res.status(401).json({ error: 'Utilisateur non trouver !'});
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid)
                        return res.status(401).json({ error: 'Mot de passe incorrect !'})
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'cleDeDev',
                            { expiresIn : '24h'}
                        )
                    })
                })
                .catch(error => res.statu(500).json({ error }))
        })
        .catch(error => res.statu(500).json({ error }));
}