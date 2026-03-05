"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import SidebarAdmin from "../component/sidebar";
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

type CategoryType = "all" | "signature" | "snacks" | "drinks";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<CategoryType>("signature");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState<CategoryType>("all");
  const [message, setMessage] = useState("");

  // Fetch Products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Image Preview
  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
  // Add / Update Product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description) {
      Toast.fire({
        icon: "error",
        title: "All fields are required",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        Swal.fire({
          icon: "success",
          title: "Updated Successfully 🎉",
          text: "Product updated successfully",
          confirmButtonColor: "#f97316",
        });

      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        Swal.fire({
          icon: "success",
          title: "Added Successfully 🎉",
          text: "Product added successfully",
          confirmButtonColor: "#f97316",
        });
      }

      resetForm();
      fetchProducts();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong ❌",
        confirmButtonColor: "#f97316",
      });
    }
  };

  // Edit Product
  const editProduct = (product: Product) => {
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category as CategoryType);
    setDescription(product.description);
    setPreview(`http://localhost:5000/uploads/${product.image}`);
  };
  const deleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete it",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);

        Toast.fire({
          icon: "success",
          title: "Product deleted successfully",
        });

        fetchProducts();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Delete failed ❌",
        });
      }
    }
  };
  // Reset Form
  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("signature");
    setDescription("");
    setImage(null);
    setPreview(null);
    setEditId(null);
  };

  // Filter Products
  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <><div className="flex min-h-screen bg-[var(--skin)] ">

      <SidebarAdmin />

      <div className="flex-1 p-6 bg-[var(--skin)]  overflow-y-auto">
        {/* FORM */}
<div className="max-w-md mx-auto mb-10 p-8 bg-[var(--accent)] rounded-3xl shadow-2xl border border-orange-300">
  <h2 className="text-3xl font-extrabold text-white text-center mb-6">
    {editId ? "Edit Product" : "Add Product"}
  </h2>

  {message && (
    <div className="mb-4 text-center font-semibold text-yellow-300">
      {message}
    </div>
  )}

  <form onSubmit={handleSubmit} className="flex flex-col gap-5">

    <input
      type="text"
      placeholder="Product Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="p-4 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-black placeholder-gray-700"
    />

    <textarea
      placeholder="Product Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="p-4 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none resize-none h-24 text-black placeholder-gray-700"
    />

    <input
      type="number"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="p-4 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-black placeholder-gray-700"
    />

    {/* 🎨 Attractive Select Dropdown */}
    <div className="relative">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryType)}
        className="appearance-none w-full p-4 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none bg-white text-black font-semibold cursor-pointer"
      >
        <option value="signature">Signature</option>
        <option value="snacks">Snacks</option>
        <option value="drinks">Drinks</option>
      </select>
      <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        ▼
      </span>
    </div>

    {/* 🎨 Attractive File Upload */}
    <div className="flex flex-col gap-2">
      <label
        htmlFor="imageUpload"
        className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl text-center transition transform hover:-translate-y-1"
      >
        {image ? "Change Image" : "Upload Image"}
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
        className="hidden"
      />

      {preview && (
        <img
          src={preview}
          className="h-44 object-contain rounded-xl border border-orange-300 shadow-lg mt-2"
        />
      )}
    </div>

    <div className="flex gap-4 mt-4">
      <button
        type="submit"
        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl font-bold transition transform hover:-translate-y-1"
      >
        {editId ? "Update Product" : "Add Product"}
      </button>

      {editId && (
        <button
          type="button"
          onClick={resetForm}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition transform hover:-translate-y-1"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
</div>

        {/* FILTER */}
        <div className="flex justify-center gap-4 mb-8">
          {["all", "signature", "snacks", "drinks"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as CategoryType)}
              className={`px-6 py-2 rounded-full font-semibold transition ${filter === cat
                  ? "bg-[var(--primary)]  text-white"
                  : "bg-gray-200"
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID 
      {/* PRODUCTS SECTION */}
<section className="w-full bg-[var(--skin)] py-16 px-6 relative overflow-hidden">
 
  {/* HEADING */}
  <div className="text-center mb-14">
    <h2 className="text-4xl font-extrabold text-[var(--accent)] uppercase">
      Manage Products
    </h2>
  </div>

  {/* PRODUCT GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto mt-32">
    {visibleProducts.map((item, index) => (
      <motion.div
        key={item._id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="relative bg-[var(--accent)] rounded-xl p-6 pt-16 text-center hover:-translate-y-3 transition duration-300 shadow-lg"
      > 
                  {/* 🍕 Pizza on First Card */}
                  {index === 0 && (
                    <div className="absolute -top-40 left-12 -translate-x-1/2 hidden lg:block">
                      <img
                        src="/Group-8-e1769572982358.png"
                        alt="Pizza"
                        width={120}
                        height={120}
                      />
                    </div>
                  )}
      
                  {/* 🥤 Pepsi on Third Card */}
                  {index === 2 && (
                    <div className="absolute -top-50 left-1/2 translate-x-1/2 hidden lg:block">
                      <img
                        src="/Group-10.png"
                        alt="Pepsi"
                        width={120}
                        height={120}
                      />
                    </div>
                  )}
      

        {/* PRODUCT IMAGE */}
        <div className="relative h-56 w-full mb-8">
          <img
            src={`http://localhost:5000/uploads/${item.image}`}
            alt={item.name}
            className="object-contain h-full w-full"
          />
        </div>

        {/* INFO BOX */}
        <div className="bg-[#f3e5d8] rounded-lg p-6 text-left shadow-md">

          <h3 className="text-lg font-extrabold text-[#5a0d0d] uppercase">
            {item.name}
          </h3>

          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between mt-5">

            <span className="bg-[var(--primary)] text-white px-4 py-2 rounded-md font-bold">
              PKR {item.price.toLocaleString()}
            </span>

            <div className="flex gap-4 text-sm font-bold uppercase">
              <button
                onClick={() => editProduct(item)}
                className="text-[var(--primary)] hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(item._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>

          </div>
        </div>

      </motion.div>
    ))}
  </div>
</section>
      </div>
    </div></>
  );
}