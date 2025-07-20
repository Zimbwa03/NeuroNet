import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  const consultationPackages = [
    {
      name: "AI Strategy Session",
      description: "Perfect for businesses exploring AI opportunities",
      price: { monthly: 299, annual: 2990 },
      features: [
        "2-hour consultation call",
        "AI readiness assessment",
        "Custom recommendations report",
        "Implementation roadmap",
        "30-day email support"
      ],
      popular: false,
      icon: Star,
      cta: "Book Consultation"
    },
    {
      name: "AI Implementation Plan",
      description: "Comprehensive planning for AI integration",
      price: { monthly: 999, annual: 9990 },
      features: [
        "Full business analysis",
        "Detailed technical specifications",
        "ROI projections and timeline",
        "Technology stack recommendations",
        "3-month email support",
        "Follow-up strategy session"
      ],
      popular: true,
      icon: Zap,
      cta: "Get Started"
    },
    {
      name: "Enterprise AI Consulting",
      description: "End-to-end AI transformation program",
      price: { monthly: 2999, annual: 29990 },
      features: [
        "Complete AI transformation strategy",
        "Multi-department integration plan",
        "Custom solution architecture",
        "Team training and change management",
        "6-month ongoing support",
        "Quarterly performance reviews",
        "Priority technical support"
      ],
      popular: false,
      icon: Crown,
      cta: "Contact Sales"
    }
  ];

  const automationServices = [
    {
      name: "Basic Automation",
      description: "Simple process automation for small teams",
      price: { monthly: 1999, annual: 19990 },
      features: [
        "Up to 3 automated workflows",
        "Basic chatbot implementation",
        "Email and document automation",
        "Standard integrations",
        "Setup and basic training",
        "3-month support"
      ]
    },
    {
      name: "Advanced Automation",
      description: "Comprehensive automation for growing businesses",
      price: { monthly: 4999, annual: 49990 },
      features: [
        "Up to 10 automated workflows",
        "Advanced AI chatbot with NLP",
        "Custom dashboard and analytics",
        "Advanced integrations (CRM, ERP)",
        "Team training and documentation",
        "6-month support and optimization"
      ]
    },
    {
      name: "Enterprise Automation",
      description: "Full-scale automation for large organizations",
      price: { monthly: 9999, annual: 99990 },
      features: [
        "Unlimited automated workflows",
        "Custom AI solutions development",
        "Advanced analytics and reporting",
        "Enterprise-grade security",
        "Dedicated project manager",
        "12-month support and maintenance",
        "Regular performance optimization"
      ]
    }
  ];

  const addOns = [
    { name: "Additional Training Session", price: 499 },
    { name: "Custom Dashboard Development", price: 1999 },
    { name: "Advanced Analytics Setup", price: 2999 },
    { name: "Priority Support (24/7)", price: 999 },
    { name: "Additional Integration", price: 799 }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6">
            Transparent <span className="text-electric-blue">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose the perfect plan for your AI transformation journey
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-16 h-8 bg-gray-600 rounded-full transition-colors focus:outline-none"
            >
              <div className={`absolute w-6 h-6 bg-electric-blue rounded-full top-1 transition-transform ${
                billingPeriod === 'annual' ? 'translate-x-9' : 'translate-x-1'
              }`} />
            </button>
            <span className={`ml-3 ${billingPeriod === 'annual' ? 'text-white' : 'text-gray-400'}`}>
              Annual
            </span>
            {billingPeriod === 'annual' && (
              <Badge className="ml-3 bg-electric-blue text-black">Save 10%</Badge>
            )}
          </div>
        </div>
      </section>

      {/* AI Consultation Packages */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">AI Consultation Packages</h2>
            <p className="text-xl text-gray-400">Strategic guidance for your AI journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {consultationPackages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <Card key={index} className={`relative bg-black border-2 ${
                  pkg.popular ? 'border-electric-blue shadow-electric-blue/20 shadow-2xl' : 'border-electric-blue/30'
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-electric-blue text-black px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold">{pkg.name}</h3>
                    <p className="text-gray-400">{pkg.description}</p>
                    <div className="mt-4">
                      <span className="text-5xl font-bold">${pkg.price[billingPeriod]}</span>
                      <span className="text-gray-400 ml-2">{billingPeriod === 'monthly' ? 'one-time' : 'annual'}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="w-5 h-5 text-electric-blue mr-3 flex-shrink-0" />
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                    
                    <Button 
                      className={`w-full mt-6 ${
                        pkg.popular 
                          ? 'bg-electric-blue hover:bg-blue-400 text-black' 
                          : 'bg-transparent border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black'
                      }`}
                    >
                      {pkg.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automation Services */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Automation Services</h2>
            <p className="text-xl text-gray-400">Complete implementation and development</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {automationServices.map((service, index) => (
              <Card key={index} className="bg-neutral-900 border-electric-blue/30">
                <CardHeader className="text-center pb-6">
                  <h3 className="text-2xl font-bold">{service.name}</h3>
                  <p className="text-gray-400">{service.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${service.price[billingPeriod].toLocaleString()}</span>
                    <span className="text-gray-400 ml-2">project</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-electric-blue mr-3 flex-shrink-0" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-6 bg-transparent border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Optional Add-ons</h2>
            <p className="text-xl text-gray-400">Enhance your package with additional services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-black border-electric-blue/30">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{addon.name}</h4>
                  </div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-4">${addon.price}</span>
                    <Button size="sm" variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black">
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Pricing FAQ</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Do you offer custom pricing for large enterprises?",
                answer: "Yes, we provide custom pricing for enterprises with unique requirements. Contact our sales team for a personalized quote."
              },
              {
                question: "Are there any setup fees?",
                answer: "No hidden fees. All setup and configuration costs are included in the package price."
              },
              {
                question: "What happens after the support period ends?",
                answer: "You can extend support through our maintenance packages or opt for on-demand support as needed."
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Absolutely! You can upgrade to a higher tier at any time. We'll credit your current package value."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-neutral-900 border-electric-blue/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-electric-blue">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-electric-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-800">
            Schedule a free consultation to discuss your needs and find the perfect package.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg">
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}