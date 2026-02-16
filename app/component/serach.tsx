"use client";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchSection({ value, onChange }: Props) {
  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 text-sm outline-none"
      />
      <button className="bg-[#c9a14a] px-4 text-white font-bold">›</button>
    </>
  );
}
