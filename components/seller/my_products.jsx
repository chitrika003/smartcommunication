import { useState, useEffect } from "react";
import './seller.css'
import axios from "axios";

export const MyProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState('');

  const sellerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/seller/products/${sellerId}`, {
          headers: {
            'x-auth-token': token
          }
        });
        // console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  async function deleteProductFunction() {
    console.log(deleteProduct);
    console.log(token);
    try {
      if(!deleteProduct?.id) {
        alert("Please select a product to delete");
        return
      }
      const response = await axios.delete(`http://localhost:9000/seller/delete/product/${sellerId}/${deleteProduct?.id}`, {
        headers: {
          'x-auth-token': token
        }
      });

      setProducts(products.filter(product => product.id !== deleteProduct?.id));

      setIsModalOpen(false);
      setDeleteProduct('');
    } catch (error) {
      alert("Error deleting product");
      console.error('Error deleting product:', error);
    }
  }

  return (
    <div className="my-products-container">
      {loading ? <h1 className="my-products-no-products-found">Loading...</h1> : 
      products?.length === 0 ? <h1 className="my-products-no-products-found">No product found</h1> : 
      products?.length > 0 ? 
      products?.map((product, i) => (
        <div key={i} className="my-product-card">
          <div className="my-product-image-container">
            <img className="my-product-image" src={product.image} alt={product.name} />
          </div>
          <h3 className="my-product-name">{product.name}</h3>
          <p className="my-product-price">₹{product.price}</p>
          <p className="my-product-no-of-sales">No of sales: {product?.sellCount ?? 0}</p>
          <div className="my-product-description-container">
            <p className="my-product-description-heading">Description:</p>
            <p className="my-product-description">{product?.description}</p>
          </div>
          <button onClick={() => {setIsModalOpen(true); setDeleteProduct(product)}} className="my-product-delete-btn">Delete</button>
          </div>
      )) : ""}

      {isModalOpen && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-modal-content">
            <h2 className="delete-confirmation-modal-heading">Are you sure you want to delete this product?</h2>

            <p className="delete-confirmation-modal-product-name">Product Name: {deleteProduct?.name ?? ""}</p>
            <div className="delete-confirmation-modal-buttons">
              <button className="delete-confirmation-modal-button" onClick={deleteProductFunction}>Delete</button>
              <button className="delete-confirmation-modal-button-cancel" onClick={() => {setIsModalOpen(false); setDeleteProduct(null)}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}