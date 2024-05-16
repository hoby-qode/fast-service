const useCommande = (products, items) => {
  //TODO : Récupération du donnée prix film, animes, dramas et series dans le BO
  let subTotal = products.reduce((acc: number, curVal: any) => {
    const prixUnit = curVal.categoriesProduct.nodes[0].prix.prix
    const saisons = items?.filter((i: any) => i.id === curVal.databaseId)[0]
      ?.saisons
      ? items?.filter((i: any) => i.id === curVal.databaseId)[0]?.saisons.length
      : 1
    return acc + parseInt(prixUnit, 10) * saisons
  }, 0)
  let reduction = 0
  let nbBonusAgagner = 4
  const newArray = []
  newArray['films'] = products.reduce((acc, curVal) => {
    if (curVal.categoriesProduct.nodes[0].slug === 'films') {
      acc.push(curVal)
    }
    return acc
  }, [])
  newArray['series'] = products.reduce((acc, curVal) => {
    if (curVal.categoriesProduct.nodes[0].slug === 'series') {
      const lengthSerie = items?.filter((i) => i.id === curVal.databaseId)[0]
        ?.saisons.length
      for (let index = 0; index < lengthSerie; index++) {
        acc.push(curVal)
      }
    }
    return acc
  }, [])
  newArray['animes'] = products.reduce((acc, curVal) => {
    if (curVal.categoriesProduct.nodes[0].slug === 'animes') {
      acc.push(curVal)
    }
    return acc
  }, [])
  newArray['dramas'] = products.reduce((acc, curVal) => {
    if (curVal.categoriesProduct.nodes[0].slug === 'dramas') {
      acc.push(curVal)
    }
    return acc
  }, [])
  if (newArray['films'].length > nbBonusAgagner) {
    const nbFilmreduction = Math.floor(
      newArray['films'].length / nbBonusAgagner,
    )
    reduction = reduction + 200 * nbFilmreduction
  }
  if (newArray['dramas'].length > nbBonusAgagner) {
    const nbFilmreduction = Math.floor(
      newArray['dramas'].length / nbBonusAgagner,
    )
    reduction = reduction + 300 * nbFilmreduction
  }
  if (newArray['series'].length > 5) {
    const nbFilmreduction = Math.floor(newArray['series'].length / 5)
    reduction = reduction + 500 * nbFilmreduction
  }
  if (newArray['animes'].length > nbBonusAgagner) {
    const nbFilmreduction = Math.floor(
      newArray['animes'].length / nbBonusAgagner,
    )
    reduction = reduction + 500 * nbFilmreduction
  }

  let nbFilm = 1

  const infoReduction = `Vous avez gagné x${nbFilm} film avec votre achat de +10 films`
  return {
    subTotal: subTotal,
    reduction: reduction,
    total: subTotal - reduction,
    infoReduction: infoReduction,
  }
}
export default useCommande
