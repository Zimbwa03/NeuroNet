import type { Express } from "express";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { contacts, emailSubscriptions, pageViews, userInteractions, chatbotSessions } from "../shared/schema";
import { supabase } from "./supabase";

const insertContactSchema = createInsertSchema(contacts);
const insertEmailSchema = createInsertSchema(emailSubscriptions);

export function registerRoutes(app: Express) {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);

      const { data, error } = await supabase
        .from('contacts')
        .insert({
          first_name: contactData.firstName,
          last_name: contactData.lastName,
          email: contactData.email,
          company: contactData.company,
          service_interest: contactData.serviceInterest,
          message: contactData.message
        })
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, contact: data });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to submit contact form" 
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = insertEmailSchema.parse(req.body);

      const { data, error } = await supabase
        .from('email_subscriptions')
        .upsert({ email, is_active: true })
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, subscription: data });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to subscribe to newsletter" 
      });
    }
  });

  // Analytics - Page View
  app.post("/api/analytics/page-view", async (req, res) => {
    try {
      const { page, userAgent, sessionId } = req.body;
      const ipAddress = req.ip;

      const { data, error } = await supabase
        .from('page_views')
        .insert({
          page,
          user_agent: userAgent,
          ip_address: ipAddress,
          session_id: sessionId
        })
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, pageView: data });
    } catch (error) {
      console.error("Page view tracking error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to track page view" 
      });
    }
  });

  // Analytics - User Interaction
  app.post("/api/analytics/interaction", async (req, res) => {
    try {
      const { type, element, page, data, sessionId } = req.body;

      const { data: interaction, error } = await supabase
        .from('user_interactions')
        .insert({
          type,
          element,
          page,
          data: data ? JSON.stringify(data) : null,
          session_id: sessionId
        })
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, interaction });
    } catch (error) {
      console.error("Interaction tracking error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to track interaction" 
      });
    }
  });

  // Admin Analytics Dashboard
  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      // Page views
      const { data: pageViews, error: pageViewsError } = await supabase
        .from('page_views')
        .select('page')
        .gte('timestamp', startDate.toISOString());

      if (pageViewsError) throw pageViewsError;

      // User interactions
      const { data: interactions, error: interactionsError } = await supabase
        .from('user_interactions')
        .select('type')
        .gte('timestamp', startDate.toISOString());

      if (interactionsError) throw interactionsError;

      // Contacts count
      const { count: contactsCount, error: contactsError } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startDate.toISOString());

      if (contactsError) throw contactsError;

      // Email subscriptions count
      const { count: subscriptionsCount, error: subscriptionsError } = await supabase
        .from('email_subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)
        .gte('created_at', startDate.toISOString());

      if (subscriptionsError) throw subscriptionsError;

      // Chatbot sessions
      const { data: chatbotData, error: chatbotError } = await supabase
        .from('chatbot_sessions')
        .select('messages')
        .gte('start_time', startDate.toISOString());

      if (chatbotError) throw chatbotError;

      // Recent activity
      const { data: recentPageViews, error: recentPageViewsError } = await supabase
        .from('page_views')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (recentPageViewsError) throw recentPageViewsError;

      const { data: recentInteractions, error: recentInteractionsError } = await supabase
        .from('user_interactions')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (recentInteractionsError) throw recentInteractionsError;

      // Process data
      const pageViewCounts = pageViews?.reduce((acc: any, pv) => {
        acc[pv.page] = (acc[pv.page] || 0) + 1;
        return acc;
      }, {});

      const interactionCounts = interactions?.reduce((acc: any, int) => {
        acc[int.type] = (acc[int.type] || 0) + 1;
        return acc;
      }, {});

      const avgMessages = chatbotData?.length > 0 
        ? chatbotData.reduce((sum, session) => sum + (session.messages || 0), 0) / chatbotData.length
        : 0;

      res.json({
        dashboard: {
          pageViews: Object.entries(pageViewCounts || {}).map(([page, count]) => ({ page, count })),
          interactions: Object.entries(interactionCounts || {}).map(([type, count]) => ({ type, count })),
          contacts: contactsCount || 0,
          subscriptions: subscriptionsCount || 0,
          chatbot: {
            sessions: chatbotData?.length || 0,
            avgMessages: Math.round(avgMessages * 100) / 100
          }
        },
        recentActivity: {
          pageViews: recentPageViews || [],
          interactions: recentInteractions || []
        }
      });
    } catch (error) {
      console.error("Analytics fetch error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch analytics data" 
      });
    }
  });

  // Chatbot session tracking
  app.post("/api/chatbot/session", async (req, res) => {
    try {
      const { sessionId, messages, satisfaction } = req.body;

      const { data, error } = await supabase
        .from('chatbot_sessions')
        .upsert({
          session_id: sessionId,
          messages,
          satisfaction,
          end_time: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      res.json({ success: true, session: data });
    } catch (error) {
      console.error("Chatbot session tracking error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to track chatbot session" 
      });
    }
  });

  return app;
}