import { useContext } from "react"
import Modal from "./UI/Modal"
import Input from "./UI/Input"
import UserProgressContext from "../store/UserProgessContext"
import CartContext from "../store/CartContext"
import Button from "./UI/Button"
import useHttp from "./hooks/useHttp"
import Error from "./Error"

// an object to config the request based on the http method 'GET' 'POST'
const requestConfig = {
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
};


function CheckOut() {
    const UserProgessCxt = useContext(UserProgressContext);
    const cartCxt = useContext(CartContext);
    
    // making the 
    const {data,isLoading:isSending, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCxt.items.reduce((totalPrice, item) => totalPrice + item.quantity*item.price , 0 );
    
    // function to close the checkout, so as to add new items 
    function handleClose(){
        UserProgessCxt.hideCheckout();
    }

    // utility function to hide the checkout modal and clear the cart items and reset the data 
    function handleFinish(){
        UserProgessCxt.hideCheckout();
        cartCxt.clearCart();
        clearData()
    }


    // validating the checkout details before adding them to the successful orders
    function formValidation(e){
        e.preventDefault();

        // a using Browser native Formdata without using state to manage the form data 
        const formData = new FormData(document.getElementById('userForm'));
        const customerData = Object.fromEntries(formData.entries());

        // making the http request 
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCxt.items,
                    customer: customerData
                },
            })
        );
    }

    let actions ;

    // Order sending to the backend API endpoint 
    if( isSending){
        actions = <span> Sending order data... </span>;
    }else{
        actions =  
        <>
            <Button type='button' textOnly onClick = {handleClose} > Close </Button>
            <Button> Submit Order</Button>
        </>
    }

    // Order Success message and cart reset
    if( data && !error ){
        return <Modal open = {UserProgessCxt.progress === 'checkout'} onClose={handleFinish}>
            <h2> Success!</h2>
            <p> Thank you for the order</p>
            <p>
                We will get back to you with more details via email in a few minutes
            </p>
            <p className="modal-actions">
                <Button onClick = {handleFinish}> Okay </Button>
            </p>
        </Modal>
    }
    
    return (
        <Modal open = {UserProgessCxt.progress ==='checkout'} onClose={ handleClose}>
            <form id = 'userForm' onSubmit={formValidation}>;
                <h2> CheckOut </h2>
                <p> Total Amount: {cartTotal}</p>
                <Input label = "Full Name" type = "text" id = "full-name"/>
                <Input label = "E-mail address" type = "email" id = "email"/>
                <Input label = "Street" type = "text" id = "street"/>
                <div className="control-row">
                    <Input label = "Postal Code" type = "text" id = "postal-code"/>
                    <Input label = "City" type = "text" id = "city"/>
                </div>
                {error && <Error title = "Failed to submit order" message={error}></Error>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}

export
 default CheckOut
