"use client";

import { useState } from "react";
import { format, parse, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark } from 'lucide-react';
import { getReadingsForDate, DailyReadings, Reading } from "@/lib/daily-readings";
import { getCurrentLiturgicalSeason, getLiturgicalColorClass, getLiturgicalColorBg, getLiturgicalColorText, getLiturgicalColorBorder } from "@/lib/liturgical-calendar";

export default function DailyReadings({ initialDate = new Date() }: { initialDate?: Date }) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [activeReading, setActiveReading] = useState<string | null>(null);
  
  const readings = getReadingsForDate(selectedDate);
  const season = getCurrentLiturgicalSeason(selectedDate);
  
  const seasonColorBg = season ? getLiturgicalColorBg(season.color) : "bg-gray-50";
  const seasonColorText = season ? getLiturgicalColorText(season.color) : "text-gray-700";
  
  const navigateDay = (direction: "prev" | "next") => {
    setSelectedDate(prev => direction === "prev" ? subDays(prev, 1) : addDays(prev, 1));
    setActiveReading(null);
  };
  
  const toggleReading = (reference: string) => {
    setActiveReading(activeReading === reference ? null : reference);
  };
  
  if (!readings) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigateDay("prev")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <h2 className="text-xl font-bold">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </h2>
          
          <button 
            onClick={() => navigateDay("next")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Readings for this date are not available.</p>
          <p className="text-gray-500 text-sm mt-2">Please select another date or check back later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`rounded-lg shadow-md ${seasonColorBg} transition-colors duration-500`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigateDay("prev")}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold">
              {format(selectedDate, "EEEE, MMMM d, yyyy")}
            </h2>
            <p className={`text-sm mt-1 ${seasonColorText} font-medium`}>
              {readings.liturgicalDay}
            </p>
          </div>
          
          <button 
            onClick={() => navigateDay("next")}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Next day"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          {readings.readings.map((reading) => (
            <ReadingItem 
              key={reading.reference}
              reading={reading}
              isActive={activeReading === reading.reference}
              onToggle={() => toggleReading(reading.reference)}
              seasonColor={season?.color || "green"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReadingItem({ 
  reading, 
  isActive, 
  onToggle,
  seasonColor
}: { 
  reading: Reading; 
  isActive: boolean; 
  onToggle: () => void;
  seasonColor: string;
}) {
  const colorClass = getLiturgicalColorClass(seasonColor);
  const colorText = getLiturgicalColorText(seasonColor);
  const colorBg = getLiturgicalColorBg(seasonColor);
  const colorBorder = getLiturgicalColorBorder(seasonColor);
  
  let readingTitle = "";
  switch (reading.type) {
    case "first":
      readingTitle = "First Reading";
      break;
    case "psalm":
      readingTitle = "Responsorial Psalm";
      break;
    case "second":
      readingTitle = "Second Reading";
      break;
    case "acclamation":
      readingTitle = "Gospel Acclamation";
      break;
    case "gospel":
      readingTitle = "Gospel";
      break;
  }
  
  return (
    <div className={`border rounded-lg overflow-hidden ${isActive ? `border-2 ${colorBorder}` : "border-gray-200"}`}>
      <button 
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-4 text-left ${isActive ? colorBg : "hover:bg-gray-50"} transition-colors`}
        aria-expanded={isActive}
      >
        <div className="flex items-center">
          <Bookmark className={`h-5 w-5 mr-3 ${reading.type === "gospel" ? "text-red-500" : colorText}`} />
          <div>
            <span className="font-medium">{readingTitle}</span>
            <span className="ml-2 text-gray-600">{reading.reference}</span>
          </div>
        </div>
        <ChevronRight className={`h-5 w-5 transition-transform ${isActive ? "rotate-90" : ""}`} />
      </button>
      
      {isActive && (
        <div className="p-4 border-t border-gray-200 whitespace-pre-line">
          {reading.text}
        </div>
      )}
    </div>
  );
}
