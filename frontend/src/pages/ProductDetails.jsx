import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Product deleted successfully!");
          navigate("/");
        })
        .catch((err) => {
          alert("Error deleting product: " + err.message);
        });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-xl text-red-600 text-center">{error}</div>
        <button
          onClick={() => navigate("/")}
          className="mt-4 mx-auto block px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center px-4 py-2 mb-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <img
          src={product.image}
          alt={product.title}
          className="h-80 w-80 object-contain mx-auto"
        />

        {/* Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-green-700 text-xl font-semibold mb-3">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mb-4">{product.description}</p>

          <p className="text-sm bg-gray-200 inline-block px-2 py-1 rounded mb-4">
            Category: {product.category}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}