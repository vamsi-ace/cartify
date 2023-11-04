import { useContext } from "react"
import CartContext from "../../store/CartContext"
import Input from "../UI/Input";

function CouponDisplay() {
    const cartCxt = useContext(CartContext);
    return (
        <>
            {cartCxt.coupon !== ''
                && <Input className = "-coupon" label = "Coupon:" id = {cartCxt.coupon} value = {cartCxt.coupon} readOnly/> }
        </>
    )
}

export default CouponDisplay
