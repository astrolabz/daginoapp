import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChefHat,
  Wine,
  Users,
  Heart,
  Sparkle,
  MapPin,
  Phone,
  CalendarCheck,
  ChatCircle,
  Coffee,
  BeerBottle,
  Drop,
  ForkKnife,
  Martini,
  Truck,
  Storefront,
  BookOpen,
  ClockClockwise,
} from '@/components/icons';
import { Language, TranslationKey, getTranslation } from '../translations';

interface CategoryNavigationProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
}

const CategoryNavigation = ({ language, onNavigate, activeSection }: CategoryNavigationProps) => {
  // Translation helper
  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  const categories = [
    {
      id: 'menu',
      title: t('menu'),
      description: t('menuDescription'),
      icon: <ChefHat size={32} className="text-primary" />,
      color: 'from-primary/10 to-accent/10',
      borderColor: 'border-primary/20',
      hoverColor: 'hover:border-primary hover:bg-primary/5',
      subcategories: [
        { id: 'antipasti', name: t('antipasti'), icon: <ForkKnife size={16} /> },
        { id: 'pizze', name: t('pizze'), icon: <ChefHat size={16} /> },
        { id: 'pasta', name: t('pasta'), icon: <ForkKnife size={16} /> },
        { id: 'risotti', name: t('risotti'), icon: <ForkKnife size={16} /> },
        { id: 'secondi', name: t('secondi'), icon: <ForkKnife size={16} /> },
        { id: 'dolci', name: t('dolci'), icon: <Heart size={16} /> },
      ],
    },
    {
      id: 'beverages',
      title: t('beverages'),
      description: t('beveragesDescription'),
      icon: <Wine size={32} className="text-accent" />,
      color: 'from-accent/10 to-primary/10',
      borderColor: 'border-accent/20',
      hoverColor: 'hover:border-accent hover:bg-accent/5',
      subcategories: [
        { id: 'aperitivi', name: t('aperitivi'), icon: <Martini size={16} /> },
        { id: 'vini', name: t('vini'), icon: <Wine size={16} /> },
        { id: 'birre', name: t('birre'), icon: <BeerBottle size={16} /> },
        { id: 'caffe', name: t('caffe'), icon: <Coffee size={16} /> },
        { id: 'bibite', name: t('bibite'), icon: <Drop size={16} /> },
        { id: 'distillati', name: t('distillati'), icon: <Wine size={16} /> },
      ],
    },
    {
      id: 'services',
      title: t('services'),
      description: t('servicesDescription'),
      icon: <Users size={32} className="text-primary" />,
      color: 'from-primary/10 to-secondary/20',
      borderColor: 'border-primary/20',
      hoverColor: 'hover:border-primary hover:bg-primary/5',
      subcategories: [
        { id: 'reservations', name: t('reservations'), icon: <CalendarCheck size={16} /> },
        { id: 'delivery', name: t('delivery'), icon: <Truck size={16} /> },
        { id: 'takeaway', name: t('takeaway'), icon: <Storefront size={16} /> },
      ],
    },
    {
      id: 'info',
      title: t('informationSection'),
      description: t('informationDescription'),
      icon: <MapPin size={32} className="text-accent" />,
      color: 'from-accent/10 to-secondary/20',
      borderColor: 'border-accent/20',
      hoverColor: 'hover:border-accent hover:bg-accent/5',
      subcategories: [
        { id: 'about', name: t('ourStory'), icon: <BookOpen size={16} /> },
        { id: 'contact', name: t('contacts'), icon: <Phone size={16} /> },
        { id: 'reviews', name: t('ourReviews'), icon: <ChatCircle size={16} /> },
        { id: 'hours', name: t('hours'), icon: <ClockClockwise size={16} /> },
      ],
    },
  ];

  const handleCategoryClick = (categoryId: string, subcategories?: any[]) => {
    // If category has subcategories, navigate to the first one
    if (subcategories && subcategories.length > 0) {
      onNavigate(subcategories[0].id);
    } else {
      onNavigate(categoryId);
    }
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    onNavigate(subcategoryId);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/20">
      <div className="container-responsive max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full">
            <Sparkle size={20} />
            <span className="font-body text-sm font-medium">{t('explore')}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold text-foreground text-balance">
            {t('exploreRestaurant')}
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            {t('exploreDescription')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className={`card-modern hover-lift group cursor-pointer border-2 ${category.borderColor} ${category.hoverColor} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleCategoryClick(category.id, category.subcategories)}
            >
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="space-y-4">
                    <div
                      className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      {category.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {category.subcategories && (
                    <div className="space-y-3">
                      <h4 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {t('categoriesText')}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {category.subcategories.map(sub => (
                          <Button
                            key={sub.id}
                            variant="ghost"
                            size="sm"
                            onClick={e => {
                              e.stopPropagation();
                              handleSubcategoryClick(sub.id);
                            }}
                            className={`justify-start text-xs h-10 px-3 hover:bg-primary/10 hover:text-primary transition-all duration-200 ${
                              activeSection === sub.id ? 'bg-primary/10 text-primary' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div className="flex-shrink-0">{sub.icon}</div>
                              <span className="truncate text-left flex-1 min-w-0">{sub.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Stats or Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.id === 'menu' && (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          {t('dishesCount')}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {t('italianCuisine')}
                        </Badge>
                      </>
                    )}
                    {category.id === 'beverages' && (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          {t('drinksCount')}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {t('italianWines')}
                        </Badge>
                      </>
                    )}
                    {category.id === 'services' && (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          {t('onlineReservations')}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {t('homeDelivery')}
                        </Badge>
                      </>
                    )}
                    {category.id === 'info' && (
                      <>
                        <Badge variant="secondary" className="text-xs">
                          {t('since2010')}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {t('rating5Stars')}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Buttons */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => onNavigate('menu')}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 px-6 btn-modern"
            >
              <ChefHat size={20} className="mr-2" />
              {t('goToMenu')}
            </Button>
            <Button
              onClick={() => onNavigate('reservations')}
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-12 px-6"
            >
              <CalendarCheck size={20} className="mr-2" />
              {t('bookTable')}
            </Button>
            <Button
              onClick={() => onNavigate('contact')}
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground h-12 px-6"
            >
              <Phone size={20} className="mr-2" />
              {t('contactUs')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryNavigation;
