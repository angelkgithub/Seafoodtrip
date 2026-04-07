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
    window.scrollTo(0, 0)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuPage onBack={() => handleNavigate('home')} />
      case 'ingredients':
        return <IngredientsPage onBack={() => handleNavigate('home')} />
      case 'favorites':
        return <FavoritesPage onBack={() => handleNavigate('home')} />
      case 'categories':
        return <CategoriesPage onBack={() => handleNavigate('home')} />
      case 'global-cuisine':
        return <GlobalCuisinePage onBack={() => handleNavigate('home')} />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <FavoritesProvider>
      <Navigation onNavigate={handleNavigate} isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      {renderPage()}
    </FavoritesProvider>
  )
}

export default App
