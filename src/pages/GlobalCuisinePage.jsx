import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/GlobalCuisine.css'

function GlobalCuisinePage({ onNavigate, onBack, searchQuery }) {
  const [mealsData, setMealsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext)

  const countries = [
    { name: 'Japan', countryCode: 'jp', area: 'Japanese' },
    { name: 'Thailand', countryCode: 'th', area: 'Thai' },
    { name: 'Italy', countryCode: 'it', area: 'Italian' },
    { name: 'France', countryCode: 'fr', area: 'French' },
    { name: 'Spain', countryCode: 'es', area: 'Spanish' },
    { name: 'China', countryCode: 'cn', area: 'Chinese' },
    { name: 'India', countryCode: 'in', area: 'Indian' },
    { name: 'Greece', countryCode: 'gr', area: 'Greek' },
    { name: 'Mexico', countryCode: 'mx', area: 'Mexican' },
    { name: 'Portugal', countryCode: 'pt', area: 'Portuguese' },
  ]

  const filteredCountries = countries.filter((country) => {
    const matchesCountry = country.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDish = mealsData[country.name]?.some((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return matchesCountry || matchesDish
  })

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCountries = filteredCountries.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  useEffect(() => {
    const fetchMealsByArea = async () => {
      try {
        setLoading(true)
        const data = {}

        for (const country of countries) {
          try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country.area}`)
            const result = await response.json()
            data[country.name] = result.meals ? result.meals.slice(0, 3) : []
          } catch (err) {
            console.error(`Error fetching ${country.name} meals:`, err)
            data[country.name] = []
          }
        }

        setMealsData(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load global cuisine data')
        setLoading(false)
      }
    }

    fetchMealsByArea()
  }, [])

  return (
    <div className="global-cuisine-page">
      <div className="cuisine-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Global Cuisine</h1>
        <p className="subtitle">Explore seafood dishes from around the world</p>
      </div>

      <div className="cuisine-container">
        {loading && <p className="loading">Loading global cuisines...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && (
          <>
            {filteredCountries.length === 0 ? (
              <p className="error">No cuisines or dishes found.</p>
            ) : (
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

                <div className="countries-grid">
                  {currentCountries.map((country) => (
                    <div key={country.name} className="country-card">
                      <div className="country-header">
                        <img
                          src={`https://flagcdn.com/w320/${country.countryCode}.png`}
                          alt={country.name}
                          className="country-flag-img"
                        />
                        <h2 className="country-name">{country.name}</h2>
                      </div>
                      <div className="dishes-list">
                        {mealsData[country.name] && mealsData[country.name].length > 0 ? (
                          mealsData[country.name].map((meal) => (
                            <div 
                              key={meal.idMeal} 
                              className="dish-item"
                              onClick={() => onNavigate('meal-detail', meal.idMeal)}
                              style={{ cursor: 'pointer' }}
                            >
                              <img src={meal.strMealThumb} alt={meal.strMeal} className="dish-image" />
                              <p className="dish-name">{meal.strMeal}</p>
                              <button
                                className={`heart-button ${isFavorite(meal.idMeal) ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(meal)
                                }}
                                title={isFavorite(meal.idMeal) ? 'Remove from favorites' : 'Add to favorites'}
                                style={{ position: 'absolute', top: '10px', right: '10px' }}
                              >
                                {isFavorite(meal.idMeal) ? '❤️' : '🤍'}
                              </button>
                            </div>
                          ))
                        ) : (
                          <p className="no-dishes">No dishes available</p>
                        )}
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
          </>
        )}
      </div>
    </div>
  )
}

export default GlobalCuisinePage