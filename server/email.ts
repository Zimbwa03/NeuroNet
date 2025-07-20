import * as nodemailer from 'nodemailer';
import { Contact } from '@shared/schema';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  fromEmail: string;
  toEmail: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  async sendContactNotification(contact: Contact): Promise<boolean> {
    try {
      const emailContent = `
        New Contact Form Submission - NeuroNet AI Solutions
        
        From: ${contact.firstName} ${contact.lastName} (${contact.email})
        Company: ${contact.company || 'Not provided'}
        Service Interest: ${contact.serviceInterest}
        
        Message:
        ${contact.message}
        
        Submitted: ${contact.createdAt?.toLocaleString() || 'Unknown'}
        
        ---
        Reply directly to this email to respond to ${contact.firstName}.
        This message was automatically forwarded from your NeuroNet AI Solutions website contact form.
      `;

      await this.transporter.sendMail({
        from: this.config.fromEmail, // Your SMTP email
        replyTo: contact.email, // User's email for easy replies
        to: this.config.toEmail, // Your company email
        subject: `New Contact: ${contact.firstName} ${contact.lastName} - ${contact.serviceInterest}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
      });

      console.log(`Contact notification email sent for: ${contact.email}`);
      return true;
    } catch (error) {
      console.error('Failed to send contact notification email:', error);
      return false;
    }
  }

  async sendNewsletter(toEmail: string, content: { subject: string; html: string; text: string }): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `NeuroNet AI Solutions <${this.config.fromEmail}>`,
        to: toEmail,
        subject: content.subject,
        text: content.text,
        html: content.html,
      });

      console.log(`Newsletter sent to: ${toEmail}`);
      return true;
    } catch (error) {
      console.error(`Failed to send newsletter to ${toEmail}:`, error);
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      console.log('Testing email connection with config:', {
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        secure: this.config.secure
      });
      await this.transporter.verify();
      console.log('Email service connection verified');
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

// Factory function to create email service based on environment variables
export function createEmailService(): EmailService | null {
  const requiredVars = ['COMPANY_EMAIL', 'EMAIL_PASSWORD'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('Email service not configured. Missing environment variables:', missingVars);
    return null;
  }

  // Auto-detect email provider settings based on email domain
  const email = process.env.COMPANY_EMAIL!;
  const domain = email.split('@')[1].toLowerCase();
  
  let host = 'smtp.gmail.com';
  let port = 587;
  let secure = false;
  
  if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live')) {
    host = 'smtp-mail.outlook.com';
    port = 587;
  } else if (domain.includes('yahoo')) {
    host = 'smtp.mail.yahoo.com';
    port = 587;
  } else if (domain.includes('gmail')) {
    // Try alternative Gmail settings
    host = 'smtp.gmail.com';
    port = 465;
    secure = true;
  }

  const config: EmailConfig = {
    host,
    port,
    secure,
    user: email,
    password: process.env.EMAIL_PASSWORD!,
    fromEmail: email,
    toEmail: email, // Send to your own company email
  };

  return new EmailService(config);
}