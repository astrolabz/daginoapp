import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Star,
  Settings,
  Eye,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  TrendUp
} from "@phosphor-icons/react";
import { Language, translations, TranslationKey } from '../translations';

interface ReviewSystemAdminProps {
  language: Language;
}

const ReviewSystemAdmin: React.FC<ReviewSystemAdminProps> = ({ language }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toISOString());

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastSync(new Date().toISOString());
    setIsRefreshing(false);
  };

  // Mock data for demonstration
  const stats = {
    totalReviews: 127,
    averageRating: 4.6,
    newThisWeek: 8,
    responseRate: 85
  };

  return (
    <div className="space-y-6">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star size={20} className="text-primary" />
            </div>
            Review System Administration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-primary">{stats.totalReviews}</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-amber-600">{stats.averageRating}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-green-600">{stats.newThisWeek}</div>
              <div className="text-sm text-muted-foreground">New This Week</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <div className="text-2xl font-bold text-blue-600">{stats.responseRate}%</div>
              <div className="text-sm text-muted-foreground">Response Rate</div>
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Status</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <div>
                    <div className="font-medium">TripAdvisor Integration</div>
                    <div className="text-sm text-muted-foreground">Connected and syncing</div>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <div>
                    <div className="font-medium">Review Display</div>
                    <div className="text-sm text-muted-foreground">Showing latest reviews</div>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Operational
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  <div>
                    <div className="font-medium">Auto-sync Schedule</div>
                    <div className="text-sm text-muted-foreground">Reviews sync every 24 hours</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Scheduled
                </Badge>
              </div>
            </div>
          </div>

          {/* Last Sync Info */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20">
            <div>
              <div className="font-medium">Last Sync</div>
              <div className="text-sm text-muted-foreground">
                {new Date(lastSync).toLocaleString()}
              </div>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
            >
              <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Syncing...' : 'Sync Now'}
            </Button>
          </div>

          {/* Actions */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye size={16} />
              View All Reviews
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings size={16} />
              Configure Settings
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendUp size={16} />
              View Analytics
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Star size={16} />
              Manage Responses
            </Button>
          </div>

          {/* Information Alert */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              The review system automatically fetches and displays reviews from TripAdvisor. 
              This is a demonstration showing how the system would work in production.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSystemAdmin;