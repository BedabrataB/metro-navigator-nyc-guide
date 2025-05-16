
import React from "react";
import { getTrainLineColor } from "@/utils/transitData";

interface TrainLineProps {
  trainLine: string;
}

const TrainLine: React.FC<TrainLineProps> = ({ trainLine }) => {
  const bgColor = getTrainLineColor(trainLine);
  
  return (
    <div 
      className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}
    >
      {trainLine}
    </div>
  );
};

export default TrainLine;
