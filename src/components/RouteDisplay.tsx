
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "@/utils/transitData";
import TrainInfo from "@/components/TrainInfo";
import RouteMap from "@/components/RouteMap";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface RouteDisplayProps {
  routes: Route[];
  isLoading: boolean;
}

const RouteDisplay: React.FC<RouteDisplayProps> = ({ routes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Card className="bg-card border-gold/30">
          <CardContent className="p-6">
            <Skeleton className="h-4 w-3/4 mb-4 bg-muted" />
            <Skeleton className="h-28 w-full bg-muted" />
          </CardContent>
        </Card>
        <Card className="bg-card border-gold/30">
          <CardContent className="p-6">
            <Skeleton className="h-4 w-3/4 mb-4 bg-muted" />
            <Skeleton className="h-28 w-full bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (routes.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>Enter your starting point and destination to find routes</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-gold">Recommended Routes</h2>
      
      {routes.map((route, index) => (
        <Card key={index} className="shadow-md hover:shadow-lg transition-shadow bg-card border-gold/30">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="font-semibold text-lg text-gold flex items-center">
                  Route {index + 1}
                  {index === 0 && (
                    <Badge className="ml-2 bg-gold text-black text-xs">Fastest</Badge>
                  )}
                </span>
                <p className="text-sm text-muted-foreground">
                  {route.duration} min • {route.transfers} transfer{route.transfers !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gold">{route.arrivalTime}</p>
                <p className="text-sm text-muted-foreground">Arrival Time</p>
              </div>
            </div>
            
            {/* Route Map */}
            <RouteMap route={route} />
            
            {/* Detailed train information */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {route.trains.map((train, tIndex) => (
                <React.Fragment key={tIndex}>
                  <TrainInfo train={train} showExitInfo={true} />
                  {tIndex < route.trains.length - 1 && (
                    <span className="text-gold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="text-sm border-t border-gold/30 pt-3 mt-2">
              <p className="mb-1">
                <span className="font-medium text-gold">Start:</span> {route.startingStation}
              </p>
              <p>
                <span className="font-medium text-gold">End:</span> {route.endingStation}
              </p>
              <p className="mt-1 text-muted-foreground italic text-xs">
                Commute time includes an average of 2 minutes per stop and {route.transfers * 5} minutes for transfers
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RouteDisplay;
