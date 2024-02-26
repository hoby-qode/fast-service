import { useState } from "react";

const useCommande = (products) => {
    //TODO : Récupération du donnée prix film, animes, dramas et series dans le BO
    let subTotal = products.reduce((acc, curVal) => {
        return acc + parseInt(curVal.categoriesProduct.nodes[0].prix.prix,10)
    },0)
    let reduction = 0;
    let nbBonusAgagner = 3
    const newArray = []
    newArray['films'] = products.reduce((acc, curVal) => {
        if (curVal.categoriesProduct.nodes[0].slug === 'films') {
            acc.push(curVal)
        }
        return acc
    },[]);
    newArray['series'] = products.reduce((acc, curVal) => {
        if (curVal.categoriesProduct.nodes[0].slug === 'series') {
            acc.push(curVal)
        }
        return acc
    },[]);
    newArray['animes'] = products.reduce((acc, curVal) => {
        if (curVal.categoriesProduct.nodes[0].slug === 'animes') {
            acc.push(curVal)
        }
        return acc
    },[]);
    newArray['dramas'] = products.reduce((acc, curVal) => {
        if (curVal.categoriesProduct.nodes[0].slug === 'dramas') {
            acc.push(curVal)
        }
        return acc
    },[]);
    if (newArray['films'].length > nbBonusAgagner) {
        const nbFilmreduction = Math.floor(newArray['films'].length / nbBonusAgagner)
        reduction = reduction + (300 * nbFilmreduction)
    }
    if (newArray['dramas'].length > nbBonusAgagner) {
        const nbFilmreduction = Math.floor(newArray['dramas'].length / nbBonusAgagner)
        reduction = reduction + (300 * nbFilmreduction)
    }
    if (newArray['series'].length > nbBonusAgagner) {
        const nbFilmreduction = Math.floor(newArray['series'].length / nbBonusAgagner)
        reduction = reduction + (1000 * nbFilmreduction)
    }
    if (newArray['animes'].length > nbBonusAgagner) {
        const nbFilmreduction = Math.floor(newArray['films'].length / nbBonusAgagner)
        reduction = reduction + (500 * nbFilmreduction)
    }
    
    let nbFilm = 1;
    
    const infoReduction = `Vous avez gagné x${nbFilm} film avec votre achat de +10 films`
    return {
        subTotal : subTotal,
        reduction: reduction,        
        total: subTotal - reduction,
        infoReduction: infoReduction
    }
}
export default useCommande