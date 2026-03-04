"use client";
import { useEffect,useState } from "react";
import api from "@/utils/api";

export default function UserDashboard(){
  const [products,setProducts]=useState<any[]>([]);
  useEffect(()=>{ api.get("/products").then(res=>setProducts(res.data)); },[]);

  return(
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(p=>(
          <div key={p._id} className="border p-4 rounded">
            <h3 className="font-bold">{p.name}</h3>
            <p>PKR {p.price}</p>
            <p>Category: {p.category}</p>
            <img src={p.image} className="h-40 w-full object-contain"/>
          </div>
        ))}
      </div>
    </div>
  );
}