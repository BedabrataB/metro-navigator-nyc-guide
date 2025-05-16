
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "@/utils/transitData";
import TrainInfo from "@/components/TrainInfo";
import { Skeleton } from "@/components/ui/skeleton";

interface RouteDisplayProps {
  routes: Route[];
  isLoading: boolean;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ routes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-28 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-28 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>Enter your starting point and destination to find routes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Recommended Routes</h2>
      
      {routes.map((route, index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="font-semibold text-lg">Route {index + 1}</span>
                <p className="text-sm text-gray-500">
                  {route.duration} min • {route.transfers} transfer{route.transfers !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{route.arrivalTime}</p>
                <p className="text-sm text-gray-500">Arrival Time</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              {route.trains.map((train, tIndex) => (
                <React.Fragment key={tIndex}>
                  <TrainInfo train={train} />
                  {tIndex < route.trains.length - 1 && (
                    <span className="text-gray-400">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="text-sm">
              <p className="mb-1">
                <span className="font-medium">Start:</span> {route.startingStation}
              </p>
              <p>
                <span className="font-medium">End:</span> {route.endingStation}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RouteDisplay;
