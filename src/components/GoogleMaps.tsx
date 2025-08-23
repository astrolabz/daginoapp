import React from 'react';
import { MapPin, ArrowUpRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Language, getTranslation } from '../translations';

interface GoogleMapsProps {
  language: Language;
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({ language }) => {
  const address = "Beatrixstraat 37, 1781 EM Den Helder, Netherlands";
  const coordinates = "52.954783,4.759416";
  
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}&destination_place_id=ChIJF8tZ9Xz8z0cRXqYgZqGZYWo`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2389.123!2d4.759416!3d52.954783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47dffc6c75f649f7%3A0x6a61998a6a20a65e!2sPizzeria%20Da%20Gino!5e0!3m2!1sit!2snl!4v1699999999999!5m2!1sit!2snl`;

  return (
    <Card className="card-modern overflow-hidden">
      <div className="relative">
        {/* Google Maps Embed */}
        <div className="w-full h-64 md:h-80">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={getTranslation(language, 'whereWeAre')}
            className="rounded-t-xl"
          />
        </div>
        
        {/* Overlay with address and actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
          <div className="text-white">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-semibold text-sm md:text-base mb-1">
                  Ristorante Pizzeria Da Gino
                </p>
                <p className="text-xs md:text-sm opacity-90">
                  Beatrixstraat 37<br />
                  1781 EM Den Helder<br />
                  Netherlands
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-xs md:text-sm"
            onClick={() => window.open(googleMapsUrl, '_blank', 'noopener,noreferrer')}
          >
            <MapPin size={16} className="mr-2" />
            {getTranslation(language, 'viewOnMaps') || 'View on Maps'}
          </Button>
          
          <Button 
            size="sm"
            className="w-full text-xs md:text-sm bg-primary hover:bg-primary/90"
            onClick={() => window.open(directionsUrl, '_blank', 'noopener,noreferrer')}
          >
            <ArrowUpRight size={16} className="mr-2" />
            {getTranslation(language, 'getDirections') || 'Get Directions'}
          </Button>
        </div>
        
        {/* Quick info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>📍 {getTranslation(language, 'walkingDistance') || 'Walking distance from Den Helder Centraal Station: 8 minutes'}</p>
          <p>🚗 {getTranslation(language, 'parkingInfo') || 'Free street parking available nearby'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMaps;