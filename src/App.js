import './App.css';
import Header from './components/Header';
import Products from './components/Products/Products';
import {CartContextProvider} from './store/CartContext';
import { UserProgressContextProvider } from './store/UserProgessContext';
import Cart from './components/Cart/Cart';
import CheckOut from './components/Cart/CheckOut';

function App() {
  return (
    // eslint-disable-next-line react/jsx-no-undef
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header/>
        <Products/>
        <Cart></Cart>
        <CheckOut></CheckOut>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
