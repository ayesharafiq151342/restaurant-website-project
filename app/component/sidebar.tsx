"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icons, or use any

interface SidebarProps {
  categories: string[];
  onCategorySelect: (category: string | null) => void;
  selectedCategory?: string | null;
}

export default function Sidebar({ categories, onCategorySelect, selectedCategory }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--golden)] text-white rounded"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          Filters
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 p-4 bg-white shadow rounded-lg space-y-6
          ${isOpen ? "block" : "hidden"} md:block
        `}
      >
        <div>
          <h2 className="text-sm font-medium mb-2">Categories</h2>
          <ul className="space-y-2">
            <li
              onClick={() => onCategorySelect(null)}
              className={`cursor-pointer text-sm ${
                selectedCategory === null ? "font-semibold text-[var(--golden)]" : "text-gray-600"
              }`}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`cursor-pointer text-sm xl:text-xl montserrat ${
                  selectedCategory === cat
                    ? "font-montserrat text-[var(--text_skin)]"
                    : "text-[var(--text_skin)] font-bold"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
