const express = require('express');
const router = express.Router();
const path = require('path');

const trainingPlansController = require(
    path.resolve(__dirname, '../../../src/controllers/trainingPlansController')
);

router.get('/', trainingPlansController.getAllTrainingPlans);

router.get('/:id', trainingPlansController.getOneTrainingPlan);

router.post('/', trainingPlansController.createNewTrainingPlan);

router.put('/:id', trainingPlansController.updateOneTrainingPlan);

router.patch('/:id', trainingPlansController.patchOneTrainingPlan);

router.delete('/:id', trainingPlansController.deleteOneTrainingPlan);

module.exports = router;