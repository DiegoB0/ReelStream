const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.get('/get', userController.getUsers);
router.delete('/delete/:id', userController.deleteUser);
router.delete('/all', userController.deleteUsersWithoutClerkId);

module.exports = router;
