"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Map from "../../component/Map";

type RiderLocation = { lat: number; lng: number };
type Rider = { name: string };
type Order = { status: string; riderLocation?: RiderLocation; riderId?: Rider };

export default function TrackPage() {
  const params = useParams();
  const id = params.id; // order ID from URL

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/orders/track/${id}`);
        const data: Order = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    fetchOrder();

    const interval = setInterval(fetchOrder, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Track Order 🚚</h1>

      <div className="mb-4">
        <span className="font-semibold">Order Status:</span>{" "}
        <span className={`${
          order?.status === "Ready"
            ? "text-green-600"
            : order?.status === "On The Way"
            ? "text-blue-600"
            : "text-gray-600"
        }`}>
          {order?.status || "Waiting for rider..."}
        </span>
      </div>

      {order?.riderLocation ? (
        <div className="h-80 w-full rounded overflow-hidden shadow">
          <Map
            lat={order.riderLocation.lat}
            lng={order.riderLocation.lng}
            riderName={order.riderId?.name || "Rider"}
          />
        </div>
      ) : (
        <p className="text-gray-500">Waiting for rider to start delivery...</p>
      )}
    </div>
  );
}
