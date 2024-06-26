const router = require('express').Router();

const commentCtrl = require('../controllers/commentCtrl')
const auth = require('../middlewares/auth');


router.post('/comment',auth,commentCtrl.createComment);
router.patch('/comment/:id',auth,commentCtrl.updateComment);
router.patch('/comment/:id/like',auth,commentCtrl.likecomment);
router.patch('/comment/:id/unlike',auth,commentCtrl.unlikecomment);
router.delete('/comment/:id',auth,commentCtrl.deleteComment);


module.exports = router;