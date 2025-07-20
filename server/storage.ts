import { 
  users, contacts, emailSubscriptions, pageViews, userInteractions, chatbotSessions,
  insertUserSchema, insertContactSchema, insertEmailSubscriptionSchema, 
  insertPageViewSchema, insertUserInteractionSchema, insertChatbotSessionSchema,
  type InsertUser, type InsertContact, type InsertEmailSubscription,
  type InsertPageView, type InsertUserInteraction, type InsertChatbotSession
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async createEmailSubscription(data: InsertEmailSubscription) {
    const validatedData = insertEmailSubscriptionSchema.parse(data);
    const [subscription] = await db.insert(emailSubscriptions).values(validatedData).returning();
    return subscription;
  }

  async getEmailSubscriptions(activeOnly = true) {
    const query = db.select().from(emailSubscriptions);
    if (activeOnly) {
      return await query.where(eq(emailSubscriptions.isActive, true));
    }
    return await query.execute();
  }

  async updateLastEmailSent(email: string) {
    await db
      .update(emailSubscriptions)
      .set({ lastEmailSent: new Date() })
      .where(eq(emailSubscriptions.email, email));
  }

  async unsubscribeEmail(email: string) {
    await db
      .update(emailSubscriptions)
      .set({ isActive: false })
      .where(eq(emailSubscriptions.email, email));
  }

  // Analytics methods
  async trackPageView(data: InsertPageView) {
    const validatedData = insertPageViewSchema.parse(data);
    const [pageView] = await db.insert(pageViews).values(validatedData).returning();
    return pageView;
  }

  async trackUserInteraction(data: InsertUserInteraction) {
    const validatedData = insertUserInteractionSchema.parse(data);
    const [interaction] = await db.insert(userInteractions).values(validatedData).returning();
    return interaction;
  }

  async createChatbotSession(data: InsertChatbotSession) {
    const validatedData = insertChatbotSessionSchema.parse(data);
    const [session] = await db.insert(chatbotSessions).values(validatedData).returning();
    return session;
  }

  async updateChatbotSession(sessionId: string, data: Partial<InsertChatbotSession>) {
    await db
      .update(chatbotSessions)
      .set(data)
      .where(eq(chatbotSessions.sessionId, sessionId));
  }

  // Analytics retrieval methods
  async getAnalyticsDashboard(days = 30) {
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Page views by page
    const pageViewStats = await db
      .select({
        page: pageViews.page,
        count: count()
      })
      .from(pageViews)
      .where(sql`${pageViews.timestamp} >= ${since}`)
      .groupBy(pageViews.page);

    // User interactions by type
    const interactionStats = await db
      .select({
        type: userInteractions.type,
        count: count()
      })
      .from(userInteractions)
      .where(sql`${userInteractions.timestamp} >= ${since}`)
      .groupBy(userInteractions.type);

    // Contact submissions
    const contactStats = await db
      .select({ count: count() })
      .from(contacts)
      .where(sql`${contacts.createdAt} >= ${since}`);

    // Email subscriptions
    const subscriptionStats = await db
      .select({ count: count() })
      .from(emailSubscriptions)
      .where(sql`${emailSubscriptions.createdAt} >= ${since}`);

    // Chatbot usage
    const chatbotStats = await db
      .select({ 
        sessions: count(),
        avgMessages: sql<number>`AVG(${chatbotSessions.messages})`
      })
      .from(chatbotSessions)
      .where(sql`${chatbotSessions.startTime} >= ${since}`);

    return {
      pageViews: pageViewStats,
      interactions: interactionStats,
      contacts: contactStats[0]?.count || 0,
      subscriptions: subscriptionStats[0]?.count || 0,
      chatbot: chatbotStats[0] || { sessions: 0, avgMessages: 0 }
    };
  }

  async getRecentActivity(limit = 50) {
    const recentPageViews = await db
      .select()
      .from(pageViews)
      .orderBy(desc(pageViews.timestamp))
      .limit(limit);

    const recentInteractions = await db
      .select()
      .from(userInteractions)
      .orderBy(desc(userInteractions.timestamp))
      .limit(limit);

    return {
      pageViews: recentPageViews,
      interactions: recentInteractions
    };
  }
}

export const storage = new DatabaseStorage();