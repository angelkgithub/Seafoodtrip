import { useContext, useState, useEffect } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import '../styles/ItemPage.css'

function FavoritesPage({ onBack, searchQuery }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredFavorites = favorites.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const itemsPerPage = 9
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentFavorites = filteredFavorites.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className="item-page">
      <div className="item-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>My Favorites</h1>
        <p className="subtitle">
          {filteredFavorites.length} {filteredFavorites.length === 1 ? 'favorite' : 'favorites'} shown
        </p>
      </div>

      {filteredFavorites.length > 0 && totalPages > 1 && (
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
        {filteredFavorites.length === 0 ? (
          <div
            className="empty-state"
            style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}
          >
            {favorites.length === 0 ? (
              <>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  No favorites yet!
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Click the heart icon on menu items to add them to your favorites.
                </p>
              </>
            ) : (
              <>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  No matching favorites found.
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  This item may not be in your favorites.
                </p>
              </>
            )}
          </div>
        ) : (
          currentFavorites.map((meal) => (
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

      {filteredFavorites.length > 0 && totalPages > 1 && (
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

export default FavoritesPage