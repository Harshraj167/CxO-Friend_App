import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Target, 
  Settings, 
  Users, 
  DollarSign,
  Brain,
  BarChart3,
  Clock,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const mainFeatures = [
    {
      icon: Target,
      title: "Marketing Intelligence",
      description: "AI-powered marketing strategies, content creation, and campaign optimization",
      color: "from-red-400 to-pink-400",
      bgColor: "bg-red-50 border-red-200",
      features: [
        "Social media content generation",
        "Marketing strategy development",
        "Campaign performance analysis",
        "Competitor intelligence",
        "Customer persona creation",
        "Content calendar planning"
      ]
    },
    {
      icon: Settings,
      title: "Operations Optimization",
      description: "Streamline processes, improve efficiency, and automate workflows",
      color: "from-blue-400 to-indigo-400",
      bgColor: "bg-blue-50 border-blue-200",
      features: [
        "Process automation recommendations",
        "Workflow optimization",
        "Quality control systems",
        "Resource allocation planning",
        "Performance metrics tracking",
        "Operational cost analysis"
      ]
    },
    {
      icon: Users,
      title: "HR & Team Management",
      description: "Build stronger teams with AI-driven HR insights and management tools",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50 border-green-200",
      features: [
        "Recruitment strategy planning",
        "Team performance optimization",
        "Employee engagement insights",
        "Training program development",
        "Compensation planning",
        "Conflict resolution guidance"
      ]
    },
    {
      icon: DollarSign,
      title: "Financial Planning",
      description: "Smart financial decisions with AI-powered analysis and forecasting",
      color: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-50 border-yellow-200",
      features: [
        "Budget planning and tracking",
        "Cash flow forecasting",
        "Investment recommendations",
        "Cost optimization strategies",
        "Financial risk assessment",
        "Revenue growth planning"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Engine",
      description: "Powered by latest AI models for accurate, contextual business advice"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track progress and measure success with comprehensive analytics"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Get business guidance whenever you need it, day or night"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security to protect your business data and conversations"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get actionable recommendations in seconds, not hours or days"
    },
    {
      icon: Globe,
      title: "Global Market Data",
      description: "Access worldwide market trends and industry-specific insights"
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200 mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Features & Capabilities
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to
            <span className="text-purple-500 block">Grow Your Business</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive AI-powered tools covering all aspects of business management. 
            From marketing strategies to financial planning, we've got you covered.
          </p>
        </div>

        {/* Main Features */}
        <div className="mb-20">
          {/* Feature Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {mainFeatures.map((feature, index) => (
              <Button
                key={index}
                variant={activeFeature === index ? "default" : "outline"}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeFeature === index 
                    ? "bg-purple-500 hover:bg-purple-600 text-white shadow-lg" 
                    : "text-slate-600 hover:text-purple-600 hover:border-purple-300"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <feature.icon className="w-4 h-4 mr-2" />
                {feature.title}
              </Button>
            ))}
          </div>

          {/* Active Feature Content */}
          <Card className={`${mainFeatures[activeFeature].bgColor} shadow-xl border-2`}>
            <CardHeader className="text-center pb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${mainFeatures[activeFeature].color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                {React.createElement(mainFeatures[activeFeature].icon, { 
                  className: "w-10 h-10 text-white" 
                })}
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-3">
                {mainFeatures[activeFeature].title}
              </CardTitle>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {mainFeatures[activeFeature].description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainFeatures[activeFeature].features.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white rounded-lg p-4 shadow-sm border border-slate-200">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  size="lg"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Try {mainFeatures[activeFeature].title}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features Grid */}
        <div>
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Built for Modern Businesses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-slate-600 group-hover:text-purple-500 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of entrepreneurs already using CXO Friend to grow their businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1"
              onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;