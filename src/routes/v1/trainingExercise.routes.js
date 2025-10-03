const express = require('express');
const router = express.Router();

let trainingExercises = [
    {
        id: "1",
        trainingPlans_id: "1",
        reps: "12 por ejercicio",
        sets: "3-4 depende del peso que uses",
        weigh: "40kg"
    }
]

router.get('/', (req, res) => {
    res.status(200).json(trainingExercises)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const trainingExercise = trainingExercises.find(te => te.id === id);

    if (!trainingExercise) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    res.status(200).json(trainingExercises);
});

router.post('/', (req, res) => {
    const { trainingPlans_id, reps, sets, weigh } = req.body;
    if (!trainingPlans_id || !reps || !sets || !weigh) {
        return res.status(404).json({ error: 'faltan datos weba' })
    }

    const newTrainingExercise = {
        id: `${Date.now()}`,
        trainingPlans_id,
        reps,
        sets,
        weigh,
        createdAt: new Date().toISOString()
    }
    trainingExercises.push(newTrainingExercise)
    res.status(201).json(newTrainingExercise)
})


module.exports = router;