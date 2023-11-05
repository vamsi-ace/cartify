import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import Cart from '../../../src/components/Cart/Cart';
import CartContext, {CartContextProvider} from '../../../src/store/CartContext';
import { UserProgressContextProvider } from '../../../src/store/UserProgessContext';

afterEach(cleanup)


describe('Cart Component', () => {
  // Create the 'modal' container before running the tests
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal';
  document.body.appendChild(modalRoot);

  it('displays correct total amount with items', () => {
    // Mock CartContext values
    const cartValue = {
      items: [
        { id: 1, name: 'Product 1', quantity: 2, price: 10 },
        { id: 2, name: 'Product 2', quantity: 1, price: 15 },
      ], 
    }

    
    render(
      <UserProgressContextProvider>
        <CartContextProvider value={cartValue}>
          <Cart />
        </CartContextProvider>
      </UserProgressContextProvider>  
    );
    expect(screen.getByText('Total Amount:')).toBeInTheDocument();
  });

  // Remove the 'modal' container after all tests have run
  afterAll(() => {
    // eslint-disable-next-line testing-library/no-node-access
    const modalRoot = document.getElementById('modal');
    modalRoot.remove();
  });

  it('displays coupon message', () => {
    // Mock CartContext values
    const cartValue = {
      items: [
        { id: 1, name: 'Product 1', quantity: 2, price: 10 },
        { id: 2, name: 'Product 2', quantity: 1, price: 15 },
      ],
      coupon: 'COUPON10',
      message: 'Coupon',
    };
    render(
      <CartContext.Provider value={cartValue}>
        <Cart />
      </CartContext.Provider>
    );
    // Replace the following line with assertions for coupon message
    expect(screen.getByText('Yayy! Coupon has been applied')).toBeInTheDocument();
  });

  it('displays checkout button when there are items in the cart', () => {
    // Mock CartContext values with items
    const cartValue = {
      items: [
        { id: 1, name: 'Product 1', quantity: 2, price: 10 },
        { id: 2, name: 'Product 2', quantity: 1, price: 15 },
      ],
    };
    render(
      <CartContext.Provider value={cartValue}>
        <Cart />
      </CartContext.Provider>
    );
    // Replace the following line with assertions for the presence of the Checkout button
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('does not display checkout button when the cart is empty', () => {
    // Mock CartContext values with an empty cart
    const cartValue = {
      items: [],
    };
    render(
      <CartContext.Provider value={cartValue}>
        <Cart />
      </CartContext.Provider>
    );
    // Replace the following line with assertions for the absence of the Checkout button
    expect(screen.queryByText('Checkout')).toBeNull();
  });

  it('calls handleGetCoupon when "GET COUPON" button is clicked', () => {
    // Mock CartContext values
    const cartValue = {
      items: [
        { id: 1, name: 'Product 1', quantity: 2, price: 10 },
        { id: 2, name: 'Product 2', quantity: 1, price: 15 },
      ],
      message: '', 
    };
    const handleGetCoupon = jest.fn();
    render(
      <CartContext.Provider value={cartValue}>
        <Cart handleGetCoupon={handleGetCoupon} />
      </CartContext.Provider>
    );
    const getCouponButton = screen.getByText('GET COUPON');
    fireEvent.click(getCouponButton);
    expect(handleGetCoupon).toHaveBeenCalled();
  });

  it('does not call handleGetCoupon when the cart already has a coupon', () => {
    // Mock CartContext values with a coupon
    const cartValue = {
      message: 'Coupon',
    };
    const handleGetCoupon = jest.fn();
    render(
      <CartContext.Provider value={cartValue}>
        <Cart handleGetCoupon={handleGetCoupon} />
      </CartContext.Provider>
    );
    const getCouponButton = screen.getByText('GET COUPON');
    fireEvent.click(getCouponButton);
    expect(handleGetCoupon).not.toHaveBeenCalled();
  });
});
