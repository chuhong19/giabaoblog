const express = require('express');
const router = express.Router();

const gameController = require('../app/controllers/GameController');

router.get('/create', gameController.create);
router.post('/store', gameController.store);   
router.get('/:id/edit', gameController.edit);
router.post('/handle-form-actions', gameController.handleFormActions);
router.put('/:id', gameController.update);
router.patch('/:id/restore', gameController.restore);
router.delete('/:id', gameController.destroy);
router.delete('/:id/force', gameController.forceDestroy);
router.get('/:slug', gameController.show);

module.exports = router;
