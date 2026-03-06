"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SidebarAdmin from "../component/sidebar";
import ProductGrid from "./ProductGrid";
import CustomDropdown from "./CustomDropdown";

type CategoryType = "all" | "signature" | "snacks" | "drinks";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) {
      Toast.fire({ icon: "error", title: "All fields are required" });
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
        await axios.put(`http://localhost:5000/api/products/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({ icon: "success", title: "Updated Successfully 🎉", confirmButtonColor: "var(--primary)" });
      } else {
        await axios.post("http://localhost:5000/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({ icon: "success", title: "Added Successfully 🎉", confirmButtonColor: "var(--primary)" });
      }
      resetForm();
      fetchProducts();
    } catch {
      Swal.fire({ icon: "error", title: "Something went wrong ❌", confirmButtonColor: "var(--primary)" });
    }
  };

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
      text: "Product will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes Delete",
    });
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      Toast.fire({ icon: "success", title: "Product deleted" });
      fetchProducts();
    }
  };

  const resetForm = () => {
    setName(""); setPrice(""); setCategory("signature"); setDescription("");
    setImage(null); setPreview(null); setEditId(null);
  };

  const visibleProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter, products]);

  return (
    <div className="flex min-h-screen bg-[var(--skin)]">
      <SidebarAdmin />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* FORM */}
        <div className="mb-12 max-w-md mx-auto p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-4">{editId ? "Edit Product" : "Add Product"}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]" />
            <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]" />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)]" />
            <CustomDropdown />
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[var(--primary)] rounded-xl cursor-pointer bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition">
              <span className="text-3xl">📷</span>
              <p className="text-sm font-semibold">Upload product image</p>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e.target.files?.[0] || null)} />
            </label>
            {preview && <img src={preview} className="h-40 object-contain rounded-lg border" />}
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-[var(--primary)] text-white py-3 rounded-lg font-bold hover:opacity-90 transition">{editId ? "Update Product" : "Add Product"}</button>
              {editId && <button type="button" onClick={resetForm} className="flex-1 bg-gray-400 text-white py-3 rounded-lg font-bold">Cancel</button>}
            </div>
          </form>
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-4 mb-10 mt-4">
          {["all", "signature", "snacks", "drinks"].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat as CategoryType)} className={`px-6 py-2 rounded-full font-semibold transition ${filter === cat ? "bg-[var(--primary)] text-white" : "bg-gray-200"}`}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        <ProductGrid products={visibleProducts} isAdmin={true} onEdit={editProduct} onDelete={deleteProduct} />
      </div>
    </div>
  );
}
