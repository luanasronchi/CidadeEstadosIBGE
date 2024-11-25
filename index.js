const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ibge_cidades',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.get('/cidades/:sigla', (req, res) => {
    const sigla = req.params.sigla.toUpperCase(); 
    console.log('Buscando cidades para o estado:', sigla); 

    const query = `
        SELECT cidades.Nome AS cidade
        FROM cidades
        JOIN estados ON cidades.CodEstado = estados.CodEstado
        WHERE estados.Sigla = ?
    `;

    db.query(query, [sigla], (err, results) => {
        if (err) {
            console.error('Erro na query:', err); 
            return res.status(500).json({ error: 'Erro ao buscar cidades' });
        }
        console.log('Resultados:', results); 
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
