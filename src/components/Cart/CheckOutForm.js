import Input from "../UI/Input"
import Error from "../Error"

function CheckOutForm({cartTotal,error}) {
    return (
        <>
            <h2> CheckOut </h2>
                <p> Total Amount: {cartTotal}</p>
                <Input className = "" label = "Full Name: " type = "text" id = "full-name"/>
                <Input className = "" label = "E-mail address" type = "email" id = "email"/>
                <Input className = "" label = "Street" type = "text" id = "street"/>
                
                    <Input className = "" label = "Postal Code" type = "text" id = "postal-code"/>
                    <Input className = "" label = "City" type = "text" id = "city"/>
                
                {error && <Error title = "Failed to submit order" message={error}></Error>}
        </>
    )
}

export default CheckOutForm
