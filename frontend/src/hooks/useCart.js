import { useContext, useDebugValue } from "react";
import CartContext from "../context/cartContext";

export default function useCart() {
  const cartContext = useContext(CartContext);

  const cart = cartContext.item;

  const setCart = (item) => {
    if (item) {
      cartContext.login(item);
      localStorage.setItem("cart", JSON.stringify(item));
    }
  };

  const addProduct = async (item, color) => {
    console.log(item);
    const product = {
      ...item,
      colors: item.colors.filter((x) => x === color).toString(),
      // colors: item.colors[item.index],
      // image: item.image[item.index],
      image: item.image.filter((x) => x.includes(color)).toString(),
    };
    if (cart !== null) {
      const exist = cart.find(
        (x) =>
          x._id === product._id &&
          x.colors === product.colors &&
          x.size === product.size
      );
      if (exist?.quantity === 10) {
        // return setError("The quantity of this product is maximum!");
      } else {
        // setError(false);
      }
      if (exist) {
        setCart(
          cart.map((x) =>
            x._id === product._id
              ? { ...exist, quantity: (exist.quantity += 1) }
              : x
          )
        );
      } else {
        const items = [...cart, { ...product, quantity: 1 }];
        setCart(items);
      }
    } else {
      setCart([{ ...product, quantity: 1 }]);
    }
  };
  return [cart, setCart, addProduct];
}
