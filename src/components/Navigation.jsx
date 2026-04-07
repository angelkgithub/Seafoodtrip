import { useState } from 'react'
import '../styles/Navigation.css'

function Navigation({ onNavigate, isDarkMode, onThemeToggle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleSectionClick = (section) => {
    onNavigate(section)
    setIsDropdownOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
          <h1>Sur's SEA-kret Recipe</h1>
        </div>

        <div className="nav-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search dishes..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          <div className="dropdown-wrapper">
            <button className="dropdown-button" onClick={toggleDropdown}>
              Menu ▼
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-section">
                  <h3 className="section-title" onClick={() => handleSectionClick('ingredients')}>
                    Ingredients
                  </h3>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-section">
                  <h3 className="section-title" onClick={() => handleSectionClick('favorites')}>
                    Favorites
                  </h3>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-section">
                  <h3 className="section-title" onClick={() => handleSectionClick('categories')}>
                    Categories
                  </h3>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-section">
                  <h3 className="section-title" onClick={() => handleSectionClick('global-cuisine')}>
                    Global Cuisine
                  </h3>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-section theme-section">
                  <button className="theme-toggle" onClick={onThemeToggle}>
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
