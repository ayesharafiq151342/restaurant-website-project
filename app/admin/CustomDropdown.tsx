import { useState, useRef, useEffect } from "react";

const categories = [
  { value: "signature", label: "🍔 Signature Special" },
  { value: "snacks", label: "🍟 Tasty Snacks" },
  { value: "drinks", label: "🥤 Cool Drinks" },
];

export default function CustomDropdown({ onChange }: { onChange?: (value: string) => void }) {
  const [selected, setSelected] = useState(categories[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cat: typeof categories[0]) => {
    setSelected(cat);
    setOpen(false);
    if (onChange) onChange(cat.value);
  };

  return (
    <div className="relative w-full max-w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 border rounded-xl bg-white shadow-md flex justify-between items-center focus:outline-none"
      >
        {selected.label}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute w-full mt-1 bg-white rounded-xl shadow-lg overflow-hidden z-10">
          {categories.map((cat) => (
            <div
              key={cat.value}
              onClick={() => handleSelect(cat)}
              className="p-3 cursor-pointer hover:bg-[var(--primary)] hover:text-white transition"
            >
              {cat.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
