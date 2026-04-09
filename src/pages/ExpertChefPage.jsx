import { useState } from 'react'
import '../styles/ExpertChef.css'

function ExpertChefPage({ onBack }) {
  const [selectedChef, setSelectedChef] = useState(null)
  const [chefs, setChefs] = useState([
    {
      id: 1,
      name: 'Chef Jom',
      specialty: 'Seafood Master',
      description: 'With over 20 years of culinary experience, Chef Jom specializes in fresh seafood preparation with a focus on traditional and modern techniques.',
      image: 'https://res.cloudinary.com/dc3erz7jd/image/upload/v1775707154/Jom_fgw4jy.png',
      achievements: [
        'Michelin-trained chef',
        'International competition winner',
        'Restaurant founder',
        'Best Seafood Chef Award 2023'
      ]
    },
    {
      id: 2,
      name: 'Chef Byron',
      specialty: 'Asian Fusion',
      description: 'Expert in blending traditional Asian seafood techniques with modern culinary innovations. Chef Byron creates authentic yet contemporary dishes that delight every palate.',
      image: 'https://res.cloudinary.com/dc3erz7jd/image/upload/v1775707146/Byron_cclpqd.png',
      achievements: [
        'Asian cuisine specialist',
        'Sous Chef extraordinaire',
        'Coastal cuisine expert',
        '18+ years experience'
      ]
    },
    {
      id: 3,
      name: 'Chef Hanz',
      specialty: 'Mediterranean Seafood',
      description: 'Bringing the authentic flavors of Mediterranean coastal cuisine to your table. Chef Hanz combines traditional European recipes with the finest fresh seafood.',
      image: 'https://res.cloudinary.com/dc3erz7jd/image/upload/v1775707137/Hanz_fctbqb.jpg',
      achievements: [
        'European culinary trained',
        'Mediterranean specialist',
        'Wine pairing expert',
        '15+ years in fine dining'
      ]
    },
    {
      id: 4,
      name: 'Chef Chester',
      specialty: 'Contemporary Seafood',
      description: 'Chef Chester pushes culinary boundaries with innovative seafood preparations that challenge conventions while respecting ingredient quality and tradition.',
      image: 'https://res.cloudinary.com/dc3erz7jd/image/upload/v1775707137/Chester_jihvcq.jpg',
      achievements: [
        'Culinary Institute graduate',
        'Avant-garde cuisine pioneer',
        'Award-winning innovator',
        'Chef de Partie'
      ]
    },
    {
      id: 5,
      name: 'Chef Aj',
      specialty: 'Global Seafood Cuisine',
      description: 'With expertise spanning multiple cuisines, Chef Aj creates dishes that celebrate seafood from every corner of the globe with respect and creativity.',
      image: 'https://res.cloudinary.com/dc3erz7jd/image/upload/v1775707144/Aj_jgfuwt.png',
      achievements: [
        'Global cuisine expert',
        'Multi-cultural chef',
        'Food festival judge',
        '12+ years international experience'
      ]
    }
  ])

  return (
    <div className="expertchef-page">
      <div className="expertchef-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Our Expert Chefs</h1>
        <p className="header-subtitle">Meet the talented culinary artists behind Sur's SEA-kret Recipe</p>
      </div>

      <div className="expertchef-container">
        <div className="chefs-grid">
          {chefs.map((chef) => (
            <div 
              key={chef.id} 
              className="chef-card"
              onClick={() => setSelectedChef(chef)}
              style={{
                backgroundImage: `url(${chef.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                cursor: 'pointer'
              }}
            >
              <div className="chef-card-overlay">
                <h2 className="chef-card-name">{chef.name}</h2>
                <p className="chef-card-specialty">{chef.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedChef && (
        <div className="chef-modal-overlay" onClick={() => setSelectedChef(null)}>
          <div className="chef-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedChef(null)}>✕</button>
            
            <div className="modal-header">
              <img src={selectedChef.image} alt={selectedChef.name} className="modal-image" />
              <div className="modal-header-info">
                <h2>{selectedChef.name}</h2>
                <p className="specialty-badge">{selectedChef.specialty}</p>
              </div>
            </div>

            <div className="modal-content">
              <div className="description-section">
                <h3>About</h3>
                <p>{selectedChef.description}</p>
              </div>

              <div className="achievements-section">
                <h3>Achievements</h3>
                <ul>
                  {selectedChef.achievements.map((achievement, index) => (
                    <li key={index}>
                      <span className="achievement-icon">✓</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="chef-philosophy">
        <h2>Our Philosophy</h2>
        <p>At Sur's SEA-kret Recipe, our expert chefs are dedicated to delivering exceptional dining experiences. Each dish is crafted with precision, creativity, and a deep respect for quality ingredients. We believe that great food comes from passion, knowledge, and a commitment to excellence.</p>
      </section>
    </div>
  )
}

export default ExpertChefPage
