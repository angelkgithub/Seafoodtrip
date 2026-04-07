import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/ItemPage.css'
import '../styles/MenuPage.css'

function CategoriesPage({ onBack }) {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext)

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        const data = await response.json()
        if (data.categories) {
          setCategories(data.categories)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError('Failed to load categories')
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Fetch meals when category is selected
  useEffect(() => {
    if (!selectedCategory) return

    const fetchMealsByCategory = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.strCategory}`
        )
        const data = await response.json()
        if (data.meals) {
          setMeals(data.meals)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching meals:', err)
        setError('Failed to load meals')
        setLoading(false)
      }
    }

    fetchMealsByCategory()
  }, [selectedCategory])

  // Show categories list
  if (!selectedCategory) {
    return (
      <div className="item-page">
        <div className="item-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <h1>Categories</h1>
          <p className="subtitle">Click a category to explore recipes</p>
        </div>

        <div className="items-grid">
          {loading && <p className="loading">Loading categories...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && categories.length > 0 && categories.map((category) => (
            <div
              key={category.idCategory}
              className="item-card category-card"
              onClick={() => setSelectedCategory(category)}
              style={{ cursor: 'pointer' }}
            >
              <img src={category.strCategoryThumb} alt={category.strCategory} className="category-image" />
              <h3>{category.strCategory}</h3>
              <p>{category.strCategoryDescription.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Show meals for selected category
  return (
    <div className="menu-page">
      <div className="menu-header">
        <button className="back-button" onClick={() => setSelectedCategory(null)}>← Back</button>
        <h1>{selectedCategory.strCategory}</h1>
        <p className="subtitle">Recipes in this category</p>
      </div>

      <div className="menu-container">
        {loading && <p className="loading">Loading recipes...</p>}
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
    </div>
  )
}

export default CategoriesPage
