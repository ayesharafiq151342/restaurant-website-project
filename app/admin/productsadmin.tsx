"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import SidebarAdmin from "../component/sidebar";
import CustomDropdown from "./CustomDropdown";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

type CategoryType = "all" | "signature" | "snacks" | "drinks";

export default function products() {

  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<CategoryType>("signature");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [filter, setFilter] = useState<CategoryType>("all");

  // Fetch Products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Image Preview
  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  // Add / Update
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
          confirmButtonColor: "var(--primary)",
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
          confirmButtonColor: "var(--primary)",
        });

      }

      resetForm();
      fetchProducts();

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Something went wrong ❌",
        confirmButtonColor: "var(--primary)",
      });

    }
  };

  // Edit
  const editProduct = (product: Product) => {
    setEditId(product._id);
    setName(product.name);
    setPrice(product.price.toString());
    setCategory(product.category as CategoryType);
    setDescription(product.description);
    setPreview(`http://localhost:5000/uploads/${product.image}`);
  };

  // Delete
  const deleteProduct = async (id: string) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Product will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes Delete",
    });

    if (result.isConfirmed) {

      await axios.delete(`http://localhost:5000/api/products/${id}`);

      Toast.fire({
        icon: "success",
        title: "Product deleted",
      });

      fetchProducts();
    }
  };

  // Reset
  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("signature");
    setDescription("");
    setImage(null);
    setPreview(null);
    setEditId(null);
  };

  // Filter
  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <div className="flex min-h-screen bg-[var(--skin)]">

      <SidebarAdmin />

      <div className="flex-1 p-6 overflow-y-auto">

        {/* FORM SECTION */}

        <div className="relative w-full min-h-screen flex items-center justify-center">

          {/* VIDEO */}

          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/White and Orange Modern Cooking Vlog Video.mp4" />
          </video>

          {/* OVERLAY */}

          <div className="absolute w-full h-full bg-black/40"></div>

          {/* FORM */}

          <div className="relative z-10 max-w-md w-full p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl">

            <h2 className="text-2xl font-bold text-center mb-4">
              {editId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* NAME */}

              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
              />

              {/* PRICE */}

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]"
              />

              {/* CATEGORY */}

      


       <CustomDropdown/>       {/* IMAGE */}

              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[var(--primary)] rounded-xl cursor-pointer bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition">

                <span className="text-3xl">📷</span>

                <p className="text-sm font-semibold">
                  Upload product image
                </p>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0] || null)
                  }
                />

              </label>

              {preview && (

                <img
                  src={preview}
                  className="h-40 object-contain rounded-lg border"
                />

              )}

              {/* BUTTONS */}

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 bg-[var(--primary)] text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                  {editId ? "Update Product" : "Add Product"}
                </button>

                {editId && (

                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold"
                  >
                    Cancel
                  </button>

                )}

              </div>

            </form>

          </div>

        </div>

        {/* FILTER */}

        <div className="flex justify-center gap-4 mb-10 mt-20">

          {["all", "signature", "snacks", "drinks"].map((cat) => (

            <button
              key={cat}
              onClick={() => setFilter(cat as CategoryType)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === cat
                  ? "bg-[var(--primary)] text-white"
                  : "bg-gray-200"
              }`}
            >
              {cat.toUpperCase()}
            </button>

          ))}

        </div>

        {/* PRODUCTS */}

        <section className="py-16 px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-extrabold text-[var(--primary)] uppercase">
              Manage Products
            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">

            {visibleProducts.map((item, index) => (

              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[var(--accent)] rounded-xl p-6 text-center shadow-lg"
              >

                <div className="h-56 mb-6">

                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    className="object-contain h-full w-full"
                  />

                </div>

                <div className="bg-[#f3e5d8] rounded-lg p-6 text-left">

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between mt-5">

                    <span className="bg-[var(--primary)] text-white px-4 py-2 rounded-md">
                      PKR {item.price}
                    </span>

                    <div className="flex gap-4 text-sm font-bold">

                      <button
                        onClick={() => editProduct(item)}
                        className="text-[var(--primary)]"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="text-red-600"
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
    </div>
  );
}
