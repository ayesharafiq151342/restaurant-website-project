import Image from "next/image";

export default function OurStory() {
  return (
    <section className="  py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Story
          </h2>

          <p className="0 mb-4 leading-relaxed">
            Born from the everyday needs of university students, our canteen was created with one simple goal: to provide fresh, affordable, and delicious meals in a comfortable space where students can relax, recharge, and connect.
          </p>

          <p className=" mb-4 leading-relaxed">
            In a fast-paced academic environment, we understand how important it is to have quick yet quality food options. That’s why we focus on hygiene, taste, and speed — ensuring every meal is prepared with care and served on time.
          </p>

          <p className="leading-relaxed">
            More than just a canteen, we aim to create a friendly hub on campus — a place where friends gather, ideas are shared, and memories are made over great food. From snacks to full meals, every item is crafted to bring comfort and satisfaction.
          </p>
        </div>

        {/* RIGHT IMAGES */}
        <div className="space-y-4">
          <Image
            src="/about3.jpg" // replace with your image
            alt="Canteen"
            width={600}
            height={300}
            className="rounded-xl object-cover"
          />

          <Image
            src="/about4.jpg" // replace with your image
            alt="Canteen Seating"
            width={600}
            height={300}
            className="rounded-xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}