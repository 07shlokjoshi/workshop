const productService = require("../services/productService");
const { setCache, clearCache } = require("../middleware/cache");


async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();

    // Store fresh data in cache
    setCache("/products", products);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error getting products"
    });
  }
}


async function getProductById(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }


    setCache(`/products/${id}`, product);

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error getting product"
    });
  }
}


async function addProduct(req, res) {
  try {
    const product = await productService.addProduct(req.body);


    clearCache();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error adding product"
    });
  }
}


async function updateProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await productService.updateProduct(
      id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }


    clearCache();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error updating product"
    });
  }
}


async function patchProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await productService.updateProduct(
      id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }


    clearCache();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error updating product"
    });
  }
}


async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    const product = await productService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }


    clearCache();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product"
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};