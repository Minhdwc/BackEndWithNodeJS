const express = require('express');
const router = express.Router();
const reviewController = require('../../Controllers/review.controller')

router.post('/create', reviewController.create)
router.get('/get/d:id', reviewController.getOne)
router.get('/get/all', reviewController.getAll)
router.put('/update/u:id', reviewController.update)
router.delete('/delete/d:id', reviewController.deleteReview)

module.exports = router;