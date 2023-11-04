function Button({children, textOnly, className, onClick, ...props}) {
    let classes = textOnly? 'text-button':'button';
    classes += className;
    return (
        <button className={classes} onClick={onClick} {...props}>
            {children}
        </button >
    )
}

export default Button