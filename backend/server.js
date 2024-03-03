const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const port = 5000;

const deptRoutes=require('./routes/deptRoutes')
const ticketRoutes=require('./routes/ticketRoutes')
const userRoutes=require('./routes/userRoutes')

const cors=require('cors')


connectDB();
const app=express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/dept',deptRoutes);
app.use('/api/ticket',ticketRoutes);
app.use('/api/user',userRoutes);

app.use(errorHandler);

app.listen(port,()=>console.log(`Server started on ${port}`));



