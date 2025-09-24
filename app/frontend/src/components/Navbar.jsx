import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, TrendingUp, Users, Briefcase, DollarSign } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: "Marketing", path: "/marketing", icon: TrendingUp },
    { name: "Operations", path: "/operations", icon: Briefcase },
    { name: "HR", path: "/hr", icon: Users },
    { name: "Finance", path: "/finance", icon: DollarSign },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://customer-assets.emergentagent.com/job_15b8fab8-fb3d-4217-adf7-e8486c801d9b/artifacts/byjxfo6o_Logo.png" 
              alt="CXO Friend" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold" style={{ color: '#3F51B5' }}>CXO Friend</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? "text-white"
                      : "hover:bg-gray-50"
                  }`}
                  style={isActivePath(item.path) ? { backgroundColor: '#3F51B5' } : { color: '#757575' }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Link to="/dashboard">
              <Button className="md-primary-btn hover:md-primary-btn text-white">
                Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-gray-300 hover:bg-gray-50" style={{ color: '#757575' }}>
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActivePath(item.path)
                            ? "text-white"
                            : "hover:bg-gray-50"
                        }`}
                        style={isActivePath(item.path) ? { backgroundColor: '#3F51B5' } : { color: '#757575' }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  <div className="flex flex-col space-y-2 pt-4">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full md-primary-btn text-white">
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50" style={{ color: '#757575' }}>
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;