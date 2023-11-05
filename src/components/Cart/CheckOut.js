import { useContext } from "react"
import Modal from "../UI/Modal"
import UserProgressContext from "../../store/UserProgessContext"
import CartContext from "../../store/CartContext"
import Button from "../UI/Button"
import useHttp from "../hooks/useHttp"
import CheckOutForm from "./CheckOutForm"
import CheckOutSuccess from "./CheckOutSuccess"
// an object to config the request based on the http method 'GET' 'POST'
const requestConfig = {
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
};

const PORT = 5000;

function CheckOut() {
    
    const UserProgessCxt = useContext(UserProgressContext);
    const cartCxt = useContext(CartContext);
    
    // making the 
    const {data,isLoading:isSending, error, sendRequest, clearData, clearError} = useHttp(`http://localhost:${PORT}/orders`, requestConfig);

    let cartTotal = cartCxt.items.reduce((totalPrice, item) => totalPrice + item.quantity*item.price , 0 );
    let Discount = (cartCxt.message === 'Coupon' ? 0.9 : 1);
    cartTotal = Math.floor( cartTotal * Discount );
    
    // function to close the checkout, so as to add new items 
    function handleClose(){
        UserProgessCxt.hideCheckout();
        clearError();
    }

    // utility function to hide the checkout modal and clear the cart items and reset the data 
    function handleFinish(){
        UserProgessCxt.hideCheckout();
        cartCxt.clearCart();
        clearData();
        window.location.reload();
    }


    // validating the checkout details before adding them to the successful orders
    function formValidation(e){
        e.preventDefault();
        clearError();
        // using Browser native Formdata without using state to manage the form data 
        const formData = new FormData(document.getElementById('userForm'));
        const customerData = Object.fromEntries(formData.entries());

        // making the http request 
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCxt.items,
                    customer: customerData,
                    totalPrice: cartTotal,
                    FinalPrice: Math.floor(cartTotal*Discount)
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
            <Button className=""> Submit Order</Button>
        </>
    }

    // Order Success message and cart reset
    if( data && !error ){
        return <Modal open = {UserProgessCxt.progress === 'checkout'} onClose={handleFinish}>
            <CheckOutSuccess handleFinish={handleFinish} />
        </Modal>
    }
    
    return (
        <Modal open = {UserProgessCxt.progress ==='checkout'} onClose={ handleClose}>
            <form id = 'userForm' onSubmit={formValidation}>
                <CheckOutForm cartTotal={cartTotal} error={error}/>
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}

export default CheckOut
