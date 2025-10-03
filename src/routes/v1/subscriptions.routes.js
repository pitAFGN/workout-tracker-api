const express = require('express');
const router = express.Router();
const path = require('path');

const subscriptionsController = require(
    path.resolve(__dirname, '../../../src/controllers/subscriptionsController')
);

router.get('/', subscriptionsController.getAllSubscriptions);

router.get('/:id', subscriptionsController.getOneSubscription);

router.post('/', subscriptionsController.createNewSubscription);

router.put('/:id', subscriptionsController.updateOneSubscription);

router.patch('/:id', subscriptionsController.patchOneSubscription);

router.delete('/:id', subscriptionsController.deleteOneSubscription);

module.exports = router;