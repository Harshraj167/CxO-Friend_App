// Mock data for CXO Friend application
// This file contains sample data used throughout the app for demonstration purposes
// In production, this will be replaced with actual API calls

export const mockDashboardStats = {
  activeTasks: 23,
  automations: 12,
  efficiency: 94,
  savedTime: 15
};

export const mockRecentActivities = [
  { action: "Marketing campaign 'Q4 Launch' started", time: "2 hours ago", type: "marketing" },
  { action: "New hire onboarding completed", time: "4 hours ago", type: "hr" },
  { action: "Monthly financial report generated", time: "6 hours ago", type: "finance" },
  { action: "Workflow automation updated", time: "1 day ago", type: "operations" }
];

export const mockMarketingCampaigns = [
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
];

export const mockOperationsWorkflows = [
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
];

export const mockHRPositions = [
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
];

export const mockHRRecentHires = [
  { name: "Sarah Chen", role: "Product Manager", startDate: "Dec 1, 2024", status: "Onboarding" },
  { name: "David Kim", role: "Backend Developer", startDate: "Nov 28, 2024", status: "Completed" },
  { name: "Lisa Wang", role: "Content Writer", startDate: "Nov 25, 2024", status: "Completed" }
];

export const mockFinanceExpenses = [
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
];

export const mockFinanceBudgets = [
  { category: "Marketing", allocated: 15000, spent: 8500, remaining: 6500 },
  { category: "Operations", allocated: 12000, spent: 9200, remaining: 2800 },
  { category: "HR", allocated: 8000, spent: 4300, remaining: 3700 },
  { category: "R&D", allocated: 10000, spent: 6800, remaining: 3200 }
];

// User authentication mock
export const mockAuthState = {
  isAuthenticated: false,
  user: null,
  login: (email, password) => {
    console.log("Mock login:", { email, password });
    return Promise.resolve({ success: true, user: { email, name: "Demo User" } });
  },
  logout: () => {
    console.log("Mock logout");
    return Promise.resolve();
  }
};

// AI Cofounder responses mock
export const mockCofounterResponses = {
  marketing: "Based on your current campaigns, I recommend increasing the Q4 Product Launch budget by 20% to capitalize on the strong performance. The ROI of 145% indicates excellent potential for scaling.",
  operations: "Your Customer Onboarding workflow is performing well at 94% efficiency. I suggest implementing the new automation rules I've prepared to reduce the 12 pending tasks.",
  hr: "With 5 open positions and strong application rates, I recommend prioritizing the Senior Frontend Developer role. The 24 applicants show high market demand.",
  finance: "Your current expense patterns show healthy growth. However, the Operations budget is at 77% utilization - consider reviewing software license costs for optimization opportunities."
};

export default {
  mockDashboardStats,
  mockRecentActivities,
  mockMarketingCampaigns,
  mockOperationsWorkflows,
  mockHRPositions,
  mockHRRecentHires,
  mockFinanceExpenses,
  mockFinanceBudgets,
  mockAuthState,
  mockCofounterResponses
};