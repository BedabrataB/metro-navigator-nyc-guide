
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface RouteFormProps {
  onSearch: (origin: string, destination: string) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin.trim() || !destination.trim()) {
      setError("Please enter both origin and destination");
      return;
    }
    
    setError("");
    onSearch(origin, destination);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="origin" className="flex items-center gap-2 text-gold">
          <MapPin size={18} className="text-green-600" />
          <span>Starting Point</span>
        </Label>
        <Input
          id="origin"
          placeholder="Enter your current location"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="border-gold/30 bg-secondary text-foreground focus:border-gold focus:ring-gold"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="destination" className="flex items-center gap-2 text-gold">
          <MapPin size={18} className="text-red-600" />
          <span>Destination</span>
        </Label>
        <Input
          id="destination"
          placeholder="Where do you want to go?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border-gold/30 bg-secondary text-foreground focus:border-gold focus:ring-gold"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-black font-bold">
        Find Routes
      </Button>
    </form>
  );
};

export default RouteForm;
