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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, progress, goal } = req.body;

    const index = trainingReports.findIndex(r => r.id === id);
    if (index === -1) {
        return res.status(400).json({ error: 'se requieren todos los datos 🤣🤣' })
    }

    trainingReports[index] = {
        ...trainingReports[index],
        user_id,
        progress,
        goal
    };

    res.status(200).json(trainingReports[index]);
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = trainingReports.findIndex(r => r.id === id);

    if (index === -1) {

        return res.status(404).json({ error: `El ejercicio con ID ${id} no fue encontrado.` });
    }

    trainingReports[index] = {
        ...trainingReports[index],
        ...updates
    };

    res.status(200).json(trainingReports[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = trainingReports.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome, espabile' });
    }

    const deletedreport = trainingReports.splice(index, 1);
    res.status(200).json({ deleted: deletedreport[0].id });    
})

router.get('/', (req, res) => {
    const { user_id, progress, search } = req.query; 

    let result = subscriptions;

    if (user_id) {
        const user_idLower = user_id.toLowerCase();
        result = result.filter(r => 
            r.user_id && r.user_id.toLowerCase() === user_idLower
        );
    }

    if (progress) {
        const progressLower = progress.toLowerCase();
        result = result.filter(r => 
            r.progress && r.progress.toLowerCase() === progressLower
        );
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(r =>
            r.user_id.toLowerCase().includes(searchLower)
        );
    }
    
    res.status(200).json(result);
});

module.exports = router;