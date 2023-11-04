function PriceCard({className, label, total }) {
    return (
        <div className="control-cart-total">
            <p className="cart-total"> {label}</p>
            <p className={`cart-total ${className}`}> {total} </p>
        </div>
    )
}

export default PriceCard
