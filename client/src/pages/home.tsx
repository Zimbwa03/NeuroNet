import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Zap, TrendingUp, Users, CheckCircle, Star, Quote } from "lucide-react";
import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import Testimonials from "@/components/sections/testimonials";
import NewsletterSignup from "@/components/newsletter/newsletter-signup";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesOverview />

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              How We <span className="text-electric-blue">Transform</span> Your Business
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our proven methodology ensures successful AI implementation with measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery",
                description: "We analyze your current processes and identify automation opportunities",
              },
              {
                step: "2",
                title: "Strategy",
                description: "Custom AI strategy development aligned with your business goals",
              },
              {
                step: "3",
                title: "Implementation",
                description: "Seamless deployment of AI solutions with minimal business disruption",
              },
              {
                step: "4",
                title: "Optimization",
                description: "Continuous monitoring and improvement for maximum ROI",
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-20 h-20 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-black">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSignup variant="hero" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1965&h=1310"
            alt="Abstract neural network and AI visualization with interconnected nodes"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="text-electric-blue">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Join the AI revolution and stay ahead of the competition with our cutting-edge solutions
          </p>
          <Link href="/contact">
            <Button 
              size="lg" 
              className="bg-electric-blue hover:bg-blue-400 text-black font-semibold py-4 px-8 text-xl transition-all duration-300 hover:scale-105 btn-glow"
            >
              Start Your AI Journey Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}