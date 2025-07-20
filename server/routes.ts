import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertEmailSubscriptionSchema } from "@shared/schema";
import { createEmailService } from "./email";
import { createNewsletterService } from "./newsletter";
import { queryDeepSeek } from "./deepseek";
import { z } from "zod";

const emailService = createEmailService();
const newsletterService = createNewsletterService(emailService);

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save to database
      const contact = await storage.createContact(validatedData);
      
      // Send email notification if email service is configured
      let emailSent = false;
      if (emailService) {
        emailSent = await emailService.sendContactNotification(contact);
      }
      
      res.status(201).json({ 
        success: true, 
        contact,
        emailSent: emailSent || !emailService // true if sent or if email not configured
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes if needed)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Email is required" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Please enter a valid email address" 
        });
      }

      const validatedData = insertEmailSubscriptionSchema.parse({ email });
      
      try {
        const subscription = await storage.createEmailSubscription(validatedData);
        res.status(201).json({ 
          success: true, 
          message: "Successfully subscribed to our daily AI business tips!",
          subscription
        });
      } catch (error: any) {
        // Handle duplicate email
        if (error.code === '23505') {
          res.status(409).json({ 
            success: false, 
            message: "This email is already subscribed to our newsletter." 
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Email subscription error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to subscribe to newsletter" 
      });
    }
  });

  // Unsubscribe endpoint
  app.get("/api/unsubscribe", async (req, res) => {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Email is required" 
        });
      }

      await storage.unsubscribeEmail(email);
      res.json({ 
        success: true, 
        message: "Successfully unsubscribed from our newsletter." 
      });
    } catch (error) {
      console.error('Unsubscribe error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to unsubscribe" 
      });
    }
  });

  // Manual newsletter send endpoint (for testing)
  app.post("/api/admin/send-newsletter", async (req, res) => {
    try {
      const results = await newsletterService.sendDailyNewsletter();
      res.json({ 
        success: true, 
        message: "Newsletter sent successfully",
        results
      });
    } catch (error) {
      console.error('Newsletter send error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send newsletter" 
      });
    }
  });

  // Get subscription stats
  app.get("/api/admin/newsletter-stats", async (req, res) => {
    try {
      const activeSubscriptions = await storage.getEmailSubscriptions(true);
      const totalSubscriptions = await storage.getEmailSubscriptions(false);
      
      res.json({ 
        success: true, 
        stats: {
          activeSubscribers: activeSubscriptions.length,
          totalSubscribers: totalSubscriptions.length,
          recentSubscribers: totalSubscriptions.slice(0, 5)
        }
      });
    } catch (error) {
      console.error('Newsletter stats error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get newsletter stats" 
      });
    }
  });

  // Analytics tracking endpoints
  app.post("/api/analytics/page-view", async (req, res) => {
    try {
      const { page, userAgent, sessionId } = req.body;
      
      if (!page) {
        return res.status(400).json({ 
          success: false, 
          message: "Page is required" 
        });
      }

      const pageView = await storage.trackPageView({
        page,
        userAgent,
        ipAddress: req.ip,
        sessionId
      });

      res.json({ success: true, pageView });
    } catch (error) {
      console.error('Page view tracking error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to track page view" 
      });
    }
  });

  app.post("/api/analytics/interaction", async (req, res) => {
    try {
      const { type, element, page, data, sessionId } = req.body;
      
      if (!type || !page) {
        return res.status(400).json({ 
          success: false, 
          message: "Type and page are required" 
        });
      }

      const interaction = await storage.trackUserInteraction({
        type,
        element,
        page,
        data: data ? JSON.stringify(data) : null,
        sessionId
      });

      res.json({ success: true, interaction });
    } catch (error) {
      console.error('User interaction tracking error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to track interaction" 
      });
    }
  });

  // Analytics dashboard endpoint
  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const dashboard = await storage.getAnalyticsDashboard(days);
      const recentActivity = await storage.getRecentActivity();
      
      res.json({ 
        success: true, 
        dashboard,
        recentActivity
      });
    } catch (error) {
      console.error('Analytics dashboard error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get analytics data" 
      });
    }
  });

  // Chatbot AI query endpoint
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { question, context } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Question is required" 
        });
      }

      // Try to get AI response from DeepSeek
      try {
        const aiResponse = await queryDeepSeek(question, context || "homepage");
        res.json({ 
          success: true, 
          response: aiResponse,
          source: "ai"
        });
      } catch (error) {
        console.error('DeepSeek error:', error);
        // Fallback to a helpful message if DeepSeek fails
        res.json({ 
          success: true, 
          response: "I'm having trouble accessing my advanced AI capabilities right now. For complex questions, please contact our team directly at +263 78 549 4594 or ngonidzashezimbwa95@gmail.com. I'd be happy to help with basic questions about our services, pricing, or how to get started with AI consulting!",
          source: "fallback"
        });
      }
    } catch (error) {
      console.error('Chatbot endpoint error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process chatbot request" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
