const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// In-memory database (replace with MongoDB/PostgreSQL in production)
let products = [];
let nextId = 1;

// Initialize with Fake Store API data
const initializeProducts = async () => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    nextId = Math.max(...products.map(p => p.id)) + 1;
    console.log(`Initialized with ${products.length} products`);
  } catch (error) {
    console.error('Error initializing products:', error);
  }
};

// Initialize products when server starts
initializeProducts();

// GET - Fetch all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET - Fetch single product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// POST - Create new product
app.post("/api/products", (req, res) => {
  const { title, price, description, image, category } = req.body;
  
  // Validation
  if (!title || !price || !description || !category) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newProduct = {
    id: nextId++,
    title,
    price: parseFloat(price),
    description,
    image: image || "https://via.placeholder.com/300",
    category,
    rating: { rate: 0, count: 0 }
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT - Update existing product
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { title, price, description, image, category } = req.body;

  products[index] = {
    ...products[index],
    title: title || products[index].title,
    price: price ? parseFloat(price) : products[index].price,
    description: description || products[index].description,
    image: image || products[index].image,
    category: category || products[index].category
  };

  res.json(products[index]);
});

// DELETE - Remove product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);
  res.json({ message: "Product deleted successfully" });
});

app.get("/", (req, res) => {
  res.send("Backend is running! Use /api/products for CRUD operations");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
