
import React from "react";
import { Route } from "@/utils/transitData";

interface RouteMapProps {
  route: Route;
}

const RouteMap: React.FC<RouteMapProps> = ({ route }) => {
  // Calculate total stops for positioning
  const totalStops = route.trains.reduce((sum, train) => sum + train.stops, 0);
  
  return (
    <div className="subway-map mt-4 mb-2 px-4 py-6">
      {/* Main route path */}
      <div className="route-path" style={{ top: '50%', left: '5%', width: '90%' }}></div>
      
      {/* Starting station marker */}
      <div className="station-marker start-station" style={{ top: 'calc(50% - 6px)', left: '5%' }}></div>
      
      {/* Generate transfer station markers */}
      {route.trains.reduce((acc: React.ReactNode[], train, index) => {
        // Skip the last train as its end is the final destination
        if (index < route.trains.length - 1) {
          const previousStops = route.trains
            .slice(0, index + 1)
            .reduce((sum, t) => sum + t.stops, 0);
            
          const position = 5 + (previousStops / totalStops) * 90;
          
          acc.push(
            <div 
              key={`transfer-${index}`}
              className="station-marker" 
              style={{ top: 'calc(50% - 6px)', left: `${position}%` }}
            />
          );
        }
        return acc;
      }, [])}
      
      {/* Ending station marker */}
      <div className="station-marker end-station" style={{ top: 'calc(50% - 6px)', left: '95%' }}></div>
      
      {/* Station labels */}
      <div className="absolute text-xs text-gold" style={{ top: 'calc(50% + 10px)', left: '3%' }}>
        {route.startingStation}
      </div>
      
      <div className="absolute text-xs text-gold" style={{ top: 'calc(50% + 10px)', right: '3%' }}>
        {route.endingStation}
      </div>
    </div>
  );
};

export default RouteMap;
