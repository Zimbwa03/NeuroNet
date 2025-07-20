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
  isAI?: boolean;
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

  const addBotMessage = (text: string, suggestions?: string[], isAI?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      suggestions,
      isAI
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

  const queryAI = async (userInput: string): Promise<string> => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userInput,
          context: `${getCurrentPageName() || 'homepage'} - ${location}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      // Clean up markdown formatting from the response
      let cleanedResponse = data.response;
      
      // Remove markdown bold/italic formatting
      cleanedResponse = cleanedResponse.replace(/\*\*(.*?)\*\*/g, '$1');
      cleanedResponse = cleanedResponse.replace(/\*(.*?)\*/g, '$1');
      
      // Replace markdown bullet points with simple text
      cleanedResponse = cleanedResponse.replace(/^[\s]*[-*+]\s+/gm, '• ');
      
      // Clean up multiple spaces and line breaks
      cleanedResponse = cleanedResponse.replace(/\s{3,}/g, ' ');
      cleanedResponse = cleanedResponse.replace(/\n{3,}/g, '\n\n');
      
      return cleanedResponse;
    } catch (error) {
      console.error('AI query error:', error);
      return "I'm having trouble with my advanced AI features right now. Let me help you with our standard information, or you can contact our team directly for complex questions!";
    }
  };

  const shouldUseAI = (input: string): boolean => {
    const complexKeywords = [
      'explain', 'how does', 'why', 'what is', 'difference between', 'compare',
      'technical', 'implementation', 'algorithm', 'machine learning', 'deep learning',
      'neural network', 'artificial intelligence', 'methodology', 'architecture',
      'integration', 'scalability', 'performance', 'security', 'compliance',
      'roi calculation', 'business case', 'feasibility', 'timeline', 'resources'
    ];

    const hasComplexKeywords = complexKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    );

    const isLongQuestion = input.length > 50;
    const hasMultipleQuestions = (input.match(/\?/g) || []).length > 1;

    return hasComplexKeywords || isLongQuestion || hasMultipleQuestions;
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
        text: "Ready to connect? Here's how to reach us!\n\nPhone:\n+263 78 549 4594\n+263 78 258 3119\n\nEmail:\nngonidzashezimbwa@gmail.com\n\nLinkedIn:\nNeuroNet AI Solutions\n\nYou can also fill out our contact form for a detailed response!",
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

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const userQuestion = inputValue;
      addUserMessage(userQuestion);
      setInputValue("");
      setIsTyping(true);

      try {
        // Check if we should use AI for complex questions
        if (shouldUseAI(userQuestion)) {
          // Use AI for complex questions
          const aiResponse = await queryAI(userQuestion);
          setIsTyping(false);
          addBotMessage(aiResponse, getContextualSuggestions(location), true);
        } else {
          // Use preset responses for simple questions
          setTimeout(() => {
            const response = getBotResponse(userQuestion);
            setIsTyping(false);
            addBotMessage(response.text, response.suggestions, false);
          }, 800 + Math.random() * 500);
        }
      } catch (error) {
        console.error('Error handling message:', error);
        setTimeout(() => {
          const response = getBotResponse(userQuestion);
          setIsTyping(false);
          addBotMessage(response.text, response.suggestions);
        }, 800);
      }
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    addUserMessage(suggestion);
    setIsTyping(true);

    try {
      // Check if we should use AI for complex suggestions
      if (shouldUseAI(suggestion)) {
        const aiResponse = await queryAI(suggestion);
        setIsTyping(false);
        addBotMessage(aiResponse, getContextualSuggestions(location), true);
      } else {
        setTimeout(() => {
          const response = getBotResponse(suggestion);
          setIsTyping(false);
          addBotMessage(response.text, response.suggestions, false);
        }, 600);
      }
    } catch (error) {
      console.error('Error handling suggestion:', error);
      setTimeout(() => {
        const response = getBotResponse(suggestion);
        setIsTyping(false);
        addBotMessage(response.text, response.suggestions);
      }, 600);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-4 sm:right-4 bottom-2 right-2">
      {/* Chat Button */}
      {!isOpen && (
        <div className="relative">
          {/* Radiating rings animation */}
          <div className="absolute inset-0 w-16 h-16">
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-electric-blue/20 animate-ping animation-delay-0"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-electric-blue/30 animate-ping animation-delay-300"></div>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-electric-blue/40 animate-ping animation-delay-600"></div>
          </div>
          
          {/* Outer glow ring */}
          <div className="absolute -inset-2 w-20 h-20 rounded-full bg-gradient-to-r from-electric-blue/30 via-purple-500/30 to-pink-500/30 animate-spin-slow blur-sm"></div>
          
          {/* Main button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-electric-blue via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-electric-blue shadow-2xl hover:shadow-electric-blue/80 transition-all duration-500 transform hover:scale-125 animate-gradient-x"
          >
            <div className="relative">
              {/* Inner pulsing glow */}
              <div className="absolute inset-0 w-10 h-10 bg-white/20 rounded-full animate-pulse"></div>
              
              <div className="w-10 h-10 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
                  {/* Animated background circle */}
                  <circle cx="50" cy="50" r="45" fill="rgba(255,255,255,0.1)" stroke="none" className="animate-pulse" />
                  
                  <g fill="none" stroke="currentColor" strokeWidth="4" className="text-white drop-shadow-lg">
                    {/* Brain outline with glow effect */}
                    <path 
                      d="M25 35 Q20 30 25 25 Q30 20 40 25 Q50 15 65 20 Q75 25 75 35 Q80 40 75 50 Q80 60 75 70 Q70 80 60 80 Q50 85 40 80 Q30 80 25 70 Q20 60 25 50 Q20 40 25 35 Z" 
                      strokeWidth="5" 
                      className="animate-pulse filter drop-shadow-sm"
                      style={{
                        filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.8))'
                      }}
                    />
                    
                    {/* Animated neural network nodes */}
                    <circle cx="35" cy="35" r="4" fill="currentColor" strokeWidth="2" className="animate-pulse animation-delay-100">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="30" r="4" fill="currentColor" strokeWidth="2" className="animate-pulse animation-delay-200">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                    <circle cx="65" cy="40" r="4" fill="currentColor" strokeWidth="2" className="animate-pulse animation-delay-300">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.6s" />
                    </circle>
                    <circle cx="40" cy="50" r="4" fill="currentColor" strokeWidth="2" className="animate-pulse animation-delay-400">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="0.9s" />
                    </circle>
                    <circle cx="60" cy="55" r="4" fill="currentColor" strokeWidth="2" className="animate-pulse animation-delay-500">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1.2s" />
                    </circle>
                    <circle cx="45" cy="65" r="4" fill="currentColor" strokeWidth="2" className="animate-pulse animation-delay-600">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </circle>
                    
                    {/* Animated neural connections with energy flow */}
                    <line x1="35" y1="35" x2="50" y2="30" strokeWidth="3" className="animate-pulse animation-delay-100">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                    </line>
                    <line x1="50" y1="30" x2="65" y2="40" strokeWidth="3" className="animate-pulse animation-delay-200">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.2s" />
                    </line>
                    <line x1="35" y1="35" x2="40" y2="50" strokeWidth="3" className="animate-pulse animation-delay-300">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
                    </line>
                    <line x1="65" y1="40" x2="60" y2="55" strokeWidth="3" className="animate-pulse animation-delay-400">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
                    </line>
                    <line x1="40" y1="50" x2="60" y2="55" strokeWidth="3" className="animate-pulse animation-delay-500">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="0.8s" />
                    </line>
                    <line x1="40" y1="50" x2="45" y2="65" strokeWidth="3" className="animate-pulse animation-delay-600">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="1.0s" />
                    </line>
                    <line x1="60" y1="55" x2="45" y2="65" strokeWidth="3" className="animate-pulse animation-delay-700">
                      <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin="1.2s" />
                    </line>
                  </g>
                </svg>
              </div>
              
              {/* Enhanced status indicator with multiple rings */}
              <div className="absolute -top-1 -right-1">
                <div className="relative w-6 h-6">
                  <div className="absolute inset-0 w-6 h-6 bg-green-400/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                  <div className="absolute inset-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-2 w-1 h-1 bg-electric-blue rounded-full animate-bounce animation-delay-100"></div>
                <div className="absolute top-2 right-0 w-1 h-1 bg-purple-400 rounded-full animate-bounce animation-delay-300"></div>
                <div className="absolute bottom-0 left-0 w-1 h-1 bg-pink-400 rounded-full animate-bounce animation-delay-500"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-electric-blue rounded-full animate-bounce animation-delay-700"></div>
              </div>
            </div>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 sm:w-80 max-w-[90vw] bg-black border-electric-blue/30 shadow-2xl shadow-electric-blue/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-electric-blue/30 bg-gradient-to-r from-electric-blue/10 to-blue-600/10">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-electric-blue to-blue-400 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Background circle for better contrast */}
                      <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.2)" stroke="none" />
                      
                      <g fill="none" stroke="currentColor" strokeWidth="4" className="text-black">
                        {/* Brain outline - clearer and bolder */}
                        <path d="M25 35 Q20 30 25 25 Q30 20 40 25 Q50 15 65 20 Q75 25 75 35 Q80 40 75 50 Q80 60 75 70 Q70 80 60 80 Q50 85 40 80 Q30 80 25 70 Q20 60 25 50 Q20 40 25 35 Z" strokeWidth="5" />
                        
                        {/* Neural network nodes - larger */}
                        <circle cx="35" cy="35" r="4" fill="currentColor" strokeWidth="2" />
                        <circle cx="50" cy="30" r="4" fill="currentColor" strokeWidth="2" />
                        <circle cx="65" cy="40" r="4" fill="currentColor" strokeWidth="2" />
                        <circle cx="40" cy="50" r="4" fill="currentColor" strokeWidth="2" />
                        <circle cx="60" cy="55" r="4" fill="currentColor" strokeWidth="2" />
                        <circle cx="45" cy="65" r="4" fill="currentColor" strokeWidth="2" />
                        
                        {/* Neural connections - thicker */}
                        <line x1="35" y1="35" x2="50" y2="30" strokeWidth="3" />
                        <line x1="50" y1="30" x2="65" y2="40" strokeWidth="3" />
                        <line x1="35" y1="35" x2="40" y2="50" strokeWidth="3" />
                        <line x1="65" y1="40" x2="60" y2="55" strokeWidth="3" />
                        <line x1="40" y1="50" x2="60" y2="55" strokeWidth="3" />
                        <line x1="40" y1="50" x2="45" y2="65" strokeWidth="3" />
                        <line x1="60" y1="55" x2="45" y2="65" strokeWidth="3" />
                      </g>
                    </svg>
                  </div>
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
          <CardContent className="h-64 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-electric-blue/50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] ${message.isBot ? "order-2" : "order-1"}`}>
                  <div className={`p-3 rounded-lg ${
                    message.isBot 
                      ? "bg-neutral-800 text-white" 
                      : "bg-electric-blue text-black"
                  }`}>
                    {message.isBot && message.isAI && (
                      <div className="flex items-center mb-2 text-xs text-electric-blue">
                        <Sparkles className="w-3 h-3 mr-1" />
                        <span>AI-Powered Response</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line break-words leading-relaxed overflow-wrap-anywhere word-break-break-word">{message.text}</p>
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer text-xs border-electric-blue/50 text-electric-blue hover:bg-electric-blue hover:text-black transition-colors break-words max-w-full"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.isBot ? "order-1 mr-2 bg-gradient-to-r from-electric-blue to-blue-400" : "order-2 ml-2 bg-neutral-700"
                }`}>
                  {message.isBot ? (
                    <div className="w-7 h-7 relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Background circle for better contrast */}
                        <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.2)" stroke="none" />
                        
                        <g fill="none" stroke="currentColor" strokeWidth="4" className="text-black">
                          {/* Brain outline - clearer */}
                          <path d="M25 35 Q20 30 25 25 Q30 20 40 25 Q50 15 65 20 Q75 25 75 35 Q80 40 75 50 Q80 60 75 70 Q70 80 60 80 Q50 85 40 80 Q30 80 25 70 Q20 60 25 50 Q20 40 25 35 Z" strokeWidth="5" />
                          
                          {/* Neural network nodes */}
                          <circle cx="35" cy="35" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="50" cy="30" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="65" cy="40" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="40" cy="50" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="60" cy="55" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="45" cy="65" r="3" fill="currentColor" strokeWidth="2" />
                          
                          {/* Neural connections */}
                          <line x1="35" y1="35" x2="50" y2="30" strokeWidth="2.5" />
                          <line x1="50" y1="30" x2="65" y2="40" strokeWidth="2.5" />
                          <line x1="35" y1="35" x2="40" y2="50" strokeWidth="2.5" />
                          <line x1="65" y1="40" x2="60" y2="55" strokeWidth="2.5" />
                          <line x1="40" y1="50" x2="60" y2="55" strokeWidth="2.5" />
                          <line x1="40" y1="50" x2="45" y2="65" strokeWidth="2.5" />
                          <line x1="60" y1="55" x2="45" y2="65" strokeWidth="2.5" />
                        </g>
                      </svg>
                    </div>
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-electric-blue to-blue-400 flex items-center justify-center">
                    <div className="w-6 h-6 relative">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Background circle for better contrast */}
                        <circle cx="50" cy="50" r="45" fill="rgba(0,0,0,0.2)" stroke="none" />
                        
                        <g fill="none" stroke="currentColor" strokeWidth="4" className="text-black">
                          {/* Brain outline - clearer */}
                          <path d="M25 35 Q20 30 25 25 Q30 20 40 25 Q50 15 65 20 Q75 25 75 35 Q80 40 75 50 Q80 60 75 70 Q70 80 60 80 Q50 85 40 80 Q30 80 25 70 Q20 60 25 50 Q20 40 25 35 Z" strokeWidth="5" />
                          
                          {/* Neural network nodes */}
                          <circle cx="35" cy="35" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="50" cy="30" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="65" cy="40" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="40" cy="50" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="60" cy="55" r="3" fill="currentColor" strokeWidth="2" />
                          <circle cx="45" cy="65" r="3" fill="currentColor" strokeWidth="2" />
                          
                          {/* Neural connections */}
                          <line x1="35" y1="35" x2="50" y2="30" strokeWidth="2.5" />
                          <line x1="50" y1="30" x2="65" y2="40" strokeWidth="2.5" />
                          <line x1="35" y1="35" x2="40" y2="50" strokeWidth="2.5" />
                          <line x1="65" y1="40" x2="60" y2="55" strokeWidth="2.5" />
                          <line x1="40" y1="50" x2="60" y2="55" strokeWidth="2.5" />
                          <line x1="40" y1="50" x2="45" y2="65" strokeWidth="2.5" />
                          <line x1="60" y1="55" x2="45" y2="65" strokeWidth="2.5" />
                        </g>
                      </svg>
                    </div>
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
          <div className="p-4 border-t border-electric-blue/30 bg-black">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about AI..."
                className="flex-1 px-3 py-2 bg-neutral-800 border border-electric-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric-blue text-sm min-w-0 h-10"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-electric-blue hover:bg-blue-400 text-black p-2 disabled:opacity-50 flex-shrink-0 h-10 w-10"
                size="sm"
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
