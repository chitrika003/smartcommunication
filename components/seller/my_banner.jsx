import { useState, useEffect } from "react";
import './seller.css'
import axios from "axios";

export const MyBanner = () => {

  const [banner, setBanner] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteBanner, setDeleteBanner] = useState('');

  const sellerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/seller/banner/${sellerId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        // console.log(response.data);
        setBanner(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching banner:', error);
      }
    }
    fetchBanner();
  }, []);

  async function deleteBannerFunction() {

    try {
      if(!deleteBanner?._id) {
        alert("Please select a product to delete");
        return
      }
      const response = await axios.delete(`http://localhost:9000/seller/delete/banner/${sellerId}/${deleteBanner?._id}`, {
        headers: {
          'x-auth-token': token
        }
      });

      setBanner(banner.filter(banner => banner._id !== deleteBanner?._id));

      setIsModalOpen(false);
      setDeleteBanner('');
    } catch (error) {
      alert("Error deleting banner");
      console.error('Error deleting banner:', error);
    }
  }

  return (
    <div className="my-banner-container">
      {loading ? <h1 className="my-banner-no-banner-found">Loading...</h1> : 
      banner?.length === 0 ? <h1 className="my-banner-no-banner-found">No banner found</h1> : 
      banner?.length > 0 ? 
      banner?.map((banner, i) => (
        <div key={i} className="my-banner-card">
          <div className="my-banner-image-container">
            <img className="my-banner-image" src={banner.image} alt={banner.name} />
          </div>
          <h3 className="my-banner-name">Title: {banner.title ??""}</h3>
          <div className="my-banner-description">
            <p className="my-banner-description-heading">Description:</p>
            <p className="my-banner-description">{banner?.description}</p>
          </div>
          <button onClick={() => {setIsModalOpen(true); setDeleteBanner(banner)}} className="my-banner-delete-btn">Delete</button>
          </div>
      )) : ""}

      {isModalOpen && (
        <div className="my-banner-delete-confirmation-modal">
          <div className="my-banner-delete-confirmation-modal-content">
            <h2 className="my-banner-delete-confirmation-modal-heading">Are you sure you want to delete this banner?</h2>

            <p className="my-banner-delete-confirmation-modal-banner-name">Banner Name: {deleteBanner?.title ?? ""}</p>
            <div className="my-banner-delete-confirmation-modal-buttons">
              <button className="my-banner-delete-confirmation-modal-button" onClick={deleteBannerFunction}>Delete</button>
              <button className="my-banner-delete-confirmation-modal-button-cancel" onClick={() => {setIsModalOpen(false); setDeleteBanner(null)}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}