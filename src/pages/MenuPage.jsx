import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/MenuPage.css'

function MenuPage({ onBack, searchQuery }) {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
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

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
)

const mealsPerPage = 6
const totalPages = Math.ceil(filteredMeals.length / mealsPerPage)

const startIndex = (currentPage - 1) * mealsPerPage
const endIndex = startIndex + mealsPerPage

const currentMeals = filteredMeals.slice(startIndex, endIndex)

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
        {!loading && filteredMeals.length === 0 && (
          <p className="error">No seafood dishes found.</p>
        )}

        {!loading && filteredMeals.length > 0 && (
          <>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Previous
              </button>

              <div className="page-numbers">
                {(() => {
                  const maxVisible = 5
                  let start = Math.max(currentPage - Math.floor(maxVisible / 2), 1)
                  let end = start + maxVisible - 1

                  if (end > totalPages) {
                    end = totalPages
                    start = Math.max(end - maxVisible + 1, 1)
                  }

                  return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`page-number ${currentPage === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))
                })()}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          )}
            <div className="menu-items">
              {currentMeals.map((meal) => (
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
                      >
                        {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-arrows">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="arrow-btn"
                >
                  ←
                </button>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="arrow-btn"
                >
                  →
                </button>
              </div>
            )}
          </>
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
