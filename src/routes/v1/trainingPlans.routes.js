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

router.post('/', (req, res) => {
    const { user_id, name, description, exercises_id } = req.body;
    if (!user_id || !name || !description || !exercises_id) {
        return res.status(404).json({ error: 'faltan datos weba' })
    }

    const newTrainingPlans = {
        id: `${Date.now()}`,
        user_id,
        name,
        description,
        exercises_id,
        createdAt: new Date().toISOString()
    }
    trainingPlans.push(newTrainingPlans)
    res.status(201).json(newTrainingPlans)
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, name, description, exercises_id } = req.body;

    const index = trainingPlans.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(400).json({ error: 'se requieren todos los datos 🤣🤣' })
    }

    trainingPlans[index] = {
        ...trainingPlans[index],
        user_id,
        name,
        description,
        exercises_id
    };

    res.status(200).json(trainingPlans[index]);
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = trainingPlans.findIndex(t => t.id === id);

    if (index === -1) {

        return res.status(404).json({ error: `El ejercicio con ID ${id} no fue encontrado.` });
    }

    trainingPlans[index] = {
        ...trainingPlans[index],
        ...updates
    };

    res.status(200).json(trainingPlans[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = trainingPlans.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome, espabile' });
    }

    const deletedPlans = trainingPlans.splice(index, 1);
    res.status(200).json({ deleted: deletedPlans[0].id });    
})

module.exports = router;