import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from '@/components/icons';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        sizeClasses[size],
        'rounded-full border-2 border-transparent hover:border-border/50 transition-all duration-200',
        'bg-background/80 backdrop-blur-sm shadow-sm',
        'hover:bg-accent hover:text-accent-foreground',
        className
      )}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun 
        size={iconSizes[size]} 
        className={cn(
          'transition-all duration-300',
          theme === 'light' 
            ? 'rotate-0 scale-100' 
            : '-rotate-90 scale-0'
        )}
      />
      <Moon 
        size={iconSizes[size]} 
        className={cn(
          'absolute transition-all duration-300',
          theme === 'dark' 
            ? 'rotate-0 scale-100' 
            : 'rotate-90 scale-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}