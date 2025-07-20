import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, TrendingUp, Brain, Zap } from "lucide-react";

export default function Blog() {
  const featuredPost = {
    title: "The Future of AI in Small Business Operations",
    excerpt: "Discover how artificial intelligence is transforming the way small and medium enterprises operate, from customer service automation to predictive analytics.",
    author: "NeuroNet Team",
    date: "July 15, 2025",
    readTime: "8 min read",
    category: "AI Strategy",
    image: "/api/placeholder/800/400",
    tags: ["AI Strategy", "Small Business", "Automation"]
  };

  const blogPosts = [
    {
      title: "5 Signs Your Business is Ready for AI Implementation",
      excerpt: "Learn the key indicators that show your business is prepared to adopt AI technologies and maximize their potential.",
      author: "NeuroNet Team",
      date: "July 12, 2025",
      readTime: "6 min read",
      category: "Implementation",
      tags: ["AI Readiness", "Implementation", "Strategy"],
      icon: Brain
    },
    {
      title: "ROI Calculator: Measuring AI Success in Your Business",
      excerpt: "A comprehensive guide to calculating and tracking the return on investment for your AI initiatives.",
      author: "NeuroNet Team", 
      date: "July 10, 2025",
      readTime: "10 min read",
      category: "Analytics",
      tags: ["ROI", "Analytics", "Measurement"],
      icon: TrendingUp
    },
    {
      title: "Chatbots vs. Human Support: Finding the Right Balance",
      excerpt: "Explore how to effectively combine AI-powered chatbots with human customer service for optimal results.",
      author: "NeuroNet Team",
      date: "July 8, 2025", 
      readTime: "7 min read",
      category: "Customer Service",
      tags: ["Chatbots", "Customer Service", "Automation"],
      icon: Zap
    },
    {
      title: "Data Privacy in AI: What Business Owners Need to Know",
      excerpt: "Essential information about data protection and privacy considerations when implementing AI solutions.",
      author: "NeuroNet Team",
      date: "July 5, 2025",
      readTime: "9 min read", 
      category: "Security",
      tags: ["Data Privacy", "Security", "Compliance"],
      icon: Brain
    },
    {
      title: "AI Automation Success Stories from Local Businesses",
      excerpt: "Real examples of how businesses in Zimbabwe and across Africa are using AI to improve efficiency and growth.",
      author: "NeuroNet Team",
      date: "July 3, 2025",
      readTime: "12 min read",
      category: "Case Studies", 
      tags: ["Success Stories", "Local Business", "Africa"],
      icon: TrendingUp
    },
    {
      title: "Getting Started with Machine Learning: A Beginner's Guide",
      excerpt: "A non-technical introduction to machine learning concepts and how they can benefit your business operations.",
      author: "NeuroNet Team",
      date: "July 1, 2025",
      readTime: "8 min read",
      category: "Education",
      tags: ["Machine Learning", "Beginner", "Education"],
      icon: Zap
    }
  ];

  const categories = [
    "All Posts",
    "AI Strategy", 
    "Implementation",
    "Case Studies",
    "Customer Service",
    "Analytics",
    "Security",
    "Education"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6">
            AI <span className="text-electric-blue">Insights</span>
          </h1>
          <p className="text-xl text-gray-400">
            Expert insights, practical guides, and the latest trends in artificial intelligence for business.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-electric-blue text-black mb-4">Featured Post</Badge>
            <h2 className="text-4xl font-bold mb-6">Latest Insights</h2>
          </div>

          <Card className="bg-black border-electric-blue/30 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-electric-blue/20 to-blue-600/20 p-12 flex items-center justify-center">
                <div className="w-32 h-32 bg-electric-blue rounded-full flex items-center justify-center">
                  <Brain className="w-16 h-16 text-black" />
                </div>
              </div>
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center mb-4 text-sm text-gray-400">
                  <Badge variant="outline" className="border-electric-blue text-electric-blue mr-4">
                    {featuredPost.category}
                  </Badge>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{featuredPost.readTime}</span>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-gray-400 mb-6 text-lg">{featuredPost.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-400">{featuredPost.author}</span>
                  </div>
                  <Button className="bg-electric-blue hover:bg-blue-400 text-black">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className={`border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black ${
                  category === "All Posts" ? "bg-electric-blue text-black" : ""
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const Icon = post.icon;
              return (
                <Card key={index} className="bg-neutral-900 border-electric-blue/30 hover:border-electric-blue/60 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="border-electric-blue text-electric-blue">
                        {post.category}
                      </Badge>
                      <div className="w-10 h-10 bg-electric-blue rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-black" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-electric-blue transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-gray-600 text-gray-400 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-black"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-electric-blue hover:bg-blue-400 text-black px-8 py-3"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-electric-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">Stay Updated</h2>
          <p className="text-xl mb-8 text-gray-800">
            Subscribe to our newsletter for the latest AI insights and business automation tips.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-r-lg rounded-l-none">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </section>
    </div>
  );
}