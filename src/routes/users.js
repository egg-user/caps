const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();


// CREATE - POST
router.post('/register', UserController.createNewUser)

// LOGIN
router.post('/login', UserController.loginUser)

// READ - GET
router.get('/', UserController.getAllUsers);

// READ - GET by ID
router.get('/:idUser', UserController.getUserbyID)

// READ - GET by email
// router.get('/email/:email', UserController.getUserByEmail)

// UPDATE - USER
router.put('/:idUser', UserController.updateUser);

// DELETE - DELETE
router.delete('/:idUser', UserController.deleteUser);





module.exports = router;