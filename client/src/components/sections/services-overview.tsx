import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function ServicesOverview() {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            Our <span className="text-electric-blue">AI Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive artificial intelligence services designed to revolutionize your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Consultations */}
          <Card className="bg-black border-electric-blue/30 hover:border-electric-blue transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1026&h=684"
                  alt="Professional AI consulting business meeting"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-electric-blue transition-colors">
                AI Consultations
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                Strategic AI planning and implementation guidance tailored to your business needs.
                Our experts help you identify opportunities and create actionable AI roadmaps.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Business Process Analysis",
                  "AI Strategy Development",
                  "Implementation Planning",
                  "ROI Assessment",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-electric-blue mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <Button className="w-full bg-electric-blue hover:bg-blue-400 text-black font-semibold">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Agentic Automations */}
          <Card className="bg-black border-electric-blue/30 hover:border-electric-blue transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-8">
              <div className="mb-6">
                <img
                  src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&h=717"
                  alt="Advanced automation technology workspace setup"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-electric-blue transition-colors">
                Agentic Automations
              </h3>
              <p className="text-gray-400 mb-6 text-lg">
                Intelligent automation solutions that work autonomously to streamline your operations.
                Deploy AI agents that learn and adapt to your business environment.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Workflow Automation",
                  "Intelligent Decision Making",
                  "Adaptive Learning Systems",
                  "24/7 Autonomous Operation",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-electric-blue mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/services">
                <Button className="w-full bg-electric-blue hover:bg-blue-400 text-black font-semibold">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
