import './seller.css'
import { useState } from 'react';
import axios from 'axios';

export const AddBanner = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sellerId = localStorage.getItem("userId");
    const productData = { title, image, description };

    try {
        if(!sellerId && localStorage.getItem("userType") !== "seller"){
            alert("Token expired or not logged in. Please login again");
            return;
        }
        if(!title || !image || !description){
            alert("Please fill all the fields");
            return;
        }
        const response = await axios.post(`http://localhost:9000/seller/add/banner/${sellerId}`, productData, {
            headers: {
                'x-auth-token': localStorage.getItem("token")
            }
        });

        if(response.status === 200){
            alert("Banner uploaded successfully");
            setTitle('');
            setImage('');
            setDescription('');
        }
        else{
            alert("Banner upload failed");
        }
    } catch (error) {
      console.error('Error uploading banner:', error);
    }
  };

  return (
    <div className="upload-products-container">
      <h1 className="upload-products-heading">Add Banner</h1>
      <form className="upload-products-form" onSubmit={handleSubmit}>
        <input 
          className="upload-products-input"
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
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

        <button className="upload-products-button" type="submit">Upload</button>
      </form>
    </div>
  )
}