import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICartItem {
    name: string,
    amount: number,
    price: number
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
            state.items.push(action.payload)
            console.log('Added Item')
        },
        removeItem: (state, action:PayloadAction<string>) => {
            state.items.filter(item => item.name !== action.payload)
        }
    }
})
export const {addItem, removeItem} = cartSlice.actions
export default cartSlice.reducer