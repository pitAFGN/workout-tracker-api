const express = require('express');
const router = express.Router();

let trainingReports = [
    {
        id: "1",
        user_id: "1",
        progress: "1 mes de entrenamiento y no hay mucho cambio fisico",
        goal: "3 meses, cambio notable"

    }
]

router.get('/', (req, res) => {
    res.status(200).json(trainingReports)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const trainingReport = trainingReports.find(r => r.id === id);

    if (!trainingReport) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    res.status(200).json(trainingReports);
});

router.post('/', (req, res) => {
    const { user_id, progress, goal } = req.body;
    if (!user_id || !progress || !goal) {
        return res.status(404).json({ error: 'faltan datos weba' })
    }

    const newTrainingReport = {
        id: `${Date.now()}`,
        user_id,
        progress,
        goal,
        createdAt: new Date().toISOString()
    }
    trainingReports.push(newTrainingReport)
    res.status(201).json(newTrainingReport)
})

module.exports = router;