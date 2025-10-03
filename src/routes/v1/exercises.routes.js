const express = require('express');
const router = express.Router();
const path = require('path');
const exerciseController = require(
    path.resolve(__dirname, '../../../src/controllers/exercisesController')
);

router.get('/', exerciseController.getAllExercises);

router.get('/:id', exerciseController.getOneExercise);

router.post('/', exerciseController.createNewExercise);

router.put('/:id', exerciseController.updateOneExercise);

router.patch('/:id', exerciseController.patchOneExercise);

router.delete('/:id', exerciseController.deleteOneExercise);

module.exports = router;