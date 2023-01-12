const Cart = require("../../db/models/cart");

class CartController {
  async addProdcut(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    const products = req.body.product ? [req.body.product] : req.body.cart;
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      console.log("product", product);
      console.log("i", i);
      if (userCart?.user) {
        const exist = userCart.products?.find(
          (x) =>
            x._id === product._id &&
            x.colors === product.colors &&
            x.size === product.size
        );
        if (exist) {
          const newCart = userCart?.products.map((x) =>
            x._id === product._id && x.size === product.size
              ? { ...x, quantity: x.quantity + 1 }
              : x
          );
          userCart.products = newCart;
          try {
            await userCart.save();
          } catch (e) {
            console.log(e);
          }
        } else {
          const items = [...userCart.products, { ...product, quantity: 1 }];
          userCart.products = items;
          try {
            await userCart.save();
          } catch (e) {
            console.log(e);
            return res.statu(400).json({ message: e.message });
          }
        }
      } else {
        const userCart = new Cart({
          user: req.body.userId,
          products: { ...req.body.product, quantity: 1 },
        });
        try {
          await userCart.save();
        } catch (e) {
          res.status(402).json((e.message = "Something went wrong"));
        }
      }
    }
    // else if (req.body.cart) {
    //   userCart.products = [].concat(userCart.products, req.body.cart);
    //   try {
    //     await userCart.save();
    //   } catch (e) {
    //     res.status(402).json((e.message = "Something went wrong"));
    //   }
    // }
    res.status(200).json({ cart: userCart.products });
  }

  async deleteProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    const deletedProduct = req.body.product;
    userCart.products = userCart.products.filter(
      (x) => JSON.stringify(x) !== JSON.stringify(deletedProduct)
    );
    try {
      await userCart.save();
      res.status(200).json({ cart: userCart.products });
    } catch (e) {}
  }

  async updateProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    const updatedProduct = req.body.product;
    userCart.products = userCart.products.map((x) =>
      x._id === updatedProduct._id &&
      x.color === updatedProduct.color &&
      x.size === updatedProduct.size
        ? { ...x, quantity: Number(req.body.quantity) }
        : x
    );
    try {
      await userCart.save();
      res.status(200).json({ cart: userCart.products });
    } catch (e) {}
  }

  async getProduct(req, res) {
    const userCart = await Cart.findOne({ user: req.body.userId });
    res.status(200).json({ cart: userCart.products });
  }
}

module.exports = new CartController();
