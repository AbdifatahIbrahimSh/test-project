const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config(); 

const PORT = process.env.PORT || 3000;


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});



app.get('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM courses');
        res.render('index.ejs', { data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    } finally {
      client.release();
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});