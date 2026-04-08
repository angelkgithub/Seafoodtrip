import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/ItemPage.css'
import '../styles/MenuPage.css'

function CategoriesPage({ onNavigate, onBack, searchQuery }) {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext)
  
  const filteredCategories = categories.filter((category) =>
    category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const itemsPerPage = 9
  const activeItems = selectedCategory ? filteredMeals : filteredCategories
  const totalPages = Math.ceil(activeItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = filteredCategories.slice(startIndex, endIndex)
  const currentMeals = filteredMeals.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

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

  if (!selectedCategory) {
    return (
      <div className="item-page">
        <div className="item-header">
          <button className="back-button" onClick={onBack}>← Back</button>
          <h1>Categories</h1>
          <p className="subtitle">Click a category to explore recipes</p>
        </div>
        
        {!loading && filteredCategories.length > 0 && totalPages > 1 && (
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
        
        <div className="items-grid">
          {loading && <p className="loading">Loading categories...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && filteredCategories.length === 0 && (
            <div className="categories-empty-state">
              <p className="error">No categories found.</p>
            </div>
          )}

          {!loading && filteredCategories.length > 0 && currentCategories.map((category) => (
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

        {!loading && filteredCategories.length > 0 && totalPages > 1 && (
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
      </div>
    )
  }

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

        {!loading && filteredMeals.length === 0 && (
          <p className="error">No recipes found in this category.</p>
        )}
        
        {!loading && filteredMeals.length > 0 && totalPages > 1 && (
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
        
        {!loading && filteredMeals.length > 0 && (
          <div className="menu-items">
            {currentMeals.map((meal) => (
              <div 
                key={meal.idMeal} 
                className="menu-item"
                onClick={() => onNavigate('meal-detail', meal.idMeal)}
                style={{ cursor: 'pointer' }}
              >
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

        {!loading && filteredMeals.length > 0 && totalPages > 1 && (
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
      </div>
    </div>
  )
}

export default CategoriesPage