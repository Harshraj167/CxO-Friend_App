import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  ArrowRight,
  Heart,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
        { name: "API Documentation", href: "#", external: true },
        { name: "Integrations", href: "#", external: true }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Team", href: "#", external: true },
        { name: "Careers", href: "#", external: true },
        { name: "Press Kit", href: "#", external: true },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#", external: true },
        { name: "Help Center", href: "#", external: true },
        { name: "Business Templates", href: "#", external: true },
        { name: "Case Studies", href: "#testimonials" },
        { name: "Webinars", href: "#", external: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#", external: true },
        { name: "Terms of Service", href: "#", external: true },
        { name: "Cookie Policy", href: "#", external: true },
        { name: "Data Processing", href: "#", external: true },
        { name: "Security", href: "#", external: true }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/cxofriend" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/cxofriend" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/cxofriend" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/cxofriend" },
    { name: "GitHub", icon: Github, href: "https://github.com/cxofriend" }
  ];

  const handleLinkClick = (href, external = false) => {
    if (external) {
      // For external links, you would typically open in new tab
      console.log(`Opening external link: ${href}`);
      return;
    }
    
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_4f8a1562-6955-4d4c-9681-5226a4841636/artifacts/nsd6cgzs_Logo.png" 
                alt="CXO Friend Logo" 
                className="h-10 w-auto filter brightness-0 invert"
              />
              <span className="text-2xl font-bold">CXO Friend</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Empowering entrepreneurs with AI-driven business insights. Transform your ideas into 
              successful ventures with personalized guidance for Marketing, Operations, HR, and Finance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-slate-400">
                <Mail className="w-4 h-4 mr-3" />
                <span>hello@cxofriend.ai</span>
              </div>
              <div className="flex items-center text-slate-400">
                <Phone className="w-4 h-4 mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-slate-400">
                <MapPin className="w-4 h-4 mr-3" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest business insights and AI tips delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Button size="sm" className="bg-green-500 hover:bg-green-600 px-4">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button
                          onClick={() => handleLinkClick(link.href, link.external)}
                          className="text-slate-400 hover:text-white transition-colors duration-200 text-left flex items-center group"
                        >
                          {link.name}
                          {link.external && (
                            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-slate-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(social.href, true)}
                  className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                GDPR Ready
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Enterprise Grade
              </Badge>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-slate-400 text-sm">
              <span>&copy; {currentYear} CXO Friend. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> in San Francisco
              </span>
            </div>

            {/* Back to Top */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Back to Top
              <ArrowRight className="w-4 h-4 ml-2 rotate-[-90deg]" />
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs leading-relaxed max-w-4xl mx-auto">
            CXO Friend is an AI-powered business advisory platform designed to help entrepreneurs and 
            business professionals make informed decisions. Our AI technology provides personalized 
            insights but should not replace professional business, legal, or financial advice. 
            Always consult with qualified professionals for critical business decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;