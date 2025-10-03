const express = require("express");
const app = express();
const { port } = require('./config/env');
const path = require('path'); // <- ¡Añadir path!

// Configuración de la ruta base del proyecto:
// __dirname en app.js (en la raíz) es la carpeta WORKOUT-TRACKER-API.
global.__basedir = path.resolve(__dirname); 

const routes = require('./routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hola mi server en Express");
});

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});