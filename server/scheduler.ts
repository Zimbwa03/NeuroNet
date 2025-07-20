
import { createEmailService } from "./email";
import { createNewsletterService } from "./newsletter";

// Newsletter scheduler function
export async function runDailyNewsletter() {
  console.log('Starting daily newsletter campaign...');
  
  try {
    const emailService = createEmailService();
    if (!emailService) {
      console.log('Email service not configured. Please set up COMPANY_EMAIL and EMAIL_PASSWORD environment variables.');
      return;
    }

    const newsletterService = createNewsletterService(emailService);
    const results = await newsletterService.sendDailyNewsletter();
    
    console.log(`Newsletter campaign completed successfully:`, results);
    return results;
  } catch (error) {
    console.error('Failed to run daily newsletter campaign:', error);
    throw error;
  }
}

// If this file is run directly, execute the newsletter
if (require.main === module) {
  runDailyNewsletter()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
