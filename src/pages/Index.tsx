
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RouteForm from "@/components/RouteForm";
import RouteDisplay from "@/components/RouteDisplay";
import { calculateRoutes } from "@/utils/routeCalculator";
import { Route } from "@/utils/transitData";
import { TrainTrack } from "lucide-react";

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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-2">
          <TrainTrack className="text-gold mr-2" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gold">
            NYC Subway Surfer
          </h1>
        </div>
        <p className="text-center text-muted-foreground mb-8">
          Navigate the NYC subway system with ease & precision
        </p>
        
        <Card className="mb-6 shadow-lg border-gold/30 bg-card">
          <CardHeader className="bg-black border-b border-gold/30">
            <CardTitle className="text-gold flex items-center">
              Find Your Route
            </CardTitle>
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
