import type { Handler } from "@netlify/functions";
import { createInsertSchema } from "drizzle-zod";
import { contacts } from "../../shared/schema";
import { supabase } from "../../server/supabase";

const insertContactSchema = createInsertSchema(contacts);

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const contactData = insertContactSchema.parse(JSON.parse(event.body || "{}"));

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, contact: data }),
    };
  } catch (error) {
    console.error("Contact submission error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Failed to submit contact form"
      }),
    };
  }
};