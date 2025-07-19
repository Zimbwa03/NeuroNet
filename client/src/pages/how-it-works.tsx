import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, Target, Rocket, BarChart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Discovery & Analysis",
      icon: Search,
      description: "We begin by conducting a comprehensive analysis of your current business processes, identifying bottlenecks, inefficiencies, and opportunities for AI enhancement.",
      details: [
        "Business process mapping",
        "Stakeholder interviews",
        "Technology assessment",
        "Data audit and quality check",
        "Competitive analysis"
      ]
    },
    {
      step: 2,
      title: "Strategy Development",
      icon: Target,
      description: "Based on our findings, we develop a custom AI strategy that aligns with your business goals, budget constraints, and timeline requirements.",
      details: [
        "AI opportunity identification",
        "ROI projections and business case",
        "Technology selection and architecture",
        "Implementation roadmap",
        "Risk assessment and mitigation"
      ]
    },
    {
      step: 3,
      title: "Implementation & Deployment",
      icon: Rocket,
      description: "Our team executes the implementation plan with minimal disruption to your business operations, ensuring smooth integration with existing systems.",
      details: [
        "System development and configuration",
        "Data integration and migration",
        "Testing and quality assurance",
        "Staff training and change management",
        "Phased rollout and monitoring"
      ]
    },
    {
      step: 4,
      title: "Optimization & Support",
      icon: BarChart,
      description: "We continuously monitor performance, optimize AI solutions, and provide ongoing support to ensure maximum ROI and business value.",
      details: [
        "Performance monitoring and analytics",
        "Continuous improvement and optimization",
        "User feedback integration",
        "System updates and maintenance",
        "Strategic reviews and planning"
      ]
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6">
            How We <span className="text-electric-blue">Transform</span> Your Business
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Our proven 4-step methodology ensures successful AI implementation with measurable results and lasting impact
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.step} className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}>
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mr-4">
                        <Icon className="w-8 h-8 text-black" />
                      </div>
                      <div>
                        <span className="text-electric-blue text-lg font-semibold">Step {step.step}</span>
                        <h3 className="text-3xl font-bold">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-xl text-gray-400 mb-8">{step.description}</p>
                    
                    <div className="space-y-3">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center text-gray-300">
                          <div className="w-2 h-2 bg-electric-blue rounded-full mr-3"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={isEven ? '' : 'lg:col-start-1'}>
                    <Card className="bg-black border-electric-blue/30 p-8">
                      <CardContent className="p-0">
                        <div className="w-full h-64 bg-gradient-to-br from-electric-blue/20 to-transparent rounded-lg flex items-center justify-center">
                          <Icon className="w-24 h-24 text-electric-blue opacity-60" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Technology Stack</h2>
            <p className="text-xl text-gray-400">We use cutting-edge AI platforms and tools to deliver world-class solutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "OpenAI GPT", category: "Large Language Models", description: "Advanced natural language processing" },
              { name: "Microsoft Azure AI", category: "Cloud Platform", description: "Enterprise-grade AI services" },
              { name: "Python & TensorFlow", category: "Development", description: "Custom AI model development" },
              { name: "Zapier & Make", category: "Automation", description: "No-code workflow automation" },
              { name: "LangChain", category: "AI Framework", description: "Building AI applications" },
              { name: "MongoDB", category: "Database", description: "Flexible data storage" },
              { name: "React & Node.js", category: "Web Development", description: "Modern web applications" },
              { name: "Docker & AWS", category: "Infrastructure", description: "Scalable deployment" }
            ].map((tech) => (
              <Card key={tech.name} className="bg-neutral-900 border-electric-blue/30 hover:border-electric-blue transition-colors">
                <CardContent className="p-6 text-center">
                  <h4 className="text-lg font-semibold mb-2">{tech.name}</h4>
                  <p className="text-electric-blue text-sm mb-3">{tech.category}</p>
                  <p className="text-gray-400 text-sm">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Project Timeline</h2>
            <p className="text-xl text-gray-400">Typical implementation timeline for our AI solutions</p>
          </div>

          <div className="space-y-8">
            {[
              { phase: "Week 1-2", title: "Discovery & Planning", duration: "2 weeks" },
              { phase: "Week 3-4", title: "Strategy Development", duration: "2 weeks" },
              { phase: "Week 5-8", title: "Development & Testing", duration: "4 weeks" },
              { phase: "Week 9-10", title: "Deployment & Training", duration: "2 weeks" },
              { phase: "Week 11+", title: "Optimization & Support", duration: "Ongoing" }
            ].map((item, index) => (
              <div key={item.phase} className="flex items-center">
                <div className="w-4 h-4 bg-electric-blue rounded-full mr-6"></div>
                <div className="flex-1 flex justify-between items-center py-4 border-b border-gray-700">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="text-gray-400">{item.phase}</p>
                  </div>
                  <span className="text-electric-blue font-semibold">{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="text-electric-blue">Get Started?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how our proven methodology can transform your business with AI
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-electric-blue hover:bg-blue-400 text-black font-semibold py-4 px-8 text-xl btn-glow">
              Schedule Your Discovery Call
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
