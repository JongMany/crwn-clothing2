import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { BaseSpan, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton } from './checkout-item.styles';

const CheckOutItem = ({cartItem}) => {
  const {name, imageUrl, price, quantity} = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems,cartItem));
  }
  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems,cartItem));
  }

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems,cartItem));
  }

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>&#10095;</div>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}> &#10005; </RemoveButton>
    </CheckoutItemContainer>
  ) 
}

export default CheckOutItem