const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')

const commentaireCtrl = require('../controllers/commentaire')

router.post('/:id', auth, commentaireCtrl.createCommentaire)
router.put('/:id', auth, commentaireCtrl.modifyCommentaire)

router.get('/:id', auth, commentaireCtrl.getAllCommentaire)
router.delete('/:id', auth, commentaireCtrl.deleteCommentaire);


module.exports = router