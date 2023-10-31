import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress:'cart', // 'cart', 'checkout'
    showCart: function(){

    },
    hideCart : function(){

    },
    showCheckout: function(){

    }, 
    hideCheckout: function(){

    }
})


export function UserProgressContextProvider({children}){
    const [userProgress, setUserProgress] = useState('');

    function showCart(){
        setUserProgress('cart');
    }

    function hideCart(){    
        setUserProgress('');
    }

    function hideCheckout(){
        setUserProgress('');
    }

    function showCheckout(){   
        setUserProgress('checkout');
    } 

    const userProgressContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressContext.Provider value = {userProgressContext}>{children}</UserProgressContext.Provider>
}

export default UserProgressContext