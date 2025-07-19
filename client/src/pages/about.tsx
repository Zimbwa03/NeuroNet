import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Award, Globe, Zap } from "lucide-react";

export default function About() {
  const stats = [
    { value: "50+", label: "Businesses Transformed", icon: Users },
    { value: "95%", label: "Client Satisfaction", icon: Award },
    { value: "24/7", label: "Support Available", icon: Globe },
    { value: "3x", label: "Average Efficiency Gain", icon: Zap }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We stay at the forefront of AI technology to bring you the most advanced solutions",
      icon: "🚀"
    },
    {
      title: "Industry Expertise",
      description: "Deep understanding of diverse business landscapes and market needs",
      icon: "🏢"
    },
    {
      title: "Results Driven",
      description: "Every solution is designed to deliver measurable business value and ROI",
      icon: "📈"
    },
    {
      title: "Partnership Approach",
      description: "We work alongside you as partners in your digital transformation journey",
      icon: "🤝"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-bold mb-6">
                About <span className="text-electric-blue">NeuroNet</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                We are a leading AI solutions provider, dedicated to empowering small and medium enterprises 
                with cutting-edge artificial intelligence and automation technologies.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Our team of AI specialists combines deep technical expertise with industry knowledge to deliver 
                solutions that drive real business value. We believe that AI should be 
                accessible to every business, regardless of size or industry.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-electric-blue hover:bg-blue-400 text-black font-semibold">
                  Work With Us
                </Button>
              </Link>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&h=780"
                alt="Professional team of Zimbabwe business experts"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="bg-black border-electric-blue/30 text-center">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-electric-blue mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-electric-blue mb-2">{stat.value}</h3>
                    <p className="text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <Card className="bg-neutral-900 border-electric-blue/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-400 mb-6">
                  To democratize artificial intelligence for SMEs by providing accessible, 
                  affordable, and effective AI solutions that drive business growth and operational excellence.
                </p>
                <p className="text-gray-400">
                  We believe every business deserves the competitive advantage that comes with intelligent automation 
                  and data-driven decision making.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border-electric-blue/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-gray-400 mb-6">
                  To be a global leader in AI adoption by empowering businesses 
                  with world-class artificial intelligence capabilities.
                </p>
                <p className="text-gray-400">
                  We envision a future where AI-powered SMEs compete globally and contribute 
                  to economic development worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="bg-black border-electric-blue/30 hover:border-electric-blue transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-400">Meet the experts driving AI innovation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Chief Technology Officer",
                bio: "PhD in Machine Learning from MIT. 10+ years in AI research and implementation.",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&h=687"
              },
              {
                name: "Michael Johnson",
                role: "CEO & Founder",
                bio: "Former McKinsey consultant with expertise in business transformation and AI strategy.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&h=1170"
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Client Success",
                bio: "15+ years in customer relations and business development across multiple industries.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&h=1170"
              }
            ].map((person) => (
              <Card key={person.name} className="bg-neutral-900 border-electric-blue/30 hover:border-electric-blue transition-colors">
                <CardContent className="p-8 text-center">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
                  <p className="text-electric-blue mb-4">{person.role}</p>
                  <p className="text-gray-400 text-sm">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-neutral-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Join Our <span className="text-electric-blue">Success Stories?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Let's discuss how we can help transform your business with AI
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-electric-blue hover:bg-blue-400 text-black font-semibold py-4 px-8 text-xl btn-glow">
              Start Your Transformation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
