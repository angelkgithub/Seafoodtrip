import '../styles/ItemPage.css'

function IngredientsPage({ onBack }) {
  const ingredients = [
    { name: 'Salmon', description: 'Fresh Atlantic salmon with rich flavor and omega-3 nutrients' },
    { name: 'Tuna', description: 'Premium quality tuna, perfect for sushi and grilled dishes' },
    { name: 'Shrimp', description: 'Tender shrimp sourced fresh daily from the best suppliers' },
    { name: 'Crab', description: 'Succulent crab meat, ideal for salads and pasta dishes' },
    { name: 'Mussels', description: 'Fresh mussels with a delicate briny flavor' },
    { name: 'Oysters', description: 'Premium oysters for a sophisticated dining experience' },
    { name: 'Scallops', description: 'Sweet and tender scallops from cold waters' },
    { name: 'Lobster', description: 'Luxurious lobster for our finest dishes' }
  ]

  return (
    <div className="item-page">
      <div className="item-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Our Ingredients</h1>
        <p className="subtitle">Premium seafood sourced from the finest suppliers</p>
      </div>

      <div className="items-grid">
        {ingredients.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-icon">🐟</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IngredientsPage
