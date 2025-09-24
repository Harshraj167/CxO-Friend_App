import React from "react";
import { Building, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_15b8fab8-fb3d-4217-adf7-e8486c801d9b/artifacts/byjxfo6o_Logo.png" 
                alt="CXO Friend" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold md-text-primary">CXO Friend</span>
            </div>
            <p className="md-text-secondary mb-4 max-w-md">
              Your AI-powered virtual co-founder that handles Marketing, Operations, HR, and Finance automatically, 
              so you can focus on what you do best.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="md-text-secondary hover:text-[#3F51B5] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="md-text-secondary hover:text-[#3F51B5] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="md-text-secondary hover:text-[#3F51B5] transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 13.056 2 12.717 2 10c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 10 2zm0 5a3 3 0 100 6 3 3 0 000-6zm6.5-.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM10 9a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold md-text-primary uppercase tracking-wide mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 md-text-secondary" />
                <span className="text-sm md-text-secondary">Gujarat, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 md-text-secondary" />
                <a href="mailto:contact@cxofriend.com" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                  contact@cxofriend.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 md-text-secondary" />
                <a href="tel:+91-XXXX-XXXXXX" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                  +91-XXXX-XXXXXX
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold md-text-primary uppercase tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/marketing" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                  Marketing
                </a>
              </li>
              <li>
                <a href="/operations" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                  Operations
                </a>
              </li>
              <li>
                <a href="/hr" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                  HR
                </a>
              </li>
              <li>
                <a href="/finance" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                  Finance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm md-text-secondary">
              © 2024 CXO Friend. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm md-text-secondary hover:text-[#3F51B5] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;