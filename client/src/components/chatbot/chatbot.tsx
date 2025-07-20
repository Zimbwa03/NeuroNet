import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getContextualSuggestions, getSmartResponses } from "./chatbot-features";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Home,
  Phone,
  DollarSign,
  Briefcase,
  FileText,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Calendar
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

export default function Chatbot() {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chatbot opens
      setTimeout(() => {
        const contextualSuggestions = getContextualSuggestions(location);
        const currentPageName = getCurrentPageName();
        const greeting = currentPageName 
          ? `Hi there! 👋 I'm Neury, your AI assistant at NeuroNet! I see you're on our ${currentPageName} page. I'm here to help you discover how AI can transform your business. What would you like to know?`
          : "Hi there! 👋 I'm Neury, your AI assistant at NeuroNet! I'm here to help you discover how AI can transform your business. What would you like to know?";
        
        addBotMessage(greeting, contextualSuggestions);
      }, 500);
    }
  }, [isOpen, location]);

  const getCurrentPageName = () => {
    const pageNames: Record<string, string> = {
      "/": "Home",
      "/services": "Services",
      "/portfolio": "Portfolio",
      "/pricing": "Pricing", 
      "/blog": "Blog",
      "/about": "About",
      "/contact": "Contact"
    };
    return pageNames[location];
  };

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      suggestions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userInput: string): { text: string; suggestions?: string[]; actions?: string[] } => {
    const input = userInput.toLowerCase();

    // Try smart context-aware responses first
    const smartResponse = getSmartResponses(userInput, location);
    if (smartResponse) {
      return smartResponse;
    }

    // Navigation requests
    if (input.includes("go to") || input.includes("show me") || input.includes("take me to")) {
      if (input.includes("service")) {
        navigate("/services");
        return {
          text: "Perfect! I've taken you to our Services page. Here you can explore our AI consulting and automation offerings. What specific service interests you?",
          suggestions: ["AI consulting details", "Automation services", "Custom solutions", "Get pricing"]
        };
      }
      if (input.includes("portfolio") || input.includes("case stud") || input.includes("success")) {
        navigate("/portfolio");
        return {
          text: "Great! I've navigated you to our Portfolio page where you can see real success stories and results we've achieved for clients. Which case study interests you?",
          suggestions: ["E-commerce results", "Customer service automation", "Manufacturing solutions", "Get similar results"]
        };
      }
      if (input.includes("pricing") || input.includes("price") || input.includes("cost")) {
        navigate("/pricing");
        return {
          text: "Excellent! Here's our Pricing page with transparent, flexible options. Which package fits your needs?",
          suggestions: ["Strategy session", "Implementation plan", "Enterprise consulting", "Custom quote"]
        };
      }
      if (input.includes("contact")) {
        navigate("/contact");
        return {
          text: "Perfect! I've taken you to our Contact page. You can reach us multiple ways - phone, email, or the contact form. How would you prefer to connect?",
          suggestions: ["Fill contact form", "Call directly", "Schedule meeting", "Get quote"]
        };
      }
    }

    if (input.includes("service") || input.includes("what do you do")) {
      return {
        text: "We specialize in AI consulting and automation! Our main services include:\n\n🧠 AI Strategy Consulting - Expert guidance for AI adoption\n🤖 Business Process Automation - Streamline operations\n📊 Data Analytics & Insights - Make data-driven decisions\n💬 Chatbot Development - 24/7 customer support\n🔍 Computer Vision Solutions - Automated visual analysis\n\nWhich area interests you most?",
        suggestions: ["Tell me about AI consulting", "How does automation work?", "Show me pricing", "View services page"],
        actions: ["navigate:/services"]
      };
    }

    if (input.includes("price") || input.includes("cost") || input.includes("pricing")) {
      return {
        text: "Our pricing is transparent and flexible! 💰\n\n📋 AI Strategy Session: $299 - Perfect for exploring AI opportunities\n🚀 Implementation Plan: $999 - Comprehensive planning for AI integration\n🏢 Enterprise Consulting: $2,999 - Complete AI transformation program\n\nWe also offer custom automation projects starting from $1,999. Would you like to see detailed pricing or schedule a free consultation?",
        suggestions: ["View detailed pricing", "Schedule consultation", "What's included?", "Custom quote request"]
      };
    }

    if (input.includes("success") || input.includes("portfolio") || input.includes("case study")) {
      return {
        text: "We've helped businesses achieve amazing results! 🎯\n\n📈 45% increase in conversion rates for e-commerce\n⚡ 70% reduction in customer response time\n🎯 95% accuracy in automated quality control\n\nWant to see detailed case studies?",
        suggestions: ["View portfolio", "Read testimonials", "How can you help my business?", "Schedule a consultation"]
      };
    }

    if (input.includes("start") || input.includes("begin") || input.includes("get started")) {
      return {
        text: "Getting started is easy! Here's how we can help you begin your AI journey: 🚀\n\n1️⃣ Free initial consultation\n2️⃣ Business assessment\n3️⃣ Custom strategy plan\n4️⃣ Implementation support\n\nReady to take the first step?",
        suggestions: ["Book free consultation", "Contact us", "Learn about process", "View pricing"]
      };
    }

    if (input.includes("contact") || input.includes("reach") || input.includes("phone")) {
      return {
        text: "Ready to connect? Here's how to reach us! 📞\n\n📱 Phone: +263 78 549 4594 / +263 78 258 3119\n📧 Email: ngonidzashezimbwa95@gmail.com\n💼 LinkedIn: NeuroNet AI Solutions\n\nYou can also fill out our contact form for a detailed response!",
        suggestions: ["Fill contact form", "Call now", "Schedule meeting", "Ask another question"]
      };
    }

    if (input.includes("automation") || input.includes("automate")) {
      return {
        text: "Business automation is our specialty! 🤖 We can automate:\n\n📧 Email workflows\n📞 Customer service responses\n📊 Data processing\n🔄 Repetitive tasks\n📋 Document management\n\nWhat processes would you like to automate?",
        suggestions: ["Customer service automation", "Data processing", "Email workflows", "Custom automation"]
      };
    }

    if (input.includes("ai") || input.includes("artificial intelligence")) {
      return {
        text: "AI can revolutionize your business! 🧠 Here's what we can implement:\n\n🎯 Predictive analytics\n💬 Intelligent chatbots\n👁️ Computer vision\n📈 Recommendation engines\n🔍 Smart data analysis\n\nWhich AI solution interests you most?",
        suggestions: ["Predictive analytics", "Chatbot development", "Computer vision", "Data analysis"]
      };
    }

    if (input.includes("thank") || input.includes("thanks")) {
      return {
        text: "You're very welcome! 😊 I'm here whenever you need help with AI solutions. Is there anything else you'd like to know about NeuroNet?",
        suggestions: ["Explore services", "View pricing", "Contact team", "See portfolio"]
      };
    }

    // Name collection for personalization
    if (input.includes("my name is") || input.includes("i'm ") || input.includes("call me")) {
      const nameMatch = input.match(/(?:my name is|i'm|call me)\s+(\w+)/);
      if (nameMatch) {
        const extractedName = nameMatch[1];
        setUserName(extractedName);
        return {
          text: `Nice to meet you, ${extractedName}! 😊 Now I can provide more personalized assistance. What brings you to NeuroNet today?`,
          suggestions: getContextualSuggestions(location)
        };
      }
    }

    // Personalized default response
    const greeting = userName ? `Hi ${userName}!` : "That's a great question!";
    return {
      text: `${greeting} 🤔 I'm here to help you learn about our AI consulting and automation services. You can also:\n\n📞 Call us directly: +263 78 549 4594\n📧 Email: ngonidzashezimbwa95@gmail.com\n💼 Connect on LinkedIn\n📋 Fill out our contact form\n\nWhat specific aspect of AI interests you?`,
      suggestions: getContextualSuggestions(location)
    };
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue);
      setInputValue("");
      setIsTyping(true);

      // Simulate bot typing delay
      setTimeout(() => {
        const response = getBotResponse(inputValue);
        setIsTyping(false);
        addBotMessage(response.text, response.suggestions);
      }, 1000 + Math.random() * 1000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(suggestion);
      setIsTyping(false);
      addBotMessage(response.text, response.suggestions);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-electric-blue to-blue-400 hover:from-blue-400 hover:to-electric-blue shadow-lg hover:shadow-electric-blue/50 transition-all duration-300 transform hover:scale-110"
        >
          <div className="relative">
            <Bot className="w-8 h-8 text-black" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 bg-black border-electric-blue/30 shadow-2xl shadow-electric-blue/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-electric-blue/30 bg-gradient-to-r from-electric-blue/10 to-blue-600/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-blue-400 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
              </div>
              <div>
                <h3 className="font-bold text-white">Neury</h3>
                <p className="text-xs text-gray-400">AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <CardContent className="h-64 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[70%] ${message.isBot ? "order-2" : "order-1"}`}>
                  <div className={`p-3 rounded-lg ${
                    message.isBot 
                      ? "bg-neutral-800 text-white" 
                      : "bg-electric-blue text-black"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer text-xs border-electric-blue/50 text-electric-blue hover:bg-electric-blue hover:text-black transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot ? "order-1 mr-2 bg-electric-blue" : "order-2 ml-2 bg-neutral-700"
                }`}>
                  {message.isBot ? (
                    <Bot className="w-4 h-4 text-black" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-neutral-800 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-electric-blue rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-electric-blue/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about AI..."
                className="flex-1 px-3 py-2 bg-neutral-800 border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-electric-blue hover:bg-blue-400 text-black p-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}