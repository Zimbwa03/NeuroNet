
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, CheckCircle, Sparkles, TrendingUp, Zap } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface NewsletterSignupProps {
  className?: string;
  variant?: "default" | "compact" | "hero";
}

export default function NewsletterSignup({ className = "", variant = "default" }: NewsletterSignupProps) {
  const { toast } = useToast();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: EmailFormData) => {
      return await apiRequest("POST", "/api/subscribe", data);
    },
    onSuccess: () => {
      setIsSubscribed(true);
      form.reset();
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive daily AI business tips in your inbox.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EmailFormData) => {
    subscribeMutation.mutate(data);
  };

  if (variant === "hero") {
    return (
      <div className={`${className}`}>
        <Card className="bg-gradient-to-br from-neutral-900 to-black border-electric-blue/30 shadow-2xl">
          <CardContent className="p-8">
            {isSubscribed ? (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-electric-blue mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-electric-blue">Welcome Aboard! 🚀</h3>
                <p className="text-gray-400 mb-6">
                  You're now subscribed to our daily AI business transformation tips. 
                  Check your email for your first tip coming tomorrow!
                </p>
                <Button 
                  onClick={() => setIsSubscribed(false)}
                  className="bg-electric-blue hover:bg-blue-400 text-black"
                >
                  Subscribe Another Email
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-electric-blue mr-2" />
                    <h2 className="text-3xl font-bold">Daily AI Business Tips</h2>
                  </div>
                  <p className="text-xl text-gray-400">
                    Get exclusive insights on automating your business delivered daily to your inbox
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <p className="text-sm font-semibold">Growth Strategies</p>
                    <p className="text-xs text-gray-400">Scale with AI automation</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <p className="text-sm font-semibold">Efficiency Tips</p>
                    <p className="text-xs text-gray-400">Save time & money</p>
                  </div>
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <p className="text-sm font-semibold">Daily Delivery</p>
                    <p className="text-xs text-gray-400">Fresh insights daily</p>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input
                                type="email"
                                placeholder="Enter your business email..."
                                className="flex-1 bg-neutral-800 border-gray-600 focus:border-electric-blue text-lg py-6"
                                {...field}
                              />
                              <Button
                                type="submit"
                                disabled={subscribeMutation.isPending}
                                className="bg-electric-blue hover:bg-blue-400 text-black font-semibold px-8 py-6"
                              >
                                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe Free"}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Free forever. Unsubscribe anytime. We respect your privacy.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`bg-neutral-900 border border-electric-blue/30 rounded-lg p-6 ${className}`}>
        {isSubscribed ? (
          <div className="text-center">
            <CheckCircle className="w-8 h-8 text-electric-blue mx-auto mb-2" />
            <p className="font-semibold text-electric-blue">Subscribed!</p>
            <p className="text-sm text-gray-400">Check your email for daily tips</p>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-3">
              <Mail className="w-5 h-5 text-electric-blue mr-2" />
              <h3 className="font-bold">Daily AI Tips</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Get business automation insights delivered daily
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your business email"
                          className="bg-neutral-800 border-gray-600 focus:border-electric-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full bg-electric-blue hover:bg-blue-400 text-black font-semibold"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <Card className={`bg-black border-electric-blue/30 ${className}`}>
      <CardContent className="p-6">
        {isSubscribed ? (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-electric-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-electric-blue">Successfully Subscribed!</h3>
            <p className="text-gray-400 mb-4">
              You'll receive daily AI business tips starting tomorrow.
            </p>
            <Button 
              onClick={() => setIsSubscribed(false)}
              className="bg-electric-blue hover:bg-blue-400 text-black"
            >
              Subscribe Another Email
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-electric-blue mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Stay Ahead with AI</h2>
              <p className="text-gray-400">
                Get daily business automation tips and insights delivered to your inbox
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your business email"
                          className="bg-neutral-900 border-gray-600 focus:border-electric-blue"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full bg-electric-blue hover:bg-blue-400 text-black font-semibold py-3"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Subscribe to Daily Tips"}
                </Button>
              </form>
            </Form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Free forever. Unsubscribe anytime.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
