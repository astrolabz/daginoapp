import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRight, Sparkle } from "@/components/icons";
import { Language, languages } from '../translations';

interface LanguageSelectorProps {
  onLanguageSelect: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-8 animate-fade-in">
      <div className="container-responsive max-w-4xl mx-auto text-center space-y-12">
        {/* Header with modern styling */}
        <div className="space-y-8 animate-slide-up">
          {/* Logo/Icon with glassmorphism */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl glass-card flex items-center justify-center hover-lift">
                <Globe size={40} className="text-primary" />
                <div className="absolute -top-1 -right-1">
                  <Sparkle size={16} className="text-accent" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Main title with enhanced typography */}
          <div className="space-y-4">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-foreground text-shadow-soft leading-tight">
              Ristorante <span className="text-gradient">Dagino</span>
            </h1>
            
            <p className="font-body text-xl sm:text-2xl md:text-3xl text-muted-foreground font-light tracking-wide">
              Autentica Cucina Italiana dal 1952
            </p>
          </div>
          
          {/* Subtitle badge with modern styling */}
          <div className="flex justify-center pt-4">
            <Badge variant="secondary" className="glass-card text-base px-6 py-3 border-0">
              <Globe size={18} className="mr-3 text-primary" />
              <span className="font-medium">Seleziona la tua lingua • Choose your language</span>
            </Badge>
          </div>
        </div>

        {/* Language Selection Card with enhanced design */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Card className="card-modern glass-card border-2 overflow-hidden max-w-3xl mx-auto">
            <CardHeader className="pb-6 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="font-heading text-2xl md:text-3xl flex items-center justify-center gap-3 text-balance">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Globe size={24} className="text-primary" />
                </div>
                <span>Select Language</span>
                <span className="text-muted-foreground text-xl mx-2">•</span>
                <span>Seleziona Lingua</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {languages.map((language, index) => (
                  <Button
                    key={language.code}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover-lift btn-modern group relative overflow-hidden"
                    onClick={() => onLanguageSelect(language.code)}
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {/* Flag with enhanced styling */}
                    <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                      {language.flag}
                    </div>
                    
                    {/* Language names with better typography */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-heading text-sm font-semibold tracking-wide">
                        {language.nativeName}
                      </span>
                      <span className="font-body text-xs opacity-70 group-hover:opacity-90 transition-opacity">
                        {language.name}
                      </span>
                    </div>
                    
                    {/* Hover arrow effect */}
                    <ArrowRight 
                      size={16} 
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" 
                    />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer with enhanced styling */}
        <div className="text-center pt-8 space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass-card rounded-2xl p-6 max-w-lg mx-auto">
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed text-balance">
              <span className="font-medium text-foreground">Click on your preferred language to continue</span>
              <br />
              <span className="italic">Fai clic sulla tua lingua preferita per continuare</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center gap-2 opacity-30">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;