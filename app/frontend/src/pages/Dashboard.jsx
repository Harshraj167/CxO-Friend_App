import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  DollarSign, 
  MessageSquare, 
  BarChart3,
  Clock,
  CheckCircle2
} from "lucide-react";

const Dashboard = () => {
  const modules = [
    {
      icon: TrendingUp,
      title: "Marketing",
      path: "/marketing",
      description: "Campaigns & Lead Generation",
      status: "Active",
      stats: "12 campaigns running",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Briefcase,
      title: "Operations",
      path: "/operations",
      description: "Process & Workflow Management",
      status: "Optimizing",
      stats: "8 workflows automated",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "HR",
      path: "/hr",
      description: "Team & Talent Management",
      status: "Active",
      stats: "5 positions open",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: DollarSign,
      title: "Finance",
      path: "/finance",
      description: "Budget & Financial Planning",
      status: "Reviewing",
      stats: "$24.5K budget remaining",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const recentActivities = [
    { action: "Marketing campaign 'Q4 Launch' started", time: "2 hours ago", type: "marketing" },
    { action: "New hire onboarding completed", time: "4 hours ago", type: "hr" },
    { action: "Monthly financial report generated", time: "6 hours ago", type: "finance" },
    { action: "Workflow automation updated", time: "1 day ago", type: "operations" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Your AI co-founder is managing your business operations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-slate-900">23</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Automations</p>
                  <p className="text-2xl font-bold text-slate-900">12</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Efficiency</p>
                  <p className="text-2xl font-bold text-slate-900">94%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Saved Time</p>
                  <p className="text-2xl font-bold text-slate-900">15h</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">
                          {module.title}
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          {module.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={module.status === "Active" ? "default" : "secondary"}
                      className={module.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                    >
                      {module.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600">{module.stats}</p>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-800">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Ask Cofounder
                      </Button>
                      <Link to={module.path}>
                        <Button size="sm" className="bg-slate-800 hover:bg-slate-700 text-white">
                          Open Panel
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates from your AI co-founder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-800">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;