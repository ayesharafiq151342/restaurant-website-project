import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Alex Morgan",
    role: "Customer",
    image: "/users/user1.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ligula vel nisi tempor hendrerit. Suspendisse potenti.",
  },
  {
    name: "Sarah Williams",
    role: "Customer",
    image: "/users/user2.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ligula vel nisi tempor hendrerit. Suspendisse potenti.",
  },
  {
    name: "Daniel Cruz",
    role: "Customer",
    image: "/users/user3.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ligula vel nisi tempor hendrerit. Suspendisse potenti.",
  },
  {
    name: "Kevin Hart",
    role: "Customer",
    image: "/users/user4.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ligula vel nisi tempor hendrerit. Suspendisse potenti.",
  },
  {
    name: "Sophia First",
    role: "Customer",
    image: "/users/user5.jpg",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non ligula vel nisi tempor hendrerit. Suspendisse potenti.",
  },
];

const Stars = () => (
  <div className="flex gap-1 text-yellow-400 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>★</span>
    ))}
  </div>
);

const Card = ({ t }: { t: Testimonial }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between h-full">
    <div>
      <Stars />
      <p className="text-sm font-semibold text-gray-800 leading-relaxed uppercase">
        {t.text}
      </p>
    </div>

    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center gap-3">
        <Image
          src={t.image}
          alt={t.name}
          width={45}
          height={45}
          className="rounded-full"
        />
        <div>
          <p className="font-bold text-gray-900 text-sm uppercase">
            {t.name}
          </p>
          <p className="text-xs text-orange-500 font-semibold uppercase">
            {t.role}
          </p>
        </div>
      </div>

      <span className="text-orange-400 text-3xl font-bold">“</span>
    </div>
  </div>
);

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm tracking-widest text-gray-500 uppercase">
            Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-900 uppercase leading-tight">
            What People Say About <br /> Our Street Food
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 auto-rows-fr">
          {/* First row */}
          {testimonials.slice(0, 3).map((t, i) => (
            <Card key={i} t={t} />
          ))}

          {/* Second row */}
          <Card t={testimonials[3]} />

          {/* Center Image */}
          <div className="rounded-xl overflow-hidden h-full">
            <Image
              src="/food-truck.jpg"
              alt="food truck"
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <Card t={testimonials[4]} />
        </div>
      </div>
    </section>
  );
}