let subscriptions = [
    {
        id: "1",
        user_id: "1",
        typeInscription: "mensual",
        statusInscription: "activo"
    }
];

const getAllSubscriptions = (req, res) => {
    const { typeInscription, statusInscription, search } = req.query; 

    let result = subscriptions;

    // Filtro por tipo de inscripción
    if (typeInscription) {
        const typeLower = typeInscription.toLowerCase();
        result = result.filter(s => 
            s.typeInscription && s.typeInscription.toLowerCase() === typeLower
        );
    }

    // Filtro por estado de inscripción
    if (statusInscription) {
        const statusLower = statusInscription.toLowerCase();
        result = result.filter(s => 
            s.statusInscription && s.statusInscription.toLowerCase() === statusLower
        );
    }
    
    // Búsqueda por user_id (asumiendo que 'search' busca en user_id)
    if (search) {
        const searchLower = search.toLowerCase();
        result = result.filter(s =>
            s.user_id.toLowerCase().includes(searchLower)
        );
    }
    
    res.status(200).json(result);
};

const getOneSubscription = (req, res) => {
    const { id } = req.params;
    const subscription = subscriptions.find(s => s.id === id);

    if (!subscription) {
        return res.status(404).json({ error: 'Suscripción no encontrada.' });
    }
    res.status(200).json(subscription); // Devolver el objeto, no todo el array
};

const createNewSubscription = (req, res) => {
    const { user_id, typeInscription, statusInscription } = req.body;
    
    // Cambiado a 400 Bad Request ya que es un error del cliente (faltan datos)
    if (!user_id || !typeInscription || !statusInscription) {
        return res.status(400).json({ error: 'faltan datos por llenar mijo pongase pues las pilas' });
    }

    const newSubscription = {
        id: `${Date.now()}`,
        user_id,
        typeInscription,
        statusInscription,
        createdAt: new Date().toISOString()
    };
    subscriptions.push(newSubscription);
    res.status(201).json(newSubscription);
};

const updateOneSubscription = (req, res) => {
    const { id } = req.params;
    const { user_id, typeInscription, statusInscription } = req.body;

    const index = subscriptions.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Suscripción no encontrada.' }); // Mejor 404
    }

    // Validación completa para PUT
    if (!user_id || !typeInscription || !statusInscription) {
        return res.status(400).json({ error: 'se requieren todos los datos pongase pues las pilas 🥸' });
    }

    subscriptions[index] = {
        ...subscriptions[index],
        user_id,
        typeInscription,
        statusInscription
    };

    res.status(200).json(subscriptions[index]);
};

const patchOneSubscription = (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = subscriptions.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: `La suscripción con ID ${id} no fue encontrada.` });
    }

    subscriptions[index] = {
        ...subscriptions[index],
        ...updates
    };

    res.status(200).json(subscriptions[index]);
};

const deleteOneSubscription = (req, res) => {
    const { id } = req.params;
    const index = subscriptions.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Suscripción no encontrada ome, pongase pues a trabajar 🤦‍♀️' });
    }

    const deletedsubscriptions = subscriptions.splice(index, 1);
    res.status(200).json({ deleted: deletedsubscriptions[0].id }); 
};

module.exports = {
    getAllSubscriptions,
    getOneSubscription,
    createNewSubscription,
    updateOneSubscription,
    patchOneSubscription,
    deleteOneSubscription
};