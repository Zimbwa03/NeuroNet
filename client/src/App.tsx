import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot/chatbot";
import Home from "@/pages/home";
import Services from "@/pages/services";
import HowItWorks from "@/pages/how-it-works";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Portfolio from "@/pages/portfolio";
import Pricing from "@/pages/pricing";
import Blog from "@/pages/blog";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
