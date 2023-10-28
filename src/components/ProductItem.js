import Button from "./UI/Button"
function ProductItem({product}) {
    return (
        <li className = 'product-item'>
            <article>
                <img src = {product.image} alt = {product.name}/>
                <div>
                    <h3>{product.name}</h3>
                    <p className="product-item-price">{product.price}</p>
                </div>
                <p className="product-item-actions">
                    <Button>
                        Add to Cart
                    </Button>
                </p>
            </article>
        </li>
    )
}

export default ProductItem