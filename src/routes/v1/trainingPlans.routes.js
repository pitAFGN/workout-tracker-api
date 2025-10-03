const express = require('express');
const router = express.Router();

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

