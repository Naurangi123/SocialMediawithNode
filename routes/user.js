const express = require('express');
const router = express.Router();
const userController =  require('../controllers/user');


router
    .route('/')
    .get(userController.User)
    .post(userController.signUp);

router.post('/login', userController.login);


module.exports = router;