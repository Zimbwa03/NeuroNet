import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Briefcase,
  FolderOpen,
  DollarSign,
  BookOpen,
  Users,
  Phone,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface NavigationHelperProps {
  onNavigationSuggestion: (message: string, suggestions: string[]) => void;
}

export default function ChatbotNavigation({ onNavigationSuggestion }: NavigationHelperProps) {
  const [location, navigate] = useLocation();

  const pages = [
    {
      path: "/",
      name: "Home",
      icon: Home,
      description: "Welcome page with overview",
      suggestions: ["Show me your services", "What makes you different?", "How can AI help my business?"]
    },
    {
      path: "/services",
      name: "Services",
      icon: Briefcase,
      description: "AI consulting & automation",
      suggestions: ["What services do you offer?", "Tell me about AI consulting", "How does automation work?"]
    },
    {
      path: "/portfolio",
      name: "Portfolio",
      icon: FolderOpen,
      description: "Success stories & case studies",
      suggestions: ["Show me success stories", "What results have you achieved?", "Client testimonials"]
    },
    {
      path: "/pricing",
      name: "Pricing",
      icon: DollarSign,
      description: "Transparent pricing plans",
      suggestions: ["How much does it cost?", "Show me pricing plans", "What's included in each package?"]
    },
    {
      path: "/blog",
      name: "Blog",
      icon: BookOpen,
      description: "AI insights & guides",
      suggestions: ["Latest AI insights", "How to get started with AI?", "AI implementation tips"]
    },
    {
      path: "/about",
      name: "About",
      icon: Users,
      description: "Our team & mission",
      suggestions: ["Tell me about your team", "What's your mission?", "Why choose NeuroNet?"]
    },
    {
      path: "/contact",
      name: "Contact",
      icon: Phone,
      description: "Get in touch with us",
      suggestions: ["How can I contact you?", "Schedule a consultation", "Get a quote"]
    }
  ];

  const currentPage = pages.find(page => page.path === location);

  const handlePageNavigation = (page: typeof pages[0]) => {
    if (page.path !== location) {
      navigate(page.path);
      onNavigationSuggestion(
        `Great! I've taken you to our ${page.name} page. ${page.description}. Here's what you might want to know:`,
        page.suggestions
      );
    } else {
      onNavigationSuggestion(
        `You're currently on our ${page.name} page! ${page.description}. What would you like to know?`,
        page.suggestions
      );
    }
  };

  const getPageRecommendations = () => {
    if (location === "/") {
      return ["Check out our services", "View success stories", "See pricing options"];
    }
    if (location === "/services") {
      return ["View our portfolio", "Check pricing", "Contact us"];
    }
    if (location === "/portfolio") {
      return ["Get pricing info", "Contact us", "Read our blog"];
    }
    if (location === "/pricing") {
      return ["See our services", "Contact us for quote", "View portfolio"];
    }
    if (location === "/blog") {
      return ["Explore our services", "Contact us", "Check pricing"];
    }
    if (location === "/about") {
      return ["View our services", "See portfolio", "Contact us"];
    }
    if (location === "/contact") {
      return ["View our services", "Check pricing", "See portfolio"];
    }
    return ["Explore our services", "View portfolio", "Get pricing"];
  };

  return {
    pages,
    currentPage,
    handlePageNavigation,
    getPageRecommendations
  };
}