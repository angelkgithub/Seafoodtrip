import { createContext, useState, useCallback } from 'react'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = useCallback((meal) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.idMeal === meal.idMeal)
      if (!exists) {
        return [...prevFavorites, meal]
      }
      return prevFavorites
    })
  }, [])

  const removeFavorite = useCallback((mealId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.idMeal !== mealId)
    )
  }, [])

  const isFavorite = useCallback((mealId) => {
    return favorites.some((fav) => fav.idMeal === mealId)
  }, [favorites])

  const toggleFavorite = useCallback((meal) => {
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal)
    } else {
      addFavorite(meal)
    }
  }, [isFavorite, addFavorite, removeFavorite])

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
