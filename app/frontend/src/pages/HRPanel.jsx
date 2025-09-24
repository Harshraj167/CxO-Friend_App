import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  UserPlus, 
  Calendar, 
  Award, 
  TrendingUp,
  Plus,
  Search,
  UserCheck,
  Clock
} from "lucide-react";

const HRPanel = () => {
  const [openPositions] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      applicants: 24,
      status: "Active",
      posted: "3 days ago"
    },
    {
      id: 2,
      title: "Marketing Specialist",
      department: "Marketing",
      type: "Full-time", 
      applicants: 18,
      status: "Active",
      posted: "1 week ago"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      type: "Contract",
      applicants: 31,
      status: "Review",
      posted: "5 days ago"
    }
  ]);

  const [recentHires] = useState([
    { name: "Sarah Chen", role: "Product Manager", startDate: "Dec 1, 2024", status: "Onboarding" },
    { name: "David Kim", role: "Backend Developer", startDate: "Nov 28, 2024", status: "Completed" },
    { name: "Lisa Wang", role: "Content Writer", startDate: "Nov 25, 2024", status: "Completed" }
  ]);

  const handleAskCofounder = () => {
    // Mock function - will integrate with Perplexity API later
    console.log("Ask Cofounder clicked - HR");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">HR</h1>
            </div>
            <p className="text-slate-600">Talent management and employee engagement solutions</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleAskCofounder} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Cofounder
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Employees</p>
                  <p className="text-2xl font-bold text-slate-900">47</p>
                  <p className="text-xs text-emerald-600">+3 this month</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Open Positions</p>
                  <p className="text-2xl font-bold text-slate-900">5</p>
                  <p className="text-xs text-blue-600">2 urgent</p>
                </div>
                <UserPlus className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Applications</p>
                  <p className="text-2xl font-bold text-slate-900">73</p>
                  <p className="text-xs text-emerald-600">+15 this week</p>
                </div>
                <Search className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Engagement</p>
                  <p className="text-2xl font-bold text-slate-900">89%</p>
                  <p className="text-xs text-emerald-600">+2% this month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="recruitment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200">
            <TabsTrigger value="recruitment" className="data-[state=active]:bg-slate-100">Recruitment</TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-slate-100">Employees</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-slate-100">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="recruitment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Open Positions</CardTitle>
                  <CardDescription>
                    Current job openings and recruitment status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {openPositions.map((position) => (
                      <div key={position.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{position.title}</h3>
                            <p className="text-sm text-slate-600">{position.department} • {position.type}</p>
                          </div>
                          <Badge 
                            variant={position.status === "Active" ? "default" : "secondary"}
                            className={position.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                          >
                            {position.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span>{position.applicants} applicants</span>
                          <span>Posted {position.posted}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Recent Hires</CardTitle>
                  <CardDescription>
                    New team members and onboarding progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentHires.map((hire, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900">{hire.name}</h3>
                            <p className="text-sm text-slate-600">{hire.role}</p>
                          </div>
                          <Badge 
                            variant={hire.status === "Completed" ? "default" : "secondary"}
                            className={hire.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}
                          >
                            {hire.status}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-slate-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Started {hire.startDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>
                  Manage your team and employee information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <UserCheck className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Employee directory coming soon...</p>
                  <p className="text-sm">Manage profiles, departments, and organizational structure</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track employee performance and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Award className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Performance dashboard coming soon...</p>
                  <p className="text-sm">AI-powered insights into team performance and growth</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HRPanel;