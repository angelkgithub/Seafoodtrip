import '../styles/ItemPage.css'

function CategoriesPage({ onBack }) {
  const categories = [
    { name: 'Asian Fusion', description: 'A blend of traditional Asian and modern culinary techniques' },
    { name: 'Mediterranean', description: 'Fresh ingredients inspired by Mediterranean coastal cuisine' },
    { name: 'Appetizers', description: 'Start your meal with our delicious starter selections' },
    { name: 'Main Course', description: 'Hearty and satisfying main dishes to delight your palate' },
    { name: 'Japanese', description: 'Authentic Japanese sushi and traditional dishes' },
    { name: 'French', description: 'Classic French seafood preparations with elegant sauces' },
    { name: 'Thai', description: 'Bold flavors with spices and aromatic herbs' },
    { name: 'Desserts', description: 'Sweet treats to complete your dining experience' }
  ]

  return (
    <div className="item-page">
      <div className="item-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Categories</h1>
        <p className="subtitle">Explore our diverse menu categories</p>
      </div>

      <div className="items-grid">
        {categories.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-icon">🍽️</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
