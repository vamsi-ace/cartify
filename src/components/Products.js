import { useEffect, useState } from "react"
import ProductItem from "./ProductItem.js";

function Products() {
    const [loadedProducts, setLoadedProducts] = useState([]);

    useEffect(()=>{
        async function fetchProducts(){
            const response = await fetch('http://localhost:3000/products');
            if( !response.ok ){
                
            }
            const products = await response.json();
            setLoadedProducts(products);
        }
        fetchProducts();
    }, []);
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

export default Products