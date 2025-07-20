import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Linkedin, Twitter, Facebook } from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      serviceInterest: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Global Operations"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+263 78 549 4594 / +263 78 258 3119"
    },
    {
      icon: Mail,
      title: "Email",
      content: "ngonidzashezimbwa95@gmail.com"
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM"
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6">
            Get in <span className="text-electric-blue">Touch</span>
          </h1>
          <p className="text-xl text-gray-400">
            Ready to discuss your AI transformation? Let's start the conversation.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="bg-black border-electric-blue/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-electric-blue">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      className="bg-electric-blue hover:bg-blue-400 text-black"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your first name"
                                  className="bg-neutral-900 border-gray-600 focus:border-electric-blue"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your last name"
                                  className="bg-neutral-900 border-gray-600 focus:border-electric-blue"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-neutral-900 border-gray-600 focus:border-electric-blue"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your company name"
                                className="bg-neutral-900 border-gray-600 focus:border-electric-blue"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="serviceInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-neutral-900 border-gray-600 focus:border-electric-blue">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ai-consultations">AI Consultations</SelectItem>
                                <SelectItem value="agentic-automations">Agentic Automations</SelectItem>
                                <SelectItem value="both-services">Both Services</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project or questions"
                                className="bg-neutral-900 border-gray-600 focus:border-electric-blue min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full bg-electric-blue hover:bg-blue-400 text-black font-semibold py-3"
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.title} className="flex items-start">
                        <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{info.title}</h4>
                          <p className="text-gray-400">{info.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Facebook, href: "#" },
                  ].map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.href}
                        href={social.href}
                        className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors"
                      >
                        <Icon className="w-6 h-6 text-black" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <Card className="bg-black border-electric-blue/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="text-gray-400 mb-4">
                    Have an urgent question? Contact us directly and we'll respond within 2 hours during business hours.
                  </p>
                  <Button className="bg-electric-blue hover:bg-blue-400 text-black font-semibold">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-400">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How long does an AI implementation typically take?",
                answer: "Most projects take 6-12 weeks from initial consultation to full deployment, depending on complexity."
              },
              {
                question: "What industries do you work with?",
                answer: "We work with businesses across all industries including retail, healthcare, finance, manufacturing, and professional services."
              },
              {
                question: "Do you provide training for our staff?",
                answer: "Yes, comprehensive training and documentation are included with all our implementations."
              },
              {
                question: "What ongoing support do you provide?",
                answer: "We offer various support packages including monitoring, updates, and optimization services."
              }
            ].map((faq) => (
              <Card key={faq.question} className="bg-neutral-900 border-electric-blue/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-electric-blue">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
