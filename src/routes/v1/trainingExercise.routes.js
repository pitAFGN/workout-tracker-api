const express = require('express');
const router = express.Router();
const path = require('path');

const trainingExerciseController = require(
    path.resolve(__dirname, '../../../src/controllers/trainingExerciseController')
);

router.get('/', trainingExerciseController.getAllTrainingExercises);

router.get('/:id', trainingExerciseController.getOneTrainingExercise);

router.post('/', trainingExerciseController.createNewTrainingExercise);

router.put('/:id', trainingExerciseController.updateOneTrainingExercise);

router.patch('/:id', trainingExerciseController.patchOneTrainingExercise);

router.delete('/:id', trainingExerciseController.deleteOneTrainingExercise);

module.exports = router;