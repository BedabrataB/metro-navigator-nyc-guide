
import React from "react";
import { Train } from "@/utils/transitData";
import TrainLine from "@/components/TrainLine";
import { Badge } from "@/components/ui/badge";

interface TrainInfoProps {
  train: Train;
  showExitInfo?: boolean;
}

const TrainInfo: React.FC<TrainInfoProps> = ({ train, showExitInfo = false }) => {
  return (
    <div className="flex items-center">
      <TrainLine trainLine={train.line} />
      <div className="ml-2 flex flex-col">
        <span className="text-sm flex items-center">
          <span className="font-medium text-gold">{train.stops}</span> 
          <span className="ml-1 text-muted-foreground">stop{train.stops !== 1 ? 's' : ''}</span>
          {showExitInfo && (
            <Badge variant="outline" className="ml-2 border-gold text-gold text-xs">
              Exit at stop #{train.stops}
            </Badge>
          )}
        </span>
        {train.delay > 0 && (
          <span className="text-xs text-red-500 font-medium">
            {train.delay} min delay
          </span>
        )}
      </div>
    </div>
  );
};

export default TrainInfo;
