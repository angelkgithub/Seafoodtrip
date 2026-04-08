import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import IngredientsPage from './pages/IngredientsPage'
import FavoritesPage from './pages/FavoritesPage'
import CategoriesPage from './pages/CategoriesPage'
import GlobalCuisinePage from './pages/GlobalCuisinePage'
import Navigation from './components/Navigation'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark-mode')
      root.classList.remove('light-mode')
    } else {
      root.classList.add('light-mode')
      root.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSearchQuery('')
    window.scrollTo(0, 0)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage onBack={() => handleNavigate('home')} searchQuery={searchQuery} />
      case 'ingredients':
        return <IngredientsPage onBack={() => handleNavigate('home')} />
      case 'favorites':
        return <FavoritesPage onBack={() => handleNavigate('home')} searchQuery={searchQuery} />
      case 'categories':
        return <CategoriesPage onBack={() => handleNavigate('home')} searchQuery={searchQuery} />
      case 'global-cuisine':
        return <GlobalCuisinePage onBack={() => handleNavigate('home')} searchQuery={searchQuery} />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <FavoritesProvider>
      <Navigation 
      onNavigate={handleNavigate} 
      isDarkMode={isDarkMode} 
      onThemeToggle={handleThemeToggle}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery} 
      />
      {renderPage()}
    </FavoritesProvider>
  )
}

export default App
