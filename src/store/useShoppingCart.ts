import { create } from 'zustand'

interface CartItem {
  id: number
  title: string
  category: string
  nbSaison: number | null
  saisons: number[]
}
interface CartStoreInterface {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemId: number) => void
  updateItem: (
    itemId: number,
    newValue: { key: string; value: string }[],
  ) => void
  clearCart: () => void
}
export const useShoppingCart = create<CartStoreInterface>((set) => {
  const isBrowser = typeof window !== 'undefined'
  const initialCart = isBrowser ? localStorage.getItem('cart') : null
  const initialItems: CartItem[] = initialCart ? JSON.parse(initialCart) : []
  return {
    items: initialItems,
    addItem: (item) =>
      set((state) => {
        const updateItems = [...state.items, item]
        if (isBrowser) {
          localStorage.setItem('cart', JSON.stringify(updateItems))
        }
        return { items: updateItems }
      }),
    removeItem: (itemId) =>
      set((state) => {
        const updateItems = state.items.filter((item) => item.id !== itemId)
        if (isBrowser) {
          localStorage.setItem('cart', JSON.stringify(updateItems))
        }
        return { items: updateItems }
      }),
    updateItem: (itemId, newValue) =>
      set((state) => {
        const updateItems = state.items.map((item) => {
          if (item.id === itemId) {
            if (newValue[0].key === 'saisons') {
              return { ...item, saisons: newValue[0].value }
            }
          }
          return item
        })
        if (isBrowser) {
          localStorage.setItem('cart', JSON.stringify(updateItems))
        }
        return { items: updateItems }
      }),
    clearCart: () => {
      localStorage.removeItem('cart')
      set({ items: [] })
    },
  }
})
