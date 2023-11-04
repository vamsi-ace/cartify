import useHttp from "../hooks/useHttp.js";
import ProductList from "./ProductList.js";
import Error from "../Error.js";

const requestConfig = {};

function Products() {
    const {data : loadedProducts, isLoading, error } = useHttp('http://localhost:3000/products', requestConfig, []);

    if( isLoading )
        return <p className="center"> Fetching Products...</p>

    if( error ){
        return <Error title = 'failed' message = {error}></Error>
    }

    return (
        <ProductList loadedProducts={loadedProducts}/>
    )
}

export default Products