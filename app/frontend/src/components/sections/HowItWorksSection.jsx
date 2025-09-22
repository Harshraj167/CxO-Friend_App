import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  MessageSquare, 
  Brain, 
  Target, 
  CheckCircle,
  ArrowRight,
  Play,
  Lightbulb
} from "lucide-react";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Ask Your Business Question",
      description: "Simply describe your business challenge or ask for guidance on marketing, operations, HR, or finance.",
      icon: MessageSquare,
      details: [
        "Natural language questions accepted",
        "No technical jargon required",
        "Context-aware conversations",
        "Multiple business domains supported"
      ],
      example: '"How do I create a marketing strategy for my new product launch?"'
    },
    {
      id: 2,
      title: "AI Analyzes & Researches",
      description: "Our AI processes your question, analyzes current market data, and researches best practices.",
      icon: Brain,
      details: [
        "Real-time market analysis",
        "Industry-specific insights",
        "Competitive intelligence",
        "Best practice recommendations"
      ],
      example: "AI reviews 1000+ marketing case studies and current trends in 3 seconds"
    },
    {
      id: 3,
      title: "Get Personalized Strategy",
      description: "Receive detailed, actionable recommendations tailored to your specific situation and goals.",
      icon: Target,
      details: [
        "Step-by-step action plans",
        "Customized to your industry",
        "Budget-conscious solutions",
        "Timeline and milestone tracking"
      ],
      example: "Detailed 30-day marketing plan with specific tactics and metrics"
    },
    {
      id: 4,
      title: "Execute & Track Results",
      description: "Implement the recommendations and track your progress with ongoing AI support and adjustments.",
      icon: CheckCircle,
      details: [
        "Implementation guidance",
        "Progress tracking tools",
        "Performance optimization",
        "Continuous strategy refinement"
      ],
      example: "Weekly check-ins and strategy adjustments based on real results"
    }
  ];

  const benefits = [
    "Get expert-level advice in minutes, not months",
    "No expensive consultants or lengthy contracts",
    "Available 24/7 whenever you need guidance",
    "Continuously updated with latest business trends",
    "Tailored specifically to your business needs"
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            How It Works
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            From Question to 
            <span className="text-blue-500 block">Action Plan</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Get personalized business guidance in four simple steps. Our AI transforms your questions 
            into actionable strategies backed by real data and proven methodologies.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="mb-20">
          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <Button
                key={step.id}
                variant={activeStep === index ? "default" : "outline"}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeStep === index 
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg" 
                    : "text-slate-600 hover:text-blue-600 hover:border-blue-300"
                }`}
                onClick={() => setActiveStep(index)}
              >
                <step.icon className="w-4 h-4 mr-2" />
                Step {step.id}
              </Button>
            ))}
          </div>

          {/* Active Step Content */}
          <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-200 shadow-xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(steps[activeStep].icon, { 
                  className: "w-10 h-10 text-blue-500" 
                })}
              </div>
              <CardTitle className="text-3xl font-bold text-slate-800 mb-3">
                {steps[activeStep].title}
              </CardTitle>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {steps[activeStep].description}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Details */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {steps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-center text-slate-600">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Example */}
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Example:</h4>
                  <p className="text-slate-600 italic leading-relaxed">
                    {steps[activeStep].example}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="text-slate-600"
                >
                  Previous Step
                </Button>
                
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === activeStep ? "bg-blue-500" : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  className="text-slate-600"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="bg-slate-900 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Why Choose CXO Friend?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-slate-200">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Play className="w-5 h-5 mr-2" />
            Try It Now - It's Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;