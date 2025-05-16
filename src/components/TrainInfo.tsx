
import React from "react";
import { Train } from "@/utils/transitData";
import TrainLine from "@/components/TrainLine";
import { Badge } from "@/components/ui/badge";

interface TrainInfoProps {
  train: Train;
  showExitInfo?: boolean;
  stopIndex?: number; // Index of this train in the route
}

const TrainInfo: React.FC<TrainInfoProps> = ({ train, showExitInfo = false, stopIndex = 0 }) => {
  return (
    <div className="flex items-center">
      <TrainLine trainLine={train.line} />
      <div className="ml-2 flex flex-col">
        <span className="text-sm flex items-center">
          <span className="font-medium text-gold">{train.stops}</span> 
          <span className="ml-1 text-muted-foreground">stop{train.stops !== 1 ? 's' : ''}</span>
        </span>
        {showExitInfo && (
          <div className="flex flex-col">
            <Badge variant="outline" className="mt-1 border-gold text-gold text-xs">
              Board at entrance #{stopIndex + 1}
            </Badge>
            <Badge variant="outline" className="mt-1 border-gold text-gold text-xs">
              Exit at stop #{train.stops}
            </Badge>
          </div>
        )}
        {train.delay > 0 && (
          <span className="text-xs text-red-500 font-medium mt-1">
            {train.delay} min delay
          </span>
        )}
      </div>
    </div>
  );
};

export default TrainInfo;
