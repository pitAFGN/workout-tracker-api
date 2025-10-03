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
        return res.status(404).json({ error: 'ejercicio no encontrado'})
    }
res.status(200).json(exercises);
});

module.exports = router;