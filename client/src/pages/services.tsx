import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Brain, Cog, Users, TrendingUp } from "lucide-react";

export default function Services() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6">
            Our <span className="text-electric-blue">AI Services</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Comprehensive artificial intelligence and automation solutions designed for modern enterprises
          </p>
        </div>
      </section>

      {/* AI Consultations */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-electric-blue">AI Consultations</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Strategic AI planning and implementation guidance tailored to your business needs. 
                Our experts work closely with you to identify opportunities and create actionable AI roadmaps.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Business Process Analysis</h3>
                    <p className="text-gray-400">Comprehensive evaluation of your current workflows to identify AI opportunities</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Strategy Development</h3>
                    <p className="text-gray-400">Custom AI roadmap aligned with your business goals and budget</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center">
                    <Cog className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Implementation Planning</h3>
                    <p className="text-gray-400">Detailed deployment plans with timelines and resource requirements</p>
                  </div>
                </div>
              </div>

              <Link href="/contact">
                <Button size="lg" className="bg-electric-blue hover:bg-blue-400 text-black font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1026&h=684"
                alt="Professional AI consulting business meeting"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Agentic Automations */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&h=717"
                alt="Advanced automation technology workspace setup"
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div>
              <h2 className="text-5xl font-bold mb-6">
                <span className="text-electric-blue">Agentic Automations</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Intelligent automation solutions that work autonomously to streamline your operations. 
                Deploy AI agents that learn and adapt to your business environment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  "Customer Service Chatbots",
                  "Workflow Automation Agents",
                  "Data Analysis & Reporting Bots",
                  "Virtual Assistants & Schedulers",
                  "Intelligent Document Processing",
                  "Predictive Maintenance Systems"
                ].map((automation) => (
                  <div key={automation} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-electric-blue" />
                    <span className="text-gray-300">{automation}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <Button size="lg" className="bg-electric-blue hover:bg-blue-400 text-black font-semibold">
                  Explore Automations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Service Packages</h2>
            <p className="text-xl text-gray-400">Choose the perfect AI solution for your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Package */}
            <Card className="bg-black border-electric-blue/30 hover:border-electric-blue transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">AI Starter</h3>
                <p className="text-gray-400 mb-6">Perfect for small businesses looking to explore AI</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Initial AI Assessment",
                    "Basic Strategy Development",
                    "1 Simple Automation",
                    "30 Days Support"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-electric-blue mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="w-full bg-electric-blue hover:bg-blue-400 text-black">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional Package */}
            <Card className="bg-black border-electric-blue hover:border-electric-blue transition-colors scale-105 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-electric-blue text-black px-4 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </span>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">AI Professional</h3>
                <p className="text-gray-400 mb-6">Comprehensive AI transformation for growing SMEs</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Complete AI Consultation",
                    "Custom Strategy & Roadmap",
                    "3 Advanced Automations",
                    "90 Days Support",
                    "Training & Documentation"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-electric-blue mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="w-full bg-electric-blue hover:bg-blue-400 text-black">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Package */}
            <Card className="bg-black border-electric-blue/30 hover:border-electric-blue transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">AI Enterprise</h3>
                <p className="text-gray-400 mb-6">Full-scale AI implementation for established businesses</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Enterprise AI Assessment",
                    "Multi-department Strategy",
                    "Unlimited Automations",
                    "1 Year Support",
                    "Dedicated AI Specialist"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-electric-blue mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="w-full bg-electric-blue hover:bg-blue-400 text-black">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
