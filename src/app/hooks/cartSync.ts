import { useEffect } from 'react'
import store from '../store/store'
import { setCartItems } from '../store/cartSlice'

let timeoutId: NodeJS.Timeout

const CartSync = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Endast kör på klienten, där window finns
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'persist:root') {
          clearTimeout(timeoutId) // Rensa eventuell tidigare timeout
          timeoutId = setTimeout(() => {
            try {
              if (event.newValue) {
                const newState = JSON.parse(event.newValue)
                if (newState?.cart) {
                  const parsedCart = JSON.parse(newState.cart)
                  if (Array.isArray(parsedCart.items)) {
                    store.dispatch(setCartItems(parsedCart.items))
                  } else {
                    throw new Error('Parsed cart is not an array')
                  }
                }
              }
            } catch (error) {
              console.error('Failed to sync cart from localStorage:', error)
            }
          }, 750) // Vänta 500 ms innan vi uppdaterar
        }
      }

      window.addEventListener('storage', handleStorageChange)

      // Städa upp eventlyssnaren när komponenten unmountar
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        clearTimeout(timeoutId) // Städa upp timeout också
      }
    }
  }, []) // Tom array gör att useEffect körs endast en gång vid mount

  return null // Detta komponent renderar inget, det används bara för att hantera eventet
}

export default CartSync
