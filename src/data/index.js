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
  // {
  //   id: -2,
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
  // }
];

export function addToCart(product) {
  cartData = [...cartData, product];
  console.log(cartData);
}

export function removeFromCart(product) {
  cartData = cartData.filter((item) => (
    item.id !== product.id
  ));
  console.log(cartData);
}