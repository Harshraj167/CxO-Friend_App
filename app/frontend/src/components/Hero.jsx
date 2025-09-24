import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium mb-8" style={{ color: '#3F51B5' }}>
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Virtual Co-founder</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#212121' }}>
            Your Virtual Cofounder for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(to right, #3F51B5, #5C6BC0)' }}>
              Business Success
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: '#757575' }}>
            Empower your expertise with AI-driven business management. 
            CXO Friend handles Marketing, Operations, HR, and Finance automatically, 
            so you can focus on what you do best.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/dashboard">
              <Button size="lg" className="md-primary-btn hover:md-primary-btn text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" className="md-secondary-btn hover:md-secondary-btn text-white px-8 py-3 text-lg font-medium">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#3F51B5' }}>4</div>
              <div className="text-sm" style={{ color: '#757575' }}>Core Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#3F51B5' }}>24/7</div>
              <div className="text-sm" style={{ color: '#757575' }}>AI Assistance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#3F51B5' }}>100%</div>
              <div className="text-sm" style={{ color: '#757575' }}>Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#3F51B5' }}>∞</div>
              <div className="text-sm" style={{ color: '#757575' }}>Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;