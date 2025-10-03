let trainingExercises = [
    {
        id: "1",
        trainingPlans_id: "1",
        reps: "12 por ejercicio",
        sets: "3-4 depende del peso que uses",
        weigh: "40kg"
    }
];

const getAllTrainingExercises = (req, res) => {
    const { trainingPlans_id, reps, search } = req.query; 

    let result = trainingExercises; // Usar trainingExercises, no subscriptions

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
};

const getOneTrainingExercise = (req, res) => {
    const { id } = req.params;
    const trainingExercise = trainingExercises.find(te => te.id === id);

    if (!trainingExercise) {
        return res.status(404).json({ error: 'ejercicio no encontrado' });
    }
    res.status(200).json(trainingExercise); // Corregido para devolver el objeto, no todo el array
};

const createNewTrainingExercise = (req, res) => {
    const { trainingPlans_id, reps, sets, weigh } = req.body;
    if (!trainingPlans_id || !reps || !sets || !weigh) {
        return res.status(400).json({ error: 'faltan datos weba' }); // Cambiado a 400
    }

    const newTrainingExercise = {
        id: `${Date.now()}`,
        trainingPlans_id,
        reps,
        sets,
        weigh,
        createdAt: new Date().toISOString()
    };
    trainingExercises.push(newTrainingExercise);
    res.status(201).json(newTrainingExercise);
};

const updateOneTrainingExercise = (req, res) => {
    const { id } = req.params;
    const { trainingPlans_id, reps, sets, weigh } = req.body;

    const index = trainingExercises.findIndex(te => te.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado' }); // Cambiado a 404
    }
    
    // Asumo que se requiere la validación completa en PUT
    if (!trainingPlans_id || !reps || !sets || !weigh) {
        return res.status(400).json({ error: 'se requieren todos los datos 🤣🤣' });
    }

    trainingExercises[index] = {
        ...trainingExercises[index],
        trainingPlans_id,
        reps,
        sets,
        weigh
    };

    res.status(200).json(trainingExercises[index]);
};

const patchOneTrainingExercise = (req, res) => {
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
};

const deleteOneTrainingExercise = (req, res) => {
    const { id } = req.params;
    const index = trainingExercises.findIndex(te => te.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome, espabile' });
    }

    const deletedtraining = trainingExercises.splice(index, 1);
    res.status(200).json({ deleted: deletedtraining[0].id }); 
};

module.exports = {
    getAllTrainingExercises,
    getOneTrainingExercise,
    createNewTrainingExercise,
    updateOneTrainingExercise,
    patchOneTrainingExercise,
    deleteOneTrainingExercise
};