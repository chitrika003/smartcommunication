import './seller.css'
import { useState } from 'react';
import axios from 'axios';

export const UploadProducts = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sellerId = localStorage.getItem("userId");
    const productData = { name, image, description, price, category };

    try {
        if(!sellerId && localStorage.getItem("userType") !== "seller"){
            alert("Token expired or not logged in. Please login again");
            return;
        }
        if(!name || !image || !description || !price){
            alert("Please fill all the fields");
            return;
        }
        if(category === "select"){
            alert("Please select a category");
            return;
        }
        
        const response = await axios.post(`http://localhost:9000/seller/add/product/${sellerId}`, productData, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        });

        if(response.status === 200){
            alert("Product uploaded successfully");
            setName('');
            setImage('');
            setDescription('');
            setPrice('');
            setCategory('');
        }
        else{
            alert("Product upload failed");
        }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className="upload-products-container">
      <h1 className="upload-products-heading">Upload Products</h1>
      <form className="upload-products-form" onSubmit={handleSubmit}>
        <input 
          className="upload-products-input"
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          className="upload-products-input"
          type="text" 
          placeholder="Image URL" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
        />
        <textarea 
          className="upload-products-textarea"
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          className="upload-products-input"
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <select 
          className="upload-products-input"
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        >
          <option value="select">Select Category</option>
          <option value="arts">Arts</option>
          <option value="beauty">Beauty</option>
          <option value="sarees">Sarees</option>
          <option value="home-decors">Home Decors</option>
        </select>
        <button className="upload-products-button" type="submit">Upload</button>
      </form>
    </div>
  )
}