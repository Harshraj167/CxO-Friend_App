import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { TrendingUp, Users, Briefcase, DollarSign, ArrowRight } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Marketing",
      description: "AI-driven marketing strategies, campaign management, and customer acquisition automation.",
      path: "/marketing",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Briefcase,
      title: "Operations",
      description: "Streamline workflows, process optimization, and operational efficiency management.",
      path: "/operations",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "HR",
      description: "Talent management, recruitment automation, and employee engagement solutions.",
      path: "/hr",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: DollarSign,
      title: "Finance",
      description: "Financial planning, budget management, and automated accounting processes.",
      path: "/finance",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#212121' }}>
            Four Pillars of Business Excellence
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#757575' }}>
            Our AI co-founder manages every aspect of your business with intelligent automation and strategic insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white hover:-translate-y-1" style={{ backgroundColor: '#FFFFFF' }}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`} style={{ backgroundColor: feature.color === 'from-blue-500 to-blue-600' ? '#3F51B5' : feature.color === 'from-emerald-500 to-emerald-600' ? '#009688' : feature.color === 'from-purple-500 to-purple-600' ? '#5C6BC0' : '#FFC107' }}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-slate-900" style={{ color: '#212121' }}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-6 leading-relaxed" style={{ color: '#757575' }}>
                    {feature.description}
                  </CardDescription>
                  <Link to={feature.path}>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-gray-50 hover:text-slate-900" style={{ color: '#757575' }}>
                      Explore {feature.title}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-2xl p-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#212121' }}>
            Ready to Transform Your Business?
          </h3>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: '#757575' }}>
            Join thousands of professionals who've automated their business operations with CXO Friend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="md-primary-btn hover:md-primary-btn text-white px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" className="md-secondary-btn hover:md-secondary-btn text-white px-8">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;