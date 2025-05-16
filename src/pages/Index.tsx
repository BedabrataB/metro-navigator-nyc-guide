
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RouteForm from "@/components/RouteForm";
import RouteDisplay from "@/components/RouteDisplay";
import { calculateRoutes } from "@/utils/routeCalculator";
import { Route } from "@/utils/transitData";

const Index = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRouteSearch = (origin: string, destination: string) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const calculatedRoutes = calculateRoutes(origin, destination);
      setRoutes(calculatedRoutes);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">NYC Transit Guide</h1>
        
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle>Find Your Route</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <RouteForm onSearch={handleRouteSearch} />
          </CardContent>
        </Card>
        
        <RouteDisplay routes={routes} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
