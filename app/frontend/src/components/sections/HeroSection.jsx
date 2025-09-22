import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Brain, 
  ChevronRight, 
  Play,
  Target,
  Settings,
  Users,
  DollarSign
} from "lucide-react";
import { useIntegration } from "../../contexts/IntegrationContext";

const HeroSection = () => {
  const [animateStats, setAnimateStats] = useState(false);
  const { signInWithGoogle } = useIntegration();

  const floatingIcons = [
    { icon: Target, delay: "0ms", position: "top-20 left-10" },
    { icon: Settings, delay: "200ms", position: "top-32 right-20" },
    { icon: Users, delay: "400ms", position: "top-64 left-1/4" },
    { icon: DollarSign, delay: "600ms", position: "top-48 right-1/3" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} opacity-20 hidden lg:block animated-float`}
          style={{animationDelay: item.delay}}
        >
          <item.icon className="w-8 h-8 text-green-400" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <div className="flex justify-center mb-8 animated-slideUp">
            <Badge variant="secondary" className="px-6 py-3 text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30 backdrop-blur-sm">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Business Companion
            </Badge>
          </div>
          
          {/* Main Headline */}
          <div className="animated-slideUp" style={{animationDelay: '200ms'}}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your AI-Powered
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Business Co-Founder
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="animated-slideUp" style={{animationDelay: '400ms'}}>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your business ideas into reality with AI-driven insights for Marketing, Operations, HR, and Finance. 
              Get expert-level guidance without the executive price tag.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animated-slideUp" style={{animationDelay: '600ms'}}>
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 group"
              onClick={scrollToContact}
            >
              Start Your AI Journey
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 group"
              onClick={scrollToFeatures}
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              See How It Works
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400 hover:text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              onClick={signInWithGoogle}
            >
              Sign In with Google
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animated-slideUp" style={{animationDelay: '800ms'}}>
            {[
              { number: "10K+", label: "Business Insights Generated" },
              { number: "95%", label: "User Satisfaction Rate" },
              { number: "24/7", label: "AI Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl sm:text-5xl font-bold text-white mb-2 transition-all duration-1000 ${
                  animateStats ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}>
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animated-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;