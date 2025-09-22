import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  CheckCircle,
  X,
  Crown,
  Zap,
  Users,
  Building,
  ArrowRight,
  Star
} from "lucide-react";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for solopreneurs and small business owners",
      icon: Zap,
      color: "border-slate-200",
      bgColor: "bg-white",
      headerColor: "bg-slate-50",
      monthly: 0,
      yearly: 0,
      popular: false,
      features: [
        "5 AI consultations per month",
        "Basic marketing insights",
        "Email support",
        "Access to knowledge base",
        "Mobile app access"
      ],
      limitations: [
        "Limited to marketing guidance only",
        "No priority support",
        "Basic analytics only"
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and teams",
      icon: Users,
      color: "border-green-500",
      bgColor: "bg-green-50",
      headerColor: "bg-green-500",
      monthly: 49,
      yearly: 39,
      popular: true,
      features: [
        "Unlimited AI consultations",
        "Full business domain access (Marketing, Operations, HR, Finance)",
        "Priority support",
        "Advanced analytics & insights",
        "Custom business templates",
        "Team collaboration tools",
        "Integration with popular tools",
        "Weekly strategy reports"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      description: "For established businesses with advanced needs",
      icon: Building,
      color: "border-purple-500",
      bgColor: "bg-purple-50",
      headerColor: "bg-purple-500",
      monthly: 149,
      yearly: 119,
      popular: false,
      features: [
        "Everything in Professional",
        "Dedicated AI business advisor",
        "Custom AI model training",
        "White-label solutions",
        "Advanced integrations (CRM, ERP)",
        "24/7 phone support",
        "Custom reporting & dashboards",
        "On-site training sessions",
        "API access",
        "Data export capabilities"
      ],
      limitations: []
    }
  ];

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You can start with our Starter plan for free and upgrade when you need more features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers."
    },
    {
      question: "How does the AI consultation work?",
      answer: "Simply ask your business questions through our platform, and our AI will provide detailed, actionable insights within minutes."
    }
  ];

  const getPrice = (plan) => {
    if (plan.monthly === 0) return "Free";
    const price = billingPeriod === "monthly" ? plan.monthly : plan.yearly;
    return `$${price}`;
  };

  const getSavings = (plan) => {
    if (plan.monthly === 0) return null;
    const yearlySavings = Math.round(((plan.monthly * 12 - plan.yearly * 12) / (plan.monthly * 12)) * 100);
    return billingPeriod === "yearly" ? `Save ${yearlySavings}%` : null;
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 mb-6">
            <Crown className="w-4 h-4 mr-2" />
            Pricing Plans
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Choose Your 
            <span className="text-green-500 block">Growth Plan</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free and scale as you grow. Every plan includes our core AI-powered 
            business guidance with increasing levels of sophistication and support.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 bg-slate-100 rounded-full p-2 max-w-xs mx-auto">
            <Button
              variant={billingPeriod === "monthly" ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-6 ${
                billingPeriod === "monthly" 
                  ? "bg-white shadow-sm text-slate-900" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingPeriod === "yearly" ? "default" : "ghost"}
              size="sm"
              className={`rounded-full px-6 ${
                billingPeriod === "yearly" 
                  ? "bg-white shadow-sm text-slate-900" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
              <Badge className="ml-2 bg-green-500 text-white text-xs">Save 20%</Badge>
            </Button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.bgColor} ${plan.color} border-2 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "transform scale-105 shadow-2xl" : "hover:-translate-y-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-2 shadow-lg">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className={`${plan.headerColor} ${plan.popular ? "text-white" : ""} rounded-t-lg`}>
                <div className="text-center">
                  <div className={`w-16 h-16 ${plan.popular ? "bg-white/20" : "bg-slate-100"} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className={`w-8 h-8 ${plan.popular ? "text-white" : "text-slate-600"}`} />
                  </div>
                  <CardTitle className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-slate-800"}`}>
                    {plan.name}
                  </CardTitle>
                  <p className={`text-sm ${plan.popular ? "text-white/80" : "text-slate-600"} mb-4`}>
                    {plan.description}
                  </p>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-slate-900"} mb-1`}>
                      {getPrice(plan)}
                      {plan.monthly > 0 && (
                        <span className={`text-lg font-normal ${plan.popular ? "text-white/70" : "text-slate-500"}`}>
                          /{billingPeriod === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    {getSavings(plan) && (
                      <Badge className="bg-green-500 text-white text-xs">
                        {getSavings(plan)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center opacity-60">
                      <X className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                      <span className="text-slate-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                      : plan.name === "Starter"
                        ? "bg-slate-800 hover:bg-slate-900 text-white"
                        : "bg-purple-500 hover:bg-purple-600 text-white"
                  } py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1`}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  {plan.name === "Starter" ? "Get Started Free" : `Choose ${plan.name}`}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  {faq.question}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16 bg-green-50 rounded-2xl p-8 border border-green-200">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Try CXO Friend risk-free. If you're not completely satisfied within 30 days, 
            we'll refund your payment, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;