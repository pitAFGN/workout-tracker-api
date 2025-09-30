const express = require('express');
const router = express.Router();

let users = [
    {
        id: "1",
        name: "Andres Felipe Gonzalez Noreña",
        gender: "masculino",
        age: "18",
        password: "pipe123"
    }
]

router.get('/', (req, res) => {
    res.status(200).json(users);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.status(200).json(users);
});

router.post('/', (req, res) => {
    const { name, gender, age, password } = req.body;
    if (!name || !password || !gender || !age) {
        return res.status(400).json({ error: 'nombre y contraseña requerida' })
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
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, gender, age, password } = req.body;

    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "todos los datos son requeridos" })
    }

    users[index] = {
        ...users[index],
        name,
        gender,
        age,
        password
    };

    res.status(200).json(users[index])
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'usuario no encontrado' });
    }

    const deletedUser = users.splice(index, 1);
    res.status(200).json({ deleted: deletedUser[0].id });
})

router.get('/', (req, res) => {
    const { age, gender, search } = req.query;
    let result = users;

    if (age) {
        result = result.filter(u => u.age === age);
    }
    if (gender) {
        result = result.filter(u => u.gender === gender);
    }
    if (search) {
        result = result.filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    res.status(200).json(result);
})

module.exports = router;