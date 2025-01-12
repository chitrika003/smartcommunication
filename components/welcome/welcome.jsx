import axios from "axios";
import "./welcome.css";
import { useEffect, useState } from "react";

const WelcomeSection = () => {

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/seller/get/banner/`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000); // Change offer every 5 seconds

    return () => clearInterval(interval);
  }, [products.length]);

  const handleShowDetails = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
};

  const displayedOffers = products.slice(currentOfferIndex, currentOfferIndex + 3).concat(products.slice(0, Math.max(0, currentOfferIndex + 3 - products.length)));

  return (
   <>
    {loading ? <h1 className="welcome-loading">Loading...</h1> :
     <div className="welcome-section-container">
      <div className="welcome-section">
        <h1 className="welcome-heading">Welcome to Our Shop!</h1>
        <p className="welcome-description">Handloom Haven, your one-stop shop for exquisite handwoven treasures! Immerse yourself in the rich tapestry of Indian heritage with our curated collection of stunning handloom products. From vibrant sarees and elegant kurtas to cozy shawls and stylish accessories, every piece tells a story of artistry and tradition. Discover the beauty of sustainable fashion and support talented artisans with every purchase.</p>
        
        {products?.length > 0 ? (
          <div className="welcome-banner">
              {displayedOffers.map((offer, index) => (
                  <div key={index} className={`offer-item ${index === 0 ? 'active' : ''}`}>
                  <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="offer-image" 
                      onClick={() => handleShowDetails(offer)} // Open modal on image click
                  />
              </div>
            ))}
          </div>
          ) : 
        ""}

        {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Title: {selectedOffer?.title}</h2>
                <p>Description: {selectedOffer?.description}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
        )}

      </div>
    </div>
      }
    </>
  );

};

  export default WelcomeSection;