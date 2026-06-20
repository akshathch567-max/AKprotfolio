import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWork from "@/components/SelectedWork";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <div className="noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <SelectedWork />
        <AboutMe />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
