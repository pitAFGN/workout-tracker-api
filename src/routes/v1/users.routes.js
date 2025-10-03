const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require(
    path.resolve(__dirname, '../../../src/controllers/usersController')
);

router.get('/', usersController.getAllUsers);

router.get('/:id', usersController.getOneUser);

router.post('/', usersController.createNewUser);

router.put('/:id', usersController.updateOneUser);

router.patch('/:id', usersController.patchOneUser);

router.delete('/:id', usersController.deleteOneUser);

module.exports = router;