import { Link } from "wouter";
import BrainLogo from "@/components/ui/brain-logo";
import NeuralBackground from "@/components/ui/neural-background";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <NeuralBackground />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Hero brain logo */}
        <div className="mb-8 animate-float">
          <BrainLogo className="w-32 h-32 mx-auto" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow">
          Empowering SMEs<br />
          <span className="text-electric-blue">with Intelligent AI</span><br />
          & Automation
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Transform your business with cutting-edge artificial intelligence solutions
          designed for modern enterprises
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-electric-blue hover:bg-blue-400 text-black font-semibold py-4 px-8 transition-all duration-300 hover:scale-105 btn-glow"
            >
              Get Free Consultation
            </Button>
          </Link>
          <Link href="/services">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black font-semibold py-4 px-8 transition-all duration-300"
            >
              View Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
