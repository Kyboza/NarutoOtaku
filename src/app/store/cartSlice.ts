import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICartItem {
    _id: string,
    name: string,
    price: number,
    amount: number
}

interface IStoreCart {
    items: ICartItem[]
}

const initialState: IStoreCart = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const existingItem = state.items.find(item => item._id === action.payload._id);
            if(existingItem){
                if(existingItem.amount <= 7){
                    existingItem.amount += 1
                } else {
                    console.log('Max 8 of this item')
                }
            } else {
                state.items.push({...action.payload, amount: 1})
            }
        },
        removeItem: (state, action:PayloadAction<string>) => {
            state.items = state.items.filter(item => item.name !== action.payload)
        },
        clearCart: (state) => {
            state.items = []
        }
    }
})
export const {addItem, removeItem, clearCart} = cartSlice.actions
export default cartSlice.reducer