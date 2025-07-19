import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { createEmailService } from "./email";
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

  const httpServer = createServer(app);

  return httpServer;
}
