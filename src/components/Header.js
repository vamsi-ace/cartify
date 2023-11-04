import Button from "./UI/Button"
import CartContext from "../store/CartContext"
import { useContext } from "react"
import UserProgressContext from "../store/UserProgessContext";

function Header() {
    const cartCxt = useContext(CartContext);
    const userProgressCxt = useContext(UserProgressContext);

    const handleShowCart = ()=>{
        userProgressCxt.showCart();
    }

    const cartItems = cartCxt.items.reduce((totalItems,item) => {
        return totalItems+item.quantity;
    }, 0);

    return (
        <header id = 'main-header'>
            <div id = 'title'>
                <h1> React Store </h1>
            </div>
            <nav className="product-item">
                <Button className = "" textOnly={true} onClick = {handleShowCart}> Cart ({cartItems})</Button>
            </nav>
        </header>
    )
}


export default Header