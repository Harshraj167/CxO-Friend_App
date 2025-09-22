import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { 
  Target, 
  Settings, 
  Users, 
  DollarSign, 
  Brain, 
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useToast } from "../hooks/use-toast";

const LandingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: "Success!",
      description: "You've been added to our early access waitlist.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const features = [
    {
      icon: Target,
      title: "Marketing Hub",
      description: "AI-powered social media posts, campaign strategies, and performance tracking"
    },
    {
      icon: Settings,
      title: "Operations Dashboard", 
      description: "Smart workflows, task management, and project progress tracking"
    },
    {
      icon: Users,
      title: "HR Assistant",
      description: "Team onboarding, role assignments, and automated HR reporting"
    },
    {
      icon: DollarSign,
      title: "Finance Hub",
      description: "Budget planning, expense tracking, and cost optimization suggestions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_4f8a1562-6955-4d4c-9681-5226a4841636/artifacts/nsd6cgzs_Logo.png" 
                alt="CXO Friend Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-slate-800">CXO Friend</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                About Us
              </Button>
              <Button variant="ghost" className="text-slate-600 hover:text-slate-800">
                Contact
              </Button>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Demo Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Business Companion
            </Badge>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            CXO Friend – Your AI 
            <span className="text-green-500 block">Business Buddy</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smart AI guidance for Marketing, Operations, HR, and Finance. 
            Get expert-level business insights without the executive salary.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
            >
              Join the Early Access Waitlist
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-2 border-slate-300 hover:border-green-500 hover:text-green-600 transition-all duration-300"
              onClick={() => navigate("/dashboard")}
            >
              View Demo Dashboard
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-green-500" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-slate-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Join Our Early Access Community
            </h2>
            <p className="text-xl text-slate-600">
              Be among the first to experience AI-powered business management
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-slate-800">Early Access Waitlist</CardTitle>
              <CardDescription className="text-center text-slate-600">
                Get notified when CXO Friend launches and receive exclusive early access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWaitlistSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      required
                      className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">What business challenges are you facing? (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your biggest business pain points..."
                    rows={4}
                    className="border-slate-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Join Early Access Waitlist
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_4f8a1562-6955-4d4c-9681-5226a4841636/artifacts/nsd6cgzs_Logo.png" 
                  alt="CXO Friend Logo" 
                  className="h-8 w-auto filter brightness-0 invert"
                />
                <span className="text-xl font-bold">CXO Friend</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Empowering non-business professionals with AI-driven insights for Marketing, Operations, HR, and Finance.
              </p>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
              >
                Join Early Access
              </Button>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  hello@cxofriend.ai
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 CXO Friend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;