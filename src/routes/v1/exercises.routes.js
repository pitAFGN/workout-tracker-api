const express = require('express');
const router = express.Router();

let exercises = [
    {
        id: "1",
        name: "prensa de pierna",
        description: "entrenamiento de fuerza muy popular que se realiza con una máquina de pesas específica. Es ideal para desarrollar la masa muscular y la fuerza del tren inferior",
        category: "fuerza",
        muscleGroup: "piernas"
    }
]

router.get('/', (req, res) => {
    res.status(200).json(exercises)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const exercise = exercises.find(e => e.id === id);

    if (!exercise) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    res.status(200).json(exercises);
});

router.post('/', (req, res) => {
    const { name, description, category, muscleGroup } = req.body;
    if (!name || !description || !category || !muscleGroup) {
        return res.status(404).json({ error: 'faltan datos por llenar mijo pongase pues las pilas' })
    }

    const newExercise = {
        id: `${Date.now()}`,
        name,
        description,
        category,
        muscleGroup,
        createdAt: new Date().toISOString()
    }
    exercises.push(newExercise)
    res.status(201).json(newExercise)
})
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, category, muscleGroup } = req.body;

    const index = exercises.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(400).json({ error: 'se requieren todos los datos heche cabeza papi' })
    }

    exercises[index] = {
        ...exercises[index],
        name,
        description,
        category,
        muscleGroup
    };

    res.status(200).json(exercises[index]);
})
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = exercises.findIndex(e => e.id === id);

    if (index === -1) {

        return res.status(404).json({ error: `El ejercicio con ID ${id} no fue encontrado.` });
    }

    exercises[index] = {
        ...exercises[index],
        ...updates
    };

    res.status(200).json(exercises[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome 😡' });
    }

    const deletedExercise = exercises.splice(index, 1);
    res.status(200).json({ deleted: deletedExercise[0].id });    
})

router.get('/', (req, res) => {
    const { muscleGroup, category, search } = req.query; 

    let result = exercises;

    if (muscleGroup) {
        const groupLower = muscleGroup.toLowerCase();
        result = result.filter(e => 
            e.muscleGroup && e.muscleGroup.toLowerCase() === groupLower
        );
    }

    if (category) {
        const categoryLower = category.toLowerCase();
        result = result.filter(e => 
            e.category && e.category.toLowerCase() === categoryLower
        );
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(e =>
            e.name.toLowerCase().includes(searchLower)
        );
    }
    
    res.status(200).json(result);
});

module.exports = router;