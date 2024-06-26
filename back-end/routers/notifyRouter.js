const router = require('express').Router();

const notifyCtrl = require('../controllers/notifyCtrl');
const auth = require('../middlewares/auth');


router.post('/notify',auth,notifyCtrl.createnotify);
router.delete('/notify/:id',auth,notifyCtrl.removenotify);
router.get('/notifies',auth,notifyCtrl.getnotify);
router.delete('/deleteallnotify',auth,notifyCtrl.DeleteAllnotifications);
router.patch('/isreadnotify/:id',auth,notifyCtrl.isReadNotify);


module.exports = router;