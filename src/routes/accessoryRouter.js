const express = require('express');
const router = express.Router();
const accessoryRouter = require('../controllers/accessoryController');

router.post('/create', accessoryRouter.createAccessory);
router.get('/getAll', accessoryRouter.getAllAccessories);
router.delete('/delete/:id', accessoryRouter.deleteAccessory);
router.post('/update/:id', accessoryRouter.updateAccessory);

module.exports = router;