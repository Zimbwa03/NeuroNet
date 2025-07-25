# NeuroNet AI Solutions - Replit Documentation

## Overview

This is a full-stack web application for NeuroNet AI Solutions, a professional AI consulting and automation company. The application serves as a comprehensive business website with contact management capabilities, AI chatbot integration, analytics tracking, and email automation features. Built using modern web technologies.

**Note**: This is NOT a calculator application as mentioned in some descriptions, but rather a complete business website for an AI consulting company.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React-based single-page application using Vite
- **Backend**: Express.js REST API server
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Built for production with static file serving

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with custom configuration

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API design
- **Middleware**: JSON parsing, URL encoding, request logging

### Database Schema
The application uses PostgreSQL with two main tables:
- **users**: Basic user management (id, username, password)  
- **contacts**: Contact form submissions (id, firstName, lastName, email, company, serviceInterest, message, createdAt)

### Email System
- **Nodemailer Integration**: Automatic email forwarding using Nodemailer
- **Auto-detection**: Automatically detects SMTP settings based on email provider
- **Reply-to Setup**: Customer emails are set as reply-to for easy responses
- **Database First**: All messages saved to database before email forwarding

### UI Design System
- **Primary Colors**: Black background (#000000), Electric Blue accent (#00BFFF)
- **Typography**: Montserrat font family with responsive sizing
- **Theme**: Dark theme with custom CSS variables
- **Components**: Comprehensive component library including forms, cards, buttons, navigation

## Data Flow

### Contact Form Submission
1. User fills out contact form on `/contact` page
2. Form data validated using Zod schema on client-side
3. POST request sent to `/api/contact` endpoint
4. Server validates data and stores in database
5. Success/error response returned to client
6. User feedback provided via toast notifications

### Page Navigation
1. Client-side routing handled by Wouter
2. Pages include: Home, Services, How It Works, About, Contact
3. Responsive navigation with mobile menu support
4. Fixed header with logo and navigation links

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **Database**: Drizzle ORM, Neon Database serverless driver
- **UI Components**: Radix UI primitives, Lucide React icons
- **Validation**: Zod for schema validation
- **Styling**: Tailwind CSS, class-variance-authority
- **HTTP Client**: TanStack Query for API calls

### Development Dependencies
- **Build Tools**: Vite, TypeScript, ESBuild
- **CSS Processing**: PostCSS, Autoprefixer
- **Database Tools**: Drizzle Kit for migrations

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Production Setup
- Static files served from Express server
- Environment variables required: `DATABASE_URL`
- Server runs on configurable port with production optimizations
- Built for deployment on platforms supporting Node.js

### Development Workflow
- `npm run dev`: Starts development server with hot reloading
- `npm run build`: Creates production build
- `npm run start`: Runs production server
- `npm run check`: TypeScript type checking
- `npm run db:push`: Apply database schema changes

### Key Features
- Professional business website for AI consulting company
- Responsive design optimized for all devices
- Contact form with PostgreSQL database storage and email forwarding
- Modern UI with smooth animations and hover effects
- SEO-optimized with proper meta tags and descriptions
- Neural network-inspired visual design elements
- Automatic email notifications for contact form submissions
- Global market positioning (removed Zimbabwe-specific references)
- Intelligent AI chatbot "Neury" with DeepSeek integration
- Smart response system: AI for complex queries, preset for simple ones
- Custom brain logo SVG integration throughout chatbot interface
- Proper text formatting and responsive chat window design

### Recent Changes (July 20, 2025)
- Enhanced chatbot formatting: removed markdown artifacts from AI responses
- Integrated custom brain logo SVG for Neury's avatar across all instances
- Improved chat window layout with proper text wrapping and spacing
- Added AI-powered response indicators to distinguish AI vs preset responses
- Optimized DeepSeek integration guidelines to prevent formatting issues
- Updated contact information display to prevent overflow in chat window

### Netlify Deployment Configuration (July 20, 2025)
- Created Netlify-specific configuration files (netlify.toml, _redirects)
- Added serverless functions for API endpoints (netlify/functions/api.ts, contact.ts)
- Configured build process for static frontend and serverless backend
- Added comprehensive deployment documentation (README-netlify.md)
- Integrated @netlify/functions and serverless-http packages
- Created environment variables template (.env.example)