const fs = require("fs/promises");

const file = "./db.json";


async function getProducts() {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
}


async function getProductById(id) {
  const products = await getProducts();

  return products.find((product) => product.id === id);
}


async function addProduct(product) {
  const products = await getProducts();

  products.push(product);

  await fs.writeFile(
    file,
    JSON.stringify(products, null, 2)
  );

  return product;
}


async function updateProduct(id, updatedProduct) {
  const products = await getProducts();

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...updatedProduct,
    id: id
  };

  await fs.writeFile(
    file,
    JSON.stringify(products, null, 2)
  );

  return products[index];
}


async function deleteProduct(id) {
  const products = await getProducts();

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return null;
  }

  const deletedProduct = products.splice(index, 1)[0];

  await fs.writeFile(
    file,
    JSON.stringify(products, null, 2)
  );

  return deletedProduct;
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};