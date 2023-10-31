import { createContext, useReducer} from "react"

function cartReducer( state, action ){
    if( action.type === 'ADD_ITEM'){
        // state.items.push(action.item);
        // not a good idea to update state like this, we should never mutate the existing state like this, 
        // we don't always need the same products n times when added n times 

        // Check if the item already exists in the items array
        const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.item.id )
        
        // create a new items array, which will be used to return updated items state 
        const updatedItems = [...state.items];
        
        // if item already added in the cart, we just extract that item and update the quantity when the item is added again   
        if( existingCartItemIndex > -1 ){

            const existingItem = state.items[existingCartItemIndex];

            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity+1
            }

            // overwriting the existing item with updatedItem in the updatedItems Array
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        // if item is not added previously then add it into the updatedItem with quantity marked as 1
        else{
            updatedItems.push({...action.item, quantity:1});
        }

        // finally return that state 
        return {...state, items: updatedItems };
    }

    // if the quantity of the item we want to delete in the cart is 1, delete it from the cart
    // else if the quantity > 1, we just update the quanity - 1
    if( action.type === "DELETE_ITEM"){
       
        const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.id )
        
        const existingItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if( existingItem.quantity === 1 ){
            updatedItems.splice(existingCartItemIndex,1);
        }
        else{
            const updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems};
    }

    return state;
}

const CartContext = createContext({
    items : [],
    addItem : (item) => {},
    deleteItem: (id) => {}
});

export function CartContextProvider({children}){
    const [cart, dispatchCartAction] = useReducer(cartReducer,{items:[]});
    // once this cart state changes 
    
    // this here will also change and this new context will be distributed to interested components 
    const cartContext = {
        items: cart.items,
        addItem,
        deleteItem
    }

    console.log(cartContext);
    
    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM', item:item});
    }

    function deleteItem(id){
        dispatchCartAction({type:'DELETE_ITEM', id});
    }
     
    return <CartContext.Provider value = {cartContext}>{children}</CartContext.Provider>
}

export default CartContext