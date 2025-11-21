import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="p-6">

      <div className="w-full mb-6 flex justify-center">
        <img 
          src="/banner.jpeg"   
          alt="StyleHub Banner" 
          className="h-48 object-cover rounded-lg max-w-full"
        />
      </div>

      <hr className="mb-6" />

      <div className="flex items-center justify-between mb-6">
        <Link
          to="/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Add Product
        </Link>
      </div>

      {/* ---- Product Section ---- */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1.5rem' 
      }}>
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="border rounded-lg p-4 hover:shadow-lg transition flex flex-col"
            style={{ height: '400px', backgroundColor: '#f5f6fa' }}
          >
            <div className="flex justify-center mb-3" style={{ height: '290px' }}>
              <img
                src={product.image}
                alt={product.title}
                className="object-contain"
                style={{ maxHeight: '300px', maxWidth: '260px' }}
              />
            </div>

            <h2 className="font-semibold text-sm text-gray-800 text-center mb-2" >
              {product.title}
            </h2>

            <p className="font-bold text-green-700 text-center mt-auto">
              ₹{product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

