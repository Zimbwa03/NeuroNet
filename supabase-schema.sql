
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Email subscriptions table
CREATE TABLE email_subscriptions (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_email_sent TIMESTAMP
);

-- Page views table
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  session_id TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- User interactions table
CREATE TABLE user_interactions (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  element TEXT,
  page TEXT NOT NULL,
  data TEXT,
  session_id TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Chatbot sessions table
CREATE TABLE chatbot_sessions (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages INTEGER DEFAULT 0,
  start_time TIMESTAMP DEFAULT NOW(),
  end_time TIMESTAMP,
  satisfaction INTEGER
);

-- Enable Row Level Security (RLS) if needed
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your security requirements)
CREATE POLICY "Enable insert for authenticated users" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON email_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON user_interactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for authenticated users" ON chatbot_sessions FOR INSERT WITH CHECK (true);
