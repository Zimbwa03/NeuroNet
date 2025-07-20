import { users, contacts, emailSubscriptions, insertUserSchema, insertContactSchema, insertEmailSubscriptionSchema, type InsertUser, type InsertContact, type InsertEmailSubscription } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();