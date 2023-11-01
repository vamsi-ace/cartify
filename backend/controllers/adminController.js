import fs from 'node:fs/promises'
import catchAsync from './../utils/CatchAsync.js'

function generateDiscountCode() {
    // Generate a random alphanumeric discount code
    const discountCode = Math.random().toString(36).substring(2, 10);
    return discountCode;
}

export const getDiscount = catchAsync(async (req, res) => {
      const orders = await fs.readFile('./data/orders.json', 'utf8');
      const allOrders = JSON.parse(orders);
  
      // Count the number of orders
      const orderCount = allOrders.length;
  
      if (orderCount % 3 === 0) {
        // Generate a discount code (you can create a function for this)
        const discountCode = generateDiscountCode();
  
        // Add the discount code to the list of discount codes
        const discountCodes = await fs.readFile('./data/discount-codes.json', 'utf8');
        const allDiscountCodes = JSON.parse(discountCodes);
        console.log(discountCodes);
        allDiscountCodes.push(discountCode);
        await fs.writeFile('./data/discount-codes.json', JSON.stringify(allDiscountCodes));
  
        return res.status(201).json({ message: 'Discount code generated', discountCode });
      }
  
      return res.status(200).json({ message: 'No discount code generated' });
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({ message: 'Internal Server Error' });
    // }
});

export const postDiscount = catchAsync();

export const getStats = catchAsync();

