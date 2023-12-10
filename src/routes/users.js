const express = require('express');

const UserController = require('../controller/users.js');

const router = express.Router();

const verifyToken = require('../middleware/token.js')


// CREATE - POST
router.post('/register', UserController.createNewUser)

// LOGIN
router.post('/login', UserController.loginUser)

// READ - GET
router.get('/', verifyToken, UserController.getAllUsers);

// READ - GET by ID
router.get('/:idUser', verifyToken, UserController.getUserbyID)

// READ - GET by email
router.get('/email/:email', UserController.getUserByEmail)

// UPDATE - USER
router.put('/:idUser', verifyToken, UserController.updateUser);

// DELETE - DELETE
router.delete('/:idUser', verifyToken,UserController.deleteUser);





module.exports = router;