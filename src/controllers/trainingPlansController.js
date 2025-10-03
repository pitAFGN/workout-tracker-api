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

const getAllTrainingPlans = (req, res) => {
    const { name, description, search } = req.query; 

    let result = trainingPlans;

    // Filtro por nombre
    if (name) {
        const nameLower = name.toLowerCase();
        result = result.filter(t => 
            // Corregido: el filtro original parecía usar 'typeInscription' que no existe aquí.
            t.name && t.name.toLowerCase() === nameLower
        );
    }

    // Filtro por descripción
    if (description) {
        const descriptionLower = description.toLowerCase();
        result = result.filter(t => 
            t.description && t.description.toLowerCase() === descriptionLower
        );
    }
    
    // Búsqueda por nombre (asumiendo que 'search' busca en el nombre)
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(t =>
            t.name.toLowerCase().includes(searchLower)
        );
    }
    
    res.status(200).json(result);
};

const getOneTrainingPlan = (req, res) => {
    const { id } = req.params;
    const trainingPlan = trainingPlans.find(t => t.id === id);

    if (!trainingPlan) {
        return res.status(404).json({ error: 'Plan de entrenamiento no encontrado.' });
    }
    // Corregido: debe devolver el plan, no el array completo.
    res.status(200).json(trainingPlan); 
};

const createNewTrainingPlan = (req, res) => {
    const { user_id, name, description, exercises_id } = req.body;
    
    // Cambiado a 400 Bad Request
    if (!user_id || !name || !description || !exercises_id) {
        return res.status(400).json({ error: 'faltan datos weba' });
    }

    const newTrainingPlans = {
        id: `${Date.now()}`,
        user_id,
        name,
        description,
        exercises_id,
        createdAt: new Date().toISOString()
    };
    trainingPlans.push(newTrainingPlans);
    res.status(201).json(newTrainingPlans);
};

const updateOneTrainingPlan = (req, res) => {
    const { id } = req.params;
    const { user_id, name, description, exercises_id } = req.body;

    const index = trainingPlans.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Plan de entrenamiento no encontrado.' });
    }
    
    // Validación completa para PUT
    if (!user_id || !name || !description || !exercises_id) {
        return res.status(400).json({ error: 'se requieren todos los datos 🤣🤣' });
    }

    trainingPlans[index] = {
        ...trainingPlans[index],
        user_id,
        name,
        description,
        exercises_id
    };

    res.status(200).json(trainingPlans[index]);
};

const patchOneTrainingPlan = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = trainingPlans.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `El plan con ID ${id} no fue encontrado.` });
    }

    trainingPlans[index] = {
        ...trainingPlans[index],
        ...updates
    };

    res.status(200).json(trainingPlans[index]);
};

const deleteOneTrainingPlan = (req, res) => {
    const { id } = req.params;
    const index = trainingPlans.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Plan de entrenamiento no encontrado ome, espabile' });
    }

    const deletedPlans = trainingPlans.splice(index, 1);
    res.status(200).json({ deleted: deletedPlans[0].id }); 
};

module.exports = {
    getAllTrainingPlans,
    getOneTrainingPlan,
    createNewTrainingPlan,
    updateOneTrainingPlan,
    patchOneTrainingPlan,
    deleteOneTrainingPlan
};