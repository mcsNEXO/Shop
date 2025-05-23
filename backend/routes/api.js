const express = require("express");
const router = express.Router();
const userController = require("../controllers/api/user-controller");
const shoesController = require("../controllers/api/shoes-controller");
const promoCodeController = require("../controllers/api/promo-code-controller");
const productController = require("../controllers/api/product-controller");
const cartController = require("../controllers/api/cart-controller");
const orderController = require("../controllers/api/order-controller");
const path = require("path");
const multer = require("multer");
const authenticateToken = require("../middlewares/verify-token-middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});
let upload = multer({ storage: storage }).single("image");

router.post("/save-image", userController.saveImage);
router.post("/cancel-image", userController.cancelUpload);
router.post("/delete-image", userController.deleteImage);
router.post("/image", upload, userController.uploadImage);
router.post("/sign-in", userController.login);
router.get("/logout", userController.logout);
router.post("/sign-up", userController.register);
router.put("/edit-data", userController.edit);
router.put("/edit-password", userController.editPassword);

router.post("/add-product", cartController.addProdcut);
router.post("/delete-product", cartController.deleteProduct);
router.post(
  "/update-quantity-product",

  cartController.updateQuantityProduct
);
router.post("/get-product", cartController.getProduct);
router.post(
  "/get-cart-not-logged",
  cartController.getProductsCartNotLoggedUser
);
router.post("/get-fav-product", cartController.getFavProduct);
router.post("/delete-favorite", cartController.deleteFavorite);
router.post("/get-user-products", cartController.getUserProducts);
router.get("/get-favorite-products/:id", cartController.getFavoriteProducts);
router.get("/get-shoess", shoesController.getShoess);
router.post("/get-shoes", shoesController.getShoes);
router.post("/get-promocode", promoCodeController.getCode);

router.get("/get-product/:id/:color", productController.fetchProduct);
router.post("/fetch-product", productController.fetchProduct);
router.get("/fetch-all-products", productController.fetchAllProduct);
router.post("/add-product-db", productController.addProduct);

router.post("/order", orderController.makeOrder);
router.post("/get-searched-products", productController.getSearchedProduct);

module.exports = router;
