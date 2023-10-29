import Button from "./UI/Button"
import CartContext from "../store/CartContext"
import { useContext } from "react"

function Header() {
    const cartCxt = useContext(CartContext);

    const cartItems = cartCxt.items.reduce((totalItems,item) => {
        return totalItems+item.quantity;
    }, 0)
    return (
        <header id = 'main-header'>
            <div id = 'title'>
                <h1> React Store </h1>
            </div>
            <nav>
                <Button textOnly={true} > Cart {cartItems}</Button>
            </nav>
        </header>
    )
}


export default Header