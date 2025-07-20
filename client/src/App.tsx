
import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";

// Import pages
import Home from "@/pages/home";
import Services from "@/pages/services";
import HowItWorks from "@/pages/how-it-works";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Portfolio from "@/pages/portfolio";

import Blog from "@/pages/blog";
import AdminAnalytics from "@/pages/admin-analytics";
import NotFound from "@/pages/not-found";

// Import components
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Chatbot from "@/components/chatbot/chatbot";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [location] = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView(location);
  }, [location, trackPageView]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-black text-white">
          <Header />
          <main>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services" component={Services} />
              <Route path="/how-it-works" component={HowItWorks} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/portfolio" component={Portfolio} />

              <Route path="/blog" component={Blog} />
              <Route path="/admin/analytics" component={AdminAnalytics} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
          <Chatbot />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
