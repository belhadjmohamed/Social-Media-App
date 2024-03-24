const router = require('express').Router();

const postCtrl = require('../controllers/postCtrl')
const auth = require('../middlewares/auth');


router.route('/posts').post(auth,postCtrl.createPost).get(auth,postCtrl.getPost);

router.route('/post/:id').patch(auth, postCtrl.updatePost).get(auth,postCtrl.getOnePost).delete(auth,postCtrl.DeletePost);

router.patch('/post/:id/like', auth, postCtrl.likepost)

router.patch('/post/:id/unlike', auth, postCtrl.unlikepost)

router.get('/userposts/:id',auth,postCtrl.getUserPosts)

router.patch('/save/:id', auth, postCtrl.savePost)

router.patch('/unsave/:id', auth, postCtrl.unsavePost)

router.get('/savedpostget/:id',auth,postCtrl.getsavePost)

module.exports = router;