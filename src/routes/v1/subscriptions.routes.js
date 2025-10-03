const express = require('express');
const router = express.Router();

let subscriptions = [
    {
        id: "1",
        user_id: "1",
        typeInscription: "mensual",
        statusInscription: "activo"

    }
]

router.get('/', (req, res) => {
    res.status(200).json(subscriptions)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const subscription = subscriptions.find(s => s.id === id);

    if (!subscription) {
        return res.status(404).json({ error: 'ejercicio no encontrado' })
    }
    res.status(200).json(subscriptions);
});

module.exports = router;