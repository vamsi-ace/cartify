import Button from "../UI/Button"
import { useContext } from "react"
import CartContext from "../../store/CartContext";

function ProductItem({product}) {
    const cartCtx = useContext(CartContext);
    function handleAddProductToCart(){
        cartCtx.addItem(product)
    }
    return (
        <li className = 'product-item'>
            <article>
                <img src = {product.image} alt = {product.name}/>
                <div>
                    <h3>{product.name}</h3>
                    <p className="product-item-price">{product.price}</p>
                </div>
                <p className="product-item-actions">
                    <Button className="" onClick = {handleAddProductToCart}>
                        Add to Cart
                    </Button>
                </p>
            </article>
        </li>
    )
}

export default ProductItem