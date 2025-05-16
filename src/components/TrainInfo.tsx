
import React from "react";
import { Train } from "@/utils/transitData";
import TrainLine from "@/components/TrainLine";

interface TrainInfoProps {
  train: Train;
}

const TrainInfo: React.FC<TrainInfoProps> = ({ train }) => {
  return (
    <div className="flex items-center">
      <TrainLine trainLine={train.line} />
      <span className="ml-1 text-sm">
        {train.stops} stop{train.stops !== 1 ? 's' : ''}
      </span>
      {train.delay > 0 && (
        <span className="ml-2 text-xs text-red-600 font-medium">
          {train.delay} min delay
        </span>
      )}
    </div>
  );
};

export default TrainInfo;
