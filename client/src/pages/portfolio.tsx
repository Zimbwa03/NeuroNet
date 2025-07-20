import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Users, TrendingUp, Zap, Brain, Bot } from "lucide-react";

export default function Portfolio() {
  const caseStudies = [
    {
      title: "E-Commerce Sales Optimization",
      client: "Online Retail Company",
      industry: "Retail",
      challenge: "Low conversion rates and inefficient inventory management",
      solution: "Implemented AI-powered recommendation engine and predictive analytics",
      results: [
        "45% increase in conversion rates",
        "30% reduction in inventory costs", 
        "25% boost in customer satisfaction"
      ],
      technologies: ["Machine Learning", "Predictive Analytics", "Recommendation Systems"],
      duration: "3 months",
      icon: TrendingUp
    },
    {
      title: "Customer Service Automation",
      client: "Financial Services Firm",
      industry: "Finance",
      challenge: "High volume of repetitive customer inquiries overwhelming support team",
      solution: "Developed intelligent chatbot with natural language processing",
      results: [
        "70% reduction in response time",
        "60% decrease in support tickets",
        "90% customer satisfaction rate"
      ],
      technologies: ["Natural Language Processing", "Chatbot Development", "Process Automation"],
      duration: "2 months",
      icon: Bot
    },
    {
      title: "Manufacturing Quality Control",
      client: "Industrial Manufacturing Company",
      industry: "Manufacturing",
      challenge: "Manual quality inspection causing delays and inconsistent results",
      solution: "Computer vision system for automated defect detection",
      results: [
        "95% accuracy in defect detection",
        "50% faster inspection process",
        "80% reduction in manual errors"
      ],
      technologies: ["Computer Vision", "Deep Learning", "IoT Integration"],
      duration: "4 months",
      icon: Zap
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Solutions",
      company: "Technology Startup",
      feedback: "NeuroNet transformed our customer support with their AI chatbot. Response times improved dramatically and our team can now focus on complex issues.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Operations Director",
      company: "Global Manufacturing Corp",
      feedback: "The computer vision solution exceeded our expectations. Quality control is now faster and more accurate than ever before.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      position: "Head of Digital Strategy",
      company: "Retail Innovations Ltd",
      feedback: "Their recommendation engine boosted our sales significantly. The team's expertise in AI is truly impressive.",
      rating: 5
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6">
            Our <span className="text-electric-blue">Success Stories</span>
          </h1>
          <p className="text-xl text-gray-400">
            Real results from real businesses. See how we've transformed operations with AI.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Case Studies</h2>
            <p className="text-xl text-gray-400">Detailed look at our most impactful projects</p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <Card key={index} className="bg-black border-electric-blue/30 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Project Overview */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center mr-4">
                            <Icon className="w-6 h-6 text-black" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{study.title}</h3>
                            <p className="text-gray-400">{study.client} • {study.industry}</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-2 text-electric-blue">Challenge</h4>
                            <p className="text-gray-400">{study.challenge}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold mb-2 text-electric-blue">Solution</h4>
                            <p className="text-gray-400">{study.solution}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold mb-2 text-electric-blue">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {study.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="border-electric-blue text-electric-blue">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Results & Info */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-electric-blue">Results Achieved</h4>
                          <ul className="space-y-2">
                            {study.results.map((result, idx) => (
                              <li key={idx} className="flex items-center text-gray-400">
                                <div className="w-2 h-2 bg-electric-blue rounded-full mr-3"></div>
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-neutral-900 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Calendar className="w-4 h-4 text-electric-blue mr-2" />
                            <span className="text-sm font-semibold">Project Duration</span>
                          </div>
                          <p className="text-gray-400">{study.duration}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-400">Trusted by business leaders worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-neutral-900 border-electric-blue/30">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-electric-blue rounded-full mr-1"></div>
                    ))}
                  </div>
                  
                  <p className="text-gray-400 mb-6 italic">"{testimonial.feedback}"</p>
                  
                  <div className="border-t border-gray-700 pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                    <p className="text-sm text-electric-blue">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-electric-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 text-gray-800">
            Let's discuss how AI can transform your business operations and drive growth.
          </p>
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
          >
            Start Your AI Journey
          </Button>
        </div>
      </section>
    </div>
  );
}