// app/component/LeafletMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix default marker icons
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

type Props = { lat: number; lng: number; riderName?: string };

export default function LeafletMap({ lat, lng, riderName }: Props) {
  return (
    <MapContainer center={[lat, lng]} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      <Marker position={[lat, lng]}>
        {riderName && <Popup>{riderName}</Popup>}
      </Marker>
    </MapContainer>
  );
}
