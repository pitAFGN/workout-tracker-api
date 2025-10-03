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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, typeInscription, statusInscription } = req.body;

    const index = subscriptions.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(400).json({ error: 'se requieren todos los datos pongase pues las pilas 🥸' })
    }

    subscriptions[index] = {
        ...subscriptions[index],
        user_id,
        typeInscription,
        statusInscription
    };

    res.status(200).json(subscriptions[index]);
})

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = subscriptions.findIndex(s => s.id === id);

    if (index === -1) {

        return res.status(404).json({ error: `El ejercicio con ID ${id} no fue encontrado.` });
    }

    subscriptions[index] = {
        ...subscriptions[index],
        ...updates
    };

    res.status(200).json(subscriptions[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = subscriptions.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'ejercicio no encontrado ome, pongase pues a trabajar 🤦‍♀️' });
    }

    const deletedsubscriptions = subscriptions.splice(index, 1);
    res.status(200).json({ deleted: deletedsubscriptions[0].id });    
})

router.get('/', (req, res) => {
    const { typeInscription, statusInscription, search } = req.query; 

    let result = subscriptions;

    if (typeInscription) {
        const typeLower = typeInscription.toLowerCase();
        result = result.filter(s => 
            s.typeInscription && s.typeInscription.toLowerCase() === typeLower
        );
    }

    if (statusInscription) {
        const statusLower = statusInscription.toLowerCase();
        result = result.filter(s => 
            s.statusInscription && s.statusInscription.toLowerCase() === statusLower
        );
    }
    
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(s =>
            s.user_id.toLowerCase().includes(searchLower)
        );
    }
    
    res.status(200).json(result);
});


module.exports = router;