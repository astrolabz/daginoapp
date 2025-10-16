import { useMemo, useState } from 'react';
import { useKV } from '@/spark-polyfills/kv';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  MagnifyingGlass,
  X,
  ChefHat,
  Users,
  Sparkle,
  MapPin,
  Phone,
  Clock,
  Star,
} from '@/components/icons';
import { Language, TranslationKey, getTranslation } from '../translations';

interface SearchItem {
  id: string;
  type: 'menu' | 'section' | 'contact' | 'info';
  name: string;
  description: string;
  price?: string;
  category?: string;
  section: string;
  popular?: boolean;
  keywords: string[];
}

interface SearchSystemProps {
  language: Language;
  menuCategories: any[];
  menuDescriptions: Record<string, Record<number, string>>;
  onNavigate: (sectionId: string) => void;
}

const SearchSystem = ({
  language,
  menuCategories,
  menuDescriptions,
  onNavigate,
}: SearchSystemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useKV<string[]>('search-history', []);

  // Translation helper
  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  // Get menu item description
  const getItemDescription = (itemId: number): string => {
    return menuDescriptions[language]?.[itemId] || '';
  };

  // Create searchable items from all site content
  const searchableItems = useMemo((): SearchItem[] => {
    const items: SearchItem[] = [];

    // Add menu items
    menuCategories.forEach(category => {
      category.items.forEach((item: any) => {
        const description = getItemDescription(item.id);
        items.push({
          id: `menu-${item.id}`,
          type: 'menu',
          name: item.name,
          description,
          price: item.price,
          category: t(category.id as TranslationKey),
          section: 'menu',
          popular: item.popular,
          keywords: [
            item.name.toLowerCase(),
            description.toLowerCase(),
            t(category.id as TranslationKey).toLowerCase(),
            item.price,
            ...(item.popular ? [t('popular').toLowerCase()] : []),
          ],
        });
      });
    });

    // Add sections
    const sections = [
      {
        id: 'hero',
        name: t('home'),
        description: t('description'),
        keywords: [
          t('home'),
          t('restaurantName'),
          t('tagline'),
          t('description'),
          'ristorante',
          'pizzeria',
          'da gino',
        ],
      },
      {
        id: 'about',
        name: t('ourStory'),
        description: t('traditionDesc'),
        keywords: [
          t('ourStory'),
          t('tradition'),
          t('passion'),
          t('quality'),
          'storia',
          'tradizione',
          'passione',
        ],
      },
      {
        id: 'reservations',
        name: t('reservations'),
        description: t('reservationDescription'),
        keywords: [
          t('reservations'),
          t('makeReservation'),
          t('bookTable'),
          'prenotazione',
          'tavolo',
        ],
      },
      {
        id: 'reviews',
        name: t('ourReviews'),
        description: t('reviewsDescription'),
        keywords: [t('ourReviews'), 'tripadvisor', 'recensioni', 'reviews'],
      },
    ];

    sections.forEach(section => {
      items.push({
        id: `section-${section.id}`,
        type: 'section',
        name: section.name,
        description: section.description,
        section: section.id,
        keywords: section.keywords.map(k => k.toLowerCase()),
      });
    });

    // Add contact information
    items.push({
      id: 'contact-address',
      type: 'contact',
      name: t('whereWeAre'),
      description: t('address'),
      section: 'contact',
      keywords: [
        t('address'),
        t('whereWeAre'),
        t('directions'),
        'indirizzo',
        'dove',
        'siamo',
        'beatrixstraat',
        'den helder',
      ],
    });

    items.push({
      id: 'contact-phone',
      type: 'contact',
      name: t('contacts'),
      description: t('phone'),
      section: 'contact',
      keywords: [
        t('phone'),
        t('contacts'),
        t('call'),
        'telefono',
        'chiamare',
        '0223610117',
        '0645069661',
      ],
    });

    items.push({
      id: 'contact-hours',
      type: 'contact',
      name: t('openingHours'),
      description: t('restaurantHours'),
      section: 'contact',
      keywords: [t('openingHours'), t('restaurantHours'), 'orari', 'apertura', 'ore', 'tempo'],
    });

    return items;
  }, [language, menuCategories, menuDescriptions]);

  // Filter search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results = searchableItems.filter(
      item =>
        item.keywords.some(keyword => keyword.includes(query)) ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );

    // Sort results by relevance
    return results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(query);
      const bNameMatch = b.name.toLowerCase().includes(query);

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;

      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;

      return 0;
    });
  }, [searchQuery, searchableItems]);

  // Handle search
  const handleSearch = (rawQuery: string) => {
    setSearchQuery(rawQuery);

    const normalizedQuery = rawQuery.trim();
    if (!normalizedQuery) {
      return;
    }

    setSearchHistory(prev => {
      const normalizedLower = normalizedQuery.toLowerCase();
      const filteredHistory = prev.filter(entry => entry.trim().toLowerCase() !== normalizedLower);

      return [normalizedQuery, ...filteredHistory].slice(0, 5);
    });
  };

  // Handle result click
  const handleResultClick = (item: SearchItem) => {
    onNavigate(item.section);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Get type icon
  const getTypeIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'menu':
        return <ChefHat size={16} className="text-primary" />;
      case 'section':
        return <Sparkle size={16} className="text-accent" />;
      case 'contact':
        return <MapPin size={16} className="text-primary" />;
      case 'info':
        return <Clock size={16} className="text-muted-foreground" />;
      default:
        return <MagnifyingGlass size={16} className="text-muted-foreground" />;
    }
  };

  // Get type label
  const getTypeLabel = (type: SearchItem['type']) => {
    switch (type) {
      case 'menu':
        return t('menu');
      case 'section':
        return t('section');
      case 'contact':
        return t('contacts');
      case 'info':
        return t('information');
      default:
        return '';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 md:h-10 md:w-10 hover-lift border-2 border-primary/20 hover:border-primary hover:bg-primary/5 flex-shrink-0"
        >
          <MagnifyingGlass size={16} className="md:hidden" />
          <MagnifyingGlass size={18} className="hidden md:block" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-96 glass-card border-l">
        <SheetHeader className="pb-6">
          <SheetTitle className="font-heading text-xl flex items-center gap-3">
            <MagnifyingGlass size={24} className="text-primary" />
            {t('searchSite')}
          </SheetTitle>
        </SheetHeader>

        {/* Search Input */}
        <div className="relative mb-6">
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="pl-10 pr-10 h-12 text-base border-2 focus:border-primary"
            autoFocus
          />
          <MagnifyingGlass
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <X size={16} />
            </Button>
          )}
        </div>

        {/* Search History */}
        {!searchQuery && searchHistory.length > 0 && (
          <div className="mb-6">
            <h3 className="font-heading text-sm font-semibold text-muted-foreground mb-3">
              {t('recentSearches')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map(query => (
                <Button
                  key={query}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(query)}
                  className="text-xs hover:bg-primary/5 hover:border-primary"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm font-semibold text-foreground">
                {t('searchResults')} ({searchResults.length})
              </h3>
              {searchResults.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="text-xs text-muted-foreground"
                >
                  {t('clearSearch')}
                </Button>
              )}
            </div>

            {searchResults.length === 0 ? (
              <Card className="card-modern">
                <CardContent className="p-6 text-center">
                  <MagnifyingGlass size={32} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="font-body text-sm text-muted-foreground">
                    {t('noResultsFound')} "{searchQuery}"
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map(item => (
                  <Card
                    key={item.id}
                    className="card-modern hover-lift cursor-pointer group"
                    onClick={() => handleResultClick(item)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeIcon(item.type)}
                              <Badge variant="secondary" className="text-xs">
                                {getTypeLabel(item.type)}
                              </Badge>
                              {item.popular && (
                                <Badge className="bg-gradient-to-r from-accent/20 to-primary/20 text-primary border-primary/20 text-xs">
                                  <Star size={10} className="mr-1" />
                                  {t('popular')}
                                </Badge>
                              )}
                            </div>
                            <h4 className="font-heading text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {item.name}
                            </h4>
                            {item.category && (
                              <p className="text-xs text-muted-foreground">{item.category}</p>
                            )}
                          </div>
                          {item.price && (
                            <span className="font-heading text-sm font-bold text-primary whitespace-nowrap">
                              {item.price}
                            </span>
                          )}
                        </div>

                        {item.description && (
                          <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {!searchQuery && (
          <div className="mt-8 space-y-4">
            <h3 className="font-heading text-sm font-semibold text-muted-foreground">
              {t('quickAccess')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { section: 'menu', label: t('menu'), icon: <ChefHat size={16} /> },
                { section: 'reservations', label: t('reservations'), icon: <Users size={16} /> },
                { section: 'contact', label: t('contacts'), icon: <Phone size={16} /> },
                { section: 'reviews', label: t('ourReviews'), icon: <Star size={16} /> },
              ].map(action => (
                <Button
                  key={action.section}
                  variant="outline"
                  onClick={() => {
                    onNavigate(action.section);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 h-12 text-sm hover:bg-primary/5 hover:border-primary"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchSystem;
