import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { createEmailService } from "./email";
import { queryDeepSeek } from "./deepseek";
import { z } from "zod";

const emailService = createEmailService();

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
