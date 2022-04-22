const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
    try {
        await db.sequelize.authenticate();
        console.log(`Server started on port ${port}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
})
