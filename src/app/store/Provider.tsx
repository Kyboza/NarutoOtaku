"use client"
import { Provider } from "react-redux"
import store, { persistor } from "./store"
import { PersistGate } from "redux-persist/integration/react"
import CartSync from "../hooks/cartSync"

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
                <CartSync />
            </PersistGate>
        </Provider>
    )
}

export default ReduxProvider
