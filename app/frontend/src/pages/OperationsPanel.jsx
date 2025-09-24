import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Briefcase, 
  MessageSquare, 
  Workflow, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus,
  Play,
  Pause,
  Settings
} from "lucide-react";

const OperationsPanel = () => {
  const [workflows] = useState([
    {
      id: 1,
      name: "Customer Onboarding",
      status: "Running",
      efficiency: "94%",
      completedTasks: "156",
      pendingTasks: "12",
      lastRun: "2 hours ago"
    },
    {
      id: 2,
      name: "Invoice Processing",
      status: "Optimizing",
      efficiency: "87%",
      completedTasks: "89",
      pendingTasks: "5",
      lastRun: "30 mins ago"
    },
    {
      id: 3,
      name: "Inventory Management",
      status: "Running",
      efficiency: "91%",
      completedTasks: "234",
      pendingTasks: "8",
      lastRun: "1 hour ago"
    }
  ]);

  const handleAskCofounder = () => {
    // Mock function - will integrate with Perplexity API later
    console.log("Ask Cofounder clicked - Operations");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Operations</h1>
            </div>
            <p className="text-slate-600">Streamline workflows and optimize operational efficiency</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleAskCofounder} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Cofounder
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Workflows</p>
                  <p className="text-2xl font-bold text-slate-900">8</p>
                  <p className="text-xs text-emerald-600">2 optimizing</p>
                </div>
                <Workflow className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Completed Tasks</p>
                  <p className="text-2xl font-bold text-slate-900">479</p>
                  <p className="text-xs text-emerald-600">+23% this week</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Efficiency</p>
                  <p className="text-2xl font-bold text-slate-900">91%</p>
                  <p className="text-xs text-emerald-600">+4% this week</p>
                </div>
                <Settings className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-slate-900">25</p>
                  <p className="text-xs text-orange-600">3 urgent</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200">
            <TabsTrigger value="workflows" className="data-[state=active]:bg-slate-100">Workflows</TabsTrigger>
            <TabsTrigger value="processes" className="data-[state=active]:bg-slate-100">Processes</TabsTrigger>
            <TabsTrigger value="optimization" className="data-[state=active]:bg-slate-100">Optimization</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Active Workflows</CardTitle>
                <CardDescription>
                  Monitor and manage your automated business processes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-slate-900">{workflow.name}</h3>
                          <Badge 
                            variant={workflow.status === "Running" ? "default" : "secondary"}
                            className={workflow.status === "Running" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                          >
                            {workflow.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            {workflow.status === "Running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-600">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Efficiency:</span>
                          <span className="ml-1 font-medium text-emerald-600">{workflow.efficiency}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Completed:</span>
                          <span className="ml-1 font-medium text-slate-900">{workflow.completedTasks}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Pending:</span>
                          <span className="ml-1 font-medium text-orange-600">{workflow.pendingTasks}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Last Run:</span>
                          <span className="ml-1 font-medium text-slate-900">{workflow.lastRun}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processes" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Process Management</CardTitle>
                <CardDescription>
                  Design and optimize your business processes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <Workflow className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Process builder coming soon...</p>
                  <p className="text-sm">Create and customize business processes with AI guidance</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>AI Optimization</CardTitle>
                <CardDescription>
                  Let AI analyze and improve your operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Optimization engine coming soon...</p>
                  <p className="text-sm">AI-powered recommendations for operational excellence</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OperationsPanel;