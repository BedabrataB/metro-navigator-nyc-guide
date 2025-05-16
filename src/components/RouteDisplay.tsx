
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "@/utils/transitData";
import TrainInfo from "@/components/TrainInfo";
import RouteMap from "@/components/RouteMap";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrainFront } from "lucide-react";

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
                    <Badge className="ml-2 bg-gold/80 text-black text-xs">Fastest</Badge>
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
            
            {/* Journey details */}
            <div className="mb-6 mt-4 bg-secondary/50 p-3 rounded-md border border-gold/20">
              <div className="flex items-center mb-2">
                <TrainFront size={18} className="text-green-500 mr-2" />
                <span className="text-gold font-medium">BOARD AT:</span>
                <span className="ml-2 text-white">{route.startingStation}</span>
              </div>
              <div className="flex items-center">
                <TrainFront size={18} className="text-red-500 mr-2" />
                <span className="text-gold font-medium">EXIT AT:</span>
                <span className="ml-2 text-white">{route.endingStation}</span>
              </div>
            </div>
            
            {/* Detailed train information */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {route.trains.map((train, tIndex) => (
                <React.Fragment key={tIndex}>
                  <TrainInfo train={train} showExitInfo={true} stopIndex={tIndex} />
                  {tIndex < route.trains.length - 1 && (
                    <span className="text-gold">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="text-sm border-t border-gold/30 pt-3 mt-2">
              <p className="mt-1 text-muted-foreground italic text-xs">
                Fare: $2.75 per ride • Commute includes {route.transfers * 5} min for transfers
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RouteDisplay;
