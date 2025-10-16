import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { CaretRight, House } from '@/components/icons';
import { Language, TranslationKey, getTranslation } from '../translations';

interface BreadcrumbProps {
  language: Language;
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

const Breadcrumb = ({ language, currentSection, onNavigate }: BreadcrumbProps) => {
  // Translation helper
  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  // Define section mappings
  const sectionMappings: Record<string, { name: string; parent?: string }> = {
    hero: { name: t('home') },
    menu: { name: t('menu') },
    antipasti: { name: t('antipasti'), parent: 'menu' },
    pizze: { name: t('pizze'), parent: 'menu' },
    pasta: { name: t('pasta'), parent: 'menu' },
    risotti: { name: t('risotti'), parent: 'menu' },
    secondi: { name: t('secondi'), parent: 'menu' },
    dolci: { name: t('dolci'), parent: 'menu' },
    aperitivi: { name: t('aperitivi'), parent: 'menu' },
    vini: { name: t('vini'), parent: 'menu' },
    birre: { name: t('birre'), parent: 'menu' },
    caffe: { name: t('caffe'), parent: 'menu' },
    bibite: { name: t('bibite'), parent: 'menu' },
    distillati: { name: t('distillati'), parent: 'menu' },
    reservations: { name: t('reservations') },
    about: { name: t('ourStory') },
    reviews: { name: t('ourReviews') },
    contact: { name: t('contacts') },
  };

  // Build breadcrumb path
  const buildBreadcrumb = (section: string): Array<{ id: string; name: string }> => {
    const breadcrumb: Array<{ id: string; name: string }> = [];
    const current = sectionMappings[section];

    if (!current) return [{ id: 'hero', name: t('home') }];

    // Add parent if exists
    if (current.parent) {
      const parent = sectionMappings[current.parent];
      if (parent) {
        breadcrumb.push({ id: current.parent, name: parent.name });
      }
    }

    // Add current section
    breadcrumb.push({ id: section, name: current.name });

    return breadcrumb;
  };

  const breadcrumb = buildBreadcrumb(currentSection);

  // Don't show breadcrumb for home section
  if (currentSection === 'hero' || breadcrumb.length <= 1) {
    return null;
  }

  return (
    <div className="bg-secondary/30 border-b border-border/50">
      <div className="container-responsive max-w-6xl mx-auto py-3">
        <nav className="flex items-center space-x-2 text-sm">
          {/* Home */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('hero')}
            className="text-muted-foreground hover:text-foreground p-1 h-auto"
          >
            <House size={16} />
          </Button>

          <CaretRight size={14} className="text-muted-foreground" />

          {/* Breadcrumb items */}
          {breadcrumb.map((item, index) => (
            <Fragment key={item.id}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={`text-sm h-auto p-1 px-2 ${
                  index === breadcrumb.length - 1
                    ? 'text-primary font-medium cursor-default'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                disabled={index === breadcrumb.length - 1}
              >
                {item.name}
              </Button>
              {index < breadcrumb.length - 1 && (
                <CaretRight size={14} className="text-muted-foreground" />
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
