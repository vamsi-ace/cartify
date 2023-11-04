import { useContext } from "react"
import CartContext from "../../store/CartContext"
import Button from "../UI/Button"
function CouponButton({cartTotal, handleGetCoupon }) {
    const cartCxt = useContext(CartContext);
    return (
        <>
         {cartCxt.message === '' 
                && cartTotal > 0
                && <Button className = "" onClick={handleGetCoupon}>GET COUPON</Button> }   
        </>
    )
}

export default CouponButton
