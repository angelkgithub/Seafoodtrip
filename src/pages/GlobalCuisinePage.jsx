import { useState, useEffect } from 'react'
import '../styles/GlobalCuisine.css'

function GlobalCuisinePage({ onBack }) {
  const [mealsData, setMealsData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          <div className="countries-grid">
            {countries.map((country) => (
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
                      <div key={meal.idMeal} className="dish-item">
                        <img src={meal.strMealThumb} alt={meal.strMeal} className="dish-image" />
                        <p className="dish-name">{meal.strMeal}</p>
                      </div>
                    ))
                  ) : (
                    <p className="no-dishes">No dishes available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GlobalCuisinePage
