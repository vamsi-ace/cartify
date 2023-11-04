import Button from "../UI/Button"
function CheckOutSuccess({handleFinish}) {
    return (
        <>
            <h2> Success!</h2>
            <p> Thank you for the order</p>
            <p>
                We will get back to you with more details via email in a few minutes
            </p>
            <p className="modal-actions">
                <Button onClick = {handleFinish}> Okay </Button>
            </p>
        </>
    )
}

export default CheckOutSuccess
