import { useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";

export interface ChatbotFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: string;
  category: "service" | "benefit" | "process";
}

export const chatbotFeatures: ChatbotFeature[] = [
  {
    id: "ai-consulting",
    title: "AI Strategy Consulting",
    description: "Get expert guidance on implementing AI in your business",
    icon: Brain,
    action: "Learn about AI consulting",
    category: "service"
  },
  {
    id: "automation",
    title: "Process Automation",
    description: "Automate repetitive tasks and boost efficiency",
    icon: Zap,
    action: "Explore automation services",
    category: "service"
  },
  {
    id: "growth",
    title: "Business Growth",
    description: "Scale your operations with intelligent solutions",
    icon: TrendingUp,
    action: "See growth strategies",
    category: "benefit"
  },
  {
    id: "security",
    title: "Secure & Reliable",
    description: "Enterprise-grade security for your AI implementations",
    icon: Shield,
    action: "Learn about security",
    category: "benefit"
  },
  {
    id: "fast-delivery",
    title: "Quick Implementation",
    description: "Get results in weeks, not months",
    icon: Clock,
    action: "See our timeline",
    category: "process"
  },
  {
    id: "proven-results",
    title: "Proven Success",
    description: "Track record of delivering measurable ROI",
    icon: Award,
    action: "View case studies",
    category: "benefit"
  }
];

export const getContextualSuggestions = (location: string): string[] => {
  const locationMap: Record<string, string[]> = {
    "/": [
      "What services do you offer?",
      "How can AI help my business?", 
      "Show me success stories",
      "What makes you different?"
    ],
    "/services": [
      "How much does consulting cost?",
      "What's included in automation?",
      "Can you help my industry?",
      "Show me the process"
    ],
    "/portfolio": [
      "How did you achieve these results?",
      "Can you help my business too?",
      "What industries do you serve?",
      "Schedule a consultation"
    ],
    "/pricing": [
      "Which package is right for me?",
      "Do you offer custom pricing?",
      "What's the ROI?",
      "How do I get started?"
    ],
    "/blog": [
      "Latest AI trends",
      "Implementation best practices",
      "How to prepare for AI?",
      "Contact for consultation"
    ],
    "/about": [
      "What's your experience?",
      "Why should I trust you?",
      "Meet the team",
      "Get a consultation"
    ],
    "/contact": [
      "What information do you need?",
      "How quickly do you respond?",
      "Can we schedule a call?",
      "Emergency support"
    ]
  };

  return locationMap[location] || [
    "Tell me about your services",
    "How can you help me?",
    "What are your prices?",
    "Contact information"
  ];
};

export const getSmartResponses = (input: string, location: string) => {
  const lowercaseInput = input.toLowerCase();
  
  // Location-aware responses
  if (location === "/services" && lowercaseInput.includes("price")) {
    return {
      text: "Since you're looking at our services, here's our pricing structure:\n\n💼 AI Strategy Session: $299 (perfect for exploring options)\n🚀 Implementation Plan: $999 (detailed roadmap)\n🏢 Enterprise Consulting: $2,999 (full transformation)\n\nWant to see what's included in each package?",
      suggestions: ["What's included?", "View detailed pricing", "Book consultation", "Custom quote"]
    };
  }

  if (location === "/portfolio" && (lowercaseInput.includes("my business") || lowercaseInput.includes("help me"))) {
    return {
      text: "Based on the success stories you're viewing, we can definitely help your business too! Our approach includes:\n\n🔍 Business analysis\n📋 Custom strategy development\n⚡ Phased implementation\n📊 Results tracking\n\nWhat type of business or industry are you in?",
      suggestions: ["Tell me about my industry", "Schedule assessment", "Custom solution", "ROI projections"]
    };
  }

  if (location === "/pricing" && lowercaseInput.includes("which")) {
    return {
      text: "Great question! Here's how to choose the right package:\n\n🎯 **New to AI?** → Start with Strategy Session\n📈 **Ready to implement?** → Implementation Plan\n🏢 **Large organization?** → Enterprise Consulting\n\nNot sure? I can help you decide based on your needs!",
      suggestions: ["I'm new to AI", "Ready to implement", "Large organization", "Help me choose"]
    };
  }

  // Industry-specific responses
  if (lowercaseInput.includes("retail") || lowercaseInput.includes("ecommerce")) {
    return {
      text: "Perfect! We've helped many retail businesses with:\n\n🛍️ Personalized recommendations\n📊 Inventory optimization\n💬 Customer service chatbots\n📈 Sales forecasting\n\nOne client saw 45% increase in conversion rates! Want to see how?",
      suggestions: ["Show retail case study", "Recommendation systems", "Inventory optimization", "Get quote"]
    };
  }

  if (lowercaseInput.includes("manufacturing") || lowercaseInput.includes("factory")) {
    return {
      text: "Excellent! Manufacturing is one of our specialties:\n\n🏭 Quality control automation\n⚙️ Predictive maintenance\n📊 Production optimization\n🔍 Defect detection\n\nWe helped a manufacturer achieve 95% defect detection accuracy!",
      suggestions: ["Quality control details", "Predictive maintenance", "View case study", "Manufacturing quote"]
    };
  }

  return null; // Use default response system
};