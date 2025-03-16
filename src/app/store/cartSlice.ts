import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IItemCart } from "../../../types";

interface IStoreCart {
    items: IItemCart[]
}

const initialState: IStoreCart = {
    items: []
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IItemCart>) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if(existingItem){
                if(existingItem.amount <= 7){
                    existingItem.amount += 1
                } else {
                    console.log('Max 8 of this item')
                }
            } else {
                state.items.push({...action.payload, amount: 1});
            }
        },
        removeItem: (state, action:PayloadAction<string>) => {
            const existingItem = state.items.find(item => item._id === action.payload)
            if(existingItem){
                if(existingItem.amount > 1){
                    existingItem.amount -=1
                } else {
                    state.items = state.items.filter(item => item._id !== action.payload);
                }
            }
            
        },
        clearCart: (state) => {
            state.items = []
        },
        setCartItems: (state, action: PayloadAction<IItemCart[]>) => {
            state.items = action.payload; // Replace cart with new items
        },
    }
})
export const {addItem, removeItem, clearCart, setCartItems} = cartSlice.actions
export default cartSlice.reducer