const router = require('express').Router();

const auth = require('../middlewares/auth'); 

const upload = require('../middlewares/upload');

const userCtrl = require('../controllers/userCtrl');

router.get('/search',auth,userCtrl.searchUser);

router.get('/user/:id',auth,userCtrl.getUser);

router.patch('/user',auth,userCtrl.updateUser);

router.patch('/user/:id/friends',auth,userCtrl.friends);

router.patch('/user/:id/unfriends',auth,userCtrl.unfriends);

router.put('/update',upload,userCtrl.updateUserimage);

router.patch('/saveLovation', auth, userCtrl.saveLocation);

router.get('/getLocation', auth, userCtrl.getLocation);

router.get('/users', auth, userCtrl.getusers);


module.exports = router ; 

