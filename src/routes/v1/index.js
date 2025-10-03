const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes')
const exercisesRoutes = require('./exercises.routes')
const subscriptionsRoutes = require('./subscriptions.routes')
const trainingPlansRoutes = require('./trainingPlans.routes')

router.use('/users', usersRoutes);

router.use('/exercises', exercisesRoutes);

router.use('/subscriptions', subscriptionsRoutes);

router.use('/trainingPlans', trainingPlansRoutes);

module.exports = router;