let users = [
    {
        id: "1",
        name: "Andres Felipe Gonzalez Noreña",
        gender: "masculino",
        age: "18",
        password: "pipe123"
    }
];

const getAllUsers = (req, res) => {
    const { age: ageQuery, gender, search } = req.query;

    const ageNumber = ageQuery ? parseInt(ageQuery, 10) : NaN;

    let result = users;

    // Filtro por edad
    if (!isNaN(ageNumber)) {
        // Nota: Asegúrate de que 'u.age' es también un número o conviértelo, 
        // ya que en tus datos originales 'age' es un string ("18").
        // Lo mantengo como comparación de string por consistencia con tus datos.
        result = result.filter(u => u.age === ageQuery); 
    }

    // Filtro por género
    if (gender) {
        result = result.filter(u => u.gender.toLowerCase() === gender.toLowerCase());
    }

    // Búsqueda por nombre
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(u =>
            u.name.toLowerCase().includes(searchLower)
        );
    }

    res.status(200).json(result);
};

const getOneUser = (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.status(200).json(user); // Corregido para devolver el usuario, no todo el array
};

const createNewUser = (req, res) => {
    const { name, gender, age, password } = req.body;
    // Cambiado a 400 Bad Request
    if (!name || !password || !gender || !age) {
        return res.status(400).json({ error: 'nombre, contraseña, género y edad son requeridos' })
    }

    const newUser = {
        id: `${Date.now()}`,
        name,
        gender,
        age,
        password,
        createdAt: new Date().toISOString()
    }
    users.push(newUser);

    res.status(201).json(newUser);
};

const updateOneUser = (req, res) => {
    const { id } = req.params;
    const { name, gender, age, password } = req.body;

    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "Usuario no encontrado" })
    }
    
    // Validación completa para PUT
    if (!name || !gender || !age || !password) {
        return res.status(400).json({ error: "todos los datos son requeridos para la actualización completa" })
    }

    users[index] = {
        ...users[index],
        name,
        gender,
        age,
        password
    };

    res.status(200).json(users[index])
};

const patchOneUser = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `El usuario con ID ${id} no fue encontrado.` });
    }

    users[index] = {
        ...users[index],
        ...updates
    };

    res.status(200).json(users[index]);
};

const deleteOneUser = (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'usuario no encontrado' });
    }

    const deletedUser = users.splice(index, 1);
    res.status(200).json({ deleted: deletedUser[0].id });
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    patchOneUser,
    deleteOneUser
};