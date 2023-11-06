import catchAsync from "../utils/CatchAsync.js";
import fs from 'node:fs/promises'

const isFormDataValid = (orderData) =>{
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
        ){
            return 0;
        }
    return 1;
}


const orders = catchAsync(async (req, res) => {
      const orderData = req.body.order;
      
      if (orderData === null || orderData.items === null ) {
      return res.status(400).json({ message: 'Missing Cart Items, Add Items.' });
    }
  
  
    // use customer['full-name'] instead of customer.'full-name' 
    if(!isFormDataValid(orderData) ){
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
      await fs.writeFile('./data/orders.json', JSON.stringify(allOrders,null,2));
      res.status(201).json({ message: 'Order created!' });
    });

export default orders