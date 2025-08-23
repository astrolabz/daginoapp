import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe, CaretDown } from "@/components/icons";
import { Language, languages } from '../translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1 md:gap-2 h-8 md:h-10 px-2 md:px-3 hover-lift glass-card border-0 bg-background/50 flex-shrink-0"
        >
          <span className="text-base md:text-lg">{currentLang?.flag}</span>
          <span className="hidden lg:inline font-medium text-sm">{currentLang?.nativeName}</span>
          <span className="lg:hidden font-medium text-xs md:text-sm">{currentLang?.code.toUpperCase()}</span>
          <CaretDown size={12} className="md:hidden opacity-60" />
          <CaretDown size={14} className="hidden md:block opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 glass-card border shadow-xl"
        sideOffset={8}
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => onLanguageChange(language.code)}
            className={`cursor-pointer p-3 hover-lift transition-all duration-200 ${
              language.code === currentLanguage 
                ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-l-2 border-primary' 
                : 'hover:bg-primary/5'
            }`}
          >
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">{language.flag}</span>
              <div className="flex flex-col flex-1">
                <span className="font-medium text-sm">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
              {language.code === currentLanguage && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;