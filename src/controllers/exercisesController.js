let exercises = [
    {
        id: "1",
        name: "prensa de pierna",
        description: "entrenamiento de fuerza muy popular que se realiza con una máquina de pesas específica. Es ideal para desarrollar la masa muscular y la fuerza del tren inferior",
        category: "fuerza",
        muscleGroup: "piernas"
    }
]

const getAllExercises = (req, res) => {
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
};

const getOneExercise = (req, res) => {
    const { id } = req.params;
    const exercise = exercises.find(e => e.id === id);

    if (!exercise) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    res.status(200).json(exercise); // Corregido para devolver el 'exercise', no todos
};

const createNewExercise = (req, res) => {
    const { name, description, category, muscleGroup } = req.body;
    if (!name || !description || !category || !muscleGroup) {
        return res.status(400).json({ error: 'faltan datos por llenar mijo pongase pues las pilas' }) // Cambiado a 400 por ser error de cliente
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
};

const updateOneExercise = (req, res) => {
    const { id } = req.params;
    const { name, description, category, muscleGroup } = req.body;

    const index = exercises.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    
    // Asegurarse de que al menos una propiedad principal se esté actualizando en PUT
    if (!name || !description || !category || !muscleGroup) {
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
};

const patchOneExercise = (req, res) => {
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
};

const deleteOneExercise = (req, res) => {
    const { id } = req.params;
    const index = exercises.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome 😡' });
    }

    const deletedExercise = exercises.splice(index, 1);
    res.status(200).json({ deleted: deletedExercise[0].id }); 
};

module.exports = {
    getAllExercises,
    getOneExercise,
    createNewExercise,
    updateOneExercise,
    patchOneExercise,
    deleteOneExercise
};