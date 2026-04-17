"use client";

export default function Hero() {
  return (
    <section className=" py-20 px-6 md:m-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl font-extrabold text-[var(--accent)]">
            Hi
            <span className="text-gray-800 font-semibold ml-2">
              Welcome to
            </span>
          </h1>

          <h2 className="text-5xl font-extrabold text-gray-800 mt-2">
            Sancho’s 🌶️
          </h2>

          <p className="mt-6 text-gray-700 font-medium">
            Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum
            Dolor Sit Amet
          </p>

          <p className="mt-4 text-gray-500 leading-relaxed">
            At vero eos et accusam et justo duo dolores et ea rebum stet clita
            kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit
            amet.
          </p>

          <div className="mt-8">
            <p className="text-sm tracking-widest text-gray-500">
              BRANDY S. BAKER, CHEF
            </p>
     <img
            src="/signater.png" // 👉 apni image yahan rakho (public folder)
            alt="signater.png"
            className="w-32 mt-4 max-w-md "
          />
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative flex justify-center">
          <img
            src="/chef.png" // 👉 apni image yahan rakho (public folder)
            alt="chef"
            className="w-full max-w-md md:h-[500px] "
          />
        </div>
      </div>
    </section>
  );
}
