import "./cart-item.style.scss";

const CartItem = ({ CartItem }) => {
  const { name, quantity, price, imageUrl } = CartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} />
      <div className="item-details">
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
