import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Metric {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

export default function MetricsGrid({ metrics, loading }: { metrics: Record<string, any>; loading: boolean }) {
  const metricCards: Metric[] = [
    {
      label: 'Total Sales',
      value: metrics?.totalSales ? `$${(metrics.totalSales / 1000).toFixed(1)}K` : '$0',
      icon: <DollarSign className="h-5 w-5 text-chart-1" />,
      trend: metrics?.salesTrend,
    },
    {
      label: 'Total Profit',
      value: metrics?.totalProfit ? `$${(metrics.totalProfit / 1000).toFixed(1)}K` : '$0',
      icon: <TrendingUp className="h-5 w-5 text-chart-2" />,
      trend: metrics?.profitTrend,
    },
    {
      label: 'Total Orders',
      value: metrics?.orderCount || 0,
      icon: <ShoppingCart className="h-5 w-5 text-chart-3" />,
    },
    {
      label: 'Avg Delivery (days)',
      value: metrics?.avgAging?.toFixed(1) || '0',
      icon: <Clock className="h-5 w-5 text-chart-4" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {metricCards.map((metric, index) => (
        <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                {metric.trend !== undefined && (
                  <p className={`text-xs ${metric.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {metric.trend >= 0 ? '↑' : '↓'} {Math.abs(metric.trend).toFixed(1)}%
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
