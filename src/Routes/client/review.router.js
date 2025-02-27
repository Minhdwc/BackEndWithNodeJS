const express = require('express');
const router = express.Router();
const reviewController = require('../../Controllers/review.controller')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/create', authMiddleware.isAuthen, reviewController.create)
router.get('/get/d:id', authMiddleware.isAuthen, reviewController.getOne)
router.get('/get/all', authMiddleware.isAuthen, reviewController.getAll)
router.put('/update/u:id', authMiddleware.isAuthen, reviewController.update)
router.delete('/delete/d:id', authMiddleware.isAuthen, reviewController.deleteReview)

module.exports = router;