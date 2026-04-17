"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Where can I find your food truck today?",
    answer: "We update our location daily on social media and website.",
  },
  {
    question: "Do you offer catering for private events?",
    answer:
      "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  },
  {
    question: "How far in advance should I book for an event?",
    answer: "We recommend booking at least 2-3 weeks in advance.",
  },
  {
    question: "Do you have vegetarian or halal-friendly options?",
    answer: "Yes, we offer both vegetarian and halal options.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, card, and online payments.",
  },
  {
    question: "Can I customize the menu for my event?",
    answer: "Yes, menu customization is available for events.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(1);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className=" py-16 px-6 mt-20  ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm uppercase text-gray-500 mb-2">FAQs</p>

          <h2 className="text-4xl font-extrabold text-[var(--accent)] leading-tight mb-4">
            Frequently <br /> Asked Questions
          </h2>

          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <button className="bg-[var(--primary)] text-white px-6 py-2 rounded-full font-semibold">
            Learn More
          </button>

          <div className="mt-6">
            <img
              src="/taco.png"
              alt="taco"
              className="w-64 md:ml-72"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index}>
              
              {/* QUESTION */}
              <button
                onClick={() => toggle(index)}
                className={`w-full text-left px-5 py-3 rounded-md font-semibold flex justify-between items-center transition
                  ${
                    active === index
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--accent)] text-white"
                  }`}
              >
                {faq.question}
                <span>{active === index ? "↑" : "↓"}</span>
              </button>

              {/* ANSWER WITH LEFT → RIGHT ANIMATION */}
              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white px-5 py-3 text-gray-600 border-l-4 border-[var(--accent)]"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}