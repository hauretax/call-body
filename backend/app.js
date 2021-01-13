const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth')

//connection as mongodb
mongoose.connect('mongodb+srv://hauretax:Yuihjk7890@cluster0.czliw.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//dir as l apli de charge se fichier
app.use(express.static(path.join( __dirname, '../frontend')));

//ajout de deux petit truc pour que bodypare fonctionne
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
//autoriser l acce a tout se petit monde depuis l exterieur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//pour charger ma page de test
app.use(express.static(path.join( __dirname, '../../my-app/build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join( __dirname, "../../my-app/build/index.html"))
});

app.use('/api/user', userRoutes)
app.use('/auth', authRoutes)

module.exports = app;