const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const companyRoute = require('./routes/company.routes');
app.use('/companies', companyRoute);

const userRoute = require('./routes/user.routes');
app.use('/users', userRoute);

const categoryRoute = require('./routes/category.routes');
app.use('/categories', categoryRoute);

const productRoute = require('./routes/product.routes');
app.use('/products', productRoute);

app.listen(port, async () => {
    try {
        await db.sequelize.authenticate();
        console.log(`Server started on port ${port}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
})
