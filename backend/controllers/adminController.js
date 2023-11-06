import fs from 'node:fs/promises'
import catchAsync from './../utils/CatchAsync.js'

function generateDiscountCode() {
    // Generate a random alphanumeric discount code
    const discountCode = Math.random().toString(36).substring(2, 10);
    return discountCode;
}

const couponInterval = process.env.CouponInterval;

function couponAlreadyExistsfortheOrder( orderCount, DiscountCodeList ){
  // for an 3rd order( orderCount = 2 ) you check if the coupon is present already at index 0 of DiscountCodeList, 
  // for the 6th order you check if the coupon is present at index 1,
  // for the 9th order, at index 2
  const coupon = DiscountCodeList[(orderCount+1)/couponInterval - 1 ];
  if( coupon ){
    return coupon.code;
  }
  return 0;
}

async function getAllOrders() {
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    return allOrders;
  } catch (error) {
    console.error('Error reading and parsing orders:', error);
    throw error; // Rethrow the error for handling at a higher level
  }
}

async function getAllDiscounts() {
  try {
    const discountCodeList = await fs.readFile('./data/discount-codes.json', 'utf8');
    const discounts = JSON.parse(discountCodeList);
    return discounts;
  } catch (error) {
    console.error('Error reading and parsing discount codes:', error);
    throw error; // Rethrow the error for handling at a higher level
  }
}

// middleware that checks for the coupon for a particular order, if available then adds it on the req object
// so the next middleware( generate discount ) can accumulatoress it 
export const checkCouponAvailability = catchAsync(async(req,res,next) =>{
      const allOrders = await getAllOrders();
      const orderCount = allOrders.length;
      const Discounts = await getAllDiscounts();
      
      const code = couponAlreadyExistsfortheOrder(orderCount, Discounts )
      if( code ) {
        req.coupon = code;
      }
      next();
});


export const getDiscount = catchAsync(async (req, res ) => {
      
      // if coupon is already available for the order on the req object 
      if( req.coupon ){
        return res.json(req.coupon);
      }

      const allOrders = await getAllOrders();
      const orderCount = allOrders.length;
  
      // if coupon doesn't exist already on req, and the condition is fulfilled we generate new discount
      if ( !req.coupon && orderCount && (orderCount+1) % couponInterval === 0) {

        // Generate a discount code 
        const newDiscountCode = { code: generateDiscountCode()};
  
        const Discounts = await getAllDiscounts();
        
        // Add the discount code to the list of discount codes
        Discounts.push(newDiscountCode);
        await fs.writeFile('./data/discount-codes.json', JSON.stringify(Discounts,null,2));
  
        return res.json(newDiscountCode.code);
      }

      // fall back case // none of the conditionals met 
      return res.status(400).json({ message: 'No discount code generated' });
});


export const getStats = catchAsync(async(req,res) =>{
  //Lists count of items purchased, total purchase amount, list of discount codes and total discount amount.
  const allOrders = await getAllOrders();
  const Discounts = await getAllDiscounts();
  const codes = Discounts.map(item => item.code);

  const totalItems = allOrders.reduce((accumulator, curOrder) => {
     return accumulator+curOrder.items.reduce( (quantity, curItem) => {
  return quantity+curItem.quantity}, 0)
  }, 0 );

  const totalAmount = allOrders.reduce((accumulator, curOrder) => {
    return accumulator+ curOrder.totalPrice
  },0);

  const FinalAmount = allOrders.reduce((accumulator,curOrder)=> {
    return accumulator+curOrder.FinalPrice
  },0);

  res.status(200).json({
    data:{
      itemsPurchased: totalItems,
      totalPurchaseAmount: totalAmount,
      discountList:codes,
      totalDiscount: totalAmount-FinalAmount
    }
  });
});
