import '../styles/ItemPage.css'

function FavoritesPage({ onBack }) {
  const favorites = [
    { name: 'Grilled Salmon', description: 'Perfectly grilled salmon with lemon butter sauce and vegetables' },
    { name: 'Sushi Platter', description: 'Assorted fresh sushi rolls with wasabi and pickled ginger' },
    { name: 'Garlic Shrimp', description: 'Succulent shrimp sautéed with garlic and white wine' },
    { name: 'Pan-Seared Scallops', description: 'Restaurant-quality scallops with truffle risotto' },
    { name: 'Lobster Thermidor', description: 'Classic French-style lobster with creamy sauce' },
    { name: 'Seafood Paella', description: 'Spanish-inspired paella with mixed seafood and saffron rice' },
    { name: 'Tuna Tartare', description: 'Fresh tuna tartare with avocado and crispy wonton' },
    { name: 'Mussels Marinière', description: 'Fresh mussels in white wine and garlic broth' }
  ]

  return (
    <div className="item-page">
      <div className="item-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Our Favorites</h1>
        <p className="subtitle">Most beloved dishes by our customers</p>
      </div>

      <div className="items-grid">
        {favorites.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-icon">⭐</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
