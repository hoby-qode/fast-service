import { create } from "zustand";

interface CartItem {
  id: number,
  title: string,
}
interface CartStoreInterface {
  items: CartItem[] 
  addItem: (item: CartItem) => void 
  removeItem: (itemId: number) => void 
  clearCart: () => void
}
export const useShoppingCart = create<CartStoreInterface>((set) => {
  const isBrowser = typeof window !== 'undefined';
  const initialCart = isBrowser ? localStorage.getItem('cart') : null;
  const initialItems: CartItem[] = initialCart ? JSON.parse(initialCart) : []
  return {
    items: initialItems,
    addItem: (item) => 
      set((state) => {
        const updateItems = [...state.items, item];
        if(isBrowser) {
          localStorage.setItem('cart', JSON.stringify(updateItems))
        }
        return {items: updateItems}
      }),
    removeItem: (itemId) => 
      set((state) => {
        const updateItems = state.items.filter((item) => item.id !== itemId);
        console.log("itemId", itemId)
        console.log("updateItems", updateItems)
        if (isBrowser) {
          localStorage.setItem('cart', JSON.stringify(updateItems))
        }
        return {items: updateItems}
      }),
    clearCart: () => {
      localStorage.removeItem('cart')
      set({items: []})
    }
  }
})