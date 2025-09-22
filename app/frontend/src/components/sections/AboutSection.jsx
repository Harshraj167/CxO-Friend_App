import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  Brain, 
  Target, 
  Users, 
  TrendingUp,
  CheckCircle,
  Lightbulb
} from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Brain,
      title: "AI-First Approach",
      description: "Leveraging cutting-edge artificial intelligence to provide personalized business insights and recommendations."
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Focus on actionable strategies that drive real business growth and measurable outcomes for our users."
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Built specifically for non-business professionals who need expert guidance without the complexity."
    }
  ];

  const stats = [
    { number: "2025", label: "Founded", description: "Built for the future of business" },
    { number: "10K+", label: "Insights Generated", description: "AI-powered recommendations" },
    { number: "95%", label: "Success Rate", description: "User satisfaction score" },
    { number: "24/7", label: "AI Support", description: "Always available guidance" }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            About CXO Friend
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Your AI Business 
            <span className="text-green-500 block">Co-Founder</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We believe every entrepreneur deserves access to executive-level business expertise. 
            CXO Friend democratizes business intelligence through AI, making professional guidance 
            accessible to everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h3>
              <p className="text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
                "To empower non-business professionals with AI-driven insights and strategies 
                that traditionally required expensive consultants or years of experience. We're 
                building the future where anyone can access world-class business guidance 
                instantly, affordably, and intelligently."
              </p>
              <div className="flex items-center justify-center mt-8">
                <div className="flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-md">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-slate-800">AI-Powered • Accessible • Actionable</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors duration-300">
                    <value.icon className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-slate-200">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">By the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-4xl sm:text-5xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-slate-800 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Preview */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-slate-900 mb-6">Built by Entrepreneurs, for Entrepreneurs</h3>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Our team combines decades of business experience with cutting-edge AI expertise. 
            We've walked in your shoes and understand the challenges of building a business 
            without traditional executive support.
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="px-6 py-3 text-base border-green-500 text-green-600 hover:bg-green-50">
              <TrendingUp className="w-4 h-4 mr-2" />
              Join thousands of successful entrepreneurs
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;