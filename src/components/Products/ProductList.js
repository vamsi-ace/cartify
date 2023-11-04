import ProductItem from "./ProductItem"

function ProductList({loadedProducts}) {
    return (
        <ul id = 'products'>
            {loadedProducts.map((product) => (
                <ProductItem key = {product.id} product = {product}/>
                )
            )
            }
        </ul>
    )
}

export default ProductList
