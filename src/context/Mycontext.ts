import { createContext } from "react";
export const AuthContext = createContext({
    currentUser: {},
    setCurrentUser: () => {}
})

export const CartContext = createContext({
    nbCart: 0,
    setNbCart: () => {}
})