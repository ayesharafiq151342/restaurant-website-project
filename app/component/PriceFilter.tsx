"use client";

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
  onApply: () => void;
};

export default function PriceFilter({
  min,
  max,
  value,
  onChange,
  onApply,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-md shadow space-y-5">
      <h3 className="text-xl font-semibold">Filter by price</h3>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#d4a74d]"
      />

      <div className="flex justify-between text-sm text-gray-700">
        <span>Rs {min}</span>
        <span>Rs {value}</span>
      </div>

      <button
        onClick={onApply}
        className="bg-[var(--golden)] px-6 py-2 text-sm font-semibold text-white"
      >
        APPLY
      </button>
    </div>
  );
}
