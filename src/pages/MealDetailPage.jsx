import { useState, useEffect, useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/MealDetailPage.css'

function MealDetailPage({ mealId, onBack }) {
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext)
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await response.json()
        if (data.meals) {
          setMeal(data.meals[0])
        } else {
          setError('Meal not found')
        }
      } catch (err) {
        console.error('Error fetching meal details:', err)
        setError('Failed to load meal details')
      } finally {
        setLoading(false)
      }
    }
    fetchMealDetails()
  }, [mealId])

  if (loading) {
    return (
      <div className="meal-detail">
        <button className="back-button" onClick={onBack}>← Back</button>
        <div className="loader"></div>
        <p className="loading">Loading meal details...</p>
      </div>
    )
  }

  if (error || !meal) {
    return (
      <div className="meal-detail">
        <button className="back-button" onClick={onBack}>← Back</button>
        <p className="error">{error || 'Meal not found'}</p>
      </div>
    )
  }

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        name: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
        id: i
      })
    }
  }

  const toggleIngredientCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const generatePDF = () => {
    const doc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Shopping List - ${meal.strMeal}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
      padding: 20px;
      color: #333;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 3px solid #ff6b35;
      padding-bottom: 20px;
    }
    .header h1 {
      font-size: 2.5rem;
      color: #ff6b35;
      margin-bottom: 10px;
    }
    .header p {
      font-size: 1rem;
      color: #666;
    }
    .recipe-info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
    }
    .info-item {
      text-align: center;
    }
    .info-label {
      font-weight: bold;
      color: #ff6b35;
      font-size: 0.9rem;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 1.1rem;
      color: #333;
    }
    .ingredients-section {
      margin-top: 30px;
    }
    .ingredients-section h2 {
      font-size: 1.8rem;
      color: #ff6b35;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #ff6b35;
    }
    .ingredients-list {
      list-style: none;
    }
    .ingredient-item {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px dashed #ddd;
      page-break-inside: avoid;
    }
    .ingredient-item:last-child {
      border-bottom: none;
    }
    .checkbox {
      width: 20px;
      height: 20px;
      margin-right: 15px;
      border: 2px solid #ff6b35;
      border-radius: 4px;
      flex-shrink: 0;
      cursor: pointer;
    }
    .ingredient-name {
      font-weight: 600;
      color: #333;
      flex: 1;
      font-size: 1rem;
    }
    .ingredient-measure {
      color: #ff6b35;
      font-weight: bold;
      min-width: 100px;
      text-align: right;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #ff6b35;
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
    .print-note {
      background: #fff3cd;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      color: #856404;
      font-size: 0.9rem;
      text-align: center;
    }
    @media print {
      body {
        background: white;
        padding: 0;
      }
      .container {
        box-shadow: none;
        max-width: 100%;
        padding: 0;
      }
      .print-note {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🛒 Shopping List</h1>
      <p>Recipe: ${meal.strMeal}</p>
    </div>

    <div class="print-note">
      ✓ Check off items as you shop • Use print function (Ctrl+P or Cmd+P) to save as PDF
    </div>

    <div class="recipe-info">
      <div class="info-item">
        <div class="info-label">Dish Name</div>
        <div class="info-value">${meal.strMeal}</div>
      </div>
      ${meal.strCategory ? `
      <div class="info-item">
        <div class="info-label">Category</div>
        <div class="info-value">${meal.strCategory}</div>
      </div>
      ` : ''}
      ${meal.strArea ? `
      <div class="info-item">
        <div class="info-label">Cuisine</div>
        <div class="info-value">${meal.strArea}</div>
      </div>
      ` : ''}
      <div class="info-item">
        <div class="info-label">Total Ingredients</div>
        <div class="info-value">${ingredients.length}</div>
      </div>
    </div>

    <div class="ingredients-section">
      <h2>Ingredients to Buy</h2>
      <ul class="ingredients-list">
        ${ingredients.map((ing, idx) => `
          <li class="ingredient-item">
            <div class="checkbox"></div>
            <span class="ingredient-name">${ing.name}</span>
            <span class="ingredient-measure">${ing.measure}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="footer">
      <p>Generated from Sur's SEA-kret Recipe • ${new Date().toLocaleDateString()}</p>
      <p style="margin-top: 10px; font-size: 0.85rem;">Print this page to create a portable shopping checklist</p>
    </div>
  </div>

  <script>
    window.print();
  </script>
</body>
</html>
    `

    const blob = new Blob([doc], { type: 'text/html' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="meal-detail">
      <button className="back-button" onClick={onBack}>← Back</button>

      <div className="detail-hero">
        <div className="hero-image-wrapper">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="hero-image" />
        </div>

        <div className="hero-content">
          <h1 className="meal-title">{meal.strMeal}</h1>
          
          <div className="meal-meta">
            {meal.strCategory && (
              <div className="meta-badge">
                <span className="badge-icon">🍽️</span>
                <span className="badge-text">{meal.strCategory}</span>
              </div>
            )}
            {meal.strArea && (
              <div className="meta-badge">
                <span className="badge-icon">🌍</span>
                <span className="badge-text">{meal.strArea}</span>
              </div>
            )}
          </div>

          <div className="button-group">
            <button 
              className={`favorite-btn ${isFavorite(meal.idMeal) ? 'active' : ''}`}
              onClick={() => toggleFavorite(meal)}
            >
              <span className="favorite-icon">{isFavorite(meal.idMeal) ? '❤️' : '🤍'}</span>
              <span className="favorite-text">{isFavorite(meal.idMeal) ? 'Saved' : 'Save Recipe'}</span>
            </button>

            <button 
              className="favorite-btn print-btn"
              onClick={generatePDF}
            >
              <span className="favorite-icon">🛒</span>
              <span className="favorite-text">Print List</span>
            </button>
          </div>
        </div>
      </div>

      <div className="detail-container">
        <div className="detail-main">
          <section className="instructions-section">
            <h2>
              <span className="section-icon">👨‍🍳</span>
              Instructions
            </h2>
            <p className="instructions-text">{meal.strInstructions}</p>
          </section>

          <section className="ingredients-section">
            <h2>
              <span className="section-icon">🥘</span>
              Ingredients ({ingredients.length})
            </h2>
            <div className="ingredients-list">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="ingredient-item">
                  <div className="ingredient-left">
                    <input
                      type="checkbox"
                      className="ingredient-checkbox"
                      checked={checkedItems[ingredient.id] || false}
                      onChange={() => toggleIngredientCheck(ingredient.id)}
                      id={`ingredient-${ingredient.id}`}
                    />
                    <label htmlFor={`ingredient-${ingredient.id}`} className="ingredient-name">
                      {ingredient.name}
                    </label>
                  </div>
                  <span className="ingredient-measure">{ingredient.measure}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-sidebar">
          <div className="sidebar-card quick-info">
            <h3>Quick Info</h3>
            {meal.strCategory && (
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value">{meal.strCategory}</span>
              </div>
            )}
            {meal.strArea && (
              <div className="info-item">
                <span className="info-label">Cuisine:</span>
                <span className="info-value">{meal.strArea}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Ingredients:</span>
              <span className="info-value">{ingredients.length}</span>
            </div>
          </div>

          <div className="sidebar-card resources">
            <h3>Resources</h3>
            <div className="resources-list">
              {meal.strYoutube && (
                <a 
                  href={meal.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link video-link"
                >
                  <span className="link-icon">▶️</span>
                  <span>Watch Tutorial</span>
                </a>
              )}
              {meal.strSource && (
                <a 
                  href={meal.strSource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link source-link"
                >
                  <span className="link-icon">🔗</span>
                  <span>Full Recipe</span>
                </a>
              )}
            </div>
          </div>

          <div className="sidebar-card tips">
            <h3>💡 Pro Tip</h3>
            <p>For the best results, make sure to use fresh ingredients and follow the instructions step by step.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealDetailPage