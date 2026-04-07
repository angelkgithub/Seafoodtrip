import { useState, useEffect } from 'react'
import '../styles/HomePage.css'

function HomePage({ onNavigate }) {
  const [seafoodMeals, setSeafoodMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSeafoodMeals = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        const data = await response.json()
        if (data.meals) {
          setSeafoodMeals(data.meals.slice(0, 6)) // Get first 6 meals
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching seafood meals:', err)
        setError('Failed to load seafood dishes')
        setLoading(false)
      }
    }

    fetchSeafoodMeals()
  }, [])

  return (
    <div className="homepage">
      <div className="hero-section" style={{
        backgroundImage: 'url(https://images2.alphacoders.com/935/thumb-1920-935990.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="restaurant-name">Sur's SEA-kret Recipe</h1>
            <p className="tagline">Global Cuisine • Fresh Seafood • Exceptional Taste</p>
            <p className="description">
              Discover the finest seafood dishes from around the world, 
              expertly prepared with fresh ingredients and authentic flavors
            </p>
            <button className="cta-button" onClick={() => onNavigate && onNavigate('menu')}>Explore Our Menu</button>
          </div>
        </div>
      </div>

      <section className="featured-meals">
        <h2>Featured Seafood Dishes</h2>
        {loading && <p className="loading">Loading delicious seafood dishes...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && (
          <div className="meals-grid">
            {seafoodMeals.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h3>{meal.strMeal}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature-card" onClick={() => onNavigate && onNavigate('global-cuisine')} style={{ cursor: 'pointer' }}>
          <h3>🌍 Global Cuisine</h3>
          <p>Experience seafood dishes inspired by culinary traditions from around the world</p>
        </div>
        <div className="feature-card">
          <h3>‍🍳 Expert Chefs</h3>
          <p>Our talented chefs bring years of experience and passion to every dish</p>
        </div>
      </section>

      <section className="about">
        <h2>Welcome to Sur's Seafood House</h2>
        <p>
          At Sur's Seafood House, we believe in celebrating the ocean's bounty with 
          dishes that honor culinary traditions from every corner of the globe. From 
          Mediterranean classics to Asian fusion, each plate is a journey of flavors.
        </p>
        <p>
          Our commitment to quality, freshness, and authenticity ensures that every 
          dining experience is unforgettable.
        </p>
      </section>
    </div>
  )
}

export default HomePage
