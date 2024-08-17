import { createContext, useReducer, useState } from 'react'

//Creating context API
export const productContext = createContext(null);

//Initialising state for reducer
const initialCart = {
    cartItems: [],
    cartQuantity: 0,
    totalAmount: null
}

//Handling each product qty
const productQty = [];

//Reducer function for cart
const cartReducer = (state, action) => {
    let index = null;
    switch (action.type) {
        case "add":
            const objId = action.productToAdd._id;
            let present = false;
            //check for Already exists
            state.cartItems.forEach(element => {
                if (element._id === objId) { present = true }
            });

            //Already exists condition
            if (present) {
                window.alert('Product already added \n To increase qty go to cart');
                return { ...state };
            }
            //Add product
            else {
                productQty.splice(productQty.length - 1, 0, 1);
                return { ...state, cartItems: [...state.cartItems, { ...action.productToAdd, qty: 1 }], cartQuantity: state.cartQuantity += 1, totalAmount: state.totalAmount += action.productToAdd.price };
            }

        case "increase":
            index = state.cartItems.findIndex((ele) => ele._id === action.productId);
            state.cartItems[index].qty += 1;
            productQty[index] += 1;
            return { ...state, cartQuantity: state.cartQuantity += 1, totalAmount: state.totalAmount += state.cartItems[index].price };

        case "decrease":
            index = state.cartItems.findIndex((ele) => ele._id === action.productId);
            //for qty more than 1
            if (productQty[index] > 1) {
                state.cartItems[index].qty -= 1;
                productQty[index] -= 1;
                return { ...state, cartQuantity: state.cartQuantity -= 1, totalAmount: state.totalAmount -= state.cartItems[index].price };
            }
            //qty is 1 remove product
            else {
                const price = state.cartItems[index].price;
                state.cartItems.splice(index, 1);
                productQty.splice(index, 1);
                return { ...state, cartQuantity: state.cartQuantity -= 1, totalAmount: state.totalAmount -= price }
            }

        //directly remove product
        case "remove":
            index = state.cartItems.findIndex((ele) => ele._id === action.productId);
            const removeQty = state.cartItems[index].qty;
            const removePrice = state.cartItems[index].price;
            state.cartItems.splice(index, 1);
            productQty.splice(index, 1);
            return { ...state, cartQuantity: state.cartQuantity -= removeQty, totalAmount: state.totalAmount -= (removePrice * removeQty) }
        default:
            return state;
    }
}


export default function AppContextProvider({ children }) {

    //To handle Products
    const [product, setProduct] = useState([]);
    //To handle cart Items
    const [state, dispatch] = useReducer(cartReducer, initialCart);
    //To handle edit product
    const [editDetails, setEditDetails] = useState({ edit: false });

    return (
        <productContext.Provider value={{ state, product, dispatch, setProduct, editDetails, setEditDetails }}>
            {children}
        </productContext.Provider>
    )
}