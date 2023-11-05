import React from 'react';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

function Modal({children, open, className = '', onClose}) {

    const dialog = useRef();
    // it is recommended to store the value of the ref in some temporary constant, because this clean up function is going to run at a later time   
    // cleanUp will only run only when the value changes, so the value of the ref could change between executions, so if we store it inside a variable we can refer that 
    useEffect(()=>{
        const modal = dialog.current;
        if( open){
            modal.showModal();
        }
        return ()=> modal.close();
    },[open])
    return createPortal( 
    <dialog ref = {dialog} className={`modal ${className}` } onClose = {onClose}>{children}</dialog>
    ,document.getElementById('modal')
    );
}

export default Modal

// built-in dialog is great for display the overlays, it handles a lot of complexity,
// we output dialog with the portal feature that react offers, so we can use this modal component
// from anywhere in our component TreeWalker, but we always inject its dialog when its visible in a 
// specific area of the Real DOM that we as a developer control up front   

// i want to inject the dialog into this div with id = modal 

// the idea with the modal component is that it can be wrapped any content of our choice, to 
// put that content into the dialog, so i'll accept a children prop and pass that into children prop
// with the open prop we can control the visibility of the modal 

// we can useEffect to control the visibility of the modal by interacting with the native dialog when 
// if the open is true it will show the dialog programmatically