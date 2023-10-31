import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('backend/public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/products', async (req, res) => {
  const products = await fs.readFile('./data/available-products.json', 'utf8');
  res.json(JSON.parse(products));
});

app.post('/orders', async (req, res) => {
  try{
    const orderData = req.body.order;
    
    if (orderData === null || orderData.items === null ) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }


  // use customer['full-name'] instead of customer.'full-name' 
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer['full-name'] === null ||
    orderData.customer['full-name'].trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
    ) {
      console.log('Invalid Data');
      return res.status(400).json({
        message:
        'Missing data: Email, name, street, postal code or city is missing.',
      });
    }
    
    const newOrder = {
      ...orderData,
      id: (Math.floor(Math.random() * 1000)).toString(),
    };
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
  }catch(err){
    console.log(err);
  }
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found ' });
});

app.listen(3000, ()=>{
  console.log('listening');
});
