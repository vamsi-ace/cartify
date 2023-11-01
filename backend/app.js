import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import dotenv from 'dotenv';
import AppError from './utils/AppError.js';

// routers
import adminRoutes from './routes/adminRoutes.js'

// controllers
import globalErrorHandler from './controllers/errorController.js';
import products from './controllers/productsController.js';
import orders from './controllers/orderController.js';

// Load environment variables from config file
dotenv.config({ path: './../config.env' });

const app = express();

app.use(bodyParser.json());
app.use(express.static('backend/public'));

app.use(cors());

app.get('/products', products);

app.post('/orders', orders);

app.use('/admin', adminRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(3000, ()=>{
  console.log('listening');
});