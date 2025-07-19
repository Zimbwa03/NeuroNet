import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechFlow Solutions",
      role: "CEO",
      content: "NeuroNet's AI solutions increased our productivity by 300%. Their team understood our challenges and delivered exactly what we needed.",
      initials: "SC",
    },
    {
      name: "Michael Rodriguez",
      company: "GlobalTrade Ltd",
      role: "Operations Manager",
      content: "The automation they implemented saved us 20 hours per week. Our team can now focus on strategic growth instead of manual tasks.",
      initials: "MR",
    },
    {
      name: "Emily Watson",
      company: "Retail Innovations Group",
      role: "Director",
      content: "Professional, knowledgeable, and results-driven. NeuroNet transformed our customer service with intelligent chatbots.",
      initials: "EW",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            What Our <span className="text-electric-blue">Clients</span> Say
          </h2>
          <p className="text-xl text-gray-400">Success stories from businesses we've transformed</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="bg-neutral-900 border-electric-blue/30 hover:border-electric-blue transition-colors"
            >
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-electric-blue fill-electric-blue" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-black">{testimonial.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
