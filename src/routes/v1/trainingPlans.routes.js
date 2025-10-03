const express = require('express');
const router = express.Router();

let trainingPlans = [
    {
        id: "1",
        user_id: "1",
        name: "rutina para ganar masa",
        description: "ricos ejercicios para ganar puro musculo",
        exercises_id: [
            "2",
            "3",
            "1"
        ]
    }
]

router.get('/', (req, res) => {
    res.status(200).json(trainingPlans)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const trainingPlan = trainingPlans.find(t => t.id === id);

    if (!trainingPlan) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    res.status(200).json(trainingPlans);
});

module.exports = router;