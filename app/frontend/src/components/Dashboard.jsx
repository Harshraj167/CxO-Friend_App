import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Target, 
  Settings, 
  Users, 
  DollarSign, 
  Bell,
  Plus,
  Home,
  BarChart3,
  User,
  Lightbulb,
  Twitter,
  Linkedin,
  TrendingUp,
  FileText,
  CheckCircle,
  UserPlus,
  Shield,
  PiggyBank,
  CreditCard
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import mockData from "./mockData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(mockData.notifications);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleActionClick = (action, panel) => {
    toast({
      title: `${action} - ${panel}`,
      description: "This is a demo placeholder. Full AI integration coming soon!",
    });
  };

  const panels = [
    {
      title: "Marketing Hub",
      icon: Target,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-500",
      actions: [
        { name: "Generate LinkedIn Post", icon: Linkedin, placeholder: mockData.marketing.linkedinPost },
        { name: "Generate Twitter Post", icon: Twitter, placeholder: mockData.marketing.twitterPost },
        { name: "Suggest Marketing Strategy", icon: TrendingUp, placeholder: mockData.marketing.strategy },
        { name: "Track Campaign Performance", icon: BarChart3, placeholder: mockData.marketing.performance }
      ]
    },
    {
      title: "Operations Dashboard",
      icon: Settings,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-500",
      actions: [
        { name: "Create SOP / Workflow", icon: FileText, placeholder: mockData.operations.sop },
        { name: "Assign Task", icon: CheckCircle, placeholder: mockData.operations.task },
        { name: "Track Project Progress", icon: BarChart3, placeholder: mockData.operations.progress },
        { name: "Daily Operations Summary", icon: Settings, placeholder: mockData.operations.summary }
      ]
    },
    {
      title: "HR Assistant",
      icon: Users,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-500",
      actions: [
        { name: "Onboard New Team Member", icon: UserPlus, placeholder: mockData.hr.onboarding },
        { name: "Assign Roles", icon: Shield, placeholder: mockData.hr.roles },
        { name: "Generate HR Report", icon: FileText, placeholder: mockData.hr.report },
        { name: "Team Management", icon: Users, placeholder: mockData.hr.team }
      ]
    },
    {
      title: "Finance Hub",
      icon: DollarSign,
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-yellow-600",
      actions: [
        { name: "Create Budget Plan", icon: PiggyBank, placeholder: mockData.finance.budget },
        { name: "Track Expenses", icon: CreditCard, placeholder: mockData.finance.expenses },
        { name: "Generate Financial Summary", icon: BarChart3, placeholder: mockData.finance.summary },
        { name: "Suggest Cost Optimizations", icon: TrendingUp, placeholder: mockData.finance.optimizations }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://customer-assets.emergentagent.com/job_4f8a1562-6955-4d4c-9681-5226a4841636/artifacts/nsd6cgzs_Logo.png" 
                  alt="CXO Friend Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-lg font-bold text-slate-800">CXO Friend</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" className="flex items-center space-x-2 text-green-600 font-medium">
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2 text-slate-600 hover:text-slate-800">
                  <FileText className="w-4 h-4" />
                  <span>Projects</span>
                </Button>
                <Button variant="ghost" className="flex items-center space-x-2 text-slate-600 hover:text-slate-800">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                    {notifications.length}
                  </Badge>
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-800">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification, index) => (
                        <div key={index} className="p-3 border-b border-slate-100 hover:bg-slate-50 last:border-b-0">
                          <p className="text-sm text-slate-700">{notification}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => navigate("/")}
                className="border-slate-300 hover:border-green-500 hover:text-green-600"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Daily AI Tip */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-6 h-6 text-green-500" />
              <CardTitle className="text-green-800">Today's AI Tip</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 text-lg">
              {mockData.dailyTip}
            </p>
          </CardContent>
        </Card>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {panels.map((panel, index) => (
            <Card key={index} className={`${panel.color} shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <panel.icon className={`w-6 h-6 ${panel.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-800">{panel.title}</CardTitle>
                      <CardDescription className="text-slate-600">AI-guided actions</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-slate-600 hover:text-slate-800">
                    Notion Sync
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {panel.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-white hover:bg-slate-50 border-slate-200 hover:border-green-300 text-slate-700 hover:text-green-600 transition-all duration-200"
                      onClick={() => handleActionClick(action.name, panel.title)}
                    >
                      <action.icon className="w-4 h-4 mr-2" />
                      {action.name}
                    </Button>
                    <div className="ml-6 p-3 bg-white rounded-md border border-slate-200 text-sm text-slate-600">
                      <strong>Preview:</strong> {action.placeholder}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Quick Add Button */}
        <Button 
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40"
          onClick={() => toast({
            title: "Quick Add",
            description: "Choose what you'd like to add: Task, Campaign, Budget, or Team Member",
          })}
        >
          <Plus className="w-8 h-8 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;