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

router.post('/', (req, res) => {
    const { user_id, typeInscription, statusInscription } = req.body;
    if (!user_id || !typeInscription || !statusInscription) {
        return res.status(404).json({ error: 'faltan datos por llenar mijo pongase pues las pilas' })
    }

    const newSubscription = {
        id: `${Date.now()}`,
        user_id,
        typeInscription,
        statusInscription,
        createdAt: new Date().toISOString()
    }
    subscriptions.push(newSubscription)
    res.status(201).json(newSubscription)
})

module.exports = router;