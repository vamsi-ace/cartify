import ProductItem from "./ProductItem.js";
import useHttp from "./hooks/useHttp.js";
import Error from "./Error.js";

const requestConfig = {};

function Products() {
    const {data : loadedProducts, isLoading, error } = useHttp('http://localhost:3000/products', requestConfig, []);

    if( isLoading )
        return <p className="center"> Fetching Meals...</p>

    if( error ){
        return <Error title = 'failed' message = {error}></Error>
    }

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