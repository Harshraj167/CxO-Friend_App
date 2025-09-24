import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  TrendingUp, 
  MessageSquare, 
  Target, 
  Users, 
  Mail, 
  BarChart3,
  Plus,
  Play,
  Pause
} from "lucide-react";

const MarketingPanel = () => {
  const [campaigns] = useState([
    {
      id: 1,
      name: "Q4 Product Launch",
      status: "Active",
      budget: "$5,000",
      reach: "12,500",
      conversions: "340",
      roi: "+145%"
    },
    {
      id: 2,
      name: "Holiday Email Series",
      status: "Scheduled",
      budget: "$1,200",
      reach: "8,900",
      conversions: "210",
      roi: "+89%"
    },
    {
      id: 3,
      name: "Social Media Boost",
      status: "Active",
      budget: "$800",
      reach: "25,600",
      conversions: "156",
      roi: "+67%"
    }
  ]);

  const handleAskCofounder = () => {
    // Mock function - will integrate with Perplexity API later
    console.log("Ask Cofounder clicked - Marketing");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Marketing</h1>
            </div>
            <p className="text-slate-600">AI-powered marketing automation and campaign management</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleAskCofounder} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Cofounder
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Reach</p>
                  <p className="text-2xl font-bold text-slate-900">47K</p>
                  <p className="text-xs text-emerald-600">+12% this month</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Conversions</p>
                  <p className="text-2xl font-bold text-slate-900">706</p>
                  <p className="text-xs text-emerald-600">+8% this month</p>
                </div>
                <Target className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">ROI</p>
                  <p className="text-2xl font-bold text-slate-900">+134%</p>
                  <p className="text-xs text-emerald-600">+5% this month</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                  <p className="text-xs text-slate-500">2 scheduled</p>
                </div>
                <Mail className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200">
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-slate-100">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-100">Analytics</TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-slate-100">Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Manage and monitor your marketing campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                          <Badge 
                            variant={campaign.status === "Active" ? "default" : "secondary"}
                            className={campaign.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            {campaign.status === "Active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-600">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Budget:</span>
                          <span className="ml-1 font-medium text-slate-900">{campaign.budget}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Reach:</span>
                          <span className="ml-1 font-medium text-slate-900">{campaign.reach}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Conversions:</span>
                          <span className="ml-1 font-medium text-slate-900">{campaign.conversions}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">ROI:</span>
                          <span className="ml-1 font-medium text-emerald-600">{campaign.roi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Marketing Analytics</CardTitle>
                <CardDescription>
                  Performance insights and data visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Analytics dashboard coming soon...</p>
                  <p className="text-sm">Your AI cofounder is preparing detailed insights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Marketing Automation</CardTitle>
                <CardDescription>
                  Set up automated workflows and triggers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Target className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Automation builder coming soon...</p>
                  <p className="text-sm">Create powerful marketing workflows with AI assistance</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketingPanel;