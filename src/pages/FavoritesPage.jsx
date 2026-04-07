import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/ItemPage.css'

function FavoritesPage({ onBack }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext)

  return (
    <div className="item-page">
      <div className="item-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>My Favorites</h1>
        <p className="subtitle">{favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'} saved</p>
      </div>

      <div className="items-grid">
        {favorites.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              No favorites yet!
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Click the heart icon on menu items to add them to your favorites.
            </p>
          </div>
        ) : (
          favorites.map((meal) => (
            <div key={meal.idMeal} className="item-card favorites-card">
              <div className="favorite-image-container">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
                <button
                  className="remove-favorite-btn"
                  onClick={() => toggleFavorite(meal)}
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>
              <div className="item-content">
                <h3>{meal.strMeal}</h3>
                <p>⭐ Your favorite</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
