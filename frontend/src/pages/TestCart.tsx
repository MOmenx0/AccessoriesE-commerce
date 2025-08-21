import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ProductDto } from '../types/product';

const TestCart: React.FC = () => {
  const { items, addToCart, totalItems, totalPrice } = useCart();

  const testProduct: ProductDto = {
    id: 1,
    name: "Test Product",
    description: "This is a test product",
    price: 99.99,
    category: "Test",
    brand: "TestBrand",
    imageUrl: "/test-image.jpg",
    additionalImages: [],
    stockQuantity: 10,
    isAvailable: true,
    createdAt: new Date().toISOString()
  };

  const handleAddTestProduct = () => {
    addToCart(testProduct, 1);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cart Test Page</h1>
      
      <div className="mb-4">
        <button 
          onClick={handleAddTestProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Test Product to Cart
        </button>
      </div>

      <div className="mb-4">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Cart Items:</h2>
        {items.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.product.name} - Quantity: {item.quantity} - Price: ${item.product.price}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Raw Cart Data:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(items, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestCart;
