import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/MenuPage.css'

function MenuPage({ onBack }) {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    const fetchSeafoodMeals = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        const data = await response.json()
        if (data.meals) {
          setMeals(data.meals)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching seafood meals:', err)
        setError('Failed to load menu')
        setLoading(false)
      }
    }

    fetchSeafoodMeals()
  }, [])

  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Our Menu</h1>
        <p className="subtitle">Discover our exquisite seafood dishes from around the world</p>
      </div>

      <div className="menu-container">
        {loading && <p className="loading">Loading our delicious menu...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && meals.length > 0 && (
          <div className="menu-items">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="menu-item">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
                <div className="item-content">
                  <div className="item-header-row">
                    <h3>{meal.strMeal}</h3>
                    <button
                      className={`heart-button ${isFavorite(meal.idMeal) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(meal)
                      }}
                      title={isFavorite(meal.idMeal) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="menu-footer">
        <p>All dishes are prepared with the freshest ingredients</p>
        <p>Please ask your server about daily specials and recommendations</p>
      </div>
    </div>
  )
}

export default MenuPage
