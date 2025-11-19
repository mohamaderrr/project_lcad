'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, TrendingUp, ShoppingCart, DollarSign, Clock } from 'lucide-react';
import FilterPanel from './components/filter-panel';
import MetricsGrid from './components/metrics-grid';
import ChartGrid from './components/chart-grid';
import { useAnalyticsData } from '@/hooks/use-analytics-data';

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

export default function Dashboard() {
  const [filters, setFilters] = useState({
    category: 'all',
    gender: 'all',
    device: 'all',
    payment: 'all',
    startDate: '',
    endDate: '',
  });

  const { data, loading, error, filterOptions, metrics } = useAnalyticsData(filters);

  return (
    <main className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Sales Analytics</h1>
              <p className="mt-2 text-sm text-muted-foreground">Monitor your e-commerce performance in real-time</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-chart-1" />
              <span className="text-sm font-medium text-muted-foreground">Live Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filter Panel */}
        <div className="mb-8">
          <FilterPanel 
            filters={filters} 
            setFilters={setFilters} 
            filterOptions={filterOptions} 
          />
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-8 border-destructive bg-destructive/10">
            <CardContent className="pt-6">
              <p className="text-sm text-destructive">Error loading data: {error}</p>
            </CardContent>
          </Card>
        )}

        {/* Metrics Cards */}
        <MetricsGrid metrics={metrics} loading={loading} />

        {/* Charts Grid */}
        <ChartGrid data={data} loading={loading} colors={COLORS} />
      </div>
    </main>
  );
}
