import useCart from "../../hooks/useCart";
import { useState } from "react";

export default function addToCart({ item }) {
  const [cart, setCart] = useCart();
  const [error, setError] = useState();

  // const addProduct = async (item) => {
  const product = {
    ...item,
    colors: item.colors[item.index],
    image: item.image[item.index],
  };
  if (cart !== null) {
    const exist = cart.find(
      (x) => x._id === product._id && x.colors === product.colors
    );
    if (exist?.quantity === 10) {
      return setError("The quantity of this product is maximum!");
    } else {
      setError(false);
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
}
// }
