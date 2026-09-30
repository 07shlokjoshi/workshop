const productDB = require("../database/productDB");

async function getProducts() {
  return await productDB.getProducts();
}

async function getProductById(id) {
  return await productDB.getProductById(id);
}

async function addProduct(product) {
  const products = await productDB.getProducts();

  const newId =
    products.length > 0
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;

  const newProduct = {
    id: newId,
    name: product.name,
    price: product.price
  };

  return await productDB.addProduct(newProduct);
}

async function updateProduct(id, data) {
  return await productDB.updateProduct(id, data);
}

async function deleteProduct(id) {
  return await productDB.deleteProduct(id);
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};