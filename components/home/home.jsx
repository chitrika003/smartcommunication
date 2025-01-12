import { useState } from "react";
import { AppRoutes } from "../Routes";
import { Navbar } from "../navbar/navbar";
import WelcomeSection from "../welcome/welcome";
import { MyProducts } from "../seller/my_products";
import { Products } from "../product/products";
import { Checkout } from "../checkout/checkout";
import { UploadProducts } from "../seller/uploadProducts";
import { MyBanner } from "../seller/my_banner";
import { AddBanner } from "../seller/addBanner";
import '../../App.css'

export const Home = () => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [category, setCategory] = useState('home');
  
    const handleCategoryChange = (category) => {
        console.log(category,"category1");
      setCategory(category);
    }
  console.log(category,"category2");
    // cart items sample data structure------
  
    // description: "",
    // id: 3,
    // image: "",
    // name: "",
    // price: 14.99,
    // quantity: 1
  
    // additionally added quantity to the product
    const addToCart = (product) => {
      let isExist = false;
      // prevent duplicate products
      cartItems?.map((item)=> {
        item.id === product.id ? isExist = true : isExist = false
      })
      if(isExist) return
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    };
  
    const updateQuantity = (productId, change) => {
      // if change is -1 then decrease the quantity by 1
      if (change === -1) {
        setCartItems(
          // map through the cart items and if the id matches the product id and the quantity is greater than 1 then decrease the quantity by 1
          cartItems.map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } 
      // if change is 1 then increase the quantity by 1
      else {
        setCartItems(
          cartItems.map((item) =>
          (item.id === productId)
            ? { ...item, quantity: item.quantity + change }
            : item
          )
        );
      }
    };
  
    const removeFromCart = (productId) => {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    };
  
  
    const calculateTotal = () => {
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };
  
    const handleCheckout = () => {
      alert("Checkout successful!");
      setCartItems([]);
    };
  
    return (
      <div className="App">
        <Navbar
          showCart={showCart}
          setShowCart={setShowCart}
          cartItems={cartItems}
          handleCategoryChange={handleCategoryChange}
          setCartItems={setCartItems}
        />
        {category === 'home' && <WelcomeSection />}
        {category === 'add-product' && <UploadProducts />} 
        {category === 'my-products' && <div className="my-products-container-main"><MyProducts /></div>}
        {category === 'add-banner' && <AddBanner />}
        {category === 'my-banners' && <MyBanner />}

        {(category === 'all' || category === 'sarees' || category === 'Home decors' || category === 'Arts') && <Products addToCart={addToCart} category={category} />}
        {/* <Products addToCart={addToCart} category={category} /> */}

        <Checkout
          showCart={showCart}
          setShowCart={setShowCart}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          calculateTotal={calculateTotal}
          handleCheckout={handleCheckout}
        />
      </div>
    );
}
