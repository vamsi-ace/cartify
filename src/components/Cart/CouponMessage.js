import { useContext } from "react"
import CartContext from "../../store/CartContext"

function CouponMessage() {
    const cartCxt = useContext(CartContext);
    return (
        <>
        {cartCxt.message === 'Coupon' && <p className="control-coupon"> Yayy! Coupon has been applied</p> }
            {cartCxt.message === 'noCoupon' && <p className = 'control-coupon'> No Coupon, Better luck on the Next Order </p> }
        </>
    )
}

export default CouponMessage
