import "./cart-dropdown.style.scss";
import Button from "../button/button.component";
import CartItem from "../cart-items/cart-item.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} CartItem={item} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button onClick={checkoutHandler}>To checkout</Button>
    </div>
  );
};

export default CartDropDown;
