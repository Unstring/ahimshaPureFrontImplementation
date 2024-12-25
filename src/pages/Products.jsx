const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Traditional Cow Ghee',
      description: 'Pure and organic cow ghee made using traditional methods',
      price: '₹599',
      weight: '500g',
      image: '/path-to-image.jpg', // Add your image path
    },
    // Add more products as needed
  ];

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700">
              {/* Product Image */}
              <div className="w-full h-48 flex items-center justify-center">
                Product Image
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800 dark:text-white">
                  {product.price}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.weight}
                </span>
              </div>
              <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 