import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Users,
  Building
} from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useIntegration } from "../../contexts/IntegrationContext";

const ContactSection = () => {
  const { toast } = useToast();
  const { saveToNotion, registerUser } = useIntegration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    businessType: "",
    message: "",
    phone: "",
    interestedIn: ""
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@cxofriend.ai",
      description: "Get in touch anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM PST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "San Francisco, CA",
      description: "Schedule a meeting"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "< 24 hours",
      description: "We reply quickly"
    }
  ];

  const businessTypes = [
    "Startup (0-10 employees)",
    "Small Business (11-50 employees)",
    "Medium Business (51-200 employees)",
    "Enterprise (200+ employees)",
    "Freelancer/Consultant",
    "Non-profit Organization",
    "Other"
  ];

  const interests = [
    "Marketing & Growth",
    "Operations & Efficiency",
    "HR & Team Management",
    "Finance & Planning",
    "All Business Areas",
    "Custom Enterprise Solution"
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Notion (using placeholder integration)
      await saveToNotion({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        businessType: formData.businessType,
        interestedIn: formData.interestedIn,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date().toISOString()
      });

      // Register user (using placeholder backend)
      await registerUser({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        businessType: formData.businessType,
        source: "contact_form"
      });

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours. Welcome to CXO Friend!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        businessType: "",
        message: "",
        phone: "",
        interestedIn: ""
      });

    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly at hello@cxofriend.ai",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            Get In Touch
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Ready to Transform 
            <span className="text-blue-500 block">Your Business?</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Start your journey with CXO Friend today. Our team is here to help you 
            unlock your business potential with AI-powered insights and strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-xl border border-slate-200">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 flex items-center">
                <Send className="w-6 h-6 mr-3 text-blue-500" />
                Send Us a Message
              </CardTitle>
              <p className="text-slate-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select 
                      value={formData.businessType} 
                      onValueChange={(value) => handleSelectChange("businessType", value)}
                    >
                      <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestedIn">Interested In</Label>
                    <Select 
                      value={formData.interestedIn} 
                      onValueChange={(value) => handleSelectChange("interestedIn", value)}
                    >
                      <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="What interests you most?" />
                      </SelectTrigger>
                      <SelectContent>
                        {interests.map((interest) => (
                          <SelectItem key={interest} value={interest}>
                            {interest}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your business challenges and goals..."
                    rows={5}
                    required
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-white shadow-xl border border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center">
                  <Building className="w-6 h-6 mr-3 text-blue-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">{info.title}</h4>
                      <p className="text-slate-900 font-medium">{info.value}</p>
                      <p className="text-slate-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                  Why Choose CXO Friend?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "AI-powered business insights available 24/7",
                  "Personalized strategies for your specific industry",
                  "No long-term contracts or hidden fees",
                  "Proven results from 10,000+ entrepreneurs",
                  "Expert support when you need it most"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-900 text-white shadow-xl">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-400 mb-2">10K+</div>
                    <div className="text-slate-300 text-sm">Happy Customers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">24h</div>
                    <div className="text-slate-300 text-sm">Response Time</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">4.9★</div>
                    <div className="text-slate-300 text-sm">Average Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">99%</div>
                    <div className="text-slate-300 text-sm">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;