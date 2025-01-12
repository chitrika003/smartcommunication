import React from "react";
import "./styles.css";

export const Checkout = ({
  showCart,
  setShowCart,
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
  handleCheckout,
}) => {
  function checkout() {
    if(cartItems?.length === 0) {
      alert("Cart is empty");
      return;
    }
    handleCheckout();
  }
  return (
    <>
      {showCart ? (
        <div className="cart-menu">
          <div className="cart-container">
            <div className="cart-header">
              <h2>Shopping Cart</h2>
              <button onClick={() => setShowCart(false)} className="cancel-button">
                X
              </button>
            </div>
            <div className="cart-items">
              {cartItems.map((item, i) => (
                <div key={i} className="cart-item">
                  <div className="cart-item-container">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>${item.price}</p>
                    </div>
                  </div>
                  <div className="quantity-controls-container">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <h3>Total: ${calculateTotal()}</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="checkout-btn" onClick={checkout}>
                  Pay
                </button>
                <button
                  className="checkout-btn"
                  onClick={() => setShowCart(false)}
                  style={{ backgroundColor: "#dc3545" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};