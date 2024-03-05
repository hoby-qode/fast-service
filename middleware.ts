export { default } from "next-auth/middleware"

export const config = { matcher: [
    "/",
    "/cart",
    "/menu",
    "/produit",
    "/produit/:path*",
    "/produits",
    "/produits:path*",
    "/recherche",
    "/anonyme"
]}
