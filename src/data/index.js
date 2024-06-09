export let cartData = [
  // {
  //   id: -1,
  //   title: 'product.title',
  //   description: 'product.description',
  //   category: 'product.category',
  //   price: 'product.price',
  //   discountPercentage: 'product.discountPercentage',
  //   rating: 'product.rating',
  //   stock: 'product.stock',
  //   tags: 'product.tags',
  //   brand: 'product.brand',
  //   images: 'product.images',
  //   thumbnail: 'product.thumbnail',
  //   count: 'count',
  // },

  { id: 1, count: 1 },
  { id: 2, count: 5 },
  { id: 3, count: 2 },
  { id: 4, count: 4 },
  { id: 5, count: 3 },
];

export function searchInCart(productId) {
  return cartData.some(item => item.id === productId);
}

export function addToCart(product) {
  searchInCart(product.id) && removeFromCart(product);
  cartData = [...cartData, product];
  console.log(cartData);
}

export function removeFromCart(product) {
  cartData = cartData.filter((item) => (
    item.id !== product.id
  ));
  console.log(cartData);
}

export function editProductInCart(product) {
  searchInCart(product.id) && removeFromCart(product);
  addToCart(product);
}