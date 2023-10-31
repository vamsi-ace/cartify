import { useContext } from "react"
import Modal from "./UI/Modal"
import Input from "./UI/Input"
import UserProgressContext from "../store/UserProgessContext"
import CartContext from "../store/CartContext"
import Button from "./UI/Button"


function CheckOut() {
    const UserProgessCxt = useContext(UserProgressContext);
    const cartCxt = useContext(CartContext);
    
    const cartTotal = cartCxt.items.reduce((totalPrice, item) => totalPrice + item.quantity*item.price , 0 );
    
    function handleClose(){
        UserProgessCxt.hideCheckout();
    }

    function formValidation(e){
        e.preventDefault();
        const formData = new FormData(document.getElementById('userForm'));
        console.log(formData);
        const customerData = Object.fromEntries(formData.entries());
        // console.log(customerData);
        fetch('http://localhost:3000/orders',{
            method:'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCxt.items,
                    customer: customerData
                }
            })
        });
    }

    return (
        <Modal open = {UserProgessCxt.progress ==='checkout'} onClose={ handleClose}>
            <form id = 'userForm'>;
                <h2> CheckOut </h2>
                <p> Total Amount: {cartTotal}</p>
                <Input label = "Full Name" type = "text" id = "full-name"/>
                <Input label = "E-mail address" type = "email" id = "email"/>
                <Input label = "Street" type = "text" id = "street"/>
                <div className="control-row">
                    <Input label = "Postal Code" type = "text" id = "postal-code"/>
                    <Input label = "City" type = "text" id = "city"/>
                </div>
                <p className="modal-actions">
                    <Button type='button' onClick = {handleClose} > Close </Button>
                    <Button onClick = {formValidation}> Submit Order</Button>
                </p>
            </form>
        </Modal>
    )
}

export
 default CheckOut
