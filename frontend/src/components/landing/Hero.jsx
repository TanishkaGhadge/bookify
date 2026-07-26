import PlantDecoration from "./PlantDecoration";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#F7F2EC] px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-6xl font-bold text-[#5C4033] leading-tight">
            Turn Your Books
            <br />
            Into Beautiful
            <br />
            Audiobooks
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Upload any PDF and let Bookify create a natural sounding
            audiobook in minutes.
          </p>

          <button className="mt-8 bg-[#5C4033] text-white px-8 py-4 rounded-full hover:bg-[#4b3428] transition">
            Get Started
          </button>
        </div>

        <PlantDecoration />
      </div>
    </section>
  );
}