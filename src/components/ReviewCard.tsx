import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "@/components/icons";

interface ReviewCardProps {
  rating: number;
  title: string;
  text: string;
  author: string;
  date: string;
  animationDelay?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  title,
  text,
  author,
  date,
  animationDelay = '0s'
}) => {
  return (
    <Card 
      className="card-modern hover-lift animate-slide-up review-card"
      style={{ animationDelay }}
    >
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2 review-stars">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} size={16} className="text-accent" />
          ))}
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          "{text}"
        </p>
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <span className="font-body text-sm font-medium text-foreground">
            {author}
          </span>
          <span className="font-body text-xs text-muted-foreground">
            {date}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;