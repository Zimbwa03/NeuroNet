import { Link } from "wouter";
import { Brain, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import NewsletterSignup from "@/components/newsletter/newsletter-signup";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark py-12 border-t border-electric-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <BrainLogo className="w-8 h-8" />
              <span className="text-xl font-bold">NeuroNet AI Solutions</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering businesses with cutting-edge AI and automation solutions for the digital age.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 NeuroNet AI Solutions. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-electric-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-electric-blue transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-electric-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-electric-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-electric-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services" className="hover:text-electric-blue transition-colors">
                  AI Consultations
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-electric-blue transition-colors">
                  Agentic Automations
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-electric-blue transition-colors">
                  Business Analysis
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-electric-blue transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Daily AI Tips</h3>
            <NewsletterSignup variant="compact" className="mb-6" />

            <h4 className="text-md font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/neuronet-ai-solutions-195a3a375?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bs8ztd73jQaaTEVdG5lXMLw%3D%3D"
                className="p-2 bg-electric-blue rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-electric-blue rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Twitter className="w-5 h-5 text-black" />
              </a>
              <a
                href="#"
                className="p-2 bg-electric-blue rounded-lg hover:bg-blue-400 transition-colors"
              >
                <Facebook className="w-5 h-5 text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}