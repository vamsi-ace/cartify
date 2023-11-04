import CartItem from "./CartItem"
import CartContext from "../../store/CartContext"
import { useContext } from "react"

function CartList() {
    const cartCxt = useContext(CartContext);
    return (
        <>
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
        </>
    )
}

export default CartList
