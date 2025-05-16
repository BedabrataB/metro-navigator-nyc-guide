
import { Route, Train, commonStations, stationLines } from "./transitData";

// Function to calculate routes between two points
export function calculateRoutes(origin: string, destination: string): Route[] {
  // For demonstration purposes, we'll generate some mock routes
  // In a real app, this would use actual MTA data and algorithms
  
  // Try to match origin and destination to common stations
  const closestOrigin = findClosestMatch(origin, commonStations);
  const closestDestination = findClosestMatch(destination, commonStations);
  
  // Generate routes based on matched stations
  return generateMockRoutes(closestOrigin, closestDestination);
}

// Find the closest match from our list of common stations
function findClosestMatch(input: string, stations: string[]): string {
  // This is a simple implementation - a real system would use better matching
  const lowerInput = input.toLowerCase();
  
  // First, try for exact matches
  for (const station of stations) {
    if (station.toLowerCase() === lowerInput) {
      return station;
    }
  }
  
  // Then try for partial matches
  for (const station of stations) {
    if (station.toLowerCase().includes(lowerInput)) {
      return station;
    }
  }
  
  // If no match, just return one of the common stations
  return stations[Math.floor(Math.random() * stations.length)];
}

// Generate mock routes between stations
function generateMockRoutes(origin: string, destination: string): Route[] {
  if (origin === destination) {
    return [{
      trains: [],
      duration: 0,
      transfers: 0,
      startingStation: origin,
      endingStation: destination,
      arrivalTime: getCurrentTime()
    }];
  }
  
  const routes: Route[] = [];
  const originLines = stationLines[origin] || [];
  const destLines = stationLines[destination] || [];
  
  // Check for direct routes (shared lines)
  const directLines = originLines.filter(line => destLines.includes(line));
  
  // Add a direct route if available
  if (directLines.length > 0) {
    const line = directLines[Math.floor(Math.random() * directLines.length)];
    const stops = Math.floor(Math.random() * 10) + 3; // 3-12 stops
    const duration = stops * 2 + Math.floor(Math.random() * 5); // 2 min per stop + random factor
    
    routes.push({
      trains: [{
        line,
        stops,
        delay: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0 // 30% chance of delay
      }],
      duration,
      transfers: 0,
      startingStation: origin,
      endingStation: destination,
      arrivalTime: calculateArrivalTime(duration)
    });
  }
  
  // Add a route with one transfer
  const originLine = originLines[Math.floor(Math.random() * originLines.length)];
  const destLine = destLines[Math.floor(Math.random() * destLines.length)];
  const stops1 = Math.floor(Math.random() * 5) + 1; // 1-5 stops
  const stops2 = Math.floor(Math.random() * 5) + 1; // 1-5 stops
  const duration = (stops1 + stops2) * 2 + 5 + Math.floor(Math.random() * 10); // 2 min per stop + transfer time + random factor
  
  routes.push({
    trains: [
      {
        line: originLine,
        stops: stops1,
        delay: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
      },
      {
        line: destLine,
        stops: stops2,
        delay: Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0
      }
    ],
    duration,
    transfers: 1,
    startingStation: origin,
    endingStation: destination,
    arrivalTime: calculateArrivalTime(duration)
  });
  
  // Possibly add a third route with two transfers for longer journeys
  if (Math.random() > 0.5) {
    const randomLine = getRandomLine(originLines, destLines);
    routes.push(generateTwoTransferRoute(origin, destination, originLine, randomLine, destLine));
  }
  
  // Sort routes by duration
  return routes.sort((a, b) => a.duration - b.duration);
}

function getRandomLine(exclude1: string[], exclude2: string[]): string {
  const allLines = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "B", "D", "F", "M", "G", "J", "Z", "L", "N", "Q", "R", "W"];
  const availableLines = allLines.filter(line => !exclude1.includes(line) && !exclude2.includes(line));
  
  return availableLines[Math.floor(Math.random() * availableLines.length)] || "A";
}

function generateTwoTransferRoute(origin: string, destination: string, line1: string, line2: string, line3: string): Route {
  const stops1 = Math.floor(Math.random() * 3) + 1; // 1-3 stops
  const stops2 = Math.floor(Math.random() * 3) + 1; // 1-3 stops
  const stops3 = Math.floor(Math.random() * 3) + 1; // 1-3 stops
  const duration = (stops1 + stops2 + stops3) * 2 + 10 + Math.floor(Math.random() * 15); // 2 min per stop + transfer times + random factor
  
  return {
    trains: [
      {
        line: line1,
        stops: stops1,
        delay: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
      },
      {
        line: line2,
        stops: stops2,
        delay: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
      },
      {
        line: line3,
        stops: stops3,
        delay: Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0
      }
    ],
    duration,
    transfers: 2,
    startingStation: origin,
    endingStation: destination,
    arrivalTime: calculateArrivalTime(duration)
  };
}

function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function calculateArrivalTime(durationMinutes: number): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + durationMinutes);
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
