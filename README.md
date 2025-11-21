# Style Hub

A simple full-stack product management application built with **React**, **Express**, and **Tailwind CSS**. It demonstrates basic CRUD operations: create, read, update, and delete products. Designed for learning and prototyping with a beautiful pink-themed UI.

## Features

- Add, edit, delete, and view individual product details
- Responsive, (Tailwind CSS)
- Backend seeded with Fake Store API products
- Simple, clean routing with React Router

## Tech Stack

- **Frontend:** React, React Router, Tailwind CSS
- **Backend:** Express (Node.js), CORS
- **API:** https://fakestoreapi.com/products

## Installation

Clone the repo and run both backend and frontend locally:
git clone https://github.com/Sneha-p1/StoreApp.git

**1. Backend**

cd StoreApp/backend
npm install
npm run dev


**2. Frontend**
cd StoreApp/frontend
npm install
npm run dev

## Usage

- **View Products:** Product List page (`/`)
- **Add Product:** Click "+ Add Product", fill form, submit
- **Edit Product:** Open product, click "Edit"
- **Delete Product:** Open product, click "Delete"

## 🌐 API Endpoints

| Method | Endpoint                   | Description            |
|--------|----------------------------|------------------------|
| GET    | /api/products              | List all products      |
| GET    | /api/products/:id          | Get single product     |
| POST   | /api/products              | Add product            |
| PUT    | /api/products/:id          | Update product         |
| DELETE | /api/products/:id          | Remove product         |



