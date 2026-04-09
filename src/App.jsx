import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import IngredientsPage from './pages/IngredientsPage'
import FavoritesPage from './pages/FavoritesPage'
import CategoriesPage from './pages/CategoriesPage'
import GlobalCuisinePage from './pages/GlobalCuisinePage'
import MealDetailPage from './pages/MealDetailPage'
import ExpertChefPage from './pages/ExpertChefPage'
import Navigation from './components/Navigation'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [previousPage, setPreviousPage] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMealId, setSelectedMealId] = useState(null)

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

  const handleNavigate = (page, mealId = null) => {
    // Always update previous page when navigating
    if (currentPage !== 'meal-detail') {
      setPreviousPage(currentPage)
    }
    
    setCurrentPage(page)
    if (mealId) {
      setSelectedMealId(mealId)
    }
    setSearchQuery('')
    window.scrollTo(0, 0)
  }

  const handleBackNavigation = () => {
    setCurrentPage(previousPage)
    setSearchQuery('')
    window.scrollTo(0, 0)
  }

  const handleBackFromMenuOrGlobal = () => {
    setCurrentPage('home')
    setSearchQuery('')
    window.scrollTo(0, 0)
  }

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  const pageProps = {
    onNavigate: handleNavigate,
    onBack: handleBackNavigation,
    searchQuery: searchQuery
  }

  const renderPage = () => {
    const pages = {
      home: <HomePage {...pageProps} />,
      menu: <MenuPage onNavigate={handleNavigate} onBack={handleBackFromMenuOrGlobal} searchQuery={searchQuery} />,
      ingredients: <IngredientsPage {...pageProps} />,
      favorites: <FavoritesPage {...pageProps} />,
      categories: <CategoriesPage {...pageProps} />,
      'global-cuisine': <GlobalCuisinePage onNavigate={handleNavigate} onBack={handleBackFromMenuOrGlobal} searchQuery={searchQuery} />,
      'expert-chef': <ExpertChefPage onBack={handleBackFromMenuOrGlobal} />,
      'meal-detail': <MealDetailPage mealId={selectedMealId} onBack={handleBackNavigation} />
    }
    
    return pages[currentPage] || pages.home
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