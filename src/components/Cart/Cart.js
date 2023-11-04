import Modal from "../UI/Modal"
import CartContext from "../../store/CartContext"
import { useContext, } from "react"
import useHttp from "../hooks/useHttp";
import Button from "../UI/Button";
import CartList from "./CartList";
import UserProgressContext from "../../store/UserProgessContext";
import PriceCard from "../UI/PriceCard";
import CouponButton from "./CouponButton";
import CouponDisplay from "./CouponDisplay";
import CouponMessage from "./CouponMessage";

const requestConfig = {};

function Cart() {
    const cartCxt = useContext(CartContext);
    const UserProgessCxt = useContext(UserProgressContext);
    let Discount = (cartCxt.message === 'Coupon' ? 0.9 : 1);


    const {data}= useHttp('http://localhost:3000/admin/discount',requestConfig, '' );

    function handleCloseCart(){
        UserProgessCxt.hideCart()
    }

    function handleGoToCheckout(){
        UserProgessCxt.showCheckout();
    }

    
    function handleGetCoupon(){
        cartCxt.addCoupon(data);
    }
    
    let cartTotal = cartCxt.items.reduce((totalPrice, item) => 
        totalPrice+( item.quantity * +item.price),
        0
    );

    return (
        <Modal className="cart" open = {UserProgessCxt.progress === 'cart' } onClose = {UserProgessCxt.progress === 'cart' ? handleCloseCart : null}  >
            <CartList/>   
            <CouponButton cartTotal={cartTotal} handleGetCoupon={handleGetCoupon}/>
            <CouponDisplay/>
            <CouponMessage/>
            <PriceCard className =  {`${ (cartCxt.coupon && cartTotal)? 'strikethrough' : '' } `} label = " Total Amount: " total = {cartTotal} />
            {cartCxt.message === 'Coupon' && <PriceCard className="" label="Discount Amount:" total = {cartTotal - Math.floor(Discount*cartTotal)} ></PriceCard> }
            {cartCxt.message === 'Coupon' && <PriceCard className="" label="Final Amount:" total = {Math.floor(Discount*cartTotal)} ></PriceCard> }
            
            <p className="modal-actions">
                <Button textOnly onClick = {handleCloseCart}> Close </Button>

                {cartCxt.items.length > 0 
                    && <Button className="" onClick = {handleGoToCheckout}> Checkout </Button>
                }
            </p>
        </Modal>

    )
}

export default Cart
