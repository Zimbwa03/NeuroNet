# NeuroNet AI Solutions - Netlify Deployment Guide

## Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Database**: PostgreSQL database (recommended: Neon, Supabase, or Railway)
3. **Repository**: Push this code to GitHub/GitLab/Bitbucket

## Deployment Steps

### 1. Database Setup

Choose one of these database providers:

**Option A: Neon Database (Recommended)**
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

**Option B: Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string

**Option C: Railway**
1. Go to [railway.app](https://railway.app)
2. Create a PostgreSQL database
3. Copy the connection string

### 2. Deploy to Netlify

1. **Connect Repository**:
   - Go to Netlify Dashboard
   - Click "New site from Git"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select this repository

2. **Build Settings**:
   - Build command: `node netlify-build.js`
   - Publish directory: `dist/public`
   - Functions directory: `dist/functions`

3. **Environment Variables**:
   Add these in Netlify Dashboard > Site Settings > Environment Variables:
   ```
   DATABASE_URL=your-database-connection-string
   DEEPSEEK_API_KEY=your-deepseek-api-key (optional)
   SMTP_HOST=smtp.gmail.com (optional)
   SMTP_PORT=587 (optional)
   SMTP_USER=your-email@gmail.com (optional)
   SMTP_PASS=your-app-password (optional)
   FROM_EMAIL=your-email@gmail.com (optional)
   TO_EMAIL=your-business-email@gmail.com (optional)
   ```

### 3. Database Migration

After deployment, run the database migration:

1. Install Drizzle Kit locally: `npm install -g drizzle-kit`
2. Set your DATABASE_URL environment variable
3. Run: `drizzle-kit push`

Or use the online Drizzle Studio:
1. Go to [local.drizzle.studio](https://local.drizzle.studio)
2. Connect with your database URL
3. Apply the schema from `shared/schema.ts`

### 4. Custom Domain (Optional)

1. Go to Netlify Dashboard > Domain Management
2. Add your custom domain
3. Configure DNS records as instructed

## File Structure for Netlify

```
├── netlify.toml              # Netlify configuration
├── netlify/
│   └── functions/
│       └── api.ts           # Serverless function for API routes
├── _redirects               # Redirect rules
├── netlify-build.js         # Custom build script
├── dist/
│   ├── public/             # Frontend build output
│   └── functions/          # Serverless functions build output
└── ...
```

## Key Differences from Replit

1. **Serverless Functions**: API routes run as Netlify Functions instead of Express server
2. **Static Frontend**: React app is built and served as static files
3. **Database**: Requires external PostgreSQL database
4. **Environment Variables**: Set in Netlify Dashboard
5. **Build Process**: Uses custom build script for both frontend and functions

## Troubleshooting

### Build Failures
- Check build logs in Netlify Dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check if database allows connections from Netlify's IP ranges
- Test connection string locally first

### Function Timeouts
- Netlify Functions have a 10-second timeout on free plan
- Consider upgrading for longer-running operations
- Optimize database queries

### API Routes Not Working
- Check if `/.netlify/functions/api/` prefix is being used
- Verify _redirects file is in place
- Check function logs in Netlify Dashboard

## Performance Tips

1. **Database Connection Pooling**: Use connection pooling for better performance
2. **Caching**: Implement caching for frequently accessed data
3. **Edge Functions**: Consider Netlify Edge Functions for faster response times
4. **CDN**: Leverage Netlify's global CDN for static assets

## Support

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- [Drizzle ORM Docs](https://orm.drizzle.team)