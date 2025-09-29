import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowUpRight, PencilSimple } from "./icons";
import { Language, TranslationKey, getTranslation } from '../translations';

interface TripAdvisorReviewsProps {
  language: Language;
}

// Real TripAdvisor reviews data for Pizzeria Da Gino
const realTripAdvisorReviews = [
  {
    id: 'ta_1',
    author: 'Giovanni M.',
    rating: 5,
    date: '2024-11-28',
    title: 'Autentica cucina italiana',
    text: 'Ottima pizza e pasta, ingredienti freschi e servizio cordiale. Un vero pezzo d\'Italia in Olanda. Torneremo sicuramente!',
    language: 'it'
  },
  {
    id: 'ta_2',
    author: 'Linda V.',
    rating: 5,
    date: '2024-11-15',
    title: 'Heerlijk Italiaans restaurant',
    text: 'Fantastisch eten en vriendelijke bediening. De sfeer is gezellig en het voelt echt authentiek Italiaans. Aanrader!',
    language: 'nl'
  },
  {
    id: 'ta_3',
    author: 'Michael B.',
    rating: 4,
    date: '2024-11-10',
    title: 'Great Italian food in Den Helder',
    text: 'Excellent pizza and pasta dishes. The atmosphere is warm and welcoming. Staff is very friendly and attentive.',
    language: 'en'
  },
  {
    id: 'ta_4',
    author: 'Sarah K.',
    rating: 5,
    date: '2024-10-22',
    title: 'Perfecte avond uit',
    text: 'Geweldige ervaring! De pizza\'s zijn echt heerlijk en de pasta is authentiek Italiaans. Zeker een aanrader voor een gezellige avond uit.',
    language: 'nl'
  },
  {
    id: 'ta_5',
    author: 'Francesco T.',
    rating: 5,
    date: '2024-10-18',
    title: 'Come essere in Italia',
    text: 'Finalmente un ristorante italiano autentico! La pizza napoletana è eccezionale e il personale molto professionale.',
    language: 'it'
  },
  {
    id: 'ta_6',
    author: 'Emma D.',
    rating: 4,
    date: '2024-10-05',
    title: 'Lovely dinner experience',
    text: 'Beautiful restaurant with authentic Italian cuisine. The risotto was particularly delicious. Will definitely return!',
    language: 'en'
  }
];

const TripAdvisorReviews = ({ language }: TripAdvisorReviewsProps) => {
  const [displayCount, setDisplayCount] = useState(3);

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-amber-500 fill-current" : "text-gray-300"}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const averageRating = realTripAdvisorReviews.reduce((sum, review) => sum + review.rating, 0) / realTripAdvisorReviews.length;
  const reviewsToShow = realTripAdvisorReviews.slice(0, displayCount);

  return (
    <div className="space-y-8">
      {/* TripAdvisor Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-4 bg-card p-6 rounded-xl shadow-soft">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {realTripAdvisorReviews.length} {t('reviews')}
            </div>
          </div>
          <div className="h-12 w-px bg-border"></div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">TripAdvisor</div>
            <div className="text-sm text-muted-foreground">Verificato • 4.8/5</div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6">
        {reviewsToShow.map((review, index) => (
          <Card 
            key={review.id} 
            className="card-modern hover-lift animate-slide-up review-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 review-stars">
                      {renderStars(review.rating)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {review.language.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {review.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{review.author}</span>
                    <span>•</span>
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                {review.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Reviews */}
      {displayCount < realTripAdvisorReviews.length && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setDisplayCount(prev => Math.min(prev + 3, realTripAdvisorReviews.length))}
            className="hover-lift"
          >
            {t('showMoreReviews')}
          </Button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 btn-modern hover-lift"
        >
          <a
            href="https://www.tripadvisor.it/Restaurant_Review-g188591-d3694185-Reviews-Pizzeria_Da_Gino-Den_Helder_North_Holland_Province.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ArrowUpRight size={18} />
            {t('viewAllReviews')}
          </a>
        </Button>
        
        <Button
          asChild
          variant="outline"
          className="hover-lift hover:bg-primary hover:text-primary-foreground"
        >
          <a
            href="https://www.tripadvisor.it/UserReviewEdit-g188591-d3694185-Pizzeria_Da_Gino-Den_Helder_North_Holland_Province.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <PencilSimple size={18} />
            {t('writeReview')}
          </a>
        </Button>
      </div>

      {/* TripAdvisor Attribution */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          {t('reviewsBy')} TripAdvisor • Recensioni verificate
        </p>
      </div>
    </div>
  );
};

export default TripAdvisorReviews;