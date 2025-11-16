import Image from "next/image";
import Features from "./components/homepage/Features";
import RecipeHighlights from "./components/homepage/RecipeHighlights";
import RecipeFAQs from "./components/homepage/RecipeFaqs";
import CTASection from "./components/homepage/CTASection";
import Navbar from "./components/common/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 bg-[url('/Background.png')] opacity-50 pointer-events-none"></div>

      <section className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        <div className="max-w-xl space-y-6">
          <span className="px-4 py-1 rounded-full bg-gray-800 border border-gray-700 text-sm text-gray-300">
            Built by Food Lovers
          </span>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            World’s Most Powerful Recipessss in.
            <br /> One App.
          </h1>

          <p className="text-gray-400 text-lg">
            Stop juggling cookbooks and random blogs – Recipe Fiesta gives you
            access to the best curated recipes for just{" "}
            <span className="text-white">$12/month</span>. That’s less than
            dinner at a restaurant.
          </p>

          <button className="px-8 py-4 bg-gradient-to-r from-green-400 to-teal-500 text-black rounded-full font-bold shadow-lg hover:scale-105 transition relative">
            Get Started Now →
          </button>

          <p className="text-sm text-gray-400">
            Discover smarter, tastier meals today
          </p>
        </div>

        <div className="relative mt-12 md:mt-0">
          <div className="md:w-[600px] md:h-[400px] w-[300px] h-full rounded-2xl border border-gray-800 shadow-lg overflow-hidden object-cover">
            <Image
              src="/Carousel2.jpg"
              alt="Recipe Preview"
              width={400}
              height={400}
              className="object-cover w-full"
            />
          </div>
          <div className="absolute inset-0 rounded-2xl ring-1 ring-green-400/40 blur-2xl" />
        </div>
      </section>

      <Features />
      <RecipeHighlights />
      <RecipeFAQs />
      <CTASection />
    </div>
  );
}
