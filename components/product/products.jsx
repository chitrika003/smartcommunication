import { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import WelcomeSection from "../welcome/welcome";
// import productsData from "../../Utils/products";

export const Products = ({addToCart, category}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // const handleCategoryChange = (category) => {
  //   setCategory(category);
  //   handleCategoryChange(category);
  //   console.log(category);
  // }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/all/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let categoryName = category === "Arts" ? "arts" : category === "sarees" ? "sarees" : category === "Home decors" ? "home-decors" : "all";
    const filteredProducts = products.filter(product => categoryName === 'all' ? true : product.category === categoryName);
    setFilteredProducts(filteredProducts);
  }, [category]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // const filteredProducts = products.filter(product => category === 'all' ? true : product.category === category);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('https://dummyjson.com/products?limit=5');
  //       const data = await response.json();
        
  //       const formattedProducts = data.products.map(item => ({
  //         id: item.id,
  //         name: item.title,
  //         price: item.price,
  //         image: item.thumbnail,
  //         description: item.description
  //       }));

  //       setProducts(formattedProducts);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       setProducts([]);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="products-container">
      < WelcomeSection/> < WelcomeSection/>
      {loading ? <h1 className="no-products-found">Loading...</h1> : 
      filteredProducts?.length === 0 ? <h1 className="no-products-found">No products found</h1> : 
      filteredProducts?.map((product, i) => (
        <div key={i} className="product-card">
          <div className="product-image-container">
          <img className="product-image" src={product.image} alt={product.name} />
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <div className="product-description-container">
            <p className="product-description-heading">Description:</p>
            <p className="product-description">{product?.description}</p>
          </div>
        <button className="product-add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}
