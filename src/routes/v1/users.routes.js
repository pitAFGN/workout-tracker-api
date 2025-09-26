const express = require('express');
const router = express.Router();

let users = [
    {
        id: "1",
        name:"Andres Felipe Gonzalez Noreña",
        gender: "masculino",
        age: "18",
        password: "pipe123"
    }
]

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado'})
    }
    
    res.status(200).json(users);
});

module.exports = router;