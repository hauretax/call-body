const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/user');
const weightCtrl = require('../controllers/userWeight');
const caloCtrl = require('../controllers/userCalo');
const auth = require('../middleware/auth');

///api/user
router.post('/addweight', auth, weightCtrl.addWeight)
router.post('/weight', auth, weightCtrl.showWeight)
router.post('/addcalo', auth, caloCtrl.addCalo)
router.post('/calo', auth, caloCtrl.showcalo)
router.post('/change', auth, profileCtrl.modifyUser)

module.exports = router;