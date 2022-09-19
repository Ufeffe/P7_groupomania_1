const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const postCtrl = require('../controllers/posts')

// Routes avec gestion de fichiers images
router.post('/', auth, postCtrl.createPost)
router.put('/:id', auth, postCtrl.modifyPost)

// Routes sans gestion de fichiers images
router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getOnePost)
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost)


module.exports = router