import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Users
} from "lucide-react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder",
      company: "TechStart Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616c04db413?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "CXO Friend transformed how I approach my business strategy. The marketing insights alone increased our conversion rate by 40% in just two months. It's like having a seasoned business advisor available 24/7.",
      results: "+40% conversion rate",
      category: "Marketing"
    },
    {
      name: "Michael Rodriguez",
      role: "CEO",
      company: "GrowthLab Inc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The operational insights from CXO Friend helped us streamline our processes and reduce costs by 25%. The AI recommendations are spot-on and actionable. Best business investment we've made this year.",
      results: "-25% operational costs",
      category: "Operations"
    },
    {
      name: "Emily Watson",
      role: "Co-founder",
      company: "Creative Minds Agency",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a creative professional, I struggled with the business side. CXO Friend made it simple to understand financial planning and HR management. Our team productivity increased by 35%.",
      results: "+35% team productivity",
      category: "HR & Finance"
    },
    {
      name: "David Park",
      role: "Entrepreneur",
      company: "EcoTech Ventures",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The AI-powered financial advice helped me secure funding and optimize our budget allocation. We went from struggling startup to profitable company in 6 months with CXO Friend's guidance.",
      results: "Achieved profitability",
      category: "Finance"
    },
    {
      name: "Lisa Thompson",
      role: "Founder",
      company: "HealthFirst App",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "CXO Friend's comprehensive approach to business growth is incredible. From marketing strategies to team management, every recommendation is data-driven and results-oriented. Game changer!",
      results: "200% user growth",
      category: "All-in-One"
    },
    {
      name: "James Wilson",
      role: "Managing Director",
      company: "Innovate Solutions",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The level of personalized business insights is remarkable. CXO Friend doesn't just give generic advice - it understands our specific industry and challenges. ROI was visible within weeks.",
      results: "3x ROI in first quarter",
      category: "Strategy"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "99%", label: "Would Recommend" },
    { number: "24h", label: "Average Response Time" }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30 mb-6">
            <Users className="w-4 h-4 mr-2" />
            Customer Success Stories
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Trusted by 
            <span className="text-green-400 block">10,000+ Entrepreneurs</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. See how CXO Friend is transforming businesses 
            across industries with AI-powered insights and strategies.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="mb-16">
          <Card className="bg-slate-800 border-slate-700 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Quote className="w-10 h-10 text-green-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl text-slate-200 leading-relaxed mb-6">
                    "{current.text}"
                  </blockquote>

                  {/* Results Badge */}
                  <div className="mb-6">
                    <Badge className="bg-green-500 text-white px-4 py-2 text-sm font-semibold">
                      {current.results}
                    </Badge>
                  </div>

                  {/* Author */}
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <img 
                      src={current.image} 
                      alt={current.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-white">{current.name}</div>
                      <div className="text-slate-400 text-sm">
                        {current.role} at {current.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTestimonial}
                  className="text-slate-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index === currentTestimonial ? "bg-green-400" : "bg-slate-600"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="text-slate-400 hover:text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <Card 
              key={index} 
              className={`bg-slate-800 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 ${
                index === currentTestimonial ? "ring-2 ring-green-500" : ""
              }`}
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* Results */}
                <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 mb-4">
                  {testimonial.results}
                </Badge>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 text-xs">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-6">
            Join Thousands of Successful Entrepreneurs
          </h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Start your journey to business success with AI-powered guidance that delivers real results.
          </p>
          <Button 
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Success Story
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;