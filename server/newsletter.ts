
import { EmailService } from './email';
import { storage } from './storage';

export interface NewsletterContent {
  subject: string;
  html: string;
  text: string;
}

export class NewsletterService {
  private emailService: EmailService | null;

  constructor(emailService: EmailService | null) {
    this.emailService = emailService;
  }

  generateDailyNewsletter(): NewsletterContent {
    const tips = [
      {
        title: "Automate Customer Support",
        content: "AI chatbots can handle 80% of customer inquiries instantly, reducing response time from hours to seconds while cutting support costs by up to 60%."
      },
      {
        title: "Streamline Data Entry",
        content: "Automated data processing can eliminate manual entry errors and save 15-20 hours per week for small businesses, allowing teams to focus on growth activities."
      },
      {
        title: "Smart Inventory Management",
        content: "AI-powered inventory systems predict demand patterns and optimize stock levels, reducing waste by 30% and preventing stockouts that cost businesses revenue."
      },
      {
        title: "Automated Social Media",
        content: "AI can schedule, create, and optimize social media posts across all platforms, increasing engagement by 40% while saving 10+ hours weekly."
      },
      {
        title: "Intelligent Email Marketing",
        content: "AI personalizes email campaigns based on customer behavior, improving open rates by 25% and conversion rates by 35% compared to generic campaigns."
      },
      {
        title: "Financial Process Automation",
        content: "Automate invoicing, expense tracking, and financial reporting to reduce accounting time by 50% and eliminate human errors in financial data."
      }
    ];

    const todayTip = tips[Math.floor(Math.random() * tips.length)];
    const currentDate = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const subject = `Transform Your Business Today: ${todayTip.title} | NeuroNet AI Solutions`;

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #0a0a0a; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; background-color: #000000; }
            .header { background: linear-gradient(135deg, #00d4ff, #0099cc); padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; color: #000; font-weight: bold; }
            .content { padding: 30px; }
            .tip-section { background-color: #1a1a1a; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #00d4ff; }
            .tip-title { font-size: 22px; font-weight: bold; color: #00d4ff; margin-bottom: 15px; }
            .tip-content { font-size: 16px; line-height: 1.6; color: #e5e5e5; }
            .cta-section { text-align: center; padding: 30px 0; }
            .cta-button { display: inline-block; background: #00d4ff; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; }
            .benefits { background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .benefit-item { margin: 10px 0; }
            .footer { background-color: #0a0a0a; padding: 20px; text-align: center; font-size: 12px; color: #888; }
            .unsubscribe { color: #00d4ff; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🧠 NeuroNet AI Solutions</h1>
                <p style="margin: 10px 0 0 0; color: #000; font-size: 16px;">Daily AI Business Transformation Tips</p>
            </div>
            
            <div class="content">
                <p style="font-size: 16px; color: #ccc;">Good morning! Here's your daily insight on ${currentDate}</p>
                
                <div class="tip-section">
                    <div class="tip-title">💡 Today's AI Business Tip: ${todayTip.title}</div>
                    <div class="tip-content">${todayTip.content}</div>
                </div>

                <div class="benefits">
                    <h3 style="color: #00d4ff; margin-top: 0;">🚀 How NeuroNet Can Transform Your Business:</h3>
                    <div class="benefit-item">✅ <strong>Free AI Assessment</strong> - Identify automation opportunities in your business</div>
                    <div class="benefit-item">✅ <strong>Custom Solutions</strong> - Tailored AI implementations for your specific needs</div>
                    <div class="benefit-item">✅ <strong>Proven Results</strong> - Average 40% efficiency improvement within 3 months</div>
                    <div class="benefit-item">✅ <strong>Ongoing Support</strong> - Dedicated team to ensure your success</div>
                </div>

                <div class="cta-section">
                    <p style="font-size: 18px; margin-bottom: 20px;">Ready to automate your business processes?</p>
                    <a href="https://your-repl-url.replit.app/contact" class="cta-button">Schedule Free Consultation</a>
                </div>

                <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <h4 style="color: #00d4ff; margin-top: 0;">📞 Get Started Today:</h4>
                    <p>Phone: +263 78 549 4594<br>
                    Email: ngonidzashezimbwa95@gmail.com<br>
                    Website: <a href="https://your-repl-url.replit.app" style="color: #00d4ff;">Visit Our Website</a></p>
                </div>
            </div>

            <div class="footer">
                <p>© ${new Date().getFullYear()} NeuroNet AI Solutions. All rights reserved.</p>
                <p>You received this email because you subscribed to our daily AI business tips.</p>
                <p><a href="https://your-repl-url.replit.app/unsubscribe?email={{email}}" class="unsubscribe">Unsubscribe</a></p>
            </div>
        </div>
    </body>
    </html>
    `;

    const text = `
NeuroNet AI Solutions - Daily Business Tip (${currentDate})

Today's AI Business Tip: ${todayTip.title}

${todayTip.content}

How NeuroNet Can Transform Your Business:
• Free AI Assessment - Identify automation opportunities
• Custom Solutions - Tailored AI implementations  
• Proven Results - Average 40% efficiency improvement
• Ongoing Support - Dedicated success team

Ready to automate your business? 
Contact us: +263 78 549 4594
Email: ngonidzashezimbwa95@gmail.com
Website: https://your-repl-url.replit.app/contact

Unsubscribe: https://your-repl-url.replit.app/unsubscribe?email={{email}}
    `;

    return { subject, html, text };
  }

  async sendDailyNewsletter(): Promise<{ sent: number; failed: number }> {
    if (!this.emailService) {
      console.log('Email service not configured, skipping newsletter');
      return { sent: 0, failed: 0 };
    }

    const subscribers = await storage.getEmailSubscriptions(true);
    const newsletter = this.generateDailyNewsletter();
    
    let sent = 0;
    let failed = 0;

    console.log(`Sending newsletter to ${subscribers.length} subscribers`);

    for (const subscriber of subscribers) {
      try {
        const personalizedHtml = newsletter.html.replace(/{{email}}/g, encodeURIComponent(subscriber.email));
        const personalizedText = newsletter.text.replace(/{{email}}/g, encodeURIComponent(subscriber.email));

        await this.emailService.sendNewsletter(subscriber.email, {
          subject: newsletter.subject,
          html: personalizedHtml,
          text: personalizedText
        });

        await storage.updateLastEmailSent(subscriber.email);
        sent++;
        console.log(`Newsletter sent to: ${subscriber.email}`);

        // Add delay to avoid overwhelming the email service
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to send newsletter to ${subscriber.email}:`, error);
        failed++;
      }
    }

    console.log(`Newsletter campaign completed: ${sent} sent, ${failed} failed`);
    return { sent, failed };
  }
}

// Create newsletter service instance
export function createNewsletterService(emailService: EmailService | null): NewsletterService {
  return new NewsletterService(emailService);
}
