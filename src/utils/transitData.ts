
export interface Train {
  line: string;
  stops: number;
  delay: number;
}

export interface Route {
  trains: Train[];
  duration: number;
  transfers: number;
  startingStation: string;
  endingStation: string;
  arrivalTime: string;
}

// NYC Subway line colors
export function getTrainLineColor(line: string): string {
  const colors: Record<string, string> = {
    "1": "bg-red-600",
    "2": "bg-red-600",
    "3": "bg-red-600",
    "4": "bg-green-600",
    "5": "bg-green-600",
    "6": "bg-green-600",
    "7": "bg-purple-600",
    "A": "bg-blue-600",
    "C": "bg-blue-600",
    "E": "bg-blue-600",
    "B": "bg-orange-600",
    "D": "bg-orange-600",
    "F": "bg-orange-600",
    "M": "bg-orange-600",
    "G": "bg-lime-600",
    "J": "bg-amber-600",
    "Z": "bg-amber-600",
    "L": "bg-gray-600",
    "N": "bg-yellow-500",
    "Q": "bg-yellow-500",
    "R": "bg-yellow-500",
    "W": "bg-yellow-500",
    "S": "bg-gray-500",
  };
  
  return colors[line] || "bg-gray-400";
}

// Common NYC stations
export const commonStations: string[] = [
  "Times Square",
  "Grand Central",
  "Union Square",
  "Penn Station",
  "Atlantic Avenue",
  "Brooklyn Bridge",
  "Columbus Circle",
  "Herald Square",
  "Fulton Street",
  "Wall Street",
  "Canal Street",
  "Chambers Street",
  "Prospect Park",
  "Jackson Heights",
  "Flushing Main St",
  "Coney Island",
  "Barclays Center",
  "Jamaica Center",
  "Yankee Stadium",
  "World Trade Center"
];

// Map of which lines serve which stations (simplified)
export const stationLines: Record<string, string[]> = {
  "Times Square": ["1", "2", "3", "7", "N", "Q", "R", "W", "S"],
  "Grand Central": ["4", "5", "6", "7", "S"],
  "Union Square": ["4", "5", "6", "L", "N", "Q", "R", "W"],
  "Penn Station": ["1", "2", "3", "A", "C", "E"],
  "Atlantic Avenue": ["2", "3", "4", "5", "B", "D", "N", "Q", "R"],
  "Brooklyn Bridge": ["4", "5", "6", "J", "Z"],
  "Columbus Circle": ["1", "A", "B", "C", "D"],
  "Herald Square": ["B", "D", "F", "M", "N", "Q", "R", "W"],
  "Fulton Street": ["2", "3", "4", "5", "A", "C", "J", "Z"],
  "Wall Street": ["2", "3", "4", "5"],
  "Canal Street": ["1", "A", "C", "E", "N", "Q", "R", "W", "J", "Z"],
  "Chambers Street": ["1", "2", "3", "A", "C", "J", "Z"],
  "Prospect Park": ["B", "Q", "S"],
  "Jackson Heights": ["E", "F", "M", "R", "7"],
  "Flushing Main St": ["7"],
  "Coney Island": ["D", "F", "N", "Q"],
  "Barclays Center": ["2", "3", "4", "5", "B", "D", "N", "Q", "R"],
  "Jamaica Center": ["E", "J", "Z"],
  "Yankee Stadium": ["4", "B", "D"],
  "World Trade Center": ["1", "A", "C", "E", "R", "W"]
};
