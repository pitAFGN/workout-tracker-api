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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { trainingPlans_id, reps, sets, weigh } = req.body;

    const index = trainingExercises.findIndex(te => te.id === id);
    if (index === -1) {
        return res.status(400).json({ error: 'se requieren todos los datos 🤣🤣' })
    }

    trainingExercises[index] = {
        ...trainingExercises[index],
        trainingPlans_id,
        reps,
        sets,
        weigh
    };

    res.status(200).json(trainingExercises[index]);
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = trainingExercises.findIndex(te => te.id === id);

    if (index === -1) {

        return res.status(404).json({ error: `El ejercicio con ID ${id} no fue encontrado.` });
    }

    trainingExercises[index] = {
        ...trainingExercises[index],
        ...updates
    };

    res.status(200).json(trainingExercises[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = trainingExercises.findIndex(te => te.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome, espabile' });
    }

    const deletedtraining = trainingExercises.splice(index, 1);
    res.status(200).json({ deleted: deletedtraining[0].id });    
})

router.get('/', (req, res) => {
    const { trainingPlans_id, reps, search } = req.query; 

    let result = subscriptions;

    if (trainingPlans_id) {
        const trainingLower = trainingPlans_id.toLowerCase();
        result = result.filter(te => 
            te.trainingPlans_id && te.trainingPlans_id.toLowerCase() === trainingLower
        );
    }

    if (reps) {
        const repsLower = reps.toLowerCase();
        result = result.filter(te => 
            te.reps && te.reps.toLowerCase() === repsLower
        );
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(te =>
            te.trainingPlans_id.toLowerCase().includes(searchLower)
        );
    }
    
    res.status(200).json(result);
});

module.exports = router;