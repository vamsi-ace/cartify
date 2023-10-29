import Modal from "./UI/Modal"
import CartContext from "../store/CartContext"
import { useContext } from "react"
import Button from "./UI/Button";
import CartItem from "./CartItem";
import UserProgressContext from "../store/UserProgessContext";
function Cart() {
    const cartCxt = useContext(CartContext);
    const UserProgessCxt = useContext(UserProgressContext);

    function handleCloseCart(){
        UserProgessCxt.hideCart()
    }

    const cartTotal = cartCxt.items.reduce((totalPrice, item) => 
        totalPrice+( item.quantity * +item.price),
        0
    );
    return (
        <Modal className="cart" open = {UserProgessCxt.progress === 'cart' } >
            <h2> Cart </h2>
            <ul>
                {cartCxt.items.map(item => 
                    <CartItem 
                    key = {item.id} 
                    name= {item.name} 
                    quantity={ item.quantity} 
                    price = {item.price} 
                    onIncrease={()=>{cartCxt.addItem(item)}}
                    onDecrease={()=>{cartCxt.deleteItem(item.id)}}/>
                )}
            </ul>
            <p className="cart-total"> {cartTotal} </p>
            <p className="modal-actions">
                <Button textOnly onClick = {handleCloseCart}> Close </Button>
                <Button onClick = {handleCloseCart}> Checkout </Button>
            </p>
        </Modal>
    )
}

export default Cart