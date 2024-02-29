const express = require('express');
const path = require('path');
const fs = require('fs');

// Cargar los datos de personajes en español e inglés
const personajes = require('./public/characters/spanish.json');
const characters = require('./public/characters/english.json');

const app = express();

// Establecer el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Función para obtener un personaje aleatorio
function getRandomPersonaje(personajes) {
    const randomIndex = Math.floor(Math.random() * personajes.length);
    return personajes[randomIndex];
}

// Ruta base para obtener todos los personajes en ambos idiomas
app.get('/', (req, res) => {
    const all = {
        "spanish": personajes,
        "english": characters
    };
    res.json(all);
});

app.get('/spanish', (req, res) => {
    const { random, orderBy, order } = req.query;
    if (orderBy) {
        let sortOrder = 1;

        if (order && order.toLowerCase() === 'desc') {
            sortOrder = -1;
        }

        personajes.sort((a, b) => {
            return sortOrder * (a[orderBy].localeCompare(b[orderBy]));
        });
    }

    if (random === 'true') {
        const personaje = getRandomPersonaje(personajes);
        res.json(personaje);
    } else {
        res.json(personajes);
    }
});

app.get('/english', (req, res) => {
    const { random, orderBy, order } = req.query;
    if (orderBy) {
        let sortOrder = 1;

        if (order && order.toLowerCase() === 'desc') {
            sortOrder = -1;
        }

        characters.sort((a, b) => {
            return sortOrder * (a[orderBy].localeCompare(b[orderBy]));
        });
        
    }
    if (random === 'true') {
        const character = getRandomPersonaje(characters);
        res.json(character);
    } else {
        res.json(characters);
    }
});

// Ruta para filtrar personajes por datos
app.get('/spanish/search', (req, res) => {
    const { name, region, orderBy, order } = req.query;

    // Filtrar personajes por nombre y/o región
    let personajesFiltrados = personajes;

    if (name) {
        personajesFiltrados = personajesFiltrados.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (region) {
        personajesFiltrados = personajesFiltrados.filter(p => p.region.toLowerCase() === region.toLowerCase());
    }

    // Ordenar los resultados si se especifica el parámetro orderBy
    if (orderBy) {
        // Establecer el orden predeterminado como ascendente
        let sortOrder = 1;

        // Si se especifica el parámetro order y es igual a 'desc', cambiar el orden a descendente
        if (order && order.toLowerCase() === 'desc') {
            sortOrder = -1;
        }

        // Ordenar los resultados según el campo especificado en orderBy
        personajesFiltrados.sort((a, b) => {
            // Comparar los valores de los campos y aplicar el orden
            return sortOrder * (a[orderBy].localeCompare(b[orderBy]));
        });
    }

    // Devolver los personajes filtrados y ordenados
    res.json(personajesFiltrados);
});



app.get('/english/search', (req, res) => {
    const { name, region, orderBy, order } = req.query;

    // Filtrar personajes por nombre y/o región
    let filteredCharacters = characters;

    if (name) {
        filteredCharacters = filteredCharacters.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (region) {
        filteredCharacters = filteredCharacters.filter(p => p.region.toLowerCase() === region.toLowerCase());
    }

    if (orderBy) {
        let sortOrder = 1;

        if (order && order.toLowerCase() === 'desc') {
            sortOrder = -1;
        }

        filteredCharacters.sort((a, b) => {
            return sortOrder * (a[orderBy].localeCompare(b[orderBy]));
        });
    }

    res.json(filteredCharacters);
});


// Rutas para obtener un personaje específico por su ID
app.get('/spanish/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const personaje = personajes.find(p => p.id === id);
    if (personaje) {
        res.json(personaje);
    } else {
        res.status(404).send('Personaje no encontrado');
    }
});

app.get('/english/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const character = characters.find(p => p.id === id);
    if (character) {
        res.json(character);
    } else {
        res.status(404).send('Character not found');
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
