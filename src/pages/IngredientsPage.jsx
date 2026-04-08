import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/IngredientsPage.css'

function IngredientsPage({ onNavigate, onBack }) {
  const [availableIngredients, setAvailableIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loadingIngredients, setLoadingIngredients] = useState(true)
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [matchMode, setMatchMode] = useState('any')
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    const fetchAllIngredients = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        const data = await response.json()
        if (data.meals) {
          const ingredientNames = data.meals.map(meal => meal.strIngredient)
          setAvailableIngredients(ingredientNames)
        }
        setLoadingIngredients(false)
      } catch (err) {
        console.error('Error fetching ingredients:', err)
        setLoadingIngredients(false)
      }
    }

    fetchAllIngredients()
  }, [])

  useEffect(() => {
    if (selectedIngredients.length === 0) {
      setRecipes([])
      return
    }

    const fetchRecipesByIngredients = async () => {
      try {
        setLoadingRecipes(true)
        let allRecipes = []

        for (const ingredient of selectedIngredients) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          )
          const data = await response.json()
          if (data.meals) {
            allRecipes = allRecipes.concat(data.meals)
          }
        }

        const uniqueRecipes = Array.from(
          new Map(allRecipes.map(meal => [meal.idMeal, meal])).values()
        )

        setRecipes(uniqueRecipes)
        setLoadingRecipes(false)
      } catch (err) {
        console.error('Error fetching recipes:', err)
        setRecipes([])
        setLoadingRecipes(false)
      }
    }

    fetchRecipesByIngredients()
  }, [selectedIngredients, matchMode])

  const filteredIngredients = availableIngredients.filter(ing =>
    ing.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  const clearSelection = () => {
    setSelectedIngredients([])
    setSearchQuery('')
  }

  return (
    <div className="ingredients-page">
      <div className="ingredients-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>🥗 Select Ingredients You Have</h1>
        <p className="subtitle">Choose one or more ingredients to find matching recipes</p>
      </div>

      <div className="ingredients-container">
        <div className="ingredients-layout">
          <div className="ingredients-left">
            <div className="ingredients-section">
              <div className="search-section-inside">
                <input
                  type="text"
                  placeholder="Search ingredients..."
                  className="ingredients-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <h3>Available Ingredients</h3>
              {loadingIngredients ? (
                <p className="loading">Loading ingredients...</p>
              ) : (
                <div className="ingredients-checkboxes">
                  {filteredIngredients.map(ingredient => (
                    <label key={ingredient} className="ingredient-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(ingredient)}
                        onChange={() => toggleIngredient(ingredient)}
                      />
                      <span className="checkbox-label">{ingredient}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="ingredients-right">
            {selectedIngredients.length > 0 && (
              <div className="selected-ingredients-section">
                <div className="selected-header">
                  <h3>Selected Ingredients ({selectedIngredients.length})</h3>
                  <button className="clear-btn" onClick={clearSelection}>Clear All</button>
                </div>
                <div className="selected-tags">
                  {selectedIngredients.map(ingredient => (
                    <div key={ingredient} className="selected-tag">
                      {ingredient}
                      <button
                        className="remove-tag"
                        onClick={() => toggleIngredient(ingredient)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="match-mode-section">
                  <label>
                    <input
                      type="radio"
                      value="any"
                      checked={matchMode === 'any'}
                      onChange={(e) => setMatchMode(e.target.value)}
                    />
                    Match ANY (show recipes with any selected ingredient)
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="all"
                      checked={matchMode === 'all'}
                      onChange={(e) => setMatchMode(e.target.value)}
                    />
                    Match ALL (show recipes with all selected ingredients)
                  </label>
                </div>
              </div>
            )}

            {selectedIngredients.length === 0 && (
              <div className="selected-empty-state">
                <p>👈 Select ingredients from the left to get started</p>
              </div>
            )}
          </div>
        </div>

        {selectedIngredients.length > 0 && (
          <div className="recipes-results-section">
            <h3>Matching Recipes ({recipes.length})</h3>
            {loadingRecipes && <p className="loading">Finding recipes...</p>}
            {!loadingRecipes && recipes.length === 0 && (
              <div className="empty-state">
                <p>😕 No recipes found with your selected ingredients.</p>
                <p>Try removing some ingredients or selecting different ones.</p>
              </div>
            )}
            {!loadingRecipes && recipes.length > 0 && (
              <div className="recipes-grid">
                {recipes.map((meal) => (
                  <div 
                    key={meal.idMeal} 
                    className="recipe-card"
                    onClick={() => onNavigate('meal-detail', meal.idMeal)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="recipe-image-container">
                      <img src={meal.strMealThumb} alt={meal.strMeal} />
                    </div>
                    <div className="recipe-content">
                      <div className="recipe-header-row">
                        <h4>{meal.strMeal}</h4>
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
        )}
      </div>
    </div>
  )
}

export default IngredientsPage