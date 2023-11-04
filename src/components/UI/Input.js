function Input({className, label, id,  ...props}) {
    let classes = className;
    return (
        <p className={`control${classes}`}>
            <span>
                <label htmlFor={id}> {label} </label>
                <input id = {id} name = {id} required {...props} />
            </span>
        </p>
    )
}

export default Input
