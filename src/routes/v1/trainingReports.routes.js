const express = require('express');
const router = express.Router();
const path = require('path');

const trainingReportsController = require(
    path.resolve(__dirname, '../../../src/controllers/trainingReportsController')
);

router.get('/', trainingReportsController.getAllTrainingReports);

router.get('/:id', trainingReportsController.getOneTrainingReport);

router.post('/', trainingReportsController.createNewTrainingReport);

router.put('/:id', trainingReportsController.updateOneTrainingReport);

router.patch('/:id', trainingReportsController.patchOneTrainingReport);

router.delete('/:id', trainingReportsController.deleteOneTrainingReport);

module.exports = router;