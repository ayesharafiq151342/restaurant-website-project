"use client";
import { useEffect, useState } from "react";

const reviews = [
  { name: "Ayesha Khan", comment: "Amazing quality!", rating: 5 },
  { name: "Sara Ahmed", comment: "Fast delivery & great support.", rating: 4 },
  { name: "Fatima Noor", comment: "Beautiful design.", rating: 5 },
  { name: "Hira Ali", comment: "Worth the price.", rating: 4 },
  { name: "Noor Fatima", comment: "Loved it so much!", rating: 5 },
  { name: "Zara Sheikh", comment: "Premium finishing.", rating: 4 },  { name: "Sara Ahmed", comment: "Fast delivery & great support.", rating: 4 },
  { name: "Fatima Noor", comment: "Beautiful design.", rating: 5 },
];

export default function ReviewCarousel() {
  const [start, setStart] = useState(0);
  const itemsPerSlide = 4;

  // Auto loop
  useEffect(() => {
    const interval = setInterval(() => {
      setStart((prev) =>
        prev + itemsPerSlide >= reviews.length ? 0 : prev + itemsPerSlide
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const visibleReviews = reviews.slice(start, start + itemsPerSlide);

  return (
    <section className="py-20 xl:w-6xl m-auto bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
         Our Customers Love Us!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleReviews.map((review, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`text-lg ${
                      idx < review.rating
                        ? "text-yellow-400 "
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-600 italic mb-4">
                “{review.comment}”
              </p>

              <h4 className="font-semibold text-gray-900">
                {review.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
