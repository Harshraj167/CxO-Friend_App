import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  DollarSign, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  PieChart,
  Plus,
  Download,
  Receipt,
  Wallet
} from "lucide-react";

const FinancePanel = () => {
  const [expenses] = useState([
    {
      id: 1,
      category: "Marketing",
      amount: "$2,340",
      date: "Dec 15, 2024",
      status: "Approved",
      description: "Q4 Campaign Ads"
    },
    {
      id: 2,
      category: "Operations",
      amount: "$1,250",
      date: "Dec 14, 2024",
      status: "Pending",
      description: "Software Licenses"
    },
    {
      id: 3,
      category: "HR",
      amount: "$890",
      date: "Dec 13, 2024",
      status: "Approved",
      description: "Recruitment Tools"
    }
  ]);

  const [budgets] = useState([
    { category: "Marketing", allocated: 15000, spent: 8500, remaining: 6500 },
    { category: "Operations", allocated: 12000, spent: 9200, remaining: 2800 },
    { category: "HR", allocated: 8000, spent: 4300, remaining: 3700 },
    { category: "R&D", allocated: 10000, spent: 6800, remaining: 3200 }
  ]);

  const handleAskCofounder = () => {
    // Mock function - will integrate with Perplexity API later
    console.log("Ask Cofounder clicked - Finance");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Finance</h1>
            </div>
            <p className="text-slate-600">Financial planning, budget management, and automated accounting</p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleAskCofounder} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Cofounder
            </Button>
            <Button className="bg-slate-800 hover:bg-slate-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">$124K</p>
                  <p className="text-xs text-emerald-600">+18% this month</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Expenses</p>
                  <p className="text-2xl font-bold text-slate-900">$32K</p>
                  <p className="text-xs text-orange-600">+5% this month</p>
                </div>
                <CreditCard className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Net Profit</p>
                  <p className="text-2xl font-bold text-slate-900">$92K</p>
                  <p className="text-xs text-emerald-600">+24% this month</p>
                </div>
                <Wallet className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Budget Used</p>
                  <p className="text-2xl font-bold text-slate-900">64%</p>
                  <p className="text-xs text-slate-500">$28.8K remaining</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200">
            <TabsTrigger value="expenses" className="data-[state=active]:bg-slate-100">Expenses</TabsTrigger>
            <TabsTrigger value="budgets" className="data-[state=active]:bg-slate-100">Budgets</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-slate-100">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Expenses</CardTitle>
                    <CardDescription>
                      Track and manage your business expenses
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-slate-300">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Receipt className="h-5 w-5 text-slate-400" />
                          <div>
                            <h3 className="font-semibold text-slate-900">{expense.description}</h3>
                            <p className="text-sm text-slate-600">{expense.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-900">{expense.amount}</p>
                          <Badge 
                            variant={expense.status === "Approved" ? "default" : "secondary"}
                            className={expense.status === "Approved" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}
                          >
                            {expense.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">
                        {expense.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>
                  Monitor budget allocation and spending across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgets.map((budget, index) => {
                    const percentUsed = ((budget.spent / budget.allocated) * 100).toFixed(0);
                    const isOverBudget = budget.spent > budget.allocated * 0.9;
                    
                    return (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-slate-900">{budget.category}</h3>
                          <Badge 
                            variant={isOverBudget ? "destructive" : "default"}
                            className={isOverBudget ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-800"}
                          >
                            {percentUsed}% used
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Allocated: ${budget.allocated.toLocaleString()}</span>
                            <span className="text-slate-600">Remaining: ${budget.remaining.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(percentUsed, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-sm text-slate-600">
                            Spent: ${budget.spent.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>
                  Generate and view comprehensive financial reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-slate-500">
                  <PieChart className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p>Financial reporting coming soon...</p>
                  <p className="text-sm">AI-generated insights and automated financial reports</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinancePanel;